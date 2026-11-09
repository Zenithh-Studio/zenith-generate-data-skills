# Install and use the skills

These are **agent-agnostic** `SKILL.md` packages based on a conventional folder-per-skill pattern. You can install them into agent platforms that support skill directories, including local Claude Code/Codex configurations, by copying a skill folder into the runtime's recognized skills directory.

## Suggested local installation
```bash
git clone https://github.com/Zenithh-Studio/zenith-generate-data-skills.git
cd zenith-generate-data-skills
node --version   # Node.js >= 20 recommended
node --test tests/*.test.mjs
```

For platforms supporting project skills, copy `skills/zenith-*` folders into your project's `.agents/skills/` or the designated agent skills folder. Run the CLI from the repository checkout (scripts are located at repository root). Platform-specific activation may require refreshing/restarting the agent session.

If your platform accepts only one skill, use `skills/zenith-producer/SKILL.md` and provide its full repository as a readable workspace, so it can load the child skill instructions. A single `SKILL.md` without access to the references and CLI is not a complete import/export solution.

## Example user request
> Create a 12-minute English faceless historical documentary about Napoleon's 1812 invasion for an Australia-led global audience. First 30 seconds must hook immediately. Style: paper-cut animation + archival documentary. Research real sources, create full narration and a shot-by-shot timeline, consistent character/environment masters, 1:1 image and image-to-video prompts. Export seven-tab Zenith workbook and validate every reference, word and duration.

## Try existing valid fixture
```bash
node scripts/zenith-data.mjs validate examples/napoleon-mini.json
node scripts/zenith-data.mjs export examples/napoleon-mini.json --out dist/example
```

The fixture deliberately contains 20 seconds and 3 shots; it is a **schema example**, not the complete 12-minute pilot or ready-to-publish historical research. Agents should generate the full-length project from the user's idea and source research.

**Important:** This repository generates planning data, not Google Sheets API credentials or actual media files. Creating a live Google Sheet requires a separate Google Drive/Sheets connector; running 04→06→07 requires the Zenith application and provider adapters.
