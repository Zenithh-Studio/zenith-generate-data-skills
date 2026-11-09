# Research / source ledger — generation pass

**Role:** Research / source ledger. **Upstream:** idea, timeframe, central decision. **Downstream:** source/claim ledger for Script.

## Ordered work
1. Find source candidates; read the passages rather than trusting search snippets.
2. Extract atomic factual claims with exact provenance and caveats.
3. Separate source leads from independently checked evidence; mark unresolved verification.
4. Link claim IDs to the planned narrative and escalate historical ambiguity.

## Review checklist
- [ ] unique source and claim IDs
- [ ] source_url present for verified factual claims
- [ ] verification statuses honest
- [ ] every Script research_claim_id resolves

## Model output contract
Return only JSON for `research` matching `references/schema.md` and the repository JSON Schema. If the upstream input is incomplete, mark uncertainties instead of claiming that the final project is ready. The stage's checker is deterministic; editorial quality remains a separate human review.

## Quality bar
claim-level provenance, contested interpretations, source rights.
