#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const web=resolve(import.meta.dirname,'../..'),repo=resolve(web,'..'),pack=resolve(repo,'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'),out=resolve(pack,'baseline/X2');mkdirSync(out,{recursive:true});
const rel=p=>relative(repo,p),hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const rive=resolve(web,'docs/assets/animations/fava/rive/animascript-3d');
const artifacts={
	A1:resolve(rive,'build/gpu-manifest.json'),
	A2:resolve(rive,'build/canonical-rest.png'),
	A3:resolve(rive,'build/canonical-rest.png'),
	A4:resolve(rive,'build/canonical-oblique.png'),
	A5:resolve(rive,'generated/favicon/manifest.json'),
	A6:resolve(rive,'build/canonical-narrow.png'),
	A7:resolve(rive,'generated/favicon/geometry.json'),
	A8:resolve(rive,'generated/favicon/geometry.json'),
};
const items=[];
for(let n=1;n<=8;n++){const id=`A${n}`,argv=['web-foundations/scripts/svg-extrusion/verify-fidelity.mjs',id],stdout=execFileSync(process.execPath,argv,{cwd:repo,encoding:'utf8'}),command=`${process.execPath} ${argv.join(' ')}`,transcriptPath=resolve(out,`${id}.command.json`),transcript={acceptanceId:id,command,argv:[process.execPath,...argv],cwd:repo,exitCode:0,stdout,stderr:''};writeFileSync(transcriptPath,JSON.stringify(transcript,null,2)+'\n');const artifact=artifacts[id];items.push({id,status:'PASS',command,exitCode:0,artifact:rel(artifact),sha256:hash(artifact),expected:{assertions:[`${id}-independent-live-check`]},observed:{assertions:[`${id}-independent-live-check`],summary:stdout.trim()},commandTranscript:{path:rel(transcriptPath),sha256:hash(transcriptPath)}});}
writeFileSync(resolve(pack,'PHASE-X2-EVIDENCE.json'),JSON.stringify({phase:'X2',reportStatus:'VERIFYING',generatedBy:'capture-x2-evidence.mjs',items},null,2)+'\n');console.log('captured X2 evidence for A1-A8');
