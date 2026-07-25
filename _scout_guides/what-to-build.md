---
title: Skills worth writing for Scout
description: >-
  Scout's leverage is heartbeat, Microsoft 365, and the desktop. Which skill ideas
  actually use that, and which are just a chatbot with extra steps.
level: Practical
order: 2
updated: 2026-02-19
---

The first Scout skill most people write is a summariser. It works, and it's also
something a browser tab could have done.

Scout's actual leverage is narrow and specific: it runs on your machine, it
holds your work identity, and it can act on a timer without you. Skills that
don't use at least one of those are skills you didn't need.

## The test

Before writing anything, answer:

**Does it need something only Scout can reach?** Mail, calendar, Teams, files on
this machine, a browser session that's already logged in. If the answer is no —
if you could paste the input into any chat window — you want a prompt, not a
skill.

**Would you run it more than three times?** Skills are for repeated procedures.
A one-off is a conversation.

**Is the procedure non-obvious?** If the model already does it well when asked
plainly, a skill adds indirection and nothing else. Skills earn their keep by
encoding the steps you'd otherwise have to remember to specify.

Most ideas fail at least one of these. That's fine — it's cheaper to find out
now.

## Ideas that pass

**Pre-meeting brief.** Calendar plus mail plus Teams plus documents, resolved
into what you need to walk in knowing. Uses M365, benefits from heartbeat, and
the "what did I promise and not deliver" step is genuinely hard to do by hand.
Built: [meeting-prep](/nerd-talk/scout/meeting-prep/).

**End-of-week status.** Sent mail, completed tasks, calendar, commits. The
procedure is dull and the inputs are scattered — exactly what a skill is for.
Microsoft's own docs use this as the canonical example.

**Inbox triage on a heartbeat.** Not replying — classifying. What arrived, what
needs you, what can wait, what's already handled elsewhere in a thread you're
on. Heartbeat means it's ready before you look.

**Deadline archaeology.** Scan mail and Teams for commitments with dates in
them, reconcile against your calendar and task list, surface the ones with
nothing scheduled against them. High value, tedious, and only possible with
tenant access.

**Document handover.** Take a doc you've been editing, generate the summary,
open questions, and change history someone else needs to pick it up. Uses the
bundled Office skills as a foundation.

**Release note assembly.** Repo commits plus the browser plus the issue tracker,
into a draft. Uses the desktop and the browser session, not just an API.

## Ideas that fail

**"Summarise this."** Any chat window does it. No Scout leverage.

**"Write me an email."** Same. And Scout's outbound permissions mean you'll be
approving it anyway, so you may as well have written it.

**A skill that wraps one tool call.** If it's `m365_search` with a slightly
better prompt, it's a prompt.

**Anything a bundled skill covers.** Word, Excel, PowerPoint, Loop, and web
artifacts already ship. Check `~/.copilot/bundled-skills/` before you write.

**A skill that needs a system Scout can't reach.** Jira, Salesforce, an internal
wiki behind SSO — you'll write something that produces a confidently incomplete
answer, which is worse than no answer.

## Design notes that keep coming up

**Read-only is the right default.** Most useful skills gather and report. The
moment a skill can send something, its blast radius includes your reputation.
Split "prep" from "do" into separate turns — and remember Scout has no per-skill
tool list to enforce that, so it has to be a rule you write *and* a permission
tier you set.

**Say what's missing.** A brief that silently omits Teams because the tool
failed is worse than one that admits it. Every gathering skill should end by
naming its blind spots.

**Anything reading inbound content needs an injection rule.** Mail and chat are
full of imperative sentences. Scout treats external content as untrusted, and
your skill should say so explicitly.

**Heartbeat changes behaviour, not just timing.** Stricter permissions, no user
present, generic-content-only on anything outbound. If a skill can run on a
heartbeat, write that branch.

**Attribute everything.** Source and date on every claim. Inference marked as
inference. You'll want this the first time a brief is confidently wrong.

## Start smaller than you think

The instinct is to write the ambitious one. Write the boring one first — the
thing you do every Friday that takes eleven minutes. You'll learn how Scout
handles descriptions, permissions, and reference files on something where being
wrong costs nothing.
