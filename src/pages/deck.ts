// ═══════════════════════════════════════════════════════
// 页面 3: Pitch Deck 全屏预览页（/project/:id/deck）
// 幻灯片翻页 / 缩略图导航 / 键盘快捷键 / 分享打印
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT, INDUSTRIES, formatMoney } from '../i18n'
import { designTokensCSS } from '../design-tokens'
import { mockProjects } from '../mock-data'
import type { OriginateProject, StructuredPackage } from '../mock-data'

// ---- Generate slide HTML from StructuredPackage ----
function generateSlides(p: OriginateProject, lang: Lang): string[] {
  const pkg = p.structuredPackage
  if (!pkg) return [fallbackSlide(p, lang)]

  const co = pkg.companyOverview
  const fi = pkg.financials
  const fn = pkg.financingNeed
  const ii = pkg.industryInfo
  const ti = pkg.teamInfo
  const ind = INDUSTRIES[p.industry]
  const indLabel = ind ? tt(ind, lang) : p.industry
  const indIcon = ind ? ind.icon : 'fa-briefcase'

  const slides: string[] = []

  // ── Slide 1: Cover ──
  slides.push(`
    <div class="slide slide-cover">
      <div class="slide-cover-bg"></div>
      <div class="slide-cover-content">
        <div class="cover-icon-wrap">
          <i class="fas ${indIcon} cover-icon"></i>
        </div>
        <h1 class="cover-title">${co.name}</h1>
        <div class="cover-badge"><i class="fas ${indIcon}"></i> ${indLabel}</div>
        <p class="cover-tagline">${fn.purpose}</p>
        <div class="cover-meta">
          <span><i class="fas fa-calendar"></i> ${co.foundedDate}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${co.address.split('市')[0] || co.address}${lang==='zh'?'市':''}</span>
        </div>
      </div>
      <div class="slide-watermark">${lang==='zh'?'发起通 Pitch Deck':'Originate Connect Pitch Deck'}</div>
    </div>
  `)

  // ── Slide 2: Company Overview ──
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-building slide-header-icon"></i>
        <h2>${lang==='zh'?'公司简介':'Company Overview'}</h2>
      </div>
      <div class="slide-body">
        <div class="slide-grid-2">
          <div class="slide-info-card">
            <div class="info-card-icon"><i class="fas fa-user-tie"></i></div>
            <div class="info-card-label">${tt(TEXT.legalPerson, lang)}</div>
            <div class="info-card-value">${co.legalPerson}</div>
          </div>
          <div class="slide-info-card">
            <div class="info-card-icon"><i class="fas fa-calendar-alt"></i></div>
            <div class="info-card-label">${tt(TEXT.founded, lang)}</div>
            <div class="info-card-value">${co.foundedDate}</div>
          </div>
          <div class="slide-info-card">
            <div class="info-card-icon"><i class="fas fa-coins"></i></div>
            <div class="info-card-label">${tt(TEXT.registeredCapital, lang)}</div>
            <div class="info-card-value">${co.registeredCapital}</div>
          </div>
          <div class="slide-info-card">
            <div class="info-card-icon"><i class="fas fa-users"></i></div>
            <div class="info-card-label">${tt(TEXT.employees, lang)}</div>
            <div class="info-card-value">${co.employees}${lang==='zh'?'人':' people'}</div>
          </div>
        </div>
        <div class="slide-address-bar">
          <i class="fas fa-map-marker-alt"></i> ${co.address}
        </div>
      </div>
    </div>
  `)

  // ── Slide 3: Product & Service ──
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-lightbulb slide-header-icon"></i>
        <h2>${lang==='zh'?'产品与服务':'Product & Service'}</h2>
      </div>
      <div class="slide-body" style="display:flex; flex-direction:column; gap:24px; align-items:center;">
        <div class="slide-big-icon" style="background: rgba(93,196,179,0.1);">
          <i class="fas ${indIcon}" style="font-size: 48px; color: var(--brand-primary);"></i>
        </div>
        <div style="text-align:center; max-width:500px;">
          <h3 style="font-size:22px; font-weight:700; margin-bottom:8px; color:var(--text-title);">${indLabel} ${lang==='zh'?'行业':'Industry'}</h3>
          <p style="font-size:15px; color:var(--text-secondary); line-height:1.7;">
            ${co.name}${lang==='zh'?'专注于'+indLabel+'行业，凭借':' focuses on the '+indLabel+' industry, leveraging '}${ii.moat}${lang==='zh'?'，为客户提供优质服务。':' to deliver excellent services.'}
          </p>
        </div>
        <div class="slide-highlight-box">
          <div class="highlight-label">${lang==='zh'?'核心壁垒':'Core Moat'}</div>
          <div class="highlight-value">${ii.moat}</div>
        </div>
      </div>
    </div>
  `)

  // ── Slide 4: Financial Highlights ──
  const barMax = Math.max(fi.monthlyRevenue, fi.monthlyGrowthRate * 5, fi.profitMargin * 5)
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-chart-bar slide-header-icon"></i>
        <h2>${lang==='zh'?'财务亮点':'Financial Highlights'}</h2>
      </div>
      <div class="slide-body">
        <div class="slide-grid-3">
          <div class="fin-metric">
            <div class="fin-metric-value">${formatMoney(fi.monthlyRevenue, lang)}</div>
            <div class="fin-metric-label">${tt(TEXT.monthlyRevenue, lang)}</div>
            <div class="fin-bar"><div class="fin-bar-fill" style="width:${Math.min(100, (fi.monthlyRevenue/barMax)*100)}%;"></div></div>
          </div>
          <div class="fin-metric">
            <div class="fin-metric-value" style="color:var(--color-success);">${fi.monthlyGrowthRate}%</div>
            <div class="fin-metric-label">${tt(TEXT.growthRate, lang)}</div>
            <div class="fin-bar"><div class="fin-bar-fill fin-bar-green" style="width:${Math.min(100, fi.monthlyGrowthRate * 4)}%;"></div></div>
          </div>
          <div class="fin-metric">
            <div class="fin-metric-value">${fi.profitMargin}%</div>
            <div class="fin-metric-label">${tt(TEXT.profitMargin, lang)}</div>
            <div class="fin-bar"><div class="fin-bar-fill" style="width:${Math.min(100, fi.profitMargin * 4)}%;"></div></div>
          </div>
        </div>
        <div class="slide-cost-bar" style="margin-top:24px;">
          <div class="cost-label">${tt(TEXT.costStructure, lang)}</div>
          <div class="cost-strip">
            ${fi.costStructure.split('、').map((item: string, i: number) => {
              const colors = ['#5DC4B3','#5DC4B3','#32ade6','#86868b']
              const match = item.match(/(\d+)%/)
              const pct = match ? parseInt(match[1]) : 25
              return `<div class="cost-seg" style="width:${pct}%; background:${colors[i%colors.length]};" title="${item}">${pct}%</div>`
            }).join('')}
          </div>
          <div class="cost-legend">
            ${fi.costStructure.split('、').map((item: string, i: number) => {
              const colors = ['#5DC4B3','#5DC4B3','#32ade6','#86868b']
              return `<span class="cost-legend-item"><span class="cost-dot" style="background:${colors[i%colors.length]};"></span>${item}</span>`
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `)

  // ── Slide 5: Market Analysis ──
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-globe slide-header-icon"></i>
        <h2>${lang==='zh'?'市场分析':'Market Analysis'}</h2>
      </div>
      <div class="slide-body">
        <div class="market-size-hero">
          <div class="market-size-number">${ii.marketSize}</div>
          <div class="market-size-label">${lang==='zh'?'市场规模':'Market Size'}</div>
        </div>
        <div class="slide-grid-2" style="margin-top:24px;">
          <div class="slide-text-card">
            <div class="text-card-title"><i class="fas fa-chess"></i> ${tt(TEXT.competitors, lang)}</div>
            <div class="text-card-body">${ii.competitors}</div>
          </div>
          <div class="slide-text-card">
            <div class="text-card-title"><i class="fas fa-shield-alt"></i> ${tt(TEXT.moat, lang)}</div>
            <div class="text-card-body">${ii.moat}</div>
          </div>
        </div>
      </div>
    </div>
  `)

  // ── Slide 6: Competitive Advantage ──
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-trophy slide-header-icon"></i>
        <h2>${lang==='zh'?'竞争优势':'Competitive Advantage'}</h2>
      </div>
      <div class="slide-body" style="display:flex; flex-direction:column; align-items:center; gap:20px;">
        <div class="advantage-visual">
          <div class="advantage-ring">
            <div class="advantage-ring-inner">
              <i class="fas fa-star" style="font-size:28px; color:var(--brand-primary);"></i>
            </div>
          </div>
        </div>
        <div style="text-align:center; max-width:480px;">
          <h3 style="font-size:20px; font-weight:700; color:var(--text-title); margin-bottom:12px;">${ii.moat}</h3>
          <p style="font-size:14px; color:var(--text-secondary); line-height:1.7;">
            ${lang==='zh'
              ?`在${ii.marketSize}规模的${indLabel}市场中，${co.name}以独特的竞争壁垒建立了可持续的商业护城河。月收入${formatMoney(fi.monthlyRevenue,lang)}，增长率${fi.monthlyGrowthRate}%。`
              :`In the ${ii.marketSize} ${indLabel} market, ${co.name} has built a sustainable business moat with unique competitive barriers. Monthly revenue ${formatMoney(fi.monthlyRevenue,lang)}, growth rate ${fi.monthlyGrowthRate}%.`}
          </p>
        </div>
      </div>
    </div>
  `)

  // ── Slide 7: Team ──
  slides.push(`
    <div class="slide">
      <div class="slide-header">
        <i class="fas fa-users slide-header-icon"></i>
        <h2>${lang==='zh'?'团队背景':'Team Background'}</h2>
      </div>
      <div class="slide-body">
        <div class="team-founder-card">
          <div class="founder-avatar"><i class="fas fa-user-circle"></i></div>
          <div class="founder-info">
            <div class="founder-name">${ti.keyMembers[0] || co.legalPerson}</div>
            <div class="founder-bg">${ti.founderBackground}</div>
          </div>
        </div>
        <div class="team-stats" style="margin-top:20px;">
          <div class="team-stat-item">
            <div class="team-stat-num">${ti.teamSize}</div>
            <div class="team-stat-label">${lang==='zh'?'团队规模':'Team Size'}</div>
          </div>
          <div class="team-stat-item">
            <div class="team-stat-num">${ti.keyMembers.length}</div>
            <div class="team-stat-label">${lang==='zh'?'核心成员':'Key Members'}</div>
          </div>
        </div>
        ${ti.keyMembers.length > 1 ? `
        <div class="team-members-list">
          ${ti.keyMembers.map(m => `<div class="team-member-chip"><i class="fas fa-user"></i> ${m}</div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  `)

  // ── Slide 8: Financing Need ──
  slides.push(`
    <div class="slide slide-financing">
      <div class="slide-header">
        <i class="fas fa-hand-holding-usd slide-header-icon"></i>
        <h2>${lang==='zh'?'融资需求':'Financing Need'}</h2>
      </div>
      <div class="slide-body">
        <div class="financing-hero">
          <div class="financing-amount">${formatMoney(fn.amount, lang)}</div>
          <div class="financing-label">${lang==='zh'?'目标融资额':'Target Amount'}</div>
        </div>
        <div class="slide-grid-2" style="margin-top:24px;">
          <div class="slide-info-card" style="text-align:center;">
            <div class="info-card-icon"><i class="fas fa-percentage"></i></div>
            <div class="info-card-label">${tt(TEXT.shareRatio, lang)}</div>
            <div class="info-card-value">${fn.expectedShareRatio}%</div>
          </div>
          <div class="slide-info-card" style="text-align:center;">
            <div class="info-card-icon"><i class="fas fa-clock"></i></div>
            <div class="info-card-label">${tt(TEXT.urgency, lang)}</div>
            <div class="info-card-value">${fn.urgency === 'high' ? (lang==='zh'?'高':'High') : fn.urgency === 'medium' ? (lang==='zh'?'中等':'Medium') : (lang==='zh'?'低':'Low')}</div>
          </div>
        </div>
        <div class="slide-highlight-box" style="margin-top:20px;">
          <div class="highlight-label">${tt(TEXT.purpose, lang)}</div>
          <div class="highlight-value">${fn.purpose}</div>
        </div>
        <div class="financing-contact">
          <i class="fas fa-envelope"></i> ${lang==='zh'?'联系融资者了解更多':'Contact for more information'}
        </div>
      </div>
    </div>
  `)

  return slides
}

function fallbackSlide(p: OriginateProject, lang: Lang): string {
  return `<div class="slide slide-cover">
    <div class="slide-cover-bg"></div>
    <div class="slide-cover-content">
      <h1 class="cover-title">${p.companyName}</h1>
      <p class="cover-tagline">${lang==='zh'?'Pitch Deck 尚未生成，请先完成 AI 处理':'Pitch Deck not generated yet. Please complete AI processing first.'}</p>
    </div>
  </div>`
}

// ═══════════════════════════════════════════════════════
// Main render — Full standalone page (no layout wrapper)
// ═══════════════════════════════════════════════════════
export function renderDeckPage(lang: Lang, id: string): string {
  const project = mockProjects.find(p => p.id === id)
  const langQ = lang === 'en' ? '?lang=en' : ''
  const companyName = project?.companyName || 'Project'
  const slides = project ? generateSlides(project, lang) : [fallbackSlide({ id, companyName, industry: '', status: 'draft', rawMaterials: [], userId: '', createdAt: '', updatedAt: '' }, lang)]
  const totalPages = slides.length

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} - Pitch Deck | ${tt(TEXT.appName, lang)}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='20' r='12' fill='%232EC4B6' opacity='.85'/%3E%3Ccircle cx='24' cy='20' r='12' fill='%233DD8CA' opacity='.85'/%3E%3C/svg%3E">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>${deckCSS}</style>
</head>
<body>
  <!-- Top toolbar -->
  <div class="deck-toolbar">
    <a href="/project/${id}${langQ}" class="deck-tool-btn">
      ${tt(TEXT.backToProject, lang)}
    </a>
    <div class="deck-toolbar-title">${companyName} — Pitch Deck</div>
    <div class="deck-toolbar-right">
      <button class="deck-tool-btn" onclick="shareDeck()">
        <i class="fas fa-link"></i> ${tt(TEXT.share, lang)}
      </button>
      <button class="deck-tool-btn" onclick="window.print()">
        <i class="fas fa-print"></i> ${tt(TEXT.print, lang)}
      </button>
    </div>
  </div>

  <!-- Slide display area -->
  <div class="deck-stage" id="deck-stage">
    <div class="deck-slide-container" id="slide-container">
      ${slides.map((s, i) => `<div class="deck-slide-wrap" data-index="${i}" style="display:${i === 0 ? 'flex' : 'none'};">${s}</div>`).join('')}
    </div>
  </div>

  <!-- Navigation controls -->
  <div class="deck-nav">
    <button class="deck-nav-btn" id="btn-prev" onclick="prevSlide()" disabled>
      <i class="fas fa-chevron-left"></i> ${tt(TEXT.prevPage, lang)}
    </button>
    <span class="deck-nav-counter">
      <span id="current-page">1</span> / ${totalPages}
    </span>
    <button class="deck-nav-btn" id="btn-next" onclick="nextSlide()">
      ${tt(TEXT.nextPage, lang)} <i class="fas fa-chevron-right"></i>
    </button>
  </div>

  <!-- Thumbnails -->
  <div class="deck-thumbs" id="deck-thumbs">
    ${slides.map((_, i) => `<button class="deck-thumb-btn ${i===0?'active':''}" onclick="goToSlide(${i})">${i+1}</button>`).join('')}
  </div>

  <!-- Toast container -->
  <div id="toast-container" style="position:fixed;top:72px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;"></div>

  <script>
    let currentSlide = 0;
    const totalSlides = ${totalPages};

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
      // Scroll thumb into view
      const activeThumb = document.querySelector('.deck-thumb-btn.active');
      if (activeThumb) activeThumb.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
    }

    function nextSlide() { if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1); }
    function prevSlide() { if (currentSlide > 0) showSlide(currentSlide - 1); }
    function goToSlide(i) { showSlide(i); }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
      if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
      if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
    });

    function shareDeck() {
      const link = location.href;
      navigator.clipboard.writeText(link).then(() => showToast('${tt(TEXT.toastLinkCopied, lang)}','success'))
        .catch(() => showToast('${tt(TEXT.toastLinkCopied, lang)}','success'));
    }

    function showToast(message, type) {
      const c = document.getElementById('toast-container');
      const t = document.createElement('div');
      t.style.cssText = 'pointer-events:auto;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:#fff;border:1px solid rgba(0,0,0,0.06);box-shadow:0 4px 8px rgba(0,0,0,0.04),0 16px 40px rgba(0,0,0,0.08);font-size:14px;font-weight:500;animation:toastIn 280ms cubic-bezier(0.22,1,0.36,1) both;';
      const icons = {success:'fa-check-circle',info:'fa-info-circle'};
      const colors = {success:'#34c759',info:'#32ade6'};
      t.innerHTML = '<i class="fas '+(icons[type]||icons.success)+'" style="color:'+(colors[type]||colors.success)+';font-size:16px;"></i><span>'+message+'</span>';
      c.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(-12px)'; setTimeout(() => t.remove(), 200); }, 3000);
    }
  </script>
</body>
</html>`
}

// ═══════════════════════════════════════════════════════
// Deck-specific CSS (standalone, no design-tokens import)
// ═══════════════════════════════════════════════════════
const deckCSS = `
  @keyframes toastIn { from { opacity:0; transform:translateY(-12px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }

  :root {
    --oc-dark: #5DC4B3; --oc-light: rgba(93,196,179,0.1); --oc-hover: #3D8F83;
    --brand-primary: #5DC4B3; --brand-light: #7DD4C7;
    --text-primary: #1d1d1f; --text-title: #1a1a1a;
    --text-secondary: #6e6e73; --text-tertiary: #86868b;
    --bg-page: #f5f5f7; --bg-white: #ffffff;
    --border-default: rgba(0,0,0,0.06);
    --color-success: #34c759;
    --font-body: -apple-system, BlinkMacSystemFont, 'Inter', 'Noto Sans SC', sans-serif;
    --font-brand: 'Montserrat', 'Inter', sans-serif;
    --shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height:100%; font-family: var(--font-body); background: #1a1a2e; color: var(--text-primary); }
  body { display: flex; flex-direction: column; overflow: hidden; }

  /* Toolbar */
  .deck-toolbar {
    height: 48px; background: rgba(26,26,46,0.95); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .deck-toolbar-title { font-size:14px; font-weight:600; color:rgba(255,255,255,0.8); }
  .deck-toolbar-right { display:flex; gap:8px; }
  .deck-tool-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:9999px; border:1px solid rgba(255,255,255,0.15);
    background:transparent; color:rgba(255,255,255,0.7); font-size:13px; font-weight:500;
    cursor:pointer; text-decoration:none; font-family:var(--font-body);
    transition: all 180ms ease;
  }
  .deck-tool-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }

  /* Stage */
  .deck-stage {
    flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 24px; overflow: hidden;
  }
  .deck-slide-container { width: 100%; max-width: 880px; aspect-ratio: 16/10; }
  .deck-slide-wrap {
    width: 100%; height: 100%; display: flex; align-items: stretch; justify-content: stretch;
  }

  /* Slides */
  .slide {
    width: 100%; border-radius: 16px; background: var(--bg-white);
    box-shadow: var(--shadow-lg); overflow: hidden;
    display: flex; flex-direction: column;
  }
  .slide-header {
    padding: 28px 36px 0; display: flex; align-items: center; gap: 12px;
  }
  .slide-header h2 { font-size: 22px; font-weight: 800; color: var(--text-title); }
  .slide-header-icon { font-size: 20px; color: var(--brand-primary); }
  .slide-body { flex: 1; padding: 24px 36px 28px; overflow: auto; }

  /* Cover slide */
  .slide-cover { position: relative; background: linear-gradient(135deg, #0f3d36 0%, #1a1a2e 50%, #0b312c 100%); }
  .slide-cover-bg {
    position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 30%, rgba(93,196,179,0.15) 0%, transparent 50%),
                radial-gradient(circle at 30% 70%, rgba(245,158,11,0.1) 0%, transparent 50%);
  }
  .slide-cover-content {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    flex: 1; padding: 40px; text-align: center; gap: 16px;
  }
  .cover-icon-wrap {
    width: 80px; height: 80px; border-radius: 20px;
    background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3);
    display: flex; align-items: center; justify-content: center; margin-bottom: 8px;
  }
  .cover-icon { font-size: 36px; color: var(--brand-primary); }
  .cover-title { font-family: var(--font-brand); font-size: 36px; font-weight: 900; color: #fff; }
  .cover-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 9999px;
    background: rgba(245,158,11,0.15); color: var(--brand-primary);
    font-size: 14px; font-weight: 600;
  }
  .cover-tagline { font-size: 16px; color: rgba(255,255,255,0.6); max-width: 400px; }
  .cover-meta { display: flex; gap: 20px; font-size: 13px; color: rgba(255,255,255,0.4); }
  .cover-meta i { margin-right: 4px; }
  .slide-watermark {
    position: absolute; bottom: 16px; right: 24px;
    font-size: 11px; color: rgba(255,255,255,0.2); font-weight: 500;
  }

  /* Info cards */
  .slide-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .slide-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .slide-info-card {
    padding: 16px; background: var(--bg-page); border-radius: 12px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .info-card-icon { font-size: 18px; color: var(--brand-primary); margin-bottom: 4px; }
  .info-card-label { font-size: 12px; color: var(--text-tertiary); font-weight: 500; }
  .info-card-value { font-size: 16px; font-weight: 700; color: var(--text-primary); }
  .slide-address-bar {
    margin-top: 16px; padding: 12px 16px; background: var(--bg-page); border-radius: 8px;
    font-size: 13px; color: var(--text-secondary);
  }
  .slide-address-bar i { color: var(--brand-primary); margin-right: 8px; }

  /* Big icon */
  .slide-big-icon {
    width: 100px; height: 100px; border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
  }

  /* Highlight box */
  .slide-highlight-box {
    padding: 16px 20px; background: rgba(93,196,179,0.1); border-radius: 12px;
    border-left: 4px solid var(--brand-primary); width: 100%;
  }
  .highlight-label { font-size: 12px; font-weight: 600; color: var(--brand-dark); margin-bottom: 4px; }
  .highlight-value { font-size: 15px; font-weight: 600; color: var(--text-primary); }

  /* Financial metrics */
  .fin-metric { text-align: center; }
  .fin-metric-value { font-size: 28px; font-weight: 800; color: var(--brand-primary); }
  .fin-metric-label { font-size: 12px; color: var(--text-secondary); margin: 4px 0 8px; }
  .fin-bar { height: 6px; background: var(--bg-page); border-radius: 3px; overflow: hidden; }
  .fin-bar-fill { height: 100%; background: var(--brand-primary); border-radius: 3px; transition: width 600ms; }
  .fin-bar-green { background: var(--color-success); }

  /* Cost strip */
  .cost-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; }
  .cost-strip { display: flex; height: 24px; border-radius: 6px; overflow: hidden; }
  .cost-seg { display: flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; font-weight: 600; }
  .cost-legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
  .cost-legend-item { font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; }
  .cost-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* Market */
  .market-size-hero { text-align: center; padding: 20px; }
  .market-size-number { font-size: 48px; font-weight: 900; color: var(--brand-primary); font-family: var(--font-brand); }
  .market-size-label { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
  .slide-text-card {
    padding: 16px; background: var(--bg-page); border-radius: 12px;
  }
  .text-card-title { font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; }
  .text-card-title i { color: var(--brand-primary); margin-right: 6px; }
  .text-card-body { font-size: 14px; color: var(--text-primary); line-height: 1.6; }

  /* Advantage */
  .advantage-visual { display: flex; justify-content: center; }
  .advantage-ring {
    width: 100px; height: 100px; border-radius: 50%;
    border: 3px solid var(--brand-primary); display: flex; align-items: center; justify-content: center;
    background: rgba(93,196,179,0.1);
  }
  .advantage-ring-inner { display: flex; align-items: center; justify-content: center; }

  /* Team */
  .team-founder-card {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 20px; background: var(--bg-page); border-radius: 12px;
  }
  .founder-avatar { font-size: 48px; color: var(--brand-primary); }
  .founder-name { font-size: 18px; font-weight: 700; color: var(--text-title); margin-bottom: 6px; }
  .founder-bg { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
  .team-stats { display: flex; gap: 24px; justify-content: center; }
  .team-stat-item { text-align: center; }
  .team-stat-num { font-size: 28px; font-weight: 800; color: var(--brand-primary); }
  .team-stat-label { font-size: 12px; color: var(--text-secondary); }
  .team-members-list { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; justify-content: center; }
  .team-member-chip {
    padding: 8px 14px; background: var(--bg-page); border-radius: 9999px;
    font-size: 13px; font-weight: 500; color: var(--text-primary);
  }
  .team-member-chip i { color: var(--brand-primary); margin-right: 6px; }

  /* Financing */
  .financing-hero { text-align: center; padding: 16px; }
  .financing-amount { font-size: 48px; font-weight: 900; color: var(--brand-primary); font-family: var(--font-brand); }
  .financing-label { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
  .financing-contact {
    margin-top: 20px; text-align: center;
    font-size: 14px; color: var(--brand-primary); font-weight: 600;
  }
  .financing-contact i { margin-right: 6px; }

  /* Nav */
  .deck-nav {
    flex-shrink: 0; height: 48px;
    display: flex; align-items: center; justify-content: center; gap: 20px;
    background: rgba(26,26,46,0.95); border-top: 1px solid rgba(255,255,255,0.08);
  }
  .deck-nav-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.15);
    background: transparent; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;
    cursor: pointer; font-family: var(--font-body); transition: all 180ms;
  }
  .deck-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: #fff; }
  .deck-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .deck-nav-counter { font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 600; min-width: 60px; text-align: center; }

  /* Thumbnails */
  .deck-thumbs {
    flex-shrink: 0; height: 44px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    background: rgba(26,26,46,0.98); padding: 0 20px; overflow-x: auto;
  }
  .deck-thumb-btn {
    width: 32px; height: 28px; border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.12); background: transparent;
    color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 180ms; font-family: var(--font-body);
    flex-shrink: 0;
  }
  .deck-thumb-btn:hover { border-color: var(--brand-primary); color: var(--brand-primary); }
  .deck-thumb-btn.active { background: var(--brand-primary); color: #fff; border-color: var(--brand-primary); }

  /* Print */
  @media print {
    .deck-toolbar, .deck-nav, .deck-thumbs, #toast-container { display: none !important; }
    body { background: #fff; overflow: visible; }
    .deck-stage { padding: 0; }
    .slide { box-shadow: none; page-break-after: always; }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .deck-toolbar-title { display: none; }
    .slide-header h2 { font-size: 18px; }
    .slide-body { padding: 16px 20px 20px; }
    .slide-header { padding: 20px 20px 0; }
    .cover-title { font-size: 24px; }
    .slide-grid-2 { grid-template-columns: 1fr; }
    .slide-grid-3 { grid-template-columns: 1fr; }
    .fin-metric-value { font-size: 22px; }
    .market-size-number { font-size: 36px; }
    .financing-amount { font-size: 36px; }
  }
`
