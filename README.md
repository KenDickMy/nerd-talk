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
| `_config.yml` | Site settings, nav, plugins, pagination |
| `_posts/` | Blog posts, one Markdown file each |
| `_layouts/` | `default`, `home`, `post`, `page` |
| `_includes/` | Header, footer, head, post card, glyph, reading time |
| `assets/css/main.css` | The entire design system |
| `assets/js/theme.js` | Light/dark toggle, persisted to `localStorage` |
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
