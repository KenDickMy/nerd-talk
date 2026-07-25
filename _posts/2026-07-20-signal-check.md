---
title: "Signal Check: This Thing Is On"
date: 2026-07-20 09:00:00 -0500
category: Meta
tags: [jekyll, github-pages, beginnings]
description: >-
  Why I finally stopped drafting posts in a notes app and stood up a real site,
  and how this one is put together.
---

I've been keeping notes on everything I build for about a decade now. Almost all
of them live in a notes app, in a folder called `misc`, in files named things
like `weird thing 3 (FINAL) v2`.

That's not a system. That's a landfill.

So: a real site. Public, versioned, and boring enough to still work in ten years.

## What it's built on

Nothing exotic, on purpose:

- **Jekyll**, built natively by GitHub Pages. No build server, no CI pipeline,
  no dependency I have to babysit.
- **Markdown** for every post. If Jekyll ever disappears, the content survives
  as plain text.
- **One CSS file.** No framework, no build step, no PostCSS toolchain rotting
  in a lockfile.

The whole publish flow is:

```bash
git add _posts/2026-07-20-signal-check.md
git commit -m "New note"
git push
```

That's it. GitHub does the rest.

## The design brief

I wanted something that reads like a lab notebook rather than a magazine. Hard
edges, monospace body text, a grid you can actually see, and offset shadows that
make the cards feel like paper stacked on a desk.

> The best personal site is the one you'll still bother to update on a Tuesday
> night in three years.

Everything is driven by CSS custom properties, so light and dark mode are the
same stylesheet with a different set of variables. The theme choice persists in
`localStorage` and gets applied in a blocking inline script before first paint,
so there's no white flash for dark-mode readers.

## What's coming

Build logs, post-mortems, tooling notes. Anything where I had to go find out
something the hard way and figure someone else might be about to.

If that sounds useful, the [RSS feed]({{ '/feed.xml' | relative_url }}) is right
there. No newsletter, no popup, no cookie banner.
