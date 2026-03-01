// ═══════════════════════════════════════════════════════
// Mock Data — 3 条示例项目
// ═══════════════════════════════════════════════════════

export interface UploadedFile {
  id: string
  name: string
  type: 'pdf' | 'word' | 'excel' | 'ppt' | 'image' | 'other'
  size: number
  url: string
  uploadedAt: string
}

export interface StructuredPackage {
  companyOverview: {
    name: string; legalPerson: string; foundedDate: string;
    registeredCapital: string; address: string; employees: number;
  }
  financials: {
    monthlyRevenue: number; monthlyGrowthRate: number;
    costStructure: string; profitMargin: number;
  }
  financingNeed: {
    amount: number; expectedShareRatio: number;
    purpose: string; urgency: 'high' | 'medium' | 'low';
  }
  industryInfo: {
    category: string; marketSize: string;
    competitors: string; moat: string;
  }
  teamInfo: {
    founderBackground: string; teamSize: number;
    keyMembers: string[];
  }
}

export interface PitchDeck {
  pages: number
  htmlContent: string
  generatedAt: string
  templateUsed: string
}

export interface OriginateProject {
  id: string
  userId: string
  companyName: string
  industry: string
  status: 'draft' | 'processing' | 'ready' | 'published'
  rawMaterials: UploadedFile[]
  structuredPackage?: StructuredPackage
  pitchDeck?: PitchDeck
  shareLink?: string
  createdAt: string
  updatedAt: string
}

export const mockProjects: OriginateProject[] = [
  {
    id: 'proj-001',
    userId: 'u-001',
    companyName: '星火餐饮连锁',
    industry: 'catering',
    status: 'ready',
    rawMaterials: [
      { id: 'f-1', name: '商业计划书.pptx', type: 'ppt', size: 5242880, url: '/mock/bp.pptx', uploadedAt: '2026-02-10' },
      { id: 'f-2', name: '2025年财务报表.xlsx', type: 'excel', size: 1048576, url: '/mock/fin.xlsx', uploadedAt: '2026-02-10' },
      { id: 'f-3', name: '营业执照.pdf', type: 'pdf', size: 524288, url: '/mock/license.pdf', uploadedAt: '2026-02-10' },
    ],
    structuredPackage: {
      companyOverview: {
        name: '星火餐饮连锁', legalPerson: '张三', foundedDate: '2020-06-15',
        registeredCapital: '500万', address: '深圳市南山区科技园路88号', employees: 120,
      },
      financials: {
        monthlyRevenue: 85, monthlyGrowthRate: 12,
        costStructure: '食材40%、人工25%、租金20%、其他15%', profitMargin: 18,
      },
      financingNeed: {
        amount: 500, expectedShareRatio: 15,
        purpose: '开设新店 + 供应链升级', urgency: 'medium',
      },
      industryInfo: {
        category: 'catering', marketSize: '4.7万亿',
        competitors: '海底捞、西贝等', moat: '独家供应链+标准化出品',
      },
      teamInfo: {
        founderBackground: '10年餐饮连锁管理经验，曾任某知名连锁品牌区域总经理',
        teamSize: 120,
        keyMembers: ['张三-创始人/CEO', '李四-CFO', '王五-COO'],
      },
    },
    pitchDeck: {
      pages: 8, htmlContent: '', generatedAt: '2026-02-11', templateUsed: '餐饮行业模板',
    },
    shareLink: 'https://mc.link/p/proj-001',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-11',
  },
  {
    id: 'proj-002',
    userId: 'u-003',
    companyName: '悦声文化传媒',
    industry: 'concert',
    status: 'processing',
    rawMaterials: [
      { id: 'f-4', name: '演出计划.pdf', type: 'pdf', size: 3145728, url: '/mock/plan.pdf', uploadedAt: '2026-02-20' },
    ],
    createdAt: '2026-02-20',
    updatedAt: '2026-02-20',
  },
  {
    id: 'proj-003',
    userId: 'u-001',
    companyName: '优学教育科技',
    industry: 'education',
    status: 'published',
    rawMaterials: [
      { id: 'f-5', name: 'BP.pptx', type: 'ppt', size: 4194304, url: '/mock/edu-bp.pptx', uploadedAt: '2026-01-25' },
      { id: 'f-6', name: '财务预测.xlsx', type: 'excel', size: 819200, url: '/mock/edu-fin.xlsx', uploadedAt: '2026-01-25' },
    ],
    structuredPackage: {
      companyOverview: {
        name: '优学教育科技', legalPerson: '王五', foundedDate: '2021-03-01',
        registeredCapital: '200万', address: '北京市海淀区中关村大街1号', employees: 45,
      },
      financials: {
        monthlyRevenue: 38, monthlyGrowthRate: 22,
        costStructure: '师资50%、场地20%、营销15%、其他15%', profitMargin: 15,
      },
      financingNeed: {
        amount: 200, expectedShareRatio: 12,
        purpose: '扩大在线课程产能', urgency: 'high',
      },
      industryInfo: {
        category: 'education', marketSize: '3.2万亿',
        competitors: '新东方、好未来', moat: 'AI个性化教学+线上线下融合',
      },
      teamInfo: {
        founderBackground: '前新东方区域总监，15年教育行业经验',
        teamSize: 45,
        keyMembers: ['王五-创始人', '赵六-CTO'],
      },
    },
    pitchDeck: {
      pages: 6, htmlContent: '', generatedAt: '2026-01-26', templateUsed: '教育行业模板',
    },
    shareLink: 'https://mc.link/p/proj-003',
    createdAt: '2026-01-25',
    updatedAt: '2026-01-26',
  },
]
