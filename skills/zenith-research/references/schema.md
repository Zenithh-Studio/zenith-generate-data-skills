# Research / source ledger — stage contract

## Input
- `topic`
- `research scope`
- `sources`

## Output
- `research[]`
- `claim IDs`
- `uncertainty register`

## Canonical project field
`research` in `zenith-project.json`. See `../../../schemas/production-package.schema.json` and `../../../docs/data-contract.md` for field definitions.

## Hard invariants
1. unique source and claim IDs
2. source_url present for verified factual claims
3. verification statuses honest
4. every Script research_claim_id resolves

## Dependencies
Upstream: idea, timeframe, central decision.
Downstream: source/claim ledger for Script.
Do not silently regenerate or rewrite upstream canonical fields. Revalidate when upstream changes.

## Validation
Run `node scripts/zenith-research.mjs check <path/to/zenith-project.json>` from this skill directory, or `node scripts/zenith-research.mjs check <path>` with an absolute path. For full-package integrity run `node ../../../scripts/zenith-data.mjs validate <path>` from the skill directory.

## Error handling
On invalid JSON, missing stage, broken references or unsupported constraints: report exact failing ID and correction; do not invent placeholder content to force a pass.
