---
version: 1.1.0
name: zenith-storyboard
description: Break narration into fully accounted-for timecoded shots, assigning stable IDs, exact script anchors and distinct image concepts.
---
# Zenith Shot Master / Storyboard
Input: locked narration per SC-xxx and the planned episode length.
Output: `shots`: `id` (SH-001...), `scene_id`, `start_seconds`, `end_seconds`, `duration_seconds`, `narration_anchor`, `visual_concept`, `image_prompt_id`, `animation_id`, `fact_source_ids`.

1. Segment scenes into 4–10s planned shots, prioritizing 4–6s in the opening 30 seconds; the AI provider's duration caps override defaults.
2. Assign every word of each scene narration **once, sequentially**. The ordered anchors must join to the full scene narration after normalized whitespace. Never duplicate or omit words for a visually attractive cut.
3. Match each shot to a **distinct narrative image function**: reveal, contrast, map, character decision, material detail, consequence. Do not repeat a random retreat-road still.
4. Keep 0–30s hook cuts tied to their actual phrase duration. If the spoken words cannot fit, revise Script before storyboarding.
5. Scene and shot intervals must be contiguous, non-overlapping and positive. Motion duration and Shot Master duration must agree.
6. Keep explicit references to facts and any creative reconstruction.
7. IDs must be stable and unique, and the image/motion IDs must correspond 1:1.
8. The shot map is the app scheduler's canonical timeline; Visual Bible authoring may occur after initial breakdown, but must finish before generating Image Prompts.
After generating the storyboard, run `node scripts/zenith-data.mjs validate <project.json>` and fix all failed gates.

## Local package layout and execution (v1.1)

This skill is independently installable and follows the reference repository's **SKILL.md + references/ + scripts/ + examples/ + assets/ + bilingual README** package convention.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/storyboard-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-storyboard.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-storyboard.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
