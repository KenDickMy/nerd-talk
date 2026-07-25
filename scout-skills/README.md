# scout-skills

Microsoft Scout skills, in source form. Each directory here is installable —
copy it into a Scout skills directory and Scout picks it up at the start of the
next conversation.

Every skill in here has a published page under
[`_scout_skills/`](../_scout_skills/) that embeds its `SKILL.md` verbatim. The
two must agree.

## Install

Scout finds skills by scanning a few directories on disk. "Installing" a skill
means nothing more than putting its folder in one of them — there's no registry,
no install command, and no restart.

| Directory | Scope |
|---|---|
| `~/.copilot/skills/` | This machine, all workspaces |
| `~/.copilot/m-skills/` | Follows you across devices |
| `~/.copilot/bundled-skills/` | Shipped by Microsoft, not editable |

Without cloning anything, replacing `<name>` with the skill folder:

```bash
mkdir -p ~/.copilot/skills && cd ~/.copilot/skills && \
curl -sL https://github.com/KenDickMy/nerd-talk/archive/refs/heads/main.tar.gz \
| tar -xz --strip-components=2 nerd-talk-main/scout-skills/<name>
```

Or, from the root of a clone of this repo:

```bash
cp -R scout-skills/<name> ~/.copilot/skills/
```

Scout picks it up at the start of the next conversation.

Bundled skills are not editable — copy one out and rename it if you want to
change how it behaves.

## Format

Scout's `SKILL.md` front matter is a single quoted `description`:

```yaml
---
description: "Generates a weekly status report from my recent activity."
---
```

No `name` — the folder name is the identifier. No `allowed-tools` — Scout
governs permissions globally through its three-tier system rather than per
skill. If you are coming from Claude skills, read
[Scout skills aren't Claude skills](../_scout_guides/scout-vs-claude-skills.md)
before porting anything.

The description is the whole trigger mechanism. It should name the situations
that should invoke the skill, in the words someone would actually use.

## Skills

| Skill | What it does |
|---|---|
| [`meeting-prep`](meeting-prep/) | Briefs you before a meeting from calendar, mail, Teams, and document context |

## A caution

Microsoft does not validate custom skills. A skill is instructions handed to an
agent that can reach your files, your shell, your browser, and your Microsoft
365 tenant. Read one before you install it.
