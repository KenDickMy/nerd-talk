---
name: skill-forge
description: >-
  Creates new Claude Skills — writes the SKILL.md, chooses minimal tool
  permissions, and generates the matching catalog entry for the Lifelongnerd
  skills site. Use when the user wants to build, scaffold, write, or publish a
  skill, or asks to turn a repeated prompt, checklist, or workflow into
  something reusable.
allowed-tools: Read, Write, Glob, Grep
---

# Skill Forge

Builds a new skill from a description of the job it should do. Produces a
`SKILL.md` and, when run inside the skills site repo, the catalog entry that
publishes it.

## Procedure

### 1. Understand the job

Ask at most **three** questions, and only about things you genuinely cannot
infer. Most requests contain enough already. Never run a long interview.

The three things you actually need:

- What task is being automated
- What the output looks like when it works
- Any failure the user has already hit doing it manually

If the user gave you all three, ask nothing and proceed.

### 2. Decide whether this should be a skill at all

Apply this test before writing anything:

- Does the procedure have enough steps that a person would forget one?
- Are there rules that matter enough to enforce every time?
- Will it be needed again weeks from now?

If none of those hold, say so plainly, give the user the one-paragraph prompt
that does the job instead, and stop. A skill that should have been a prompt is
overhead that never pays for itself.

### 3. Write the description first

This field decides whether the skill ever runs, so it gets written before the
body, not after. Use the two-part formula:

1. **What it does** — the artifact and the operation.
2. **When to use it** — situations, phrased the way a user would say them.

Then stress-test it. Write down five ways a real user might ask for this, and
include at least two that avoid the skill's obvious keywords. Check that the
description's vocabulary overlaps each one. Rewrite until it does.

Also write two phrasings that should *not* trigger it. If the description would
plausibly match those, narrow it or add an explicit exclusion sentence.

### 4. Name it

Kebab-case, two or three words, unique among existing skills. Glob the skills
directory to check for collisions before settling.

### 5. Choose the minimum tools

Start from an empty list. Add a tool only when a specific step in the procedure
cannot run without it, and note which step required it.

Never add a tool speculatively. `allowed-tools` is the only guardrail that is
actually enforced — prose rules are advisory, tool permissions are not. A skill
that cannot write files is a skill that cannot destroy anything.

### 6. Write the procedure

Numbered steps, in execution order. Each step must be concrete enough that two
runs produce the same result.

Replace every judgement call with a threshold or a rule. "Analyse it carefully"
is not a step. "Scan for the first row where most cells are non-empty strings"
is a step.

End the procedure where the task actually ends. The most common bug in mature
skills is a procedure that stops at 90% and leaves the model to improvise the
rest.

### 7. Write rules only for real failure modes

A `## Rules` section earns its place by listing things that have actually gone
wrong, or that would be destructive if they did.

Always include guards for irreversible actions the skill could take — writing
over source files, sending anything, pushing, deleting. Beyond that, add a rule
only when the user has named a failure they've hit. Do not pad this section
with plausible-sounding advice; speculative rules dilute the ones that matter.

### 8. Apply progressive disclosure

Only `name` and `description` stay resident in context. The body loads on
invocation, and bundled files load only when read.

So if any block of content is reference material — API details, format specs,
edge-case tables, long examples — move it to `reference/<topic>.md` and leave a
single pointer line in the body naming the file and when to read it. Keep the
body to the procedure and the rules.

### 9. Validate before writing

Check the draft against `reference/checklist.md`. Fix anything that fails.
Report any item you deliberately skipped and why.

### 10. Write the files

```
<skill-name>/
├── SKILL.md
├── VERSION            # 0.1.0 for a new skill
├── README.md          # human-facing: what it does, install steps
└── reference/         # only if step 8 produced anything
```

Write to `claude-skills/<skill-name>/` if that directory exists in the repo,
otherwise ask where it should go. Never write directly into `~/.claude/skills/`
— give the user the install command and let them run it.

### 11. Publish it to the catalog

If `_skills/` exists in the current repo, this is the skills site. Also write
`_skills/<skill-name>.md` following the schema in
`reference/catalog-entry.md` — read that file now if you have reached this step.

The two files must agree. The catalog entry's `description` should match the
`SKILL.md` description in substance, and the embedded code block must be the
real `SKILL.md`, not a paraphrase of it.

### 12. Hand off

Print, briefly:

- Where the files were written
- The install command
- The five trigger phrasings from step 3, so the user can test in a clean
  session

## Rules

- Build exactly one skill per invocation. If the request implies several, name
  the split and ask which to build first.
- Never overwrite an existing skill without showing what changes and asking.
- Never add a tool to `allowed-tools` that no procedure step requires.
- Never invent rules for failures the user has not described and that are not
  destructive. Short and load-bearing beats long and hedged.
- Never install anything. Writing to `~/.claude/skills/` is the user's call.
- If step 2 says this should be a prompt rather than a skill, stop there. Say it
  plainly rather than building it anyway to be agreeable.

## Reference

- `reference/checklist.md` — validation checklist for step 9.
- `reference/catalog-entry.md` — front matter schema for the site, step 11.

Do not read either until the step that needs it.
