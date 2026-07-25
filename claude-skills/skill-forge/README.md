# Skill Forge

Creates new Claude Skills, and publishes them to the
[Lifelongnerd skills catalog](https://kendickmy.github.io/nerd-talk/skills/).

You describe the job. It writes the `SKILL.md`, picks the minimum tool
permissions, and — when run inside the site repo — generates the matching
catalog entry so the two never drift apart.

## Why

Writing a skill is mostly mechanical, and the mechanical parts are exactly where
they go wrong:

- The **description** gets written last and treated as a label, so the skill
  never triggers.
- **`allowed-tools`** gets a generous list "just in case," and the only real
  guardrail in the format is discarded.
- The **procedure** stops at 90% and leaves the rest to improvisation.
- The **rules** section fills with plausible advice nobody validated.

Skill Forge front-loads the description, starts tools from empty, and validates
against a checklist before writing anything.

## Install

```bash
mkdir -p ~/.claude/skills/skill-forge
cp -r ./claude-skills/skill-forge/* ~/.claude/skills/skill-forge/
```

Project-scoped instead, so a whole repo gets it:

```bash
mkdir -p .claude/skills/skill-forge
cp -r ./claude-skills/skill-forge/* .claude/skills/skill-forge/
```

## Using it

Just describe what you want:

> I keep asking you to check whether my PR updated the changelog. Make that a skill.

It asks at most three questions, then writes:

```
claude-skills/changelog-check/
├── SKILL.md
├── VERSION
├── README.md
└── reference/        # only if there's reference material to split out
```

Plus `_skills/changelog-check.md` if you're in the site repo.

It finishes by giving you five phrasings to test the trigger with in a clean
session — which is the only way to find out whether the description works.

## It will talk you out of things

If the job is one sentence and works fine as a prompt, it says so and gives you
the prompt instead of building a skill you'll never use. That's deliberate.

## Tools

`Read, Write, Glob, Grep` — deliberately no `Bash`. It writes files into your
repo and nothing else. Installing into `~/.claude/skills/` stays your call.

## Related

- [Anatomy of a SKILL.md](https://kendickmy.github.io/nerd-talk/skills/guides/anatomy-of-a-skill/)
- [Writing Descriptions That Actually Trigger](https://kendickmy.github.io/nerd-talk/skills/guides/writing-descriptions/)
- [Testing and Shipping Skills](https://kendickmy.github.io/nerd-talk/skills/guides/testing-and-shipping/)
