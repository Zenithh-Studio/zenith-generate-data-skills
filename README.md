# Zenith Generate Data Skills

Agent-installable skills that turn a video idea into a **validated, seven-tab production workbook** for Zenith AI Visual Workflow Studio.

The canonical pipeline is **research → script → shot master → visual bible → image prompts → motion prompts**. The imported application's execution order is **visual bible assets → per-shot images → image-to-video motion**, orchestrated by Shot Master.

This repository is an **original implementation** informed by the agent-agnostic `SKILL.md` packaging pattern used by [shuohao-skills](https://github.com/eternityspring/shuohao-skills). It does not copy that project's scripts or example assets.

## Quick start

1. Install `skills/zenith-producer` into your agent's skills directory, or install individual skills under `skills/`. Each folder contains its own `SKILL.md`.
2. Give the agent an idea, audience, intended duration and style. It researches sources when available, writes the narration, storyboards the video, defines master assets and builds the prompt payloads.
3. Ask it to generate a `zenith-project.json` compliant with `schemas/production-package.schema.json`.
4. Validate and export a spreadsheet via the dependency-free Node.js CLI:

```bash
node scripts/zenith-data.mjs validate examples/napoleon-mini.json
node scripts/zenith-data.mjs export examples/napoleon-mini.json --out dist/napoleon
node --test tests/*.test.mjs
```

Export produces seven tab-specific UTF-8 CSV files, `manifest.json` and `import-guide.md`. CSV files can be imported to Google Sheets as tabs. The exported JSON file remains the authoritative, lossless import contract for Zenith apps.

## Design principles

- **One source of truth:** narration is stored in Script and assigned exactly once to Shot Master anchors; prompts embed the exact anchor, never independently rewritten narration.
- **Deterministic IDs:** stable scene, shot, image and motion identifiers.
- **Resolvable references:** structured `references.characters` and `references.environments` arrays refer to Visual Bible IDs, not opaque semicolon strings.
- **No invented evidence:** source-backed factual claims, explicit uncertainty and rights-aware artwork.
- **Narration-first video:** no voice generation requirement or voice status fields.
- **Production boundary:** skills produce data and prompts, not image/video files.
- **Portable prompts:** schemas are provider-neutral; app adapters translate them to provider-specific request shapes.
- **Quality gates:** validation fails on broken IDs, missing assets, duration mismatches, missing narration coverage and malformed prompt structures.

See [workflow docs](docs/workflow.md), [schema notes](docs/data-contract.md), and [skill installation](docs/installation.md).

## Complete per-skill package structure (v1.1)

Each of the seven independently inspectable skill directories now follows the reference repository's modular packaging convention:

```text
skills/zenith-<stage>/
├── SKILL.md                     # agent-facing instructions + stage commands
├── README.md                    # stage guide
├── README.en.md                 # English guide
├── references/
│   ├── schema.md                # input/output contract
│   ├── <stage>-pass.md          # concrete authoring procedure
│   ├── prompting.md             # stage-specific prompting
│   ├── quality-gates.md         # editorial and deterministic acceptance
│   ├── report-style.md          # review handoff format
│   └── test-fixtures/upstream/README.md
├── scripts/
│   ├── zenith-<stage>.mjs       # check + render
│   └── selftest.mjs             # positive/negative tests
├── examples/
│   ├── sample.json              # runnable full-package fixture
│   └── stage.json               # standalone stage output snapshot
└── assets/
    ├── README.md
    └── input-template.json
```

Example commands for the script sub-skill:

```bash
node skills/zenith-script/scripts/zenith-script.mjs check skills/zenith-script/examples/sample.json
node skills/zenith-script/scripts/zenith-script.mjs render skills/zenith-script/examples/sample.json > script-review.md
node skills/zenith-script/scripts/selftest.mjs
```

The stage CLI deliberately validates the **complete project context** to catch cross-tab drift; a standalone `stage.json` is a stage output reference, not a self-sufficient full production package. The reference repo has much richer cinematic generation and reporting capabilities; this repository currently targets reliable **data generation**, not identical feature parity or actual media generation.
