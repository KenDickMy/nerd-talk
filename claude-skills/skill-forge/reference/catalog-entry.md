# Catalog entry schema

For publishing a skill to the Lifelongnerd skills site. Write to
`_skills/<skill-name>.md`; the filename becomes the URL (`/skills/<name>/`).

## Front matter

```yaml
---
title: Skill Name              # Title Case, human-readable
category: development          # REQUIRED: must match a slug in
                               # _data/skill_categories.yml
topics: [git, testing]         # free-form tags, lowercase, kebab-case
description: >-                # one or two sentences, shown on every card
  What it does, in plain language.
status: experimental           # stable | beta | experimental
version: 0.1.0                 # match the VERSION file
updated: 2026-07-24            # YYYY-MM-DD
featured: false                # optional; true surfaces it on the hub
allowed_tools: [Read, Write]   # mirror SKILL.md's allowed-tools
install: |                     # renders as a code block with a copy button
  mkdir -p ~/.claude/skills/skill-name
  cp -r ./claude-skills/skill-name/* ~/.claude/skills/skill-name/
---
```

`title`, `category`, and `description` are required. Everything else is
optional but `status`, `version`, and `updated` should always be present.

## Valid categories

Read `_data/skill_categories.yml` for the current list — do not assume. As of
writing: `development`, `data-docs`, `automation`, `writing`, `devops`.

If nothing fits, say so and let the user decide whether to add a category
rather than forcing a bad match. Adding one requires a YAML entry plus a stub
at `skills/categories/<slug>.html`.

## Body structure

Follow the existing entries:

1. `## What it does` — two or three paragraphs, plain prose. Lead with the
   problem, not the feature. Concrete beats comprehensive.
2. `## SKILL.md` — the complete file in a fenced `markdown` block. Copy it
   verbatim from the real file. Never paraphrase or abridge it; the page is
   the documentation.
3. `## Notes` or `## Known rough edges` — optional. Design trade-offs, things
   that don't work yet, why a rule exists. This is where the entry earns its
   keep over a bare README.

## Cross-linking

Link to guides with `relative_url`:

```liquid
[Anatomy of a SKILL.md]({{ '/skills/guides/anatomy-of-a-skill/' | relative_url }})
```

Never hardcode a leading `/skills/…` path — the site has a `/nerd-talk`
baseurl and raw paths will 404 in production while appearing to work locally.

## After writing

Nothing else to update. Category counts, the topic index, and the hub listing
all derive from front matter automatically.
