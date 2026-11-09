---
name: zenith-visual-bible
description: Specify production-consistent characters, settings, era details, color palettes and reusable master-reference image prompts.
---
# Zenith Visual Bible
Input: Script, Shot Master, documented historical facts and artwork rights limits.
Output: `visual_bible` array of `CHARACTER` and `ENVIRONMENT` entries with stable ID, name, appearance, consistency, reference requirements, rights notes and `prompt_json`.

1. Inventory **every** character and environment required by the shot list; never invent a character ID on a per-shot whim.
2. Stable uppercase IDs (e.g. `NAPOLEON`, `NP_ARMY`, `EUROPE_MAP`); no duplicates.
3. Distinguish **era-specific** appearance: calendar year, season, costumes, uniforms, flags, place geography, period architecture. A summer convoy must never inherit winter snow.
4. Distinguish documentary archival sources from invented symbolic compositions. Never imply two figures actually met at a depicted fictional time.
5. Use consistent palette, camera-ready sheet composition and master-reference prompts; generated asset files will be filled by the execution app, not the agent.
6. Include master prompt JSON and `filename` recommendation; do not label references approved without human review.
7. For multiple shots sharing the same master ID, reuse the **one** master reference; downstream images consume the generated reference asset ID/path.
8. Cross-check each reference against Research and all 96 (or configured number of) shot concepts before releasing the workbook.
