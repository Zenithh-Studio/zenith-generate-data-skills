# Motion prompts / image-to-video — stage contract

## Input
- `shots[]`
- `image_prompts[]`

## Output
- `motion_prompts[]`
- `I2V handoff`
- `motion filenames`

## Canonical project field
`motion_prompts` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md`.

## Hard invariants
1. image_input resolves to matching prompt ID
2. duration equals shot duration
3. references equal image references
4. no SFX cue or Risk / QC columns

## Dependencies
Upstream: Image Prompt and Shot Master.
Downstream: provider-neutral I2V job per shot.
Do not silently rewrite upstream canonical fields. Revalidate after upstream changes.

## Validation
Run `node scripts/zenith-motion-prompts.mjs check examples/sample.json` from this skill directory. Use root CLI for full validation.

## Error handling
On missing data or invalid references, report the exact failing ID; never invent placeholder content to force a pass.

## Motion JSON extensions

Required `prompt_json.sound_design`: `{"type":"diegetic_ambience_and_foley","prompt":"Wind and soft wagon creaks only if visible; no speech.","voice":false,"dialogue":false,"music":false,"generate_audio":true,"allow_silence_if_not_applicable":true}`. Never include `narration_anchor` in motion JSON. The shot narration stays upstream. Preserve the 1:1 image link and duration.
