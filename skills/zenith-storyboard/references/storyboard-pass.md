# Shot Master / timecoded cuts — generation pass

**Role:** Shot Master / timecoded cuts. **Upstream:** locked Script scenes. **Downstream:** shot concepts and stable IDs.

## Ordered work
1. Split each scene narration into exact consecutive word spans; do not paraphrase.
2. Assign each span a shot with visual purpose and estimated in/out.
3. Design hook shots as strong contrasts, not repeated generic stills.
4. Issue stable shot, image and animation IDs; ensure no timing gaps.

## Review checklist
- [ ] all narration accounted once
- [ ] shot times contiguous
- [ ] shot duration positive and consistent
- [ ] every shot has image and motion ID

## Model output contract
Return only JSON for `shots` matching `references/schema.md` and the repository JSON Schema. If the upstream input is incomplete, mark uncertainties instead of claiming that the final project is ready. The stage's checker is deterministic; editorial quality remains a separate human review.

## Quality bar
100% word coverage, contiguous shot timeline, shot-image-motion 1:1.
