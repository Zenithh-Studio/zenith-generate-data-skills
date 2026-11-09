# zenith-storyboard: quality gates

## G01 — No shot overlaps another within a scene; scene boundaries match shots.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G02 — Every narration token is assigned once, in original order.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G03 — Opening shots have distinct visual functions and avoid repeated stills.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G04 — Shot duration is estimated until VO timing; motion duration must match.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## Deterministic vs editorial

Root validator enforces structural links, IDs and timing. Historical accuracy, artistic taste and real YouTube retention require evidence or human review; do not label these as automatically tested.
