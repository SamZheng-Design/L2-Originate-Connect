// ═══════════════════════════════════════════════════════
// 页面 1: 项目列表页（主页） — Placeholder
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { renderLayout } from '../components/layout'
import { tt, TEXT } from '../i18n'

export function renderHomePage(lang: Lang): string {
  const body = `
  <main class="container" style="padding-top: 32px; padding-bottom: 60px; min-height: 60vh;">
    <div style="text-align: center; padding: 80px 0;">
      <i class="fas fa-upload" style="font-size: 48px; color: var(--oc-dark); margin-bottom: 16px;"></i>
      <h1 style="font-size: 28px; font-weight: 800; color: var(--text-title); margin-bottom: 8px;">
        ${tt(TEXT.heroTitle, lang)}
      </h1>
      <p style="color: var(--text-secondary); font-size: 15px;">
        ${tt(TEXT.heroSubtitle, lang)}
      </p>
      <p style="color: var(--text-tertiary); font-size: 13px; margin-top: 12px;">
        Phase 1 Complete — Layout / Design System / Components Ready
      </p>
    </div>
  </main>
  `
  return renderLayout(lang, tt(TEXT.heroTitle, lang), body)
}
