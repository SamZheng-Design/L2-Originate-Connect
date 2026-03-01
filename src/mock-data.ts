// ═══════════════════════════════════════════════════════
// Mock Data — 3 条示例项目 + 高质量 DeckStructuredData
// V4.1: 大幅充实叙事、财务、团队、产品数据
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
  deckData?: any  // DeckStructuredData — 高质量预构建数据
  shareLink?: string
  createdAt: string
  updatedAt: string
}

export const mockProjects: OriginateProject[] = [
  // ═══════════════════════════════════════════════════════
  // 项目1：星火餐饮连锁 — 餐饮行业标杆Demo
  // ═══════════════════════════════════════════════════════
  {
    id: 'proj-001',
    userId: 'u-001',
    companyName: '星火餐饮连锁',
    industry: 'catering',
    status: 'ready',
    rawMaterials: [
      { id: 'f-1', name: '商业计划书.pptx', type: 'ppt', size: 5242880, url: '/mock/bp.pptx', uploadedAt: '2026-02-10' },
      { id: 'f-2', name: '2025年度财务报表.xlsx', type: 'excel', size: 1048576, url: '/mock/fin.xlsx', uploadedAt: '2026-02-10' },
      { id: 'f-3', name: '营业执照.pdf', type: 'pdf', size: 524288, url: '/mock/license.pdf', uploadedAt: '2026-02-10' },
      { id: 'f-7', name: '门店运营SOP手册.pdf', type: 'pdf', size: 2097152, url: '/mock/sop.pdf', uploadedAt: '2026-02-10' },
      { id: 'f-8', name: '中央厨房设备清单.xlsx', type: 'excel', size: 327680, url: '/mock/kitchen.xlsx', uploadedAt: '2026-02-10' },
      { id: 'f-9', name: '品牌VI手册.pdf', type: 'pdf', size: 8388608, url: '/mock/vi.pdf', uploadedAt: '2026-02-10' },
    ],
    structuredPackage: {
      companyOverview: {
        name: '星火餐饮连锁', legalPerson: '张明辉', foundedDate: '2020-06-15',
        registeredCapital: '500万', address: '深圳市南山区科技园南路88号星火大厦', employees: 320,
      },
      financials: {
        monthlyRevenue: 185, monthlyGrowthRate: 8.5,
        costStructure: '食材成本32%、人工成本28%、门店租金18%、营销推广8%、中央厨房运营6%、管理及其他8%', profitMargin: 22,
      },
      financingNeed: {
        amount: 800, expectedShareRatio: 12,
        purpose: '开设8家新门店 + 第二中央厨房建设', urgency: 'medium',
      },
      industryInfo: {
        category: 'catering', marketSize: '4.7万亿',
        competitors: '海底捞、西贝莜面村、太二酸菜鱼', moat: '自研中央厨房供应链+标准化SOP体系+会员私域运营',
      },
      teamInfo: {
        founderBackground: '连续创业者，曾任百胜中国华南区运营总监8年，管理过200+门店',
        teamSize: 320,
        keyMembers: ['张明辉-创始人/CEO', '林婉清-CFO/前普华永道高级经理', '陈宏志-COO/前海底捞区域总', '刘思远-CTO/前美团餐饮SaaS负责人'],
      },
    },
    // ★ 高质量 DeckStructuredData
    deckData: {
      company: {
        name: '星火餐饮连锁',
        legalPerson: '张明辉',
        foundedDate: '2020-06-15',
        registeredCapital: '500万',
        address: '深圳市南山区科技园南路88号',
        employees: 320,
        description: '中式快餐连锁品牌，主打"现炒快出"模式，22家直营门店覆盖深圳、广州、东莞三城。',
      },
      narrative: {
        oneLineHook: '22家直营门店，月营收185万，连续18个月正增长——中国版Chipotle正在珠三角崛起',
        problemStatement: '中式快餐市场4.7万亿，但80%的门店仍是"夫妻老婆店"——口味不稳定、食安难追溯、扩张靠运气。消费者需要"好吃、干净、快速"三者兼得，供给侧却严重落后于需求升级。',
        solutionStatement: '星火通过自建中央厨房+标准化SOP+数字化运营三位一体，实现了"中餐工业化"：每道菜出品时间<8分钟，口味一致性达96%，单店人效比行业均值高40%。',
        whyNow: '后疫情时代消费者对连锁品牌信任度大幅提升，加盟商合作意愿强烈；同时大量商铺租金处于低谷期，扩张窗口期稍纵即逝。',
        vision: '3年内覆盖大湾区100家门店，成为珠三角最大的中式快餐连锁品牌，5年内启动港股IPO。',
        investmentThesis: '4.7万亿中式快餐市场，连锁化率不足15%（对比美国65%），巨大的结构性机会。星火已跑通单店模型（14个月回本，坪效¥4200/月），核心团队来自百胜中国+海底捞+美团，具备从0到100的复制能力。22家直营门店月收185万、同店增长6.2%，是一台经过验证的"门店复印机"。',
      },
      financials: {
        monthlyRevenue: 185,
        annualRevenue: 2100,
        monthlyGrowthRate: 8.5,
        grossMargin: 68,
        netMargin: 22,
        costStructure: [
          { item: '食材成本', percentage: 32 },
          { item: '人工成本', percentage: 28 },
          { item: '门店租金', percentage: 18 },
          { item: '营销推广', percentage: 8 },
          { item: '中央厨房', percentage: 6 },
          { item: '管理/其他', percentage: 8 },
        ],
        revenueHistory: [
          { month: '2025-09', revenue: 128 },
          { month: '2025-10', revenue: 138 },
          { month: '2025-11', revenue: 147 },
          { month: '2025-12', revenue: 158 },
          { month: '2026-01', revenue: 172 },
          { month: '2026-02', revenue: 185 },
        ],
        projections: [
          { year: '2026', revenue: 3600 },
          { year: '2027', revenue: 7200 },
          { year: '2028', revenue: 12000 },
        ],
        unitEconomics: {
          revenuePerSqm: 4200,
          tablesTurnover: 4.2,
          averageOrderValue: 38,
          customerAcquisitionCost: 12,
          lifetimeValue: 960,
          paybackPeriod: '14个月',
        },
      },
      financing: {
        amount: 800,
        expectedShareRatio: 12,
        purpose: '新开8家门店 + 第二中央厨房 + 数字化系统升级',
        urgency: 'medium' as const,
        useOfFunds: [
          { item: '新门店装修及设备', percentage: 45 },
          { item: '第二中央厨房建设', percentage: 25 },
          { item: '数字化系统升级', percentage: 12 },
          { item: '品牌营销推广', percentage: 10 },
          { item: '运营资金储备', percentage: 8 },
        ],
        expectedROI: '预计18个月回本，年化收益率约22%',
      },
      market: {
        size: '4.7万亿',
        growth: '年增长8.2%',
        competitors: '海底捞(火锅品类)、西贝莜面村(西北菜)、太二酸菜鱼(单品类)，但中式快餐赛道尚无绝对龙头',
        moat: '自研中央厨房实现85%半成品标准化、200+道菜SOP沉淀、会员系统40万私域用户复购率62%',
        targetCustomer: '一二线城市25-40岁白领，午餐/晚餐场景，追求"好吃不贵、快速健康"',
        marketPosition: '珠三角中式快餐连锁Top 5，唯一实现全链路数字化运营的品牌',
      },
      team: {
        founderBackground: '张明辉，连续创业者，百胜中国华南区运营总监8年，管理200+门店，深谙连锁餐饮从选址到运营的全链路。第一次创业（茶饮品牌）被并购退出。',
        teamSize: 320,
        keyMembers: [
          { name: '张明辉', role: '创始人 & CEO', background: '前百胜中国华南区运营总监，8年管理200+门店经验，连续创业者' },
          { name: '林婉清', role: 'CFO', background: '前普华永道高级审计经理，CPA/CFA双证，主导过3个餐饮企业IPO审计' },
          { name: '陈宏志', role: 'COO', background: '前海底捞深圳区域总经理，5年，从0建起12家门店团队' },
          { name: '刘思远', role: 'CTO', background: '前美团餐饮SaaS技术负责人，搭建了服务10万+商户的数字化中台' },
        ],
        advisors: ['李明（前麦当劳中国供应链VP）', '王芳（和谐汇一资本合伙人，消费投资专家）'],
      },
      traction: {
        customers: '日均服务8000+人次，会员40万，月复购率62%，大众点评均分4.6',
        milestones: [
          { date: '2020-06', event: '深圳科技园首店开业，首月即盈利', achieved: true },
          { date: '2021-03', event: '中央厨房一期投产，实现85%半成品标准化', achieved: true },
          { date: '2022-01', event: '门店数突破10家，月营收首次破100万', achieved: true },
          { date: '2023-06', event: '获得深创投天使轮300万融资', achieved: true },
          { date: '2024-09', event: '拓展至广州、东莞，门店数达18家', achieved: true },
          { date: '2025-12', event: '22家门店，月营收185万，同店增长6.2%', achieved: true },
          { date: '2026-06', event: '目标：30家门店，启动第二中央厨房', achieved: false },
          { date: '2027-01', event: '目标：50家门店，开启加盟模式试点', achieved: false },
        ],
        partnerships: ['美团/饿了么外卖平台战略商户', '深圳农产品集团食材直供协议', '腾讯智慧零售数字化合作伙伴'],
        mediaOrAwards: ['2025深圳十大新锐餐饮品牌', '36氪"中式快餐新势力"专题报道', '大众点评2025年度必吃榜(3家门店入选)'],
      },
      product: {
        description: '主打"现炒快出"中式快餐，招牌菜系包括黄焖鸡、酸菜鱼、小炒肉等12个经典品类，每季度更新4道时令新品。全部菜品实现"点单后8分钟出餐"。',
        differentiators: [
          '自建中央厨房：85%食材标准化预处理，确保22家门店口味一致性达96%',
          '数字化运营：自研POS+供应链+会员一体化系统，实时监控每家门店的翻台率和食材损耗',
          '会员私域生态：40万微信会员，月均触达3次，复购率62%（行业平均35%）',
          '极致坪效：月均坪效¥4,200/㎡，比行业均值高40%，人效比同行高30%',
        ],
        techStack: '自研餐饮数字化中台（Go+React），整合POS、供应链、会员、外卖四大模块',
      },
    },
    pitchDeck: {
      pages: 12, htmlContent: '', generatedAt: '2026-02-11', templateUsed: '滴灌通品牌',
    },
    shareLink: 'https://mc.link/p/proj-001',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-11',
  },

  // ═══════════════════════════════════════════════════════
  // 项目2：悦声文化传媒 — 演出行业Demo
  // ═══════════════════════════════════════════════════════
  {
    id: 'proj-002',
    userId: 'u-003',
    companyName: '悦声文化传媒',
    industry: 'concert',
    status: 'ready',
    rawMaterials: [
      { id: 'f-4', name: '2026年演出计划.pdf', type: 'pdf', size: 3145728, url: '/mock/plan.pdf', uploadedAt: '2026-02-20' },
      { id: 'f-10', name: '艺人资源库.xlsx', type: 'excel', size: 1572864, url: '/mock/artists.xlsx', uploadedAt: '2026-02-20' },
      { id: 'f-11', name: '财务模型.xlsx', type: 'excel', size: 819200, url: '/mock/concert-fin.xlsx', uploadedAt: '2026-02-20' },
      { id: 'f-12', name: '过往演出案例集.pptx', type: 'ppt', size: 12582912, url: '/mock/cases.pptx', uploadedAt: '2026-02-20' },
    ],
    structuredPackage: {
      companyOverview: {
        name: '悦声文化传媒', legalPerson: '李韵然', foundedDate: '2019-11-01',
        registeredCapital: '1000万', address: '上海市静安区南京西路1266号恒隆广场', employees: 65,
      },
      financials: {
        monthlyRevenue: 420, monthlyGrowthRate: 15,
        costStructure: '艺人成本45%、场地租赁20%、制作执行15%、营销推广12%、管理/其他8%', profitMargin: 25,
      },
      financingNeed: {
        amount: 1500, expectedShareRatio: 10,
        purpose: '独家IP巡演项目投入 + 自有场地装修', urgency: 'high',
      },
      industryInfo: {
        category: 'concert', marketSize: '6800亿',
        competitors: '摩登天空、华人文化、太合音乐', moat: '独家签约30+头部艺人+自研票务系统+线上线下联动变现',
      },
      teamInfo: {
        founderBackground: '前华纳音乐中国区市场总监，15年音乐产业经验',
        teamSize: 65,
        keyMembers: ['李韵然-创始人/CEO', '周彦辰-演出总监', '赵紫薇-市场VP', '孙铭-技术总监'],
      },
    },
    deckData: {
      company: {
        name: '悦声文化传媒',
        legalPerson: '李韵然',
        foundedDate: '2019-11-01',
        registeredCapital: '1000万',
        address: '上海市静安区南京西路1266号',
        employees: 65,
        description: '华东头部演出经纪公司，独家签约30+头部音乐人，年度执行200+场演出，覆盖Livehouse到万人体育场全场景。',
      },
      narrative: {
        oneLineHook: '年执行200+场演出，独家签约30位头部艺人，上座率96%——线下娱乐复苏浪潮中增长最快的演出公司',
        problemStatement: '后疫情时代线下演出需求井喷（2025年中国演出市场6800亿），但行业高度碎片化：70%的演出公司规模不到20人，缺乏IP储备和标准化制作能力，导致"有好内容没好体验、有好场地没好内容"的结构性错配。',
        solutionStatement: '悦声打造了"IP签约+标准化制作+自研票务+私域运营"四位一体模型：独家签约保证内容稀缺性，标准化制作流程将执行成本降低30%，自研票务系统实现85%的直销率（对比行业平均40%），120万私域粉丝保障每场演出的基础上座率。',
        whyNow: 'Z世代为"体验"买单的意愿达到历史新高（年均娱乐消费增长23%），叠加城市更新带来的大量新演出空间，2025-2028年是演出行业的黄金扩张期。',
        vision: '3年内成为全国Top 3演出经纪公司，打造3个年收入过亿的超级IP巡演品牌。',
        investmentThesis: '6800亿演出市场年增长18%，悦声凭借30+独家艺人的IP壁垒、96%的超高上座率和自研票务系统的85%直销能力，建立了极强的"内容-渠道-数据"护城河。月收入420万且保持15%月增长，核心团队来自华纳音乐+摩登天空+大麦网，已证明从单场到巡演的规模化复制能力。',
      },
      financials: {
        monthlyRevenue: 420,
        annualRevenue: 4800,
        monthlyGrowthRate: 15,
        grossMargin: 55,
        netMargin: 25,
        costStructure: [
          { item: '艺人/内容成本', percentage: 45 },
          { item: '场地租赁', percentage: 20 },
          { item: '制作执行', percentage: 15 },
          { item: '营销推广', percentage: 12 },
          { item: '管理/其他', percentage: 8 },
        ],
        revenueHistory: [
          { month: '2025-09', revenue: 230 },
          { month: '2025-10', revenue: 275 },
          { month: '2025-11', revenue: 310 },
          { month: '2025-12', revenue: 355 },
          { month: '2026-01', revenue: 380 },
          { month: '2026-02', revenue: 420 },
        ],
        projections: [
          { year: '2026', revenue: 7200 },
          { year: '2027', revenue: 14000 },
          { year: '2028', revenue: 22000 },
        ],
        unitEconomics: {
          averageOrderValue: 380,
          customerAcquisitionCost: 28,
          lifetimeValue: 2800,
          paybackPeriod: '单场盈亏平衡800人（实际均1200+人）',
        },
      },
      financing: {
        amount: 1500,
        expectedShareRatio: 10,
        purpose: '3个超级IP巡演项目启动资金 + 自有演出空间改造',
        urgency: 'high' as const,
        useOfFunds: [
          { item: '超级IP巡演制作', percentage: 40 },
          { item: '自有演出空间装修', percentage: 25 },
          { item: '艺人签约储备金', percentage: 15 },
          { item: '票务系统升级', percentage: 10 },
          { item: '运营资金', percentage: 10 },
        ],
        expectedROI: '预计12个月回本，巡演项目年化收益率35%+',
      },
      market: {
        size: '6800亿',
        growth: '年增长18.5%',
        competitors: '摩登天空(独立音乐生态)、华人文化(大型演唱会)、太合音乐(版权+演出)，但中腰部演出市场（Livehouse/音乐节/中型场馆）缺乏标准化龙头',
        moat: '30+独家签约头部艺人形成内容壁垒、自研票务系统实现85%直销率、120万私域粉丝池保障上座率',
        targetCustomer: '18-35岁Z世代及新中产，年均现场娱乐消费¥2,400+，愿意为"独家体验"付费',
        marketPosition: '华东最大独立演出经纪公司，Livehouse品类市场份额12%，音乐节品类份额8%',
      },
      team: {
        founderBackground: '李韵然，前华纳音乐中国区市场总监15年，操盘过林俊杰、周杰伦等百场巡演的市场推广，深度人脉覆盖头部厂牌和场馆资源。',
        teamSize: 65,
        keyMembers: [
          { name: '李韵然', role: '创始人 & CEO', background: '前华纳音乐中国区市场总监15年，操盘百场头部巡演市场推广' },
          { name: '周彦辰', role: '演出总监', background: '前摩登天空制作总监，主导草莓音乐节等30+大型活动制作' },
          { name: '赵紫薇', role: '市场VP', background: '前大麦网华东市场负责人，搭建过千万级用户营销体系' },
          { name: '孙铭', role: '技术总监', background: '前猫眼娱乐技术架构师，主导票务系统从0到日均百万级并发' },
        ],
        advisors: ['陈涌海（著名音乐人，清华物理学家，跨界顾问）', '郑钧（音乐人/投资人，在音乐产业有广泛资源）'],
      },
      traction: {
        customers: '累计服务观众280万人次，120万私域粉丝，演出上座率96%',
        milestones: [
          { date: '2019-11', event: '公司成立，签约首批5位独立音乐人', achieved: true },
          { date: '2020-08', event: '疫情期间转型线上Live，单场直播最高50万人观看', achieved: true },
          { date: '2021-06', event: '线下演出恢复，全年执行80场，月营收突破100万', achieved: true },
          { date: '2022-12', event: '自研票务系统上线，直销率从20%提升至60%', achieved: true },
          { date: '2023-09', event: '签约艺人突破20位，首次举办万人音乐节', achieved: true },
          { date: '2024-06', event: '年执行演出200场，私域粉丝突破100万', achieved: true },
          { date: '2025-12', event: '月营收420万，独家艺人30位，上座率96%', achieved: true },
          { date: '2026-06', event: '目标：启动3个超级IP巡演，全国10城', achieved: false },
        ],
        partnerships: ['大麦网/猫眼娱乐票务分销合作', '万达/凯德商业综合体场地战略合作', '网易云音乐/QQ音乐线上直播联运'],
        mediaOrAwards: ['2025年上海十大文化创意企业', '虎嗅"演出新经济"专题报道', '第一财经"Z世代消费新趋势"案例'],
      },
      product: {
        description: '全场景演出服务商：从200人Livehouse到20000人体育场，提供"策划-签约-制作-票务-运营"全链路服务。2025年执行200+场演出，涵盖独立音乐Live、主题音乐节、企业定制演出三大品类。',
        differentiators: [
          '独家IP矩阵：30+签约头部音乐人，形成内容独占性壁垒，对手无法复制',
          '自研票务系统：85%直销率（行业平均40%），掌握一手用户数据和定价权',
          '私域运营飞轮：120万微信+抖音粉丝，新演出发售2小时内售罄率达70%',
          '标准化制作SOP：200+场演出沉淀的标准化流程，执行成本比行业低30%',
        ],
        techStack: '自研票务平台（Node.js+Flutter），日均处理10万+级订单，支持动态定价和防黄牛系统',
      },
    },
    pitchDeck: {
      pages: 12, htmlContent: '', generatedAt: '2026-02-21', templateUsed: '科技感',
    },
    shareLink: 'https://mc.link/p/proj-002',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-21',
  },

  // ═══════════════════════════════════════════════════════
  // 项目3：优学教育科技 — 教育行业Demo
  // ═══════════════════════════════════════════════════════
  {
    id: 'proj-003',
    userId: 'u-001',
    companyName: '优学教育科技',
    industry: 'education',
    status: 'published',
    rawMaterials: [
      { id: 'f-5', name: 'BP-优学教育.pptx', type: 'ppt', size: 4194304, url: '/mock/edu-bp.pptx', uploadedAt: '2026-01-25' },
      { id: 'f-6', name: '2025年财务预测模型.xlsx', type: 'excel', size: 819200, url: '/mock/edu-fin.xlsx', uploadedAt: '2026-01-25' },
      { id: 'f-13', name: 'AI教学引擎白皮书.pdf', type: 'pdf', size: 6291456, url: '/mock/ai-whitepaper.pdf', uploadedAt: '2026-01-25' },
      { id: 'f-14', name: '学生成绩提升数据报告.xlsx', type: 'excel', size: 1048576, url: '/mock/scores.xlsx', uploadedAt: '2026-01-25' },
      { id: 'f-15', name: '合规资质证书.pdf', type: 'pdf', size: 2097152, url: '/mock/edu-license.pdf', uploadedAt: '2026-01-25' },
    ],
    structuredPackage: {
      companyOverview: {
        name: '优学教育科技', legalPerson: '王知行', foundedDate: '2021-03-01',
        registeredCapital: '500万', address: '北京市海淀区中关村大街1号海龙大厦', employees: 85,
      },
      financials: {
        monthlyRevenue: 120, monthlyGrowthRate: 18,
        costStructure: '教师薪酬38%、AI研发22%、场地租金15%、营销获客12%、教材/内容8%、管理/其他5%', profitMargin: 28,
      },
      financingNeed: {
        amount: 500, expectedShareRatio: 8,
        purpose: 'AI教学引擎2.0研发 + 拓展5个新城市', urgency: 'high',
      },
      industryInfo: {
        category: 'education', marketSize: '3.2万亿',
        competitors: '学而思、猿辅导、作业帮', moat: 'AI自适应学习引擎+双师模式+95%续费率',
      },
      teamInfo: {
        founderBackground: '清华CS本硕+MIT AI Lab访问学者，前字节教育业务技术负责人',
        teamSize: 85,
        keyMembers: ['王知行-创始人/CEO', '张芷若-COO/前新东方区域总监', '陈逸飞-CTO/前百度AI Lab', '刘雨桐-教研VP/北师大教育学博士'],
      },
    },
    deckData: {
      company: {
        name: '优学教育科技',
        legalPerson: '王知行',
        foundedDate: '2021-03-01',
        registeredCapital: '500万',
        address: '北京市海淀区中关村大街1号',
        employees: 85,
        description: 'AI驱动的K12个性化教育品牌，自研AI自适应学习引擎，线下8个学习中心+线上平台，服务12000+学生。',
      },
      narrative: {
        oneLineHook: '12000名学生，续费率95%，平均提分23分——用AI让每个孩子都有一位"超级名师"',
        problemStatement: '中国有1.8亿K12学生，但优质教师资源极度稀缺（师生比1:200+）。传统培训机构"一个老师讲、几十个学生听"的大班模式，无法解决"每个孩子薄弱点不同"的根本问题——一个班上40%的时间对每个学生来说是无效的。',
        solutionStatement: '优学自研AI自适应学习引擎，为每个学生构建"知识图谱画像"，精准识别薄弱环节并推送个性化学习路径。配合"AI+真人双师"模式：AI负责诊断和练习，真人名师负责启发和答疑——效率提升3倍，成本降低50%。',
        whyNow: '大模型技术突破让AI教育从"题库推荐"跃迁到"真正理解学生"；同时政策鼓励教育科技创新，家长对个性化教育的付费意愿创历史新高（年均增长25%）。',
        vision: '让AI成为每个孩子的私人导师，3年覆盖20城10万学生，重新定义中国K12个性化教育。',
        investmentThesis: '3.2万亿教育市场，AI正在重塑整个行业的成本结构和交付效率。优学AI引擎已验证：12000学生平均提分23分、续费率95%（行业平均60%），单位经济模型健康（LTV/CAC=8.5x）。创始团队集清华AI+字节教育+北师大教研于一体，是"技术+教育"双基因的稀缺组合。',
      },
      financials: {
        monthlyRevenue: 120,
        annualRevenue: 1350,
        monthlyGrowthRate: 18,
        grossMargin: 72,
        netMargin: 28,
        costStructure: [
          { item: '教师薪酬', percentage: 38 },
          { item: 'AI研发投入', percentage: 22 },
          { item: '场地租金', percentage: 15 },
          { item: '营销获客', percentage: 12 },
          { item: '教材/内容', percentage: 8 },
          { item: '管理/其他', percentage: 5 },
        ],
        revenueHistory: [
          { month: '2025-09', revenue: 55 },
          { month: '2025-10', revenue: 65 },
          { month: '2025-11', revenue: 78 },
          { month: '2025-12', revenue: 88 },
          { month: '2026-01', revenue: 102 },
          { month: '2026-02', revenue: 120 },
        ],
        projections: [
          { year: '2026', revenue: 2400 },
          { year: '2027', revenue: 6000 },
          { year: '2028', revenue: 12000 },
        ],
        unitEconomics: {
          customerAcquisitionCost: 800,
          lifetimeValue: 6800,
          averageOrderValue: 4200,
          churnRate: 1.8,
          paybackPeriod: '2.1个月',
          monthlyRecurring: 120,
          annualRecurring: 1350,
        },
      },
      financing: {
        amount: 500,
        expectedShareRatio: 8,
        purpose: 'AI教学引擎2.0（多模态+大模型）+ 5个新城市扩张',
        urgency: 'high' as const,
        useOfFunds: [
          { item: 'AI引擎2.0研发', percentage: 35 },
          { item: '新城市学习中心', percentage: 30 },
          { item: '教师招募培训', percentage: 15 },
          { item: '市场营销推广', percentage: 12 },
          { item: '运营资金储备', percentage: 8 },
        ],
        expectedROI: '预计10个月回本，年化收益率40%+',
      },
      market: {
        size: '3.2万亿',
        growth: '年增长12%，AI教育细分增长35%',
        competitors: '学而思(大班课转型)、猿辅导(在线题库)、作业帮(流量平台)，但"AI自适应+线下双师"模式尚无强竞争对手',
        moat: '自研AI自适应学习引擎（2年+研发、300万+学习行为数据训练）、95%续费率构建的口碑壁垒、北京海淀名师资源池',
        targetCustomer: 'K12学生家长（一二线城市中产家庭），孩子成绩中等偏上、追求个性化提分方案',
        marketPosition: '北京海淀区AI教育品类排名Top 3，学生满意度NPS 82分（行业均30分）',
      },
      team: {
        founderBackground: '王知行，清华计算机本硕、MIT AI Lab访问学者，前字节跳动教育业务技术负责人（主导"大力教育"AI推荐引擎），技术+教育双重基因的连续创业者。',
        teamSize: 85,
        keyMembers: [
          { name: '王知行', role: '创始人 & CEO', background: '清华CS本硕+MIT AI Lab，前字节大力教育技术负责人，主导AI推荐引擎研发' },
          { name: '张芷若', role: 'COO', background: '前新东方北京区域总监12年，从0搭建过50+教学中心运营体系' },
          { name: '陈逸飞', role: 'CTO', background: '前百度AI Lab高级研究员，NLP/推荐系统专家，15篇顶会论文' },
          { name: '刘雨桐', role: '教研VP', background: '北师大教育学博士，前好未来教研院核心成员，主导K12课程体系设计' },
        ],
        advisors: ['吴恩达（DeepLearning.AI创始人，教育AI先驱，技术顾问）', '俞敏洪（新东方创始人，教育行业战略顾问）'],
      },
      traction: {
        customers: '12000+在读学生，300+签约教师，8个线下学习中心，NPS 82分',
        milestones: [
          { date: '2021-03', event: '公司成立，AI自适应引擎V1.0启动研发', achieved: true },
          { date: '2021-09', event: '海淀首家学习中心开业，首批200名学生', achieved: true },
          { date: '2022-06', event: 'AI引擎V1.0上线，学生平均提分15分', achieved: true },
          { date: '2023-01', event: '学生数突破3000，获得真格基金Pre-A轮200万', achieved: true },
          { date: '2023-09', event: 'AI引擎V1.5升级，接入大模型，提分效果达23分', achieved: true },
          { date: '2024-06', event: '拓展至3个城市（北京/上海/杭州），学生数8000+', achieved: true },
          { date: '2025-12', event: '12000学生，续费率95%，月营收120万', achieved: true },
          { date: '2026-06', event: '目标：AI引擎2.0发布，拓展至8个城市', achieved: false },
        ],
        partnerships: ['北师大教育学院联合研发合作', '腾讯教育云技术合作伙伴', '学而思/新东方部分优质教师资源共享'],
        mediaOrAwards: ['2025中国教育科技50强', '量子位"AI+教育"年度案例', '教育部教育信息化创新试点项目'],
      },
      product: {
        description: '"AI导师+真人名师"双师模式：AI引擎基于300万+学习行为数据为每个学生构建知识图谱画像，精准推送个性化学习路径；真人名师在关键节点进行启发式教学和情感陪伴。线下8个学习中心提供沉浸式学习环境。',
        differentiators: [
          'AI自适应引擎：300万+学习行为数据训练，精准识别每个学生的知识薄弱点，推送效率比传统教学高3倍',
          '双师模式：AI处理80%的重复性教学（诊断+练习），名师聚焦20%的高价值互动（启发+答疑），人效提升5倍',
          '验证过的提分效果：12000学生平均提分23分，续费率95%（行业平均60%），NPS 82分',
          '数据飞轮：越多学生使用→越多学习数据→AI越精准→提分效果越好→口碑传播→更多学生加入',
        ],
        techStack: '自研AI自适应学习引擎（Python+PyTorch），知识图谱+强化学习+大模型RAG，日均处理50万+学习事件',
      },
    },
    pitchDeck: {
      pages: 12, htmlContent: '', generatedAt: '2026-01-26', templateUsed: '咨询清新',
    },
    shareLink: 'https://mc.link/p/proj-003',
    createdAt: '2026-01-25',
    updatedAt: '2026-01-26',
  },
]
