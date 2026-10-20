---
title: 'The shelf: seven open-source Laravel systems'
description: 'A tour of everything published under the @koamishin organization — starter kits, institutional platforms, and operational tools, all free to fork.'
pubDate: 2026-10-12
author: 'Koamishin Collective'
tags: ['projects', 'open-source', 'catalog']
cover: '/covers/the-shelf-seven-open-source-laravel-systems.svg'
---

A curated directory of frameworks, enterprise platforms, and tools built by the collective. Clean code, tested architecture, and open on GitHub.

Here is the tour.

## Starter kits

### KoamiStarterKit

An opinionated modern Laravel 12 starter kit with Vue 3, Inertia.js, Tailwind CSS 4, Fortify authentication, Wayfinder routing, Octane, Pest tests, and automated CI/CD workflows.

`MIT` · [GitHub](https://github.com/koamishin/KoamiStarterKit) · [Docs](https://github.com/koamishin/KoamiStarterKit#readme)

## Platforms & ERP

### koakademy

Opinionated academic management platform for student lifecycles — enrollment, billing, scheduling, and admin tools with configurable branding and PWA support.

`AGPL-3.0` · [GitHub](https://github.com/koamishin/koakademy)

### konexus

Enterprise-grade School Management Information System (SMIS) designed for multi-department governance, student rosters, academic reporting, and role permissions.

`MIT` · [GitHub](https://github.com/koamishin/konexus)

### KoaScholarships

Comprehensive educational scholarship management portal for applicants and administrators, featuring automated fund budgeting, review stages, and document verification.

`MIT` · [GitHub](https://github.com/koamishin/KoaScholarships)

### konbi

Modern Convenience Store Management System built for multi-store retail scalability, live stock tracking, centralized inventory control, and cashier checkout.

`MIT` · [GitHub](https://github.com/koamishin/konbi)

## Tools & SaaS

### Koattendance

Workforce time-tracking and attendance management platform for institutions with shift schedule configuration, biometric punch-in hooks, and audit logs.

`MIT` · [GitHub](https://github.com/koamishin/Koattendance)

### koment

Event management and esports tournament platform with automated bracket trees, team rosters, real-time match dashboards, and tournament scheduling.

`MIT` · [GitHub](https://github.com/koamishin/koment)

## A pattern worth noticing

Look at the stack column across all seven and you will notice a house style:

| Concern | Our default |
| --- | --- |
| Frontend | Inertia.js with Vue 3 or React |
| Styling | Tailwind CSS 4 |
| Backend | Laravel 12/13 with Filament where an admin surface is needed |
| Runtime | Octane for long-lived workers |
| Quality | Pest tests plus CI/CD in the template |

Because the defaults are shared, moving between our systems is cheap. A developer who knows KoamiStarterKit already knows konexus, konexus already knows konbi. That is not an accident — it is the point of a collective rather than a portfolio of unrelated products.

## Forking etiquette

You can do whatever the license allows. Two practical notes:

- **MIT projects** (KoamiStarterKit, konexus, KoaScholarships, konbi, Koattendance, koment) — use commercially, modify privately, no obligation to publish.
- **AGPL-3.0** (koakademy) — if you run a modified version as a service, publish your modifications.

We keep licenses explicit so nobody has to email us to find out. If a license is unclear for your situation, ask — we would rather answer than have you guess.

Everything lives under the official [`@koamishin`](https://github.com/koamishin) organization. If a repository is missing from this list, it is either new or private, and the second one is rare.
