// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 行业叙事Prompt专家库
// 8个行业 × 5种叙事框架 = 40种精准Prompt
// 让AI输出行业黑话、关键指标、专业叙事
// ═══════════════════════════════════════════════════════

import type { NarrativeFramework, DeckStructuredData } from './types'

// ── 行业特有指标定义 ──
const INDUSTRY_KPI_SCHEMA: Record<string, string> = {
  catering: `
    "unitEconomics": {
      "revenuePerSqm": "number (月坪效, 元/㎡/月)",
      "tablesTurnover": "number (日均翻台率, 如 3.5)",
      "averageOrderValue": "number (客单价, 元)",
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (客户终身价值, 元)",
      "paybackPeriod": "string (单店回本周期, 如 '14个月')"
    }`,
  concert: `
    "unitEconomics": {
      "averageOrderValue": "number (平均票价, 元)",
      "customerAcquisitionCost": "number (单场获客成本, 元)",
      "lifetimeValue": "number (观众终身价值, 元)",
      "paybackPeriod": "string (单场盈亏平衡观众数, 如 '800人')"
    }`,
  education: `
    "unitEconomics": {
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (学生LTV, 元)",
      "averageOrderValue": "number (课均价, 元)",
      "churnRate": "number (月流失率, %)",
      "paybackPeriod": "string (获客回本周期, 如 '3个月')"
    }`,
  retail: `
    "unitEconomics": {
      "revenuePerSqm": "number (月坪效, 元/㎡/月)",
      "averageOrderValue": "number (客单价, 元)",
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (客户LTV, 元)",
      "paybackPeriod": "string (单店回本周期, 如 '18个月')"
    }`,
  healthcare: `
    "unitEconomics": {
      "averageOrderValue": "number (客单价/项均价, 元)",
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (客户LTV, 元)",
      "paybackPeriod": "string (单店回本周期, 如 '20个月')"
    }`,
  saas: `
    "unitEconomics": {
      "monthlyRecurring": "number (MRR, 万元)",
      "annualRecurring": "number (ARR, 万元)",
      "churnRate": "number (月流失率, %)",
      "customerAcquisitionCost": "number (CAC, 元)",
      "lifetimeValue": "number (LTV, 元)",
      "paybackPeriod": "string (CAC回本周期, 如 '6个月')"
    }`,
  ecommerce: `
    "unitEconomics": {
      "averageOrderValue": "number (客单价, 元)",
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (客户LTV, 元)",
      "churnRate": "number (月复购率下降, %)",
      "paybackPeriod": "string (获客回本周期, 如 '45天')"
    }`,
  service: `
    "unitEconomics": {
      "averageOrderValue": "number (客单价, 元)",
      "customerAcquisitionCost": "number (获客成本, 元)",
      "lifetimeValue": "number (客户LTV, 元)",
      "paybackPeriod": "string (回本周期, 如 '12个月')"
    }`,
}

// ── 行业叙事指导 ──
const INDUSTRY_NARRATIVE_GUIDANCE: Record<string, string> = {
  catering: `你是一位餐饮连锁行业的融资专家。在分析中请特别关注：
- 翻台率、坪效是餐饮核心指标，必须精确
- 标准化程度决定可复制性：中央厨房/标准SOP/供应链
- 连锁扩张模型：直营 vs 加盟 vs 合伙人模式
- 食材成本控制能力（优秀企业<35%）
- 同店增长 vs 新店贡献的拆分
- 投资亮点要聚焦"可复制的门店经济模型"`,

  concert: `你是一位文娱/演出行业的融资专家。在分析中请特别关注：
- IP资源独占性是核心壁垒
- 场次经济学：单场成本结构、上座率、票房分成模型
- 艺人/IP矩阵的深度和广度
- 线上线下联动能力（直播、周边、会员）
- 季节性波动和风险对冲策略
- 投资亮点要聚焦"稀缺IP资源+场景化变现"`,

  education: `你是一位教育行业的融资专家。在分析中请特别关注：
- 续费率/完课率是教育核心指标
- 师资获取和培养体系
- AI/技术在个性化教学中的应用
- 获客渠道和转化漏斗
- 政策合规性（特别是K12/职业教育）
- 投资亮点要聚焦"可规模化的教学交付+高续费"`,

  retail: `你是一位零售行业的融资专家。在分析中请特别关注：
- 坪效和人效是零售核心指标
- 选品能力和供应链管理
- 库存周转率和滞销风险控制
- 线上线下融合的OMO策略
- 单店模型的可复制性
- 投资亮点要聚焦"高坪效+差异化选品+可复制"`,

  healthcare: `你是一位医美/健康行业的融资专家。在分析中请特别关注：
- 医师资源是核心壁垒
- 客单价和复购率
- 合规经营（医疗资质、广告合规）
- 服务标准化vs个性化的平衡
- 品牌口碑和转介绍率
- 投资亮点要聚焦"医师资源+品牌溢价+高复购"`,

  saas: `你是一位SaaS行业的融资专家。在分析中请特别关注：
- ARR/MRR和增长率是SaaS核心指标
- Net Dollar Retention（净金额留存率）>100%为优秀
- CAC回本周期和LTV/CAC比值（>3x为健康）
- Churn Rate（月流失率<3%为优秀）
- 产品Stickiness和切换成本
- 投资亮点要聚焦"高NRR+低Churn+强PMF"`,

  ecommerce: `你是一位电商行业的融资专家。在分析中请特别关注：
- GMV、Take Rate和实际收入的区分
- 获客成本和ROI（ROI>1:3为健康）
- 复购率和用户生命周期价值
- 供应链效率和物流成本
- 私域流量占比和运营能力
- 投资亮点要聚焦"高复购+供应链效率+私域运营"`,

  service: `你是一位服务业的融资专家。在分析中请特别关注：
- 服务标准化程度决定可复制性
- 人效（每人产值）是服务业核心
- 客户满意度和NPS
- 技术赋能服务的程度
- 区域密度和网络效应
- 投资亮点要聚焦"标准化服务+技术赋能+高满意度"`,
}

// ── 叙事框架指导 ──
const FRAMEWORK_GUIDANCE: Record<NarrativeFramework, string> = {
  classic: `请按"经典投行路演"风格组织叙事：
1. 先讲行业痛点（让投资人感受到"这是个真问题"）
2. 再讲解决方案（我们如何解决，为什么是我们）
3. 用数据证明（财务、增长、客户）
4. 展示团队（为什么这个团队能赢）
5. 最后提出融资需求（用资金的用途和预期回报说服投资人）
语调：专业、严谨、数据驱动`,

  yc: `请按"YC Demo Day"风格组织叙事：
1. 开门见山展示Traction（最亮的数据先说）
2. 快速解释问题和方案
3. 市场够大、增速够快
4. 团队=domain expert
语调：简洁、直接、充满信心、不废话`,

  drip: `请按"滴灌通收入分成"模式组织叙事（这是一种基于门店/项目日常收入流水分成的投融资模式）：
1. 重点展示门店/项目的单位经济模型
2. 坪效、翻台率、客单价等运营指标
3. 收入稳定性和可预测性（月度波动<20%为佳）
4. 可复制性：已验证的标准化运营体系
5. 融资需求明确指向"收入分成模式"
语调：务实、数据密集、强调现金流可预测性`,

  storytelling: `请按"故事驱动"风格组织叙事：
1. 创始人发现这个痛点的真实故事
2. "Aha Moment"——发现解决方案的时刻
3. 从0到1的验证过程
4. 愿景——我们要创造什么样的未来
语调：真诚、有温度、引人入胜`,

  data_heavy: `请按"数据密集"风格组织叙事：
1. 关键指标大屏（5-8个核心KPI一目了然）
2. 趋势分析（6-12个月的增长曲线）
3. 对标分析（和行业头部对比）
4. 预测模型（3年财务预测）
语调：客观、精确、充满数据佐证`,
}

// ═══════════════════════════════════════════════════════
// 核心函数：生成完整的AI System Prompt
// ═══════════════════════════════════════════════════════

export function generateAIPrompt(
  industry: string,
  framework: NarrativeFramework,
  companyName: string,
  fileList: string,
): { systemPrompt: string; userPrompt: string } {

  const industryGuidance = INDUSTRY_NARRATIVE_GUIDANCE[industry] || INDUSTRY_NARRATIVE_GUIDANCE.service
  const frameworkGuidance = FRAMEWORK_GUIDANCE[framework]
  const ueSchema = INDUSTRY_KPI_SCHEMA[industry] || INDUSTRY_KPI_SCHEMA.service

  const systemPrompt = `${industryGuidance}

${frameworkGuidance}

你需要根据用户提供的公司信息和上传材料，生成一份深度结构化的融资材料包。

要求：
1. 所有字段都必须填写，不允许空值
2. 金额单位统一为"万元人民币"
3. 比例单位统一为百分比数字（如 15 表示 15%）
4. "narrative"部分是灵魂——必须像一个资深投行分析师写的，有投资逻辑，有数据支撑
5. oneLineHook必须是一句能让投资人"停下来看"的话，不要泛泛而谈
6. investmentThesis必须回答"为什么该投"，要有逻辑链
7. 如果材料中缺少某些数据，基于行业benchmark合理推断，但要注明是推断
8. revenueHistory请生成过去6个月的月度收入数据，要体现增长趋势
9. projections请生成未来3年的年度收入预测
10. useOfFunds必须细分到具体项目，每项有百分比
11. traction部分至少包含4个关键里程碑
12. costStructure的每个item的percentage之和必须等于100

只返回纯JSON，不要markdown代码块，不要任何额外文字。

JSON Schema:
{
  "company": {
    "name": "string (公司名称)",
    "legalPerson": "string (法人代表姓名)",
    "foundedDate": "string (YYYY-MM-DD)",
    "registeredCapital": "string (如'500万')",
    "address": "string (完整地址)",
    "employees": "number (员工人数)",
    "description": "string (一段话公司简介，50字以内)"
  },
  "narrative": {
    "oneLineHook": "string (一句话投资亮点，必须有数据、有冲击力，如'中国版Chipotle，22家直营店月增长12%')",
    "problemStatement": "string (行业痛点，2-3句话，要让投资人感受到'这确实是个问题')",
    "solutionStatement": "string (我们的方案，2-3句话，要体现独特性)",
    "whyNow": "string (为什么是现在的好时机，1-2句话)",
    "vision": "string (3年愿景，1句话)",
    "investmentThesis": "string (投资逻辑，3-4句话，回答'为什么该投'，要有逻辑链：市场→团队→数据→壁垒)"
  },
  "financials": {
    "monthlyRevenue": "number (最新月收入，万元)",
    "annualRevenue": "number (年收入，万元)",
    "monthlyGrowthRate": "number (月环比增长率，%)",
    "grossMargin": "number (毛利率，%)",
    "netMargin": "number (净利率，%)",
    "costStructure": [{"item":"string","percentage":"number"}],
    "revenueHistory": [{"month":"string (如'2025-09')","revenue":"number (万元)"}],
    "projections": [{"year":"string (如'2026')","revenue":"number (万元)"}],
    ${ueSchema}
  },
  "financing": {
    "amount": "number (融资金额，万元)",
    "expectedShareRatio": "number (预期分成/股权比例，%)",
    "purpose": "string (一句话融资用途)",
    "urgency": "string (high/medium/low)",
    "useOfFunds": [{"item":"string (具体用途)","percentage":"number"}],
    "expectedROI": "string (预期投资回报，如'24个月回本，年化收益18%')"
  },
  "market": {
    "size": "string (市场规模，如'4.7万亿')",
    "growth": "string (市场增速，如'年增长8%')",
    "competitors": "string (主要竞争者，2-3家)",
    "moat": "string (竞争壁垒，必须具体，不要空话)",
    "targetCustomer": "string (目标客群画像，1句话)",
    "marketPosition": "string (我们在市场中的定位，1句话)"
  },
  "team": {
    "founderBackground": "string (创始人背景，2-3句话，突出domain expertise)",
    "teamSize": "number (团队总人数)",
    "keyMembers": [{"name":"string","role":"string","background":"string (1句话)"}],
    "advisors": ["string (顾问姓名-背景)"]
  },
  "traction": {
    "customers": "string (客户/用户数据概述，如'服务超过5000+客户')",
    "milestones": [{"date":"string","event":"string","achieved":"boolean"}],
    "partnerships": ["string (合作伙伴)"],
    "mediaOrAwards": ["string (媒体报道/获奖)"]
  },
  "product": {
    "description": "string (产品/服务描述，2-3句话)",
    "differentiators": ["string (每个差异化优势，1句话)"],
    "techStack": "string (技术架构概述，1句话，可选)"
  }
}`

  const userPrompt = `公司名称：${companyName}
行业：${industry}
上传的材料文件清单：
${fileList || '(暂无文件，请基于公司名称和行业合理生成示范数据)'}

请根据以上信息，生成一份完整的深度结构化融资材料包。

特别注意：
- oneLineHook要有冲击力，像标题党但有数据支撑
- investmentThesis要像资深投行分析师写的
- revenueHistory要生成6个月的月度数据，体现增长趋势
- useOfFunds要细分到4-5个具体项目
- milestones至少4个，包含已完成和未来计划
- keyMembers至少3人，每人都有具体背景
- differentiators至少3个，每个都具体可衡量`

  return { systemPrompt, userPrompt }
}

// ═══════════════════════════════════════════════════════
// 辅助函数：将旧版StructuredPackage转换为新版DeckStructuredData
// 兼容已有的mock数据
// ═══════════════════════════════════════════════════════

export function convertLegacyToNewFormat(legacy: any, industry: string): DeckStructuredData {
  const co = legacy.companyOverview || {}
  const fi = legacy.financials || {}
  const fn = legacy.financingNeed || {}
  const ii = legacy.industryInfo || {}
  const ti = legacy.teamInfo || {}

  // Parse cost structure string to array
  const costArr = parseCostStructure(fi.costStructure || '')

  // Generate 6 months of fake revenue history based on monthly revenue and growth
  const monthlyRev = fi.monthlyRevenue || 50
  const growthRate = fi.monthlyGrowthRate || 10
  const revenueHistory = []
  let rev = monthlyRev / Math.pow(1 + growthRate / 100, 5)
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    revenueHistory.push({
      month: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      revenue: Math.round(rev * 10) / 10,
    })
    rev *= (1 + growthRate / 100)
  }

  return {
    company: {
      name: co.name || '',
      legalPerson: co.legalPerson || '',
      foundedDate: co.foundedDate || '',
      registeredCapital: co.registeredCapital || '',
      address: co.address || '',
      employees: co.employees || 0,
      description: `${co.name}是一家专注于${ii.category || industry}行业的企业。`,
    },
    narrative: {
      oneLineHook: `${co.name}，月收入${monthlyRev}万，月增长${growthRate}%`,
      problemStatement: `${ii.category || industry}行业面临标准化不足、获客成本高的挑战。`,
      solutionStatement: `${co.name}通过${ii.moat || '独特的运营模式'}解决行业痛点。`,
      whyNow: `市场规模达${ii.marketSize || '万亿级'}，正处于快速增长期。`,
      vision: `成为${ii.category || industry}行业的领先品牌。`,
      investmentThesis: `${ii.marketSize || '万亿级'}的${ii.category || industry}市场，${co.name}凭借${ii.moat || '独特壁垒'}建立了可持续的竞争优势，月收入${monthlyRev}万且保持${growthRate}%的月增长率，团队由${ti.founderBackground || '行业资深人士'}领导。`,
    },
    financials: {
      monthlyRevenue: monthlyRev,
      annualRevenue: monthlyRev * 12,
      monthlyGrowthRate: growthRate,
      grossMargin: fi.profitMargin ? fi.profitMargin + 10 : 30,
      netMargin: fi.profitMargin || 15,
      costStructure: costArr,
      revenueHistory,
      projections: [
        { year: '2026', revenue: Math.round(monthlyRev * 12 * 1.5) },
        { year: '2027', revenue: Math.round(monthlyRev * 12 * 2.5) },
        { year: '2028', revenue: Math.round(monthlyRev * 12 * 4) },
      ],
      unitEconomics: {},
    },
    financing: {
      amount: fn.amount || 500,
      expectedShareRatio: fn.expectedShareRatio || 15,
      purpose: fn.purpose || '业务扩张',
      urgency: fn.urgency || 'medium',
      useOfFunds: [
        { item: '业务扩张', percentage: 40 },
        { item: '市场营销', percentage: 25 },
        { item: '技术研发', percentage: 20 },
        { item: '运营储备', percentage: 15 },
      ],
    },
    market: {
      size: ii.marketSize || '',
      growth: '',
      competitors: ii.competitors || '',
      moat: ii.moat || '',
    },
    team: {
      founderBackground: ti.founderBackground || '',
      teamSize: ti.teamSize || 0,
      keyMembers: (ti.keyMembers || []).map((m: string) => {
        const parts = m.split('-')
        return { name: parts[0] || m, role: parts[1] || '', background: '' }
      }),
    },
    traction: {
      customers: `服务客户持续增长`,
      milestones: [
        { date: co.foundedDate || '2022-01', event: '公司成立', achieved: true },
        { date: '2023-06', event: '首个盈利月', achieved: true },
        { date: '2024-01', event: '月收入突破50万', achieved: true },
        { date: '2025-06', event: '启动融资计划', achieved: false },
      ],
    },
    product: {
      description: `${co.name}提供专业的${ii.category || industry}服务。`,
      differentiators: [ii.moat || '独特的运营模式'],
    },
  }
}

function parseCostStructure(str: string): { item: string; percentage: number }[] {
  if (!str) return [{ item: '其他', percentage: 100 }]
  const parts = str.split('、')
  return parts.map(p => {
    const match = p.match(/(.+?)(\d+)%/)
    if (match) return { item: match[1].trim(), percentage: parseInt(match[2]) }
    return { item: p.trim(), percentage: Math.round(100 / parts.length) }
  })
}
