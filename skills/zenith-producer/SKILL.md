---
version: 1.1.0
name: zenith-producer
description: Turn a documentary or faceless YouTube video idea into a source-aware, fully linked seven-tab Zenith production workbook with narration, visual bible, shot image prompts and motion prompts.
---

# Zenith Producer — master orchestrator

Use when asked to turn **one video idea** into import-ready Zenith AI Workflow Studio production data, whether the video is a historical documentary, explainer, biography or educational faceless film.

## Inputs
Idea/topic required. Ask for audience, language, approximate video length, format and art direction only if indispensable; otherwise use clearly marked defaults: international English, 16:9, 10–15 minutes, 5–10 seconds per shot, paper-cut archival documentary **only for historical documentaries**. Do not invent a final production duration or audience metrics.

## Stages (read child skills as needed)
1. **01 Overview** — editorial positioning, title, upload-ready YouTube description and thumbnail concept; title, hook and thesis must agree.
2. **02 Research** — read `../zenith-research/SKILL.md`. Gather source URLs, individual claims, conflicts and uncertainties; no fabricated sourcing.
3. **03 Script** — read `../zenith-script/SKILL.md`. First 30 seconds are a distinct hook; write complete, narratable English prose, not just an outline. Preserve narration verbatim downstream.
4. **05 Shot Master** — read `../zenith-storyboard/SKILL.md`. Partition every scene's narration into non-overlapping, ordered anchors. Allocate shot intervals; never assume exact VO timing until the user's voice track exists.
5. **04 Visual Bible** — read `../zenith-visual-bible/SKILL.md`. Define reusable character and environment IDs, visual rules and master-generation prompts. Resolve all references before shot prompting.
6. **06 Image Prompts** — read `../zenith-image-prompts/SKILL.md`. Each shot gets a full visual prompt, JSON and `references` arrays that resolve to Sheet 04.
7. **07 Motion Prompts** — read `../zenith-motion-prompts/SKILL.md`. Each shot gets a motion prompt tied to its image ID and exact duration. No SFX cue or Risk/QC columns.

A human may edit stages; when upstream narration changes, **regenerate and revalidate every dependent shot, image and motion anchor**. Stage order is authoring order, not execution order.

## Deliverable and mandatory gate
Generate `zenith-project.json` matching `../../schemas/production-package.schema.json`. Run:
```bash
node scripts/zenith-data.mjs validate zenith-project.json
node scripts/zenith-data.mjs export zenith-project.json --out dist/episode
```
Stop and repair all errors; never claim successful import if validation fails. If tools cannot access research sources, mark research as unverified and block factual production claims. When Google Sheets connector exists, create/import **exactly seven named tabs** following `docs/data-contract.md`. The CLI's CSV output is an interoperable fallback, not a live Google Sheets upload.

## Editorial quality thresholds (internal, not evidence of YouTube performance)
Score hook and title alignment, audience-fit, narrative causality, retention rhythm, accuracy and visual execution from 0 to 10. Require 8+ for the opening hook and 8+ overall before labeling editorially ready. Validate structure mechanically; an agent's score is **not** a substitute for real retention tests.

## Safety and honesty
Distinguish archival evidence from AI reconstruction. Do not forge citations, historical quotes, precise casualty counts, character likeness approvals or licensed image rights. Do not generate or strip third-party watermarks. Voice/audio is produced externally from Script narration. This skill writes **data**, never asserts that video or audio files were generated.

## Local package layout and execution (v1.1)

This skill is independently installable and follows the reference repository's **SKILL.md + references/ + scripts/ + examples/ + assets/ + bilingual README** package convention.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/producer-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-producer.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-producer.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
