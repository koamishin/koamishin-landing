import { useState } from 'react';

interface DemoRow {
  type: string;
  amount: string;
  status: string;
  rule: string;
  tone: 'pass' | 'warn' | 'hold' | 'aid';
}

const demoRows: DemoRow[] = [
  { type: 'Invoice', amount: '30.00 USDC', status: 'AUTO_APPROVE', rule: 'VENDOR_AUTO_PAYMENT_V1', tone: 'pass' },
  { type: 'Invoice', amount: '45.00 USDC', status: 'AUTO_APPROVE', rule: 'VENDOR_AUTO_PAYMENT_V1', tone: 'pass' },
  { type: 'Invoice', amount: '60.00 USDC', status: 'ESCALATE', rule: 'VENDOR_COMPLIANCE_V1', tone: 'warn' },
  { type: 'Invoice', amount: '90.00 USDC', status: 'ESCALATE', rule: 'HIGH_VALUE_DISBURSEMENT_V1', tone: 'warn' },
  { type: 'Invoice', amount: '200.00 USDC', status: 'HOLD', rule: 'TREASURY_RESERVE_SAFETY_V1', tone: 'hold' },
  { type: 'Aid', amount: '15.00 USDC', status: 'PARTIAL_APPROVAL', rule: 'BOUNDED_EMERGENCY_AID_V1', tone: 'aid' },
];

interface Stage {
  id: string;
  num: string;
  title: string;
  short: string;
  tag: string;
  tagTone: 'ai' | 'php' | 'chain';
  heading: string;
  body: string;
  specs: { label: string; value: string }[];
  codeLabel: string;
  codeBadge: string;
  codeBadgeTone: 'draft' | 'gate' | 'chain';
  code: string;
}

const stages: Stage[] = [
  {
    id: 'stage-1',
    num: '01',
    title: 'Ingestion & AI Scan',
    short: 'AI Scan',
    tag: 'Agent Draft (Read-Only)',
    tagTone: 'ai',
    heading: 'Agent Proposes, Never Signs',
    body:
      'When an invoice arrives (PDF or JSON), an autonomous LLM agent parses line items, tax numbers, and checks for duplicate billings. The AI is structurally isolated: it can only compose a draft disbursement proposal and cannot access private keys or move funds.',
    specs: [
      { label: 'Input', value: 'Vendor Invoice, Department Code, PO Number' },
      { label: 'Boundary', value: 'Strict read-only JSON schema; zero chain permissions' },
    ],
    codeLabel: 'Proposal Schema (Draft Only)',
    codeBadge: 'READ_ONLY',
    codeBadgeTone: 'draft',
    code: `{
  "vendor_id": "lab_supplies_co",
  "department": "BIO_CHEMISTRY",
  "invoice_amount_usdc": 45.00,
  "confidence_score": 0.98,
  "ai_recommendation": "AUTO_APPROVE",
  "risk_assessment": "LOW_HISTORIC_MATCH"
}`,
  },
  {
    id: 'stage-2',
    num: '02',
    title: 'Deterministic Policy Gate',
    short: 'Policy Gate',
    tag: 'Strict PHP Rules Engine',
    tagTone: 'php',
    heading: 'Hard-Coded PHP Policy Checks',
    body:
      'The draft proposal is evaluated by a strictly typed PHP rule pipeline. If an invoice exceeds the department threshold (≤ 50.00 USDC for instant release) or triggers compliance rules, execution immediately halts for human multi-sign review.',
    specs: [
      { label: 'Rule Pipeline', value: 'Department Budget Cap, Velocity Check, Compliance Gate' },
      { label: 'Escalation Policy', value: 'Amounts > 50.00 USDC route to Dean/Finance Lead Dashboard' },
    ],
    codeLabel: 'Laravel Policy Rule Engine',
    codeBadge: 'DETERMINISTIC_PASS',
    codeBadgeTone: 'gate',
    code: `// Strict typed verification in plain PHP
if ($invoice->amount > $policy->autoApproveMax) {
    return PolicyResult::escalate('EXCEEDS_INSTANT_CAP');
}

if ($department->remainingMonthlyBudget < $invoice->amount) {
    return PolicyResult::hold('TREASURY_RESERVE_SAFETY');
}

return PolicyResult::approved('VENDOR_AUTO_PAYMENT_V1');`,
  },
  {
    id: 'stage-3',
    num: '03',
    title: 'Arc & Circle Settlement',
    short: 'Arc Settle',
    tag: 'USDC Testnet Execution',
    tagTone: 'chain',
    heading: 'Cryptographic Settlement on Arc',
    body:
      'Once cleared, OpenSinop calls the Circle Developer-Controlled Agent Wallet via the Lepton SDK. The transfer signs, executes on Arc testnet in native 6-decimal USDC, and records cryptographic receipts in both immutable audit logs and the departmental ledger.',
    specs: [
      { label: 'Execution Gateway', value: 'Circle Agent Wallet via Lepton SDK' },
      { label: 'Network', value: 'Arc Testnet with on-chain finality & tx receipts' },
    ],
    codeLabel: 'Arc Settlement Receipt',
    codeBadge: 'ON_CHAIN_CONFIRMED',
    codeBadgeTone: 'chain',
    code: `{
  "network": "arc_testnet",
  "token": "USDC (6 Decimals)",
  "amount_raw": "45000000",
  "recipient_wallet": "0x742d35Cc6634C0532925a3B844Bc454E4438f44E",
  "tx_hash": "0x3f8a91bc9e...7c24a1",
  "status": "SETTLED_FINAL"
}`,
  },
];

const pillars = [
  {
    num: '01',
    title: 'Deterministic Safety Layer',
    body: 'The LLM never moves money. Policy checks execute in plain typed PHP; AI only drafts proposals and explains decisions.',
  },
  {
    num: '02',
    title: 'Circle Agent Wallets & Arc',
    body: 'Autonomous agent gateways via Lepton, executing verified USDC mirror settlements with on-chain finality tracking.',
  },
  {
    num: '03',
    title: 'College Shadow Pilot Ready',
    body: 'Engineered for real departmental budgets, vendor invoice auditing, and dual-lane automated execution.',
  },
];

const stack = ['Circle Agent', 'Arc Testnet', 'Laravel 13', 'React 19', 'Inertia.js', 'Filament', 'Octane'];

export default function OpenSinopShowcase() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  return (
    <div className="osp">
      {/* Terminal demonstration */}
      <div className="osp-terminal">
        <div className="osp-terminal-bar">
          <span className="osp-dots" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span className="osp-terminal-title">php artisan app:demo</span>
        </div>

        <div className="osp-terminal-body">
          <p className="osp-line dim">$ php artisan app:demo</p>
          <p className="osp-line summary">Cycle: auto-paid 3, escalated 2, held 1, disbursed 85 USDC.</p>

          {demoRows.map((row) => (
            <div className={`osp-row tone-${row.tone}`} key={`${row.type}-${row.amount}`}>
              <span className="osp-type">{row.type}</span>
              <span className="osp-amount">{row.amount}</span>
              <span className="osp-status">{row.status}</span>
              <span className="osp-rule">{row.rule}</span>
            </div>
          ))}

          <p className="osp-note">↳ 10.00 USDC approved instantly, 5.00 USDC escalated for review.</p>

          <div className="osp-chain">
            <span className="osp-chain-tag">CHAIN</span>
            <span className="osp-chain-info">Arc Testnet · Circle Agent Wallet 0x8a1...f4e</span>
          </div>
        </div>
      </div>

      {/* Verification stats */}
      <div className="osp-stats">
        <div className="osp-stat">
          <span className="osp-stat-num">100%</span>
          <span className="osp-stat-label">Deterministic Control</span>
        </div>
        <span className="osp-stat-sep" aria-hidden="true" />
        <div className="osp-stat">
          <span className="osp-stat-num">6 Dec</span>
          <span className="osp-stat-label">Exact USDC Math</span>
        </div>
        <span className="osp-stat-sep" aria-hidden="true" />
        <div className="osp-stat">
          <span className="osp-stat-num">Arc</span>
          <span className="osp-stat-label">On-chain Verification</span>
        </div>
      </div>

      {/* Interactive architecture stepper */}
      <div className="osp-arch">
        <div className="osp-arch-head">
          <span className="osp-arch-pill">Architecture Deep-Dive</span>
          <h4 className="osp-arch-title">How OpenSinop Prevents Agentic Financial Drift</h4>
          <p className="osp-arch-sub">
            Click each stage to trace the bounded transaction lifecycle from invoice receipt to
            on-chain Arc testnet settlement.
          </p>
        </div>

        <div className="osp-steps" role="tablist" aria-label="Architecture stages">
          {stages.map((item, index) => (
            <div className="osp-step-wrap" key={item.id}>
              {index > 0 && <span className="osp-step-connector" aria-hidden="true" />}
              <button
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={activeStage === index}
                aria-controls={`panel-${item.id}`}
                className={`osp-step ${activeStage === index ? 'active' : ''}`}
                onClick={() => setActiveStage(index)}
              >
                <span className="osp-step-num">{item.num}</span>
                <span className="osp-step-meta">
                  <span className="osp-step-title">
                    <span className="title-full">{item.title}</span>
                    <span className="title-short">{item.short}</span>
                  </span>
                  <span className={`osp-step-tag tone-${item.tagTone}`}>{item.tag}</span>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div
          className="osp-stage-panel"
          role="tabpanel"
          id={`panel-${stage.id}`}
          aria-labelledby={`tab-${stage.id}`}
          key={stage.id}
        >
          <div className="osp-stage-grid">
            <div className="osp-stage-info">
              <span className="osp-stage-badge">Stage {stage.num} · {stage.title}</span>
              <h5>{stage.heading}</h5>
              <p>{stage.body}</p>
              <div className="osp-stage-specs">
                {stage.specs.map((spec) => (
                  <div className="osp-spec" key={spec.label}>
                    <b>{spec.label}</b>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="osp-stage-code">
              <div className="osp-stage-code-bar">
                <span>{stage.codeLabel}</span>
                <span className={`osp-code-badge tone-${stage.codeBadgeTone}`}>{stage.codeBadge}</span>
              </div>
              <pre>
                <code>{stage.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="osp-pillars">
        {pillars.map((pillar) => (
          <div className="osp-pillar" key={pillar.num}>
            <span className="osp-pillar-num">{pillar.num}</span>
            <div>
              <b>{pillar.title}</b>
              <span>{pillar.body}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stack + actions */}
      <div className="osp-stack">
        {stack.map((item) => (
          <span className="osp-pill" key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="osp-actions">
        <a className="btn btn-primary" href="https://opensinop.koamishin.com/" target="_blank" rel="noopener">
          Launch Live App ↗
        </a>
        <a className="btn btn-ghost" href="https://github.com/koamishin/OpenSinop" target="_blank" rel="noopener">
          Explore on GitHub →
        </a>
        <a
          className="btn btn-ghost"
          href="https://github.com/koamishin/OpenSinop/blob/main/PLAN.md"
          target="_blank"
          rel="noopener"
        >
          Architecture Spec ↗
        </a>
      </div>
    </div>
  );
}
