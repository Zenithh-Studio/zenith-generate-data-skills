---
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
