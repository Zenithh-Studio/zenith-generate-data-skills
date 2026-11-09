# zenith-motion-prompts: quality gates

## G01 — I2V input is the actual image produced by the corresponding image job.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G02 — No invented cuts or identity changes not in the approved keyframe.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G03 — Shot duration, camera movement and layer actions are feasible.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## G04 — No SFX cue or Risk/QC fields; these belong elsewhere.

- **Pass:** reviewer can point to the corresponding field/record and show evidence.
- **Fail:** report offending IDs and regenerate only the dependent stage; never silently rewrite upstream.

## Deterministic vs editorial

Root validator enforces structural links, IDs and timing. Historical accuracy, artistic taste and real YouTube retention require evidence or human review; do not label these as automatically tested.
