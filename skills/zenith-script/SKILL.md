---
version: 1.1.0
name: zenith-script
description: Write complete documentary narration and narrative scenes with an evidence-linked opening hook, cause-and-effect pacing, and coherent payoff.
---
# Zenith Script
Required: positioning/idea, research claims, approximate duration, language, target viewer.
Output: `script` array with stable SC-001 IDs, `section`, `narrative_question`, `narration`, `research_claim_ids`, `start_seconds`, `end_seconds`.

## Write actual narration
The `narration` field is full voice-over prose in the delivery language. It is **not a bullet outline** and cannot be paraphrased by shot/image/motion stages. Let the user independently generate VO; do not require an audio file or status.

## Opening 30 seconds
- 0–5s: name subject plus immediate historical stakes.
- 5–10s: consequence or sharp contrast.
- 10–20s: reveal a commonly misunderstood causal explanation, carefully qualified.
- 20–30s: unresolved central decision and an answer-worthy question.
- Align video title, thumbnail, hook, body and closing payoff; no clickbait answer-switch.
- Narration must be plausible for timing. Compute approximate spoken-word budgets (default 130–150 wpm), mark durations estimated, and refine from recorded speech.

## Body
Use cause → decision → constraint → reversal → consequence. Introduce background only when necessary for the central question. Avoid repeating facts and scenes. Keep chronology straight and avoid attributing thoughts without sources.
Each scene should have one audience question and a causal transition; research IDs must exist in Research.

## Deterministic check
Split every `narration` on whitespace and allocate **all** tokens exactly once, in order, to Shot Master. If narration changes, invalidate and regenerate anchors and prompt JSON. Never trim or rewrite an anchor without modifying Script.

## Acceptance
Read aloud for information density, historical qualification and repeated phrasing. Evaluate hook, rhythm and factual alignment; do not fabricate audience retention numbers.

## Local package layout and execution (v1.1)

This skill is independently installable and follows the reference repository's **SKILL.md + references/ + scripts/ + examples/ + assets/ + bilingual README** package convention.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/script-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-script.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-script.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
