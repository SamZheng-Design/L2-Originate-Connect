// ═══════════════════════════════════════════════════════
// Navbar — v33 对齐版：Apple风精致玻璃态
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
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
            <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
            <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
          </svg>
          <span class="navbar-brand-text">
            <span class="nav-brand">${tt(TEXT.brandName, lang)}</span>
          </span>
        </a>
      </div>
      <div class="navbar-center">
        <span class="navbar-app-name">
          <i class="fas fa-upload" style="font-size: 13px;"></i>
          <span class="text-gradient">${tt(TEXT.appName, lang)}</span>
          <span class="navbar-app-sub">Originate Connect</span>
        </span>
      </div>
      <div class="navbar-right">
        <a href="?lang=${otherLang}" class="btn btn-ghost btn-sm navbar-lang-btn">${langLabel}</a>
        <a href="#" class="btn btn-primary btn-sm">
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
  background: var(--glass-bg-solid);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 0.5px 0 rgba(0, 0, 0, 0.04);
  transition: all var(--duration-normal) var(--ease-apple);
}
.navbar:hover {
  box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
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
.nav-brand {
  font-family: var(--font-brand); font-size: 14px; font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
}
.navbar-center { display: flex; align-items: center; }
.navbar-app-name {
  font-size: 15px; font-weight: 700; color: var(--text-primary);
  display: flex; align-items: center; gap: 6px;
}
.navbar-app-name .text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
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
  .nav-brand { font-size: 12px; }
}
`
