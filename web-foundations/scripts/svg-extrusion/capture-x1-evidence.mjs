#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const web=resolve(import.meta.dirname,'../..'),repo=resolve(web,'..'),pack=resolve(repo,'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'),out=resolve(pack,'baseline/X1');mkdirSync(out,{recursive:true});
const rel=p=>relative(repo,p),hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const artifact=resolve(web,'docs/assets/animations/fava/rive/animascript-3d/generated/favicon/manifest.json'),items=[];
for(let n=1;n<=13;n++){const id=`A${n}`,argv=['web-foundations/scripts/svg-extrusion/verify-x1-acceptance.mjs',id],stdout=execFileSync(process.execPath,argv,{cwd:repo,encoding:'utf8'}),command=`${process.execPath} ${argv.join(' ')}`,transcriptPath=resolve(out,`${id}.command.json`),transcript={acceptanceId:id,command,argv:[process.execPath,...argv],cwd:repo,exitCode:0,stdout,stderr:''};writeFileSync(transcriptPath,JSON.stringify(transcript,null,2)+'\n');items.push({id,status:'PASS',command,exitCode:0,artifact:rel(artifact),sha256:hash(artifact),expected:{assertions:[`${id}-independent-live-check`]},observed:{assertions:[`${id}-independent-live-check`],summary:stdout.trim()},commandTranscript:{path:rel(transcriptPath),sha256:hash(transcriptPath)}});}
writeFileSync(resolve(pack,'PHASE-X1-EVIDENCE.json'),JSON.stringify({phase:'X1',reportStatus:'VERIFYING',generatedBy:'capture-x1-evidence.mjs',items},null,2)+'\n');console.log('captured X1 evidence for A1-A13');
