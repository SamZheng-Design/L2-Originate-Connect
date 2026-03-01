// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 主入口
// 统一导出所有模块，对外提供简洁API
// ═══════════════════════════════════════════════════════

export * from './types'
export * from './themes'
export * from './narrative'
export * from './renderer'
export * from './theme-css'
export * from './prompts'

import type { DeckInput, DeckOutput, DeckStructuredData, NarrativeFramework, DeckTheme } from './types'
import { getThemeById, ALL_THEMES } from './themes'
import { generateSlideData } from './narrative'
import { renderSlideHTML } from './renderer'
import { generateThemeCSS } from './theme-css'

// ═══════════════════════════════════════════════════════
// 核心API：输入数据 → 输出完整Deck
// ═══════════════════════════════════════════════════════

export function buildDeck(input: DeckInput): DeckOutput {
  const theme = getThemeById(input.themeId)
  const industryIcon = getIndustryIcon(input.industry)

  // 叙事引擎：决定幻灯片顺序和每页内容
  const slides = generateSlideData(input.data, input.framework, input.lang, industryIcon)

  return {
    slides,
    theme,
    framework: input.framework,
    generatedAt: new Date().toISOString(),
    totalPages: slides.length,
  }
}

// ═══════════════════════════════════════════════════════
// 渲染API：DeckOutput → 完整HTML页面
// ═══════════════════════════════════════════════════════

export function renderDeckFullPage(
  output: DeckOutput,
  lang: 'zh' | 'en',
  projectId: string,
  companyName: string,
): string {
  const theme = output.theme
  const css = generateThemeCSS(theme)
  const slides = output.slides
  const total = slides.length

  // 渲染每页幻灯片
  const slidesHTML = slides.map((slide, i) =>
    `<div class="deck-slide-wrap" data-index="${i}" style="display:${i === 0 ? 'flex' : 'none'};">
      ${renderSlideHTML(slide, theme, lang, i, total)}
    </div>`
  ).join('')

  // 缩略图
  const thumbsHTML = slides.map((slide, i) => {
    const label = lang === 'en' ? (slide.title?.en || `Page ${i + 1}`) : (slide.title?.zh || `第${i + 1}页`)
    return `<button class="deck-thumb-btn ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" title="${label}">${i + 1}</button>`
  }).join('')

  const langQ = lang === 'en' ? '?lang=en' : ''

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} - Pitch Deck</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='20' r='12' fill='%232EC4B6' opacity='.85'/%3E%3Ccircle cx='24' cy='20' r='12' fill='%233DD8CA' opacity='.85'/%3E%3C/svg%3E">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js"></script>
  <style>${css}${shellCSS(theme)}</style>
</head>
<body>
  <!-- Toolbar -->
  <div class="deck-toolbar">
    <a href="/project/${projectId}${langQ}" class="deck-tool-btn"><i class="fas fa-arrow-left"></i> ${lang === 'zh' ? '返回项目' : 'Back'}</a>
    <div class="deck-toolbar-center">
      <span class="deck-toolbar-title">${companyName}</span>
      <span class="deck-toolbar-badge">${lang === 'zh' ? theme.name.zh : theme.name.en}</span>
    </div>
    <div class="deck-toolbar-right">
      <button class="deck-tool-btn" onclick="shareDeck()"><i class="fas fa-link"></i> ${lang === 'zh' ? '分享' : 'Share'}</button>
      <button class="deck-tool-btn" onclick="window.print()"><i class="fas fa-print"></i> ${lang === 'zh' ? '打印' : 'Print'}</button>
    </div>
  </div>

  <!-- Slide stage -->
  <div class="deck-stage" id="deck-stage">
    <div class="deck-slide-container" id="slide-container">
      ${slidesHTML}
    </div>
  </div>

  <!-- Navigation -->
  <div class="deck-nav">
    <button class="deck-nav-btn" id="btn-prev" onclick="prevSlide()" disabled>
      <i class="fas fa-chevron-left"></i> ${lang === 'zh' ? '上一页' : 'Prev'}
    </button>
    <span class="deck-nav-counter"><span id="current-page">1</span> / ${total}</span>
    <button class="deck-nav-btn" id="btn-next" onclick="nextSlide()">
      ${lang === 'zh' ? '下一页' : 'Next'} <i class="fas fa-chevron-right"></i>
    </button>
  </div>

  <!-- Thumbnails -->
  <div class="deck-thumbs" id="deck-thumbs">${thumbsHTML}</div>

  <!-- Toast -->
  <div id="toast-container" style="position:fixed;top:72px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;"></div>

  <script>
    let currentSlide = 0;
    const totalSlides = ${total};

    function showSlide(index) {
      document.querySelectorAll('.deck-slide-wrap').forEach((s, i) => {
        s.style.display = i === index ? 'flex' : 'none';
      });
      currentSlide = index;
      document.getElementById('current-page').textContent = index + 1;
      document.getElementById('btn-prev').disabled = index === 0;
      document.getElementById('btn-next').disabled = index === totalSlides - 1;
      document.querySelectorAll('.deck-thumb-btn').forEach((t, i) => {
        t.classList.toggle('active', i === index);
      });
      const activeThumb = document.querySelector('.deck-thumb-btn.active');
      if (activeThumb) activeThumb.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
    }

    function nextSlide() { if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1); }
    function prevSlide() { if (currentSlide > 0) showSlide(currentSlide - 1); }
    function goToSlide(i) { showSlide(i); }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
      if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
      if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
    });

    function shareDeck() {
      navigator.clipboard.writeText(location.href).then(() => showToast('${lang === 'zh' ? '链接已复制' : 'Link copied'}','success'));
    }

    function showToast(message, type) {
      const c = document.getElementById('toast-container');
      const t = document.createElement('div');
      t.style.cssText = 'pointer-events:auto;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:#fff;border:1px solid rgba(0,0,0,0.06);box-shadow:0 4px 8px rgba(0,0,0,0.04),0 16px 40px rgba(0,0,0,0.08);font-size:14px;font-weight:500;animation:toastIn 280ms ease both;';
      const icons = {success:'fa-check-circle',info:'fa-info-circle'};
      const colors = {success:'#34c759',info:'#32ade6'};
      t.innerHTML = '<i class="fas '+(icons[type]||icons.success)+'" style="color:'+(colors[type]||colors.success)+';"></i><span style="color:#1a1a1a;">'+message+'</span>';
      c.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(-12px)'; setTimeout(() => t.remove(), 200); }, 3000);
    }
  </script>
</body>
</html>`
}

// ---- Shell CSS (toolbar, nav, thumbs — theme-aware) ----
function shellCSS(theme: DeckTheme): string {
  const isDark = theme.colors.background.startsWith('#0') || theme.colors.background.startsWith('#1') || theme.colors.background === '#000000'
  const shellBg = isDark ? 'rgba(0,0,0,0.9)' : 'rgba(26,26,46,0.95)'

  return `
@keyframes toastIn { from { opacity:0; transform:translateY(-12px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }

.deck-toolbar {
  height: 50px; background: ${shellBg}; backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.08);
}
.deck-toolbar-center { display:flex; align-items:center; gap:10px; }
.deck-toolbar-title { font-size:14px; font-weight:600; color:rgba(255,255,255,0.8); }
.deck-toolbar-badge {
  font-size:11px; padding:3px 10px; border-radius:9999px;
  background:${theme.colors.primary}30; color:${theme.colors.primary}; font-weight:600;
}
.deck-toolbar-right { display:flex; gap:8px; }
.deck-tool-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 14px; border-radius:9999px; border:1px solid rgba(255,255,255,0.15);
  background:transparent; color:rgba(255,255,255,0.7); font-size:13px; font-weight:500;
  cursor:pointer; text-decoration:none; font-family:var(--s-font-body);
  transition: all 180ms ease;
}
.deck-tool-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }

.deck-stage {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 24px; overflow: hidden; background: #111;
}
.deck-slide-container { width: 100%; max-width: 900px; aspect-ratio: 16/10; }
.deck-slide-wrap { width: 100%; height: 100%; display: flex; align-items: stretch; }

.deck-nav {
  flex-shrink: 0; height: 48px;
  display: flex; align-items: center; justify-content: center; gap: 20px;
  background: ${shellBg}; border-top: 1px solid rgba(255,255,255,0.08);
}
.deck-nav-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.15);
  background: transparent; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;
  cursor: pointer; font-family: var(--s-font-body); transition: all 180ms;
}
.deck-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: #fff; }
.deck-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.deck-nav-counter { font-size:14px; color:rgba(255,255,255,0.5); font-weight:600; min-width:60px; text-align:center; }

.deck-thumbs {
  flex-shrink: 0; height: 44px;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  background: ${shellBg}; padding: 0 20px; overflow-x: auto;
}
.deck-thumb-btn {
  width: 32px; height: 28px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12); background: transparent;
  color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 180ms; flex-shrink: 0;
  font-family: var(--s-font-body);
}
.deck-thumb-btn:hover { border-color: ${theme.colors.primary}; color: ${theme.colors.primary}; }
.deck-thumb-btn.active { background: ${theme.colors.primary}; color: ${theme.colors.textOnPrimary}; border-color: ${theme.colors.primary}; }
`
}

// ---- Industry icon mapping ----
function getIndustryIcon(industry: string): string {
  const icons: Record<string, string> = {
    catering: 'fa-utensils', concert: 'fa-music', retail: 'fa-store',
    healthcare: 'fa-heartbeat', education: 'fa-graduation-cap',
    saas: 'fa-cloud', ecommerce: 'fa-shopping-cart', service: 'fa-concierge-bell',
  }
  return icons[industry] || 'fa-briefcase'
}
