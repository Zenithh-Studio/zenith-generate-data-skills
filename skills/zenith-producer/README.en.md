# Producer / orchestration (English guide)

Install this folder in an agent's skill directory. Open [SKILL.md](SKILL.md) for the full procedure, [references/schema.md](references/schema.md) for the contract and [references/producer-pass.md](references/producer-pass.md) for the detailed pass.

Run `node scripts/zenith-producer.mjs check examples/sample.json` to validate the stage against the included project fixture. Run `node scripts/selftest.mjs` for positive and negative checks. The sample is a short technical fixture, not a completed documentary.

The producer skill orchestrates all seven stages; each sub-skill is independently inspectable and executable. No network, model API or API key is used by validation.
