# zenith-image-prompts: quality gates

## G01 — Image Prompt row IDs match the corresponding Shot Master.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G02 — Typed characters and environments exist in Visual Bible.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G03 — Image prompt includes framing, layers, negative constraints and aspect ratio.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G04 — Image JSON references and narration exactly match row and shot.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## Deterministic vs editorial

Root validator enforces structural links, IDs and timing. Historical accuracy, artistic taste and real YouTube retention require evidence or human review; do not label these as automatically tested.
