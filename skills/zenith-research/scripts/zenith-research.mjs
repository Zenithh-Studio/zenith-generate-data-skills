#!/usr/bin/env node
/**
 * zenith-research: independent stage entrypoint.
 * check <project.json> — verify this stage in the canonical full-package context.
 * render <project.json> — produce a Markdown stage review (stdout).
 * Self-contained execution: no npm packages, no network, no API key.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePackage } from '../../../scripts/zenith-data.mjs';

export const STAGE = 'research';
export const SKILL = 'zenith-research';
export function check(doc) {
  const result=validatePackage(doc);
  const value=doc?.[STAGE];
  const count=Array.isArray(value)?value.length:(value&&typeof value==='object'?Object.keys(value).length:0);
  const errors=[...result.errors];
  if(!value || (Array.isArray(value)&&value.length===0))errors.push({code:'STAGE_EMPTY',message:SKILL+' has no '+STAGE+' content'});
  return {skill:SKILL,stage:STAGE,ok:errors.length===0,count,errors,warnings:result.warnings,stats:result.stats};
}
const esc = x => String(x??'').replaceAll('|','\\|').replaceAll('\\n',' ');
export function render(doc) {
  const r=check(doc);
  const value=doc?.[STAGE];
  const rows=Array.isArray(value)?value.map((x,i)=>[i+1,x?.id??'',x?.title??x?.name??x?.section??x?.visual_concept??x?.motion_method??'']):Object.entries(value??{}).map(([k,v],i)=>[i+1,k,typeof v==='object'?JSON.stringify(v):v]);
  return ['# '+SKILL+' stage review','','**Status:** '+(r.ok?'PASS':'BLOCKED'),'**Records:** '+r.count,'','| # | ID / Field | Description |','|---:|---|---|',...rows.map(x=>'| '+x.map(esc).join(' | ')+' |'),'','## Validation findings',...(r.errors.length?r.errors.map(x=>'- ERROR '+x.code+': '+x.message):['- No structural errors.']),...(r.warnings.map(x=>'- WARN '+x.code+': '+x.message)),'','Editorial quality and source rights require human review.'].join('\\n')+'\\n';
}
function main(args){
  const [cmd,file]=args;
  if(!['check','render'].includes(cmd)||!file){console.error('Usage: node scripts/zenith-research.mjs <check|render> <zenith-project.json>');process.exitCode=2;return;}
  let doc;
  try{doc=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){console.error('Invalid JSON: '+e.message);process.exitCode=2;return;}
  const result=check(doc);
  if(cmd==='render')process.stdout.write(render(doc));
  else console.log(JSON.stringify(result,null,2));
  if(!result.ok)process.exitCode=1;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2));
