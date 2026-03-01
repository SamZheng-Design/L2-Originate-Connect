// ═══════════════════════════════════════════════════════
// 页面 1: 项目列表页（发起通主页 /）
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { renderLayout } from '../components/layout'
import { tt, TEXT, INDUSTRIES, PROJECT_STATUS, formatMoney } from '../i18n'
import { mockProjects } from '../mock-data'
import type { OriginateProject } from '../mock-data'

// ---- Helpers ----
function fileTypeIcon(type: string): string {
  const map: Record<string, string> = {
    pdf: 'fa-file-pdf', word: 'fa-file-word', excel: 'fa-file-excel',
    ppt: 'fa-file-powerpoint', image: 'fa-file-image', other: 'fa-file',
  }
  return map[type] || 'fa-file'
}

function statusBadge(status: string, lang: Lang): string {
  const s = PROJECT_STATUS[status] || PROJECT_STATUS.draft
  const label = lang === 'en' ? s.en : s.zh
  const icons: Record<string, string> = {
    draft: '', processing: ' <i class="fas fa-spinner fa-spin" style="font-size:10px"></i>',
    ready: ' <i class="fas fa-check" style="font-size:10px"></i>',
    published: ' <i class="fas fa-rocket" style="font-size:10px"></i>',
  }
  return `<span class="badge" style="color:${s.color}; background:${s.bgColor};">${label}${icons[status] || ''}</span>`
}

function industryBadge(industry: string, lang: Lang): string {
  const ind = INDUSTRIES[industry]
  if (!ind) return ''
  return `<span class="badge badge-primary">
    <i class="fas ${ind.icon}" style="font-size:10px"></i> ${tt(ind, lang)}
  </span>`
}

function ctaText(status: string, lang: Lang): string {
  if (status === 'draft') return tt(TEXT.continueEdit, lang)
  if (status === 'processing') return tt(TEXT.continueProcess, lang)
  return tt(TEXT.viewDetails, lang)
}

function formatSize(bytes: number): string {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB'
  return (bytes / 1024).toFixed(0) + ' KB'
}

// ---- Render project card ----
function renderProjectCard(p: OriginateProject, lang: Lang, index: number): string {
  const ind = INDUSTRIES[p.industry]
  const indIcon = ind ? ind.icon : 'fa-briefcase'
  const hasFinancials = p.structuredPackage?.financials
  const hasNeed = p.structuredPackage?.financingNeed

  return `
  <div class="card card-hover project-card animate-fade-in" style="animation-delay: ${index * 80}ms" data-status="${p.status}" onclick="location.href='/project/${p.id}${lang === 'en' ? '?lang=en' : ''}'">
    <div class="project-card-header">
      <div class="project-card-icon" style="background: rgba(93,196,179,0.1);">
        <i class="fas ${indIcon}" style="color: var(--brand-primary); font-size: 18px;"></i>
      </div>
      <div style="flex:1; min-width: 0;">
        <h3 class="project-card-title">${p.companyName}</h3>
        <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
          ${industryBadge(p.industry, lang)}
          ${statusBadge(p.status, lang)}
        </div>
      </div>
    </div>

    <div class="project-card-body">
      ${hasNeed ? `<div class="project-card-stat">
        <span class="stat-label">${tt(TEXT.financing, lang)}</span>
        <span class="stat-value">${formatMoney(hasNeed.amount, lang)}</span>
      </div>` : ''}
      ${hasFinancials ? `<div class="project-card-stat">
        <span class="stat-label">${tt(TEXT.monthlyRevenue, lang)}</span>
        <span class="stat-value">${formatMoney(hasFinancials.monthlyRevenue, lang)}</span>
      </div>` : ''}
      <div class="project-card-stat">
        <span class="stat-label"><i class="fas fa-paperclip" style="font-size:11px; margin-right:4px;"></i>${p.rawMaterials.length} ${tt(TEXT.files, lang)}</span>
        <span class="stat-date">${p.updatedAt} ${tt(TEXT.updated, lang)}</span>
      </div>
    </div>

    <div class="project-card-footer">
      <a href="/project/${p.id}${lang === 'en' ? '?lang=en' : ''}" class="btn btn-sm ${p.status === 'ready' || p.status === 'published' ? 'btn-brand' : 'btn-primary'}" onclick="event.stopPropagation()">
        ${ctaText(p.status, lang)}
        <i class="fas fa-arrow-right" style="font-size: 11px;"></i>
      </a>
    </div>
  </div>
  `
}

// ---- Render stats bar ----
function renderStatsBar(projects: OriginateProject[], lang: Lang): string {
  const counts: Record<string, number> = { all: projects.length, draft: 0, processing: 0, ready: 0, published: 0 }
  projects.forEach(p => { if (counts[p.status] !== undefined) counts[p.status]++ })

  const tabs = [
    { key: 'all', label: tt(TEXT.all, lang), count: counts.all },
    { key: 'draft', label: tt(TEXT.draft, lang), count: counts.draft },
    { key: 'processing', label: tt(TEXT.processing, lang), count: counts.processing },
    { key: 'ready', label: tt(TEXT.ready, lang), count: counts.ready },
    { key: 'published', label: tt(TEXT.published, lang), count: counts.published },
  ]

  return `
  <div class="stats-bar">
    ${tabs.map(t => `
      <button class="stats-tab ${t.key === 'all' ? 'active' : ''}" data-filter="${t.key}" onclick="filterProjects('${t.key}')">
        ${t.label} <span class="stats-count">(${t.count})</span>
      </button>
    `).join('')}
  </div>
  `
}

// ---- Industry select options ----
function industryOptions(lang: Lang): string {
  return Object.entries(INDUSTRIES).map(([key, val]) =>
    `<option value="${key}"><i class="fas ${val.icon}"></i> ${tt(val, lang)}</option>`
  ).join('')
}

// ---- Main page render ----
export function renderHomePage(lang: Lang): string {
  const projects = mockProjects

  const heroSection = `
  <section class="hero-section">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-logo-wrap">
          <img src="https://www.genspark.ai/api/files/s/sGTxJUcV" alt="Originate Connect Logo" class="hero-logo" onerror="this.style.display='none'"/>
        </div>
        <h1 class="hero-title">${tt(TEXT.heroTitle, lang)}</h1>
        <p class="hero-subtitle">${tt(TEXT.heroSubtitle, lang)}</p>
        <p class="hero-metaphor">${tt(TEXT.heroMetaphor, lang)}</p>
        <button class="btn btn-primary btn-lg hero-cta" onclick="openNewProjectModal()">
          ${tt(TEXT.newProject, lang)}
        </button>
      </div>
    </div>
  </section>
  `

  const projectCards = projects.map((p, i) => renderProjectCard(p, lang, i)).join('')

  const emptyState = `
  <div class="empty-state" id="empty-state" style="display: none;">
    <div class="empty-icon">
      <i class="fas fa-box-open"></i>
    </div>
    <h3>${tt(TEXT.noProjects, lang)}</h3>
    <p>${tt(TEXT.noProjectsDesc, lang)}</p>
    <button class="btn btn-primary btn-lg" onclick="openNewProjectModal()" style="margin-top: 16px;">
      ${tt(TEXT.startFirst, lang)}
    </button>
  </div>
  `

  const loginPromptModal = `
  <!-- 登录弹窗 (v33 截图样式: 白色卡片 + 完整登录/注册表单) -->
  <div id="loginPromptModal" class="login-modal-overlay hidden" onclick="if(event.target===this)closeLoginPrompt()">
    <div class="login-modal-card">
      
      <!-- 关闭按钮 -->
      <button onclick="closeLoginPrompt()" class="login-modal-close">
        <i class="fas fa-times"></i>
      </button>

      <!-- Logo区域 -->
      <div class="login-modal-logo-area">
        <!-- 双圆叠合 Logo -->
        <div class="login-modal-logo-circles">
          <div class="login-circle-top"></div>
          <div class="login-circle-bottom"></div>
        </div>
        <h1 class="login-modal-brand">CONTRACT<br>CONNECT</h1>
        <div class="login-modal-divider"></div>
        <p class="login-modal-powered">POWERED BY MICRO CONNECT GROUP</p>
        <p class="login-modal-appname">${tt(TEXT.appName, lang)}</p>
      </div>

      <!-- 登录/注册 Tab -->
      <div class="login-modal-tabs">
        <button onclick="switchModalTab('login')" id="modalTabLogin" class="login-modal-tab login-modal-tab-active">${tt(TEXT.login, lang)}</button>
        <button onclick="switchModalTab('register')" id="modalTabRegister" class="login-modal-tab">${tt(TEXT.register, lang)}</button>
      </div>

      <!-- 登录表单 -->
      <div id="modalFormLogin" class="login-modal-form">
        <form onsubmit="event.preventDefault(); handleModalLogin();" autocomplete="on">
          <div class="login-form-group">
            <label class="login-form-label">${tt(TEXT.emailOrUsername, lang)}</label>
            <input type="text" id="modalLoginUsername" placeholder="${lang === 'zh' ? '请输入用户名或邮箱' : 'Enter username or email'}" autocomplete="username"
              class="login-form-input"
              onkeydown="if(event.key==='Enter')document.getElementById('modalLoginPassword').focus()">
          </div>
          <div class="login-form-group">
            <label class="login-form-label">${tt(TEXT.password, lang)}</label>
            <div class="login-pwd-wrapper">
              <input type="password" id="modalLoginPassword" placeholder="${lang === 'zh' ? '请输入密码' : 'Enter password'}" autocomplete="current-password"
                class="login-form-input login-form-input-pwd">
              <button type="button" onclick="toggleModalPwd('modalLoginPassword', this)" class="login-pwd-toggle" tabindex="-1">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="login-form-options">
            <label class="login-remember">
              <input type="checkbox" class="login-checkbox">
              <span>${tt(TEXT.rememberMe, lang)}</span>
            </label>
            <a href="#" class="login-forgot">${tt(TEXT.forgotPassword, lang)}</a>
          </div>
          <div id="modalLoginError" class="login-form-error hidden"></div>
          <button type="submit" id="modalLoginBtn" class="login-btn-primary">
            <i class="fas fa-sign-in-alt mr-2"></i>${tt(TEXT.login, lang)}
          </button>
          <button type="button" onclick="handleGuestLoginHome()" class="login-btn-guest">
            <i class="fas fa-user-secret mr-2"></i>${lang === 'zh' ? '游客模式（体验功能）' : 'Guest Mode (Try Features)'}
          </button>

          <!-- 企业SSO -->
          <div class="login-sso-section">
            <p class="login-sso-label">${lang === 'zh' ? '企业用户' : 'Enterprise'}</p>
            <button type="button" onclick="closeLoginPrompt(); showToast(LANG==='zh'?'企业SSO即将上线':'SSO coming soon','info');" class="login-btn-sso">
              <i class="fas fa-building mr-2"></i>${lang === 'zh' ? '公司SSO登录（即将上线）' : 'Company SSO (Coming Soon)'}
            </button>
          </div>
        </form>
      </div>

      <!-- 注册表单 -->
      <div id="modalFormRegister" class="login-modal-form hidden">
        <form onsubmit="event.preventDefault(); handleModalRegister();" autocomplete="on">
          <div class="login-form-row">
            <div class="login-form-group">
              <label class="login-form-label">${lang === 'zh' ? '用户名' : 'Username'} <span style="color:#ef4444;">*</span></label>
              <input type="text" id="modalRegUsername" placeholder="${lang === 'zh' ? '用于登录' : 'For login'}" class="login-form-input">
            </div>
            <div class="login-form-group">
              <label class="login-form-label">${tt(TEXT.displayName, lang)}</label>
              <input type="text" id="modalRegDisplayName" placeholder="${lang === 'zh' ? '显示名称' : 'Display name'}" class="login-form-input">
            </div>
          </div>
          <div class="login-form-group">
            <label class="login-form-label">${tt(TEXT.email, lang)} <span style="color:#ef4444;">*</span></label>
            <input type="email" id="modalRegEmail" placeholder="your@email.com" class="login-form-input">
          </div>
          <div class="login-form-group">
            <label class="login-form-label">${lang === 'zh' ? '手机号' : 'Phone'}</label>
            <input type="tel" id="modalRegPhone" placeholder="${lang === 'zh' ? '13800138000' : '+1 (555) 000-0000'}" class="login-form-input">
          </div>
          <div class="login-form-group">
            <label class="login-form-label">${tt(TEXT.password, lang)} <span style="color:#ef4444;">*</span></label>
            <div class="login-pwd-wrapper">
              <input type="password" id="modalRegPassword" placeholder="${lang === 'zh' ? '至少6位' : 'Min 6 chars'}" autocomplete="new-password"
                class="login-form-input login-form-input-pwd">
              <button type="button" onclick="toggleModalPwd('modalRegPassword', this)" class="login-pwd-toggle" tabindex="-1">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="login-form-group">
            <label class="login-form-label">${lang === 'zh' ? '默认角色' : 'Default Role'}</label>
            <div class="login-role-grid">
              <button type="button" onclick="selectModalRole('investor')" id="modalRoleInvestor" class="login-role-btn">
                <i class="fas fa-landmark" style="color:#2EC4B6;"></i>
                <span>${lang === 'zh' ? '投资方' : 'Investor'}</span>
              </button>
              <button type="button" onclick="selectModalRole('borrower')" id="modalRoleBorrower" class="login-role-btn">
                <i class="fas fa-store" style="color:#f59e0b;"></i>
                <span>${lang === 'zh' ? '融资方' : 'Borrower'}</span>
              </button>
              <button type="button" onclick="selectModalRole('both')" id="modalRoleBoth" class="login-role-btn login-role-active">
                <i class="fas fa-exchange-alt" style="color:#06b6d4;"></i>
                <span>${lang === 'zh' ? '两者皆可' : 'Both'}</span>
              </button>
            </div>
          </div>
          <div class="login-form-row">
            <div class="login-form-group">
              <label class="login-form-label">${tt(TEXT.company, lang)}</label>
              <input type="text" id="modalRegCompany" placeholder="${lang === 'zh' ? '所属公司' : 'Company'}" class="login-form-input">
            </div>
            <div class="login-form-group">
              <label class="login-form-label">${lang === 'zh' ? '职位' : 'Title'}</label>
              <input type="text" id="modalRegTitle" placeholder="${lang === 'zh' ? '您的职位' : 'Your title'}" class="login-form-input">
            </div>
          </div>
          <div id="modalRegError" class="login-form-error hidden"></div>
          <button type="submit" id="modalRegBtn" class="login-btn-primary">
            <i class="fas fa-user-plus mr-2"></i>${tt(TEXT.register, lang)}
          </button>
        </form>
      </div>
    </div>
  </div>
  `

  const body = `
  <main>
    ${heroSection}
    <div class="container" style="padding-bottom: 60px;">
      ${renderStatsBar(projects, lang)}
      <div class="projects-grid" id="projects-grid">
        ${projectCards}
      </div>
      ${emptyState}
    </div>
  </main>
  ${loginPromptModal}
  `

  const extraCSS = homePageCSS
  const extraScript = homePageScript(lang)

  return renderLayout(lang, tt(TEXT.heroTitle, lang), body, extraCSS, extraScript)
}

// ---- Page-specific CSS ----
const homePageCSS = `
/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(180deg, rgba(93,196,179,0.08) 0%, var(--bg-page) 100%);
  padding: 56px 0 40px;
  text-align: center;
  overflow: hidden;
}
.hero-section::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 30%, rgba(93,196,179,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(50,173,230,0.06) 0%, transparent 50%);
  pointer-events: none;
}
.hero-inner { max-width: 640px; margin: 0 auto; }
.hero-logo-wrap {
  display: flex; justify-content: center; margin-bottom: 20px;
}
.hero-logo {
  width: 72px; height: 72px; border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  object-fit: cover;
}
.hero-title {
  font-size: 32px; font-weight: 800; color: var(--text-title);
  margin-bottom: 8px; letter-spacing: -0.5px;
}
.hero-subtitle {
  font-size: 16px; color: var(--text-secondary); margin-bottom: 8px;
  line-height: 1.6;
}
.hero-metaphor {
  font-size: 13px; color: var(--text-tertiary); margin-bottom: 28px;
}
.hero-cta {
  font-size: 16px; padding: 14px 36px;
}

/* Stats */
.stats-bar {
  display: flex; gap: 0; margin-bottom: 24px;
  border-bottom: 1px solid var(--border-default);
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.stats-tab {
  padding: 12px 20px; font-size: 14px; font-weight: 500;
  color: var(--text-secondary); background: none; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer; white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-spring);
  font-family: var(--font-body);
}
.stats-tab:hover { color: var(--text-primary); }
.stats-tab.active {
  color: var(--brand-primary); border-bottom-color: var(--brand-primary); font-weight: 600;
}
.stats-count { font-weight: 400; }

/* Project Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}
@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 26px; }
}

/* Project Card */
.project-card {
  padding: 0; cursor: pointer; overflow: hidden;
}
.project-card-header {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 20px 20px 0;
}
.project-card-icon {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.project-card-title {
  font-size: 17px; font-weight: 700; color: var(--text-title);
  line-height: 1.3; margin: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.project-card-body {
  padding: 16px 20px 0;
  display: flex; flex-direction: column; gap: 8px;
}
.project-card-stat {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px;
}
.stat-label { color: var(--text-secondary); }
.stat-value { font-weight: 700; color: var(--text-primary); }
.stat-date { font-size: 12px; color: var(--text-tertiary); }
.project-card-footer {
  padding: 16px 20px 20px;
  display: flex; justify-content: flex-end;
}

/* Empty state */
.empty-state {
  text-align: center; padding: 80px 24px;
}
.empty-icon {
  font-size: 56px; color: var(--text-placeholder);
  margin-bottom: 16px;
}
.empty-state h3 {
  font-size: 20px; font-weight: 700; color: var(--text-title);
  margin-bottom: 8px;
}
.empty-state p {
  font-size: 14px; color: var(--text-secondary); max-width: 360px;
  margin: 0 auto;
}

/* ===== Login Prompt Modal (v33 截图精准还原) ===== */
.login-modal-overlay {
  position: fixed; inset: 0; z-index: 300;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
}
.login-modal-overlay.hidden { display: none !important; }
.login-modal-card {
  position: relative;
  background: #fff;
  border-radius: 20px;
  max-width: 420px; width: calc(100% - 32px);
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04);
  animation: loginScaleIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.modal-closing .login-modal-card { animation: loginScaleOut 0.22s ease both; }
@keyframes loginScaleIn { from { opacity: 0; transform: scale(0.92) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes loginScaleOut { to { opacity: 0; transform: scale(0.96) translateY(8px); } }

/* Close button */
.login-modal-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #9ca3af; background: transparent; border: none; cursor: pointer;
  transition: all 0.2s;
}
.login-modal-close:hover { color: #374151; background: #f3f4f6; }

/* Logo area */
.login-modal-logo-area {
  padding: 32px 32px 24px; text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.login-modal-logo-circles {
  width: 80px; height: 52px; margin: 0 auto 16px; position: relative;
}
.login-circle-top {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #2EC4B6 0%, #3DD8CA 100%);
  position: absolute; top: 0; left: 8px;
  box-shadow: 0 4px 16px rgba(46,196,182,0.35);
}
.login-circle-bottom {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #28A696 0%, #2EC4B6 100%);
  position: absolute; top: 4px; left: 28px; opacity: 0.85;
  box-shadow: 0 4px 16px rgba(40,166,150,0.3);
}
.login-modal-brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900; font-size: 20px; letter-spacing: 0.04em;
  color: #1a1a1a; line-height: 1.15; margin: 0 0 6px;
}
.login-modal-divider {
  width: 100px; height: 2.5px; background: #2EC4B6;
  margin: 8px auto 10px; border-radius: 2px;
}
.login-modal-powered {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px; letter-spacing: 0.2em; color: #999;
  font-weight: 500; margin: 0;
}
.login-modal-appname {
  font-size: 18px; font-weight: 700; color: #1a1a1a;
  margin: 14px 0 0;
}

/* Tabs */
.login-modal-tabs {
  display: flex; border-bottom: 1px solid rgba(0,0,0,0.06);
}
.login-modal-tab {
  flex: 1; padding: 12px 0; text-align: center;
  font-size: 15px; font-weight: 600;
  color: #86868b; background: none; border: none; cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.25s ease;
}
.login-modal-tab-active {
  color: #2EC4B6 !important;
  border-bottom-color: #2EC4B6 !important;
}

/* Form area */
.login-modal-form { padding: 24px; }
.login-form-group { margin-bottom: 16px; }
.login-form-label {
  display: block; font-size: 13px; font-weight: 500;
  color: #374151; margin-bottom: 6px;
}
.login-form-input {
  width: 100%; padding: 11px 16px;
  border: 1px solid #e5e7eb; border-radius: 12px;
  font-size: 14px; color: #1a1a1a;
  background: #fff; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.login-form-input:focus {
  border-color: #2EC4B6;
  box-shadow: 0 0 0 3px rgba(46,196,182,0.12);
}
.login-form-input::placeholder { color: #bbb; }
.login-form-input-pwd { padding-right: 48px; }
.login-form-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.login-pwd-wrapper { position: relative; }
.login-pwd-toggle {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8; cursor: pointer; background: transparent; border: none;
  transition: all 0.15s;
}
.login-pwd-toggle:hover { color: #475569; background: #f1f5f9; }

/* Options row */
.login-form-options {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px; font-size: 13px;
}
.login-remember {
  display: flex; align-items: center; color: #6b7280; cursor: pointer;
  gap: 6px;
}
.login-checkbox {
  width: 16px; height: 16px; accent-color: #2EC4B6;
  flex-shrink: 0; cursor: pointer;
}
.login-forgot {
  color: #2EC4B6; text-decoration: none; font-weight: 500;
}
.login-forgot:hover { color: #249e93; }

/* Error */
.login-form-error {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; margin-bottom: 14px;
  background: #fef2f2; border: 1px solid #fecaca;
  border-radius: 10px; color: #dc2626; font-size: 13px;
  animation: loginShake 0.4s ease-in-out;
}
.login-form-error.hidden { display: none; }
@keyframes loginShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

/* Primary button */
.login-btn-primary {
  width: 100%; padding: 12px 0; border-radius: 12px;
  font-size: 15px; font-weight: 600; border: none; cursor: pointer;
  background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(93,196,179,0.3);
  transition: all 0.28s cubic-bezier(0.28, 0.11, 0.32, 1);
  margin-bottom: 10px;
  position: relative;
}
.login-btn-primary:hover {
  filter: brightness(1.06);
  box-shadow: 0 8px 24px rgba(93,196,179,0.4);
  transform: translateY(-1px);
}
.login-btn-primary.btn-loading { color: transparent !important; pointer-events: none; }
.login-btn-primary.btn-loading::after {
  content: ''; position: absolute; width: 20px; height: 20px;
  border: 2.5px solid rgba(255,255,255,0.3); border-radius: 50%;
  border-top-color: #fff; animation: loginSpin 0.7s linear infinite;
  left: 50%; top: 50%; margin-left: -10px; margin-top: -10px;
}
@keyframes loginSpin { to { transform: rotate(360deg); } }

/* Guest button */
.login-btn-guest {
  width: 100%; padding: 12px 0; border-radius: 12px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  background: #fff; color: #6b7280;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  margin-bottom: 0;
}
.login-btn-guest:hover { background: #f9fafb; border-color: #d1d5db; }

/* SSO section */
.login-sso-section {
  margin-top: 20px; padding-top: 20px;
  border-top: 1px solid #f3f4f6;
}
.login-sso-label {
  font-size: 11px; color: #9ca3af; text-align: center;
  margin: 0 0 10px;
}
.login-btn-sso {
  width: 100%; padding: 12px 0; border-radius: 12px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  background: #f3f4f6; color: #6b7280; border: none;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.login-btn-sso:hover { background: #e5e7eb; }

/* Role selector */
.login-role-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
}
.login-role-btn {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 10px 8px;
  border: 2px solid #e5e7eb; border-radius: 10px;
  font-size: 12px; font-weight: 500; color: #374151;
  background: #fff; cursor: pointer; transition: all 0.2s;
}
.login-role-btn:hover { border-color: #d1d5db; }
.login-role-btn i { font-size: 16px; }
.login-role-active,
.login-role-btn.login-role-active {
  border-color: #2EC4B6 !important;
  background: rgba(46,196,182,0.06) !important;
}

/* Scrollbar in modal */
.login-modal-card::-webkit-scrollbar { width: 4px; }
.login-modal-card::-webkit-scrollbar-track { background: transparent; }
.login-modal-card::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

/* Responsive */
@media (max-width: 480px) {
  .login-modal-card { border-radius: 16px; }
  .login-modal-logo-area { padding: 24px 24px 20px; }
  .login-modal-form { padding: 20px; }
  .login-form-row { grid-template-columns: 1fr; }
}
`

// ---- Page-specific JavaScript ----
function homePageScript(lang: Lang): string {
  return `
  // ========== 登录弹窗 (完整登录/注册) ==========
  var modalSelectedRole = 'both';

  function checkLoginPrompt() {
    var token = localStorage.getItem('oc_token');
    if (!token) {
      var modal = document.getElementById('loginPromptModal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }
  }
  function closeLoginPrompt() {
    var modal = document.getElementById('loginPromptModal');
    if (modal) {
      modal.classList.add('modal-closing');
      setTimeout(function() {
        modal.classList.add('hidden');
        modal.classList.remove('modal-closing');
        document.body.style.overflow = '';
      }, 220);
    }
  }

  // Tab 切换
  function switchModalTab(tab) {
    var tabLogin = document.getElementById('modalTabLogin');
    var tabReg = document.getElementById('modalTabRegister');
    var formLogin = document.getElementById('modalFormLogin');
    var formReg = document.getElementById('modalFormRegister');
    if (tab === 'login') {
      tabLogin.className = 'login-modal-tab login-modal-tab-active';
      tabReg.className = 'login-modal-tab';
      formLogin.classList.remove('hidden');
      formReg.classList.add('hidden');
    } else {
      tabReg.className = 'login-modal-tab login-modal-tab-active';
      tabLogin.className = 'login-modal-tab';
      formReg.classList.remove('hidden');
      formLogin.classList.add('hidden');
    }
  }

  // 密码显示/隐藏
  function toggleModalPwd(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var icon = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fas fa-eye';
    }
  }

  // 角色选择
  function selectModalRole(role) {
    modalSelectedRole = role;
    ['investor', 'borrower', 'both'].forEach(function(r) {
      var btnId = 'modalRole' + r.charAt(0).toUpperCase() + r.slice(1);
      var btn = document.getElementById(btnId);
      if (btn) {
        if (r === role) {
          btn.classList.add('login-role-active');
        } else {
          btn.classList.remove('login-role-active');
        }
      }
    });
  }

  // 显示表单错误
  function showFormError(elId, msg) {
    var el = document.getElementById(elId);
    if (el) {
      el.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right:6px;"></i>' + msg;
      el.classList.remove('hidden');
    }
  }
  function hideFormError(elId) {
    var el = document.getElementById(elId);
    if (el) el.classList.add('hidden');
  }

  // 登录处理
  function handleModalLogin() {
    var username = document.getElementById('modalLoginUsername').value.trim();
    var password = document.getElementById('modalLoginPassword').value;
    var btn = document.getElementById('modalLoginBtn');

    hideFormError('modalLoginError');
    if (!username || !password) {
      showFormError('modalLoginError', LANG === 'zh' ? '请输入用户名和密码' : 'Please enter username and password');
      return;
    }
    if (btn) { btn.classList.add('btn-loading'); btn.disabled = true; }

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        localStorage.setItem('oc_token', data.token);
        localStorage.setItem('oc_user', JSON.stringify(data.user));
        hideFormError('modalLoginError');
        closeLoginPrompt();
        onModalLoginSuccess(data.user);
      } else {
        showFormError('modalLoginError', data.error || (LANG === 'zh' ? '登录失败' : 'Login failed'));
        if (btn) { btn.classList.remove('btn-loading'); btn.disabled = false; }
      }
    })
    .catch(function() {
      showFormError('modalLoginError', LANG === 'zh' ? '网络错误，请重试' : 'Network error, please retry');
      if (btn) { btn.classList.remove('btn-loading'); btn.disabled = false; }
    });
  }

  // 注册处理
  function handleModalRegister() {
    var username = document.getElementById('modalRegUsername').value.trim();
    var email = document.getElementById('modalRegEmail').value.trim();
    var password = document.getElementById('modalRegPassword').value;
    var displayName = document.getElementById('modalRegDisplayName').value.trim();
    var phone = document.getElementById('modalRegPhone').value.trim();
    var company = document.getElementById('modalRegCompany').value.trim();
    var title = document.getElementById('modalRegTitle').value.trim();
    var btn = document.getElementById('modalRegBtn');

    hideFormError('modalRegError');
    if (!username || !email || !password) {
      showFormError('modalRegError', LANG === 'zh' ? '请填写必填项（用户名、邮箱、密码）' : 'Please fill required fields');
      return;
    }
    if (password.length < 6) {
      showFormError('modalRegError', LANG === 'zh' ? '密码至少6位' : 'Password must be at least 6 characters');
      return;
    }
    if (btn) { btn.classList.add('btn-loading'); btn.disabled = true; }

    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, email: email, password: password, displayName: displayName || username, phone: phone, company: company, title: title, defaultRole: modalSelectedRole })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        localStorage.setItem('oc_token', data.token);
        localStorage.setItem('oc_user', JSON.stringify(data.user));
        hideFormError('modalRegError');
        closeLoginPrompt();
        onModalLoginSuccess(data.user);
      } else {
        showFormError('modalRegError', data.error || (LANG === 'zh' ? '注册失败' : 'Registration failed'));
        if (btn) { btn.classList.remove('btn-loading'); btn.disabled = false; }
      }
    })
    .catch(function() {
      showFormError('modalRegError', LANG === 'zh' ? '网络错误，请重试' : 'Network error, please retry');
      if (btn) { btn.classList.remove('btn-loading'); btn.disabled = false; }
    });
  }

  // 游客登录
  function handleGuestLoginHome() {
    var guestUser = {
      id: 'guest_' + Date.now(),
      username: 'guest',
      displayName: LANG === 'zh' ? '游客用户' : 'Guest User',
      email: '',
      defaultRole: 'both',
      isGuest: true
    };
    localStorage.setItem('oc_token', 'guest_token');
    localStorage.setItem('oc_user', JSON.stringify(guestUser));
    closeLoginPrompt();
    onModalLoginSuccess(guestUser);
  }

  // 登录成功后刷新页面状态
  function onModalLoginSuccess(user) {
    var name = user.displayName || user.username || 'User';
    showToast(LANG === 'zh' ? '欢迎，' + name : 'Welcome, ' + name, 'success');
    // 刷新 navbar 状态
    var loginBtn = document.getElementById('nav-login-btn');
    var userMenu = document.getElementById('nav-user-menu');
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'flex';
      var nameEl = document.getElementById('nav-user-name');
      if (nameEl) nameEl.textContent = name;
    }
  }

  // 页面加载后弹出登录提醒（在splash结束后）
  setTimeout(checkLoginPrompt, 1200);

  // Filter projects by status tab
  function filterProjects(status) {
    document.querySelectorAll('.stats-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter="' + status + '"]').classList.add('active');
    const cards = document.querySelectorAll('.project-card');
    let visible = 0;
    cards.forEach(card => {
      if (status === 'all' || card.dataset.status === status) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });
    document.getElementById('empty-state').style.display = visible === 0 ? 'block' : 'none';
  }

  // New project modal
  function openNewProjectModal() {
    const industries = ${JSON.stringify(Object.entries(INDUSTRIES).map(([k, v]) => ({ key: k, label: tt(v, lang), icon: v.icon })))};
    let options = '<option value="">${tt(TEXT.selectIndustry, lang)}</option>';
    industries.forEach(ind => {
      options += '<option value="' + ind.key + '">' + ind.label + '</option>';
    });

    const html = \`
      <div class="modal-header">${tt(TEXT.createProject, lang)}</div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">${tt(TEXT.companyName, lang)}</label>
          <input type="text" id="new-company-name" class="form-input" placeholder="${tt(TEXT.companyNamePlaceholder, lang)}" autofocus/>
        </div>
        <div class="form-group">
          <label class="form-label">${tt(TEXT.industry, lang)}</label>
          <select id="new-industry" class="form-select">\` + options + \`</select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" onclick="closeModalDirect()">${tt(TEXT.cancel, lang)}</button>
        <button class="btn btn-primary btn-sm" onclick="createProject()">${tt(TEXT.create, lang)}</button>
      </div>
    \`;
    openModal(html);
    setTimeout(() => document.getElementById('new-company-name')?.focus(), 100);
  }

  // Create project (localStorage-based)
  function createProject() {
    const name = document.getElementById('new-company-name').value.trim();
    const industry = document.getElementById('new-industry').value;
    if (!name) {
      document.getElementById('new-company-name').style.borderColor = 'var(--color-error)';
      return;
    }
    if (!industry) {
      document.getElementById('new-industry').style.borderColor = 'var(--color-error)';
      return;
    }
    const id = 'proj-' + Date.now().toString(36);
    const project = {
      id, userId: 'u-demo', companyName: name, industry,
      status: 'draft', rawMaterials: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    let projects = JSON.parse(localStorage.getItem('oc_projects') || '[]');
    projects.unshift(project);
    localStorage.setItem('oc_projects', JSON.stringify(projects));

    closeModalDirect();
    showToast('${tt(TEXT.toastProjectCreated, lang)}', 'success');
    setTimeout(() => {
      location.href = '/project/' + id + '${lang === 'en' ? '?lang=en' : ''}';
    }, 500);
  }

  // On page load: merge localStorage projects with server-rendered mock cards
  (function() {
    const stored = JSON.parse(localStorage.getItem('oc_projects') || '[]');
    if (stored.length === 0) return;

    const grid = document.getElementById('projects-grid');
    const langParam = '${lang === 'en' ? '?lang=en' : ''}';

    stored.forEach((p, i) => {
      const indMap = ${JSON.stringify(Object.fromEntries(Object.entries(INDUSTRIES).map(([k, v]) => [k, { label: tt(v, lang), icon: v.icon }])))};
      const statusMap = ${JSON.stringify(Object.fromEntries(Object.entries(PROJECT_STATUS).map(([k, v]) => [k, { label: lang === 'en' ? v.en : v.zh, color: v.color, bg: v.bgColor }])))};

      const ind = indMap[p.industry] || { label: p.industry, icon: 'fa-briefcase' };
      const st = statusMap[p.status] || statusMap.draft;

      const card = document.createElement('div');
      card.className = 'card card-hover project-card animate-fade-in';
      card.dataset.status = p.status;
      card.style.animationDelay = (i * 80) + 'ms';
      card.onclick = function() { location.href = '/project/' + p.id + langParam; };
      card.innerHTML = \`
        <div class="project-card-header">
          <div class="project-card-icon" style="background: rgba(93,196,179,0.1);">
            <i class="fas \${ind.icon}" style="color: var(--brand-primary); font-size: 18px;"></i>
          </div>
          <div style="flex:1; min-width:0;">
            <h3 class="project-card-title">\${p.companyName}</h3>
            <div style="display:flex; gap:6px; margin-top:6px; flex-wrap:wrap;">
              <span class="badge badge-primary"><i class="fas \${ind.icon}" style="font-size:10px"></i> \${ind.label}</span>
              <span class="badge" style="color:\${st.color}; background:\${st.bg};">\${st.label}</span>
            </div>
          </div>
        </div>
        <div class="project-card-body">
          <div class="project-card-stat">
            <span class="stat-label"><i class="fas fa-paperclip" style="font-size:11px; margin-right:4px;"></i>\${p.rawMaterials ? p.rawMaterials.length : 0} ${tt(TEXT.files, lang)}</span>
            <span class="stat-date">\${p.updatedAt} ${tt(TEXT.updated, lang)}</span>
          </div>
        </div>
        <div class="project-card-footer">
          <a href="/project/\${p.id}\${langParam}" class="btn btn-sm btn-primary" onclick="event.stopPropagation()">
            ${tt(TEXT.continueEdit, lang)} <i class="fas fa-arrow-right" style="font-size:11px;"></i>
          </a>
        </div>
      \`;
      grid.insertBefore(card, grid.firstChild);
    });

    // Update stats counts
    const allCards = document.querySelectorAll('.project-card');
    const counts = { all: allCards.length, draft: 0, processing: 0, ready: 0, published: 0 };
    allCards.forEach(c => {
      const s = c.dataset.status;
      if (counts[s] !== undefined) counts[s]++;
    });
    document.querySelectorAll('.stats-tab').forEach(tab => {
      const f = tab.dataset.filter;
      const countSpan = tab.querySelector('.stats-count');
      if (countSpan && counts[f] !== undefined) countSpan.textContent = '(' + counts[f] + ')';
    });
  })();
  `
}
