---
title: 'Inside the collective: how Koamishin works'
description: 'A small, global, remote team of engineers and designers who publish what they build so the wider community can pick up the tools.'
pubDate: 2026-10-08
author: 'Koamishin Collective'
tags: ['collective', 'team', 'process']
cover: '/covers/inside-the-collective-how-koamishin-works.svg'
---

A small, global, remote collective — engineers and designers who publish what they build so the wider community can pick up the tools.

This is a look at how that actually works day to day, and what it means if you want to join.

## Who is in the room

**Louis (@Rui-Zen)** — founder and principal architect. Drives core framework design, starter kit infrastructure, and multi-tenant platforms, with a focus on backend resilience, developer ergonomics, and clean open-source standards. `Laravel · Vue · PHP · TypeScript`

**Ortiz (@SorenOutis)** — full-stack and AI engineer blending reactive Laravel and Vue architectures with intelligent workflow automation. Specializes in scalable data systems, AI-augmented tooling, and bridging complex backend logic with polished interfaces. `Laravel · Vue · System Arch`

**Jaymark (@jayreid017)** — UI/UX designer and mobile developer crafting intuitive multi-platform applications, human-centered design systems, and rigorous QA. Translates Figma prototypes into responsive, accessible experiences. `Figma · Flutter · React`

**Angelika (@elyashzyl)** — frontend developer and design engineer bridging UI craftsmanship with modern React architecture. Builds modular design systems, expressive interactions, and resilient client-side interfaces. `React · TypeScript · UI Systems`

## Remote, asynchronous, and written down

We are spread across time zones, which means the work happens in text first. A decision that only exists in someone's head does not exist. If it is not written down, it is not a decision — it is a preference someone forgot to share.

The practical consequences:

- **Issues before pull requests.** Discussion happens on the issue, where the reasoning stays attached to the change.
- **Small, reviewable diffs.** A pull request that needs a meeting is a pull request that is doing too much.
- **Written conventions.** Style, structure, and naming live in the repositories, not in a private channel.

## The review bar

We hold a high bar, and it is a bar about clarity rather than cleverness. Reviewers look for:

- Strict types at the boundaries, and no `mixed` leaking into domain logic.
- Tests that fail for the right reason, and deterministic tests above all.
- Names that survive contact with a new contributor.
- A migration path, or a note explaining why there is not one.

> Contributing felt welcoming from the first PR. The collective reviews with care — it raised the bar for our whole team.

That is the standard we are aiming for: rigorous, and worth the time you spent on it.

## What we ask of contributors

You do not need to be a Laravel core contributor. You need:

1. A problem you care about, small enough to finish.
2. The willingness to follow the conventions of the repository you are touching.
3. Basic courtesy: describe the change, respond to review, and keep unrelated refactors out of the diff.

That is it. We will meet you at the level you arrive at and help you get better one review at a time.

## Growing the collective

The team is growing, and the structure will grow with it. If you want to be part of it — as a contributor, a maintainer of one of the systems, or a designer working across projects — start by opening an issue or a pull request on whichever repository interests you.

The doors are open, every line is public, and every system is free. You can see the whole roster on the [landing page](/#team), and the [journal](/blog/) collects the work in more detail.
