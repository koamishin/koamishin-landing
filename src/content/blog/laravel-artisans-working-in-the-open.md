---
title: 'Laravel artisans, working in the open'
description: 'Koamishin is a growing collective of Laravel artisans. Here is what that means, how we work in public, and why every repository is free to fork.'
pubDate: 2026-10-20
author: 'Koamishin Collective'
tags: ['collective', 'announcement', 'open-source']
cover: '/covers/laravel-artisans-working-in-the-open.svg'
---

Koamishin is a growing collective of Laravel artisans — engineers and designers devoted to craft, clarity, and open-source work. We learn in public, hold a high bar, and keep the workshop doors open.

This post is the long form of that statement. If you have landed here from the landing page, this is the place where we explain the thinking behind the tools.

## What "artisan" means to us

Laravel's artisan commands are the craft of the framework: repeatable, explicit, and inspectable. We borrow the metaphor on purpose. An artisan is not someone who ships black boxes; an artisan knows the material, names the steps, and leaves the workbench tidy for the next person.

That translates into three habits we apply to everything we build:

1. **Explicit over clever.** If a rule can be read in one file, it goes in one file. No magic, no hidden conventions.
2. **Tested in the open.** Every repository ships with deterministic tests and CI/CD templates, not as an afterthought.
3. **Forkable by default.** MIT or AGPL, public from the first commit, no gated tiers, no "contact sales" path.

## Working in the open

The collective is small and growing. We work across time zones, we review each other's pull requests, and we publish the reasoning — not just the artifact.

> Every line is public, every system is free.

That is not a slogan we borrowed; it is the licensing and governance policy. You can take any repository in the [`@koamishin`](https://github.com/koamishin) organization, run it in production, change it, and keep your changes private if the license allows. We would rather that happened than have the code rot inside a vendor lock-in.

## What we actually ship

| Surface | Examples | License |
| --- | --- | --- |
| Starter kits | KoamiStarterKit | MIT |
| Institutional platforms | koakademy, konexus, KoaScholarships | MIT / AGPL-3.0 |
| Operational tools | konbi, Koattendance, koment | MIT |
| Research & prototypes | OpenSinop | MIT |

The catalog grows as the collective does. If you want to follow along, the [journal](/blog/) collects the deep dives, and the [projects directory](/#projects) lists everything currently published.

## Joining the workshop

The doors are open. You do not need to be a Laravel core contributor or a senior engineer to start — you need a problem you care about and the willingness to finish it.

- Fork a repository and open a pull request.
- Raise an issue on anything that confused you.
- Come to a hackathon and build with us.

If you are unsure where to begin, start with the [quickstart guide](/blog/koamishin-quickstart-in-two-minutes/) and fork KoamiStarterKit. It is the smallest useful thing you can build on top of.

Our flagship work — OpenSinop, the bounded finance orchestration engine we built for the Circle Agent × Arc hackathon — is documented in full in the [OpenSinop architecture deep dive](/blog/opensinop-agentic-finance-architecture/).
