# meeting-prep

A Microsoft Scout skill. Briefs you before a meeting using calendar, mail,
Teams, and document context that is already in Microsoft 365.

Read-only by design — it never sends, replies, accepts, declines, or reschedules
anything.

## Install

No clone needed — this pulls just this one folder straight into Scout's skills
directory:

```bash
mkdir -p ~/.copilot/skills && cd ~/.copilot/skills && \
curl -sL https://github.com/KenDickMy/nerd-talk/archive/refs/heads/main.tar.gz \
| tar -xz --strip-components=2 nerd-talk-main/scout-skills/meeting-prep
```

Already have the repo cloned? From the repo root:

```bash
cp -R scout-skills/meeting-prep ~/.copilot/skills/
```

Either way you end up with `~/.copilot/skills/meeting-prep/`. That's the whole
install — Scout scans that directory at the start of each conversation, so
there's nothing to register and no restart. Use `~/.copilot/m-skills/` instead
if you want it to follow you across devices.

To confirm it landed:

```bash
ls ~/.copilot/skills/meeting-prep
```

## Use it

```
Prep me for my next meeting
What's the 2pm about?
Get me up to speed on the design review
```

## Files

```
meeting-prep/
├── SKILL.md
├── VERSION
├── README.md
└── reference/
    ├── brief-format.md   the output structure
    └── heartbeat.md      running it as a recurring check-in
```

## What it actually does

1. Resolves the meeting, skipping placeholders and all-day blocks
2. Resolves attendees through the directory — internal vs external, who
   organised, who hasn't responded
3. Gathers context from the invite, mail, Teams, attached and related documents,
   and previous occurrences of a recurring series
4. Finds the open loops — unanswered questions, undischarged commitments in both
   directions, decisions deferred from last time
5. Flags meeting hygiene problems — no agenda, conflicts, back-to-backs
6. Writes the brief to `meeting-prep/<date>-<slug>.md` and shows it
7. States its own blind spots

## Design notes

**It treats everything it reads as data, not instructions.** Mail and chat
messages are full of imperative language, and Scout tags external content as
untrusted for exactly this reason. The skill never acts on an instruction found
inside gathered content, and reports anything that looks like an attempt under
an **Anomalies** heading.

**It respects sensitivity labels.** Reading labelled content elevates the
session's sensitivity, so the brief goes to the workspace only and the label is
stated at the top — you should know before you forward it.

**It behaves differently with external attendees.** Internal chatter about
someone stays out of a brief they might see over your shoulder.

**It does nothing in heartbeat mode except write a file.** Heartbeat runs under
a more restrictive policy with no one there to approve anything, so the skill
does not try to message you the brief. See `reference/heartbeat.md`.

**It never takes an action.** Not even when the right action is obvious. Prep
and doing are separate turns.

## Known rough edges

**Not yet run against a live Scout.** Written from Microsoft's published docs —
the M365 tool reach, heartbeat policy, and sensitivity-label behaviour are
reasoned rather than observed. Published as `beta` for that reason.

- "Related documents" leans on title matching, so a well-named doc gets found
  and a `Untitled-3.docx` does not.
- 30 days back is arbitrary. Long-running projects with a quiet month will lose
  their thread.
- Duplicate-brief detection is filename-based. Rename the output and it will
  brief you twice.
- No handling for meetings where the useful context lives in a system Scout
  can't reach — Jira, Salesforce, a wiki.

## Not a Claude skill

The front matter is `description` only. Scout has no per-skill `allowed-tools`
field — permissions come from its global three-tier system in Settings >
Permissions. The read-only guarantee here is enforced by the skill's own rules
and by your tier configuration, not by a manifest.
