// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 通用类型系统
// 可复用于任何产品线，不依赖发起通业务数据结构
// ═══════════════════════════════════════════════════════

// ---- 叙事框架 (Narrative Framework) ----
export type NarrativeFramework =
  | 'classic'        // 经典: 痛点→方案→市场→商业模式→财务→团队→Ask
  | 'yc'             // YC风格: Traction优先→问题→方案→市场→商业模式→团队→Ask
  | 'drip'           // 滴灌通风格: 收入分成模型→门店经济→翻台/坪效→Ask
  | 'storytelling'   // 故事驱动: 创始人故事→痛点发现→解决之道→验证→愿景
  | 'data_heavy'     // 数据密集: 关键指标大屏→趋势分析→对标分析→预测

// ---- 模板主题 (Template Theme) ----
export interface DeckTheme {
  id: string
  name: { zh: string; en: string }
  description: { zh: string; en: string }
  preview: string  // 预览缩略图描述
  category: 'professional' | 'creative' | 'minimal' | 'brand' | 'data'
  isPremium: boolean

  // 配色方案
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    textOnPrimary: string
    gradientStart: string
    gradientEnd: string
    chartColors: string[]
  }

  // 字体组合
  fonts: {
    heading: string
    body: string
    accent: string
    mono: string
  }

  // 排版参数
  layout: {
    borderRadius: string
    cardStyle: 'flat' | 'elevated' | 'outlined' | 'glass'
    headerStyle: 'left' | 'center' | 'minimal'
    coverStyle: 'gradient' | 'image' | 'minimal' | 'bold' | 'split'
  }
}

// ---- 幻灯片页面类型 ----
export type SlideType =
  | 'cover'
  | 'company_overview'
  | 'problem'
  | 'solution'
  | 'product'
  | 'business_model'
  | 'market'
  | 'traction'
  | 'financials'
  | 'competitive_advantage'
  | 'team'
  | 'financing_ask'
  | 'appendix'
  | 'unit_economics'
  | 'growth_metrics'
  | 'customer_testimonials'
  | 'roadmap'
  | 'closing'

// ---- 每页幻灯片的数据结构 ----
export interface SlideData {
  type: SlideType
  title: { zh: string; en: string }
  subtitle?: { zh: string; en: string }
  headline?: { zh: string; en: string }  // 叙事金句/一句话亮点
  content: SlideContent
}

// ---- 幻灯片内容多态 ----
export type SlideContent =
  | CoverContent
  | KPIGridContent
  | ChartContent
  | TextBlockContent
  | ComparisonContent
  | TimelineContent
  | TeamContent
  | FinancingAskContent
  | MetricsContent
  | QuoteContent

export interface CoverContent {
  kind: 'cover'
  companyName: string
  tagline: string
  industry: string
  industryIcon: string
  foundedDate?: string
  location?: string
  logo?: string
}

export interface KPIGridContent {
  kind: 'kpi_grid'
  items: KPIItem[]
  footnote?: string
}

export interface KPIItem {
  label: { zh: string; en: string }
  value: string
  change?: string          // "+12%" 或 "-5%"
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: string
  description?: string
}

export interface ChartContent {
  kind: 'chart'
  chartType: 'bar' | 'line' | 'doughnut' | 'radar' | 'horizontalBar' | 'stackedBar'
  chartData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string
    }[]
  }
  summary?: string          // 图表下方的文字总结
  kpiHighlights?: KPIItem[] // 图表旁边的KPI卡片
}

export interface TextBlockContent {
  kind: 'text_block'
  sections: {
    title: string
    icon?: string
    body: string
    highlight?: boolean
  }[]
  layout?: '1col' | '2col' | '3col'
}

export interface ComparisonContent {
  kind: 'comparison'
  leftTitle: string
  rightTitle: string
  items: { dimension: string; us: string; them: string; advantage?: boolean }[]
}

export interface TimelineContent {
  kind: 'timeline'
  milestones: {
    date: string
    title: string
    description: string
    achieved: boolean
  }[]
}

export interface TeamContent {
  kind: 'team'
  members: {
    name: string
    role: string
    background: string
    avatar?: string
  }[]
  teamSize?: number
  teamHighlight?: string
}

export interface FinancingAskContent {
  kind: 'financing_ask'
  amount: string
  shareRatio?: string
  purpose: string
  urgency?: string
  useOfFunds?: { item: string; percentage: number }[]
  contactInfo?: string
}

export interface MetricsContent {
  kind: 'metrics'
  primaryMetric: { label: string; value: string; trend?: string }
  secondaryMetrics: KPIItem[]
  trendData?: {
    labels: string[]
    values: number[]
  }
}

export interface QuoteContent {
  kind: 'quote'
  quote: string
  author?: string
  role?: string
}

// ---- Deck引擎输入 ----
export interface DeckInput {
  companyName: string
  industry: string
  themeId: string
  framework: NarrativeFramework
  lang: 'zh' | 'en'

  // 结构化数据 (来自AI或手动输入)
  data: DeckStructuredData
}

// ---- AI输出的深度结构化数据 ----
export interface DeckStructuredData {
  // 公司基础
  company: {
    name: string
    legalPerson: string
    foundedDate: string
    registeredCapital: string
    address: string
    employees: number
    description: string
  }

  // 叙事要素 (AI生成的"故事线")
  narrative: {
    oneLineHook: string        // 一句话投资亮点 (如 "中国版Chipotle，月增长12%")
    problemStatement: string   // 痛点阐述 (1-2句)
    solutionStatement: string  // 方案阐述 (1-2句)
    whyNow: string             // 为什么是现在 (1-2句)
    vision: string             // 愿景 (1句)
    investmentThesis: string   // 投资逻辑 (给投资人看的: 为什么该投)
  }

  // 财务深度
  financials: {
    monthlyRevenue: number
    annualRevenue?: number
    monthlyGrowthRate: number
    grossMargin: number
    netMargin: number
    costStructure: { item: string; percentage: number }[]
    revenueHistory?: { month: string; revenue: number }[]  // 6-12个月趋势
    projections?: { year: string; revenue: number }[]      // 3年预测
    unitEconomics?: {
      customerAcquisitionCost?: number
      lifetimeValue?: number
      paybackPeriod?: string
      averageOrderValue?: number
      // 行业特有指标
      revenuePerSqm?: number     // 坪效
      tablesTurnover?: number    // 翻台率
      monthlyRecurring?: number  // MRR
      annualRecurring?: number   // ARR
      churnRate?: number         // 流失率
    }
  }

  // 融资
  financing: {
    amount: number
    expectedShareRatio: number
    purpose: string
    urgency: 'high' | 'medium' | 'low'
    useOfFunds: { item: string; percentage: number }[]
    expectedROI?: string
  }

  // 市场
  market: {
    size: string
    growth: string
    competitors: string
    moat: string
    targetCustomer?: string
    marketPosition?: string
  }

  // 团队
  team: {
    founderBackground: string
    teamSize: number
    keyMembers: { name: string; role: string; background: string }[]
    advisors?: string[]
  }

  // 牵引力 (Traction)
  traction?: {
    customers?: string
    milestones?: { date: string; event: string; achieved: boolean }[]
    partnerships?: string[]
    mediaOrAwards?: string[]
  }

  // 产品/服务
  product?: {
    description: string
    differentiators: string[]
    techStack?: string
  }
}

// ---- Deck引擎输出 ----
export interface DeckOutput {
  slides: SlideData[]
  theme: DeckTheme
  framework: NarrativeFramework
  generatedAt: string
  totalPages: number
}
