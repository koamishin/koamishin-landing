// Generates branded SVG cover art for each blog post.
// Run: node scripts/generate-covers.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'covers');

const covers = [
  {
    slug: 'laravel-artisans-working-in-the-open',
    kicker: 'The Collective',
    title: 'Laravel artisans,',
    accent: 'working in the open',
    from: '#3C4D3D',
    to: '#4F5E4E',
  },
  {
    slug: 'koamishin-quickstart-in-two-minutes',
    kicker: 'Developer Ergonomics',
    title: 'Up and running',
    accent: 'in under two minutes',
    from: '#4F5E4E',
    to: '#6D7767',
  },
  {
    slug: 'opensinop-agentic-finance-architecture',
    kicker: 'OpenSinop · Architecture',
    title: 'Preventing agentic',
    accent: 'financial drift',
    from: '#2E3B30',
    to: '#3C4D3D',
  },
  {
    slug: 'the-shelf-seven-open-source-laravel-systems',
    kicker: 'The Shelf',
    title: 'Seven open-source',
    accent: 'Laravel systems',
    from: '#6D7767',
    to: '#8C9282',
  },
  {
    slug: 'inside-the-collective-how-koamishin-works',
    kicker: 'The Collective',
    title: 'How Koamishin',
    accent: 'works',
    from: '#3C4D3D',
    to: '#5A6A59',
  },
  {
    slug: 'stories-what-happens-when-you-build-on-koamishin',
    kicker: 'Stories',
    title: 'Building on',
    accent: 'Koamishin',
    from: '#5A6A59',
    to: '#7A8474',
  },
  {
    slug: 'five-laravel-starter-kit-decisions',
    kicker: 'Engineering',
    title: 'Five starter kit',
    accent: 'decisions',
    from: '#304333',
    to: '#4F5E4E',
  },
];

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg({ kicker, title, accent, from, to }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.9">
      <stop offset="0%" stop-color="#C9A227" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#C9A227" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#F8EDDC" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- emblem mark -->
  <g transform="translate(88 88)">
    <path d="M0 26 L34 6 L34 44 Z" fill="#F8EDDC" fill-opacity="0.92"/>
    <path d="M44 26 L78 6 L56 26 L78 46 Z" fill="#F8EDDC" fill-opacity="0.92"/>
    <path d="M44 26 L78 46 L44 46 Z" fill="#F8EDDC" fill-opacity="0.55"/>
  </g>

  <text x="88" y="196" font-family="Spline Sans Mono, ui-monospace, monospace" font-size="19" letter-spacing="4.5" fill="#C9A227">${esc(kicker.toUpperCase())}</text>

  <text x="88" y="322" font-family="Bricolage Grotesque, Trebuchet MS, sans-serif" font-size="82" font-weight="800" letter-spacing="-2.5" fill="#FBF6EF">${esc(title)}</text>
  <text x="88" y="416" font-family="Bricolage Grotesque, Trebuchet MS, sans-serif" font-size="82" font-weight="800" letter-spacing="-2.5" fill="#C9A227">${esc(accent)}</text>

  <rect x="88" y="500" width="120" height="4" rx="2" fill="#C9A227"/>

  <text x="88" y="556" font-family="Spline Sans Mono, ui-monospace, monospace" font-size="17" letter-spacing="3.5" fill="#F8EDDC" fill-opacity="0.62">KOAMISHIN COLLECTIVE</text>
</svg>
`;
}

await mkdir(outDir, { recursive: true });

for (const cover of covers) {
  await writeFile(join(outDir, `${cover.slug}.svg`), svg(cover), 'utf8');
  console.log('wrote', `${cover.slug}.svg`);
}
