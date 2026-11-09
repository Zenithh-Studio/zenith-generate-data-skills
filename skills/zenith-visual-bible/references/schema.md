# Visual Bible / reference masters — stage contract

## Input
- `shots[]`
- `research[]`
- `style`

## Output
- `visual_bible[]`
- `master prompt JSON`
- `reference IDs`

## Canonical project field
`visual_bible` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md`.

## Hard invariants
1. unique typed master IDs
2. prompt_json.filename exists
3. all image references resolve
4. no fabricated meeting depicted as documentary fact

## Dependencies
Upstream: script and shot inventory.
Downstream: approved master asset specifications.
Do not silently rewrite upstream canonical fields. Revalidate after upstream changes.

## Validation
Run `node scripts/zenith-visual-bible.mjs check examples/sample.json` from this skill directory. Use root CLI for full validation.

## Error handling
On missing data or invalid references, report the exact failing ID; never invent placeholder content to force a pass.
