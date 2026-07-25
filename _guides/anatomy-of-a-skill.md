---
title: Anatomy of a SKILL.md
level: Beginner
order: 1
updated: 2026-07-19
description: >-
  What actually goes in the file, why the description field matters more than
  the body, and how progressive disclosure keeps your context lean.
---

A skill is a folder with a `SKILL.md` in it. That's the whole format. Everything
else — scripts, reference docs, templates — is optional supporting material.

```
my-skill/
├── SKILL.md          # required
├── reference/        # optional, loaded on demand
│   └── api-notes.md
└── scripts/          # optional
    └── convert.py
```

## The front matter

```yaml
---
name: my-skill
description: >-
  One or two sentences on what this does AND when to use it.
allowed-tools: Read, Write, Bash
---
```

Three fields. The first two are required.

## The description is the most important line you'll write

Here's the thing that isn't obvious until you've shipped a few: **the body of
your SKILL.md doesn't exist until the skill is invoked.** Only the `name` and
`description` sit in context.

Which means the description is doing the entire job of deciding whether your
skill fires. A perfect body attached to a vague description is a skill that
never runs.

Bad:

```yaml
description: Helps with PDFs.
```

Good:

```yaml
description: >-
  Fills or extracts values from fillable AcroForm PDFs. Use when the user has a
  PDF form to populate from data, or a batch of completed forms to read values
  out of.
```

The second one names the artifact, the operations, and — critically — the
*situations*. "Use when the user…" is the highest-leverage phrase in the format.
Write the triggers as the user would actually say them, not as you'd label them.

## Progressive disclosure

There are three tiers, and the whole design rewards keeping the cheap ones cheap:

| Tier | Cost | Holds |
|---|---|---|
| Front matter | Always in context | Name + description |
| Body | Read on invocation | Procedure and rules |
| Bundled files | Read only if needed | API details, edge cases, examples |

So don't paste the entire openpyxl API into your body "just in case." Put it in
`reference/openpyxl-notes.md` and add a line to the body:

> For merged-cell handling and date-coercion gotchas, see
> `reference/openpyxl-notes.md` — don't load it unless you hit those cases.

Same information, a fraction of the resident cost.

## Write procedures, not vibes

The body should read like a runbook. Numbered steps, in order, each one
concrete enough to verify.

Compare:

> Analyse the spreadsheet carefully and extract the data cleanly.

Against:

> 1. Inventory the workbook: sheet names, dimensions, populated ranges.
> 2. Find the header row by scanning for the first row where most cells are
>    non-empty strings and the row below is heterogeneous.
> 3. Flatten multi-row headers top-down, joining with a space.

The first is an aspiration. The second is a procedure — and it produces the
same result twice in a row.

## Rules are for the failure modes

Every skill I've shipped has a `## Rules` section, and every rule in it exists
because something went wrong once:

- *Never modify the source workbook in place.* (It ate someone's file.)
- *Distinguish observation from inference.* (It invented a plausible outage
  narrative.)
- *Never send. Produce drafts only.* (Do I need to explain this one?)

Don't write rules speculatively. Write them when you catch a failure, and the
section stays short and load-bearing.

## Constrain with tools, not prose

`allowed-tools` is enforcement. Prose is a suggestion. If your skill must never
write files, don't just say so in the body — leave `Write` out of the list.

The two together is belt and braces, and worth it for anything destructive.

## The minimum viable skill

```markdown
---
name: changelog-check
description: >-
  Verifies that a PR touching source files also updates CHANGELOG.md. Use when
  reviewing a pull request or preparing to merge.
allowed-tools: Bash, Read
---

# Changelog Check

1. Run `git diff --name-only <base>...HEAD`.
2. If any file outside `docs/` or `test/` changed, check whether
   `CHANGELOG.md` is also in the list.
3. If it isn't, report which files changed and suggest an entry.

## Rules

- Do not edit CHANGELOG.md yourself unless asked.
- Dependency-only bumps do not require an entry.
```

Twenty lines. Ships today. Start here and grow it when it disappoints you.
