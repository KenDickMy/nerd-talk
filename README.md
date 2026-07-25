# Lifelongnerd — nerd talk for the masses

Personal blog / field-notes site, built with **Jekyll** and published by
**GitHub Pages** at <https://kendickmy.github.io/nerd-talk/>.

## Writing a post

Drop a Markdown file into `_posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "Your Title Here"
date: 2026-07-24 09:00:00 -0500
category: Engineering
tags: [thing, other-thing]
description: >-
  One or two sentences used as the excerpt on the homepage
  and as the SEO description.
---

Write the post in Markdown. Code fences, tables, and blockquotes are all styled.
```

Commit and push to `main` — GitHub Pages rebuilds automatically. `layout: post`
is applied by default, so you don't need to set it.

## Adding a page

Create a Markdown or HTML file at the repo root with front matter:

```markdown
---
title: Uses
kicker: What I run
permalink: /uses/
---
```

Then add it to the `nav:` list in `_config.yml` to get it in the header.

## The Skills subsite

`/skills/` is a catalog of Claude Skills plus guides on writing them. It runs on
two Jekyll collections.

### Adding a skill

Create `_skills/your-skill.md`. The filename becomes the URL
(`/skills/your-skill/`).

```markdown
---
title: Your Skill
category: development      # must match a slug in _data/skill_categories.yml
topics: [git, testing]     # free-form; drives /skills/topics/
description: >-
  One or two sentences, shown on every card.
status: stable             # stable | beta | experimental
version: 1.0.0
updated: 2026-07-24
featured: true             # optional, surfaces it on the hub
allowed_tools: [Bash, Read]
install: |
  mkdir -p ~/.claude/skills/your-skill
  cp SKILL.md ~/.claude/skills/your-skill/
---

Body in Markdown. Convention here is a "What it does" section, the full
`SKILL.md` in a fenced code block, and any notes or known rough edges.
```

`install:` renders as a code block with a copy button. Everything else is
optional except `title`, `category`, and `description`.

### Adding a guide

Create `_guides/your-guide.md` → `/skills/guides/your-guide/`.

```markdown
---
title: Your Guide
level: Beginner            # Beginner | Intermediate | Advanced
order: 4                   # sort position on the guides index
updated: 2026-07-24
description: >-
  Shown on the guides index.
---
```

### Adding or renaming a category

1. Edit `_data/skill_categories.yml` — `slug`, `name`, `blurb`, and `icon`
   (an SVG path `d` for a 24×24 stroked icon).
2. Add a matching stub at `skills/categories/<slug>.html`:

```html
---
layout: skill-category
title: Your Category Skills
category: your-slug
permalink: /skills/categories/your-slug/
---
```

Counts, category pages, and the topic index all derive from front matter — no
lists to keep in sync.

### Skill source vs. catalog entry

Two things live in this repo for each skill:

| | |
|---|---|
| `claude-skills/<name>/` | The **installable skill** — `SKILL.md`, `VERSION`, `README.md`, `reference/`. Excluded from the Jekyll build; browsable on GitHub. |
| `_skills/<name>.md` | The **published page** on the site, which embeds that `SKILL.md` verbatim. |

They have to agree, and the `SKILL.md` embedded in the catalog page must be the
real file rather than a paraphrase. The
[skill-forge](https://kendickmy.github.io/nerd-talk/skills/skill-forge/) skill
generates both together so they can't drift — that's what it's for.

## Running it locally

Requires Ruby and Bundler.

```bash
bundle install --path vendor/bundle
bundle exec jekyll serve
```

Then open <http://localhost:4000/nerd-talk/>.

> The `Gemfile` pins `ffi` and `google-protobuf` so this builds on macOS system
> Ruby 2.6. On Ruby 3.x you can safely drop those two pins.

## Structure

| Path | Purpose |
|---|---|
| `_config.yml` | Site settings, nav, collections, plugins, pagination |
| `_posts/` | Blog posts, one Markdown file each |
| `_skills/` | Skill catalog entries → `/skills/:name/` |
| `_guides/` | Skill-writing guides → `/skills/guides/:name/` |
| `claude-skills/` | Installable source for the skills (excluded from the build) |
| `_data/skill_categories.yml` | Category definitions for the skills subsite |
| `skills/` | Skills hub, topic index, guides index, category stubs |
| `_layouts/` | `default`, `home`, `post`, `page`, `skill`, `guide`, `skill-category` |
| `_includes/` | Header, footer, head, post card, skill card, subnav, glyph, reading time |
| `assets/css/main.css` | The entire design system |
| `assets/js/theme.js` | Light/dark toggle, persisted to `localStorage` |
| `assets/js/copy.js` | Copy-to-clipboard for install blocks |
| `index.html` | Paginated post feed |
| `archive.html` | All posts grouped by year |
| `about.md` | About page |
| `404.html` | Not-found page |

## Design system

All colours and typography live as CSS custom properties in `:root` and
`[data-theme="dark"]` at the top of `assets/css/main.css`. Change them there and
the whole site follows.

- Display: Big Shoulders Display
- Body: IBM Plex Mono
- Accent: `#b11f4b` (light) / `#dd4d7b` (dark)
