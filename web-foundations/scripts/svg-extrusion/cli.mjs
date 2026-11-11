#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { compileSvg, sha256 } from './compiler.mjs';

const args=process.argv.slice(2),get=(n,d)=>{const i=args.indexOf(n);return i<0?d:args[i+1]};
const input=get('--input',args[0]),output=get('--output'),configPath=get('--config');
if(!input||!output){console.error('Usage: node cli.mjs --input source.svg --output build/dir [--config config.json]');process.exit(2);}
try {
  const sourcePath=resolve(input),out=resolve(output),source=readFileSync(sourcePath,'utf8');
  const config=configPath?JSON.parse(readFileSync(resolve(configPath),'utf8')):{};
  const result=compileSvg(source,config.geometry??config);
  result.manifest.source.path=basename(sourcePath);result.manifest.resolvedConfigSha256=sha256(JSON.stringify(config));
  mkdirSync(out,{recursive:true});
  const json=v=>JSON.stringify(v,null,2)+'\n';
  writeFileSync(resolve(out,'manifest.json'),json(result.manifest));writeFileSync(resolve(out,'geometry.json'),json(result.geometry));
  writeFileSync(resolve(out,'rive-scene.fragment.json'),json({schema:'rive-animascript-3d/v1',geometry:{providers:[{id:'svg-extrusion',kind:'generated-package',manifest:'manifest.json',geometry:'geometry.json'}]},interaction:{picking:'nearest-visible-triangle',persistentSelection:true,reset:true}}));
  copyFileSync(sourcePath,resolve(out,'fallback.svg'));
  console.log(`compiled ${result.manifest.facetCount} facets, ${result.manifest.geometry.vertexCount} vertices, ${result.manifest.geometry.indexCount} indices → ${out}`);
} catch(error){console.error(`svg-extrusion: ${error.message}`);process.exit(1);}
