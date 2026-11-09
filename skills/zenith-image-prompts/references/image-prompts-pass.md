# Image prompts / structured reference IDs — generation pass

## Ordered work
1. For each shot copy its visual concept and exact narration anchor.
2. Choose typed Visual Bible IDs for characters and environments; keep props explicit.
3. Write composition, lighting, layers, historical restrictions and output aspect.
4. Embed the same reference object in row and prompt_json; check 1:1 linkage.

## Review checklist
- [ ] all character/environment IDs exist
- [ ] reference type matches
- [ ] image JSON narration equals shot
- [ ] one image prompt per shot

## Output contract
Return only JSON for `image_prompts` matching references/schema.md and repository JSON Schema. Mark unresolved uncertainties explicitly. Stage checks are deterministic; editorial judgment still requires human review.
