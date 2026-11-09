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

## Style acceptance

STYLE CONTRACT: use full-bleed edge-to-edge historical paper-cut/archival engraving. Torn paper edges occur ONLY between interior sky/terrain planes, never as an outer border. Characters are etched and integrated into the scene, not white-outline stickers. No surrounding parchment margin, poster, frame or atlas page. For map shots use subtle integrated geographic relief unless an actual map close-up is explicitly requested. Preserve the documented season and 16:9 composition. style_key=PAPER_CUT_ARCHIVAL_ENGRAVING_V3_EDGE_TO_EDGE.
- [ ] output.full_bleed and output.no_border are true
- [ ] no outer paper frame, sticker outlines, or map poster composition
