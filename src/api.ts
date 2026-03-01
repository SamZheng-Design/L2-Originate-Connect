// ═══════════════════════════════════════════════════════
// API Routes — 完整实现
// 项目CRUD / 文件管理 / AI处理(GPT-4o) / 发布分享
// ═══════════════════════════════════════════════════════

import { Hono } from 'hono'
import { mockProjects } from './mock-data'
import type { OriginateProject, StructuredPackage, UploadedFile } from './mock-data'

type Bindings = {
  OPENAI_API_KEY?: string
  OPENAI_BASE_URL?: string
}

export const apiRoutes = new Hono<{ Bindings: Bindings }>()

// ============================================================
// In-memory store (merges mock data, resets on restart)
// For Demo: primary data lives in localStorage on client side.
// These APIs serve mock data and handle AI processing.
// ============================================================
let projectsStore: OriginateProject[] = JSON.parse(JSON.stringify(mockProjects))

// ---- GET /api/projects ----
apiRoutes.get('/projects', (c) => {
  return c.json({ success: true, projects: projectsStore })
})

// ---- POST /api/projects ----
apiRoutes.post('/projects', async (c) => {
  try {
    const body = await c.req.json<{ companyName: string; industry: string }>()
    if (!body.companyName || !body.industry) {
      return c.json({ success: false, error: 'companyName and industry are required' }, 400)
    }
    const id = 'proj-' + Date.now().toString(36)
    const project: OriginateProject = {
      id,
      userId: 'u-demo',
      companyName: body.companyName,
      industry: body.industry,
      status: 'draft',
      rawMaterials: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    projectsStore.unshift(project)
    return c.json({ success: true, project })
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// ---- GET /api/projects/:id ----
apiRoutes.get('/projects/:id', (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)
  return c.json({ success: true, project })
})

// ---- PUT /api/projects/:id ----
apiRoutes.put('/projects/:id', async (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)

  try {
    const body = await c.req.json<{ companyName?: string; industry?: string }>()
    if (body.companyName) project.companyName = body.companyName
    if (body.industry) project.industry = body.industry
    project.updatedAt = new Date().toISOString().split('T')[0]
    return c.json({ success: true, project })
  } catch (e) {
    return c.json({ success: false, error: 'Invalid request body' }, 400)
  }
})

// ---- DELETE /api/projects/:id ----
apiRoutes.delete('/projects/:id', (c) => {
  const id = c.req.param('id')
  const idx = projectsStore.findIndex(p => p.id === id)
  if (idx === -1) return c.json({ success: false, error: 'Not found' }, 404)
  projectsStore.splice(idx, 1)
  return c.json({ success: true })
})

// ---- POST /api/projects/:id/upload ----
apiRoutes.post('/projects/:id/upload', async (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Project not found' }, 404)

  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400)
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const typeMap: Record<string, string> = {
      pdf: 'pdf', doc: 'word', docx: 'word',
      xls: 'excel', xlsx: 'excel',
      ppt: 'ppt', pptx: 'ppt',
      png: 'image', jpg: 'image', jpeg: 'image',
    }

    const uploadedFile: UploadedFile = {
      id: 'f-' + Date.now().toString(36),
      name: file.name,
      type: (typeMap[ext] || 'other') as UploadedFile['type'],
      size: file.size,
      url: `/mock/${file.name}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    }

    project.rawMaterials.push(uploadedFile)
    project.updatedAt = new Date().toISOString().split('T')[0]

    return c.json({ success: true, file: uploadedFile })
  } catch (e) {
    return c.json({ success: false, error: 'Upload failed' }, 500)
  }
})

// ---- DELETE /api/projects/:id/files/:fileId ----
apiRoutes.delete('/projects/:id/files/:fileId', (c) => {
  const id = c.req.param('id')
  const fileId = c.req.param('fileId')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Project not found' }, 404)

  const idx = project.rawMaterials.findIndex(f => f.id === fileId)
  if (idx === -1) return c.json({ success: false, error: 'File not found' }, 404)
  project.rawMaterials.splice(idx, 1)
  project.updatedAt = new Date().toISOString().split('T')[0]
  return c.json({ success: true })
})

// ============================================================
// AI Processing — GPT-4o with Mock fallback
// ============================================================

// ---- POST /api/projects/:id/process ----
apiRoutes.post('/projects/:id/process', async (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Project not found' }, 404)

  project.status = 'processing'
  project.updatedAt = new Date().toISOString().split('T')[0]

  // Try real AI, fallback to mock
  const apiKey = c.env?.OPENAI_API_KEY
  const baseUrl = c.env?.OPENAI_BASE_URL || 'https://www.genspark.ai/api/llm_proxy/v1'

  let structuredPackage: StructuredPackage

  if (apiKey && apiKey.length > 10) {
    try {
      structuredPackage = await callAI(apiKey, baseUrl, project)
    } catch (err) {
      console.error('AI call failed, using mock data:', err)
      structuredPackage = generateMockPackage(project)
    }
  } else {
    structuredPackage = generateMockPackage(project)
  }

  project.structuredPackage = structuredPackage
  project.pitchDeck = {
    pages: 8,
    htmlContent: '',
    generatedAt: new Date().toISOString().split('T')[0],
    templateUsed: getTemplateByIndustry(project.industry),
  }
  project.status = 'ready'
  project.updatedAt = new Date().toISOString().split('T')[0]

  return c.json({
    success: true,
    package: project.structuredPackage,
    deck: project.pitchDeck,
  })
})

// ---- GET /api/projects/:id/package ----
apiRoutes.get('/projects/:id/package', (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)
  if (!project.structuredPackage) return c.json({ success: false, error: 'Not processed yet' }, 400)
  return c.json({ success: true, package: project.structuredPackage })
})

// ---- GET /api/projects/:id/deck ----
apiRoutes.get('/projects/:id/deck', (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)
  if (!project.pitchDeck) return c.json({ success: false, error: 'Not processed yet' }, 400)
  return c.json({ success: true, deck: project.pitchDeck })
})

// ---- POST /api/projects/:id/publish ----
apiRoutes.post('/projects/:id/publish', (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)

  project.status = 'published'
  project.updatedAt = new Date().toISOString().split('T')[0]
  return c.json({ success: true, message: '已发布到筛选池（Demo 演示）' })
})

// ---- POST /api/projects/:id/share ----
apiRoutes.post('/projects/:id/share', (c) => {
  const id = c.req.param('id')
  const project = projectsStore.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)

  const shareLink = `https://mc.link/p/${id}`
  project.shareLink = shareLink
  return c.json({ success: true, shareLink })
})

// ============================================================
// AI Helper Functions
// ============================================================

async function callAI(
  apiKey: string,
  baseUrl: string,
  project: OriginateProject
): Promise<StructuredPackage> {
  const fileList = project.rawMaterials.map(f => `- ${f.name} (${f.type})`).join('\n')

  const systemPrompt = `你是一个专业的融资材料整理专家。请根据以下融资者上传的材料信息，按照给定的 JSON Schema 输出结构化的融资材料包。

要求：
1. 所有字段都必须填写，不能为空
2. 金额单位为万元
3. 比例单位为百分比
4. 分析要专业、简洁、有数据支撑
5. 根据公司名称和行业合理推断信息
6. 只返回纯 JSON，不要 markdown 代码块

JSON Schema:
{
  "companyOverview": {
    "name": "string (公司名称)",
    "legalPerson": "string (法人代表)",
    "foundedDate": "string (YYYY-MM-DD)",
    "registeredCapital": "string (如：500万)",
    "address": "string (办公地址)",
    "employees": "number (员工人数)"
  },
  "financials": {
    "monthlyRevenue": "number (月收入，万元)",
    "monthlyGrowthRate": "number (月增长率，%)",
    "costStructure": "string (如：食材40%、人工25%、租金20%、其他15%)",
    "profitMargin": "number (利润率，%)"
  },
  "financingNeed": {
    "amount": "number (融资金额，万元)",
    "expectedShareRatio": "number (预期分成比例，%)",
    "purpose": "string (融资用途)",
    "urgency": "string (high/medium/low)"
  },
  "industryInfo": {
    "category": "string (行业代码：catering/concert/retail/healthcare/education/saas/ecommerce/service)",
    "marketSize": "string (市场规模描述)",
    "competitors": "string (竞争格局)",
    "moat": "string (竞争壁垒)"
  },
  "teamInfo": {
    "founderBackground": "string (创始人背景)",
    "teamSize": "number (团队规模)",
    "keyMembers": ["string (姓名-职位)"]
  }
}`

  const userPrompt = `公司名称：${project.companyName}
行业：${project.industry}
上传的材料文件：
${fileList || '(暂无文件详情)'}

请根据以上信息，生成专业的结构化融资材料包。如果某些具体数据无法从文件名推断，请基于行业平均水平和公司名称合理生成示范数据。`

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`AI API error: ${response.status} - ${errText}`)
  }

  const data = await response.json() as any
  const content = data.choices?.[0]?.message?.content || ''

  // Parse JSON from response (handle markdown code blocks)
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const parsed = JSON.parse(jsonStr) as StructuredPackage

  // Validate essential fields
  if (!parsed.companyOverview || !parsed.financials || !parsed.financingNeed) {
    throw new Error('AI response missing required fields')
  }

  return parsed
}

function generateMockPackage(project: OriginateProject): StructuredPackage {
  // Industry-specific mock data
  const industryDefaults: Record<string, Partial<StructuredPackage>> = {
    catering: {
      financials: { monthlyRevenue: 65, monthlyGrowthRate: 10, costStructure: '食材38%、人工28%、租金20%、其他14%', profitMargin: 16 },
      financingNeed: { amount: 300, expectedShareRatio: 15, purpose: '门店扩张 + 供应链建设', urgency: 'medium' },
      industryInfo: { category: 'catering', marketSize: '4.7万亿', competitors: '海底捞、西贝、九毛九等', moat: '标准化运营+供应链管理' },
    },
    concert: {
      financials: { monthlyRevenue: 120, monthlyGrowthRate: 18, costStructure: '艺人45%、场地25%、营销20%、其他10%', profitMargin: 22 },
      financingNeed: { amount: 800, expectedShareRatio: 10, purpose: '大型演出制作 + IP开发', urgency: 'high' },
      industryInfo: { category: 'concert', marketSize: '2100亿', competitors: '大麦、票星球等', moat: '独家艺人资源+赛事IP' },
    },
    education: {
      financials: { monthlyRevenue: 42, monthlyGrowthRate: 20, costStructure: '师资48%、场地22%、营销18%、其他12%', profitMargin: 14 },
      financingNeed: { amount: 200, expectedShareRatio: 12, purpose: '在线平台升级 + 师资扩充', urgency: 'medium' },
      industryInfo: { category: 'education', marketSize: '3.2万亿', competitors: '新东方、好未来、学而思', moat: 'AI个性化教学+优质师资' },
    },
    retail: {
      financials: { monthlyRevenue: 55, monthlyGrowthRate: 8, costStructure: '采购50%、租金20%、人工18%、其他12%', profitMargin: 12 },
      financingNeed: { amount: 400, expectedShareRatio: 14, purpose: '新开门店 + 数字化转型', urgency: 'medium' },
      industryInfo: { category: 'retail', marketSize: '44万亿', competitors: '名创优品、KKV等', moat: '选品能力+社区化运营' },
    },
    healthcare: {
      financials: { monthlyRevenue: 90, monthlyGrowthRate: 15, costStructure: '耗材35%、人工30%、租金20%、其他15%', profitMargin: 25 },
      financingNeed: { amount: 600, expectedShareRatio: 10, purpose: '设备升级 + 连锁扩张', urgency: 'low' },
      industryInfo: { category: 'healthcare', marketSize: '2.3万亿', competitors: '美莱、艺星等', moat: '医师资源+品牌口碑' },
    },
    saas: {
      financials: { monthlyRevenue: 30, monthlyGrowthRate: 25, costStructure: '研发55%、营销25%、运维10%、其他10%', profitMargin: 20 },
      financingNeed: { amount: 500, expectedShareRatio: 8, purpose: '产品研发 + 市场拓展', urgency: 'high' },
      industryInfo: { category: 'saas', marketSize: '8000亿', competitors: '飞书、钉钉等', moat: '技术壁垒+客户黏性' },
    },
    ecommerce: {
      financials: { monthlyRevenue: 150, monthlyGrowthRate: 12, costStructure: '采购55%、物流15%、营销20%、其他10%', profitMargin: 10 },
      financingNeed: { amount: 1000, expectedShareRatio: 12, purpose: '供应链优化 + 品牌营销', urgency: 'medium' },
      industryInfo: { category: 'ecommerce', marketSize: '15万亿', competitors: '淘宝、京东、拼多多', moat: '私域流量+差异化选品' },
    },
    service: {
      financials: { monthlyRevenue: 48, monthlyGrowthRate: 14, costStructure: '人工50%、场地20%、营销15%、其他15%', profitMargin: 18 },
      financingNeed: { amount: 250, expectedShareRatio: 13, purpose: '服务网络扩展 + 品质升级', urgency: 'medium' },
      industryInfo: { category: 'service', marketSize: '12万亿', competitors: '58同城、美团等', moat: '服务标准化+客户满意度' },
    },
  }

  const defaults = industryDefaults[project.industry] || industryDefaults.service!
  const companyName = project.companyName

  return {
    companyOverview: {
      name: companyName,
      legalPerson: generateName(),
      foundedDate: generateFoundedDate(),
      registeredCapital: (Math.floor(Math.random() * 10 + 1) * 100) + '万',
      address: generateAddress(),
      employees: Math.floor(Math.random() * 200 + 20),
    },
    financials: defaults.financials as StructuredPackage['financials'],
    financingNeed: defaults.financingNeed as StructuredPackage['financingNeed'],
    industryInfo: defaults.industryInfo as StructuredPackage['industryInfo'],
    teamInfo: {
      founderBackground: generateFounderBg(project.industry),
      teamSize: Math.floor(Math.random() * 150 + 10),
      keyMembers: generateKeyMembers(),
    },
  }
}

function getTemplateByIndustry(industry: string): string {
  const map: Record<string, string> = {
    catering: '餐饮行业模板', concert: '演出行业模板', education: '教育行业模板',
    retail: '零售行业模板', healthcare: '医美健康模板', saas: 'SaaS行业模板',
    ecommerce: '电商行业模板', service: '服务业模板',
  }
  return map[industry] || '通用行业模板'
}

// ---- Random generators ----
function generateName(): string {
  const surnames = ['张','李','王','赵','陈','刘','杨','黄','周','吴']
  const names = ['伟','芳','明','华','强','丽','军','磊','洋','勇']
  return surnames[Math.floor(Math.random()*surnames.length)] + names[Math.floor(Math.random()*names.length)]
}

function generateFoundedDate(): string {
  const y = 2018 + Math.floor(Math.random() * 6)
  const m = String(Math.floor(Math.random()*12+1)).padStart(2, '0')
  return `${y}-${m}-01`
}

function generateAddress(): string {
  const cities = ['深圳市南山区科技园','北京市海淀区中关村','上海市浦东新区陆家嘴','广州市天河区珠江新城','杭州市西湖区文三路']
  return cities[Math.floor(Math.random()*cities.length)] + Math.floor(Math.random()*200+1) + '号'
}

function generateFounderBg(industry: string): string {
  const bgs: Record<string, string[]> = {
    catering: ['10年餐饮连锁管理经验，曾任知名品牌区域总经理','前米其林三星餐厅主厨，15年行业积累'],
    concert: ['资深演出策划人，曾操盘百场千人以上演出','前大型娱乐集团VP，20年文娱行业经验'],
    education: ['前新东方区域总监，15年教育行业经验','清华MBA，10年在线教育产品经验'],
    retail: ['前名创优品区域经理，12年零售经验','前沃尔玛采购总监，供应链专家'],
    healthcare: ['前三甲医院科室主任，20年从医经验','医美行业连续创业者，3次成功退出'],
    saas: ['前阿里云技术总监，15年B2B经验','前字节跳动产品负责人，多次0到1经历'],
    ecommerce: ['前京东品类负责人，10年电商运营经验','跨境电商连续创业者，年GMV过亿'],
    service: ['前美团城市经理，8年本地服务经验','连续创业者，3个成功项目经验'],
  }
  const list = bgs[industry] || bgs.service
  return list[Math.floor(Math.random()*list.length)]
}

function generateKeyMembers(): string[] {
  const roles = ['创始人/CEO','联合创始人/CTO','CFO','COO','VP-市场','VP-产品']
  const count = Math.floor(Math.random()*3 + 2)
  return Array.from({length: count}, (_, i) => generateName() + '-' + roles[i])
}
