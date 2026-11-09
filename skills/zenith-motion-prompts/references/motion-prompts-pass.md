# Motion prompts / image-to-video — generation pass

## Ordered work
1. Take the generated image identified by image_prompt_id as the only input.
2. Specify camera movement and layered actions feasible for shot duration.
3. Carry exact narration anchor, reference IDs and duration into motion JSON.
4. Keep SFX and Risk/QC out of this tab; reject provider-incompatible durations at adapter level.

## Review checklist
- [ ] image_input resolves to matching prompt ID
- [ ] duration equals shot duration
- [ ] references equal image references
- [ ] no SFX cue or Risk / QC columns

## Output contract
Return only JSON for `motion_prompts` matching references/schema.md and repository JSON Schema. Mark unresolved uncertainties explicitly. Stage checks are deterministic; editorial judgment still requires human review.
