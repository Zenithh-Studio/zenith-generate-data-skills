---
version: 1.1.0
name: zenith-motion-prompts
description: Generate one provider-neutral image-to-video motion JSON per shot, preserving narration, frame identity, duration and image input link.
---
# Zenith Motion Prompts
Input: Shot Master and matching Image Prompt JSON. Upstream Master Assets -> Shot Image -> Motion.
Output: `motion_prompts` array with `id`, `shot_id`, `motion_method`, `prompt_json`.

`prompt_json` must carry `schema_version`, `shot_id`, `scene_id`, `animation_id`, `image_prompt_id`, `narration_anchor`, `references`, `image_input`, `motion_method`, `prompt`, `camera`, `duration_seconds`, `layer_actions`, `transition`, `negative_constraints`, `filename`.

- `image_input: {"source":"generated_image","image_prompt_id":"..."}` is a **logical contract**; the app replaces it with an actual generated image path, URI, or provider asset ID.
- Motion consumes exactly the image for the shot, not a neighboring image.
- Duration MUST equal Shot Master `duration_seconds`. Respect provider duration constraints via provider adapter.
- Animation must preserve framing, character identity, period uniform, map geography, lighting, weather and art style.
- Prefer distinct but restrained motion: map route reveal, 2.5D parallax, paper-layer camera push; avoid an entire film of identical Ken Burns movement.
- No invented camera cuts or visual hallucinations beyond approved art, no lip sync or dialogue generation.
- **Do not add columns for `Risk / QC` or `SFX cue`.** Production checks belong in the validator/app; optional sound design in editing.
- Retain exact `narration_anchor` from Shot Master and image JSON.

## Local package layout and execution (v1.1)

This skill is independently installable and follows the reference repository's **SKILL.md + references/ + scripts/ + examples/ + assets/ + bilingual README** package convention.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/motion-prompts-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-motion-prompts.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-motion-prompts.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
