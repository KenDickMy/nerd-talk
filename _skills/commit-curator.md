---
title: Commit Curator
category: development
topics: [git, code-review, conventions]
description: >-
  Turns a messy working tree into a clean series of atomic commits with
  messages that follow your repo's existing conventions.
status: stable
version: 1.3.0
updated: 2026-07-18
featured: true
allowed_tools: [Bash, Read, Grep]
install: |
  mkdir -p ~/.claude/skills/commit-curator
  curl -L https://example.com/skills/commit-curator.zip | tar -xz -C ~/.claude/skills/commit-curator
---

## What it does

You've been heads-down for three hours and your working tree is a pile of
unrelated changes. Commit Curator reads the diff, groups the hunks by intent,
and stages them into separate commits — each one buildable on its own.

Crucially, it reads your last 40 commit messages first and matches whatever
convention it finds. If you use Conventional Commits, you get Conventional
Commits. If you write sentence-case one-liners, you get those.

## When it triggers

- "clean up my commits"
- "split this into logical commits"
- "commit this properly"

## SKILL.md

```markdown
---
name: commit-curator
description: >-
  Groups uncommitted changes into atomic commits with messages matching the
  repository's existing style. Use when the user wants to commit a large or
  mixed set of changes, split work into logical commits, or rewrite messages.
allowed-tools: Bash, Read, Grep
---

# Commit Curator

## Procedure

1. Run `git status --short` and `git diff` to see the full change set.
2. Run `git log --oneline -40` to infer the message convention. Note whether
   the repo uses prefixes, imperative mood, sentence case, or scopes.
3. Group changes by intent, not by file. A rename that touches nine files is
   one commit. Two unrelated fixes in one file are two commits.
4. Stage each group with `git add -p` or explicit pathspecs, then commit.
5. Print the resulting `git log --oneline` for confirmation.

## Rules

- Never squash unrelated changes to save time.
- Never commit generated files, lockfiles, or secrets. Check `.gitignore` first.
- If a group cannot be staged cleanly at file granularity, say so and stop
  rather than bundling it into an unrelated commit.
- Do not push. Committing is the end of the job.
```

## Notes

The `git add -p` path is the fragile part — if hunks interleave inside a single
file, the skill bails out and tells you instead of guessing. That was a
deliberate trade after v1.0 produced a few commits that didn't build.
