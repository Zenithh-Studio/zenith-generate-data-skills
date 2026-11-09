---
name: zenith-image-prompts
description: Compose one complete image-generation JSON object per storyboard shot, using resolvable character and environment reference arrays from Visual Bible.
---
# Zenith Image Prompts
Input: Shot Master, Visual Bible, narration and verified source IDs.
Output: `image_prompts` 1:1 with shots: `id`, `shot_id`, `scene_id`, `references`, `historical_sources`, `prompt_json`.

Required `references` structure:
```json
{"characters":["NAPOLEON","NP_ARMY"],"environments":["EUROPE_MAP"],"props":[]}
```
Do not serialize these identifiers into ambiguous `ENV:...; CHAR:...; REF_PENDING` strings. The app resolves each reference ID to a master asset output generated from Sheet 04. Referenced IDs MUST exist and match their Visual Bible types.

`prompt_json` keys include `schema_version`, `shot_id`, `scene_id`, `prompt_id`, `narration_anchor`, `visual_concept`, `references`, `prompt`, `negative_prompt`, `framing`, `lighting`, `layer_plan`, `output` and `filename`.

- Prompt must be model-ready English (unless requested otherwise), tell one visually executable moment, use subject identity, period, environment, framing, depth and negative constraints.
- Preserve the exact Shot Master `narration_anchor` in JSON, without rewriting it.
- Use paper-cut parallax-friendly separate planes when the project's style calls for it.
- `output.text_in_image=false`: place labels and titles later in editing.
- `historical_sources` are provenance, not proof of a generated image.
- No fake archival claims, invented badges, fake maps, third-party watermark removal or unverified exact text in image.
- Validate all 1:1 ID links and reference existence before exporting.
