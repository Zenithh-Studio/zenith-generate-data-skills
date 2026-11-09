---
version: 1.1.0
name: zenith-visual-bible
description: Specify production-consistent characters, settings, era details, color palettes and reusable master-reference image prompts.
---
# Zenith Visual Bible
Input: Script, Shot Master, documented historical facts and artwork rights limits.
Output: `visual_bible` array of `CHARACTER` and `ENVIRONMENT` entries with stable ID, name, appearance, consistency, reference requirements, rights notes and `prompt_json`.

1. Inventory **every** character and environment required by the shot list; never invent a character ID on a per-shot whim.
2. Stable uppercase IDs (e.g. `NAPOLEON`, `NP_ARMY`, `EUROPE_MAP`); no duplicates.
3. Distinguish **era-specific** appearance: calendar year, season, costumes, uniforms, flags, place geography, period architecture. A summer convoy must never inherit winter snow.
4. Distinguish documentary archival sources from invented symbolic compositions. Never imply two figures actually met at a depicted fictional time.
5. Use consistent palette, camera-ready sheet composition and master-reference prompts; generated asset files will be filled by the execution app, not the agent.
6. Include master prompt JSON and `filename` recommendation; do not label references approved without human review.
7. For multiple shots sharing the same master ID, reuse the **one** master reference; downstream images consume the generated reference asset ID/path.
8. Cross-check each reference against Research and all 96 (or configured number of) shot concepts before releasing the workbook.

## Local package layout and execution (v1.1)

This skill is independently installable. Its English-only package includes **SKILL.md**, **README.md**, **references/**, **scripts/**, **examples/** and **assets/**.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/visual-bible-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-visual-bible.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-visual-bible.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
