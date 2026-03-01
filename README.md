# 发起通 Originate Connect

> Micro Connect 滴灌通平台"9个通"中的第2个产品 — 融资者的"项目发起台"

## Project Overview

- **Name**: 发起通 (Originate Connect)
- **Version**: V4.1 — Pitch Deck Engine + Slide Editor
- **Goal**: 融资者上传经营材料，AI 帮你整理成三件套（原始底稿归档、结构化材料包、精美 Pitch Deck），整理好后可导出 PDF 自用或发布到投资者筛选池
- **Metaphor**: 📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理成三件套

## URLs

- **Production**: https://originate-connect.pages.dev
- **API**: https://originate-connect.pages.dev/api/projects
- **Template Market**: https://originate-connect.pages.dev/templates
- **Deck Preview**: https://originate-connect.pages.dev/project/proj-001/deck?theme=goldman-dark

## V4.1 核心升级 — Slide Editor + Theme Switcher

### 新增功能
1. **Slide Editor 侧边栏** — 全屏Deck预览页按 `E` 键或点击"编辑"按钮打开
   - 实时编辑标题、叙事金句、副标题
   - 幻灯片上移/下移/隐藏
   - 双击幻灯片内容直接 inline 编辑（KPI数值、文字段落、金额等）
   - 编辑结果保存到 localStorage
2. **Theme Switcher** — Deck预览页内置换肤按钮，一键切换6套模板
3. **键盘快捷键** — `E` 开关编辑器，方向键翻页，Home/End 首尾页

### V4.0 架构（保留）

```
用户材料 → AI深度结构化(8行业×5框架) → 叙事引擎(决定故事线) → 渲染引擎(6模板) → 精美Deck → [编辑器微调]
```

### 6 套精品模板主题

| # | 模板 | 风格 | 适用场景 | 状态 |
|---|------|------|----------|------|
| 1 | 🏦 Goldman Dark (投行深色) | Playfair Display + 金色 + 深邃 | 机构投资人路演 | ✅ 免费 |
| 2 | 📊 McKinsey Light (咨询清新) | Inter + 蓝色 + 清爽 | 系统化咨询风展示 | ✅ 免费 |
| 3 | 🚀 Startup Neon (科技感) | Montserrat + 紫青渐变 + 毛玻璃 | 科技/SaaS创业项目 | ✅ 免费 |
| 4 | 💚 Micro Connect (滴灌通品牌) | 品牌Teal色 + 官方设计语言 | 滴灌通生态内项目 | ✅ 免费 |
| 5 | ⬜ Muji Minimal (极简主义) | Noto Serif + 大留白 + 红黑 | 让数据自己说话 | ⭐ Premium |
| 6 | 📟 Bloomberg (数据密集) | JetBrains Mono + 橙绿 + 终端风 | 财务背景投资人 | ⭐ Premium |

### 5 种叙事框架

| 框架 | 幻灯片顺序 | 适用 |
|------|------------|------|
| **Classic** 经典路演 | 痛点→方案→产品→市场→商业模式→牵引力→财务→壁垒→团队→Ask | 大多数项目 |
| **YC** Demo Day | Traction→问题→方案→市场→商业模式→财务→壁垒→团队→Ask | 有强增长数据 |
| **Drip** 滴灌通 | 公司→单位经济→财务→增长→市场→壁垒→团队→Ask | 门店/收入分成 |
| **Storytelling** 故事 | 痛点→方案→产品→牵引力→市场→团队→财务→Ask | 有好故事可讲 |
| **Data Heavy** 数据 | 增长→财务→单位经济→市场→壁垒→牵引力→团队→Ask | 数据密集型 |

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

### Chart.js 数据可视化

- 📊 柱状图 (收入趋势、对比)
- 📈 折线图 (增长曲线、预测)
- 🍩 环形图 (成本结构、资金用途)
- 📋 KPI卡片 (关键指标网格)
- 📅 时间线 (里程碑展示)

## Features (已完成)

### 4 个完整页面 + 1个编辑器
1. **项目列表页 `/`** — Hero区、统计栏Tab过滤、项目卡片网格、空状态、新建项目模态框
2. **项目工作区 `/project/:id`** — 3步骤指示器、拖拽上传、**模板+框架选择器**、AI处理、三栏Tab、**主题切换**
3. **Pitch Deck 全屏预览 `/project/:id/deck`** — **6套主题可切、5种框架可选**、**Slide Editor编辑器**、**Theme Switcher**、Chart.js图表、键盘翻页、缩略图导航、inline双击编辑
4. **模板市场 `/templates`** — 6套模板展示、5种框架说明、分类过滤、一键预览
5. **登录/注册 `/login`** — Demo级登录

### Slide Editor 编辑器功能
- ✏️ 侧边栏编辑：标题、叙事金句、副标题实时编辑
- 🎯 Inline编辑：双击幻灯片上的文字/数值直接修改
- 🔀 幻灯片排序：上移/下移调整顺序
- 👁️ 幻灯片可见性：隐藏不需要的页（打印/分享时跳过）
- 💾 本地保存：编辑结果持久化到 localStorage
- 🎨 快速换肤：内置 Theme Picker 一键切换模板

### 15+ API 接口
| API | 方法 | 说明 |
|-----|------|------|
| `/api/projects` | GET/POST | 项目CRUD |
| `/api/projects/:id` | GET/PUT/DELETE | 项目详情 |
| `/api/projects/:id/upload` | POST | 上传文件 |
| `/api/projects/:id/files/:fileId` | DELETE | 删除文件 |
| `/api/projects/:id/process` | POST | **AI深度结构化处理(核心)** — 支持framework/themeId参数 |
| `/api/projects/:id/package` | GET | 获取材料包 |
| `/api/projects/:id/deck` | GET | 获取Deck信息 |
| `/api/projects/:id/publish` | POST | 发布到筛选池 |
| `/api/projects/:id/share` | POST | 生成分享链接 |
| `/api/templates` | GET | **获取全部主题模板和叙事框架** |
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
  data: structuredData,  // AI或手工输入的数据
})

const html = renderDeckFullPage(output, 'zh', 'proj-001', '某公司')
```

模块结构：
- `types.ts` — 通用类型系统（SlideData/DeckTheme/DeckStructuredData等）
- `themes.ts` — 6套精品模板定义（颜色/字体/排版/组件风格）
- `narrative.ts` — 叙事引擎（根据框架决定幻灯片顺序和内容）
- `renderer.ts` — HTML渲染器（Chart.js + 组件）
- `theme-css.ts` — 主题CSS生成器（动态生成完整样式）
- `prompts.ts` — 行业AI Prompt专家库（8行业×深度Schema）
- `index.ts` — 主入口：buildDeck + renderDeckFullPage + **Slide Editor UI**

## Data Architecture

- **数据存储**: localStorage (客户端) + 内存 (服务端Mock)
- **AI 模型**: GPT-5-mini via OpenAI-compatible API
- **新版数据模型**: `DeckStructuredData` (深度结构化，含narrative/traction/unitEconomics)
- **旧版兼容**: `StructuredPackage` (自动转换)
- **行业覆盖**: 8个行业 × 5种框架 × 6套模板 = 240种组合

## Tech Stack

- **Framework**: Hono + TypeScript (SSR)
- **Deck Engine**: 自研通用Pitch Deck引擎 + Slide Editor
- **Data Visualization**: Chart.js 4.4
- **Deployment**: Cloudflare Pages (Wrangler)
- **Styling**: Tailwind CSS (CDN) + Design Tokens + Dynamic Theme CSS
- **Icons**: FontAwesome 6.4 (CDN)
- **Fonts**: Inter + Montserrat + Noto Sans SC + Playfair Display + JetBrains Mono
- **Interaction**: 纯原生 JS (inline script)

## Project Structure

```
webapp/
├── src/
│   ├── index.ts                  # Hono 主入口 + 页面路由
│   ├── api.ts                    # 15+ API 接口 + Deep AI 集成
│   ├── design-tokens.ts          # 完整设计系统 CSS Variables
│   ├── i18n.ts                   # 中英文双语
│   ├── mock-data.ts              # 示例数据 + TypeScript 类型
│   ├── deck-engine/              # ★ 通用Pitch Deck引擎（可复用）
│   │   ├── index.ts              # 主入口：buildDeck + renderDeckFullPage + Slide Editor
│   │   ├── types.ts              # 通用类型系统
│   │   ├── themes.ts             # 6套精品模板定义
│   │   ├── narrative.ts          # 叙事引擎（5种框架×幻灯片编排）
│   │   ├── renderer.ts           # HTML渲染器（Chart.js + 组件）
│   │   ├── theme-css.ts          # 主题CSS动态生成
│   │   └── prompts.ts            # 行业AI Prompt专家库
│   ├── components/
│   │   ├── layout.ts             # HTML 页面骨架
│   │   ├── navbar.ts             # 导航栏
│   │   ├── footer.ts             # 页脚
│   │   ├── toast.ts              # Toast 通知
│   │   └── modal.ts              # 模态框
│   └── pages/
│       ├── home.ts               # 项目列表页
│       ├── project.ts            # 项目工作区（含模板选择器）
│       ├── deck.ts               # Pitch Deck 预览（基于Engine）
│       ├── template-market.ts    # ★ 模板市场
│       └── login.ts              # 登录/注册
├── .dev.vars                     # 本地API Key
├── ecosystem.config.cjs          # PM2
├── vite.config.ts                # Vite
├── wrangler.jsonc                # Cloudflare
└── package.json
```

## Deployment

- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Production URL**: https://originate-connect.pages.dev
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
