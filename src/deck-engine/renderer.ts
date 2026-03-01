// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 幻灯片HTML渲染器
// 根据 SlideData + DeckTheme 输出精美 HTML
// 包含 Chart.js 数据可视化 + 主题化组件
// ═══════════════════════════════════════════════════════

import type {
  SlideData, DeckTheme, SlideContent,
  CoverContent, KPIGridContent, ChartContent, TextBlockContent,
  ComparisonContent, TimelineContent, TeamContent, FinancingAskContent,
  MetricsContent, KPIItem, QuoteContent
} from './types'

type Lang = 'zh' | 'en'
function t(obj: { zh: string; en: string }, lang: Lang): string {
  return lang === 'en' ? obj.en : obj.zh
}

// ═══════════════════════════════════════════════════════
// 核心渲染函数：一页 Slide → HTML
// ═══════════════════════════════════════════════════════

export function renderSlideHTML(slide: SlideData, theme: DeckTheme, lang: Lang, slideIndex: number, totalSlides: number): string {
  const content = slide.content
  let bodyHTML = ''

  switch (content.kind) {
    case 'cover': bodyHTML = renderCover(content, theme, lang, slide); break
    case 'kpi_grid': bodyHTML = renderKPIGrid(content, theme, lang); break
    case 'chart': bodyHTML = renderChart(content, theme, lang, slideIndex); break
    case 'text_block': bodyHTML = renderTextBlock(content, theme, lang); break
    case 'comparison': bodyHTML = renderComparison(content, theme, lang); break
    case 'timeline': bodyHTML = renderTimeline(content, theme, lang); break
    case 'team': bodyHTML = renderTeamSlide(content, theme, lang); break
    case 'financing_ask': bodyHTML = renderFinancingAsk(content, theme, lang); break
    case 'quote': bodyHTML = renderQuote(content, theme, lang); break
    default: bodyHTML = `<div class="s-fallback">Content not available</div>`
  }

  // Cover slide 和 Closing slide 不渲染header
  if (content.kind === 'cover') {
    return `<div class="slide s-theme-${theme.id}" data-type="${slide.type}">${bodyHTML}<div class="s-watermark">${slideIndex + 1}/${totalSlides}</div></div>`
  }

  const headerHTML = renderSlideHeader(slide, theme, lang)
  return `<div class="slide s-theme-${theme.id}" data-type="${slide.type}">
    ${headerHTML}
    <div class="s-body">${bodyHTML}</div>
    <div class="s-watermark">${slideIndex + 1}/${totalSlides}</div>
  </div>`
}

// ---- Slide Header ----
function renderSlideHeader(slide: SlideData, theme: DeckTheme, lang: Lang): string {
  const title = t(slide.title, lang)
  const headline = slide.headline ? t(slide.headline, lang) : ''
  const alignClass = theme.layout.headerStyle === 'center' ? 's-header-center' : theme.layout.headerStyle === 'minimal' ? 's-header-minimal' : ''

  return `<div class="s-header ${alignClass}">
    <h2 class="s-title">${title}</h2>
    ${headline ? `<p class="s-headline">${headline}</p>` : ''}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Cover Slide
// ═══════════════════════════════════════════════════════

function renderCover(c: CoverContent, theme: DeckTheme, lang: Lang, slide: SlideData): string {
  const isClosing = slide.type === 'closing'
  const coverClass = theme.layout.coverStyle

  return `<div class="s-cover s-cover-${coverClass}">
    <div class="s-cover-bg"></div>
    <div class="s-cover-content">
      ${!isClosing ? `<div class="s-cover-icon"><i class="fas ${c.industryIcon}"></i></div>` : ''}
      <h1 class="s-cover-title">${c.companyName}</h1>
      <p class="s-cover-tagline">${c.tagline}</p>
      ${c.foundedDate || c.location ? `
      <div class="s-cover-meta">
        ${c.foundedDate ? `<span><i class="fas fa-calendar"></i> ${c.foundedDate}</span>` : ''}
        ${c.location ? `<span><i class="fas fa-map-marker-alt"></i> ${c.location}</span>` : ''}
      </div>` : ''}
      ${isClosing ? `<div class="s-cover-cta">${lang === 'zh' ? '感谢聆听 · 期待合作' : 'Thank You · Let\'s Connect'}</div>` : ''}
    </div>
  </div>`
}

// ═══════════════════════════════════════════════════════
// KPI Grid
// ═══════════════════════════════════════════════════════

function renderKPIGrid(c: KPIGridContent, theme: DeckTheme, lang: Lang): string {
  const cols = c.items.length <= 3 ? c.items.length : c.items.length <= 4 ? 2 : 3
  const gridClass = `s-kpi-grid s-kpi-cols-${cols}`

  return `<div class="${gridClass}">
    ${c.items.map(item => renderKPICard(item, theme, lang)).join('')}
  </div>
  ${c.footnote ? `<div class="s-footnote">${c.footnote}</div>` : ''}`
}

function renderKPICard(item: KPIItem, theme: DeckTheme, lang: Lang): string {
  const changeClass = item.changeType === 'positive' ? 's-change-pos' : item.changeType === 'negative' ? 's-change-neg' : ''
  return `<div class="s-kpi-card">
    ${item.icon ? `<div class="s-kpi-icon"><i class="fas ${item.icon}"></i></div>` : ''}
    <div class="s-kpi-value">${item.value}</div>
    <div class="s-kpi-label">${t(item.label, lang)}</div>
    ${item.change ? `<div class="s-kpi-change ${changeClass}">${item.change}</div>` : ''}
    ${item.description ? `<div class="s-kpi-desc">${item.description}</div>` : ''}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Chart (rendered client-side with Chart.js)
// ═══════════════════════════════════════════════════════

function renderChart(c: ChartContent, theme: DeckTheme, lang: Lang, slideIndex: number): string {
  const chartId = `deck-chart-${slideIndex}`
  const chartDataJSON = JSON.stringify({
    type: c.chartType === 'horizontalBar' ? 'bar' : c.chartType === 'stackedBar' ? 'bar' : c.chartType,
    data: {
      labels: c.chartData.labels,
      datasets: c.chartData.datasets.map((ds, i) => ({
        ...ds,
        backgroundColor: ds.backgroundColor || (c.chartType === 'doughnut' || c.chartType === 'bar' || c.chartType === 'horizontalBar' || c.chartType === 'stackedBar' ? theme.colors.chartColors : undefined),
        borderColor: ds.borderColor || theme.colors.primary,
        borderWidth: c.chartType === 'line' ? 3 : 0,
        fill: c.chartType === 'line' ? 'origin' : undefined,
        tension: c.chartType === 'line' ? 0.4 : undefined,
        pointRadius: c.chartType === 'line' ? 4 : undefined,
        pointBackgroundColor: c.chartType === 'line' ? theme.colors.primary : undefined,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: c.chartType === 'horizontalBar' ? 'y' : 'x',
      plugins: {
        legend: { display: c.chartType === 'doughnut', position: 'right', labels: { color: theme.colors.text, font: { size: 11 } } },
      },
      scales: c.chartType === 'doughnut' || c.chartType === 'radar' ? undefined : {
        x: { ticks: { color: theme.colors.textSecondary, font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: theme.colors.textSecondary, font: { size: 10 } }, grid: { color: theme.colors.textSecondary + '20' } },
      },
    },
  })

  const kpiSection = c.kpiHighlights?.length ? `
    <div class="s-chart-kpis">
      ${c.kpiHighlights.map(k => renderKPICard(k, theme, lang)).join('')}
    </div>` : ''

  const hasKPI = c.kpiHighlights?.length
  const layoutClass = hasKPI ? 's-chart-layout-split' : 's-chart-layout-full'

  return `<div class="s-chart-container ${layoutClass}">
    <div class="s-chart-area">
      <canvas id="${chartId}" class="s-chart-canvas"></canvas>
      <script>
        (function(){
          var cfg = ${chartDataJSON};
          var el = document.getElementById('${chartId}');
          if(el && typeof Chart !== 'undefined') {
            new Chart(el.getContext('2d'), cfg);
          } else if(el) {
            // Retry after Chart.js loads
            var iv = setInterval(function(){
              if(typeof Chart !== 'undefined') {
                clearInterval(iv);
                new Chart(el.getContext('2d'), cfg);
              }
            }, 200);
            setTimeout(function(){ clearInterval(iv); }, 5000);
          }
        })();
      </script>
    </div>
    ${kpiSection}
  </div>
  ${c.summary ? `<div class="s-chart-summary">${c.summary}</div>` : ''}`
}

// ═══════════════════════════════════════════════════════
// Text Block
// ═══════════════════════════════════════════════════════

function renderTextBlock(c: TextBlockContent, theme: DeckTheme, lang: Lang): string {
  const layoutClass = c.layout === '3col' ? 's-text-3col' : c.layout === '2col' ? 's-text-2col' : 's-text-1col'
  return `<div class="s-text-block ${layoutClass}">
    ${c.sections.map(sec => `
      <div class="s-text-section ${sec.highlight ? 's-text-highlight' : ''}">
        <div class="s-text-section-header">
          ${sec.icon ? `<i class="fas ${sec.icon} s-text-icon"></i>` : ''}
          <h3 class="s-text-section-title">${sec.title}</h3>
        </div>
        <div class="s-text-section-body">${sec.body.replace(/\n/g, '<br>')}</div>
      </div>
    `).join('')}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Comparison Table
// ═══════════════════════════════════════════════════════

function renderComparison(c: ComparisonContent, theme: DeckTheme, lang: Lang): string {
  return `<div class="s-comparison">
    <div class="s-comp-header">
      <div class="s-comp-dim"></div>
      <div class="s-comp-us">${c.leftTitle}</div>
      <div class="s-comp-them">${c.rightTitle}</div>
    </div>
    ${c.items.map(item => `
      <div class="s-comp-row ${item.advantage ? 's-comp-advantage' : ''}">
        <div class="s-comp-dim">${item.dimension}</div>
        <div class="s-comp-us">${item.us}</div>
        <div class="s-comp-them">${item.them}</div>
      </div>
    `).join('')}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Timeline
// ═══════════════════════════════════════════════════════

function renderTimeline(c: TimelineContent, theme: DeckTheme, lang: Lang): string {
  return `<div class="s-timeline">
    ${c.milestones.map((m, i) => `
      <div class="s-timeline-item ${m.achieved ? 's-timeline-done' : 's-timeline-pending'}">
        <div class="s-timeline-dot">
          ${m.achieved ? '<i class="fas fa-check"></i>' : `<span>${i + 1}</span>`}
        </div>
        <div class="s-timeline-content">
          <div class="s-timeline-date">${m.date}</div>
          <div class="s-timeline-title">${m.title}</div>
          ${m.description ? `<div class="s-timeline-desc">${m.description}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Team
// ═══════════════════════════════════════════════════════

function renderTeamSlide(c: TeamContent, theme: DeckTheme, lang: Lang): string {
  return `<div class="s-team">
    ${c.teamHighlight ? `<div class="s-team-highlight"><i class="fas fa-quote-left"></i> ${c.teamHighlight}</div>` : ''}
    <div class="s-team-grid">
      ${c.members.map(m => `
        <div class="s-team-member">
          <div class="s-team-avatar"><i class="fas fa-user-circle"></i></div>
          <div class="s-team-info">
            <div class="s-team-name">${m.name}</div>
            <div class="s-team-role">${m.role}</div>
            <div class="s-team-bg">${m.background}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ${c.teamSize ? `<div class="s-team-size">${lang === 'zh' ? '团队总人数' : 'Total Team'}: <strong>${c.teamSize}</strong></div>` : ''}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Financing Ask
// ═══════════════════════════════════════════════════════

function renderFinancingAsk(c: FinancingAskContent, theme: DeckTheme, lang: Lang): string {
  const fundsPie = c.useOfFunds?.length ? `
    <div class="s-funds-chart">
      <h4 class="s-funds-title">${lang === 'zh' ? '资金用途' : 'Use of Funds'}</h4>
      <div class="s-funds-bars">
        ${c.useOfFunds.map((f, i) => `
          <div class="s-fund-item">
            <div class="s-fund-label">${f.item}</div>
            <div class="s-fund-bar-track">
              <div class="s-fund-bar-fill" style="width:${f.percentage}%; background:${theme.colors.chartColors[i % theme.colors.chartColors.length]};"></div>
            </div>
            <div class="s-fund-pct">${f.percentage}%</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''

  return `<div class="s-financing">
    <div class="s-financing-hero">
      <div class="s-financing-amount">${c.amount}</div>
      <div class="s-financing-label">${lang === 'zh' ? '目标融资额' : 'Target Raise'}</div>
    </div>
    <div class="s-financing-details">
      ${c.shareRatio ? `<div class="s-financing-detail"><i class="fas fa-percentage"></i><span class="s-fd-label">${lang === 'zh' ? '分成比例' : 'Share Ratio'}</span><span class="s-fd-value">${c.shareRatio}</span></div>` : ''}
      ${c.urgency ? `<div class="s-financing-detail"><i class="fas fa-clock"></i><span class="s-fd-label">${lang === 'zh' ? '紧急程度' : 'Urgency'}</span><span class="s-fd-value">${c.urgency}</span></div>` : ''}
      <div class="s-financing-detail"><i class="fas fa-bullseye"></i><span class="s-fd-label">${lang === 'zh' ? '融资用途' : 'Purpose'}</span><span class="s-fd-value">${c.purpose}</span></div>
    </div>
    ${fundsPie}
  </div>`
}

// ═══════════════════════════════════════════════════════
// Quote
// ═══════════════════════════════════════════════════════

function renderQuote(c: QuoteContent, theme: DeckTheme, lang: Lang): string {
  return `<div class="s-quote">
    <blockquote class="s-quote-text"><i class="fas fa-quote-left s-quote-icon"></i>${c.quote}</blockquote>
    ${c.author ? `<div class="s-quote-author">— ${c.author}${c.role ? `, ${c.role}` : ''}</div>` : ''}
  </div>`
}
