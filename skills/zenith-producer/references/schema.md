# Producer / orchestration — stage contract

## Input
- `idea`
- `audience`
- `target duration`
- `style`

## Output
- `zenith-project.json`
- `seven CSV tabs`
- `manifest.json`

## Canonical project field
`overview` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md` for field definitions.

## Hard invariants
1. seven tab ownership
2. central question and title present
3. global validator passes
4. all unverified research disclosed

## Dependencies
Upstream: idea and project constraints.
Downstream: all seven-tab data.
Do not silently regenerate or rewrite upstream canonical fields. Revalidate when upstream changes.

## Validation
Run `node scripts/zenith-producer.mjs check <path/to/zenith-project.json>` from this skill directory, or `node scripts/zenith-producer.mjs check <path>` with an absolute path. For full-package integrity run `node ../../../scripts/zenith-data.mjs validate <path>` from the skill directory.

## Error handling
On invalid JSON, missing stage, broken references or unsupported constraints: report exact failing ID and correction; do not invent placeholder content to force a pass.
