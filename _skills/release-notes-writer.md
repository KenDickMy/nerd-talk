---
title: Release Notes Writer
category: writing
topics: [changelog, git, conventions]
description: >-
  Generates release notes from a commit range, written for the people who use
  the software rather than the people who wrote it.
status: stable
version: 1.1.0
updated: 2026-07-14
allowed_tools: [Bash, Read]
install: |
  mkdir -p ~/.claude/skills/release-notes-writer
  cp SKILL.md ~/.claude/skills/release-notes-writer/
---

## What it does

Auto-generated changelogs are a list of commit subjects, which is a list of
things developers did — not a list of things that changed for users. This skill
translates between the two, and drops the commits that have no user-visible
effect at all.

## SKILL.md

```markdown
---
name: release-notes-writer
description: >-
  Writes user-facing release notes from a git commit range. Use when the user
  is cutting a release, preparing a changelog, or summarising what shipped.
allowed-tools: Bash, Read
---

# Release Notes Writer

## Procedure

1. Determine the range. Default to `<last tag>..HEAD`; confirm if no tags exist.
2. Read `git log` with bodies, not just subjects. The reasoning is usually in
   the body.
3. Classify each commit: Added, Changed, Fixed, Deprecated, Removed, Security,
   or Internal.
4. Drop everything classified Internal — refactors, test changes, CI tweaks,
   dependency bumps with no behaviour change.
5. Rewrite each remaining entry from the user's perspective. "Refactor auth
   middleware" becomes "Sessions no longer expire early when the clock skews."
6. Lead with breaking changes under their own heading, with migration steps.
7. Match the format of the existing CHANGELOG if one exists.

## Rules

- Never invent a change that is not in the log.
- If a commit's user impact is genuinely unclear, list it under "Needs review"
  at the bottom rather than guessing at it.
- No marketing voice. Plain declarative sentences, past tense.
- Link issue and PR numbers where the commit references them.
```

## Notes

Step 5 is the whole point and also the part most likely to hallucinate, which
is why "Needs review" exists. In practice it flags two or three entries per
release, which is about right.
