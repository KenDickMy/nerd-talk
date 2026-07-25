---
title: Inbox Triage
category: automation
topics: [email, workflows, automation]
description: >-
  Sorts a backlog of messages into act / reply / read / archive, and drafts
  the replies that are pure acknowledgement.
status: beta
version: 0.5.1
updated: 2026-07-16
allowed_tools: [Read, Write]
install: |
  mkdir -p ~/.claude/skills/inbox-triage
  cp SKILL.md ~/.claude/skills/inbox-triage/
---

## What it does

Takes an exported thread list and buckets it by what you actually have to do,
then drafts the replies for anything that's just "got it, thanks" or "yes,
Thursday works."

Drafts only. Nothing sends.

## SKILL.md

```markdown
---
name: inbox-triage
description: >-
  Triages a batch of email or message threads into action categories and drafts
  routine replies. Use when the user wants to clear a backlog, prioritise an
  inbox, or find out what needs a response.
allowed-tools: Read, Write
---

# Inbox Triage

## Procedure

1. Read the thread list. For each thread, note sender, subject, date, and
   whether the user was addressed directly or CC'd.
2. Assign exactly one bucket:
   - **Act** — a specific task is being asked of the user.
   - **Reply** — a response is expected but no task follows.
   - **Read** — informational, no response expected.
   - **Archive** — automated, resolved, or superseded by a later thread.
3. Within Act, order by stated deadline, then by how long the sender has been
   waiting.
4. For Reply threads that are pure acknowledgement or simple scheduling
   confirmations, draft a reply of three sentences or fewer.
5. Output a table, then the drafts below it.

## Rules

- Never send, archive, or modify anything. Produce drafts and a report only.
- Do not draft replies for anything involving money, legal matters, personnel,
  or conflict. Put those in Act and let the user write them.
- Match the user's own register from their previous replies in the thread.
- If a thread's bucket is genuinely ambiguous, choose Act. Under-triaging is
  cheaper than missing a request.
```

## Notes

The "never send" rule is load-bearing and deliberately stated twice — once in
the rules, once by omitting any send tool from `allowed-tools`. Guardrails in
prose are suggestions; guardrails in tool permissions are enforcement.
