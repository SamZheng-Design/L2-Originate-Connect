// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 主入口
// 统一导出所有模块，对外提供简洁API
// ═══════════════════════════════════════════════════════

export * from './types'
export * from './themes'
export * from './narrative'
export * from './renderer'
export * from './theme-css'
export * from './prompts'

import type { DeckInput, DeckOutput, DeckStructuredData, NarrativeFramework, DeckTheme } from './types'
import { getThemeById, ALL_THEMES } from './themes'
import { generateSlideData } from './narrative'
import { renderSlideHTML } from './renderer'
import { generateThemeCSS } from './theme-css'

// ═══════════════════════════════════════════════════════
// 核心API：输入数据 → 输出完整Deck
// ═══════════════════════════════════════════════════════

export function buildDeck(input: DeckInput): DeckOutput {
  const theme = getThemeById(input.themeId)
  const industryIcon = getIndustryIcon(input.industry)

  // 叙事引擎：决定幻灯片顺序和每页内容
  const slides = generateSlideData(input.data, input.framework, input.lang, industryIcon)

  return {
    slides,
    theme,
    framework: input.framework,
    generatedAt: new Date().toISOString(),
    totalPages: slides.length,
  }
}

// ═══════════════════════════════════════════════════════
// 渲染API：DeckOutput → 完整HTML页面
// ═══════════════════════════════════════════════════════

export function renderDeckFullPage(
  output: DeckOutput,
  lang: 'zh' | 'en',
  projectId: string,
  companyName: string,
): string {
  const theme = output.theme
  const css = generateThemeCSS(theme)
  const slides = output.slides
  const total = slides.length

  // 渲染每页幻灯片
  const slidesHTML = slides.map((slide, i) =>
    `<div class="deck-slide-wrap" data-index="${i}" style="display:${i === 0 ? 'flex' : 'none'};">
      ${renderSlideHTML(slide, theme, lang, i, total)}
    </div>`
  ).join('')

  // 缩略图
  const thumbsHTML = slides.map((slide, i) => {
    const label = lang === 'en' ? (slide.title?.en || `Page ${i + 1}`) : (slide.title?.zh || `第${i + 1}页`)
    return `<button class="deck-thumb-btn ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" title="${label}">${i + 1}</button>`
  }).join('')

  const langQ = lang === 'en' ? '?lang=en' : ''

  // 将 SlideData 序列化给前端编辑器使用
  const slidesJSON = JSON.stringify(slides.map(s => ({
    type: s.type,
    title: s.title,
    subtitle: s.subtitle,
    headline: s.headline,
    contentKind: s.content.kind,
  })))

  // 可用主题列表
  const themesJSON = JSON.stringify(ALL_THEMES.map(t => ({
    id: t.id,
    name: lang === 'en' ? t.name.en : t.name.zh,
    primary: t.colors.primary,
    isPremium: t.isPremium,
  })))

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} - Pitch Deck</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='20' r='12' fill='%232EC4B6' opacity='.85'/%3E%3Ccircle cx='24' cy='20' r='12' fill='%233DD8CA' opacity='.85'/%3E%3C/svg%3E">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js"></script>
  <style>${css}${shellCSS(theme)}${editorCSS()}</style>
</head>
<body>
  <!-- Toolbar -->
  <div class="deck-toolbar">
    <a href="/project/${projectId}${langQ}" class="deck-tool-btn"><i class="fas fa-arrow-left"></i> ${lang === 'zh' ? '返回项目' : 'Back'}</a>
    <div class="deck-toolbar-center">
      <span class="deck-toolbar-title">${companyName}</span>
      <span class="deck-toolbar-badge">${lang === 'zh' ? theme.name.zh : theme.name.en}</span>
    </div>
    <div class="deck-toolbar-right">
      <button class="deck-tool-btn deck-tool-btn-edit" id="btn-toggle-editor" onclick="toggleEditor()">
        <i class="fas fa-pen"></i> ${lang === 'zh' ? '编辑' : 'Edit'}
      </button>
      <button class="deck-tool-btn" onclick="toggleThemePicker()">
        <i class="fas fa-palette"></i> ${lang === 'zh' ? '换肤' : 'Theme'}
      </button>
      <button class="deck-tool-btn" onclick="shareDeck()"><i class="fas fa-link"></i> ${lang === 'zh' ? '分享' : 'Share'}</button>
      <button class="deck-tool-btn" onclick="window.print()"><i class="fas fa-print"></i> ${lang === 'zh' ? '打印' : 'Print'}</button>
    </div>
  </div>

  <!-- Theme Picker Dropdown -->
  <div class="theme-picker" id="theme-picker" style="display:none;">
    <div class="theme-picker-title">${lang === 'zh' ? '选择主题' : 'Choose Theme'}</div>
    <div class="theme-picker-grid" id="theme-picker-grid"></div>
  </div>

  <!-- Main layout: stage + editor sidebar -->
  <div class="deck-main-layout" id="deck-main-layout">
    <!-- Slide stage -->
    <div class="deck-stage" id="deck-stage">
      <div class="deck-slide-container" id="slide-container">
        ${slidesHTML}
      </div>
    </div>

    <!-- Editor Sidebar -->
    <div class="editor-sidebar" id="editor-sidebar" style="display:none;">
      <div class="editor-header">
        <h3 class="editor-title"><i class="fas fa-sliders-h"></i> ${lang === 'zh' ? '幻灯片编辑器' : 'Slide Editor'}</h3>
        <button class="editor-close" onclick="toggleEditor()"><i class="fas fa-times"></i></button>
      </div>
      <div class="editor-slide-info" id="editor-slide-info"></div>
      <div class="editor-fields" id="editor-fields"></div>
      <div class="editor-actions">
        <button class="editor-action-btn" onclick="moveSlide(-1)"><i class="fas fa-arrow-up"></i> ${lang === 'zh' ? '上移' : 'Move Up'}</button>
        <button class="editor-action-btn" onclick="moveSlide(1)"><i class="fas fa-arrow-down"></i> ${lang === 'zh' ? '下移' : 'Move Down'}</button>
        <button class="editor-action-btn editor-action-danger" onclick="toggleSlideVisibility()"><i class="fas fa-eye-slash"></i> ${lang === 'zh' ? '隐藏/显示' : 'Hide/Show'}</button>
      </div>
      <div class="editor-footer">
        <button class="editor-save-btn" onclick="saveEdits()"><i class="fas fa-save"></i> ${lang === 'zh' ? '保存修改' : 'Save Changes'}</button>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="deck-nav">
    <button class="deck-nav-btn" id="btn-prev" onclick="prevSlide()" disabled>
      <i class="fas fa-chevron-left"></i> ${lang === 'zh' ? '上一页' : 'Prev'}
    </button>
    <span class="deck-nav-counter"><span id="current-page">1</span> / ${total}</span>
    <button class="deck-nav-btn" id="btn-next" onclick="nextSlide()">
      ${lang === 'zh' ? '下一页' : 'Next'} <i class="fas fa-chevron-right"></i>
    </button>
  </div>

  <!-- Thumbnails -->
  <div class="deck-thumbs" id="deck-thumbs">${thumbsHTML}</div>

  <!-- Toast -->
  <div id="toast-container" style="position:fixed;top:72px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;"></div>

  <script>
    let currentSlide = 0;
    const totalSlides = ${total};
    const slidesData = ${slidesJSON};
    const themesData = ${themesJSON};
    const currentThemeId = '${theme.id}';
    const projectId = '${projectId}';
    const LANG = '${lang}';
    let editorOpen = false;
    let hiddenSlides = new Set();

    // ── Slide Navigation ──
    function showSlide(index) {
      document.querySelectorAll('.deck-slide-wrap').forEach((s, i) => {
        s.style.display = i === index ? 'flex' : 'none';
      });
      currentSlide = index;
      document.getElementById('current-page').textContent = index + 1;
      document.getElementById('btn-prev').disabled = index === 0;
      document.getElementById('btn-next').disabled = index === totalSlides - 1;
      document.querySelectorAll('.deck-thumb-btn').forEach((t, i) => {
        t.classList.toggle('active', i === index);
      });
      const activeThumb = document.querySelector('.deck-thumb-btn.active');
      if (activeThumb) activeThumb.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
      if (editorOpen) populateEditor(index);
    }

    function nextSlide() { if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1); }
    function prevSlide() { if (currentSlide > 0) showSlide(currentSlide - 1); }
    function goToSlide(i) { showSlide(i); }

    document.addEventListener('keydown', e => {
      if (editorOpen && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
      if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
      if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
      if (e.key === 'e' || e.key === 'E') { toggleEditor(); }
    });

    // ── Editor Toggle ──
    function toggleEditor() {
      editorOpen = !editorOpen;
      const sidebar = document.getElementById('editor-sidebar');
      const layout = document.getElementById('deck-main-layout');
      const toggleBtn = document.getElementById('btn-toggle-editor');
      if (editorOpen) {
        sidebar.style.display = 'flex';
        layout.classList.add('editor-open');
        toggleBtn.classList.add('active');
        populateEditor(currentSlide);
      } else {
        sidebar.style.display = 'none';
        layout.classList.remove('editor-open');
        toggleBtn.classList.remove('active');
      }
    }

    // ── Populate Editor Fields ──
    function populateEditor(slideIdx) {
      const slide = slidesData[slideIdx];
      if (!slide) return;
      const info = document.getElementById('editor-slide-info');
      const fields = document.getElementById('editor-fields');
      
      const slideTypeLabels = {
        cover: '${lang === 'zh' ? '封面' : 'Cover'}',
        company_overview: '${lang === 'zh' ? '公司简介' : 'Company Overview'}',
        problem: '${lang === 'zh' ? '行业痛点' : 'Problem'}',
        solution: '${lang === 'zh' ? '解决方案' : 'Solution'}',
        product: '${lang === 'zh' ? '产品与服务' : 'Product'}',
        business_model: '${lang === 'zh' ? '商业模式' : 'Business Model'}',
        market: '${lang === 'zh' ? '市场分析' : 'Market'}',
        traction: '${lang === 'zh' ? '牵引力' : 'Traction'}',
        financials: '${lang === 'zh' ? '财务亮点' : 'Financials'}',
        unit_economics: '${lang === 'zh' ? '单位经济' : 'Unit Economics'}',
        growth_metrics: '${lang === 'zh' ? '增长指标' : 'Growth Metrics'}',
        competitive_advantage: '${lang === 'zh' ? '竞争优势' : 'Competitive Advantage'}',
        team: '${lang === 'zh' ? '团队' : 'Team'}',
        financing_ask: '${lang === 'zh' ? '融资需求' : 'The Ask'}',
        closing: '${lang === 'zh' ? '结束页' : 'Closing'}',
      };

      const typeLabel = slideTypeLabels[slide.type] || slide.type;
      const isHidden = hiddenSlides.has(slideIdx);
      
      info.innerHTML = '<div class="editor-slide-badge">' +
        '<span class="editor-slide-num">' + (slideIdx + 1) + '/' + totalSlides + '</span>' +
        '<span class="editor-slide-type">' + typeLabel + '</span>' +
        (isHidden ? '<span class="editor-slide-hidden"><i class="fas fa-eye-slash"></i> ${lang === 'zh' ? '已隐藏' : 'Hidden'}</span>' : '') +
      '</div>';

      // Build editable fields based on what the slide has
      let html = '';

      // Title field
      if (slide.title) {
        const val = LANG === 'en' ? (slide.title.en || '') : (slide.title.zh || '');
        html += editorField('${lang === 'zh' ? '标题' : 'Title'}', 'title', val, 'text');
      }

      // Headline / hook
      if (slide.headline) {
        const val = LANG === 'en' ? (slide.headline.en || '') : (slide.headline.zh || '');
        html += editorField('${lang === 'zh' ? '叙事金句' : 'Headline'}', 'headline', val, 'textarea');
      }

      // Content-specific fields
      if (slide.contentKind === 'cover') {
        html += '<div class="editor-section-label"><i class="fas fa-star"></i> ${lang === 'zh' ? '封面设置' : 'Cover Settings'}</div>';
        html += editorFieldReadonly('${lang === 'zh' ? '内容类型' : 'Content Type'}', '${lang === 'zh' ? '封面/结束页' : 'Cover/Closing'}');
      }
      else if (slide.contentKind === 'kpi_grid') {
        html += '<div class="editor-section-label"><i class="fas fa-th-large"></i> ${lang === 'zh' ? 'KPI卡片' : 'KPI Cards'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '点击幻灯片上的数值可直接编辑' : 'Click values on the slide to edit directly'}</div>';
      }
      else if (slide.contentKind === 'chart') {
        html += '<div class="editor-section-label"><i class="fas fa-chart-bar"></i> ${lang === 'zh' ? '图表数据' : 'Chart Data'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '图表数据可通过API更新' : 'Chart data can be updated via API'}</div>';
      }
      else if (slide.contentKind === 'text_block') {
        html += '<div class="editor-section-label"><i class="fas fa-align-left"></i> ${lang === 'zh' ? '内容段落' : 'Content Sections'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '点击幻灯片上的文字可直接编辑' : 'Click text on the slide to edit directly'}</div>';
      }
      else if (slide.contentKind === 'team') {
        html += '<div class="editor-section-label"><i class="fas fa-users"></i> ${lang === 'zh' ? '团队信息' : 'Team Info'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '团队成员信息可在项目页修改' : 'Edit team info on project page'}</div>';
      }
      else if (slide.contentKind === 'financing_ask') {
        html += '<div class="editor-section-label"><i class="fas fa-hand-holding-usd"></i> ${lang === 'zh' ? '融资信息' : 'Financing Info'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '点击金额数字可直接编辑' : 'Click the amount to edit directly'}</div>';
      }
      else if (slide.contentKind === 'timeline') {
        html += '<div class="editor-section-label"><i class="fas fa-stream"></i> ${lang === 'zh' ? '时间线' : 'Timeline'}</div>';
        html += '<div class="editor-hint">${lang === 'zh' ? '里程碑可在项目页修改' : 'Edit milestones on project page'}</div>';
      }

      // Subtitle if exists
      if (slide.subtitle) {
        const val = LANG === 'en' ? (slide.subtitle.en || '') : (slide.subtitle.zh || '');
        html += editorField('${lang === 'zh' ? '副标题' : 'Subtitle'}', 'subtitle', val, 'text');
      }

      fields.innerHTML = html;

      // Attach live-edit listeners
      fields.querySelectorAll('[data-field]').forEach(el => {
        el.addEventListener('input', function() {
          liveUpdateSlide(slideIdx, this.dataset.field, this.value);
        });
      });
    }

    function editorField(label, fieldName, value, type) {
      if (type === 'textarea') {
        return '<div class="editor-field">' +
          '<label class="editor-label">' + label + '</label>' +
          '<textarea class="editor-input editor-textarea" data-field="' + fieldName + '" rows="3">' + escHTML(value) + '</textarea>' +
        '</div>';
      }
      return '<div class="editor-field">' +
        '<label class="editor-label">' + label + '</label>' +
        '<input class="editor-input" type="text" data-field="' + fieldName + '" value="' + escHTML(value) + '"/>' +
      '</div>';
    }

    function editorFieldReadonly(label, value) {
      return '<div class="editor-field">' +
        '<label class="editor-label">' + label + '</label>' +
        '<div class="editor-readonly">' + value + '</div>' +
      '</div>';
    }

    function escHTML(s) {
      return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    // ── Live Update on Slide ──
    function liveUpdateSlide(slideIdx, field, value) {
      const wrap = document.querySelectorAll('.deck-slide-wrap')[slideIdx];
      if (!wrap) return;

      if (field === 'title') {
        const titleEl = wrap.querySelector('.s-title') || wrap.querySelector('.s-cover-title');
        if (titleEl) titleEl.textContent = value;
        // Update internal data
        if (slidesData[slideIdx].title) {
          slidesData[slideIdx].title[LANG] = value;
        }
      }
      else if (field === 'headline') {
        const headlineEl = wrap.querySelector('.s-headline') || wrap.querySelector('.s-cover-tagline');
        if (headlineEl) headlineEl.textContent = value;
        if (slidesData[slideIdx].headline) {
          slidesData[slideIdx].headline[LANG] = value;
        }
      }
      else if (field === 'subtitle') {
        if (slidesData[slideIdx].subtitle) {
          slidesData[slideIdx].subtitle[LANG] = value;
        }
      }
    }

    // ── Slide Actions ──
    function moveSlide(direction) {
      const newIdx = currentSlide + direction;
      if (newIdx < 0 || newIdx >= totalSlides) return;
      // Swap DOM elements
      const container = document.getElementById('slide-container');
      const wraps = Array.from(container.querySelectorAll('.deck-slide-wrap'));
      const current = wraps[currentSlide];
      const target = wraps[newIdx];
      if (direction === -1) container.insertBefore(current, target);
      else container.insertBefore(target, current);
      // Swap data
      [slidesData[currentSlide], slidesData[newIdx]] = [slidesData[newIdx], slidesData[currentSlide]];
      // Update watermarks
      container.querySelectorAll('.deck-slide-wrap').forEach((w, i) => {
        w.dataset.index = i;
        const wm = w.querySelector('.s-watermark');
        if (wm) wm.textContent = (i+1) + '/' + totalSlides;
      });
      showSlide(newIdx);
      showToast('${lang === 'zh' ? '幻灯片已移动' : 'Slide moved'}', 'success');
    }

    function toggleSlideVisibility() {
      if (hiddenSlides.has(currentSlide)) {
        hiddenSlides.delete(currentSlide);
        document.querySelectorAll('.deck-slide-wrap')[currentSlide].style.opacity = '1';
        showToast('${lang === 'zh' ? '幻灯片已显示' : 'Slide visible'}', 'success');
      } else {
        hiddenSlides.add(currentSlide);
        document.querySelectorAll('.deck-slide-wrap')[currentSlide].style.opacity = '0.4';
        showToast('${lang === 'zh' ? '幻灯片已隐藏（打印/分享时跳过）' : 'Slide hidden (skipped in print/share)'}', 'info');
      }
      populateEditor(currentSlide);
    }

    function saveEdits() {
      // Persist to localStorage for demo
      const key = 'deck_edits_' + projectId;
      const edits = { slidesData, hiddenSlides: Array.from(hiddenSlides), savedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(edits));
      showToast('${lang === 'zh' ? '修改已保存' : 'Changes saved'}', 'success');
    }

    // ── Theme Picker ──
    function toggleThemePicker() {
      const picker = document.getElementById('theme-picker');
      if (picker.style.display === 'none') {
        const grid = document.getElementById('theme-picker-grid');
        grid.innerHTML = themesData.map(function(th) {
          var isActive = th.id === currentThemeId;
          return '<button class="theme-pick-btn ' + (isActive ? 'active' : '') + '" onclick="switchTheme(\\'' + th.id + '\\')">' +
            '<span class="theme-pick-dot" style="background:' + th.primary + ';"></span>' +
            '<span>' + th.name + (th.isPremium ? ' ★' : '') + '</span>' +
            (isActive ? '<i class="fas fa-check" style="color:#34c759;margin-left:auto;"></i>' : '') +
          '</button>';
        }).join('');
        picker.style.display = 'block';
      } else {
        picker.style.display = 'none';
      }
    }

    function switchTheme(themeId) {
      var url = new URL(location.href);
      url.searchParams.set('theme', themeId);
      location.href = url.toString();
    }

    // ── Utilities ──
    function shareDeck() {
      navigator.clipboard.writeText(location.href).then(function() { showToast('${lang === 'zh' ? '链接已复制' : 'Link copied'}','success'); });
    }

    function showToast(message, type) {
      var c = document.getElementById('toast-container');
      var t = document.createElement('div');
      t.style.cssText = 'pointer-events:auto;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:#fff;border:1px solid rgba(0,0,0,0.06);box-shadow:0 4px 8px rgba(0,0,0,0.04),0 16px 40px rgba(0,0,0,0.08);font-size:14px;font-weight:500;animation:toastIn 280ms ease both;';
      var icons = {success:'fa-check-circle',info:'fa-info-circle',warning:'fa-exclamation-triangle'};
      var colors = {success:'#34c759',info:'#32ade6',warning:'#ff9500'};
      t.innerHTML = '<i class="fas '+(icons[type]||icons.success)+'" style="color:'+(colors[type]||colors.success)+';"></i><span style="color:#1a1a1a;">'+message+'</span>';
      c.appendChild(t);
      setTimeout(function() { t.style.opacity='0'; t.style.transform='translateY(-12px)'; setTimeout(function() { t.remove(); }, 200); }, 3000);
    }

    // ── Inline Editing on Slides ──
    document.addEventListener('dblclick', function(e) {
      if (!editorOpen) return;
      var target = e.target;
      // Allow direct editing of text elements
      var editableSelectors = ['.s-title', '.s-headline', '.s-cover-title', '.s-cover-tagline',
        '.s-kpi-value', '.s-text-section-body', '.s-financing-amount', '.s-team-name',
        '.s-team-role', '.s-team-bg', '.s-timeline-title'];
      var isEditable = editableSelectors.some(function(sel) { return target.matches(sel); });
      if (isEditable && !target.contentEditable || target.contentEditable === 'false') {
        target.contentEditable = true;
        target.style.outline = '2px solid ${theme.colors.primary}';
        target.style.outlineOffset = '2px';
        target.style.borderRadius = '4px';
        target.focus();
        target.addEventListener('blur', function handler() {
          target.contentEditable = false;
          target.style.outline = '';
          target.style.outlineOffset = '';
          target.removeEventListener('blur', handler);
          showToast('${lang === 'zh' ? '内容已更新' : 'Content updated'}', 'success');
        }, { once: true });
      }
    });

    // ── Load saved edits if any ──
    (function() {
      var key = 'deck_edits_' + projectId;
      var saved = localStorage.getItem(key);
      if (saved) {
        try {
          var data = JSON.parse(saved);
          if (data.hiddenSlides) {
            hiddenSlides = new Set(data.hiddenSlides);
            data.hiddenSlides.forEach(function(idx) {
              var w = document.querySelectorAll('.deck-slide-wrap')[idx];
              if (w) w.style.opacity = '0.4';
            });
          }
        } catch(e) {}
      }
    })();
  </script>
</body>
</html>`
}

// ---- Shell CSS (toolbar, nav, thumbs — theme-aware) ----
function shellCSS(theme: DeckTheme): string {
  const isDark = theme.colors.background.startsWith('#0') || theme.colors.background.startsWith('#1') || theme.colors.background === '#000000'
  const shellBg = isDark ? 'rgba(0,0,0,0.9)' : 'rgba(26,26,46,0.95)'

  return `
@keyframes toastIn { from { opacity:0; transform:translateY(-12px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }

.deck-toolbar {
  height: 50px; background: ${shellBg}; backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.08);
}
.deck-toolbar-center { display:flex; align-items:center; gap:10px; }
.deck-toolbar-title { font-size:14px; font-weight:600; color:rgba(255,255,255,0.8); }
.deck-toolbar-badge {
  font-size:11px; padding:3px 10px; border-radius:9999px;
  background:${theme.colors.primary}30; color:${theme.colors.primary}; font-weight:600;
}
.deck-toolbar-right { display:flex; gap:8px; }
.deck-tool-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 14px; border-radius:9999px; border:1px solid rgba(255,255,255,0.15);
  background:transparent; color:rgba(255,255,255,0.7); font-size:13px; font-weight:500;
  cursor:pointer; text-decoration:none; font-family:var(--s-font-body);
  transition: all 180ms ease;
}
.deck-tool-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }

.deck-stage {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 24px; overflow: hidden; background: #111; min-width: 0;
}
.deck-slide-container { width: 100%; max-width: 900px; aspect-ratio: 16/10; }
.deck-slide-wrap { width: 100%; height: 100%; display: flex; align-items: stretch; }

.deck-nav {
  flex-shrink: 0; height: 48px;
  display: flex; align-items: center; justify-content: center; gap: 20px;
  background: ${shellBg}; border-top: 1px solid rgba(255,255,255,0.08);
}
.deck-nav-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.15);
  background: transparent; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;
  cursor: pointer; font-family: var(--s-font-body); transition: all 180ms;
}
.deck-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: #fff; }
.deck-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.deck-nav-counter { font-size:14px; color:rgba(255,255,255,0.5); font-weight:600; min-width:60px; text-align:center; }

.deck-thumbs {
  flex-shrink: 0; height: 44px;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  background: ${shellBg}; padding: 0 20px; overflow-x: auto;
}
.deck-thumb-btn {
  width: 32px; height: 28px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12); background: transparent;
  color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 180ms; flex-shrink: 0;
  font-family: var(--s-font-body);
}
.deck-thumb-btn:hover { border-color: ${theme.colors.primary}; color: ${theme.colors.primary}; }
.deck-thumb-btn.active { background: ${theme.colors.primary}; color: ${theme.colors.textOnPrimary}; border-color: ${theme.colors.primary}; }
`
}

// ---- Editor CSS ----
function editorCSS(): string {
  return `
/* ═══ Main Layout ═══ */
.deck-main-layout {
  flex: 1; display: flex; overflow: hidden;
}
.deck-main-layout .deck-stage {
  flex: 1; transition: all 300ms ease;
}
.deck-main-layout.editor-open .deck-stage {
  /* slide area shrinks when editor opens */
}

/* ═══ Editor Sidebar ═══ */
.editor-sidebar {
  width: 340px; flex-shrink: 0;
  background: rgba(20,20,30,0.98); backdrop-filter: blur(16px);
  border-left: 1px solid rgba(255,255,255,0.08);
  display: flex; flex-direction: column; overflow: hidden;
  animation: editorSlideIn 280ms ease both;
}
@keyframes editorSlideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.editor-header {
  padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
}
.editor-title {
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.9);
  display: flex; align-items: center; gap: 8px;
}
.editor-title i { color: #5DC4B3; }
.editor-close {
  background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer;
  font-size: 16px; padding: 4px 8px; border-radius: 6px; transition: all 180ms;
}
.editor-close:hover { color: #ff375f; background: rgba(255,55,95,0.1); }

.editor-slide-info { padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
.editor-slide-badge { display: flex; align-items: center; gap: 8px; }
.editor-slide-num {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5);
  padding: 2px 8px; background: rgba(255,255,255,0.08); border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
}
.editor-slide-type {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8);
}
.editor-slide-hidden {
  font-size: 11px; color: #ff9500; font-weight: 600;
  display: flex; align-items: center; gap: 4px;
}

.editor-fields {
  flex: 1; overflow-y: auto; padding: 16px 20px;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent;
}
.editor-fields::-webkit-scrollbar { width: 4px; }
.editor-fields::-webkit-scrollbar-track { background: transparent; }
.editor-fields::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

.editor-field { margin-bottom: 16px; }
.editor-label {
  display: block; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
}
.editor-input {
  width: 100%; padding: 8px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.9); font-size: 13px; font-family: inherit;
  outline: none; transition: all 180ms;
}
.editor-input:focus {
  border-color: #5DC4B3; box-shadow: 0 0 0 3px rgba(93,196,179,0.15);
}
.editor-textarea {
  resize: vertical; min-height: 60px; line-height: 1.5;
}
.editor-readonly {
  padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4);
  font-size: 13px; font-style: italic;
}
.editor-section-label {
  font-size: 12px; font-weight: 700; color: #5DC4B3; margin: 16px 0 8px;
  display: flex; align-items: center; gap: 6px;
}
.editor-hint {
  font-size: 11px; color: rgba(255,255,255,0.35); margin-bottom: 12px;
  padding: 6px 10px; background: rgba(255,255,255,0.03); border-radius: 6px;
  line-height: 1.5;
}

.editor-actions {
  padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.06);
  display: flex; gap: 6px; flex-wrap: wrap; flex-shrink: 0;
}
.editor-action-btn {
  flex: 1; padding: 8px 10px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 180ms; display: flex; align-items: center; justify-content: center; gap: 4px;
  font-family: inherit;
}
.editor-action-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
.editor-action-danger:hover { background: rgba(255,55,95,0.1); color: #ff375f; border-color: rgba(255,55,95,0.3); }

.editor-footer {
  padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
}
.editor-save-btn {
  width: 100%; padding: 10px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #5DC4B3, #3D8F83); color: #fff;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 200ms; font-family: inherit;
}
.editor-save-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(93,196,179,0.3); }

/* ═══ Theme Picker ═══ */
.theme-picker {
  position: absolute; top: 52px; right: 120px; z-index: 100;
  background: rgba(20,20,30,0.98); backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
  padding: 16px; min-width: 240px; box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  animation: pickerIn 200ms ease both;
}
@keyframes pickerIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
.theme-picker-title {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;
}
.theme-picker-grid { display: flex; flex-direction: column; gap: 4px; }
.theme-pick-btn {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 8px 12px; border-radius: 8px; border: 1px solid transparent;
  background: transparent; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 180ms; font-family: inherit; text-align: left;
}
.theme-pick-btn:hover { background: rgba(255,255,255,0.06); }
.theme-pick-btn.active { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); color: #fff; }
.theme-pick-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }

/* ═══ Toolbar Edit Button Active State ═══ */
.deck-tool-btn-edit.active {
  background: rgba(93,196,179,0.2); color: #5DC4B3; border-color: rgba(93,196,179,0.4);
}

/* ═══ Print: hide editor ═══ */
@media print {
  .editor-sidebar, .theme-picker { display: none !important; }
  .deck-main-layout.editor-open .deck-stage { flex: 1; }
}

/* ═══ Mobile responsive ═══ */
@media (max-width: 768px) {
  .editor-sidebar { width: 280px; font-size: 12px; }
  .theme-picker { right: 10px; }
}
`
}

// ---- Industry icon mapping ----
function getIndustryIcon(industry: string): string {
  const icons: Record<string, string> = {
    catering: 'fa-utensils', concert: 'fa-music', retail: 'fa-store',
    healthcare: 'fa-heartbeat', education: 'fa-graduation-cap',
    saas: 'fa-cloud', ecommerce: 'fa-shopping-cart', service: 'fa-concierge-bell',
  }
  return icons[industry] || 'fa-briefcase'
}
