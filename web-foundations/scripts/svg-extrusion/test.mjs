#!/usr/bin/env node
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { compileSvg, parsePath, signedArea, triangulate } from './compiler.mjs';

const here=resolve(import.meta.dirname),root=resolve(here,'../..');
const canonical=resolve(root,'docs/assets/icons/fava-mark-static.svg'),fixture=resolve(here,'fixtures/concave-cubic.svg'),config=JSON.parse(readFileSync(resolve(here,'fixtures/config.json')));
const compile=p=>compileSvg(readFileSync(p,'utf8'),config);
const a=compile(canonical),b=compile(fixture);
assert.equal(a.manifest.facetCount,13,'golden fixture drift'); assert.equal(b.manifest.facetCount,2); assert.notEqual(a.manifest.facetCount,b.manifest.facetCount);
for(const r of [a,b]){assert.deepEqual(r.manifest.facets.map(x=>x.id),r.manifest.facets.map((_,i)=>`facet-${String(i+1).padStart(2,'0')}`));for(const f of r.manifest.facets){assert.ok(f.area>0);assert.ok(f.depth>=config.minimumDepth&&f.depth<=config.maximumDepth);const expected=config.minimumDepth+(config.maximumDepth-config.minimumDepth)*Math.sqrt(f.area/Math.max(...r.manifest.facets.map(x=>x.area)));assert.ok(Math.abs(f.depth-expected)<1e-9);assert.ok(f.mesh.indexCount>0&&f.mesh.vertexCount>0);}}
const concave=parsePath('M0 0L4 0L4 1L1 1L1 4L0 4Z',.01);assert.equal(signedArea(concave),7);assert.equal(triangulate(concave).length,(concave.length-2)*3);
const implicit=parsePath('M0 0 4 0 4 4 0 4z',.01);assert.equal(implicit.length,4);assert.equal(Math.abs(signedArea(implicit)),16);
const relative=parsePath('m0 0 l4 0 0 4 -4 0 z',.01);assert.equal(relative.length,4);
const exponent=parsePath('M+0e0 -0 L4e0 0 4 4 0 4z',.01);assert.equal(exponent.length,4);
for(const [name,svg,pattern] of [
 ['self-intersection','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L10 10L0 10L10 0Z"/></svg>',/self-intersecting/],
 ['subpaths','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z M5 5L7 5L7 7Z"/></svg>',/multiple subpaths/],
 ['stroke','<svg viewBox="0 0 10 10"><path fill="#000" stroke="#fff" d="M0 0L2 0L2 2Z"/></svg>',/strokes/],
 ['style-stroke','<svg viewBox="0 0 10 10"><path style="fill:#000;stroke:#fff" d="M0 0L2 0L2 2Z"/></svg>',/strokes/],
 ['style-unknown','<svg viewBox="0 0 10 10"><path style="fill:#000;opacity:.5" d="M0 0L2 0L2 2Z"/></svg>',/unsupported style property/],
 ['fill-rule','<svg viewBox="0 0 10 10"><path fill="#000" fill-rule="banana" d="M0 0L2 0L2 2Z"/></svg>',/unsupported fill-rule/],
 ['collinear-overlap','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L10 0L5 0L10 10L0 10Z"/></svg>',/collinear overlap/],
 ['mask','<svg viewBox="0 0 10 10"><mask id="m"/><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>',/mask/],
 ['arc','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0A2 2 0 0 0 2 2Z"/></svg>',/unsupported path syntax/],
 ['degenerate','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L1 0L2 0Z"/></svg>',/degenerate|collinear/],
 ['malformed','<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"></svg>',/malformed/],
 ['doctype','<!DOCTYPE svg [<!ENTITY x "x">]><svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>',/DOCTYPE/],
])assert.throws(()=>compileSvg(svg,config),pattern,name);
const evenodd=compileSvg('<svg viewBox="0 0 10 10"><path style="fill:#000;fill-rule:evenodd;stroke:none" d="M0 0L2 0L2 2Z"/></svg>',config);assert.deepEqual(evenodd.manifest.fillRules,['evenodd']);assert.deepEqual(evenodd.manifest.supportedFillRules,['nonzero','evenodd']);
assert.throws(()=>compileSvg(readFileSync(fixture,'utf8'),{...config,minimumDepth:.3,maximumDepth:.2}),/depth bounds/);
// Dense cubic reference: every flattened segment stays within the declared screen tolerance.
const ring=parsePath('M0 0 C15 60 85 -20 100 40 L100 50 L0 50 Z',config.flattenTolerancePx/config.maximumDisplayScale);let max=0;for(let k=0;k<=10000;k++){const t=k/10000,u=1-t,p=[3*u*u*t*15+3*u*t*t*85+t*t*t*100,3*u*u*t*60+3*u*t*t*-20+t*t*t*40];let best=Infinity;for(let i=0;i<ring.length-3;i++){const x=ring[i],y=ring[i+1],dx=y[0]-x[0],dy=y[1]-x[1],q=Math.max(0,Math.min(1,((p[0]-x[0])*dx+(p[1]-x[1])*dy)/(dx*dx+dy*dy)));best=Math.min(best,Math.hypot(p[0]-x[0]-q*dx,p[1]-x[1]-q*dy));}max=Math.max(max,best);}assert.ok(max*config.maximumDisplayScale<=config.flattenTolerancePx*1.01,`dense deviation ${max}`);
const transformed=compileSvg('<svg viewBox="0 0 100000 100000"><path fill="#000" transform="scale(1000 600)" d="M0 0C15 60 85 -20 100 40L100 50L0 50Z"/></svg>',config),facet=transformed.manifest.facets[0],pos=transformed.geometry.positions,poly=Array.from({length:facet.contourVertexCount},(_,i)=>[pos[i*3],pos[i*3+1]]);let transformedMax=0;for(let k=0;k<=10000;k++){const t=k/10000,u=1-t,p=[(3*u*u*t*15+3*u*t*t*85+t*t*t*100)*1000/100000-.5,.5-(3*u*u*t*60+3*u*t*t*-20+t*t*t*40)*600/100000];let best=Infinity;for(let i=0;i<poly.length;i++){const x=poly[i],y=poly[(i+1)%poly.length],dx=y[0]-x[0],dy=y[1]-x[1],q=Math.max(0,Math.min(1,((p[0]-x[0])*dx+(p[1]-x[1])*dy)/(dx*dx+dy*dy)));best=Math.min(best,Math.hypot(p[0]-x[0]-q*dx,p[1]-x[1]-q*dy));}transformedMax=Math.max(transformedMax,best);}assert.ok(transformedMax*100000*config.maximumDisplayScale<=config.flattenTolerancePx*1.01,`transformed dense deviation ${transformedMax*100000*config.maximumDisplayScale}px`);
const out1=mkdtempSync(resolve(tmpdir(),'svgx1-a-')),out2=mkdtempSync(resolve(tmpdir(),'svgx1-b-'));for(const out of [out1,out2])execFileSync(process.execPath,[resolve(here,'cli.mjs'),'--input',fixture,'--output',out,'--config',resolve(here,'fixtures/config.json')]);for(const file of ['manifest.json','geometry.json','fallback.svg','rive-scene.fragment.json'])assert.deepEqual(readFileSync(resolve(out1,file)),readFileSync(resolve(out2,file)),`${file} deterministic`);
console.log('PASS X1 compiler: canonical N=13, distinct curved/concave N=2, geometry/rejection/determinism checks');
