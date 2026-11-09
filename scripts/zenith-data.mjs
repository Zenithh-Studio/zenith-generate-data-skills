#!/usr/bin/env node
/**
 * Zenith Production Data CLI — no external dependencies.
 * validate <project.json> | export <project.json> --out <directory>
 * Source of truth is script narration. CSV is an interchange view; lossless JSON is canonical.
 */
import fs from 'node:fs';
import path from 'node:path';

export const TAB_NAMES = Object.freeze([
  '01 Overview','02 Research','03 Script','04 Visual Bible',
  '05 Shot Master','06 Image Prompts','07 Motion Prompts'
]);
const compact = value => String(value ?? '').trim().replace(/\s+/g, ' ');
const words = value => compact(value).split(' ').filter(Boolean);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const setOf = array => new Set(array.map(x => x.id));
const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const validArray = v => Array.isArray(v) ? v : [];

function parsePositive(v) { return Number.isFinite(v) && v > 0; }
function durationEq(a,b) { return Math.abs(a-b) < 0.0001; }
export function validatePackage(pkg) {
  const errors = [], warnings = [];
  const err = (code, message) => errors.push({ code, message });
  const warn = (code, message) => warnings.push({ code, message });
  if (!isObject(pkg)) return { ok:false, errors:[{code:'PACKAGE',message:'Root must be an object'}],warnings };
  if (pkg.schema_version !== '1.0') err('VERSION','schema_version must be 1.0');
  const keys=['overview','research','script','visual_bible','shots','image_prompts','motion_prompts'];
  for(const key of keys) if(key === 'overview' ? !isObject(pkg[key]) : !Array.isArray(pkg[key])) err('SHAPE',key+' is missing or wrong type');
  if(errors.length) return {ok:false,errors,warnings};
  if(!nonempty(pkg.overview.youtube_title) || !nonempty(pkg.overview.youtube_description)) err('OVERVIEW','YouTube title and description required');
  if(!nonempty(pkg.overview.central_question) || !nonempty(pkg.overview.historical_thesis)) err('OVERVIEW','Central question and thesis required');
  if(!nonempty(pkg.overview.project_id)) err('OVERVIEW','project_id required');
  const checkUnique=(xs,label)=>{const seen=new Set();for(const x of xs){if(!x||!nonempty(x.id)) {err('MISSING_ID',label+' has an entry without id');continue;}if(seen.has(x.id))err('DUPLICATE_ID',label+' duplicates '+x.id);seen.add(x.id);}};
  for(const key of ['research','script','visual_bible','shots','image_prompts','motion_prompts']) checkUnique(pkg[key],key);
  const bible=new Map(pkg.visual_bible.map(x=>[x.id,x]));
  const scenes=new Map(pkg.script.map(x=>[x.id,x]));
  const shotMap=new Map(pkg.shots.map(x=>[x.id,x]));
  const imageMap=new Map(pkg.image_prompts.map(x=>[x.id,x]));
  const motionMap=new Map(pkg.motion_prompts.map(x=>[x.id,x]));
  const claims=setOf(pkg.research);
  for(const entry of pkg.research) {
    if(entry.type==='CLAIM' && !nonempty(entry.source_url)) warn('UNSOURCED','Research claim '+entry.id+' lacks a source URL');
    if(entry.verification==='UNVERIFIED') warn('UNVERIFIED','Research '+entry.id+' remains unverified');
  }
  for(const v of pkg.visual_bible) {
    if(!['CHARACTER','ENVIRONMENT'].includes(v.type)) err('BIBLE_TYPE',v.id+' has invalid type');
    if(!isObject(v.prompt_json) || !nonempty(v.prompt_json.filename)) err('BIBLE_PROMPT',v.id+' must have prompt_json.filename');
  }
  const sceneOrder = pkg.script.map(x=>x.id);
  let previousSceneEnd=null;
  for(const scene of pkg.script) {
    if(!nonempty(scene.narration)) err('NARRATION','Empty narration in '+scene.id);
    if(!parsePositive(scene.end_seconds-scene.start_seconds)) err('SCENE_TIME',scene.id+' requires positive interval');
    if(previousSceneEnd!==null && !durationEq(scene.start_seconds,previousSceneEnd)) err('SCENE_GAP',scene.id+' is not contiguous');
    previousSceneEnd=scene.end_seconds;
    const rs=validArray(scene.research_claim_ids);
    for(const claim of rs) if(!claims.has(claim)) err('CLAIM_REF',scene.id+' references unknown '+claim);
    const shotList=pkg.shots.filter(s=>s.scene_id===scene.id);
    if(!shotList.length){err('SCENE_EMPTY',scene.id+' has no shots');continue;}
    const reconstructed=shotList.map(s=>s.narration_anchor).join(' ');
    if(compact(reconstructed)!==compact(scene.narration)) err('NARRATION_COVERAGE',scene.id+' shot anchors do not reproduce narration exactly');
    if(!durationEq(shotList[0].start_seconds,scene.start_seconds)||!durationEq(shotList.at(-1).end_seconds,scene.end_seconds)) err('SCENE_BOUNDARY',scene.id+' shot boundaries mismatch');
    for(let i=1;i<shotList.length;i++) if(!durationEq(shotList[i].start_seconds,shotList[i-1].end_seconds))err('SHOT_GAP',scene.id+' gap/overlap before '+shotList[i].id);
    const expectedWordCount=words(scene.narration).length;
    if(scene.words!==undefined && Number(scene.words)!==expectedWordCount) err('WORD_COUNT',scene.id+' expected '+expectedWordCount);
  }
  if(!pkg.script.length)err('NO_SCENES','At least one scene required');
  if(!pkg.shots.length)err('NO_SHOTS','At least one shot required');
  for(const shot of pkg.shots){
    if(!scenes.has(shot.scene_id))err('SCENE_REF',shot.id+' unknown scene');
    if(!nonempty(shot.visual_concept))err('SHOT_VISUAL',shot.id+' missing visual');
    if(!nonempty(shot.narration_anchor))err('SHOT_ANCHOR',shot.id+' missing anchor');
    if(!parsePositive(shot.duration_seconds)||!durationEq(shot.end_seconds-shot.start_seconds,shot.duration_seconds))err('SHOT_DURATION',shot.id+' duration mismatch');
    if(!imageMap.has(shot.image_prompt_id))err('IMAGE_REF',shot.id+' missing image '+shot.image_prompt_id);
    if(!motionMap.has(shot.animation_id))err('MOTION_REF',shot.id+' missing motion '+shot.animation_id);
  }
  for(const image of pkg.image_prompts){
    const shot=shotMap.get(image.shot_id),j=image.prompt_json;
    if(!shot){err('IMAGE_SHOT',image.id+' unknown shot');continue;}
    if(image.id!==shot.image_prompt_id)err('IMAGE_ID',image.id+' not linked from '+shot.id);
    if(image.scene_id!==shot.scene_id)err('IMAGE_SCENE',image.id+' scene differs from shot');
    if(!isObject(j)){err('IMAGE_JSON',image.id+' prompt_json missing');continue;}
    if(j.shot_id!==shot.id||j.scene_id!==shot.scene_id||j.prompt_id!==image.id)err('IMAGE_JSON_IDS',image.id+' JSON IDs mismatch');
    if(compact(j.narration_anchor)!==compact(shot.narration_anchor))err('IMAGE_ANCHOR',image.id+' narration differs');
    if(!nonempty(j.prompt)||!nonempty(j.negative_prompt))err('IMAGE_TEXT',image.id+' image and negative prompts required');
    if(!isObject(j.output)||!['16:9','9:16'].includes(j.output.aspect_ratio))err('IMAGE_OUTPUT',image.id+' missing aspect_ratio');
    const refs=image.references;
    if(!isObject(refs)||!Array.isArray(refs.characters)||!Array.isArray(refs.environments)||!Array.isArray(refs.props)){err('REFERENCES',image.id+' references must have characters/environments/props arrays');continue;}
    for(const [key,type] of [['characters','CHARACTER'],['environments','ENVIRONMENT']]){
      for(const id of refs[key]) {
        const v=bible.get(id);
        if(!v)err('MISSING_REFERENCE',image.id+' unknown '+type+' '+id);
        else if(v.type!==type)err('REFERENCE_TYPE',image.id+' '+id+' is not '+type);
      }
    }
    if(!equal(refs,j.references))err('REFERENCE_SYNC',image.id+' JSON references disagree with row');
  }
  for(const motion of pkg.motion_prompts){
    const shot=shotMap.get(motion.shot_id),j=motion.prompt_json;
    if(!shot){err('MOTION_SHOT',motion.id+' unknown shot');continue;}
    if(motion.id!==shot.animation_id)err('MOTION_ID',motion.id+' not linked from shot');
    if(!isObject(j)){err('MOTION_JSON',motion.id+' prompt_json missing');continue;}
    if(j.animation_id!==motion.id||j.shot_id!==shot.id||j.scene_id!==shot.scene_id)err('MOTION_JSON_IDS',motion.id+' JSON IDs mismatch');
    if(j.image_prompt_id!==shot.image_prompt_id)err('MOTION_IMAGE',motion.id+' references wrong image');
    if(j.image_input?.source!=='generated_image'||j.image_input.image_prompt_id!==shot.image_prompt_id)err('IMAGE_HANDOFF',motion.id+' invalid image input contract');
    if(compact(j.narration_anchor)!==compact(shot.narration_anchor))err('MOTION_ANCHOR',motion.id+' narration differs');
    if(!durationEq(j.duration_seconds,shot.duration_seconds))err('MOTION_DURATION',motion.id+' duration differs from Shot Master');
    if(!nonempty(j.prompt)||!nonempty(j.camera)||!nonempty(j.motion_method))err('MOTION_TEXT',motion.id+' missing motion instructions');
    if(imageMap.has(shot.image_prompt_id)&&!equal(j.references,imageMap.get(shot.image_prompt_id).references))err('MOTION_REFERENCES',motion.id+' references differ from Image Prompt');
  }
  if(pkg.shots.length!==pkg.image_prompts.length||pkg.shots.length!==pkg.motion_prompts.length)err('ONE_TO_ONE','Shot, image and motion counts must be equal');
  if(new Set(pkg.shots.map(s=>s.image_prompt_id)).size!==pkg.shots.length||new Set(pkg.shots.map(s=>s.animation_id)).size!==pkg.shots.length)err('ONE_TO_ONE','Image and animation IDs must be used exactly once');
  if(pkg.overview.shot_count!==undefined&&Number(pkg.overview.shot_count)!==pkg.shots.length)err('OVERVIEW_COUNT','Overview shot_count mismatch');
  const totalDuration=pkg.shots.reduce((sum,shot)=>sum+(Number(shot.duration_seconds)||0),0);
  if(pkg.overview.duration_seconds!==undefined&&!durationEq(Number(pkg.overview.duration_seconds),totalDuration))err('OVERVIEW_DURATION','Overview duration_seconds mismatch');
  if(pkg.script.length>=1) {
    const intro=pkg.shots.filter(s=>s.start_seconds<30);
    if(!intro.length||Math.max(...intro.map(x=>x.end_seconds))<30)warn('HOOK_TIME','Opening 30 seconds are not fully shot-mapped');
    const introWords=intro.reduce((n,x)=>n+words(x.narration_anchor).length,0);
    if(introWords>90)warn('HOOK_PACE','Opening 30-second narration may be too dense ('+introWords+' words)');
  }
  return {ok:errors.length===0,errors,warnings,stats:{scenes:pkg.script.length,shots:pkg.shots.length,images:pkg.image_prompts.length,motions:pkg.motion_prompts.length,duration_seconds:totalDuration}};
}
const quote = value => {const s=(isObject(value)||Array.isArray(value))?JSON.stringify(value):String(value??'');return '"'+s.replaceAll('"','""')+'"';};
const csv = (rows) => '\ufeff'+rows.map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n';
export function buildTabs(pkg){
  const format = s => {const m=Math.floor(s/60), ss=s%60;return String(m).padStart(2,'0')+':'+String(ss).padStart(2,'0');};
  const details=[
  [TAB_NAMES[0],[['Field','Value','Notes'],...Object.entries(pkg.overview).map(([k,v])=>[k, typeof v==='object'?JSON.stringify(v):v,''])]],
  [TAB_NAMES[1],[['Record type','ID','Title / conclusion','Source / URL','Passage / coverage','Verification','Caveat / rights','Action'],...pkg.research.map(x=>[x.type,x.id,x.title,x.source_url,x.coverage,x.verification,x.caveat,x.next_action])]],
  [TAB_NAMES[2],[['Scene ID','Section','Narrative question','Narration (EN)','Words','Draft start','Draft end','Estimated length','Research claim IDs'],...pkg.script.map(x=>[x.id,x.section,x.narrative_question,x.narration,words(x.narration).length,format(x.start_seconds),format(x.end_seconds),'Provisional; retime to recorded narration',validArray(x.research_claim_ids).join('; ')])]],
  [TAB_NAMES[3],[['Type','ID','Name / location','Reference requirement','Period / appearance','Consistency','Source reference','Approval','Prompt JSON'],...pkg.visual_bible.map(x=>[x.type,x.id,x.name,x.reference_requirement,x.appearance,x.consistency,x.source_reference,x.approval||'',JSON.stringify(x.prompt_json)])]],
  [TAB_NAMES[4],[['Shot ID','Scene ID','Draft In','Draft Out','Duration','Narration anchor','Visual concept','Image prompt ID','Animation prompt ID','Fact source'],...pkg.shots.map(x=>[x.id,x.scene_id,format(x.start_seconds),format(x.end_seconds),x.duration_seconds,x.narration_anchor,x.visual_concept,x.image_prompt_id,x.animation_id,validArray(x.fact_source_ids).join('; ')])]],
  [TAB_NAMES[5],[['Prompt ID','Shot ID','Scene ID','Reference IDs','Image prompt EN — production draft','Negative constraints','Framing','Lighting','Layer plan','Historical source','Prompt JSON'],...pkg.image_prompts.map(x=>[x.id,x.shot_id,x.scene_id,JSON.stringify(x.references),x.prompt_json.prompt,x.prompt_json.negative_prompt,x.prompt_json.framing,x.prompt_json.lighting,x.prompt_json.layer_plan,validArray(x.historical_sources).join('; '),JSON.stringify(x.prompt_json)])]],
  [TAB_NAMES[6],[['Animation ID','Shot ID','Motion method','Motion prompt EN — production draft','Camera','Duration draft','Layer actions','Transition','Prompt JSON'],...pkg.motion_prompts.map(x=>[x.id,x.shot_id,x.motion_method,x.prompt_json.prompt,x.prompt_json.camera,x.prompt_json.duration_seconds,x.prompt_json.layer_actions,x.prompt_json.transition,JSON.stringify(x.prompt_json)])]]
  ];
  return details;
}
export function exportPackage(pkg,dir){
  const check=validatePackage(pkg);
  if(!check.ok) throw Error('Validation failed:\n'+check.errors.map(x=>x.code+': '+x.message).join('\n'));
  fs.mkdirSync(dir,{recursive:true});
  const files=[];
  for(const [name,rows] of buildTabs(pkg)){
    const filename=name.replaceAll(' ','_')+'.csv';
    fs.writeFileSync(path.join(dir,filename),csv(rows),'utf8');files.push({tab:name,filename,rows:rows.length-1});
  }
  fs.writeFileSync(path.join(dir,'zenith-project.json'),JSON.stringify(pkg,null,2)+'\n');
  fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify({schema_version:'1.0',project_id:pkg.overview.project_id,tabs:files,stats:check.stats},null,2)+'\n');
  fs.writeFileSync(path.join(dir,'import-guide.md'),'# Import Zenith production data\n\nImport each UTF-8 CSV as its matching tab. Preserve tab names and all JSON cells without spreadsheet type coercion. Use zenith-project.json for the lossless app import. Run validate before executing provider nodes.\n');
  return {files,stats:check.stats,warnings:check.warnings};
}
function main(argv){
  const [cmd,file,...options]=argv;
  if(!['validate','export'].includes(cmd)||!file){console.error('Usage: node scripts/zenith-data.mjs <validate|export> <zenith-project.json> [--out <directory>]');process.exitCode=2;return;}
  let pkg;
  try{pkg=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){console.error('Cannot load JSON: '+e.message);process.exitCode=2;return;}
  const check=validatePackage(pkg);
  for(const issue of check.errors)console.error('ERROR '+issue.code+': '+issue.message);
  for(const issue of check.warnings)console.warn('WARN '+issue.code+': '+issue.message);
  if(!check.ok){process.exitCode=1;return;}
  if(cmd==='validate')console.log(JSON.stringify({ok:true,stats:check.stats,warnings:check.warnings.length},null,2));
  if(cmd==='export'){
    const pos=options.indexOf('--out');
    if(pos<0||!options[pos+1]){console.error('export needs --out <directory>');process.exitCode=2;return;}
    console.log(JSON.stringify(exportPackage(pkg,options[pos+1]),null,2));
  }
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname))main(process.argv.slice(2));
