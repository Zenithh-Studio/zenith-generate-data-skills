# Shot Master / timecoded cuts — stage contract

## Input
- `script[]`
- `target duration`
- `visual style`

## Output
- `shots[]`
- `narration anchors`
- `timeline`

## Canonical project field
`shots` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md` for field definitions.

## Hard invariants
1. all narration accounted once
2. shot times contiguous
3. shot duration positive and consistent
4. every shot has image and motion ID

## Dependencies
Upstream: locked Script scenes.
Downstream: shot concepts and stable IDs.
Do not silently regenerate or rewrite upstream canonical fields. Revalidate when upstream changes.

## Validation
Run `node scripts/zenith-storyboard.mjs check <path/to/zenith-project.json>` from this skill directory, or `node scripts/zenith-storyboard.mjs check <path>` with an absolute path. For full-package integrity run `node ../../../scripts/zenith-data.mjs validate <path>` from the skill directory.

## Error handling
On invalid JSON, missing stage, broken references or unsupported constraints: report exact failing ID and correction; do not invent placeholder content to force a pass.
