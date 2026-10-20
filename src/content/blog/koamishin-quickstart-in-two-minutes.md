---
title: 'Koamishin quickstart in two minutes'
description: 'Clone any Koamishin system, install dependencies, migrate the database, and boot the app. The exact commands we run internally.'
pubDate: 2026-10-18
author: 'Koamishin Collective'
tags: ['tutorial', 'laravel', 'developer-ergonomics']
cover: '/covers/koamishin-quickstart-in-two-minutes.svg'
---

Every system built by the collective is pre-configured with strict types, CI/CD templates, and deterministic testing out of the box. That means the distance between "I have a laptop" and "I have a running app" is measured in minutes, not weekends.

Here is the exact sequence we use.

## KoamiStarterKit

The opinionated Laravel 12 starter kit with Vue 3, Inertia.js, Tailwind CSS 4, Fortify authentication, Wayfinder routing, Octane, Pest tests, and automated CI/CD workflows.

```bash
# 1. Clone the starter kit
git clone https://github.com/koamishin/KoamiStarterKit.git my-app
cd my-app

# 2. Install dependencies & configure env
composer install
cp .env.example .env
php artisan key:generate

# 3. Build front-end assets & start server
npm install
npm run build
php artisan serve
```

Prerequisites: PHP 8.2+, Composer 2+, Node 20+, MySQL 8+.

## OpenSinop

The bounded departmental finance engine — Circle Agent Wallets with Arc testnet settlement, built for college finance departments.

```bash
# 1. Clone the OpenSinop repository
git clone https://github.com/koamishin/OpenSinop.git
cd OpenSinop

# 2. Install backend and frontend dependencies
composer install
npm install && npm run build

# 3. Configure environment & database
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed

# 4. Verify toolchain & run autonomous agent simulation
php artisan lepton:doctor
php artisan app:demo
```

That last command is the part people enjoy. It runs a full billing cycle through the deterministic policy gate and prints what would have been paid, escalated, and held.

## konbi (Retail POS)

Multi-store inventory and cashier checkout, with centralized stock control.

```bash
git clone https://github.com/koamishin/konbi.git
cd konbi

composer install
npm install
cp .env.example .env
php artisan migrate

php artisan serve
```

Prerequisites: PHP 8.2+, Composer 2+, Node 18+, MySQL or MariaDB.

## Why it is this fast

Three decisions do most of the work:

- **Wayfinder instead of hand-written route files.** Routes are generated from the controller, so the URL surface can never drift from the code.
- **Octane by default.** The app boots as a long-lived worker, so the first request is not the slow one.
- **Pest and CI in the template.** `composer test` and `composer run ci` work the moment you clone, with no setup step to forget.

If a command above fails on a clean machine, that is a bug in our template — please [open an issue](https://github.com/koamishin) so we can fix it for everyone.
