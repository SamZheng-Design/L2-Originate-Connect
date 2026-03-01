// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 叙事引擎 V5.0 (Major Overhaul)
// 根据行业+叙事框架，决定幻灯片顺序和内容深度
// V5 改进：
//   ① headline 不再重复 body 内容，改为简短金句/钩子
//   ② 每个框架都包含更完整的slide顺序（增加projections/roadmap/testimonials）
//   ③ 所有 text_block 改为 2col/3col 布局以增加视觉丰富度
//   ④ 充分利用 traction.partnerships / mediaOrAwards / product.techStack 数据
//   ⑤ 增加 projections 幻灯片（3年收入预测图表）
//   ⑥ 增加 roadmap 幻灯片（未来里程碑）
//   ⑦ 增加 customer_testimonials 幻灯片（合作伙伴+媒体/奖项）
// ═══════════════════════════════════════════════════════

import type {
  NarrativeFramework, SlideData, SlideType, DeckStructuredData,
  CoverContent, KPIGridContent, ChartContent, TextBlockContent,
  ComparisonContent, TimelineContent, TeamContent, FinancingAskContent,
  MetricsContent, KPIItem, QuoteContent
} from './types'

// ---- 叙事框架 → 幻灯片顺序 (V5: 更完整) ----
const FRAMEWORK_SLIDE_ORDER: Record<NarrativeFramework, SlideType[]> = {
  classic: [
    'cover', 'company_overview', 'problem', 'solution', 'product',
    'market', 'business_model', 'traction', 'financials',
    'growth_metrics', 'competitive_advantage',
    'team', 'customer_testimonials', 'financing_ask', 'roadmap', 'closing',
  ],
  yc: [
    'cover', 'traction', 'growth_metrics', 'problem', 'solution', 'product',
    'market', 'business_model', 'unit_economics', 'financials',
    'competitive_advantage', 'team', 'financing_ask', 'closing',
  ],
  drip: [
    'cover', 'company_overview', 'unit_economics', 'financials',
    'growth_metrics', 'market', 'business_model', 'competitive_advantage',
    'traction', 'team', 'financing_ask', 'roadmap', 'closing',
  ],
  storytelling: [
    'cover', 'problem', 'solution', 'product', 'traction',
    'customer_testimonials', 'market', 'team',
    'financials', 'growth_metrics', 'financing_ask', 'closing',
  ],
  data_heavy: [
    'cover', 'growth_metrics', 'financials', 'unit_economics',
    'business_model', 'market', 'competitive_advantage', 'traction',
    'team', 'financing_ask', 'closing',
  ],
}

// ---- 语言工具 ----
type Lang = 'zh' | 'en'
function bi(zh: string, en: string): { zh: string; en: string } {
  return { zh, en }
}
function t(obj: { zh: string; en: string }, lang: Lang): string {
  return lang === 'en' ? obj.en : obj.zh
}
function fmtMoney(val: number, lang: Lang): string {
  if (lang === 'en') {
    if (val >= 10000) return `¥${(val / 10000).toFixed(1)}B`
    if (val >= 100) return `¥${(val / 100).toFixed(1)}M`
    return `¥${val * 10}K`
  }
  if (val >= 10000) return `¥${(val / 10000).toFixed(1)}亿`
  return `¥${val}万`
}

// ---- 缩短文本工具（避免headline过长）----
function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.substring(0, maxLen - 1) + '…'
}

// ═══════════════════════════════════════════════════════
// 核心函数：根据数据+框架生成幻灯片数据
// ═══════════════════════════════════════════════════════

export function generateSlideData(
  data: DeckStructuredData,
  framework: NarrativeFramework,
  lang: Lang,
  industryIcon: string
): SlideData[] {
  const order = FRAMEWORK_SLIDE_ORDER[framework]
  const slides: SlideData[] = []

  for (const slideType of order) {
    const slide = buildSlide(slideType, data, lang, industryIcon)
    if (slide) slides.push(slide)
  }

  return slides
}

// ---- 每种SlideType的构建逻辑 ----

function buildSlide(
  type: SlideType,
  data: DeckStructuredData,
  lang: Lang,
  industryIcon: string
): SlideData | null {
  switch (type) {
    case 'cover': return buildCover(data, lang, industryIcon)
    case 'company_overview': return buildCompanyOverview(data, lang)
    case 'problem': return buildProblem(data, lang)
    case 'solution': return buildSolution(data, lang)
    case 'product': return buildProduct(data, lang)
    case 'business_model': return buildBusinessModel(data, lang)
    case 'market': return buildMarket(data, lang)
    case 'traction': return buildTraction(data, lang)
    case 'financials': return buildFinancials(data, lang)
    case 'unit_economics': return buildUnitEconomics(data, lang)
    case 'growth_metrics': return buildGrowthMetrics(data, lang)
    case 'competitive_advantage': return buildCompetitiveAdvantage(data, lang)
    case 'team': return buildTeam(data, lang)
    case 'financing_ask': return buildFinancingAsk(data, lang)
    case 'customer_testimonials': return buildCustomerTestimonials(data, lang)
    case 'roadmap': return buildRoadmap(data, lang)
    case 'closing': return buildClosing(data, lang)
    default: return null
  }
}

// ═══════════════════════════════════════════════════════
// 每页幻灯片的具体构建函数 (V5 全面升级)
// ═══════════════════════════════════════════════════════

function buildCover(d: DeckStructuredData, lang: Lang, industryIcon: string): SlideData {
  return {
    type: 'cover',
    title: bi(d.company.name, d.company.name),
    subtitle: bi(d.narrative.oneLineHook, d.narrative.oneLineHook),
    content: {
      kind: 'cover',
      companyName: d.company.name,
      tagline: d.narrative.oneLineHook,
      industry: d.market.targetCustomer || '',
      industryIcon,
      foundedDate: d.company.foundedDate,
      location: d.company.address?.split('市')[0] + (lang === 'zh' ? '市' : ''),
    } as CoverContent,
  }
}

function buildCompanyOverview(d: DeckStructuredData, lang: Lang): SlideData {
  const items: KPIItem[] = [
    {
      label: bi('创立时间', 'Founded'),
      value: d.company.foundedDate,
      icon: 'fa-calendar-alt',
    },
    {
      label: bi('团队规模', 'Team Size'),
      value: `${d.company.employees}${lang === 'zh' ? '人' : ' people'}`,
      icon: 'fa-users',
    },
    {
      label: bi('注册资本', 'Registered Capital'),
      value: d.company.registeredCapital,
      icon: 'fa-coins',
    },
    {
      label: bi('月营收', 'Monthly Revenue'),
      value: fmtMoney(d.financials.monthlyRevenue, lang),
      icon: 'fa-chart-line',
      changeType: 'positive',
      change: `+${d.financials.monthlyGrowthRate}%`,
    },
    {
      label: bi('毛利率', 'Gross Margin'),
      value: `${d.financials.grossMargin}%`,
      icon: 'fa-percentage',
      changeType: d.financials.grossMargin > 40 ? 'positive' : 'neutral',
    },
    {
      label: bi('所在地', 'Location'),
      value: d.company.address?.split('区')[0] + (d.company.address?.includes('区') ? '区' : ''),
      icon: 'fa-map-marker-alt',
    },
  ]
  return {
    type: 'company_overview',
    title: bi('公司简介', 'Company Overview'),
    // ★ headline 用短描述，不再重复长段落
    headline: bi(
      truncate(d.company.description, 80),
      truncate(d.company.description, 80)
    ),
    content: { kind: 'kpi_grid', items } as KPIGridContent,
  }
}

function buildProblem(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: headline 用独立的短钩子，body 用完整阐述
  const hookZh = extractFirstSentence(d.narrative.problemStatement)
  const hookEn = hookZh // 同语言内容

  return {
    type: 'problem',
    title: bi('行业痛点', 'The Problem'),
    // ★ headline 只取第一句（钩子），不重复全段
    headline: bi(truncate(hookZh, 60), truncate(hookEn, 60)),
    content: {
      kind: 'text_block',
      sections: [
        {
          title: t(bi('核心痛点', 'Core Pain Point'), lang),
          icon: 'fa-exclamation-triangle',
          body: d.narrative.problemStatement,
          highlight: true,
        },
        {
          title: t(bi('为什么是现在', 'Why Now'), lang),
          icon: 'fa-clock',
          body: d.narrative.whyNow,
        },
        {
          title: t(bi('市场机遇', 'Market Opportunity'), lang),
          icon: 'fa-bullseye',
          body: `${t(bi('市场规模', 'Market Size'), lang)}: ${d.market.size}${d.market.growth ? `\n${t(bi('增速', 'Growth'), lang)}: ${d.market.growth}` : ''}`,
        },
      ],
      layout: '3col', // ★ V5: 改为3列布局
    } as TextBlockContent,
  }
}

function buildSolution(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: headline 用简短方案概要，body 用详细阐述
  const hookZh = extractFirstSentence(d.narrative.solutionStatement)

  const sections = [
    {
      title: t(bi('我们的方案', 'Our Solution'), lang),
      icon: 'fa-lightbulb',
      body: d.narrative.solutionStatement,
      highlight: true,
    },
  ]

  // ★ V5: differentiators 改为独立卡片（每个一段），不再用 | 分隔
  if (d.product?.differentiators?.length) {
    // 取前3个最重要的差异化要素
    const topDiffs = d.product.differentiators.slice(0, 3)
    topDiffs.forEach((df, i) => {
      const icons = ['fa-star', 'fa-shield-alt', 'fa-rocket']
      sections.push({
        title: `${t(bi('核心优势', 'Key Advantage'), lang)} ${i + 1}`,
        icon: icons[i] || 'fa-check',
        body: df,
        highlight: false,
      })
    })
  }

  return {
    type: 'solution',
    title: bi('解决方案', 'The Solution'),
    headline: bi(truncate(hookZh, 60), truncate(hookZh, 60)),
    content: {
      kind: 'text_block',
      sections,
      layout: sections.length >= 4 ? '2col' : '1col',
    } as TextBlockContent,
  }
}

function buildProduct(d: DeckStructuredData, lang: Lang): SlideData {
  const sections: { title: string; icon: string; body: string; highlight?: boolean }[] = []

  if (d.product?.description) {
    sections.push({
      title: t(bi('产品描述', 'Product Description'), lang),
      icon: 'fa-cube',
      body: d.product.description,
      highlight: true,
    })
  }

  // ★ V5: 差异化要素以列表形式展示（每项换行）
  if (d.product?.differentiators?.length) {
    sections.push({
      title: t(bi('核心壁垒', 'Core Moat'), lang),
      icon: 'fa-shield-alt',
      body: d.product.differentiators.map((df, i) => `${i + 1}. ${df}`).join('\n'),
    })
  }

  // ★ V5: 技术栈作为独立卡片
  if (d.product?.techStack) {
    sections.push({
      title: t(bi('技术架构', 'Tech Stack'), lang),
      icon: 'fa-code',
      body: d.product.techStack,
    })
  }

  return {
    type: 'product',
    title: bi('产品与服务', 'Product & Service'),
    headline: d.product?.description
      ? bi(truncate(d.product.description, 60), truncate(d.product.description, 60))
      : undefined,
    content: {
      kind: 'text_block',
      sections,
      layout: sections.length >= 3 ? '3col' : '2col',
    } as TextBlockContent,
  }
}

function buildBusinessModel(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: headline 用短的投资逻辑钩子而非全段
  const hookZh = extractFirstSentence(d.narrative.investmentThesis)

  const costData = d.financials.costStructure
  return {
    type: 'business_model',
    title: bi('商业模式', 'Business Model'),
    headline: bi(truncate(hookZh, 70), truncate(hookZh, 70)),
    content: {
      kind: 'chart',
      chartType: 'doughnut',
      chartData: {
        labels: costData.map(c => c.item),
        datasets: [{
          label: t(bi('成本结构', 'Cost Structure'), lang),
          data: costData.map(c => c.percentage),
        }],
      },
      kpiHighlights: [
        {
          label: bi('月收入', 'Monthly Revenue'),
          value: fmtMoney(d.financials.monthlyRevenue, lang),
          icon: 'fa-chart-line',
          changeType: 'positive',
          change: `+${d.financials.monthlyGrowthRate}%/月`,
        },
        {
          label: bi('毛利率', 'Gross Margin'),
          value: `${d.financials.grossMargin}%`,
          icon: 'fa-percentage',
          changeType: d.financials.grossMargin > 40 ? 'positive' : 'neutral',
        },
        {
          label: bi('净利率', 'Net Margin'),
          value: `${d.financials.netMargin}%`,
          icon: 'fa-chart-pie',
          changeType: d.financials.netMargin > 15 ? 'positive' : 'neutral',
        },
      ],
      // ★ V5: summary 用短句而非长段
      summary: t(bi(
        `年化收入 ${d.financials.annualRevenue ? fmtMoney(d.financials.annualRevenue, 'zh') : fmtMoney(d.financials.monthlyRevenue * 12, 'zh')}，月增长 ${d.financials.monthlyGrowthRate}%`,
        `Annual revenue ${d.financials.annualRevenue ? fmtMoney(d.financials.annualRevenue, 'en') : fmtMoney(d.financials.monthlyRevenue * 12, 'en')}, ${d.financials.monthlyGrowthRate}% MoM growth`
      ), lang),
    } as ChartContent,
  }
}

function buildMarket(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: 市场分析改为text_block+2col，更好展示长文本
  const sections: { title: string; icon: string; body: string; highlight?: boolean }[] = [
    {
      title: t(bi('市场规模', 'Market Size'), lang),
      icon: 'fa-globe',
      body: `${d.market.size}${d.market.growth ? `，${d.market.growth}` : ''}`,
      highlight: true,
    },
    {
      title: t(bi('目标客户', 'Target Customer'), lang),
      icon: 'fa-users',
      body: d.market.targetCustomer || d.market.size,
    },
    {
      title: t(bi('竞争格局', 'Competitive Landscape'), lang),
      icon: 'fa-chess',
      body: d.market.competitors,
    },
    {
      title: t(bi('竞争壁垒', 'Competitive Moat'), lang),
      icon: 'fa-shield-alt',
      body: d.market.moat,
    },
  ]

  return {
    type: 'market',
    title: bi('市场分析', 'Market Analysis'),
    headline: d.market.marketPosition
      ? bi(truncate(d.market.marketPosition, 70), truncate(d.market.marketPosition, 70))
      : bi(`${d.market.size} ${t(bi('市场', 'Market'), lang)}${d.market.growth ? `，${d.market.growth}` : ''}`,
           `${d.market.size} market${d.market.growth ? `, ${d.market.growth}` : ''}`),
    content: {
      kind: 'text_block',
      sections,
      layout: '2col',
    } as TextBlockContent,
  }
}

function buildTraction(d: DeckStructuredData, lang: Lang): SlideData {
  if (d.traction?.milestones?.length) {
    // ★ V5: 只展示已完成的里程碑（未来的留给Roadmap页）
    const achievedMilestones = d.traction.milestones.filter(m => m.achieved)
    const displayMilestones = achievedMilestones.length > 0 ? achievedMilestones : d.traction.milestones

    return {
      type: 'traction',
      title: bi('发展历程', 'Traction & Milestones'),
      headline: d.traction.customers
        ? bi(truncate(d.traction.customers, 70), truncate(d.traction.customers, 70))
        : undefined,
      content: {
        kind: 'timeline',
        milestones: displayMilestones.map(m => ({
          date: m.date,
          title: m.event,
          description: '',
          achieved: m.achieved,
        })),
      } as TimelineContent,
    }
  }

  // Fallback: 用收入趋势图
  if (d.financials.revenueHistory?.length) {
    return {
      type: 'traction',
      title: bi('增长趋势', 'Growth Trajectory'),
      content: {
        kind: 'chart',
        chartType: 'line',
        chartData: {
          labels: d.financials.revenueHistory.map(r => r.month),
          datasets: [{
            label: t(bi('月收入(万)', 'Monthly Revenue(10K)'), lang),
            data: d.financials.revenueHistory.map(r => r.revenue),
          }],
        },
        kpiHighlights: [
          { label: bi('月增长率', 'Monthly Growth'), value: `${d.financials.monthlyGrowthRate}%`, changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
        ],
      } as ChartContent,
    }
  }

  return {
    type: 'traction',
    title: bi('发展历程', 'Milestones'),
    content: {
      kind: 'text_block',
      sections: [
        { title: t(bi('关键成就', 'Key Achievements'), lang), icon: 'fa-trophy', body: d.traction?.customers || t(bi('持续增长中', 'Growing steadily'), lang) },
      ],
      layout: '1col',
    } as TextBlockContent,
  }
}

function buildFinancials(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: 优先展示projections（3年预测）的柱状图 + KPI卡片
  // 如果有projections，用堆叠/对比视图
  if (d.financials.projections?.length) {
    return {
      type: 'financials',
      title: bi('财务亮点', 'Financial Highlights'),
      headline: bi(
        `月收入 ${fmtMoney(d.financials.monthlyRevenue, 'zh')}，月增长 ${d.financials.monthlyGrowthRate}%`,
        `${fmtMoney(d.financials.monthlyRevenue, 'en')} monthly revenue, ${d.financials.monthlyGrowthRate}% MoM`
      ),
      content: {
        kind: 'chart',
        chartType: 'bar',
        chartData: {
          labels: d.financials.projections.map(p => p.year + (lang === 'zh' ? '年' : '')),
          datasets: [{
            label: t(bi('年收入预测(万)', 'Revenue Projection(10K)'), lang),
            data: d.financials.projections.map(p => p.revenue),
          }],
        },
        kpiHighlights: [
          { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
          { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage', changeType: d.financials.grossMargin > 40 ? 'positive' : 'neutral' },
          { label: bi('净利率', 'Net Margin'), value: `${d.financials.netMargin}%`, icon: 'fa-chart-pie', changeType: d.financials.netMargin > 15 ? 'positive' : 'neutral' },
          ...(d.financials.annualRevenue ? [{ label: bi('年化收入', 'Annual Rev'), value: fmtMoney(d.financials.annualRevenue, lang), icon: 'fa-calendar-check', changeType: 'positive' as const }] : []),
        ],
      } as ChartContent,
    }
  }

  // Fallback: 月度收入趋势
  const chartData = d.financials.revenueHistory?.length
    ? {
        labels: d.financials.revenueHistory.map(r => r.month),
        datasets: [{
          label: t(bi('月收入(万)', 'Monthly Revenue(10K)'), lang),
          data: d.financials.revenueHistory.map(r => r.revenue),
        }],
      }
    : {
        labels: [t(bi('收入', 'Revenue'), lang), t(bi('成本', 'Cost'), lang), t(bi('利润', 'Profit'), lang)],
        datasets: [{
          label: t(bi('财务(万)', 'Financials(10K)'), lang),
          data: [
            d.financials.monthlyRevenue,
            d.financials.monthlyRevenue * (1 - d.financials.netMargin / 100),
            d.financials.monthlyRevenue * d.financials.netMargin / 100,
          ],
        }],
      }

  return {
    type: 'financials',
    title: bi('财务亮点', 'Financial Highlights'),
    headline: bi(
      `月收入 ${fmtMoney(d.financials.monthlyRevenue, 'zh')}，月增长 ${d.financials.monthlyGrowthRate}%`,
      `${fmtMoney(d.financials.monthlyRevenue, 'en')} monthly revenue, ${d.financials.monthlyGrowthRate}% MoM`
    ),
    content: {
      kind: 'chart',
      chartType: d.financials.revenueHistory?.length ? 'line' : 'bar',
      chartData,
      kpiHighlights: [
        { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
        { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage' },
        { label: bi('净利率', 'Net Margin'), value: `${d.financials.netMargin}%`, icon: 'fa-chart-pie' },
      ],
    } as ChartContent,
  }
}

function buildUnitEconomics(d: DeckStructuredData, lang: Lang): SlideData {
  const ue = d.financials.unitEconomics
  const items: KPIItem[] = []

  // ★ V5: 更好的展示顺序——先展示最关键的 LTV/CAC，再展示行业特有指标
  if (ue?.lifetimeValue && ue?.customerAcquisitionCost) {
    const ratio = (ue.lifetimeValue / ue.customerAcquisitionCost).toFixed(1)
    items.push({
      label: bi('LTV/CAC', 'LTV/CAC'),
      value: `${ratio}x`,
      icon: 'fa-balance-scale',
      changeType: 'positive',
      description: t(bi('客户终身价值/获客成本', 'Lifetime Value / Acquisition Cost'), lang),
    })
  }
  if (ue?.paybackPeriod) items.push({ label: bi('回本周期', 'Payback'), value: ue.paybackPeriod, icon: 'fa-hourglass-half', changeType: 'positive' })
  if (ue?.revenuePerSqm) items.push({ label: bi('月坪效', 'Rev/sqm'), value: `¥${ue.revenuePerSqm.toLocaleString()}`, icon: 'fa-ruler-combined', changeType: 'positive', description: t(bi('元/平方米/月', '¥/sqm/mo'), lang) })
  if (ue?.tablesTurnover) items.push({ label: bi('翻台率', 'Table Turnover'), value: `${ue.tablesTurnover}x`, icon: 'fa-sync', changeType: 'positive', description: t(bi('次/天', 'times/day'), lang) })
  if (ue?.averageOrderValue) items.push({ label: bi('客单价', 'AOV'), value: `¥${ue.averageOrderValue}`, icon: 'fa-receipt' })
  if (ue?.customerAcquisitionCost) items.push({ label: bi('获客成本', 'CAC'), value: `¥${ue.customerAcquisitionCost}`, icon: 'fa-user-plus' })
  if (ue?.lifetimeValue) items.push({ label: bi('客户终身价值', 'LTV'), value: `¥${ue.lifetimeValue.toLocaleString()}`, icon: 'fa-gem', changeType: 'positive' })
  if (ue?.monthlyRecurring) items.push({ label: bi('MRR', 'MRR'), value: fmtMoney(ue.monthlyRecurring, lang), icon: 'fa-recycle', changeType: 'positive' })
  if (ue?.annualRecurring) items.push({ label: bi('ARR', 'ARR'), value: fmtMoney(ue.annualRecurring, lang), icon: 'fa-calendar-check', changeType: 'positive' })
  if (ue?.churnRate !== undefined) items.push({ label: bi('月流失率', 'Churn Rate'), value: `${ue.churnRate}%`, icon: 'fa-door-open', changeType: ue.churnRate < 5 ? 'positive' : 'negative' })

  // Ensure we have at least some items
  if (items.length === 0) {
    items.push(
      { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive' },
      { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage' },
      { label: bi('月增长', 'Growth'), value: `${d.financials.monthlyGrowthRate}%`, icon: 'fa-chart-line', changeType: 'positive' },
    )
  }

  // ★ V5: headline 用关键指标组合
  const headlineZh = ue?.lifetimeValue && ue?.customerAcquisitionCost
    ? `LTV/CAC = ${(ue.lifetimeValue / ue.customerAcquisitionCost).toFixed(1)}x${ue?.paybackPeriod ? ` · 回本 ${ue.paybackPeriod}` : ''}`
    : `毛利率 ${d.financials.grossMargin}% · 月增长 ${d.financials.monthlyGrowthRate}%`
  const headlineEn = ue?.lifetimeValue && ue?.customerAcquisitionCost
    ? `LTV/CAC = ${(ue.lifetimeValue / ue.customerAcquisitionCost).toFixed(1)}x${ue?.paybackPeriod ? ` · Payback: ${ue.paybackPeriod}` : ''}`
    : `${d.financials.grossMargin}% Gross Margin · ${d.financials.monthlyGrowthRate}% MoM`

  return {
    type: 'unit_economics',
    title: bi('单位经济模型', 'Unit Economics'),
    headline: bi(headlineZh, headlineEn),
    content: { kind: 'kpi_grid', items } as KPIGridContent,
  }
}

function buildGrowthMetrics(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: 用收入趋势线图（如果有月度数据）
  if (d.financials.revenueHistory?.length) {
    return {
      type: 'growth_metrics',
      title: bi('增长指标', 'Growth Metrics'),
      headline: bi(
        `连续${d.financials.revenueHistory.length}个月正增长，月均增速${d.financials.monthlyGrowthRate}%`,
        `${d.financials.revenueHistory.length} consecutive months of growth, ${d.financials.monthlyGrowthRate}% avg MoM`
      ),
      content: {
        kind: 'chart',
        chartType: 'line',
        chartData: {
          labels: d.financials.revenueHistory.map(r => r.month),
          datasets: [{
            label: t(bi('月收入(万)', 'Monthly Revenue(10K)'), lang),
            data: d.financials.revenueHistory.map(r => r.revenue),
          }],
        },
        kpiHighlights: [
          { label: bi('月增长率', 'Monthly Growth'), value: `${d.financials.monthlyGrowthRate}%`, changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%`, icon: 'fa-arrow-up' },
          {
            label: bi('年化收入', 'Annual Rev'),
            value: d.financials.annualRevenue
              ? fmtMoney(d.financials.annualRevenue, lang)
              : fmtMoney(d.financials.monthlyRevenue * 12, lang),
            changeType: 'positive',
            icon: 'fa-calendar-check',
          },
          {
            label: bi('最新月收入', 'Latest Monthly'),
            value: fmtMoney(d.financials.monthlyRevenue, lang),
            changeType: 'positive',
            icon: 'fa-coins',
          },
        ],
      } as ChartContent,
    }
  }

  // Fallback to KPI grid
  return {
    type: 'growth_metrics',
    title: bi('增长指标', 'Growth Metrics'),
    content: {
      kind: 'kpi_grid',
      items: [
        { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive' },
        { label: bi('月增长', 'Growth'), value: `${d.financials.monthlyGrowthRate}%`, icon: 'fa-chart-line', changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
        { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage' },
        { label: bi('净利率', 'Net Margin'), value: `${d.financials.netMargin}%`, icon: 'fa-chart-pie' },
      ],
    } as KPIGridContent,
  }
}

function buildCompetitiveAdvantage(d: DeckStructuredData, lang: Lang): SlideData {
  // ★ V5: 使用 comparison 格式（我们 vs 竞品）如果数据丰富，否则用 text_block 2col
  const sections: { title: string; icon: string; body: string; highlight?: boolean }[] = [
    { title: t(bi('核心壁垒', 'Core Moat'), lang), icon: 'fa-shield-alt', body: d.market.moat, highlight: true },
    { title: t(bi('竞争格局', 'Competitive Landscape'), lang), icon: 'fa-chess', body: d.market.competitors },
  ]
  if (d.market.marketPosition) {
    sections.push({ title: t(bi('市场定位', 'Market Position'), lang), icon: 'fa-crosshairs', body: d.market.marketPosition })
  }
  if (d.narrative.investmentThesis) {
    sections.push({ title: t(bi('投资逻辑', 'Investment Thesis'), lang), icon: 'fa-brain', body: d.narrative.investmentThesis, highlight: true })
  }

  return {
    type: 'competitive_advantage',
    title: bi('竞争优势', 'Competitive Advantage'),
    headline: d.market.marketPosition
      ? bi(truncate(d.market.marketPosition, 70), truncate(d.market.marketPosition, 70))
      : undefined,
    content: {
      kind: 'text_block',
      sections,
      layout: '2col', // ★ V5: 改为2列
    } as TextBlockContent,
  }
}

function buildTeam(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'team',
    title: bi('核心团队', 'Core Team'),
    // ★ V5: headline 用创始人最关键的背景亮点
    headline: bi(
      truncate(d.team.founderBackground.split('，')[0] + '——' + (d.team.advisors?.[0]?.split('（')[0] || '核心团队来自行业头部'), 70),
      truncate(d.team.founderBackground.split('，')[0], 70)
    ),
    content: {
      kind: 'team',
      members: d.team.keyMembers.map(m => ({
        name: m.name,
        role: m.role,
        background: m.background,
      })),
      teamSize: d.team.teamSize,
      teamHighlight: d.team.founderBackground,
    } as TeamContent,
  }
}

function buildFinancingAsk(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'financing_ask',
    title: bi('融资需求', 'The Ask'),
    headline: bi(
      `融资 ${fmtMoney(d.financing.amount, 'zh')}，分成比例 ${d.financing.expectedShareRatio}%`,
      `Raising ${fmtMoney(d.financing.amount, 'en')} at ${d.financing.expectedShareRatio}% revenue share`
    ),
    content: {
      kind: 'financing_ask',
      amount: fmtMoney(d.financing.amount, lang),
      shareRatio: `${d.financing.expectedShareRatio}%`,
      purpose: d.financing.purpose,
      urgency: d.financing.urgency === 'high' ? (lang === 'zh' ? '高' : 'High') : d.financing.urgency === 'medium' ? (lang === 'zh' ? '中等' : 'Medium') : (lang === 'zh' ? '低' : 'Low'),
      useOfFunds: d.financing.useOfFunds,
      contactInfo: d.financing.expectedROI || undefined,
    } as FinancingAskContent,
  }
}

// ═══════════════════════════════════════════════════════
// ★ V5 新增幻灯片类型
// ═══════════════════════════════════════════════════════

function buildCustomerTestimonials(d: DeckStructuredData, lang: Lang): SlideData | null {
  // ★ V5 新增: 展示合作伙伴、媒体报道、奖项
  if (!d.traction) return null

  const hasPartnerships = d.traction.partnerships && d.traction.partnerships.length > 0
  const hasMedia = d.traction.mediaOrAwards && d.traction.mediaOrAwards.length > 0
  const hasAdvisors = d.team.advisors && d.team.advisors.length > 0

  if (!hasPartnerships && !hasMedia && !hasAdvisors) return null

  const sections: { title: string; icon: string; body: string; highlight?: boolean }[] = []

  if (hasPartnerships) {
    sections.push({
      title: t(bi('战略合作伙伴', 'Strategic Partners'), lang),
      icon: 'fa-handshake',
      body: d.traction.partnerships!.map((p, i) => `${i + 1}. ${p}`).join('\n'),
      highlight: true,
    })
  }

  if (hasMedia) {
    sections.push({
      title: t(bi('媒体报道 & 奖项', 'Media & Awards'), lang),
      icon: 'fa-newspaper',
      body: d.traction.mediaOrAwards!.map((m, i) => `🏆 ${m}`).join('\n'),
    })
  }

  if (hasAdvisors) {
    sections.push({
      title: t(bi('行业顾问', 'Industry Advisors'), lang),
      icon: 'fa-user-graduate',
      body: d.team.advisors!.map((a, i) => `${i + 1}. ${a}`).join('\n'),
    })
  }

  return {
    type: 'customer_testimonials',
    title: bi('合作与认可', 'Partnerships & Recognition'),
    headline: bi(
      `${hasPartnerships ? d.traction.partnerships!.length + '家战略合作' : ''}${hasMedia ? (hasPartnerships ? ' · ' : '') + d.traction.mediaOrAwards!.length + '项行业荣誉' : ''}`,
      `${hasPartnerships ? d.traction.partnerships!.length + ' strategic partners' : ''}${hasMedia ? (hasPartnerships ? ' · ' : '') + d.traction.mediaOrAwards!.length + ' industry awards' : ''}`
    ),
    content: {
      kind: 'text_block',
      sections,
      layout: sections.length >= 3 ? '3col' : '2col',
    } as TextBlockContent,
  }
}

function buildRoadmap(d: DeckStructuredData, lang: Lang): SlideData | null {
  // ★ V5 新增: 展示未来里程碑
  if (!d.traction?.milestones) return null

  const futureMilestones = d.traction.milestones.filter(m => !m.achieved)
  if (futureMilestones.length === 0) return null

  return {
    type: 'roadmap',
    title: bi('发展路线图', 'Roadmap'),
    headline: bi(
      truncate(d.narrative.vision, 70),
      truncate(d.narrative.vision, 70)
    ),
    content: {
      kind: 'timeline',
      milestones: futureMilestones.map(m => ({
        date: m.date,
        title: m.event,
        description: '',
        achieved: m.achieved,
      })),
    } as TimelineContent,
  }
}

function buildClosing(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'closing',
    title: bi(d.company.name, d.company.name),
    headline: bi(d.narrative.vision, d.narrative.vision),
    content: {
      kind: 'cover',
      companyName: d.company.name,
      tagline: d.narrative.vision,
      industry: '',
      industryIcon: 'fa-handshake',
    } as CoverContent,
  }
}

// ═══════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════

/** 提取第一句话（中文用句号、分号断开）*/
function extractFirstSentence(text: string): string {
  // 先尝试中文句号
  const zhMatch = text.match(/^(.+?)[。；！]/)
  if (zhMatch) return zhMatch[1]
  // 再尝试英文句号
  const enMatch = text.match(/^(.+?)[.;!]/)
  if (enMatch && enMatch[1].length > 10) return enMatch[1]
  // 尝试破折号/逗号
  const dashMatch = text.match(/^(.+?)[——、]/)
  if (dashMatch && dashMatch[1].length > 15 && dashMatch[1].length < 60) return dashMatch[1]
  // 兜底：截取
  return truncate(text, 55)
}
