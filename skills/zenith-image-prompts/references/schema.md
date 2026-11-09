# Image prompts / structured reference IDs — stage contract

## Input
- `shots[]`
- `visual_bible[]`

## Output
- `image_prompts[]`
- `prompt_json`
- `image filename contract`

## Canonical project field
`image_prompts` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md`.

## Hard invariants
1. all character/environment IDs exist
2. reference type matches
3. image JSON narration equals shot
4. one image prompt per shot

## Dependencies
Upstream: Shot Master and Visual Bible.
Downstream: one image job per shot.
Do not silently rewrite upstream canonical fields. Revalidate after upstream changes.

## Validation
Run `node scripts/zenith-image-prompts.mjs check examples/sample.json` from this skill directory. Use root CLI for full validation.

## Error handling
On missing data or invalid references, report the exact failing ID; never invent placeholder content to force a pass.
