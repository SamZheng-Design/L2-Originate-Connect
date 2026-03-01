// ═══════════════════════════════════════════════════════
// 页面 3: Pitch Deck 全屏预览页（/project/:id/deck）
// 全新版本 — 基于 Deck Engine 通用引擎
// 支持多模板主题 + 多叙事框架 + Chart.js 可视化
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT, INDUSTRIES } from '../i18n'
import { mockProjects } from '../mock-data'
import {
  buildDeck, renderDeckFullPage, convertLegacyToNewFormat,
  type NarrativeFramework, type DeckInput, type DeckStructuredData
} from '../deck-engine'

// ═══════════════════════════════════════════════════════
// Main render — 根据URL参数选择模板和框架
// ═══════════════════════════════════════════════════════
export function renderDeckPage(lang: Lang, id: string, themeId?: string, framework?: string): string {
  const project = mockProjects.find(p => p.id === id)

  if (!project || !project.structuredPackage) {
    return fallbackPage(lang, id, project?.companyName)
  }

  // 将旧版数据转为新版格式
  const data: DeckStructuredData = convertLegacyToNewFormat(project.structuredPackage, project.industry)

  // 如果有AI生成的新版数据(存在 project.deckData)，优先使用
  const deckData = (project as any).deckData || data

  // 确定模板和框架
  const selectedTheme = themeId || 'micro-connect'
  const selectedFramework = (framework || 'classic') as NarrativeFramework

  // 构建 Deck
  const input: DeckInput = {
    companyName: project.companyName,
    industry: project.industry,
    themeId: selectedTheme,
    framework: selectedFramework,
    lang,
    data: deckData,
  }

  const output = buildDeck(input)

  // 渲染完整页面
  return renderDeckFullPage(output, lang, id, project.companyName)
}

// ---- Fallback when no data ----
function fallbackPage(lang: Lang, id: string, companyName?: string): string {
  const name = companyName || 'Project'
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Pitch Deck</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 flex items-center justify-center h-screen">
  <div class="text-center text-white">
    <i class="fas fa-file-powerpoint text-6xl text-gray-600 mb-6"></i>
    <h1 class="text-2xl font-bold mb-2">${name}</h1>
    <p class="text-gray-400 mb-8">${lang === 'zh' ? 'Pitch Deck 尚未生成，请先完成 AI 处理' : 'Pitch Deck not generated yet. Please complete AI processing first.'}</p>
    <a href="/project/${id}${lang === 'en' ? '?lang=en' : ''}" class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition">
      <i class="fas fa-arrow-left"></i> ${lang === 'zh' ? '返回项目' : 'Back to Project'}
    </a>
  </div>
</body>
</html>`
}
