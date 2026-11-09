# zenith-script: stage review format

Use the local `render` command to create a deterministic Markdown review. For editorial handoff append a human-readable section:

1. **Decision:** approve / revise / blocked, with a specific reason.
2. **Evidence:** source URLs or upstream IDs, not unsourced certainty.
3. **Defects:** exact record ID, failed gate and proposed correction.
4. **Downstream impact:** stages that must be regenerated.
5. **Next action:** one executable task, not a vague instruction.

Never mark editorial quality as a code-verified gate. Keep full prompt JSON in the project file, not in a visually truncated report.
