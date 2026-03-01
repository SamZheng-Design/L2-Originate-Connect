# 发起通 Originate Connect

> Micro Connect 滴灌通平台"9个通"中的第2个产品 — 融资者的"项目发起台"

## Project Overview

- **Name**: 发起通 (Originate Connect)
- **Version**: V3.0
- **Goal**: 融资者上传经营材料，AI 帮你整理成三件套（原始底稿归档、结构化材料包、精美 Pitch Deck），整理好后可导出 PDF 自用或发布到投资者筛选池
- **Metaphor**: 📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理成三件套

## URLs

- **Production**: https://originate-connect.pages.dev
- **API**: https://originate-connect.pages.dev/api/projects

## Features (已完成)

### 3 个完整页面
1. **项目列表页 `/`** — Hero区、统计栏Tab过滤、项目卡片网格(3列响应式)、空状态、新建项目模态框
2. **项目工作区 `/project/:id`** — 3步骤指示器、拖拽上传、AI处理进度动画、三栏Tab成果展示、底部操作栏
3. **Pitch Deck 全屏预览 `/project/:id/deck`** — 8页精美幻灯片、键盘翻页、缩略图导航、分享/打印

### 13 个 API 接口
| API | 方法 | 说明 |
|-----|------|------|
| `/api/projects` | GET | 获取项目列表 |
| `/api/projects` | POST | 新建项目 |
| `/api/projects/:id` | GET | 项目详情 |
| `/api/projects/:id` | PUT | 更新项目 |
| `/api/projects/:id` | DELETE | 删除项目 |
| `/api/projects/:id/upload` | POST | 上传文件 |
| `/api/projects/:id/files/:fileId` | DELETE | 删除文件 |
| `/api/projects/:id/process` | POST | AI结构化处理(核心) |
| `/api/projects/:id/package` | GET | 获取材料包 |
| `/api/projects/:id/deck` | GET | 获取Pitch Deck |
| `/api/projects/:id/publish` | POST | 发布到筛选池 |
| `/api/projects/:id/share` | POST | 生成分享链接 |

### AI 集成
- **有 API Key**: 真实调用 GPT (gpt-5-mini) 生成专业融资材料包
- **无 API Key**: 自动回退到8行业预设 Mock 数据

### 其他功能
- **i18n 双语**: `?lang=en` 切换中英文，默认中文
- **设计系统**: 100% 对齐 Micro Connect 主站（品牌色、字体、阴影、动效）
- **发起通专属色**: 浅色 #FEF3C7 / 深色 #F59E0B
- **localStorage 持久化**: 用户创建的项目和上传的文件不丢失
- **响应式**: 移动端/桌面端自适应
- **Pitch Deck 8页**: 封面/公司/产品/财务/市场/优势/团队/融资

## Data Architecture

- **数据存储**: localStorage (客户端) + 内存 (服务端Mock)
- **AI 模型**: GPT (gpt-5-mini) via OpenAI-compatible API
- **数据模型**: `OriginateProject` → `StructuredPackage` + `PitchDeck` + `UploadedFile[]`
- **行业覆盖**: 8个行业 (餐饮/演出/零售/医美/教育/SaaS/电商/服务)

## Tech Stack

- **Framework**: Hono + TypeScript (SSR)
- **Deployment**: Cloudflare Pages (Wrangler)
- **Styling**: Tailwind CSS (CDN) + Design Tokens (CSS Variables)
- **Icons**: FontAwesome 6.4 (CDN)
- **Fonts**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **Interaction**: 纯原生 JS (inline script)

## User Guide

### 融资者流程
1. 打开主页 → 点击"+ 新建项目" → 输入公司名+选择行业
2. 进入工作区 → 拖拽上传经营材料（PPT/财报/营业执照等）
3. 点击"🤖 开始 AI 整理" → 等待 AI 处理（约 5-20 秒）
4. 查看三栏成果：原始底稿 / 结构化材料包 / Pitch Deck
5. 选择：导出 PDF (独立模式) 或 发布到投资者筛选池 (串联模式)

### 示例数据
- **星火餐饮连锁** (已就绪) — `/project/proj-001`
- **悦声文化传媒** (处理中) — `/project/proj-002`
- **优学教育科技** (已发布) — `/project/proj-003`

## Project Structure

```
webapp/
├── src/
│   ├── index.ts              # Hono 主入口 + 页面路由
│   ├── api.ts                # 13个 API 接口 + AI 集成
│   ├── design-tokens.ts      # 完整设计系统 CSS Variables
│   ├── i18n.ts               # 中英文双语 + 行业/状态映射
│   ├── mock-data.ts          # 3条示例项目 TypeScript 类型
│   ├── components/
│   │   ├── layout.ts         # HTML 页面骨架
│   │   ├── navbar.ts         # 导航栏 (毛玻璃效果)
│   │   ├── footer.ts         # 页脚 (Aurora 深色渐变)
│   │   ├── toast.ts          # Toast 通知
│   │   └── modal.ts          # 模态框
│   └── pages/
│       ├── home.ts           # 页面1: 项目列表页
│       ├── project.ts        # 页面2: 项目工作区
│       └── deck.ts           # 页面3: Pitch Deck 全屏预览
├── .dev.vars                 # 本地开发环境变量 (API Key)
├── ecosystem.config.cjs      # PM2 配置
├── vite.config.ts            # Vite 构建配置
├── wrangler.jsonc            # Cloudflare 配置
└── package.json
```

## Deployment

- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Production URL**: https://originate-connect.pages.dev
- **Last Updated**: 2026-03-01

### 环境变量 (生产环境需设置)
```bash
npx wrangler pages secret put OPENAI_API_KEY --project-name originate-connect
npx wrangler pages secret put OPENAI_BASE_URL --project-name originate-connect
```

## Demo 阶段简化说明

- 文件上传：不做真实文件存储，仅记录元信息
- AI处理：有 API Key 调用 GPT，无则使用 Mock 数据
- Pitch Deck：HTML 页面模拟（不生成真 PDF）
- 分享链接：生成格式化链接，不做真实短链服务
- 发布：Toast 提示"已发布"，不做真实推送
