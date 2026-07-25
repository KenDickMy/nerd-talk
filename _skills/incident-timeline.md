---
title: Incident Timeline
category: devops
topics: [incidents, postmortem, observability, automation]
description: >-
  Assembles a minute-by-minute incident timeline from logs, deploys, alerts,
  and chat, ready to drop into a post-mortem.
status: beta
version: 0.8.0
updated: 2026-07-09
featured: true
allowed_tools: [Bash, Read, Write, Grep]
install: |
  mkdir -p ~/.claude/skills/incident-timeline
  cp -r ./incident-timeline/* ~/.claude/skills/incident-timeline/
---

## What it does

The worst part of writing a post-mortem is reconstructing what actually
happened, in order, from five systems that each use a different timestamp
format and time zone.

This normalises everything to UTC, merges it into one ordered stream, and marks
the moments that matter — first alert, first human acknowledgement, the deploy
that probably caused it, and recovery.

## SKILL.md

```markdown
---
name: incident-timeline
description: >-
  Builds a chronological incident timeline from logs, deploy history, alerts,
  and chat transcripts. Use when the user is writing a post-mortem, doing
  incident review, or asking what happened during an outage.
allowed-tools: Bash, Read, Write, Grep
---

# Incident Timeline

## Procedure

1. Establish the window. Ask for incident start and end if not given; pad by
   30 minutes on each side.
2. Collect from each available source: application logs, deploy history,
   alert/pager events, and chat transcripts. Note which sources are missing.
3. Normalise every timestamp to UTC. Record the original zone in a comment —
   zone confusion is the single most common error in this task.
4. Merge into one ordered stream. Collapse runs of identical repeated log lines
   into a single entry with a count.
5. Mark key moments: first symptom, first alert, first human acknowledgement,
   mitigation applied, recovery confirmed.
6. Compute time-to-detect and time-to-mitigate from those markers.
7. Write to `timeline.md` as a table.

## Rules

- Distinguish observation from inference. Anything you concluded rather than
  read must be prefixed `(inferred)`.
- Never assign blame to a person. Reference systems, commits, and deploys.
- If two sources disagree on ordering, show both and flag the conflict rather
  than silently picking one.
- Do not write the analysis or remediation sections. This skill produces the
  timeline only.
```

## Notes

Rule three does the heavy lifting. Early versions produced confident narratives
that turned out to be the model connecting two unrelated events, so the
`(inferred)` prefix is now non-negotiable.
