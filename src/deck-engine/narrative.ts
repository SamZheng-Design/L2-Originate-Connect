// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 叙事引擎 (Narrative Engine)
// 根据行业+叙事框架，决定幻灯片顺序和内容深度
// ═══════════════════════════════════════════════════════

import type {
  NarrativeFramework, SlideData, SlideType, DeckStructuredData,
  CoverContent, KPIGridContent, ChartContent, TextBlockContent,
  ComparisonContent, TimelineContent, TeamContent, FinancingAskContent,
  MetricsContent, KPIItem
} from './types'

// ---- 叙事框架 → 幻灯片顺序 ----
const FRAMEWORK_SLIDE_ORDER: Record<NarrativeFramework, SlideType[]> = {
  classic: [
    'cover', 'problem', 'solution', 'product', 'market',
    'business_model', 'traction', 'financials', 'competitive_advantage',
    'team', 'financing_ask', 'closing',
  ],
  yc: [
    'cover', 'traction', 'problem', 'solution', 'market',
    'business_model', 'financials', 'competitive_advantage',
    'team', 'financing_ask',
  ],
  drip: [
    'cover', 'company_overview', 'unit_economics', 'financials',
    'growth_metrics', 'market', 'competitive_advantage',
    'team', 'financing_ask', 'closing',
  ],
  storytelling: [
    'cover', 'problem', 'solution', 'product', 'traction',
    'market', 'team', 'financials', 'financing_ask', 'closing',
  ],
  data_heavy: [
    'cover', 'growth_metrics', 'financials', 'unit_economics',
    'market', 'competitive_advantage', 'traction',
    'team', 'financing_ask',
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
    case 'cover':
      return buildCover(data, lang, industryIcon)
    case 'company_overview':
      return buildCompanyOverview(data, lang)
    case 'problem':
      return buildProblem(data, lang)
    case 'solution':
      return buildSolution(data, lang)
    case 'product':
      return buildProduct(data, lang)
    case 'business_model':
      return buildBusinessModel(data, lang)
    case 'market':
      return buildMarket(data, lang)
    case 'traction':
      return buildTraction(data, lang)
    case 'financials':
      return buildFinancials(data, lang)
    case 'unit_economics':
      return buildUnitEconomics(data, lang)
    case 'growth_metrics':
      return buildGrowthMetrics(data, lang)
    case 'competitive_advantage':
      return buildCompetitiveAdvantage(data, lang)
    case 'team':
      return buildTeam(data, lang)
    case 'financing_ask':
      return buildFinancingAsk(data, lang)
    case 'closing':
      return buildClosing(data, lang)
    default:
      return null
  }
}

// ═══════════════════════════════════════════════════════
// 每页幻灯片的具体构建函数
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
    { label: bi('法人代表', 'Legal Person'), value: d.company.legalPerson, icon: 'fa-user-tie' },
    { label: bi('成立日期', 'Founded'), value: d.company.foundedDate, icon: 'fa-calendar-alt' },
    { label: bi('注册资本', 'Registered Capital'), value: d.company.registeredCapital, icon: 'fa-coins' },
    { label: bi('员工人数', 'Employees'), value: `${d.company.employees}${lang === 'zh' ? '人' : ''}`, icon: 'fa-users' },
    { label: bi('办公地址', 'Address'), value: d.company.address, icon: 'fa-map-marker-alt' },
  ]
  return {
    type: 'company_overview',
    title: bi('公司简介', 'Company Overview'),
    headline: bi(d.company.description, d.company.description),
    content: { kind: 'kpi_grid', items } as KPIGridContent,
  }
}

function buildProblem(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'problem',
    title: bi('行业痛点', 'The Problem'),
    headline: bi(d.narrative.problemStatement, d.narrative.problemStatement),
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
          body: `${t(bi('市场规模', 'Market Size'), lang)}: ${d.market.size}${d.market.growth ? ` | ${t(bi('增速', 'Growth'), lang)}: ${d.market.growth}` : ''}`,
        },
      ],
      layout: '1col',
    } as TextBlockContent,
  }
}

function buildSolution(d: DeckStructuredData, lang: Lang): SlideData {
  const sections = [
    {
      title: t(bi('我们的方案', 'Our Solution'), lang),
      icon: 'fa-lightbulb',
      body: d.narrative.solutionStatement,
      highlight: true,
    },
  ]
  if (d.product?.differentiators?.length) {
    sections.push({
      title: t(bi('核心差异', 'Key Differentiators'), lang),
      icon: 'fa-star',
      body: d.product.differentiators.map((df, i) => `${i + 1}. ${df}`).join('\n'),
      highlight: false,
    })
  }
  return {
    type: 'solution',
    title: bi('解决方案', 'The Solution'),
    headline: bi(d.narrative.solutionStatement, d.narrative.solutionStatement),
    content: { kind: 'text_block', sections, layout: '1col' } as TextBlockContent,
  }
}

function buildProduct(d: DeckStructuredData, lang: Lang): SlideData {
  const sections = []
  if (d.product?.description) {
    sections.push({ title: t(bi('产品描述', 'Product Description'), lang), icon: 'fa-cube', body: d.product.description })
  }
  if (d.product?.differentiators?.length) {
    sections.push({ title: t(bi('核心壁垒', 'Core Moat'), lang), icon: 'fa-shield-alt', body: d.product.differentiators.join(' | ') })
  }
  if (d.market.moat) {
    sections.push({ title: t(bi('竞争壁垒', 'Competitive Moat'), lang), icon: 'fa-trophy', body: d.market.moat, highlight: true })
  }
  return {
    type: 'product',
    title: bi('产品与服务', 'Product & Service'),
    content: { kind: 'text_block', sections, layout: sections.length > 2 ? '1col' : '2col' } as TextBlockContent,
  }
}

function buildBusinessModel(d: DeckStructuredData, lang: Lang): SlideData {
  // 用成本结构饼图 + KPI
  const costData = d.financials.costStructure
  return {
    type: 'business_model',
    title: bi('商业模式', 'Business Model'),
    headline: bi(d.narrative.investmentThesis, d.narrative.investmentThesis),
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
        { label: bi('月收入', 'Monthly Revenue'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-chart-line', changeType: 'positive' },
        { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage', changeType: d.financials.grossMargin > 30 ? 'positive' : 'neutral' },
        { label: bi('月增长', 'Monthly Growth'), value: `${d.financials.monthlyGrowthRate}%`, icon: 'fa-arrow-up', changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
      ],
      summary: d.narrative.investmentThesis,
    } as ChartContent,
  }
}

function buildMarket(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'market',
    title: bi('市场分析', 'Market Analysis'),
    content: {
      kind: 'kpi_grid',
      items: [
        { label: bi('市场规模', 'Market Size'), value: d.market.size, icon: 'fa-globe', description: d.market.growth ? `${t(bi('增速', 'Growth'), lang)}: ${d.market.growth}` : undefined },
        { label: bi('目标客户', 'Target Customer'), value: d.market.targetCustomer || d.market.size, icon: 'fa-users' },
        { label: bi('竞争格局', 'Competitors'), value: d.market.competitors, icon: 'fa-chess' },
        { label: bi('竞争壁垒', 'Competitive Moat'), value: d.market.moat, icon: 'fa-shield-alt' },
      ],
      footnote: d.market.marketPosition,
    } as KPIGridContent,
  }
}

function buildTraction(d: DeckStructuredData, lang: Lang): SlideData {
  if (d.traction?.milestones?.length) {
    return {
      type: 'traction',
      title: bi('牵引力', 'Traction'),
      headline: d.traction.customers ? bi(d.traction.customers, d.traction.customers) : undefined,
      content: {
        kind: 'timeline',
        milestones: d.traction.milestones.map(m => ({
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
  // Minimal fallback
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
    content: {
      kind: 'chart',
      chartType: d.financials.revenueHistory?.length ? 'line' : 'bar',
      chartData,
      kpiHighlights: [
        { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive' },
        { label: bi('月增长', 'Growth'), value: `${d.financials.monthlyGrowthRate}%`, icon: 'fa-chart-line', changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
        { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage' },
        { label: bi('净利率', 'Net Margin'), value: `${d.financials.netMargin}%`, icon: 'fa-chart-pie' },
      ],
    } as ChartContent,
  }
}

function buildUnitEconomics(d: DeckStructuredData, lang: Lang): SlideData {
  const ue = d.financials.unitEconomics
  const items: KPIItem[] = []

  if (ue?.revenuePerSqm) items.push({ label: bi('坪效', 'Rev/sqm'), value: `¥${ue.revenuePerSqm}`, icon: 'fa-ruler-combined', changeType: 'positive' })
  if (ue?.tablesTurnover) items.push({ label: bi('翻台率', 'Table Turnover'), value: `${ue.tablesTurnover}x`, icon: 'fa-sync', changeType: 'positive' })
  if (ue?.monthlyRecurring) items.push({ label: bi('MRR', 'MRR'), value: fmtMoney(ue.monthlyRecurring, lang), icon: 'fa-recycle', changeType: 'positive' })
  if (ue?.annualRecurring) items.push({ label: bi('ARR', 'ARR'), value: fmtMoney(ue.annualRecurring, lang), icon: 'fa-calendar-check', changeType: 'positive' })
  if (ue?.customerAcquisitionCost) items.push({ label: bi('获客成本', 'CAC'), value: `¥${ue.customerAcquisitionCost}`, icon: 'fa-user-plus' })
  if (ue?.lifetimeValue) items.push({ label: bi('客户终身价值', 'LTV'), value: `¥${ue.lifetimeValue}`, icon: 'fa-gem', changeType: 'positive' })
  if (ue?.paybackPeriod) items.push({ label: bi('回本周期', 'Payback'), value: ue.paybackPeriod, icon: 'fa-hourglass-half' })
  if (ue?.churnRate !== undefined) items.push({ label: bi('流失率', 'Churn Rate'), value: `${ue.churnRate}%`, icon: 'fa-door-open', changeType: ue.churnRate < 5 ? 'positive' : 'negative' })
  if (ue?.averageOrderValue) items.push({ label: bi('客单价', 'AOV'), value: `¥${ue.averageOrderValue}`, icon: 'fa-receipt' })

  // Ensure we have at least some items
  if (items.length === 0) {
    items.push(
      { label: bi('月收入', 'Monthly Rev'), value: fmtMoney(d.financials.monthlyRevenue, lang), icon: 'fa-coins', changeType: 'positive' },
      { label: bi('毛利率', 'Gross Margin'), value: `${d.financials.grossMargin}%`, icon: 'fa-percentage' },
      { label: bi('月增长', 'Growth'), value: `${d.financials.monthlyGrowthRate}%`, icon: 'fa-chart-line', changeType: 'positive' },
    )
  }

  return {
    type: 'unit_economics',
    title: bi('单位经济模型', 'Unit Economics'),
    headline: bi(
      `LTV/CAC=${ue?.lifetimeValue && ue?.customerAcquisitionCost ? (ue.lifetimeValue / ue.customerAcquisitionCost).toFixed(1) + 'x' : '—'}`,
      `LTV/CAC=${ue?.lifetimeValue && ue?.customerAcquisitionCost ? (ue.lifetimeValue / ue.customerAcquisitionCost).toFixed(1) + 'x' : '—'}`
    ),
    content: { kind: 'kpi_grid', items } as KPIGridContent,
  }
}

function buildGrowthMetrics(d: DeckStructuredData, lang: Lang): SlideData {
  if (d.financials.revenueHistory?.length) {
    return {
      type: 'growth_metrics',
      title: bi('增长指标', 'Growth Metrics'),
      content: {
        kind: 'chart',
        chartType: 'bar',
        chartData: {
          labels: d.financials.revenueHistory.map(r => r.month),
          datasets: [{
            label: t(bi('月收入(万)', 'Monthly Revenue(10K)'), lang),
            data: d.financials.revenueHistory.map(r => r.revenue),
          }],
        },
        kpiHighlights: [
          { label: bi('月增长率', 'Monthly Growth'), value: `${d.financials.monthlyGrowthRate}%`, changeType: 'positive', change: `+${d.financials.monthlyGrowthRate}%` },
          { label: bi('年化收入', 'Annual Rev'), value: d.financials.annualRevenue ? fmtMoney(d.financials.annualRevenue, lang) : fmtMoney(d.financials.monthlyRevenue * 12, lang), changeType: 'positive' },
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
  const sections = [
    { title: t(bi('核心壁垒', 'Core Moat'), lang), icon: 'fa-shield-alt', body: d.market.moat, highlight: true },
    { title: t(bi('竞争格局', 'Competitive Landscape'), lang), icon: 'fa-chess', body: d.market.competitors },
  ]
  if (d.market.marketPosition) {
    sections.push({ title: t(bi('市场定位', 'Market Position'), lang), icon: 'fa-crosshairs', body: d.market.marketPosition, highlight: false })
  }
  return {
    type: 'competitive_advantage',
    title: bi('竞争优势', 'Competitive Advantage'),
    content: { kind: 'text_block', sections, layout: '1col' } as TextBlockContent,
  }
}

function buildTeam(d: DeckStructuredData, lang: Lang): SlideData {
  return {
    type: 'team',
    title: bi('团队背景', 'Team'),
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
    } as FinancingAskContent,
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
