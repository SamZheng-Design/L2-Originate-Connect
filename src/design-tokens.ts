// ═══════════════════════════════════════════════════════
// 发起通 Design Tokens V2 — 对齐 MC-Revolution v33 设计系统
// Premium Design System — Apple-Inspired Precision + Micro-Interactions
// ═══════════════════════════════════════════════════════

export const designTokensCSS = `
/* ===== Google Fonts ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  /* ---- Brand Colors (v33 Teal 统一) ---- */
  --brand-primary: #5DC4B3;
  --brand-light: #7DD4C7;
  --brand-dark: #3D8F83;
  --brand-accent: #49A89A;
  --logo-bright: #2EC4B6;
  --logo-bright2: #3DD8CA;
  --logo-deep: #28A696;

  /* ---- Originate Connect 专属色 (保留辨识度) ---- */
  --oc-light: #CCFBF1;
  --oc-dark: #5DC4B3;
  --oc-hover: #3D8F83;

  /* ---- Semantic Colors ---- */
  --color-info: #32ade6;
  --color-success: #34c759;
  --color-warning: #ff9f0a;
  --color-error: #ff375f;

  /* ---- Text Hierarchy ---- */
  --text-primary: #1d1d1f;
  --text-title: #1a1a1a;
  --text-secondary: #6e6e73;
  --text-tertiary: #86868b;
  --text-placeholder: #aeaeb2;
  --text-white: #ffffff;

  /* ---- Backgrounds ---- */
  --bg-page: #f5f5f7;
  --bg-card: rgba(255, 255, 255, 0.88);
  --bg-navbar: rgba(255, 255, 255, 0.92);
  --bg-white: #ffffff;

  /* ---- Borders ---- */
  --border-default: rgba(0, 0, 0, 0.06);
  --border-input: rgba(0, 0, 0, 0.12);
  --border-hover: rgba(93, 196, 179, 0.2);
  --border-focus: #5DC4B3;

  /* ---- Border Radius ---- */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* ---- Gradients (v33 对齐) ---- */
  --gradient-primary: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
  --gradient-oc: linear-gradient(135deg, #5DC4B3 0%, #3D8F83 100%);
  --gradient-cyber: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);
  --gradient-neon: linear-gradient(135deg, #32ade6 0%, #5DC4B3 40%, #49A89A 70%, #3D8F83 100%);
  --gradient-aurora: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 25%, #0c3530 50%, #164e47 75%, #1a6b5f 100%);
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
  --gradient-success: linear-gradient(135deg, #30b750 0%, #34c759 100%);
  --gradient-warning: linear-gradient(135deg, #f0840a 0%, #ff9f0a 100%);
  --gradient-danger: linear-gradient(135deg, #d62040 0%, #ff375f 100%);
  --gradient-info: linear-gradient(135deg, #0a84ff 0%, #32ade6 100%);
  --gradient-surface: linear-gradient(180deg, #ffffff 0%, #f8f9fe 100%);
  --gradient-mesh: radial-gradient(at 20% 20%, rgba(93, 196, 179, 0.06) 0%, transparent 50%),
                   radial-gradient(at 80% 80%, rgba(73, 168, 154, 0.04) 0%, transparent 50%),
                   radial-gradient(at 50% 50%, rgba(50, 173, 230, 0.03) 0%, transparent 50%);

  /* ---- Glass Effects (v33 Apple风毛玻璃) ---- */
  --glass-bg: rgba(255, 255, 255, 0.72);
  --glass-bg-solid: rgba(255, 255, 255, 0.92);
  --glass-bg-dark: rgba(15, 23, 42, 0.85);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-border-light: rgba(93, 196, 179, 0.15);
  --glass-blur: blur(24px) saturate(180%);

  /* ---- Shadows (v33 精致分层) ---- */
  --shadow-neon-primary: 0 0 24px rgba(93, 196, 179, 0.2), 0 0 48px rgba(93, 196, 179, 0.06);
  --shadow-neon-cyan: 0 0 24px rgba(50, 173, 230, 0.2), 0 0 48px rgba(50, 173, 230, 0.06);
  --shadow-neon-emerald: 0 0 24px rgba(52, 199, 89, 0.2), 0 0 48px rgba(52, 199, 89, 0.06);
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 40px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.06), 0 24px 56px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.08), 0 32px 72px rgba(0, 0, 0, 0.14);
  --shadow-inner: inset 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 1px 1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 48px rgba(93, 196, 179, 0.1);

  /* ---- Transitions (v33 Apple风顺滑) ---- */
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-apple: cubic-bezier(0.28, 0.11, 0.32, 1);
  --duration-fast: 180ms;
  --duration-normal: 280ms;
  --duration-slow: 420ms;
  --duration-slower: 600ms;

  /* ---- Typography ---- */
  --font-body: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif;
  --font-brand: 'Montserrat', 'Inter', 'Futura', 'Helvetica Neue', sans-serif;
}

/* ===== Reset & Base ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-family: var(--font-body);
  color: var(--text-primary);
  background: var(--bg-page);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  letter-spacing: -0.01em;
}

body { min-height: 100vh; line-height: 1.5; }
a { color: inherit; text-decoration: none; }

/* ===== 科技感背景系统 (v33) ===== */
.cyber-bg {
  position: relative;
  background: var(--gradient-aurora);
}
.cyber-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(93, 196, 179, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(73, 168, 154, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(50, 173, 230, 0.12) 0%, transparent 50%);
  pointer-events: none;
}

.grid-bg {
  background-color: #f5f5f7;
  background-image:
    var(--gradient-mesh),
    linear-gradient(rgba(93, 196, 179, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(93, 196, 179, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 48px 48px, 48px 48px;
}

/* 粒子背景 (v33) */
.particles-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(93, 196, 179, 0.5) 0, transparent 2px),
    radial-gradient(circle at 40% 70%, rgba(73, 168, 154, 0.4) 0, transparent 2px),
    radial-gradient(circle at 60% 20%, rgba(50, 173, 230, 0.35) 0, transparent 2px),
    radial-gradient(circle at 80% 60%, rgba(52, 199, 89, 0.3) 0, transparent 2px),
    radial-gradient(circle at 10% 80%, rgba(255, 55, 95, 0.25) 0, transparent 2px),
    radial-gradient(circle at 90% 40%, rgba(93, 196, 179, 0.35) 0, transparent 2px);
  pointer-events: none;
  animation: particleFloat 30s linear infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-16px); opacity: 0.85; }
}

/* ===== Common Utilities ===== */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* ===== Button System (v33 精致风) ===== */
.btn {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 24px; border: none; border-radius: var(--radius-md);
  font-family: var(--font-body); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all var(--duration-normal) var(--ease-apple);
  text-decoration: none; line-height: 1.4;
  overflow: hidden; letter-spacing: -0.01em;
}
.btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  opacity: 0; transition: opacity var(--duration-normal);
}
.btn:hover::before { opacity: 1; }
.btn:active { transform: translateY(0) scale(0.98); filter: brightness(0.96); }

.btn-primary {
  background: var(--gradient-primary); color: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,0.04), 0 4px 12px rgba(93,196,179,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(93,196,179,0.35);
  filter: brightness(1.06);
}

.btn-secondary {
  background: white; color: var(--text-primary);
  border: 1px solid rgba(0,0,0,0.12);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.btn-secondary:hover {
  border-color: rgba(93,196,179,0.4); color: var(--brand-primary);
  background: rgba(93,196,179,0.04);
  box-shadow: 0 2px 8px rgba(93,196,179,0.1);
}

.btn-brand {
  background: var(--gradient-primary); color: #fff;
  box-shadow: 0 2px 8px rgba(93,196,179,0.25);
}
.btn-brand:hover { box-shadow: 0 4px 16px rgba(93,196,179,0.35); transform: translateY(-1px); }

.btn-success {
  background: var(--gradient-success); color: white;
  box-shadow: 0 4px 12px rgba(52, 199, 89, 0.28);
}
.btn-success:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(52, 199, 89, 0.35); filter: brightness(1.06); }

.btn-danger {
  background: var(--gradient-danger); color: white;
  box-shadow: 0 4px 12px rgba(255, 55, 95, 0.28);
}
.btn-danger:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255, 55, 95, 0.35); filter: brightness(1.06); }

.btn-ghost {
  background: transparent; color: #6e6e73;
}
.btn-ghost:hover { background: rgba(93,196,179,0.06); color: var(--brand-primary); }

.btn-sm { padding: 6px 16px; font-size: 13px; }
.btn-lg { padding: 14px 32px; font-size: 16px; }

.btn:disabled {
  opacity: 0.5; cursor: not-allowed; transform: none !important;
  box-shadow: none !important;
}

/* ===== Card System (v33 玻璃态) ===== */
.card, .project-card {
  position: relative;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  transition: all var(--duration-normal) var(--ease-apple);
  overflow: hidden;
}
.card::before, .project-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--gradient-neon);
  opacity: 0; transition: opacity var(--duration-normal);
}
.card-hover:hover, .project-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(93, 196, 179, 0.12);
}
.card-hover:hover::before, .project-card:hover::before { opacity: 1; }

/* ===== Badge System (v33) ===== */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: var(--radius-full);
  font-size: 12px; font-weight: 600; line-height: 1;
  letter-spacing: 0.02em;
}
.badge-primary { background: rgba(93,196,179,0.1); color: var(--brand-primary); }
.badge-success { background: rgba(16,185,129,0.1); color: var(--color-success); }
.badge-warning { background: rgba(245,158,11,0.1); color: var(--color-warning); }
.badge-danger { background: rgba(244,63,94,0.1); color: var(--color-error); }
.badge-info { background: rgba(6,182,212,0.1); color: var(--color-info); }

/* ===== Upload Zone ===== */
.upload-zone {
  border: 2px dashed rgba(93,196,179,0.3);
  border-radius: var(--radius-lg);
  padding: 48px 24px; text-align: center; cursor: pointer;
  transition: all var(--duration-normal) var(--ease-apple);
  background: var(--bg-white);
}
.upload-zone:hover, .upload-zone.dragover {
  border-color: var(--brand-primary);
  background: rgba(93,196,179,0.04);
  box-shadow: 0 0 0 4px rgba(93,196,179,0.08);
}

/* ===== Step Indicator (v33 teal) ===== */
.step-indicator {
  display: flex; align-items: center; justify-content: center; gap: 0;
}
.step-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; color: var(--text-tertiary);
}
.step-item.active { color: var(--brand-primary); font-weight: 600; }
.step-item.completed { color: var(--color-success); }
.step-dot {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  background: var(--bg-page); color: var(--text-tertiary);
  border: 2px solid var(--border-input);
  transition: all var(--duration-normal) var(--ease-apple);
}
.step-item.active .step-dot {
  background: var(--gradient-primary); color: #fff; border-color: var(--brand-primary);
  box-shadow: var(--shadow-neon-primary);
}
.step-item.completed .step-dot {
  background: var(--gradient-success); color: #fff; border-color: var(--color-success);
  box-shadow: var(--shadow-neon-emerald);
}
.step-line {
  width: 80px; height: 2px; background: var(--border-input);
  margin: 0 8px;
  transition: background var(--duration-normal) var(--ease-apple);
}
.step-line.active { background: var(--brand-primary); }
.step-line.completed { background: var(--color-success); }

/* ===== Progress Bar ===== */
.progress-bar {
  width: 100%; height: 6px; background: var(--bg-page);
  border-radius: var(--radius-full); overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: var(--radius-full);
  background: var(--gradient-primary);
  transition: width var(--duration-slow) var(--ease-spring);
}

/* ===== Tab ===== */
.tab-group { display: flex; gap: 0; border-bottom: 1px solid var(--border-default); }
.tab-item {
  padding: 12px 24px; font-size: 14px; font-weight: 500;
  color: var(--text-secondary); cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--duration-fast) var(--ease-apple);
}
.tab-item:hover { color: var(--text-primary); }
.tab-item.active {
  color: var(--brand-primary); border-bottom-color: var(--brand-primary); font-weight: 600;
}

/* ===== Status colors (v33 teal-first) ===== */
.status-draft { color: #6e6e73; background: #f5f5f7; }
.status-processing { color: #32ade6; background: rgba(50,173,230,0.1); }
.status-ready { color: #34c759; background: rgba(52,199,89,0.1); }
.status-published { color: #5DC4B3; background: rgba(93,196,179,0.1); }

/* ===== Animations (v33 full set) ===== */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
@keyframes pulseGlow { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes gentleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes toastIn { from { opacity: 0; transform: translateY(-12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-12px) scale(0.96); } }
@keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.animate-fade-in { animation: fadeIn var(--duration-normal) var(--ease-apple) both; }
.animate-slide-up { animation: slideUp var(--duration-slow) var(--ease-apple) both; }
.animate-scale-in { animation: scaleIn var(--duration-normal) var(--ease-spring) both; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

/* ===== Special Effects (v33) ===== */
.text-neon {
  background: var(--gradient-neon);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
}
.shimmer {
  background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar { width: 7px; height: 7px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
* { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; }

/* ===== Selection ===== */
::selection { background: rgba(93,196,179,0.2); color: var(--text-primary); }
`
