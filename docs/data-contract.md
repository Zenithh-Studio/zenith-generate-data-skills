# Zenith Production Data Contract v1.0

The source-of-truth interchange is **zenith-project.json**, specified in `schemas/production-package.schema.json`. The seven CSV tabs are human-editable views, not independent contradictory prompt sources. `manifest.json` maps exact filenames to exact tab titles.

## Seven tabs

| Tab | Owner | Columns |
| --- | --- | --- |
| 01 Overview | Project metadata | Field, Value, Notes |
| 02 Research | Evidence | Record type, ID, Title / conclusion, Source / URL, Passage / coverage, Verification, Caveat / rights, Action |
| 03 Script | Narration | Scene ID, Section, Narrative question, Narration (EN), Words, Draft start, Draft end, Estimated length, Research claim IDs |
| 04 Visual Bible | Reference masters | Type, ID, Name / location, Reference requirement, Period / appearance, Consistency, Source reference, Approval, Prompt JSON |
| 05 Shot Master | Timeline and image jobs | Shot ID, Scene ID, Draft In, Draft Out, Duration, Narration anchor, Visual concept, Image prompt ID, Animation prompt ID, Fact source |
| 06 Image Prompts | Image generation | Prompt ID, Shot ID, Scene ID, Reference IDs, Image prompt EN — production draft, Negative constraints, Framing, Lighting, Layer plan, Historical source, Prompt JSON |
| 07 Motion Prompts | Image-to-video | Animation ID, Shot ID, Motion method, Motion prompt EN — production draft, Camera, Duration draft, Layer actions, Transition, Prompt JSON |

**Explicitly excluded:** Sheet 08 Production QA; per-row Status; Voice asset / Audio lock; `SFX cue` and `Risk / QC` columns from 07 Motion Prompts. Spoken narration is owned by an external voice workflow; motion JSON may include only non-verbal diegetic sound design.

## Canonical ownership and derived fields
- `03 Script.narration` is the only editable narration. `05 Shot Master.narration_anchor` partitions it without paraphrase.
- `05 Shot Master.duration_seconds` is the duration source; `07 Motion Prompts.prompt_json.duration_seconds` mirrors it and must match.
- `04 Visual Bible.id` is the stable identity for each reusable character/environment master.
- `06 Image Prompts.references` is a structured object with `characters`, `environments`, `props`. Visual Bible membership of characters and environments is mandatory. References are duplicated **inside** `prompt_json.references` only to make the JSON self-contained; the validator confirms equality.
- `07 Motion Prompts.prompt_json.sound_design` contains only non-verbal environmental ambience/Foley. No `narration_anchor`, spoken voice, dialogue, singing or background music in motion JSON. Voice remains outside the motion generation workflow.
- `07 Motion Prompts.prompt_json.image_input` is a logical `{"source":"generated_image","image_prompt_id":"IMG-001"}` link. Zenith resolves it to the actual generated image filename, local path or API asset ID before submission.
- `01 Overview` duration and shot count are checked against Shot Master.
- `02 Research` source provenance is editorial evidence, not proof of copyright/usage rights.

## Agent requirements
Never enter `REF_PENDING` as a substitute for resolvable references. Use `approval` in Visual Bible to represent unapproved master assets and block actual video render until human approval if needed.

JSON prompts are **provider-neutral contracts**. `negative_prompt`, `output`, `camera`, `layer_actions`, `image_input` and `duration_seconds` must be mapped by a **provider adapter**; do not send arbitrary keys raw to an image API. If your provider does not support certain keys, translate them into prompt text or reject with an explicit error rather than pretending success.

## Import instructions
Export via `node scripts/zenith-data.mjs export ... --out dist/episode`. For a Google Sheet, import each CSV to the tab named in manifest.json, preserving multiline JSON cells and BOM as UTF-8. For Zenith use the lossless `zenith-project.json` whenever available. Validate again **after** any manual Sheet edits.

## Example image prompt linkage
```json
{
  "id": "IMG-001",
  "shot_id": "SH-001",
  "scene_id": "SC-001",
  "references": {"characters": ["NAPOLEON"], "environments": ["EUROPE_MAP"], "props": []},
  "prompt_json": {
    "schema_version": "1.0",
    "shot_id": "SH-001",
    "scene_id": "SC-001",
    "prompt_id": "IMG-001",
    "narration_anchor": "Exact text from the storyboard anchor.",
    "references": {"characters": ["NAPOLEON"], "environments": ["EUROPE_MAP"], "props": []},
    "prompt": "One historically grounded layered frame...",
    "negative_prompt": "modern logos, text, invented medal",
    "output": {"aspect_ratio": "16:9", "resolution": "1920x1080", "text_in_image": false}
  }
}
```

## Visual style contract

STYLE CONTRACT: use full-bleed edge-to-edge historical paper-cut/archival engraving. Torn paper edges occur ONLY between interior sky/terrain planes, never as an outer border. Characters are etched and integrated into the scene, not white-outline stickers. No surrounding parchment margin, poster, frame or atlas page. For map shots use subtle integrated geographic relief unless an actual map close-up is explicitly requested. Preserve the documented season and 16:9 composition. style_key=PAPER_CUT_ARCHIVAL_ENGRAVING_V3_EDGE_TO_EDGE.

## Motion audio contract

MOTION AUDIO CONTRACT: motion outputs animation plus restrained diegetic environmental ambience and non-verbal Foley/SFX tied to visible actions (or silence). NEVER generate speech, voice-over, narration, dialogue, singing, human vocalizations or background music. Keep script narration in 03 Script and Shot Master only; do not put narration_anchor into motion prompt_json. Use sound_design.type=diegetic_ambience_and_foley, sound_design.prompt, sound_design.voice=false, sound_design.dialogue=false, sound_design.music=false, sound_design.generate_audio=true. Do not add an SFX cue spreadsheet column. The provider adapter must map optional sound generation or reject unsupported audio explicitly.
