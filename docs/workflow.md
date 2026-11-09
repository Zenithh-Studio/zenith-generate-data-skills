# Production workflow

## One-idea to seven-tab workbook
Agent input: video idea. Optional constraints: niche, audience, length, language, research scope, visual style and desired publishing market.

**Authoring stages**
1. Research the actual topic and provenance. Create `02 Research` (individual source records and sourced claims).
2. Write `03 Script` as **full voice narration**, including the first 30-second hook, a coherent causal through-line, structured scenes and a satisfying payoff.
3. Break narration into exact, non-overlapping anchors in `05 Shot Master`, with one visual purpose per shot. Shot length is provisional until narration is recorded.
4. Inventory reusable characters, settings, props, costumes and maps in `04 Visual Bible`. Generate master-asset prompts only, not images. IDs are stable.
5. Generate `06 Image Prompts` from shot visual concepts and references to master assets.
6. Generate `07 Motion Prompts` that take generated image results as input, retain exact anchor and duration, and preserve reference consistency.
7. Generate `01 Overview` and ensure the publishing title, description, hook and thesis are aligned.
8. Validate the entire seven-tab package and export.

**Actual Zenith execution DAG**
```text
Import JSON / sheet data
    ↓ validate all links and JSON
Visual Bible master assets (unique CHAR/ENV IDs)
    ↓ persisted reference images
Shot Master orchestrates shot scheduling
    ↓ (04 references + 05 visual concept + 03 narration)
Image Prompts → generated image files keyed by image_prompt_id
    ↓ exact image output path/asset ID
Motion Prompts → generated video files keyed by animation_id
    ↓
Timeline assembly by Shot Master, attach user-created narration, edit, render
```

**Not**: blindly run Image Prompts before reference masters exist, or pass the text of an image prompt where an image file is required. An imported spreadsheet is a **production plan**, not a finished asset directory.

## Critical quality gates
- `Gate A:` verified evidence, no false precise quotes or unsupported dates.
- `Gate B:` strong first 30 seconds (named subject, consequence, question), title/thumbnail alignment.
- `Gate C:` one scene narration -> contiguous ordered shot anchors -> exact concatenated narration.
- `Gate D:` every `references.characters[]` and `references.environments[]` exists in Visual Bible with matching type.
- `Gate E:` every shot has exactly one image prompt, exactly one motion prompt, and all IDs agree.
- `Gate F:` shot/motion seconds agree and timeline adds up to Overview draft runtime.
- `Gate G:` no synthetic archive misrepresentation, source rights unverified until human licensing review.
- `Gate H:` provider adapter maps provider-neutral JSON keys to actual API supported keys and validates duration limits.

Gates C–F are machine-checked by the CLI. The rest require editorial or downstream production review. A passing validator **does not** mean a model generated high-quality imagery.
