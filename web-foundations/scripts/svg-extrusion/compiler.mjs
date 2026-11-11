import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const SCHEMA = 'svg-to-rive-3d/v1';
export const COMPILER_VERSION = '1.0.1';
const EPS = 1e-10;

export function sha256(data) { return createHash('sha256').update(data).digest('hex'); }
const round = (n) => Number(n.toFixed(10));
const cross = (a, b, c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const distLine = (p,a,b) => Math.abs(cross(a,b,p))/Math.max(Math.hypot(b[0]-a[0],b[1]-a[1]),EPS);

function attrs(text) {
  return Object.fromEntries([...text.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m=>[m[1],m[3]]));
}
function assertSafeXmlStructure(source) {
  const clean=source.replace(/<!--[\s\S]*?-->/g,'').replace(/<\?[\s\S]*?\?>/g,'');
  const stack=[];let consumed='';
  for(const m of clean.matchAll(/<\s*(\/?)\s*([\w:-]+)([^>]*)>/g)){consumed+=clean.slice(consumed.length,m.index).trim();const closing=Boolean(m[1]),name=m[2];if(!['svg','path'].includes(name))throw new Error(`unsupported SVG element: ${name}`);if(closing){if(stack.pop()!==name)throw new Error(`malformed XML closing tag: ${name}`);}else if(!/\/\s*$/.test(m[3]))stack.push(name);consumed=clean.slice(0,m.index+m[0].length);}
  if(clean.slice(consumed.length).trim()||stack.length)throw new Error('malformed or unsupported XML structure');
}

function multiply(a,b) {
  return [a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
}
function transformMatrix(value='') {
  let out=[1,0,0,1,0,0];
  const matches=[...value.matchAll(/(matrix|translate|scale|rotate)\s*\(([^)]*)\)/g)];
  if (value.replace(/(matrix|translate|scale|rotate)\s*\(([^)]*)\)/g,'').replace(/[\s,]/g,'')) throw new Error(`unsupported transform: ${value}`);
  for (const m of matches) {
    const v=m[2].trim().split(/[\s,]+/).filter(Boolean).map(Number); let n;
    if (v.some(x=>!Number.isFinite(x))) throw new Error(`invalid transform: ${value}`);
    if(m[1]==='matrix'&&v.length===6)n=v;
    else if(m[1]==='translate'&&(v.length===1||v.length===2))n=[1,0,0,1,v[0],v[1]??0];
    else if(m[1]==='scale'&&(v.length===1||v.length===2))n=[v[0],0,0,v[1]??v[0],0,0];
    else if(m[1]==='rotate'&&(v.length===1||v.length===3)){const q=v[0]*Math.PI/180,c=Math.cos(q),s=Math.sin(q),r=[c,s,-s,c,0,0];n=v.length===3?multiply(multiply([1,0,0,1,v[1],v[2]],r),[1,0,0,1,-v[1],-v[2]]):r;}
    else throw new Error(`invalid transform arity: ${m[0]}`);
    out=multiply(out,n);
  } return out;
}
const tx=(p,m)=>[m[0]*p[0]+m[2]*p[1]+m[4],m[1]*p[0]+m[3]*p[1]+m[5]];

function flattenCubic(p0,p1,p2,p3,tol,out,depth=0) {
  if(depth>24) throw new Error('cubic flattening exceeded recursion limit');
  if(Math.max(distLine(p1,p0,p3),distLine(p2,p0,p3))<=tol){out.push(p3);return;}
  const a=[(p0[0]+p1[0])/2,(p0[1]+p1[1])/2],b=[(p1[0]+p2[0])/2,(p1[1]+p2[1])/2],c=[(p2[0]+p3[0])/2,(p2[1]+p3[1])/2];
  const d=[(a[0]+b[0])/2,(a[1]+b[1])/2],e=[(b[0]+c[0])/2,(b[1]+c[1])/2],f=[(d[0]+e[0])/2,(d[1]+e[1])/2];
  flattenCubic(p0,a,d,f,tol,out,depth+1); flattenCubic(f,e,c,p3,tol,out,depth+1);
}

export function parsePath(d,tolerance,pointTransform=(p)=>p) {
  const tokens=[...d.matchAll(/[MLCZmlcz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g)].map(m=>m[0]);
  const residue=d.replace(/[MLCZmlcz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?|[\s,]+/g,'');
  if(residue) throw new Error(`unsupported path syntax near ${residue.slice(0,16)}`);
  let i=0,cmd=null,p=[0,0],start=null,subpaths=0; const out=[];
  const num=()=>{if(i>=tokens.length||/^[A-Za-z]$/.test(tokens[i]))throw new Error(`missing coordinates for ${cmd}`);return Number(tokens[i++]);};
  while(i<tokens.length){if(/^[A-Za-z]$/.test(tokens[i]))cmd=tokens[i++];if(!cmd)throw new Error('path must begin with M');const rel=cmd===cmd.toLowerCase(),up=cmd.toUpperCase();
    if(up==='M'){const q=[num(),num()];p=rel?[p[0]+q[0],p[1]+q[1]]:q;if(start&&out.length)throw new Error('multiple subpaths/holes are not supported in v1');start=p;subpaths++;out.push(pointTransform(p));cmd=rel?'l':'L';}
    else if(up==='L'){const q=[num(),num()];p=rel?[p[0]+q[0],p[1]+q[1]]:q;out.push(pointTransform(p));}
    else if(up==='C'){const v=[num(),num(),num(),num(),num(),num()];const a=rel?[p[0]+v[0],p[1]+v[1]]:[v[0],v[1]],b=rel?[p[0]+v[2],p[1]+v[3]]:[v[2],v[3]],c=rel?[p[0]+v[4],p[1]+v[5]]:[v[4],v[5]];flattenCubic(pointTransform(p),pointTransform(a),pointTransform(b),pointTransform(c),tolerance,out);p=c;}
    else if(up==='Z'){if(!start)throw new Error('close without move');p=start;cmd=null;if(i<tokens.length&&!/^[A-Za-z]$/.test(tokens[i]))throw new Error('coordinates after close');}
    else throw new Error(`unsupported path command ${cmd}`);
  }
  if(subpaths!==1||!start||cmd!==null)throw new Error('path must contain one closed contour');
  if(out.length>1&&Math.hypot(out.at(-1)[0]-out[0][0],out.at(-1)[1]-out[0][1])<EPS)out.pop();
  return out;
}

export function signedArea(p){let s=0;for(let i=0;i<p.length;i++){const q=p[(i+1)%p.length];s+=p[i][0]*q[1]-q[0]*p[i][1];}return s/2;}
function onSegment(a,b,p){return Math.abs(cross(a,b,p))<=EPS&&p[0]>=Math.min(a[0],b[0])-EPS&&p[0]<=Math.max(a[0],b[0])+EPS&&p[1]>=Math.min(a[1],b[1])-EPS&&p[1]<=Math.max(a[1],b[1])+EPS;}
function segmentsIntersect(a,b,c,d){const x1=cross(a,b,c),x2=cross(a,b,d),x3=cross(c,d,a),x4=cross(c,d,b);return x1*x2<-EPS&&x3*x4<-EPS||onSegment(a,b,c)||onSegment(a,b,d)||onSegment(c,d,a)||onSegment(c,d,b);}
function assertSimple(p){for(let i=0;i<p.length;i++){const a=p[(i-1+p.length)%p.length],b=p[i],c=p[(i+1)%p.length],u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]];if(Math.abs(u[0]*v[1]-u[1]*v[0])<=EPS&&u[0]*v[0]+u[1]*v[1]<-EPS)throw new Error('self-intersecting collinear overlap is not supported');}for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){if(j===i||j===(i+1)%p.length||i===(j+1)%p.length)continue;if(segmentsIntersect(p[i],p[(i+1)%p.length],p[j],p[(j+1)%p.length]))throw new Error('self-intersecting contour is not supported');}}
function pointTri(p,a,b,c){return cross(a,b,p)>EPS&&cross(b,c,p)>EPS&&cross(c,a,p)>EPS;}
export function triangulate(poly){const ids=poly.map((_,i)=>i),tris=[];let guard=0;while(ids.length>3){let found=false;for(let k=0;k<ids.length;k++){const a=ids[(k-1+ids.length)%ids.length],b=ids[k],c=ids[(k+1)%ids.length];if(cross(poly[a],poly[b],poly[c])<=EPS)continue;if(ids.some(v=>v!==a&&v!==b&&v!==c&&pointTri(poly[v],poly[a],poly[b],poly[c])))continue;tris.push(a,b,c);ids.splice(k,1);found=true;break;}if(!found||guard++>poly.length*poly.length)throw new Error('contour could not be triangulated');}tris.push(...ids);return tris;}
function centroid(poly){let x=0,y=0,s=0;for(let i=0;i<poly.length;i++){const q=poly[(i+1)%poly.length],c=poly[i][0]*q[1]-q[0]*poly[i][1];s+=c;x+=(poly[i][0]+q[0])*c;y+=(poly[i][1]+q[1])*c;}return [x/(3*s),y/(3*s)];}

function extrude(poly,triangles,depth,positions,normals,indices){const base=positions.length/3;for(const p of poly){positions.push(p[0],p[1],0);normals.push(0,0,1);}for(const p of poly){positions.push(p[0],p[1],-depth);normals.push(0,0,-1);}for(let i=0;i<triangles.length;i+=3){indices.push(base+triangles[i],base+triangles[i+1],base+triangles[i+2]);indices.push(base+poly.length+triangles[i+2],base+poly.length+triangles[i+1],base+poly.length+triangles[i]);}
  for(let i=0;i<poly.length;i++){const j=(i+1)%poly.length,a=poly[i],b=poly[j],nx=b[1]-a[1],ny=-(b[0]-a[0]),len=Math.hypot(nx,ny),v=positions.length/3;positions.push(a[0],a[1],0,b[0],b[1],0,b[0],b[1],-depth,a[0],a[1],-depth);for(let k=0;k<4;k++)normals.push(nx/len,ny/len,0);indices.push(v,v+1,v+2,v,v+2,v+3);}}

export function compileSvg(source, config={}) {
  if(/<!DOCTYPE|<!ENTITY|<script\b/i.test(source)) throw new Error('DOCTYPE, entities, and scripts are forbidden');
  assertSafeXmlStructure(source);
  for(const tag of ['text','image','clipPath','mask','filter','pattern','linearGradient','radialGradient'])if(new RegExp(`<${tag}\\b`,'i').test(source))throw new Error(`unsupported SVG feature: ${tag}`);
  if(/<(?:g|svg)[^>]+transform=/i.test(source))throw new Error('nested/group transforms are not supported in v1');
  const root=/<svg\b([^>]*)>/i.exec(source);if(!root)throw new Error('missing svg root');const ra=attrs(root[1]),vb=(ra.viewBox??'').trim().split(/[\s,]+/).map(Number);if(vb.length!==4||vb.some(x=>!Number.isFinite(x))||vb[2]<=0||vb[3]<=0)throw new Error('viewBox must contain four finite values with positive bounds');
  const scale=config.maximumDisplayScale??4,px=config.flattenTolerancePx??0.35,sourceTol=px/scale,tol=sourceTol/Math.max(vb[2],vb[3]);const min=config.minimumDepth??0.04,max=config.maximumDepth??0.22;if(!(min>=0&&max>=min))throw new Error('depth bounds require 0 <= minimum <= maximum');
  const paths=[...source.matchAll(/<path\b([^>]*)\/?\s*>/gi)];if(!paths.length)throw new Error('no eligible path facets');
  const parsed=paths.map((m,order)=>{const a=attrs(m[1]);if(!a.d)throw new Error(`path ${order+1}: missing d`);const style={};if(a.style){for(const declaration of a.style.split(';').filter(Boolean)){const pair=declaration.split(':');if(pair.length!==2)throw new Error(`path ${order+1}: unresolved style declaration`);const key=pair[0].trim(),value=pair[1].trim();if(!['fill','stroke','fill-rule'].includes(key))throw new Error(`path ${order+1}: unsupported style property ${key}`);style[key]=value;}}const stroke=style.stroke??a.stroke;if(stroke&&stroke!=='none')throw new Error(`path ${order+1}: strokes are unsupported`);if(a.mask||a.filter||a['clip-path'])throw new Error(`path ${order+1}: paint effects are unsupported`);const fill=style.fill??a.fill;if(!fill||fill==='none'||/url\(/.test(fill))throw new Error(`path ${order+1}: solid resolved fill required`);const fillRule=style['fill-rule']??a['fill-rule']??'nonzero';if(!['nonzero','evenodd'].includes(fillRule))throw new Error(`path ${order+1}: unsupported fill-rule ${fillRule}`);const matrix=transformMatrix(a.transform);let ring=parsePath(a.d,sourceTol,p=>tx(p,matrix)).map(p=>[(p[0]-vb[0])/Math.max(vb[2],vb[3])-vb[2]/Math.max(vb[2],vb[3])/2,(vb[1]+vb[3]-p[1])/Math.max(vb[2],vb[3])-vb[3]/Math.max(vb[2],vb[3])/2]);ring=ring.filter((p,i)=>!i||Math.hypot(p[0]-ring[i-1][0],p[1]-ring[i-1][1])>EPS);assertSimple(ring);let area=signedArea(ring);if(Math.abs(area)<(config.minimumTriangleArea??1e-10))throw new Error(`path ${order+1}: degenerate contour`);if(area<0){ring=ring.reverse();area=-area;}let triangles;try{triangles=triangulate(ring);}catch(e){throw new Error(`path ${order+1}: ${e.message}`);}return {order,id:`facet-${String(order+1).padStart(2,'0')}`,sourceId:a.id??null,fill,fillRule,transform:a.transform??null,ring,triangles,area,centroid:centroid(ring)};});
  const maxArea=Math.max(...parsed.map(x=>x.area)),positions=[],normals=[],indices=[];for(const f of parsed){f.depth=min+(max-min)*Math.sqrt(f.area/maxArea);const vertexStart=positions.length/3,indexStart=indices.length;extrude(f.ring,f.triangles,f.depth,positions,normals,indices);f.mesh={vertexStart,vertexCount:positions.length/3-vertexStart,indexStart,indexCount:indices.length-indexStart};}
  const facets=parsed.map(f=>({id:f.id,sourceId:f.sourceId,sourceOrder:f.order,fill:f.fill,fillRule:f.fillRule,transform:f.transform,area:round(f.area),centroid:f.centroid.map(round),depth:round(f.depth),contourVertexCount:f.ring.length,frontTriangleCount:f.triangles.length/3,mesh:f.mesh}));
  return {manifest:{schema:SCHEMA,compilerVersion:COMPILER_VERSION,supportedSubset:'closed-filled-path-MLCZ-affine/v1',source:{sha256:sha256(source),viewBox:vb},facetCount:facets.length,facets,geometry:{vertexCount:positions.length/3,indexCount:indices.length,primitive:'triangle-list',channels:['position','normal']},coordinateSystem:{sourceY:'down',worldHandedness:'right',cameraForward:'negative-z',frontWinding:'ccw',matrixOrder:'column-vector',normalization:'viewBox-max-dimension-centered'},flattening:{screenTolerancePx:px,maximumDisplayScale:scale,modelTolerance:round(tol),method:'adaptive-de-casteljau-after-affine-bake'},depth:{policy:'sqrt-relative-area',minimum:min,maximum:max},fillRules:[...new Set(facets.map(f=>f.fillRule))],supportedFillRules:['nonzero','evenodd'],centroidMethod:'signed-polygon-area',windingNormalization:'ccw-after-svg-y-inversion',warnings:[]},geometry:{schema:'rive-animascript-3d/generated-provider/v1',positions:positions.map(round),normals:normals.map(round),indices}};
}

export function compileFile(path, config={}) { return compileSvg(readFileSync(path,'utf8'),config); }
