# Lifelongnerd — nerd talk for the masses

Personal blog / field-notes site, built with **Jekyll** and published by
**GitHub Pages** at <https://kendickmy.github.io/nerd-talk/>.

Three sections: the blog, a [Claude skills](https://kendickmy.github.io/nerd-talk/skills/)
catalog, and a [Microsoft Scout skills](https://kendickmy.github.io/nerd-talk/scout/)
catalog. The two skill sections are deliberately separate — the formats differ
more than they look.

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
  mkdir -p ~/.claude/skills && cd ~/.claude/skills && \
  curl -sL https://github.com/KenDickMy/nerd-talk/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 nerd-talk-main/claude-skills/your-skill
---

Body in Markdown. Convention here is a "What it does" section, the full
`SKILL.md` in a fenced code block, and any notes or known rough edges.
```

`install:` renders as a code block with a copy button. Write it **self-contained**
— whoever copies it is on the site, not in a clone of this repo, so a relative
`cp` path will just fail for them. The tarball form above pulls a single folder
without cloning anything.

Everything else is optional except `title`, `category`, and `description`.

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

## The Scout subsite

`/scout/` is a parallel catalog for **Microsoft Scout** skills. It works the
same way — collections, categories, topics, guides — but it's separate on
purpose, because the format genuinely differs.

### What's different from Claude

| | Claude | Scout |
|---|---|---|
| Front matter | `name`, `description`, `allowed-tools` | **`description` only** |
| Identifier | `name` field | The folder name |
| Permissions | Per-skill `allowed-tools` | Global three-tier, in Settings > Permissions |
| Install path | `~/.claude/skills/` | `~/.copilot/skills/` or `~/.copilot/m-skills/` |

The one that bites: **Scout has no per-skill tool list.** Port a Claude skill
across and its `allowed-tools` line is silently ignored — a read-only skill
becomes a skill that merely says it's read-only. See
[Scout skills aren't Claude skills](https://kendickmy.github.io/nerd-talk/scout/guides/scout-vs-claude-skills/).

### Adding a Scout skill

Same two-part split as Claude skills:

| | |
|---|---|
| `scout-skills/<name>/` | The **installable skill**. Excluded from the build. |
| `_scout_skills/<name>.md` | The **published page**, embedding that `SKILL.md` verbatim. |

The source `SKILL.md` takes exactly one front matter field:

```yaml
---
description: "What it does. Use when <the situations that should trigger it>."
---
```

The catalog page front matter is Scout-flavoured — no `allowed_tools`, since
there's nothing to list:

```yaml
---
title: Meeting Prep
description: >-
  One or two lines for the card.
category: microsoft-365
status: stable          # stable | beta | draft
version: 0.1.0
updated: 2026-02-19
tier: user or workspace
heartbeat: yes — writes only, never sends
reaches: [Calendar, Mail, Teams]
topics: [microsoft-365, calendar, briefing]
install: |
  mkdir -p ~/.copilot/skills && cd ~/.copilot/skills && \
  curl -sL https://github.com/KenDickMy/nerd-talk/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 nerd-talk-main/scout-skills/meeting-prep
source: https://github.com/KenDickMy/nerd-talk/tree/main/scout-skills/meeting-prep
---
```

Note there's no `allowed_tools` — Scout has no such field, so there'd be nothing
to list.

### How installing actually works

Scout has no installer and no registry. It scans these directories at the start
of every conversation, and a folder containing a `SKILL.md` in any of them is a
skill:

| Directory | Scope |
|---|---|
| `~/.copilot/skills/` | This machine, all workspaces |
| `~/.copilot/m-skills/` | Follows you across devices |
| `~/.copilot/bundled-skills/` | Shipped by Microsoft, not editable |

So "install" is a file copy. Keep the `install:` command in front matter
self-contained — someone reading the site doesn't have this repo checked out:

```bash
mkdir -p ~/.copilot/skills && cd ~/.copilot/skills && \
curl -sL https://github.com/KenDickMy/nerd-talk/archive/refs/heads/main.tar.gz \
| tar -xz --strip-components=2 nerd-talk-main/scout-skills/<name>
```

Guides go in `_scout_guides/`; categories are defined in
`_data/scout_categories.yml` with a matching stub in `scout/categories/`,
exactly as on the Claude side.

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
| `_scout_skills/` | Scout catalog entries → `/scout/:name/` |
| `_scout_guides/` | Scout guides → `/scout/guides/:name/` |
| `scout-skills/` | Installable source for Scout skills (excluded from the build) |
| `_data/skill_categories.yml` | Category definitions for the skills subsite |
| `_data/scout_categories.yml` | Category definitions for the Scout subsite |
| `skills/` | Skills hub, topic index, guides index, category stubs |
| `scout/` | Scout hub, topic index, guides index, category stubs |
| `_layouts/` | `default`, `home`, `post`, `page`, `skill`, `guide`, `skill-category`, `scout-skill`, `scout-guide`, `scout-category` |
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

## Search, topics, and social cards

- **Search** lives at `/search/` (magnifier icon in the header). It's fully
  client-side: `search.json` is a Liquid-generated index of posts, skills, and
  guides, and `assets/js/search.js` scores matches in the browser. No external
  service, nothing to configure — new content is indexed automatically at build.
- **Topics** (`/topics/`) groups every post by tag. Tag chips on cards and
  posts link straight to the matching section.
- **Social cards**: `assets/og-card.png` is the default Open Graph image
  (set site-wide in `_config.yml` defaults). Give any post its own card by
  adding `image: /path/to/image.png` to its front matter.
- **Theme** now follows the visitor's OS preference on first visit; the toggle
  still wins once clicked.
