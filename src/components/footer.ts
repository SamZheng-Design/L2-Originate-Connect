// ═══════════════════════════════════════════════════════
// Footer — Aurora 深色背景简化版
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'

export function renderFooter(lang: Lang): string {
  return `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
          <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
          <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
        </svg>
        <span class="footer-brand-text">
          <span style="font-family: var(--font-brand); font-weight: 800; font-size: 13px; color: #fff; letter-spacing: 0.5px;">
            ${tt(TEXT.brandName, lang)}
          </span>
          <span style="font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px;">
            ${tt(TEXT.appName, lang)} · Originate Connect
          </span>
        </span>
      </div>
      <div class="footer-links">
        <a href="#">${tt(TEXT.privacy, lang)}</a>
        <a href="#">${tt(TEXT.terms, lang)}</a>
        <a href="#">${tt(TEXT.backToMain, lang)}</a>
      </div>
      <div class="footer-copyright">
        ${tt(TEXT.copyright, lang)}
      </div>
    </div>
  </footer>
  `
}

export const footerCSS = `
.footer {
  background: var(--gradient-aurora);
  padding: 48px 0 32px;
  margin-top: 80px;
}
.footer-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.footer-brand {
  display: flex; align-items: center; gap: 10px;
}
.footer-brand-text {
  display: flex; flex-direction: column;
}
.footer-links {
  display: flex; gap: 24px;
}
.footer-links a {
  font-size: 13px; color: rgba(255,255,255,0.5);
  text-decoration: none; transition: color var(--duration-fast);
}
.footer-links a:hover { color: var(--brand-light); }
.footer-copyright {
  font-size: 12px; color: rgba(255,255,255,0.35);
}
`
