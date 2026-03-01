// ═══════════════════════════════════════════════════════
// Navbar — 独立应用简化版
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'

export function renderNavbar(lang: Lang): string {
  const otherLang = lang === 'zh' ? 'en' : 'zh'
  const langLabel = lang === 'zh' ? 'EN' : '中文'

  return `
  <nav class="navbar" id="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a href="/${lang === 'en' ? '?lang=en' : ''}" class="navbar-brand">
          <!-- Micro Connect Logo SVG (双圆叠合) -->
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
            <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
            <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
          </svg>
          <span class="navbar-brand-text">
            <span class="brand-mc">${tt(TEXT.brandName, lang)}</span>
          </span>
        </a>
      </div>
      <div class="navbar-center">
        <span class="navbar-app-name">
          <i class="fas fa-upload" style="color: var(--oc-dark); margin-right: 6px;"></i>
          ${tt(TEXT.appName, lang)}
          <span class="navbar-app-sub">Originate Connect</span>
        </span>
      </div>
      <div class="navbar-right">
        <a href="?lang=${otherLang}" class="btn btn-ghost btn-sm navbar-lang-btn">${langLabel}</a>
        <a href="#" class="btn btn-sm" style="background: var(--gradient-primary); color: #fff;">
          <i class="fas fa-arrow-left" style="font-size: 11px;"></i>
          ${tt(TEXT.backToMain, lang)}
        </a>
      </div>
    </div>
  </nav>
  `
}

export const navbarCSS = `
.navbar {
  position: sticky; top: 0; z-index: 50;
  height: 56px;
  background: var(--bg-navbar);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 0.5px solid var(--border-default);
  transition: box-shadow var(--duration-normal) var(--ease-spring);
}
.navbar.scrolled { box-shadow: var(--shadow-sm); }
.navbar-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  height: 100%; display: flex; align-items: center; justify-content: space-between;
}
.navbar-left { display: flex; align-items: center; }
.navbar-brand {
  display: flex; align-items: center; gap: 10px; text-decoration: none;
}
.navbar-brand-text { display: flex; flex-direction: column; line-height: 1.2; }
.brand-mc {
  font-family: var(--font-brand); font-size: 14px; font-weight: 800;
  letter-spacing: 0.5px; color: var(--text-primary);
}
.navbar-center { display: flex; align-items: center; }
.navbar-app-name {
  font-size: 15px; font-weight: 700; color: var(--text-primary);
  display: flex; align-items: center; gap: 6px;
}
.navbar-app-sub {
  font-size: 12px; font-weight: 500; color: var(--text-tertiary);
  margin-left: 4px;
}
.navbar-right { display: flex; align-items: center; gap: 8px; }
.navbar-lang-btn {
  font-size: 13px; font-weight: 600; padding: 6px 12px;
  border: 1px solid var(--border-input) !important; border-radius: var(--radius-full);
}

@media (max-width: 768px) {
  .navbar-center { display: none; }
  .navbar-app-sub { display: none; }
  .brand-mc { font-size: 12px; }
}
`
