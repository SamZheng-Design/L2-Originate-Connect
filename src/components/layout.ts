// ═══════════════════════════════════════════════════════
// HTML Layout — v33 对齐版：含开屏动画
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'
import { designTokensCSS } from '../design-tokens'
import { renderNavbar, navbarCSS } from './navbar'
import { renderFooter, footerCSS } from './footer'
import { renderToast, toastCSS, toastScript } from './toast'
import { renderModal, modalCSS, modalScript } from './modal'

// v33 splash / loading screen HTML
function renderSplashScreen(lang: Lang): string {
  return `
  <div id="app-loading">
    <div class="loading-logo">
      <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
        <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
        <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
        <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
      </svg>
    </div>
    <div class="loading-spinner"></div>
    <div class="loading-text">${tt(TEXT.appName, lang)}</div>
    <div class="loading-sub">Originate Connect</div>
  </div>
  `
}

// v33 splash / loading screen CSS
const splashCSS = `
#app-loading {
  position: fixed; inset: 0;
  background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 25%, #0c3530 50%, #164e47 75%, #1a6b5f 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  z-index: 9999;
  transition: opacity 0.6s cubic-bezier(0.28, 0.11, 0.32, 1), visibility 0.6s;
}
#app-loading::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(46, 196, 182, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(40, 166, 150, 0.2) 0%, transparent 50%);
  pointer-events: none;
}
#app-loading::after {
  content: '';
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(93, 196, 179, 0.4) 0, transparent 2px),
    radial-gradient(circle at 50% 70%, rgba(73, 168, 154, 0.35) 0, transparent 2px),
    radial-gradient(circle at 70% 20%, rgba(50, 173, 230, 0.3) 0, transparent 2px),
    radial-gradient(circle at 85% 55%, rgba(52, 199, 89, 0.25) 0, transparent 2px),
    radial-gradient(circle at 15% 80%, rgba(255, 55, 95, 0.2) 0, transparent 2px),
    radial-gradient(circle at 90% 40%, rgba(93, 196, 179, 0.3) 0, transparent 2px);
  pointer-events: none;
  animation: particleFloat 25s linear infinite;
}
@keyframes particleFloat {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-16px); opacity: 0.85; }
}
#app-loading.fade-out {
  opacity: 0; visibility: hidden; pointer-events: none;
}
.loading-logo {
  position: relative; z-index: 1;
  margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.loading-spinner {
  position: relative; z-index: 1;
  width: 48px; height: 48px;
  border: 2.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text {
  position: relative; z-index: 1;
  color: white; font-size: 22px; font-weight: 700;
  margin-top: 24px; letter-spacing: -0.025em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  font-family: var(--font-brand, 'Montserrat', sans-serif);
}
.loading-sub {
  position: relative; z-index: 1;
  color: rgba(255, 255, 255, 0.5); font-size: 13px;
  margin-top: 8px; font-weight: 500;
  letter-spacing: 1px;
}
`

// Splash dismiss script
const splashScript = `
  // Dismiss splash screen after page load
  window.addEventListener('load', function() {
    setTimeout(function() {
      var splash = document.getElementById('app-loading');
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(function() { splash.remove(); }, 600);
      }
    }, 800);
  });
`

export function renderLayout(lang: Lang, title: string, body: string, extraCSS: string = '', extraScript: string = ''): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${tt(TEXT.appName, lang)} | ${tt(TEXT.brandName, lang)}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='20' r='12' fill='%232EC4B6' opacity='.85'/%3E%3Ccircle cx='24' cy='20' r='12' fill='%233DD8CA' opacity='.85'/%3E%3C/svg%3E">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    ${designTokensCSS}
    ${splashCSS}
    ${navbarCSS}
    ${footerCSS}
    ${toastCSS}
    ${modalCSS}
    ${extraCSS}
  </style>
</head>
<body>
  ${renderSplashScreen(lang)}
  ${renderNavbar(lang)}
  ${body}
  ${renderFooter(lang)}
  ${renderToast()}
  ${renderModal()}

  <script>
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const nav = document.getElementById('navbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Current lang for JS use
    const LANG = '${lang}';

    ${splashScript}
    ${toastScript}
    ${modalScript}
    ${extraScript}
  </script>
</body>
</html>`
}
