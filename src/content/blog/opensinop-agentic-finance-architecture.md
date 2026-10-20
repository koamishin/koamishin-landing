---
title: 'How OpenSinop prevents agentic financial drift'
description: 'The three-stage architecture behind our Circle Agent × Arc entry: read-only AI scanning, a deterministic PHP policy gate, and on-chain USDC settlement.'
pubDate: 2026-10-15
author: 'Ortiz'
tags: ['opensinop', 'ai', 'blockchain', 'architecture']
cover: '/covers/opensinop-agentic-finance-architecture.svg'
showcase: 'opensinop'
---

OpenSinop demonstrates how autonomous agents and institutional treasury operations can safely converge. Built for college finance departments, it introduces a deterministic policy layer where AI analyzes invoices and drafts recommendations, while cryptographic settlement on Arc testnet is strictly bound by hard rules and human-in-the-loop safety gates.

The whole system is three stages. The interactive deep-dive at the bottom of this post walks through each one with the actual proposal schema, policy code, and settlement receipt.

## Stage 01 — Ingestion & analysis: the agent proposes, never signs

When an invoice arrives (PDF or JSON), an autonomous LLM agent parses line items, tax numbers, and checks for duplicate billings. The AI is structurally isolated: it can only compose a draft disbursement proposal and cannot access private keys or move funds.

```json
{
  "vendor_id": "lab_supplies_co",
  "department": "BIO_CHEMISTRY",
  "invoice_amount_usdc": 45.00,
  "confidence_score": 0.98,
  "ai_recommendation": "AUTO_APPROVE",
  "risk_assessment": "LOW_HISTORIC_MATCH"
}
```

- **Input** — vendor invoice, department code, PO number
- **Boundary** — strict read-only JSON schema, zero chain permissions

The important detail is the schema, not the model. Whatever the LLM does, it can only ever produce a document of this shape. There is no key material anywhere in its context.

## Stage 02 — The deterministic gate: hard-coded PHP policy checks

The draft proposal is evaluated by a strictly typed PHP rule pipeline. If an invoice exceeds the department threshold (≤ 50.00 USDC for instant release) or triggers compliance rules, execution halts for human multi-sign review.

```php
// Strict typed verification in plain PHP
if ($invoice->amount > $policy->autoApproveMax) {
    return PolicyResult::escalate('EXCEEDS_INSTANT_CAP');
}

if ($department->remainingMonthlyBudget < $invoice->amount) {
    return PolicyResult::hold('TREASURY_RESERVE_SAFETY');
}

return PolicyResult::approved('VENDOR_AUTO_PAYMENT_V1');
```

- **Rule pipeline** — department budget cap, velocity check, compliance gate
- **Escalation policy** — amounts > 50.00 USDC route to the Dean/Finance Lead dashboard

This is the stage that makes the rest safe. No model, no agent, no API call sits between a proposal and a decision. The rules are readable, testable, and boring in the way compliance code should be.

## Stage 03 — Execution & audit: cryptographic settlement on Arc

Once cleared, OpenSinop calls the Circle Developer-Controlled Agent Wallet via the Lepton SDK. The transfer signs, executes on Arc testnet in native 6-decimal USDC, and records cryptographic receipts in both immutable audit logs and the departmental ledger.

```json
{
  "network": "arc_testnet",
  "token": "USDC (6 Decimals)",
  "amount_raw": "45000000",
  "recipient_wallet": "0x742d35Cc6634C0532925a3B844Bc454E4438f44E",
  "tx_hash": "0x3f8a91bc9e...7c24a1",
  "status": "SETTLED_FINAL"
}
```

- **Execution gateway** — Circle Agent Wallet via Lepton SDK
- **Network** — Arc testnet with on-chain finality and transaction receipts

## What the simulation shows

`php artisan app:demo` runs a full cycle against the rule engine:

```text
Cycle: auto-paid 3, escalated 2, held 1, disbursed 85 USDC.
```

- 30.00 and 45.00 USDC vendor invoices → `AUTO_APPROVE` under `VENDOR_AUTO_PAYMENT_V1`
- 60.00 and 90.00 USDC → `ESCALATE` for compliance or high-value review
- 200.00 USDC → `HOLD` under `TREASURY_RESERVE_SAFETY_V1`
- 15.00 USDC emergency aid → `PARTIAL_APPROVAL`, splitting 10.00 instant and 5.00 escalated

## The three pillars

1. **Deterministic safety layer** — the LLM never moves money. Policy checks execute in plain typed PHP; AI only drafts proposals and explains decisions.
2. **Circle Agent Wallets & Arc** — autonomous agent gateways via Lepton, executing verified USDC mirror settlements with on-chain finality tracking.
3. **College shadow pilot ready** — engineered for real departmental budgets, vendor invoice auditing, and dual-lane automated execution.

## Where this goes next

The live deployment is public at [opensinop.koamishin.com](https://opensinop.koamishin.com/) and the source is on [GitHub](https://github.com/koamishin/OpenSinop). The architecture spec is public too, so you can read exactly how the boundaries are drawn before you trust them with anything.

This is a hackathon entry, not a finished product. The interesting question is not "does the demo run" — it is whether a real finance department would accept this as their disbursement path. If you work in one, we would like to hear from you.
