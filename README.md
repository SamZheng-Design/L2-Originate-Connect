# 发起通 Originate Connect

> Micro Connect 滴灌通平台"9个通"中的第2个产品 — 融资者的"项目发起台"

## Project Overview

- **Name**: 发起通 (Originate Connect)
- **Version**: V5.0 — Narrative Engine V5 + Enhanced Renderer
- **Goal**: 融资者上传经营材料，AI 帮你整理成三件套（原始底稿归档、结构化材料包、精美 Pitch Deck），整理好后可导出 PDF 自用或发布到投资者筛选池
- **Metaphor**: 📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理成三件套

## URLs

- **Production**: https://originate-connect.pages.dev
- **GitHub**: https://github.com/SamZheng-Design/L2-Originate-Connect
- **API**: https://originate-connect.pages.dev/api/projects
- **Template Market**: https://originate-connect.pages.dev/templates

### Demo Deck 预览链接

| 项目 | Goldman Dark | Startup Neon | Bloomberg | McKinsey |
|------|-------------|-------------|-----------|----------|
| 星火餐饮 | [classic](https://originate-connect.pages.dev/project/proj-001/deck?theme=goldman-dark&framework=classic) | [yc](https://originate-connect.pages.dev/project/proj-001/deck?theme=startup-neon&framework=yc) | [data_heavy](https://originate-connect.pages.dev/project/proj-001/deck?theme=bloomberg&framework=data_heavy) | [drip](https://originate-connect.pages.dev/project/proj-001/deck?theme=mckinsey-light&framework=drip) |
| 悦声文化 | [storytelling](https://originate-connect.pages.dev/project/proj-002/deck?theme=goldman-dark&framework=storytelling) | [yc](https://originate-connect.pages.dev/project/proj-002/deck?theme=startup-neon&framework=yc) | [data_heavy](https://originate-connect.pages.dev/project/proj-002/deck?theme=bloomberg&framework=data_heavy) | [classic](https://originate-connect.pages.dev/project/proj-002/deck?theme=mckinsey-light&framework=classic) |
| 优学教育 | [classic](https://originate-connect.pages.dev/project/proj-003/deck?theme=goldman-dark&framework=classic) | [storytelling](https://originate-connect.pages.dev/project/proj-003/deck?theme=startup-neon&framework=storytelling) | [data_heavy](https://originate-connect.pages.dev/project/proj-003/deck?theme=bloomberg&framework=data_heavy) | [yc](https://originate-connect.pages.dev/project/proj-003/deck?theme=mckinsey-light&framework=yc) |

## V5.0 核心升级 — Narrative Engine V5 + Enhanced Renderer

### V5.0 关键改进 (本次)

1. **叙事引擎V5** — 修复了headline重复body文本的问题
   - headline现在使用独立的短金句/钩子（`extractFirstSentence` 智能截取）
   - 每个headline控制在60-70字以内，不再展示整段narrative
   - headline用品牌色高亮显示，视觉层次更清晰

2. **3个新幻灯片类型**
   - **`customer_testimonials`** — 展示合作伙伴、媒体报道、行业奖项、顾问团
   - **`roadmap`** — 展示未来里程碑（从traction.milestones中分离未完成项）
   - **`projections`** — 3年收入预测柱状图

3. **框架幻灯片数大幅增加**
   - Classic: 12页 → **16页**（新增company_overview, growth_metrics, testimonials, roadmap）
   - YC: 10页 → **14页**（新增growth_metrics, unit_economics, product）
   - Drip: 10页 → **13页**（新增business_model, traction, roadmap）
   - Storytelling: 10页 → **12页**（新增testimonials, growth_metrics）
   - Data Heavy: 9页 → **11页**（新增business_model）

4. **渲染器升级**
   - 文本块改为 **2col/3col** 网格布局（取代单列长段落）
   - 时间线从垂直列表 → **卡片网格**（更适合幻灯片展示）
   - 融资Ask页改为**双栏布局**（左侧金额+信息，右侧资金用途图表）
   - KPI卡片增加`word-break`防止长文本溢出
   - 融资Ask显示预期ROI信息

5. **数据利用率大幅提升**
   - `traction.partnerships` → customer_testimonials 合作伙伴卡片
   - `traction.mediaOrAwards` → customer_testimonials 奖项卡片
   - `team.advisors` → customer_testimonials 顾问团卡片
   - `financing.expectedROI` → 融资Ask页预期回报展示
   - `product.techStack` → 产品页独立技术架构卡片
   - `narrative.investmentThesis` → 竞争优势页投资逻辑板块

### V4.1 功能（保留）
- Slide Editor 侧边栏（`E`键开关，实时编辑，双击inline编辑）
- Theme Switcher 内置换肤
- 键盘快捷键

### 架构流程

```
用户材料 → AI深度结构化(8行业×5框架) → 叙事引擎V5(智能headline+16种slide) → 渲染引擎(6模板) → Deck → [编辑器微调]
```

## 3 个高质量Demo项目

| 项目 | 行业 | 月营收 | 融资额 | 数据丰富度 |
|------|------|--------|--------|-----------|
| **星火餐饮连锁** | 🍽️ 餐饮 | ¥185万 | ¥800万 | 完整（坪效/翻台率/中央厨房/22店/320人）|
| **悦声文化传媒** | 🎵 演出 | ¥420万 | ¥1500万 | 完整（30艺人/200场/96%上座率/票务系统）|
| **优学教育科技** | 🎓 教育 | ¥120万 | ¥500万 | 完整（12000学生/95%续费/AI引擎/8中心）|

每个项目都包含完整的 `DeckStructuredData`：
- company / narrative / financials / financing / market / team / traction / product
- 6个月收入历史 + 3年预测 + 单位经济模型 + 里程碑 + 合作伙伴 + 媒体/奖项

### 6 套精品模板主题

| # | 模板 | 风格 | 适用场景 | 状态 |
|---|------|------|----------|------|
| 1 | Goldman Dark (投行深色) | Playfair Display + 金色 + 深邃 | 机构投资人路演 | ✅ 免费 |
| 2 | McKinsey Light (咨询清新) | Inter + 蓝色 + 清爽 | 系统化咨询风展示 | ✅ 免费 |
| 3 | Startup Neon (科技感) | Montserrat + 紫青渐变 + 毛玻璃 | 科技/SaaS创业项目 | ✅ 免费 |
| 4 | Micro Connect (滴灌通品牌) | 品牌Teal色 + 官方设计语言 | 滴灌通生态内项目 | ✅ 免费 |
| 5 | Muji Minimal (极简主义) | Noto Serif + 大留白 + 红黑 | 让数据自己说话 | ⭐ Premium |
| 6 | Bloomberg (数据密集) | JetBrains Mono + 橙绿 + 终端风 | 财务背景投资人 | ⭐ Premium |

### 5 种叙事框架

| 框架 | 页数 | 幻灯片顺序 | 适用 |
|------|------|------------|------|
| **Classic** | 16 | 封面→公司→痛点→方案→产品→市场→商业模式→牵引力→财务→增长→壁垒→团队→合作认可→Ask→路线图→结束 | 大多数项目 |
| **YC** | 14 | 封面→牵引力→增长→痛点→方案→产品→市场→商业模式→单位经济→财务→壁垒→团队→Ask→结束 | 有强增长数据 |
| **Drip** | 13 | 封面→公司→单位经济→财务→增长→市场→商业模式→壁垒→牵引力→团队→Ask→路线图→结束 | 门店/收入分成 |
| **Storytelling** | 12 | 封面→痛点→方案→产品→牵引力→合作认可→市场→团队→财务→增长→Ask→结束 | 有好故事可讲 |
| **Data Heavy** | 11 | 封面→增长→财务→单位经济→商业模式→市场→壁垒→牵引力→团队→Ask→结束 | 数据密集型 |

### 8 行业专家Prompt库

每个行业有独立的AI prompt，包含：行业黑话、关键KPI指标、叙事重点
- 🍽️ 餐饮 (坪效/翻台率/标准化)
- 🎵 演出 (IP资源/场次经济/上座率)
- 🎓 教育 (续费率/完课率/师资)
- 🛍️ 零售 (坪效/人效/库存周转)
- 💉 医美 (医师资源/客单价/复购)
- ☁️ SaaS (ARR/MRR/Churn/NRR)
- 🛒 电商 (GMV/ROI/复购率)
- 🤝 服务 (标准化/人效/NPS)

### 16 种幻灯片类型

| 类型 | 组件 | 数据来源 |
|------|------|----------|
| cover | CoverContent | company + narrative.oneLineHook |
| company_overview | KPIGrid(6卡片) | company + financials |
| problem | TextBlock(3col) | narrative.problemStatement + whyNow + market |
| solution | TextBlock(2col) | narrative.solutionStatement + differentiators |
| product | TextBlock(3col) | product.description + differentiators + techStack |
| business_model | Chart(doughnut) + 3KPI | financials.costStructure + investmentThesis |
| market | TextBlock(2col) | market.* + marketPosition |
| traction | Timeline(卡片网格) | traction.milestones(已完成) |
| financials | Chart(bar projections) + 4KPI | financials.projections + margins |
| growth_metrics | Chart(line trend) + 3KPI | financials.revenueHistory |
| unit_economics | KPIGrid(6-8卡片) | financials.unitEconomics |
| competitive_advantage | TextBlock(2col) | market.moat + competitors + investmentThesis |
| team | TeamGrid(4人) | team.keyMembers + founderBackground |
| customer_testimonials | TextBlock(3col) | traction.partnerships + mediaOrAwards + advisors |
| financing_ask | FinancingHero + FundsBars | financing.* |
| roadmap | Timeline(卡片) | traction.milestones(未完成) |
| closing | CoverContent | company + narrative.vision |

### Chart.js 数据可视化

- 📊 柱状图 — 3年收入预测、对比
- 📈 折线图 — 月度增长趋势
- 🍩 环形图 — 成本结构、资金用途
- 📋 KPI卡片 — 关键指标网格（支持change/description/icon）
- 📅 卡片时间线 — 里程碑展示（已完成vs未来）
- 📊 资金用途条形图 — 融资分配可视化

## Features (已完成)

### 4 个完整页面 + 1个编辑器
1. **项目列表页 `/`** — Hero区、统计栏Tab过滤、项目卡片网格、空状态、新建项目模态框
2. **项目工作区 `/project/:id`** — 3步骤指示器、拖拽上传、模板+框架选择器、AI处理、三栏Tab、主题切换
3. **Pitch Deck 全屏预览 `/project/:id/deck`** — 6主题×5框架×16种slide、Slide Editor、Theme Switcher、Chart.js图表、键盘翻页、缩略图导航、inline双击编辑
4. **模板市场 `/templates`** — 6套模板展示、5种框架说明、分类过滤、一键预览
5. **登录/注册 `/login`** — Demo级登录

### 15+ API 接口
| API | 方法 | 说明 |
|-----|------|------|
| `/api/projects` | GET/POST | 项目CRUD |
| `/api/projects/:id` | GET/PUT/DELETE | 项目详情 |
| `/api/projects/:id/upload` | POST | 上传文件 |
| `/api/projects/:id/files/:fileId` | DELETE | 删除文件 |
| `/api/projects/:id/process` | POST | AI深度结构化处理(核心) |
| `/api/projects/:id/package` | GET | 获取材料包 |
| `/api/projects/:id/deck` | GET | 获取Deck信息 |
| `/api/projects/:id/publish` | POST | 发布到筛选池 |
| `/api/projects/:id/share` | POST | 生成分享链接 |
| `/api/templates` | GET | 获取全部主题模板和叙事框架 |
| `/api/auth/register` | POST | 注册 |
| `/api/auth/login` | POST | 登录 |
| `/api/auth/logout` | POST | 登出 |
| `/api/auth/me` | GET | 当前用户 |

### Deck Engine 通用能力（可复用）

Deck Engine 是一个**完全解耦的通用模块** (`src/deck-engine/`)，可被任何产品线复用：

```typescript
import { buildDeck, renderDeckFullPage } from './deck-engine'

const output = buildDeck({
  companyName: '某公司',
  industry: 'saas',
  themeId: 'goldman-dark',
  framework: 'yc',
  lang: 'zh',
  data: structuredData,
})

const html = renderDeckFullPage(output, 'zh', 'proj-001', '某公司')
```

模块结构：
- `types.ts` — 通用类型系统（16种SlideType + 10种Content类型 + DeckStructuredData）
- `themes.ts` — 6套精品模板定义（颜色/字体/排版/组件风格）
- `narrative.ts` — 叙事引擎V5（智能headline + 17个builder + extractFirstSentence）
- `renderer.ts` — HTML渲染器（Chart.js + 10种组件）
- `theme-css.ts` — 主题CSS生成器（2col/3col/卡片时间线/融资双栏等布局）
- `prompts.ts` — 行业AI Prompt专家库（8行业×深度Schema）
- `index.ts` — 主入口：buildDeck + renderDeckFullPage + Slide Editor UI

## Data Architecture

- **数据存储**: localStorage (客户端) + 内存 (服务端Mock)
- **AI 模型**: GPT-5-mini via OpenAI-compatible API
- **数据模型**: `DeckStructuredData` (深度结构化: company/narrative/financials/financing/market/team/traction/product)
- **旧版兼容**: `StructuredPackage` → `convertLegacyToNewFormat` 自动转换
- **行业覆盖**: 8个行业 × 5种框架 × 6套模板 = 240种组合

## Tech Stack

- **Framework**: Hono + TypeScript (SSR)
- **Deck Engine**: 自研通用Pitch Deck引擎V5 + Slide Editor
- **Data Visualization**: Chart.js 4.4
- **Deployment**: Cloudflare Pages (Wrangler)
- **Styling**: Tailwind CSS (CDN) + Design Tokens + Dynamic Theme CSS
- **Icons**: FontAwesome 6.4 (CDN)
- **Fonts**: Inter + Montserrat + Noto Sans SC + Playfair Display + JetBrains Mono
- **Interaction**: 纯原生 JS (inline script)

## Deployment

- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Production URL**: https://originate-connect.pages.dev
- **GitHub**: https://github.com/SamZheng-Design/L2-Originate-Connect
- **Last Updated**: 2026-03-01

## Demo 阶段简化说明

- 文件上传：不做真实文件存储，仅记录元信息
- AI处理：有 API Key 调用 GPT-5-mini (深度Prompt)，无则使用 Mock 数据
- Pitch Deck：HTML 页面 + Chart.js 可视化（不生成真 PDF）
- 模板市场：展示和预览，Premium标记为未来付费模板
- Slide Editor：编辑结果保存到 localStorage，未来接入服务端持久化

## Next Steps

- [ ] 材料真解析（Document Intelligence接入）
- [ ] 真PDF导出（使用Puppeteer或html2canvas）
- [ ] 模板市场付费机制（Stripe集成）
- [ ] 自定义模板上传（用户自建模板）
- [ ] A/B测试不同模板的投资人转化率
- [ ] 多人协作编辑 Deck
- [ ] AI 自动优化叙事（基于投资人偏好）
- [ ] 投资人端Dashboard — 查看被推送的Deck
