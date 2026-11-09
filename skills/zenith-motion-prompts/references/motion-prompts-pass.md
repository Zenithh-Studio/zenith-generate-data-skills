# Motion prompts / image-to-video — generation pass

## Ordered work
1. Take the generated image identified by image_prompt_id as the only input.
2. Specify camera movement and layered actions feasible for shot duration.
3. Carry reference IDs and duration into motion JSON; omit narration text. Add shot-appropriate non-verbal ambience/Foley and explicit no-voice constraints.
4. Keep separate SFX cue and Risk/QC columns out of this tab; reject provider-incompatible durations at adapter level.

## Review checklist
- [ ] image_input resolves to matching prompt ID
- [ ] duration equals shot duration
- [ ] references equal image references
- [ ] no SFX cue or Risk / QC columns
- [ ] no narration_anchor or voice fields in motion JSON
- [ ] sound_design contains only diegetic non-verbal ambience/Foley; voice=false, dialogue=false, music=false
- [ ] edge-to-edge full-bleed visual style and no outer border preserved

MOTION AUDIO CONTRACT: motion outputs animation plus restrained diegetic environmental ambience and non-verbal Foley/SFX tied to visible actions (or silence). NEVER generate speech, voice-over, narration, dialogue, singing, human vocalizations or background music. Keep script narration in 03 Script and Shot Master only; do not put narration_anchor into motion prompt_json. Use sound_design.type=diegetic_ambience_and_foley, sound_design.prompt, sound_design.voice=false, sound_design.dialogue=false, sound_design.music=false, sound_design.generate_audio=true. Do not add an SFX cue spreadsheet column. The provider adapter must map optional sound generation or reject unsupported audio explicitly.

## Output contract
Return only JSON for `motion_prompts` matching references/schema.md and repository JSON Schema. Mark unresolved uncertainties explicitly. Stage checks are deterministic; editorial judgment still requires human review.
