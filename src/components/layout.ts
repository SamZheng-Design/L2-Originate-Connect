// ═══════════════════════════════════════════════════════
// HTML Layout — 公共页面骨架
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'
import { designTokensCSS } from '../design-tokens'
import { renderNavbar, navbarCSS } from './navbar'
import { renderFooter, footerCSS } from './footer'
import { renderToast, toastCSS, toastScript } from './toast'
import { renderModal, modalCSS, modalScript } from './modal'

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
    ${navbarCSS}
    ${footerCSS}
    ${toastCSS}
    ${modalCSS}
    ${extraCSS}
  </style>
</head>
<body>
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

    ${toastScript}
    ${modalScript}
    ${extraScript}
  </script>
</body>
</html>`
}
