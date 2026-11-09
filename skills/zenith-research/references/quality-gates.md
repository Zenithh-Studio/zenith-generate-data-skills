# zenith-research: quality gates

## G01 — Each historical claim has a unique ID and source URL when known.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G02 — Do not treat a search-result snippet as verified evidence.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G03 — Record contradictions and interpretations separately from dated events.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G04 — Record image licensing uncertainty; a source URL is not an image license.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## Deterministic vs editorial

Root validator enforces structural links, IDs and timing. Historical accuracy, artistic taste and real YouTube retention require evidence or human review; do not label these as automatically tested.
