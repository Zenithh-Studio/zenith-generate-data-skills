import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validatePackage, buildTabs, exportPackage, TAB_NAMES } from '../scripts/zenith-data.mjs';

const fixture = JSON.parse(fs.readFileSync(new URL('../examples/napoleon-mini.json',import.meta.url),'utf8'));
const clone = () => structuredClone(fixture);
const codes = result => result.errors.map(x=>x.code);
test('valid mini package passes and counts match',()=>{
  const r=validatePackage(clone());
  assert.deepEqual(r.errors,[]);
  assert.equal(r.ok,true);
  assert.deepEqual(r.stats,{scenes:1,shots:3,images:3,motions:3,duration_seconds:20});
});
test('exports exactly seven named sheets',()=>{
  const tabs=buildTabs(clone());
  assert.deepEqual(tabs.map(x=>x[0]),TAB_NAMES);
  assert.deepEqual(tabs.map(x=>x[1].length-1),[Object.keys(fixture.overview).length,2,1,3,3,3,3]);
});
test('export writes BOM CSV, manifest and JSON',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'zenith-'));
  try {
    const result=exportPackage(clone(),dir);
    assert.equal(result.files.length,7);
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8')).tabs.length,7);
    assert.equal(fs.readFileSync(path.join(dir,'06_Image_Prompts.csv'),'utf8')[0],'\ufeff');
    assert.ok(fs.existsSync(path.join(dir,'zenith-project.json')));
    assert.ok(fs.readFileSync(path.join(dir,'07_Motion_Prompts.csv'),'utf8').includes('Prompt JSON'));
    assert.ok(!fs.readFileSync(path.join(dir,'07_Motion_Prompts.csv'),'utf8').includes('Risk / QC'));
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
test('detects duplicated scene IDs',()=>{
  const p=clone();p.script.push({...p.script[0]});
  assert.ok(codes(validatePackage(p)).includes('DUPLICATE_ID'));
});
test('detects missing narration tokens',()=>{
  const p=clone();p.shots[0].narration_anchor='In 1812 Napoleon marched';
  assert.ok(codes(validatePackage(p)).includes('NARRATION_COVERAGE'));
});
test('detects wrong image prompt shot mapping',()=>{
  const p=clone();p.image_prompts[0].prompt_json.shot_id='SH-999';
  assert.ok(codes(validatePackage(p)).includes('IMAGE_JSON_IDS'));
});
test('detects missing visual-bible character',()=>{
  const p=clone();p.image_prompts[0].references.characters=['NONEXISTENT'];
  p.image_prompts[0].prompt_json.references.characters=['NONEXISTENT'];
  assert.ok(codes(validatePackage(p)).includes('MISSING_REFERENCE'));
});
test('detects reference JSON divergence',()=>{
  const p=clone();p.image_prompts[0].prompt_json.references.environments=['SNOW_ROAD'];
  assert.ok(codes(validatePackage(p)).includes('REFERENCE_SYNC'));
});
test('detects motion duration mismatch',()=>{
  const p=clone();p.motion_prompts[0].prompt_json.duration_seconds=9;
  assert.ok(codes(validatePackage(p)).includes('MOTION_DURATION'));
});
test('detects wrong image-to-motion linkage',()=>{
  const p=clone();p.motion_prompts[0].prompt_json.image_input.image_prompt_id='IMG-999';
  assert.ok(codes(validatePackage(p)).includes('IMAGE_HANDOFF'));
});
test('detects missing motion and one-to-one violations',()=>{
  const p=clone();p.motion_prompts.pop();
  assert.ok(codes(validatePackage(p)).includes('ONE_TO_ONE'));
});
test('rejects wrong asset type for environment',()=>{
  const p=clone();p.image_prompts[0].references.environments=['NAPOLEON'];
  p.image_prompts[0].prompt_json.references.environments=['NAPOLEON'];
  assert.ok(codes(validatePackage(p)).includes('REFERENCE_TYPE'));
});
test('detects shot gap and duration drift',()=>{
  const p=clone();p.shots[1].start_seconds=8;
  assert.ok(codes(validatePackage(p)).includes('SHOT_GAP'));
  assert.ok(codes(validatePackage(p)).includes('SHOT_DURATION'));
});
test('detects unknown research claim',()=>{
  const p=clone();p.script[0].research_claim_ids.push('CL-MISSING');
  assert.ok(codes(validatePackage(p)).includes('CLAIM_REF'));
});
test('detects overview runtime drift',()=>{
  const p=clone();p.overview.duration_seconds=999;
  assert.ok(codes(validatePackage(p)).includes('OVERVIEW_DURATION'));
});
test('rejects invalid schema and missing metadata',()=>{
  const p=clone();p.schema_version='2.0';p.overview.youtube_title='';
  const e=codes(validatePackage(p));assert.ok(e.includes('VERSION'));assert.ok(e.includes('OVERVIEW'));
});

test('rejects motion narration or voice fields',()=>{
  const p=clone();p.motion_prompts[0].prompt_json.narration_anchor='Should not be present';
  assert.ok(codes(validatePackage(p)).includes('MOTION_VOICE'));
});
test('rejects invalid motion sound contract',()=>{
  const p=clone();p.motion_prompts[0].prompt_json.sound_design.voice=true;
  assert.ok(codes(validatePackage(p)).includes('MOTION_SOUND'));
});
