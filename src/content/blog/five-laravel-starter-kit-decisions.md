---
title: 'Five Laravel starter kit decisions that pay for themselves'
description: 'Wayfinder, Octane, Fortify, Pest, and CI templates — the choices baked into KoamiStarterKit, and the cost of not making them.'
pubDate: 2026-09-28
author: 'Louis'
tags: ['laravel', 'starter-kits', 'engineering']
cover: '/covers/five-laravel-starter-kit-decisions.svg'
---

A starter kit is a set of decisions you make once so you never have to make them again. The value is not in what it contains — it is in what it prevents you from arguing about every six months.

These are the five decisions baked into KoamiStarterKit, and what each one costs you if you skip it.

## 1. Wayfinder instead of a routes file you maintain by hand

Wayfinder generates typed route helpers from your controllers. The URL surface cannot drift from the code, because there is no second copy of it to drift.

The cost of skipping it: a `routes/web.php` that grows to 400 lines, route names that get reused for different things, and the bug where a renamed controller breaks a cached view you forgot about.

```php
// Before — stringly typed, breaks silently
<a href="{{ route('students.show', $student->id) }}">View</a>

// After — generated, fails to compile if the route moves
<a href="{{ route('students.show', $student) }}">View</a>
```

## 2. Octane for the long-lived worker

Octane keeps the application booted and serves requests from a warm process. The first request is not the slow one, and traffic spikes do not pay a boot cost per request.

The cost of skipping it: your p95 latency is a function of framework boot, and your concurrency story is "how many PHP-FPM workers can we afford".

## 3. Fortify for authentication

Auth is the classic place for bespoke to become a liability. Fortify gives you login, two-factor, password confirmation, and profile management with sensible defaults — and it is Laravel's own maintained solution, so it is not abandoned when your team moves on.

The cost of skipping it: a hand-rolled password reset flow that is missing rate limiting, and session handling you have to audit yourself.

## 4. Pest for tests

Pest reads like a list of behaviors rather than a stack of class methods. The win is not philosophical — it is that a new contributor writes a test in the first ten minutes instead of the first hour.

```php
it('routes invoices over the cap to review', function () {
    expect($this->invoice->amount)->toBeGreaterThan(50.00);
    expect($this->invoice->result)->toBe(PolicyResult::escalate('EXCEEDS_INSTANT_CAP'));
});
```

## 5. CI/CD in the template, not in a wiki page

`composer test` and `composer run ci` work the moment you clone. There is no setup step to forget, no secret to add before the pipeline goes green, and no day where a new hire wonders why CI is broken for them and not for anyone else.

The cost of skipping it: the pipeline lives in one engineer's browser history, and the first person to leave is also the person who owned the deploy.

## None of this is exotic

That is the point. None of these are fashionable choices; they are boring, well-maintained, and correct. We spend our novelty budget on the problems that are actually ours — institutional finance orchestration, multi-department governance, and the rest of the catalog — and we spend your setup budget on making these five decisions for you.

Clone it, run it, and read the diff:

```bash
git clone https://github.com/koamishin/KoamiStarterKit.git my-app
cd my-app && composer install && cp .env.example .env && php artisan key:generate
```

The full sequence is in the [quickstart guide](/blog/koamishin-quickstart-in-two-minutes/), and the reasoning behind the collective is in [Laravel artisans, working in the open](/blog/laravel-artisans-working-in-the-open/).
