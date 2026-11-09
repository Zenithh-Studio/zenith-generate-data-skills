# Agent contributor rules

- Keep each skill self-contained with a proper frontmatter `name` and `description`, executable stage instructions and clear input/output contracts.
- A video idea alone is enough to start. Clarify essential unknowns only; mark defaults.
- Do not silently write invented source URLs, historical quotes, casualty figures or exact rights ownership.
- Keep a single canonical `zenith-project.json` and regenerate dependent JSON whenever Script or shot timing changes.
- Never remove schema-validation gates to make bad fixtures pass.
- Node runtime should use built-ins; no API keys, cloud generation or network required for `validate` and `export`.
- Keep Script narration copied verbatim into storyboard anchors and prompt JSON.
- Maintain 1:1 links across Shot Master, Image Prompt and Motion Prompt.
- Preserve user-owned VO and avoid voice-specific status columns.
- Do not add Sheet 08, Risk/QC or SFX cue columns.
- Reference IDs are JSON arrays, never semicolon pseudo-JSON.
- Commit by independent change using Conventional Commits: `feat(scope):`, `fix(scope):`, `test(scope):`, `docs(scope):`, `ci:`.
- Run `node --test tests/*.test.mjs` and validate the demo fixture before release.
