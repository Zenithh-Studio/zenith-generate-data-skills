# zenith-visual-bible: quality gates

## G01 — A single master ID is reused across shots for same identity.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G02 — Every reference has a type and a stable filename.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G03 — Season and location match chronology (summer 1812 != snow retreat).

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G04 — Archival image source/rights must be checked independently.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## Deterministic vs editorial

Root validator enforces structural links, IDs and timing. Historical accuracy, artistic taste and real YouTube retention require evidence or human review; do not label these as automatically tested.
