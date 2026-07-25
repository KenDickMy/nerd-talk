---
title: Testing and Shipping Skills
level: Advanced
order: 3
updated: 2026-07-23
description: >-
  How to tell whether a skill actually works, version it without breaking
  people, and structure a repo others can install from.
---

A skill that works once in the session where you wrote it has not been tested.
You had the context loaded, you phrased the request in your own vocabulary, and
you steered it without noticing.

## Test in clean sessions, always

Non-negotiable. Every real test starts fresh, with no history and no
explanation of what the skill does.

A minimal matrix:

| Case | Checking |
|---|---|
| Obvious phrasing | Basic triggering |
| Oblique phrasing | Description coverage |
| Wrong-skill phrasing | False-positive rate |
| Messy real input | Procedure robustness |
| Empty / degenerate input | Failure handling |
| Explicit "don't do X" | Whether rules hold |

The last one is worth dwelling on. Tell it to skip a step your rules forbid
skipping and see what happens. That's where you learn whether your rules are
enforcement or decoration.

## Keep a scratch corpus

For anything data-shaped, save the inputs that broke it. Six real messy
spreadsheets beat a hundred synthetic clean ones, and re-running them after a
change takes two minutes.

```
my-skill/
└── .testdata/          # gitignored if the data is sensitive
    ├── merged-headers.xlsx
    ├── notes-in-column-a.xlsx
    └── empty-sheet.xlsx
```

## Version it

Put a version in the skill folder and change it when behaviour changes.

- **Patch** — wording, typos, clarifications. Same behaviour.
- **Minor** — new capability, existing paths unchanged.
- **Major** — output format changed, or a rule that people relied on is gone.

Major bumps deserve a note explaining what to expect. People build workflows
on your output format, and silently changing it is how you lose them.

## Status labels

Three states, honestly applied:

- **Experimental** — works for the cases I've tried, will surprise you.
- **Beta** — reliable on the common path, known rough edges documented.
- **Stable** — I use it without checking the output.

The value is entirely in being honest about the first two. A skill labelled
stable that isn't burns trust that's expensive to earn back.

## Structure for distribution

```
skills/
├── README.md
└── commit-curator/
    ├── SKILL.md
    ├── VERSION
    ├── README.md          # human-facing: what, why, install
    └── reference/
        └── conventions.md
```

Two readmes is not redundant. `SKILL.md` is written for the model — procedures,
rules, no marketing. `README.md` is written for a person deciding whether to
install it.

Installation should be one copy into `~/.claude/skills/` (personal) or
`.claude/skills/` in a repo (project-scoped, and checked in so the whole team
gets it).

## Watch what it does in the wild

The interesting failures are the ones you'd never think to test:

- **It fires when it shouldn't.** Description is too broad — add an exclusion.
- **It skips step four every time.** Step four is ambiguous, or buried in a
  wall of prose. Split it, or move it earlier.
- **Output drifts between runs.** Some step is a judgement call. Make it a
  rule with a concrete threshold.
- **It gets 90% right then improvises the rest.** Your procedure ends before
  the task does. Add the missing steps.

That last one is the most common bug in mature skills, and the easiest to miss
because the output looks fine at a glance.

## Know when to stop

Not every task should be a skill. If you can say it in one sentence and it
works, that's a prompt, not a skill.

Skills earn their keep when the procedure is long enough to forget, the rules
matter enough to enforce, or you need the same result on a Tuesday six months
from now.
