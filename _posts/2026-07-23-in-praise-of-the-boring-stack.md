---
title: "In Praise of the Boring Stack"
date: 2026-07-23 18:30:00 -0500
category: Engineering
tags: [architecture, pragmatism]
description: >-
  Every interesting technology choice is a loan against your future attention.
  Here's how I decide when it's worth taking one out.
---

There's a particular flavor of engineering enthusiasm where a project's tech
stack is more interesting than the project. I've shipped that project. Several
times. It never ends well.

## The novelty budget

The framing I keep coming back to: you get a fixed number of interesting choices
per project. Spend them carefully.

Every novel piece of your stack costs you:

| Cost | What it looks like later |
|---|---|
| Learning | Nobody else on the team can debug it at 2am |
| Ecosystem | The library you need doesn't exist yet |
| Longevity | Upstream goes unmaintained in 18 months |
| Attention | You're debugging your tools instead of your product |

None of those show up in the demo. All of them show up in month six.

## Where I spend it

Spend the budget on the thing that is *actually the point of the project*. If
you're building a real-time collaborative editor, go wild on CRDTs — that's the
product. Then make every other choice as tedious as humanly possible.

For this site, the interesting part is the writing. So:

- Static files instead of a database
- A ten-year-old site generator instead of the new one
- Plain CSS instead of a design system
- `git push` instead of a deploy pipeline

Nothing here will need a migration.

## The counter-argument

"Boring" isn't a virtue on its own. Boring tools that don't fit your problem are
worse than novel tools that do — you end up building the missing half yourself,
badly, and now you own it forever.

The test isn't *is this old?* It's:

1. Does it solve the actual problem without heroics?
2. Will it still be maintained when I come back in two years?
3. Can I explain the whole thing to someone new in an afternoon?

Three yeses and you're fine, however old or new the thing is.

```js
// The one-line version
const shouldAdopt = (tool) =>
  tool.solvesRealProblem && tool.stillMaintainedIn(2) && tool.explainableInAnAfternoon;
```

Most of my best technical decisions have been unremarkable. That's kind of the
point — you don't remember them because they never made me stay late.
