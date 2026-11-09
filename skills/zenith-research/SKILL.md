---
version: 1.1.0
name: zenith-research
description: Research and verify primary and secondary sources for AI-assisted documentary production, returning source-linked historical claims and uncertainty notes.
---
# Zenith Research
Input: the video idea, time/place scope, central decision and target audience.
Output: `research` array of records with `type` (CLAIM or SOURCE), unique `id`, `title`, `source_url`, `coverage`, `verification`, `caveat`, `next_action`.
1. Separate documented events/dates from interpretations, contested numbers and creative framing.
2. Prefer museum, archive, university, high-quality scholarly and primary sources. Read original passages. A bibliography lead without an inspected passage is a **lead**, not VERIFIED.
3. Link every relevant scene to research claim IDs; qualify uncertain and disputed claims in the narration.
4. No made-up URLs, references, books, exact quotations or archival rights.
5. Avoid reducing complex failures to one cause. Record contrary interpretations where they matter.
6. If browsing unavailable, mark unverifiable facts `UNVERIFIED`; do not silently upgrade to VERIFIED.
7. Output source URL and provenance so later editors can independently verify claims.
Use `../../docs/data-contract.md` for the seven-tab mapping.

## Local package layout and execution (v1.1)

This skill is independently installable and follows the reference repository's **SKILL.md + references/ + scripts/ + examples/ + assets/ + bilingual README** package convention.

- Read `references/schema.md` for the exact input/output contract before generating any JSON.
- Read `references/research-pass.md` for the ordered generation pass and acceptance checklist.
- Read `examples/sample.json` as a coherent miniature **full-package** fixture; do not present its sample research as independently verified.
- Read `assets/input-template.json` for the stage input names and asset handoff boundary.
- Run `node scripts/zenith-research.mjs check examples/sample.json` to validate the example.
- Run `node scripts/zenith-research.mjs render examples/sample.json > stage-report.md` to generate a Markdown review.
- Run `node scripts/selftest.mjs` for positive and negative stage tests.
- For generated output, substitute the actual project path in the commands above and **also** run the root `scripts/zenith-data.mjs validate` before export.

Stage CLI validation deliberately checks the **entire seven-tab project** as well as this stage, because upstream/downstream integrity cannot be guaranteed from a fragment. The `render` report is a textual review; it does not generate image/video/audio files. If a stage is incomplete, report the exact broken IDs and do not claim production readiness.
