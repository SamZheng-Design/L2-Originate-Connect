// ═══════════════════════════════════════════════════════
// 发起通 i18n — 中英文双语系统
// ═══════════════════════════════════════════════════════

import type { Context } from 'hono'

export type Lang = 'zh' | 'en'

export function getLang(c: Context): Lang {
  const q = c.req.query('lang')
  return q === 'en' ? 'en' : 'zh'
}

interface Bilingual { zh: string; en: string }

export function tt(obj: Bilingual, lang: Lang): string {
  return lang === 'en' ? obj.en : obj.zh
}

// All bilingual text
export const TEXT = {
  // Navbar
  appName: { zh: '发起通', en: 'Originate Connect' },
  brandName: { zh: '滴灌通', en: 'MICRO CONNECT' },
  backToMain: { zh: '返回主站', en: 'Back to Main' },

  // Hero
  heroTitle: { zh: '发起融资', en: 'Originate Financing' },
  heroSubtitle: { zh: '丢材料 · AI 打包成书 · 分享给潜在参与方', en: 'Upload materials · AI packages them · Share with potential investors' },
  heroMetaphor: { zh: '📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理', en: '📚 Author submits manuscript — hand it to the library, AI editor organizes for you' },
  newProject: { zh: '+ 新建项目', en: '+ New Project' },

  // Stats
  all: { zh: '全部', en: 'All' },
  draft: { zh: '草稿', en: 'Draft' },
  processing: { zh: 'AI 处理中', en: 'Processing' },
  ready: { zh: '已就绪', en: 'Ready' },
  published: { zh: '已发布', en: 'Published' },

  // Project Card
  financing: { zh: '融资', en: 'Financing' },
  monthlyRevenue: { zh: '月收入', en: 'Monthly Revenue' },
  files: { zh: '个文件', en: 'files' },
  updated: { zh: '更新', en: 'Updated' },
  viewDetails: { zh: '查看详情', en: 'View Details' },
  continueEdit: { zh: '继续编辑', en: 'Continue Editing' },
  viewProgress: { zh: '查看进度', en: 'View Progress' },
  continueProcess: { zh: '继续处理', en: 'Continue' },

  // Empty State
  noProjects: { zh: '还没有任何项目', en: 'No projects yet' },
  noProjectsDesc: { zh: '上传你的经营材料，AI 帮你整理成标准融资包', en: 'Upload your business materials, AI helps organize them into a standard financing package' },
  startFirst: { zh: '开始你的第一个项目', en: 'Start Your First Project' },

  // Modal
  createProject: { zh: '创建项目', en: 'Create Project' },
  companyName: { zh: '公司名称', en: 'Company Name' },
  companyNamePlaceholder: { zh: '请输入公司名称', en: 'Enter company name' },
  industry: { zh: '行业', en: 'Industry' },
  selectIndustry: { zh: '请选择行业', en: 'Select industry' },
  cancel: { zh: '取消', en: 'Cancel' },
  create: { zh: '创建', en: 'Create' },

  // Project Workspace
  uploadMaterials: { zh: '上传材料', en: 'Upload Materials' },
  aiProcessing: { zh: 'AI 处理中', en: 'AI Processing' },
  viewResults: { zh: '查看成果', en: 'View Results' },
  dragUpload: { zh: '拖拽文件到此处，或点击上传', en: 'Drag files here, or click to upload' },
  supportedFormats: { zh: '支持 PDF、Word、Excel、PPT、图片', en: 'Supports PDF, Word, Excel, PPT, Images' },
  justThrowIn: { zh: '什么都往里丢，AI 帮你整理', en: 'Throw everything in, AI organizes for you' },
  startAI: { zh: '🤖 开始 AI 整理', en: '🤖 Start AI Processing' },
  needUploadFirst: { zh: '请先上传至少一个文件', en: 'Please upload at least one file first' },

  // AI Processing Steps
  extractBasicInfo: { zh: '提取基础信息', en: 'Extracting basic info' },
  analyzeFinancials: { zh: '分析财务数据', en: 'Analyzing financials' },
  organizeIndustry: { zh: '整理行业信息', en: 'Organizing industry info' },
  generateDeck: { zh: '生成 Pitch Deck', en: 'Generating Pitch Deck' },
  aiAnalyzing: { zh: 'AI 正在分析你的材料，请稍候...', en: 'AI is analyzing your materials, please wait...' },

  // Results Tabs
  rawMaterials: { zh: '原始底稿', en: 'Raw Materials' },
  structuredPkg: { zh: '材料包', en: 'Structured Package' },
  pitchDeck: { zh: 'Pitch Deck', en: 'Pitch Deck' },

  // Structured Package Labels
  companyOverview: { zh: '公司概况', en: 'Company Overview' },
  financialOverview: { zh: '财务概况', en: 'Financial Overview' },
  financingNeed: { zh: '融资需求', en: 'Financing Need' },
  industryInfo: { zh: '行业信息', en: 'Industry Info' },
  teamInfo: { zh: '团队信息', en: 'Team Info' },
  legalPerson: { zh: '法人代表', en: 'Legal Person' },
  founded: { zh: '成立日期', en: 'Founded' },
  registeredCapital: { zh: '注册资本', en: 'Registered Capital' },
  address: { zh: '办公地址', en: 'Address' },
  employees: { zh: '员工人数', en: 'Employees' },
  growthRate: { zh: '月增长率', en: 'Monthly Growth' },
  profitMargin: { zh: '利润率', en: 'Profit Margin' },
  costStructure: { zh: '成本结构', en: 'Cost Structure' },
  amount: { zh: '融资金额', en: 'Amount' },
  shareRatio: { zh: '预期分成', en: 'Expected Share' },
  purpose: { zh: '融资用途', en: 'Purpose' },
  urgency: { zh: '紧急程度', en: 'Urgency' },
  marketSize: { zh: '市场规模', en: 'Market Size' },
  competitors: { zh: '竞争格局', en: 'Competitors' },
  moat: { zh: '竞争壁垒', en: 'Competitive Moat' },
  founderBg: { zh: '创始人背景', en: 'Founder Background' },
  teamSize: { zh: '团队规模', en: 'Team Size' },
  keyMembers: { zh: '核心成员', en: 'Key Members' },

  // Actions
  saveDraft: { zh: '保存草稿', en: 'Save Draft' },
  exportPDF: { zh: '导出 PDF', en: 'Export PDF' },
  publishToPool: { zh: '🚀 发布到投资者筛选池', en: '🚀 Publish to Investor Pool' },
  fullPreview: { zh: '全屏预览', en: 'Full Preview' },
  generateShareLink: { zh: '生成分享链接', en: 'Generate Share Link' },
  download: { zh: '下载', en: 'Download' },

  // Deck page
  backToProject: { zh: '← 返回项目', en: '← Back to Project' },
  share: { zh: '分享', en: 'Share' },
  print: { zh: '打印', en: 'Print' },
  prevPage: { zh: '上一页', en: 'Previous' },
  nextPage: { zh: '下一页', en: 'Next' },

  // Toast
  toastPublished: { zh: '已发布到筛选池（Demo 演示）', en: 'Published to investor pool (Demo)' },
  toastDraftSaved: { zh: '草稿已保存', en: 'Draft saved' },
  toastLinkCopied: { zh: '分享链接已复制', en: 'Share link copied' },
  toastProjectCreated: { zh: '项目创建成功', en: 'Project created successfully' },
  toastProcessComplete: { zh: 'AI 处理完成！', en: 'AI processing complete!' },
  toastDeleted: { zh: '文件已删除', en: 'File deleted' },

  // Urgency
  urgencyHigh: { zh: '高', en: 'High' },
  urgencyMedium: { zh: '中等', en: 'Medium' },
  urgencyLow: { zh: '低', en: 'Low' },

  // Footer
  copyright: { zh: '© 2026 Micro Connect Group. 保留所有权利。', en: '© 2026 Micro Connect Group. All rights reserved.' },
  privacy: { zh: '隐私政策', en: 'Privacy Policy' },
  terms: { zh: '服务条款', en: 'Terms of Service' },

  // Misc
  persons: { zh: '人', en: '' },
  wan: { zh: '万', en: '0K' },
}

// Industry labels
export const INDUSTRIES: Record<string, Bilingual & { icon: string }> = {
  concert:    { zh: '演出', en: 'Concert/Events', icon: 'fa-music' },
  catering:   { zh: '餐饮', en: 'Catering', icon: 'fa-utensils' },
  retail:     { zh: '零售', en: 'Retail', icon: 'fa-store' },
  healthcare: { zh: '医美健康', en: 'Healthcare', icon: 'fa-heartbeat' },
  education:  { zh: '教育', en: 'Education', icon: 'fa-graduation-cap' },
  saas:       { zh: 'SaaS', en: 'SaaS', icon: 'fa-cloud' },
  ecommerce:  { zh: '电商', en: 'E-Commerce', icon: 'fa-shopping-cart' },
  service:    { zh: '服务业', en: 'Services', icon: 'fa-concierge-bell' },
}

// Project statuses
export const PROJECT_STATUS: Record<string, { zh: string; en: string; color: string; bgColor: string }> = {
  draft:      { zh: '草稿', en: 'Draft', color: '#86868b', bgColor: '#f5f5f7' },
  processing: { zh: 'AI 处理中', en: 'Processing', color: '#32ade6', bgColor: 'rgba(50,173,230,0.1)' },
  ready:      { zh: '已就绪', en: 'Ready', color: '#34c759', bgColor: 'rgba(52,199,89,0.1)' },
  published:  { zh: '已发布', en: 'Published', color: '#5DC4B3', bgColor: 'rgba(93,196,179,0.1)' },
}

// Format money
export function formatMoney(val: number, lang: Lang): string {
  if (lang === 'en') return `¥${val * 10}K`
  return `¥${val}万`
}
