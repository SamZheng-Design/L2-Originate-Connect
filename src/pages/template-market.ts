// ═══════════════════════════════════════════════════════
// 页面: 模板市场 (/templates)
// 展示所有可用模板主题 + 叙事框架
// 用户可预览、选择、应用到项目
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'
import { renderLayout } from '../components/layout'
import { ALL_THEMES, type DeckTheme } from '../deck-engine'

export function renderTemplateMarketPage(lang: Lang): string {
  const body = `
  <main style="padding-top: 16px; padding-bottom: 80px; min-height: 80vh;">
    <div class="container">

      <!-- Hero Section -->
      <div class="tmkt-hero">
        <div class="tmkt-hero-badge"><i class="fas fa-palette"></i> ${lang === 'zh' ? '模板市场' : 'Template Market'}</div>
        <h1 class="tmkt-hero-title">${lang === 'zh' ? '为你的 Pitch Deck 选一件战袍' : 'Choose the Perfect Skin for Your Pitch Deck'}</h1>
        <p class="tmkt-hero-desc">${lang === 'zh' ? '6套精品主题 × 5种叙事框架 = 30种组合，找到最适合你的那一款' : '6 premium themes × 5 narrative frameworks = 30 combinations'}</p>
      </div>

      <!-- Framework Section -->
      <section class="tmkt-section">
        <h2 class="tmkt-section-title"><i class="fas fa-pen-fancy"></i> ${lang === 'zh' ? '叙事框架' : 'Narrative Frameworks'}</h2>
        <p class="tmkt-section-desc">${lang === 'zh' ? '不同的故事讲法，决定幻灯片的结构和重心' : 'Different storytelling approaches determine the structure and focus of your slides'}</p>
        <div class="tmkt-frameworks">
          ${renderFrameworkCard('classic', lang === 'zh' ? '经典路演' : 'Classic Roadshow', lang === 'zh' ? '痛点→方案→市场→财务→团队→Ask' : 'Problem→Solution→Market→Financials→Team→Ask', 'fa-landmark', '#0066CC', lang)}
          ${renderFrameworkCard('yc', 'YC Demo Day', lang === 'zh' ? 'Traction优先→问题→方案→市场→Ask' : 'Traction first→Problem→Solution→Market→Ask', 'fa-rocket', '#FF6B35', lang)}
          ${renderFrameworkCard('drip', lang === 'zh' ? '滴灌通模式' : 'Drip Capital', lang === 'zh' ? '单位经济→收入流水→门店模型→分成Ask' : 'Unit Economics→Revenue→Store Model→Share Ask', 'fa-tint', '#5DC4B3', lang)}
          ${renderFrameworkCard('storytelling', lang === 'zh' ? '故事驱动' : 'Story-Driven', lang === 'zh' ? '创始人故事→痛点→Aha时刻→验证→愿景' : 'Founder Story→Pain→Aha→Validation→Vision', 'fa-book-open', '#8B5CF6', lang)}
          ${renderFrameworkCard('data_heavy', lang === 'zh' ? '数据密集' : 'Data Heavy', lang === 'zh' ? 'KPI大屏→趋势→对标→预测' : 'KPI Dashboard→Trends→Benchmarks→Forecast', 'fa-chart-bar', '#FF8700', lang)}
        </div>
      </section>

      <!-- Templates Section -->
      <section class="tmkt-section">
        <h2 class="tmkt-section-title"><i class="fas fa-th-large"></i> ${lang === 'zh' ? '主题模板' : 'Theme Templates'}</h2>
        <p class="tmkt-section-desc">${lang === 'zh' ? '每套模板包含完整配色、字体、排版、组件风格' : 'Each template includes full color palette, typography, layout, and component styles'}</p>

        <!-- Filter -->
        <div class="tmkt-filters">
          <button class="tmkt-filter active" onclick="filterThemes('all')">${lang === 'zh' ? '全部' : 'All'}</button>
          <button class="tmkt-filter" onclick="filterThemes('professional')">${lang === 'zh' ? '专业' : 'Professional'}</button>
          <button class="tmkt-filter" onclick="filterThemes('creative')">${lang === 'zh' ? '创意' : 'Creative'}</button>
          <button class="tmkt-filter" onclick="filterThemes('minimal')">${lang === 'zh' ? '极简' : 'Minimal'}</button>
          <button class="tmkt-filter" onclick="filterThemes('brand')">${lang === 'zh' ? '品牌' : 'Brand'}</button>
          <button class="tmkt-filter" onclick="filterThemes('data')">${lang === 'zh' ? '数据' : 'Data'}</button>
        </div>

        <!-- Template Grid -->
        <div class="tmkt-grid" id="tmkt-grid">
          ${ALL_THEMES.map(theme => renderThemeCard(theme, lang)).join('')}
        </div>
      </section>

      <!-- How It Works -->
      <section class="tmkt-section">
        <h2 class="tmkt-section-title"><i class="fas fa-magic"></i> ${lang === 'zh' ? '如何使用' : 'How It Works'}</h2>
        <div class="tmkt-steps">
          <div class="tmkt-step">
            <div class="tmkt-step-num">1</div>
            <h3>${lang === 'zh' ? '上传材料' : 'Upload Materials'}</h3>
            <p>${lang === 'zh' ? '丢入你的BP、财报、营业执照' : 'Throw in your BP, financials, license'}</p>
          </div>
          <div class="tmkt-step-arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="tmkt-step">
            <div class="tmkt-step-num">2</div>
            <h3>${lang === 'zh' ? '选择模板+框架' : 'Choose Template + Framework'}</h3>
            <p>${lang === 'zh' ? '找到最适合你行业和风格的组合' : 'Find the best combo for your industry'}</p>
          </div>
          <div class="tmkt-step-arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="tmkt-step">
            <div class="tmkt-step-num">3</div>
            <h3>${lang === 'zh' ? 'AI 生成 Deck' : 'AI Generates Deck'}</h3>
            <p>${lang === 'zh' ? '专业内容 + 精美设计，一键生成' : 'Professional content + beautiful design'}</p>
          </div>
        </div>
      </section>

    </div>
  </main>`

  const extraCSS = templateMarketCSS
  const extraScript = templateMarketScript(lang)

  return renderLayout(lang, lang === 'zh' ? '模板市场' : 'Template Market', body, extraCSS, extraScript)
}

function renderFrameworkCard(id: string, name: string, desc: string, icon: string, color: string, lang: Lang): string {
  return `<div class="tmkt-fw-card" data-fw="${id}">
    <div class="tmkt-fw-icon" style="background:${color}15; color:${color};"><i class="fas ${icon}"></i></div>
    <div class="tmkt-fw-info">
      <div class="tmkt-fw-name">${name}</div>
      <div class="tmkt-fw-desc">${desc}</div>
    </div>
  </div>`
}

function renderThemeCard(theme: DeckTheme, lang: Lang): string {
  const name = lang === 'en' ? theme.name.en : theme.name.zh
  const desc = lang === 'en' ? theme.description.en : theme.description.zh
  const catLabel: Record<string, { zh: string; en: string }> = {
    professional: { zh: '专业', en: 'Professional' },
    creative: { zh: '创意', en: 'Creative' },
    minimal: { zh: '极简', en: 'Minimal' },
    brand: { zh: '品牌', en: 'Brand' },
    data: { zh: '数据', en: 'Data' },
  }

  // 生成一个迷你预览
  const previewBg = theme.colors.background
  const isDark = previewBg.startsWith('#0') || previewBg.startsWith('#1') || previewBg === '#000000'

  return `<div class="tmkt-card" data-category="${theme.category}" data-theme-id="${theme.id}">
    <!-- Mini preview -->
    <div class="tmkt-card-preview" style="background:${theme.colors.background};">
      <div class="tmkt-preview-header" style="background:linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd}); color:${isDark ? '#fff' : theme.colors.textOnPrimary};">
        <div style="font-size:8px; font-weight:700; opacity:0.7;">PITCH DECK</div>
        <div style="font-size:12px; font-weight:800; margin-top:4px;">Company Name</div>
        <div style="font-size:7px; opacity:0.6; margin-top:2px;">One-line hook goes here</div>
      </div>
      <div class="tmkt-preview-body" style="padding:6px 8px;">
        <div style="display:flex; gap:4px; margin-bottom:4px;">
          <div class="tmkt-prev-kpi" style="background:${theme.colors.surface}; border-radius:${theme.layout.borderRadius};">
            <div style="font-size:9px; font-weight:800; color:${theme.colors.primary};">¥85万</div>
            <div style="font-size:6px; color:${theme.colors.textSecondary};">月收入</div>
          </div>
          <div class="tmkt-prev-kpi" style="background:${theme.colors.surface}; border-radius:${theme.layout.borderRadius};">
            <div style="font-size:9px; font-weight:800; color:${theme.colors.primary};">+12%</div>
            <div style="font-size:6px; color:${theme.colors.textSecondary};">增长</div>
          </div>
          <div class="tmkt-prev-kpi" style="background:${theme.colors.surface}; border-radius:${theme.layout.borderRadius};">
            <div style="font-size:9px; font-weight:800; color:${theme.colors.primary};">18%</div>
            <div style="font-size:6px; color:${theme.colors.textSecondary};">利润率</div>
          </div>
        </div>
        <div style="height:28px; background:${theme.colors.surface}; border-radius:${theme.layout.borderRadius}; display:flex; align-items:flex-end; padding:0 4px 2px; gap:2px;">
          ${theme.colors.chartColors.slice(0, 6).map((cc, i) => `<div style="width:12%; height:${20 + i * 8}%; background:${cc}; border-radius:2px 2px 0 0;"></div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Card info -->
    <div class="tmkt-card-info">
      <div class="tmkt-card-top">
        <h3 class="tmkt-card-name">${name}</h3>
        ${theme.isPremium ? `<span class="tmkt-badge-premium"><i class="fas fa-crown"></i> Premium</span>` : `<span class="tmkt-badge-free">${lang === 'zh' ? '免费' : 'Free'}</span>`}
      </div>
      <p class="tmkt-card-desc">${desc}</p>
      <div class="tmkt-card-meta">
        <span class="tmkt-card-cat">${lang === 'en' ? catLabel[theme.category]?.en : catLabel[theme.category]?.zh}</span>
        <div class="tmkt-card-colors">
          ${[theme.colors.primary, theme.colors.accent, theme.colors.secondary].map(cc => `<span class="tmkt-color-dot" style="background:${cc};"></span>`).join('')}
        </div>
      </div>
      <button class="tmkt-card-btn" onclick="previewTheme('${theme.id}')">
        <i class="fas fa-eye"></i> ${lang === 'zh' ? '预览' : 'Preview'}
      </button>
    </div>
  </div>`
}

// ═══════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════
const templateMarketCSS = `
/* Hero */
.tmkt-hero { text-align:center; padding:48px 20px 40px; }
.tmkt-hero-badge {
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 16px; border-radius:9999px;
  background:linear-gradient(135deg, rgba(93,196,179,0.15), rgba(245,158,11,0.15));
  color:var(--brand-primary); font-size:13px; font-weight:600; margin-bottom:16px;
}
.tmkt-hero-title { font-size:32px; font-weight:900; color:var(--text-title); letter-spacing:-0.02em; margin-bottom:8px; }
.tmkt-hero-desc { font-size:16px; color:var(--text-secondary); max-width:500px; margin:0 auto; }

/* Section */
.tmkt-section { margin-bottom:48px; }
.tmkt-section-title { font-size:20px; font-weight:800; color:var(--text-title); display:flex; align-items:center; gap:8px; margin-bottom:4px; }
.tmkt-section-title i { color:var(--brand-primary); }
.tmkt-section-desc { font-size:14px; color:var(--text-secondary); margin-bottom:20px; }

/* Framework cards */
.tmkt-frameworks { display:flex; gap:12px; flex-wrap:wrap; }
.tmkt-fw-card {
  flex:1; min-width:180px; display:flex; gap:12px; align-items:flex-start;
  padding:16px; background:var(--bg-white); border-radius:var(--radius-lg);
  border:1px solid var(--border-default); cursor:pointer;
  transition:all 0.2s ease;
}
.tmkt-fw-card:hover { border-color:var(--brand-primary); box-shadow:var(--shadow-sm); transform:translateY(-2px); }
.tmkt-fw-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
.tmkt-fw-name { font-size:14px; font-weight:700; color:var(--text-title); }
.tmkt-fw-desc { font-size:11px; color:var(--text-secondary); margin-top:2px; line-height:1.5; }

/* Filters */
.tmkt-filters { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; }
.tmkt-filter {
  padding:6px 16px; border-radius:9999px; border:1px solid var(--border-default);
  background:var(--bg-white); color:var(--text-secondary); font-size:13px; font-weight:500;
  cursor:pointer; transition:all 0.2s;
}
.tmkt-filter:hover { border-color:var(--brand-primary); color:var(--brand-primary); }
.tmkt-filter.active { background:var(--brand-primary); color:#fff; border-color:var(--brand-primary); }

/* Template Grid */
.tmkt-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:20px; }

/* Template Card */
.tmkt-card {
  background:var(--bg-white); border-radius:var(--radius-lg); overflow:hidden;
  border:1px solid var(--border-default); transition:all 0.25s ease;
}
.tmkt-card:hover { border-color:var(--brand-primary); box-shadow:0 8px 24px rgba(0,0,0,0.08); transform:translateY(-4px); }
.tmkt-card[style*="display: none"] { display: none !important; }

/* Preview mini */
.tmkt-card-preview { height:160px; overflow:hidden; position:relative; }
.tmkt-preview-header { padding:12px 14px 10px; }
.tmkt-preview-body { padding:4px 8px; }
.tmkt-prev-kpi { flex:1; padding:4px 6px; text-align:center; }

/* Card info */
.tmkt-card-info { padding:16px; }
.tmkt-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.tmkt-card-name { font-size:16px; font-weight:700; color:var(--text-title); }
.tmkt-badge-premium {
  font-size:11px; padding:2px 8px; border-radius:9999px;
  background:linear-gradient(135deg, #FFD700, #FFA500); color:#333; font-weight:700;
}
.tmkt-badge-premium i { font-size:9px; }
.tmkt-badge-free {
  font-size:11px; padding:2px 8px; border-radius:9999px;
  background:rgba(52,199,89,0.1); color:#34c759; font-weight:600;
}
.tmkt-card-desc { font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:10px; }
.tmkt-card-meta { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.tmkt-card-cat { font-size:11px; color:var(--text-tertiary); font-weight:500; text-transform:uppercase; letter-spacing:0.5px; }
.tmkt-card-colors { display:flex; gap:4px; }
.tmkt-color-dot { width:14px; height:14px; border-radius:50%; border:2px solid var(--bg-white); box-shadow:0 0 0 1px rgba(0,0,0,0.1); }
.tmkt-card-btn {
  width:100%; padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-default);
  background:var(--bg-white); color:var(--text-primary); font-size:13px; font-weight:600;
  cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:6px;
}
.tmkt-card-btn:hover { background:var(--brand-primary); color:#fff; border-color:var(--brand-primary); }

/* Steps */
.tmkt-steps { display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; }
.tmkt-step {
  flex:1; min-width:180px; text-align:center; padding:24px 16px;
  background:var(--bg-white); border-radius:var(--radius-lg); border:1px solid var(--border-default);
}
.tmkt-step-num {
  width:36px; height:36px; border-radius:50%; background:var(--brand-primary); color:#fff;
  display:inline-flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; margin-bottom:12px;
}
.tmkt-step h3 { font-size:15px; font-weight:700; color:var(--text-title); margin-bottom:4px; }
.tmkt-step p { font-size:13px; color:var(--text-secondary); }
.tmkt-step-arrow { color:var(--text-tertiary); font-size:18px; flex-shrink:0; }

@media (max-width:768px) {
  .tmkt-hero-title { font-size:24px; }
  .tmkt-grid { grid-template-columns:1fr; }
  .tmkt-frameworks { flex-direction:column; }
  .tmkt-step-arrow { transform:rotate(90deg); }
}
`

// ═══════════════════════════════════════════════════════
// JavaScript
// ═══════════════════════════════════════════════════════
function templateMarketScript(lang: Lang): string {
  return `
  function filterThemes(category) {
    document.querySelectorAll('.tmkt-filter').forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.tmkt-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function previewTheme(themeId) {
    // Preview using the first mock project
    const previewUrl = '/project/proj-001/deck?theme=' + themeId + '&framework=classic${lang === 'en' ? '&lang=en' : ''}';
    window.open(previewUrl, '_blank');
  }
  `
}
