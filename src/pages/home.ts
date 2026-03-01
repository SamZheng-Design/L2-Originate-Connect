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
`

// ---- Page-specific JavaScript ----
function homePageScript(lang: Lang): string {
  return `
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
