// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 主题CSS生成器
// 根据 DeckTheme 动态生成完整的幻灯片样式
// ═══════════════════════════════════════════════════════

import type { DeckTheme } from './types'

export function generateThemeCSS(theme: DeckTheme): string {
  const c = theme.colors
  const f = theme.fonts
  const l = theme.layout

  // Card style
  const cardStyles = {
    flat: `background: ${c.surface}; border: none;`,
    elevated: `background: ${c.surface}; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 24px -4px rgba(0,0,0,0.1);`,
    outlined: `background: transparent; border: 1px solid ${c.textSecondary}30;`,
    glass: `background: ${c.surface}20; backdrop-filter: blur(20px) saturate(180%); border: 1px solid ${c.textSecondary}20;`,
  }
  const cardCSS = cardStyles[l.cardStyle]

  // Determine if dark
  const isDark = c.background.startsWith('#0') || c.background.startsWith('#1') || c.background === '#000000'

  return `
/* ═══ Theme: ${theme.id} ═══ */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;600;700&family=Playfair+Display:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --s-primary: ${c.primary};
  --s-secondary: ${c.secondary};
  --s-accent: ${c.accent};
  --s-bg: ${c.background};
  --s-surface: ${c.surface};
  --s-text: ${c.text};
  --s-text2: ${c.textSecondary};
  --s-text-on-primary: ${c.textOnPrimary};
  --s-grad-start: ${c.gradientStart};
  --s-grad-end: ${c.gradientEnd};
  --s-radius: ${l.borderRadius};
  --s-font-heading: ${f.heading};
  --s-font-body: ${f.body};
  --s-font-accent: ${f.accent};
  --s-font-mono: ${f.mono};
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; font-family: var(--s-font-body); background: #111; color: var(--s-text); overflow: hidden; }
body { display: flex; flex-direction: column; }

/* ══ Slide base ══ */
.slide {
  width: 100%; border-radius: var(--s-radius); background: var(--s-bg);
  overflow: hidden; display: flex; flex-direction: column; position: relative;
  ${isDark ? '' : `box-shadow: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);`}
}

/* ══ Header ══ */
.s-header {
  padding: 28px 40px 0; flex-shrink: 0;
  ${l.headerStyle === 'center' ? 'text-align: center;' : ''}
}
.s-header-minimal { padding: 24px 40px 0; }
.s-header-minimal .s-title { font-size: 16px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; }
.s-title {
  font-family: var(--s-font-heading); font-size: 24px; font-weight: 800;
  color: var(--s-text); line-height: 1.3; margin-bottom: 4px;
}
.s-headline {
  font-size: 14px; color: var(--s-text2); line-height: 1.5; max-width: 600px;
  ${l.headerStyle === 'center' ? 'margin: 4px auto 0;' : ''}
}

/* ══ Body ══ */
.s-body { flex: 1; padding: 20px 40px 28px; overflow: auto; display: flex; flex-direction: column; justify-content: center; }

/* ══ Watermark ══ */
.s-watermark {
  position: absolute; bottom: 12px; right: 20px;
  font-size: 10px; font-weight: 600; color: ${c.textSecondary}50;
  font-family: var(--s-font-mono);
}

/* ═══ Cover Slide ═══ */
.s-cover {
  position: relative; flex: 1; display: flex; align-items: center; justify-content: center;
}
.s-cover-bg {
  position: absolute; inset: 0; z-index: 0;
}
.s-cover-gradient .s-cover-bg {
  background: linear-gradient(135deg, var(--s-grad-start) 0%, var(--s-grad-end) 100%);
}
.s-cover-gradient .s-cover-bg::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 70% 30%, ${c.primary}25 0%, transparent 50%),
              radial-gradient(circle at 30% 70%, ${c.accent}15 0%, transparent 50%);
}
.s-cover-bold .s-cover-bg {
  background: var(--s-primary);
}
.s-cover-minimal .s-cover-bg { background: var(--s-bg); }
.s-cover-split .s-cover-bg {
  background: linear-gradient(90deg, var(--s-grad-start) 0%, var(--s-grad-start) 45%, var(--s-bg) 45%);
}
.s-cover-split .s-cover-content { color: #fff; }
.s-cover-split .s-cover-title { color: #fff; }
.s-cover-split .s-cover-tagline { color: rgba(255,255,255,0.7); }

.s-cover-content {
  position: relative; z-index: 1; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  padding: 40px; max-width: 600px;
}
.s-cover-icon {
  width: 72px; height: 72px; border-radius: ${parseInt(l.borderRadius) > 8 ? '20px' : '12px'};
  background: ${c.accent}20; border: 1px solid ${c.accent}40;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; color: var(--s-primary);
}
.s-cover-title {
  font-family: var(--s-font-heading); font-size: 40px; font-weight: 900;
  color: ${isDark ? '#fff' : c.text}; line-height: 1.2;
}
.s-cover-minimal .s-cover-title { font-size: 48px; font-weight: 300; }
.s-cover-bold .s-cover-title { color: var(--s-text-on-primary); font-size: 44px; }
.s-cover-tagline {
  font-size: 16px; color: ${isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary};
  max-width: 480px; line-height: 1.6;
}
.s-cover-meta {
  display: flex; gap: 20px; font-size: 13px;
  color: ${isDark ? 'rgba(255,255,255,0.4)' : c.textSecondary};
}
.s-cover-meta i { margin-right: 4px; }
.s-cover-cta {
  margin-top: 16px; padding: 10px 28px; border-radius: 9999px;
  background: ${c.primary}; color: ${c.textOnPrimary}; font-weight: 700; font-size: 15px;
}

/* ═══ KPI Grid ═══ */
.s-kpi-grid { display: grid; gap: 14px; }
.s-kpi-cols-1 { grid-template-columns: 1fr; }
.s-kpi-cols-2 { grid-template-columns: 1fr 1fr; }
.s-kpi-cols-3 { grid-template-columns: 1fr 1fr 1fr; }
.s-kpi-card {
  padding: 18px; border-radius: var(--s-radius); ${cardCSS}
  display: flex; flex-direction: column; gap: 4px;
  transition: transform 0.2s ease;
}
.s-kpi-card:hover { transform: translateY(-2px); }
.s-kpi-icon { font-size: 18px; color: var(--s-primary); margin-bottom: 4px; }
.s-kpi-value { font-size: 20px; font-weight: 800; color: var(--s-text); font-family: var(--s-font-accent); }
.s-kpi-label { font-size: 12px; color: var(--s-text2); font-weight: 500; }
.s-kpi-change { font-size: 12px; font-weight: 700; font-family: var(--s-font-mono); }
.s-change-pos { color: #34c759; }
.s-change-neg { color: #ff375f; }
.s-kpi-desc { font-size: 11px; color: var(--s-text2); margin-top: 2px; }
.s-footnote { font-size: 12px; color: var(--s-text2); margin-top: 16px; text-align: center; font-style: italic; }

/* ═══ Chart ═══ */
.s-chart-container { display: flex; gap: 20px; flex: 1; align-items: stretch; }
.s-chart-layout-full { flex-direction: column; }
.s-chart-layout-full .s-chart-area { flex: 1; min-height: 200px; }
.s-chart-layout-split .s-chart-area { flex: 3; min-height: 180px; position: relative; }
.s-chart-layout-split .s-chart-kpis { flex: 2; display: flex; flex-direction: column; gap: 10px; justify-content: center; }
.s-chart-canvas { width: 100% !important; height: 100% !important; }
.s-chart-kpis .s-kpi-card { padding: 12px; }
.s-chart-kpis .s-kpi-value { font-size: 18px; }
.s-chart-summary { font-size: 13px; color: var(--s-text2); text-align: center; margin-top: 12px; padding: 8px 16px; border-radius: var(--s-radius); background: ${c.primary}10; }

/* ═══ Text Block ═══ */
.s-text-block { display: flex; flex-wrap: wrap; gap: 16px; }
.s-text-1col { flex-direction: column; }
.s-text-2col > .s-text-section { flex: 1; min-width: 200px; }
.s-text-3col > .s-text-section { flex: 1; min-width: 160px; }
.s-text-section {
  padding: 20px; border-radius: var(--s-radius); ${cardCSS}
}
.s-text-highlight {
  border-left: 4px solid var(--s-primary) !important;
  background: ${c.primary}08 !important;
}
.s-text-section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.s-text-icon { color: var(--s-primary); font-size: 16px; }
.s-text-section-title { font-size: 14px; font-weight: 700; color: var(--s-text); }
.s-text-section-body { font-size: 14px; line-height: 1.7; color: var(--s-text2); }

/* ═══ Comparison ═══ */
.s-comparison { border-radius: var(--s-radius); overflow: hidden; ${cardCSS} }
.s-comp-header, .s-comp-row { display: grid; grid-template-columns: 2fr 3fr 3fr; gap: 1px; }
.s-comp-header { font-weight: 700; font-size: 13px; background: var(--s-primary); color: var(--s-text-on-primary); }
.s-comp-header > div, .s-comp-row > div { padding: 10px 14px; }
.s-comp-row { font-size: 13px; border-bottom: 1px solid ${c.textSecondary}15; }
.s-comp-advantage .s-comp-us { color: var(--s-primary); font-weight: 600; }
.s-comp-dim { font-weight: 600; color: var(--s-text); }

/* ═══ Timeline ═══ */
.s-timeline { display: flex; flex-direction: column; gap: 0; padding-left: 20px; }
.s-timeline-item { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
.s-timeline-item::before {
  content: ''; position: absolute; left: 13px; top: 28px; bottom: 0; width: 2px;
  background: ${c.textSecondary}30;
}
.s-timeline-item:last-child::before { display: none; }
.s-timeline-dot {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; z-index: 1;
  background: ${c.surface}; border: 2px solid ${c.textSecondary}40; color: var(--s-text2);
}
.s-timeline-done .s-timeline-dot {
  background: var(--s-primary); border-color: var(--s-primary); color: var(--s-text-on-primary);
}
.s-timeline-content { flex: 1; }
.s-timeline-date { font-size: 12px; color: var(--s-primary); font-weight: 600; font-family: var(--s-font-mono); }
.s-timeline-title { font-size: 15px; font-weight: 700; color: var(--s-text); margin-top: 2px; }
.s-timeline-desc { font-size: 13px; color: var(--s-text2); margin-top: 4px; }

/* ═══ Team ═══ */
.s-team { display: flex; flex-direction: column; gap: 16px; }
.s-team-highlight {
  padding: 14px 20px; border-radius: var(--s-radius);
  background: ${c.primary}10; border-left: 4px solid var(--s-primary);
  font-size: 14px; color: var(--s-text); font-style: italic;
}
.s-team-highlight i { color: var(--s-primary); margin-right: 8px; }
.s-team-grid { display: flex; flex-wrap: wrap; gap: 14px; }
.s-team-member {
  flex: 1; min-width: 200px; display: flex; gap: 14px;
  padding: 16px; border-radius: var(--s-radius); ${cardCSS}
}
.s-team-avatar { font-size: 42px; color: var(--s-primary); flex-shrink: 0; }
.s-team-name { font-size: 16px; font-weight: 700; color: var(--s-text); }
.s-team-role { font-size: 12px; color: var(--s-primary); font-weight: 600; margin-top: 2px; }
.s-team-bg { font-size: 12px; color: var(--s-text2); margin-top: 6px; line-height: 1.5; }
.s-team-size { font-size: 13px; color: var(--s-text2); text-align: center; }

/* ═══ Financing Ask ═══ */
.s-financing { display: flex; flex-direction: column; gap: 20px; align-items: center; }
.s-financing-hero { text-align: center; }
.s-financing-amount {
  font-size: 52px; font-weight: 900; font-family: var(--s-font-accent);
  color: var(--s-primary); line-height: 1.1;
}
.s-financing-label { font-size: 14px; color: var(--s-text2); margin-top: 4px; }
.s-financing-details {
  display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; width: 100%;
}
.s-financing-detail {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; border-radius: var(--s-radius); ${cardCSS}
  font-size: 13px;
}
.s-financing-detail i { color: var(--s-primary); }
.s-fd-label { color: var(--s-text2); }
.s-fd-value { color: var(--s-text); font-weight: 700; }
.s-funds-chart { width: 100%; max-width: 480px; }
.s-funds-title { font-size: 14px; font-weight: 700; color: var(--s-text); margin-bottom: 12px; text-align: center; }
.s-funds-bars { display: flex; flex-direction: column; gap: 8px; }
.s-fund-item { display: flex; align-items: center; gap: 8px; }
.s-fund-label { font-size: 12px; color: var(--s-text2); min-width: 80px; text-align: right; }
.s-fund-bar-track { flex: 1; height: 20px; border-radius: 10px; background: ${c.textSecondary}15; overflow: hidden; }
.s-fund-bar-fill { height: 100%; border-radius: 10px; transition: width 0.8s ease; }
.s-fund-pct { font-size: 12px; font-weight: 700; color: var(--s-text); min-width: 36px; font-family: var(--s-font-mono); }

/* ═══ Quote ═══ */
.s-quote { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; }
.s-quote-icon { font-size: 28px; color: ${c.primary}40; margin-right: 8px; }
.s-quote-text { font-size: 22px; font-weight: 600; color: var(--s-text); line-height: 1.6; max-width: 500px; font-family: var(--s-font-heading); }
.s-quote-author { font-size: 14px; color: var(--s-text2); margin-top: 16px; }

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .s-header { padding: 20px 20px 0; }
  .s-body { padding: 16px 20px 20px; }
  .s-title { font-size: 20px; }
  .s-kpi-cols-3 { grid-template-columns: 1fr 1fr; }
  .s-chart-layout-split { flex-direction: column; }
  .s-cover-title { font-size: 28px; }
  .s-financing-amount { font-size: 36px; }
  .s-text-2col > .s-text-section, .s-text-3col > .s-text-section { flex-basis: 100%; }
  .s-team-member { min-width: 100%; }
}

/* ═══ Print ═══ */
@media print {
  .deck-toolbar, .deck-nav, .deck-thumbs, .deck-sidebar, #toast-container { display: none !important; }
  body { background: #fff; overflow: visible; }
  .deck-stage { padding: 0; }
  .slide { box-shadow: none; page-break-after: always; }
}
`
}
