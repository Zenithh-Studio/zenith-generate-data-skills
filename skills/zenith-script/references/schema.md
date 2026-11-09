# Narration / hook — stage contract

## Input
- `research[]`
- `central question`
- `target duration`

## Output
- `script[]`
- `scene timings`
- `locked narration`

## Canonical project field
`script` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md` for field definitions.

## Hard invariants
1. every scene has full narration
2. research IDs resolve
3. no 30-second overstuffing
4. shot anchors reconstruct script verbatim

## Dependencies
Upstream: verified research ledger and positioning.
Downstream: immutable narration to Shot Master.
Do not silently regenerate or rewrite upstream canonical fields. Revalidate when upstream changes.

## Validation
Run `node scripts/zenith-script.mjs check <path/to/zenith-project.json>` from this skill directory, or `node scripts/zenith-script.mjs check <path>` with an absolute path. For full-package integrity run `node ../../../scripts/zenith-data.mjs validate <path>` from the skill directory.

## Error handling
On invalid JSON, missing stage, broken references or unsupported constraints: report exact failing ID and correction; do not invent placeholder content to force a pass.
