#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { check, render, STAGE, SKILL } from './zenith-visual-bible.mjs';
const doc=JSON.parse(fs.readFileSync(new URL('../examples/sample.json',import.meta.url),'utf8'));
const valid=check(doc);
assert.equal(valid.ok,true,SKILL+' valid fixture must pass');
assert.ok(valid.count>0,SKILL+' must contain records');
assert.ok(render(doc).includes('**Status:** PASS'),SKILL+' report should show PASS');
const invalid=structuredClone(doc);
invalid[STAGE]=Array.isArray(invalid[STAGE])?[]:null;
const blocked=check(invalid);
assert.equal(blocked.ok,false,SKILL+' empty stage must fail');
assert.ok(blocked.errors.some(x=>x.code==='STAGE_EMPTY'||x.code==='SHAPE'),SKILL+' missing stage must be diagnosed');
console.log(SKILL+': 5 assertions passed (positive, negative and render).');
