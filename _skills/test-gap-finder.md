---
title: Test Gap Finder
category: development
topics: [testing, code-review, quality]
description: >-
  Reads a diff and reports the specific behaviours it introduces that no test
  currently covers — no coverage percentages, just a list.
status: beta
version: 0.6.2
updated: 2026-07-11
allowed_tools: [Read, Grep, Bash]
install: |
  git clone https://example.com/skills/test-gap-finder.git \
    ~/.claude/skills/test-gap-finder
---

## What it does

Coverage tools tell you which *lines* ran. That's a poor proxy for whether the
behaviour is actually tested — a line can be covered incidentally by a test
asserting something else entirely.

This one works from the diff instead. It identifies each new branch, error
path, and boundary condition, then searches the test suite for an assertion
that would fail if you broke it. What's left over is the report.

## SKILL.md

```markdown
---
name: test-gap-finder
description: >-
  Identifies untested behaviours introduced by a code change. Use when the user
  asks what needs tests, wants a review of test coverage for a diff, or is
  preparing a PR.
allowed-tools: Read, Grep, Bash
---

# Test Gap Finder

## Procedure

1. Get the change set: `git diff <base>...HEAD`. Ask for the base if ambiguous.
2. Enumerate behaviours introduced, not lines. For each new conditional, early
   return, thrown error, and boundary comparison, write a one-line description
   of what could break.
3. Locate the test suite by convention (`test/`, `tests/`, `spec/`, `*_test.go`,
   `*.test.ts`). Grep for tests exercising the changed symbols.
4. For each behaviour, decide: covered, partially covered, or uncovered.
   "Partially" means a test touches the code but would still pass if the
   behaviour regressed.
5. Report only gaps, ordered by blast radius. For each, name the file the test
   belongs in and sketch the assertion in one line.

## Rules

- Do not report a coverage percentage. It is not the question being asked.
- Do not write the tests unless explicitly asked. The output is the report.
- Ignore generated code, vendored dependencies, and pure type declarations.
- If there is no test suite at all, say that once and stop.
```

## Known rough edges

Table-driven tests in Go and parameterised tests in pytest still trip it up —
it sometimes reads a case table as a single test and under-reports coverage.
Fix is planned for 0.7.
