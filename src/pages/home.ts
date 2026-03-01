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
  <!-- 登录提醒弹窗 (v33 onboarding style) -->
  <div id="loginPromptModal" class="hidden fixed inset-0 flex items-center justify-center z-[300]" style="background:rgba(0,0,0,0.4); backdrop-filter:blur(16px) saturate(120%); -webkit-backdrop-filter:blur(16px) saturate(120%);">
    <div class="bg-white rounded-3xl max-w-lg w-full mx-4 overflow-hidden animate-scale-in" style="box-shadow:0 24px 72px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.08); max-height:85vh;">
      <!-- 顶部渐变背景 -->
      <div class="relative h-48 overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 50%, #32ade6 100%);">
        <div style="position:absolute;inset:0;background-image:url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>
        <!-- 关闭按钮 -->
        <button onclick="closeLoginPrompt()" class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all z-10">
          <i class="fas fa-times"></i>
        </button>
        <!-- 浮动Logo -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="animate-float">
            <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <i class="fas fa-upload text-white text-4xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">${lang === 'zh' ? '欢迎使用发起通' : 'Welcome to Originate Connect'}</h2>
        <p class="text-gray-500 mb-6">${lang === 'zh' ? '上传材料 · AI打包成书 · 分享给潜在参与方' : 'Upload materials · AI packages them · Share with investors'}</p>

        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="p-4 bg-teal-50 rounded-2xl">
            <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform hover:scale-110">
              <i class="fas fa-cloud-upload-alt text-teal-600 text-xl"></i>
            </div>
            <p class="text-sm font-medium text-gray-700">${lang === 'zh' ? '上传材料' : 'Upload'}</p>
          </div>
          <div class="p-4 bg-cyan-50 rounded-2xl">
            <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform hover:scale-110">
              <i class="fas fa-robot text-cyan-600 text-xl"></i>
            </div>
            <p class="text-sm font-medium text-gray-700">${lang === 'zh' ? 'AI整理' : 'AI Process'}</p>
          </div>
          <div class="p-4 bg-pink-50 rounded-2xl">
            <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform hover:scale-110">
              <i class="fas fa-share-alt text-pink-600 text-xl"></i>
            </div>
            <p class="text-sm font-medium text-gray-700">${lang === 'zh' ? '分享链接' : 'Share'}</p>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="space-y-3">
          <a href="/login${lang === 'en' ? '?lang=en' : ''}" class="block w-full py-3 rounded-xl font-medium shadow-lg text-white text-center transition-all hover:shadow-xl" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);">
            <i class="fas fa-sign-in-alt mr-2"></i>${tt(TEXT.login, lang)} / ${tt(TEXT.register, lang)}
          </a>
          <button onclick="handleGuestLoginHome()" class="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
            <i class="fas fa-user-secret mr-2"></i>${lang === 'zh' ? '游客模式（体验功能）' : 'Guest Mode (Try Features)'}
          </button>
        </div>
      </div>

      <!-- 底部 -->
      <div class="px-8 pb-6 flex items-center justify-between">
        <button onclick="closeLoginPrompt()" class="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ${lang === 'zh' ? '稍后再说' : 'Maybe later'}
        </button>
        <p class="text-xs text-gray-300">POWERED BY MICRO CONNECT GROUP</p>
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

/* Login Prompt Modal */
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
.animate-scale-in { animation: scaleIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; }
.animate-float { animation: float 3s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.modal-closing .animate-scale-in { animation: scaleOut 0.2s ease both; }
@keyframes scaleOut { to { opacity: 0; transform: scale(0.95); } }
`

// ---- Page-specific JavaScript ----
function homePageScript(lang: Lang): string {
  return `
  // ========== 登录提醒弹窗 ==========
  function checkLoginPrompt() {
    var token = localStorage.getItem('oc_token');
    if (!token) {
      // 未登录 → 显示弹窗
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
      }, 200);
    }
  }
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
    showToast(LANG === 'zh' ? '游客模式，欢迎体验' : 'Guest mode, welcome!', 'success');
    // 刷新 navbar 状态
    var loginBtn = document.getElementById('nav-login-btn');
    var userMenu = document.getElementById('nav-user-menu');
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'flex';
      var nameEl = document.getElementById('nav-user-name');
      if (nameEl) nameEl.textContent = guestUser.displayName;
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
