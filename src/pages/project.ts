// ═══════════════════════════════════════════════════════
// 页面 2: 项目工作区（/project/:id）
// 步骤指示器 / 文件上传 / AI处理进度 / 三栏Tab / 底部操作栏
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { renderLayout } from '../components/layout'
import { tt, TEXT, INDUSTRIES, PROJECT_STATUS, formatMoney } from '../i18n'
import { mockProjects } from '../mock-data'
import type { OriginateProject, StructuredPackage } from '../mock-data'
import { ALL_THEMES } from '../deck-engine'

// ---- helpers ----
function fileIcon(type: string): string {
  const m: Record<string,string> = { pdf:'fa-file-pdf text-red-500', word:'fa-file-word text-blue-500', excel:'fa-file-excel text-green-600', ppt:'fa-file-powerpoint text-orange-500', image:'fa-file-image text-purple-500' }
  return m[type] || 'fa-file text-gray-400'
}
function fmtSize(b: number): string { return b >= 1048576 ? (b/1048576).toFixed(1)+' MB' : (b/1024).toFixed(0)+' KB' }

function urgencyLabel(u: string, lang: Lang): string {
  if (u === 'high') return tt(TEXT.urgencyHigh, lang)
  if (u === 'medium') return tt(TEXT.urgencyMedium, lang)
  return tt(TEXT.urgencyLow, lang)
}

// ---- Render structured package ----
function renderPackageHTML(pkg: StructuredPackage, lang: Lang): string {
  const co = pkg.companyOverview; const fi = pkg.financials
  const fn = pkg.financingNeed; const ii = pkg.industryInfo; const ti = pkg.teamInfo
  return `
  <!-- Company Overview -->
  <div class="pkg-section">
    <h4 class="pkg-section-title"><i class="fas fa-building"></i> ${tt(TEXT.companyOverview, lang)}</h4>
    <div class="pkg-grid">
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.companyName, lang)}</span><span class="pkg-value">${co.name}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.legalPerson, lang)}</span><span class="pkg-value">${co.legalPerson}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.founded, lang)}</span><span class="pkg-value">${co.foundedDate}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.registeredCapital, lang)}</span><span class="pkg-value">${co.registeredCapital}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.address, lang)}</span><span class="pkg-value">${co.address}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.employees, lang)}</span><span class="pkg-value">${co.employees}${tt(TEXT.persons, lang)}</span></div>
    </div>
  </div>
  <!-- Financials -->
  <div class="pkg-section">
    <h4 class="pkg-section-title"><i class="fas fa-chart-line"></i> ${tt(TEXT.financialOverview, lang)}</h4>
    <div class="pkg-grid">
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.monthlyRevenue, lang)}</span><span class="pkg-value pkg-highlight">${formatMoney(fi.monthlyRevenue, lang)}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.growthRate, lang)}</span><span class="pkg-value" style="color:var(--color-success)">${fi.monthlyGrowthRate}%</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.profitMargin, lang)}</span><span class="pkg-value">${fi.profitMargin}%</span></div>
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.costStructure, lang)}</span><span class="pkg-value">${fi.costStructure}</span></div>
    </div>
  </div>
  <!-- Financing Need -->
  <div class="pkg-section">
    <h4 class="pkg-section-title"><i class="fas fa-hand-holding-usd"></i> ${tt(TEXT.financingNeed, lang)}</h4>
    <div class="pkg-grid">
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.amount, lang)}</span><span class="pkg-value pkg-highlight">${formatMoney(fn.amount, lang)}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.shareRatio, lang)}</span><span class="pkg-value">${fn.expectedShareRatio}%</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.urgency, lang)}</span><span class="pkg-value">${urgencyLabel(fn.urgency, lang)}</span></div>
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.purpose, lang)}</span><span class="pkg-value">${fn.purpose}</span></div>
    </div>
  </div>
  <!-- Industry -->
  <div class="pkg-section">
    <h4 class="pkg-section-title"><i class="fas fa-globe"></i> ${tt(TEXT.industryInfo, lang)}</h4>
    <div class="pkg-grid">
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.industry, lang)}</span><span class="pkg-value">${INDUSTRIES[ii.category] ? tt(INDUSTRIES[ii.category], lang) : ii.category}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.marketSize, lang)}</span><span class="pkg-value">${ii.marketSize}</span></div>
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.competitors, lang)}</span><span class="pkg-value">${ii.competitors}</span></div>
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.moat, lang)}</span><span class="pkg-value">${ii.moat}</span></div>
    </div>
  </div>
  <!-- Team -->
  <div class="pkg-section">
    <h4 class="pkg-section-title"><i class="fas fa-users"></i> ${tt(TEXT.teamInfo, lang)}</h4>
    <div class="pkg-grid">
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.founderBg, lang)}</span><span class="pkg-value">${ti.founderBackground}</span></div>
      <div class="pkg-item"><span class="pkg-label">${tt(TEXT.teamSize, lang)}</span><span class="pkg-value">${ti.teamSize}${tt(TEXT.persons, lang)}</span></div>
      <div class="pkg-item pkg-item-full"><span class="pkg-label">${tt(TEXT.keyMembers, lang)}</span><span class="pkg-value">${ti.keyMembers.join('、')}</span></div>
    </div>
  </div>
  `
}

// ---- Raw materials list (grouped by type) ----
function renderRawMaterials(p: OriginateProject, lang: Lang): string {
  const groups: Record<string, typeof p.rawMaterials> = {}
  p.rawMaterials.forEach(f => { if (!groups[f.type]) groups[f.type] = []; groups[f.type].push(f) })
  const typeLabels: Record<string,string> = { ppt:'PPT', excel:'Excel', pdf:'PDF', word:'Word', image: lang==='en'?'Images':'图片', other: lang==='en'?'Other':'其他' }

  let html = ''
  for (const [type, files] of Object.entries(groups)) {
    html += `<div class="raw-group">
      <div class="raw-group-title">${typeLabels[type] || type} (${files.length})</div>
      ${files.map(f => `
        <div class="raw-file-row">
          <i class="fas ${fileIcon(f.type)} raw-file-icon"></i>
          <span class="raw-file-name">${f.name}</span>
          <span class="raw-file-size">${fmtSize(f.size)}</span>
          <button class="btn btn-ghost btn-sm" style="padding:4px 10px; font-size:12px;" onclick="showToast('Demo: ${lang==='en'?'Download simulated':'下载模拟'}','info')">
            <i class="fas fa-download"></i> ${tt(TEXT.download, lang)}
          </button>
        </div>
      `).join('')}
    </div>`
  }
  return html || `<p style="color:var(--text-tertiary); text-align:center; padding:32px;">${lang==='en'?'No files uploaded yet':'暂无上传文件'}</p>`
}

// ═══════════════════════════════════════════════════════
// Main render
// ═══════════════════════════════════════════════════════
export function renderProjectPage(lang: Lang, id: string): string {
  // Find project from mock data
  const project = mockProjects.find(p => p.id === id)
  const langQ = lang === 'en' ? '?lang=en' : ''

  // Step state based on status
  const stepState = (status: string) => {
    if (status === 'draft') return { s1: 'active', s2: '', s3: '', l1: '', l2: '' }
    if (status === 'processing') return { s1: 'completed', s2: 'active', s3: '', l1: 'completed', l2: '' }
    return { s1: 'completed', s2: 'completed', s3: 'active', l1: 'completed', l2: 'completed' }
  }

  // For mock projects with data, render full page; for unknown IDs, render empty workspace
  const st = stepState(project?.status || 'draft')
  const companyName = project?.companyName || (lang === 'en' ? 'New Project' : '新项目')
  const industry = project?.industry || ''
  const hasPkg = !!project?.structuredPackage
  const hasResults = project?.status === 'ready' || project?.status === 'published'

  const body = `
  <main class="workspace-main">
    <div class="container">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <a href="/${langQ}" class="breadcrumb-link">${tt(TEXT.appName, lang)}</a>
        <i class="fas fa-chevron-right breadcrumb-sep"></i>
        <span class="breadcrumb-current">${companyName}</span>
      </div>

      <!-- Step Indicator -->
      <div class="step-indicator" id="step-indicator">
        <div class="step-item ${st.s1}" data-step="1">
          <div class="step-dot">${st.s1 === 'completed' ? '<i class="fas fa-check" style="font-size:13px"></i>' : '1'}</div>
          <span class="step-label">${tt(TEXT.uploadMaterials, lang)}</span>
        </div>
        <div class="step-line ${st.l1}"></div>
        <div class="step-item ${st.s2}" data-step="2">
          <div class="step-dot">${st.s2 === 'completed' ? '<i class="fas fa-check" style="font-size:13px"></i>' : '2'}</div>
          <span class="step-label">${tt(TEXT.aiProcessing, lang)}</span>
        </div>
        <div class="step-line ${st.l2}"></div>
        <div class="step-item ${st.s3}" data-step="3">
          <div class="step-dot">3</div>
          <span class="step-label">${tt(TEXT.viewResults, lang)}</span>
        </div>
      </div>

      <!-- ═══ Step 1: Upload Materials ═══ -->
      <section class="step-section" id="section-step1">
        <h2 class="section-title"><span class="section-num">①</span> ${tt(TEXT.uploadMaterials, lang)}</h2>

        <!-- Basic Info -->
        <div class="card" style="padding: 20px; margin-bottom: 20px;">
          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div style="flex:1; min-width:200px;">
              <label class="form-label">${tt(TEXT.companyName, lang)}</label>
              <input type="text" id="input-company" class="form-input" value="${companyName}" ${project ? 'readonly style="background:var(--bg-page)"' : ''}/>
            </div>
            <div style="flex:1; min-width:200px;">
              <label class="form-label">${tt(TEXT.industry, lang)}</label>
              <select id="input-industry" class="form-select" ${project ? 'disabled style="background:var(--bg-page)"' : ''}>
                ${Object.entries(INDUSTRIES).map(([k,v]) => `<option value="${k}" ${k===industry?'selected':''}>${tt(v, lang)}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Upload Zone -->
        <div class="upload-zone" id="upload-zone" onclick="document.getElementById('file-input').click()">
          <input type="file" id="file-input" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg" style="display:none" onchange="handleFileSelect(event)"/>
          <div style="margin-bottom: 12px;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 40px; color: var(--brand-primary);"></i>
          </div>
          <p style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
            ${tt(TEXT.dragUpload, lang)}
          </p>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
            ${tt(TEXT.supportedFormats, lang)}
          </p>
          <p style="font-size: 13px; color: var(--text-tertiary);">
            ${tt(TEXT.justThrowIn, lang)}
          </p>
        </div>

        <!-- File list -->
        <div class="file-list" id="file-list">
          ${project ? project.rawMaterials.map(f => `
            <div class="file-row" data-file-id="${f.id}">
              <i class="fas ${fileIcon(f.type)} file-row-icon"></i>
              <span class="file-row-name">${f.name}</span>
              <span class="file-row-meta">${fmtSize(f.size)}</span>
              <span class="file-row-meta">${f.uploadedAt}</span>
              <button class="file-row-del" onclick="removeFile('${f.id}')"><i class="fas fa-trash-alt"></i></button>
            </div>
          `).join('') : ''}
        </div>

        <!-- Template & Framework Selector -->
        <div class="card" style="padding: 20px; margin-top: 20px;">
          <h3 style="font-size:15px; font-weight:700; color:var(--text-title); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-palette" style="color:var(--brand-primary);"></i> 
            ${lang === 'zh' ? '选择模板和叙事框架' : 'Choose Template & Framework'}
          </h3>
          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div style="flex:1; min-width:200px;">
              <label class="form-label">${lang === 'zh' ? '主题模板' : 'Theme'}</label>
              <select id="select-theme" class="form-select">
                ${ALL_THEMES.map(th => {
                  const name = lang === 'en' ? th.name.en : th.name.zh
                  return `<option value="${th.id}" ${th.id === 'micro-connect' ? 'selected' : ''}>${name}${th.isPremium ? ' ★' : ''}</option>`
                }).join('')}
              </select>
            </div>
            <div style="flex:1; min-width:200px;">
              <label class="form-label">${lang === 'zh' ? '叙事框架' : 'Narrative Framework'}</label>
              <select id="select-framework" class="form-select">
                <option value="classic" selected>${lang === 'zh' ? '经典路演 (痛点→方案→财务→Ask)' : 'Classic (Problem→Solution→Financials→Ask)'}</option>
                <option value="yc">YC Demo Day (Traction→Problem→Solution)</option>
                <option value="drip">${lang === 'zh' ? '滴灌通模式 (单位经济→门店→分成)' : 'Drip Capital (Unit Economics→Store→Share)'}</option>
                <option value="storytelling">${lang === 'zh' ? '故事驱动 (创始人→痛点→Aha→愿景)' : 'Storytelling (Founder→Pain→Aha→Vision)'}</option>
                <option value="data_heavy">${lang === 'zh' ? '数据密集 (KPI→趋势→对标→预测)' : 'Data Heavy (KPI→Trends→Benchmarks→Forecast)'}</option>
              </select>
            </div>
          </div>
          <div style="margin-top:10px;">
            <a href="/templates${lang === 'en' ? '?lang=en' : ''}" target="_blank" style="font-size:12px; color:var(--brand-primary); font-weight:500;">
              <i class="fas fa-external-link-alt"></i> ${lang === 'zh' ? '浏览模板市场查看更多 →' : 'Browse Template Market →'}
            </a>
          </div>
        </div>

        <!-- Start AI button -->
        <div style="text-align: center; margin-top: 24px;">
          <button class="btn btn-primary btn-lg" id="btn-start-ai" onclick="startAIProcess()">
            ${tt(TEXT.startAI, lang)}
          </button>
        </div>
      </section>

      <!-- ═══ Step 2: AI Processing ═══ -->
      <section class="step-section" id="section-step2" style="display:${project?.status === 'processing' ? 'block' : 'none'};">
        <h2 class="section-title"><span class="section-num">②</span> ${tt(TEXT.aiProcessing, lang)}</h2>
        <div class="card ai-progress-card">
          <div class="ai-step-list">
            <div class="ai-step" id="ai-step-1"><span class="ai-step-icon">○</span> ${tt(TEXT.extractBasicInfo, lang)}</div>
            <div class="ai-step" id="ai-step-2"><span class="ai-step-icon">○</span> ${tt(TEXT.analyzeFinancials, lang)}</div>
            <div class="ai-step" id="ai-step-3"><span class="ai-step-icon">○</span> ${tt(TEXT.organizeIndustry, lang)}</div>
            <div class="ai-step" id="ai-step-4"><span class="ai-step-icon">○</span> ${tt(TEXT.generateDeck, lang)}</div>
          </div>
          <div class="progress-bar" style="margin: 24px 0 12px;">
            <div class="progress-fill" id="ai-progress-fill" style="width: 0%;"></div>
          </div>
          <p style="text-align:center; font-size:14px; color:var(--text-secondary);" id="ai-status-text">
            ${tt(TEXT.aiAnalyzing, lang)}
          </p>
        </div>
      </section>

      <!-- ═══ Step 3: View Results ═══ -->
      <section class="step-section" id="section-step3" style="display:${hasResults ? 'block' : 'none'};">
        <h2 class="section-title"><span class="section-num">③</span> ${tt(TEXT.viewResults, lang)}</h2>

        <!-- Tab bar -->
        <div class="tab-group" id="result-tabs">
          <div class="tab-item active" data-tab="raw" onclick="switchTab('raw')">
            <i class="fas fa-folder-open" style="margin-right:6px;"></i>${tt(TEXT.rawMaterials, lang)}
          </div>
          <div class="tab-item" data-tab="package" onclick="switchTab('package')">
            <i class="fas fa-box" style="margin-right:6px;"></i>${tt(TEXT.structuredPkg, lang)}
          </div>
          <div class="tab-item" data-tab="deck" onclick="switchTab('deck')">
            <i class="fas fa-presentation" style="margin-right:6px;"></i>${tt(TEXT.pitchDeck, lang)}
          </div>
        </div>

        <!-- Tab: Raw materials -->
        <div class="tab-content active" id="tab-raw">
          ${project ? renderRawMaterials(project, lang) : ''}
        </div>

        <!-- Tab: Structured Package -->
        <div class="tab-content" id="tab-package" style="display:none;">
          ${hasPkg ? renderPackageHTML(project!.structuredPackage!, lang) : `<p style="color:var(--text-tertiary); text-align:center; padding:40px;">${lang==='en'?'Not yet processed':'尚未处理'}</p>`}
        </div>

        <!-- Tab: Pitch Deck -->
        <div class="tab-content" id="tab-deck" style="display:none;">
          <div class="deck-preview-area">
            <!-- Theme switcher for preview -->
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; justify-content:center;">
              ${ALL_THEMES.map(th => {
                const name = lang === 'en' ? th.name.en : th.name.zh
                return `<button class="deck-theme-btn ${th.id === 'micro-connect' ? 'active' : ''}" data-theme="${th.id}" onclick="switchDeckTheme('${th.id}')" style="padding:6px 12px; border-radius:9999px; border:1px solid var(--border-default); background:var(--bg-white); font-size:12px; font-weight:500; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  <span style="width:10px;height:10px;border-radius:50%;background:${th.colors.primary};display:inline-block;"></span> ${name}
                </button>`
              }).join('')}
            </div>
            <div class="deck-slides-row" id="deck-slides-row">
              ${hasResults ? renderDeckThumbnails(project!, lang) : ''}
            </div>
            <div style="display:flex; gap:12px; justify-content:center; margin-top:20px; flex-wrap:wrap;">
              <a href="/project/${id}/deck${langQ}" class="btn btn-brand" id="deck-preview-link">
                <i class="fas fa-expand"></i> ${tt(TEXT.fullPreview, lang)}
              </a>
              <button class="btn btn-secondary" onclick="generateShareLink()">
                <i class="fas fa-link"></i> ${tt(TEXT.generateShareLink, lang)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ Bottom Action Bar ═══ -->
      <div class="bottom-bar" id="bottom-bar">
        <button class="btn btn-secondary" onclick="saveDraft()">
          <i class="fas fa-save"></i> ${tt(TEXT.saveDraft, lang)}
        </button>
        <button class="btn btn-secondary" onclick="exportPDF()" ${hasResults?'':'disabled'}>
          <i class="fas fa-file-pdf"></i> ${tt(TEXT.exportPDF, lang)}
        </button>
        <button class="btn btn-primary" onclick="publishProject()" ${hasResults?'':'disabled'}>
          ${tt(TEXT.publishToPool, lang)}
        </button>
      </div>

    </div>
  </main>
  `

  const extraCSS = workspaceCSS
  const extraScript = workspaceScript(lang, id, project)

  return renderLayout(lang, companyName, body, extraCSS, extraScript)
}

// ---- Deck thumbnail placeholders ----
function renderDeckThumbnails(p: OriginateProject, lang: Lang): string {
  const pages = p.pitchDeck?.pages || 8
  const titles_zh = ['封面','公司简介','产品与服务','财务亮点','市场分析','竞争优势','团队背景','融资需求']
  const titles_en = ['Cover','Company','Product','Financials','Market','Advantage','Team','Financing']
  const titles = lang === 'en' ? titles_en : titles_zh
  let html = ''
  for (let i = 0; i < pages; i++) {
    html += `
    <div class="deck-thumb" onclick="location.href='/project/${p.id}/deck${lang==='en'?'?lang=en':''}'">
      <div class="deck-thumb-num">${i+1}</div>
      <div class="deck-thumb-title">${titles[i] || (lang==='en'?'Page ':'第') + (i+1) + (lang==='en'?'':'页')}</div>
    </div>`
  }
  return html
}

// ═══════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════
const workspaceCSS = `
.workspace-main { padding-top: 16px; padding-bottom: 100px; min-height: 80vh; }

/* Breadcrumb */
.breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:20px; font-size:14px; }
.breadcrumb-link { color:var(--brand-primary); font-weight:500; }
.breadcrumb-link:hover { text-decoration:underline; }
.breadcrumb-sep { font-size:10px; color:var(--text-tertiary); }
.breadcrumb-current { color:var(--text-secondary); }

/* Step indicator override for workspace */
.step-indicator { margin-bottom:32px; padding:20px; background:var(--bg-white); border-radius:var(--radius-lg); box-shadow:var(--shadow-xs); }
.step-label { font-size:13px; margin-top:4px; }
@media(max-width:640px) {
  .step-label { display:none; }
  .step-line { width:40px; }
}

/* Section */
.section-title {
  font-size:18px; font-weight:700; color:var(--text-title);
  margin-bottom:16px; display:flex; align-items:center; gap:8px;
}
.section-num {
  display:inline-flex; align-items:center; justify-content:center;
  font-size:14px; color:var(--brand-primary);
}
.step-section { margin-bottom:32px; }

/* File list */
.file-list { margin-top:16px; }
.file-row {
  display:flex; align-items:center; gap:12px;
  padding:12px 16px; background:var(--bg-white);
  border:1px solid var(--border-default); border-radius:var(--radius-sm);
  margin-bottom:8px; transition:all var(--duration-fast) var(--ease-spring);
}
.file-row:hover { border-color:var(--border-hover); box-shadow:var(--shadow-xs); }
.file-row-icon { font-size:18px; width:24px; text-align:center; }
.file-row-name { flex:1; font-size:14px; font-weight:500; color:var(--text-primary); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.file-row-meta { font-size:12px; color:var(--text-tertiary); white-space:nowrap; }
.file-row-del {
  background:none; border:none; cursor:pointer; padding:6px 8px;
  color:var(--text-tertiary); border-radius:var(--radius-sm);
  transition:all var(--duration-fast);
}
.file-row-del:hover { color:var(--color-error); background:rgba(255,55,95,0.08); }

/* AI Progress */
.ai-progress-card { padding:32px; text-align:left; }
.ai-step-list { display:flex; flex-direction:column; gap:14px; }
.ai-step {
  display:flex; align-items:center; gap:12px;
  font-size:15px; color:var(--text-secondary);
  transition:all var(--duration-normal) var(--ease-spring);
}
.ai-step.done { color:var(--color-success); font-weight:600; }
.ai-step.active { color:var(--brand-primary); font-weight:600; }
.ai-step-icon { font-size:18px; width:24px; text-align:center; }

/* Tabs content */
.tab-content { padding:20px 0; }
.tab-content.active { display:block; }

/* Raw materials group */
.raw-group { margin-bottom:16px; }
.raw-group-title { font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px; }
.raw-file-row {
  display:flex; align-items:center; gap:12px;
  padding:10px 14px; background:var(--bg-white);
  border:1px solid var(--border-default); border-radius:var(--radius-sm);
  margin-bottom:6px;
}
.raw-file-icon { font-size:16px; width:20px; text-align:center; }
.raw-file-name { flex:1; font-size:14px; font-weight:500; color:var(--text-primary); }
.raw-file-size { font-size:12px; color:var(--text-tertiary); }

/* Structured Package */
.pkg-section { margin-bottom:24px; }
.pkg-section-title {
  font-size:15px; font-weight:700; color:var(--text-title);
  margin-bottom:12px; display:flex; align-items:center; gap:8px;
  padding-bottom:8px; border-bottom:1px solid var(--border-default);
}
.pkg-section-title i { color:var(--brand-primary); font-size:14px; }
.pkg-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.pkg-item {
  display:flex; flex-direction:column; gap:2px;
  padding:10px 14px; background:var(--bg-page);
  border-radius:var(--radius-sm);
}
.pkg-item-full { grid-column:1/-1; }
.pkg-label { font-size:12px; color:var(--text-tertiary); font-weight:500; }
.pkg-value { font-size:14px; color:var(--text-primary); font-weight:600; }
.pkg-highlight { color:var(--brand-primary); font-size:16px; }
@media(max-width:640px) { .pkg-grid { grid-template-columns:1fr; } }

/* Deck thumbnails */
.deck-preview-area { padding:16px 0; }
.deck-slides-row {
  display:flex; gap:12px; overflow-x:auto;
  padding:8px 0 16px; -webkit-overflow-scrolling:touch;
}
.deck-thumb {
  flex-shrink:0; width:140px; height:100px;
  background:var(--bg-white); border:1px solid var(--border-default);
  border-radius:var(--radius-sm); cursor:pointer;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  transition:all var(--duration-fast) var(--ease-spring);
  gap:6px;
}
.deck-thumb:hover { border-color:var(--brand-primary); box-shadow:var(--shadow-sm); transform:translateY(-2px); }
.deck-thumb-num { font-size:20px; font-weight:800; color:var(--brand-primary); }
.deck-thumb-title { font-size:11px; color:var(--text-secondary); font-weight:500; }

/* Bottom bar */
.bottom-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:40;
  background:var(--bg-navbar); backdrop-filter:blur(24px) saturate(180%);
  border-top:0.5px solid var(--border-default);
  padding:12px 24px; display:flex; justify-content:center; gap:12px;
  box-shadow:0 -2px 8px rgba(0,0,0,0.04);
}
@media(max-width:640px) {
  .bottom-bar { flex-wrap:wrap; }
  .bottom-bar .btn { flex:1; min-width:120px; font-size:13px; padding:10px 12px; }
}
`

// ═══════════════════════════════════════════════════════
// JavaScript
// ═══════════════════════════════════════════════════════
function workspaceScript(lang: Lang, projectId: string, project: OriginateProject | undefined): string {
  const langQ = lang === 'en' ? '?lang=en' : ''
  const isLocalProject = !project // If not found in mock data, it's a localStorage project

  return `
  const PROJECT_ID = '${projectId}';
  const IS_LOCAL = ${isLocalProject};

  // ---- Load local project data if needed ----
  function getLocalProject() {
    const projects = JSON.parse(localStorage.getItem('oc_projects') || '[]');
    return projects.find(p => p.id === PROJECT_ID);
  }

  function saveLocalProject(proj) {
    let projects = JSON.parse(localStorage.getItem('oc_projects') || '[]');
    const idx = projects.findIndex(p => p.id === PROJECT_ID);
    if (idx >= 0) projects[idx] = proj;
    else projects.push(proj);
    localStorage.setItem('oc_projects', JSON.stringify(projects));
  }

  // ---- Upload zone drag & drop ----
  const uploadZone = document.getElementById('upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', () => { uploadZone.classList.remove('dragover'); });
    uploadZone.addEventListener('drop', e => {
      e.preventDefault(); uploadZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
  }

  function handleFileSelect(e) { if (e.target.files.length) handleFiles(e.target.files); }

  function handleFiles(files) {
    const list = document.getElementById('file-list');
    for (const file of files) {
      const id = 'f-' + Date.now().toString(36) + Math.random().toString(36).substr(2,4);
      const ext = file.name.split('.').pop().toLowerCase();
      const typeMap = { pdf:'pdf', doc:'word', docx:'word', xls:'excel', xlsx:'excel', ppt:'ppt', pptx:'ppt', png:'image', jpg:'image', jpeg:'image' };
      const ftype = typeMap[ext] || 'other';
      const iconMap = { pdf:'fa-file-pdf text-red-500', word:'fa-file-word text-blue-500', excel:'fa-file-excel text-green-600', ppt:'fa-file-powerpoint text-orange-500', image:'fa-file-image text-purple-500' };
      const icon = iconMap[ftype] || 'fa-file text-gray-400';
      const size = file.size >= 1048576 ? (file.size/1048576).toFixed(1)+' MB' : (file.size/1024).toFixed(0)+' KB';
      const date = new Date().toISOString().split('T')[0];

      const row = document.createElement('div');
      row.className = 'file-row animate-fade-in';
      row.dataset.fileId = id;
      row.innerHTML = '<i class="fas ' + icon + ' file-row-icon"></i>' +
        '<span class="file-row-name">' + file.name + '</span>' +
        '<span class="file-row-meta">' + size + '</span>' +
        '<span class="file-row-meta">' + date + '</span>' +
        '<button class="file-row-del" onclick="removeFile(\\'' + id + '\\')"><i class="fas fa-trash-alt"></i></button>';
      list.appendChild(row);

      // Save to localStorage
      if (IS_LOCAL) {
        const proj = getLocalProject();
        if (proj) {
          if (!proj.rawMaterials) proj.rawMaterials = [];
          proj.rawMaterials.push({ id, name: file.name, type: ftype, size: file.size, url: '', uploadedAt: date });
          saveLocalProject(proj);
        }
      }
    }
    showToast('${lang==='en'?'Files added':'文件已添加'}', 'success');
  }

  function removeFile(fileId) {
    const row = document.querySelector('[data-file-id="' + fileId + '"]');
    if (row) { row.style.opacity = '0'; setTimeout(() => row.remove(), 200); }
    if (IS_LOCAL) {
      const proj = getLocalProject();
      if (proj && proj.rawMaterials) {
        proj.rawMaterials = proj.rawMaterials.filter(f => f.id !== fileId);
        saveLocalProject(proj);
      }
    }
    showToast('${tt(TEXT.toastDeleted, lang)}', 'info');
  }

  // ---- Tab switching ----
  function switchTab(tab) {
    document.querySelectorAll('#result-tabs .tab-item').forEach(t => t.classList.remove('active'));
    document.querySelector('#result-tabs [data-tab="' + tab + '"]').classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById('tab-' + tab).style.display = 'block';
  }

  // ---- AI Processing simulation ----
  function startAIProcess() {
    const fileRows = document.querySelectorAll('.file-row');
    if (fileRows.length === 0) {
      showToast('${tt(TEXT.needUploadFirst, lang)}', 'warning');
      return;
    }

    // Show step 2 section
    document.getElementById('section-step2').style.display = 'block';
    document.getElementById('section-step2').scrollIntoView({ behavior:'smooth', block:'start' });

    // Update step indicator
    const steps = document.querySelectorAll('.step-item');
    const lines = document.querySelectorAll('.step-line');
    steps[0].className = 'step-item completed';
    steps[0].querySelector('.step-dot').innerHTML = '<i class="fas fa-check" style="font-size:13px"></i>';
    steps[1].className = 'step-item active';
    lines[0].className = 'step-line completed';

    // Disable the start button
    document.getElementById('btn-start-ai').disabled = true;

    // Simulate AI processing steps
    const aiSteps = ['ai-step-1','ai-step-2','ai-step-3','ai-step-4'];
    const progFill = document.getElementById('ai-progress-fill');
    let currentStep = 0;
    const stepDurations = [1200, 1500, 1800, 2000];

    function advanceStep() {
      if (currentStep > 0) {
        const prev = document.getElementById(aiSteps[currentStep-1]);
        prev.className = 'ai-step done';
        prev.querySelector('.ai-step-icon').innerHTML = '<i class="fas fa-check-circle" style="color:var(--color-success)"></i>';
      }
      if (currentStep < aiSteps.length) {
        const cur = document.getElementById(aiSteps[currentStep]);
        cur.className = 'ai-step active';
        cur.querySelector('.ai-step-icon').innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--brand-primary)"></i>';
        const pct = Math.round(((currentStep + 0.5) / aiSteps.length) * 100);
        progFill.style.width = pct + '%';
        currentStep++;
        setTimeout(advanceStep, stepDurations[currentStep-1] || 1500);
      } else {
        // All done
        progFill.style.width = '100%';
        document.getElementById('ai-status-text').textContent = '${lang==='en'?'Processing complete!':'处理完成！'}';
        document.getElementById('ai-status-text').style.color = 'var(--color-success)';

        // Update step indicator to step 3
        steps[1].className = 'step-item completed';
        steps[1].querySelector('.step-dot').innerHTML = '<i class="fas fa-check" style="font-size:13px"></i>';
        steps[2].className = 'step-item active';
        lines[1].className = 'step-line completed';

        showToast('${tt(TEXT.toastProcessComplete, lang)}', 'success');

        // Show results section with mock data after a short delay
        setTimeout(() => {
          document.getElementById('section-step3').style.display = 'block';
          document.getElementById('section-step3').scrollIntoView({ behavior:'smooth', block:'start' });

          // Enable bottom bar buttons
          document.querySelectorAll('#bottom-bar .btn').forEach(b => b.disabled = false);

          // Update local project status
          if (IS_LOCAL) {
            const proj = getLocalProject();
            if (proj) {
              proj.status = 'ready';
              proj.updatedAt = new Date().toISOString().split('T')[0];
              saveLocalProject(proj);
            }
          }
        }, 800);
      }
    }
    advanceStep();
  }

  // ---- Actions ----
  function saveDraft() {
    if (IS_LOCAL) {
      const proj = getLocalProject();
      if (proj) { proj.updatedAt = new Date().toISOString().split('T')[0]; saveLocalProject(proj); }
    }
    showToast('${tt(TEXT.toastDraftSaved, lang)}', 'success');
  }

  function exportPDF() {
    const themeId = document.getElementById('select-theme')?.value || 'micro-connect';
    const framework = document.getElementById('select-framework')?.value || 'classic';
    location.href = '/project/' + PROJECT_ID + '/deck?theme=' + themeId + '&framework=' + framework + '${langQ}';
  }

  function publishProject() {
    if (IS_LOCAL) {
      const proj = getLocalProject();
      if (proj) { proj.status = 'published'; proj.updatedAt = new Date().toISOString().split('T')[0]; saveLocalProject(proj); }
    }
    showToast('${tt(TEXT.toastPublished, lang)}', 'success');
  }

  function generateShareLink() {
    const themeId = document.getElementById('select-theme')?.value || 'micro-connect';
    const framework = document.getElementById('select-framework')?.value || 'classic';
    const link = location.origin + '/project/' + PROJECT_ID + '/deck?theme=' + themeId + '&framework=' + framework + '${langQ ? '&' + langQ.slice(1) : ''}';
    navigator.clipboard.writeText(link).then(() => {
      showToast('${tt(TEXT.toastLinkCopied, lang)}', 'success');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = link; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      showToast('${tt(TEXT.toastLinkCopied, lang)}', 'success');
    });
  }

  // ---- Theme switcher for deck preview ----
  function switchDeckTheme(themeId) {
    // Update button states
    document.querySelectorAll('.deck-theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === themeId);
      if (b.dataset.theme === themeId) {
        b.style.borderColor = 'var(--brand-primary)';
        b.style.background = 'rgba(93,196,179,0.1)';
      } else {
        b.style.borderColor = '';
        b.style.background = '';
      }
    });
    // Update theme select
    const sel = document.getElementById('select-theme');
    if (sel) sel.value = themeId;
    // Update preview link
    const framework = document.getElementById('select-framework')?.value || 'classic';
    const link = document.getElementById('deck-preview-link');
    if (link) link.href = '/project/' + PROJECT_ID + '/deck?theme=' + themeId + '&framework=' + framework + '${langQ ? '&' + langQ.slice(1) : ''}';
    showToast('${lang === 'zh' ? '模板已切换' : 'Theme switched'}', 'success');
  }

  // ---- Init: if local project, populate info ----
  if (IS_LOCAL) {
    const proj = getLocalProject();
    if (proj) {
      const ci = document.getElementById('input-company');
      const ii = document.getElementById('input-industry');
      if (ci) ci.value = proj.companyName;
      if (ii) ii.value = proj.industry;
    }
  }
  `
}
