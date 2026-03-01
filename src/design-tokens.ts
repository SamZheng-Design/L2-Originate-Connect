// ═══════════════════════════════════════════════════════
// 发起通 Design Tokens — 与 Micro Connect 主站一致
// ═══════════════════════════════════════════════════════

export const designTokensCSS = `
/* ===== Google Fonts ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  /* ---- Brand Colors ---- */
  --brand-primary: #5DC4B3;
  --brand-light: #7DD4C7;
  --brand-dark: #3D8F83;
  --brand-accent: #49A89A;
  --logo-bright: #2EC4B6;
  --logo-bright2: #3DD8CA;
  --logo-deep: #28A696;

  /* ---- Originate Connect Exclusive ---- */
  --oc-light: #FEF3C7;
  --oc-dark: #F59E0B;
  --oc-hover: #D97706;

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

  /* ---- Shadows ---- */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  --shadow-md: 0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
  --shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
  --shadow-xl: 0 8px 16px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.1);
  --shadow-card: 0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
  --shadow-card-hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);

  /* ---- Transitions ---- */
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-apple: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 180ms;
  --duration-normal: 280ms;
  --duration-slow: 420ms;
  --duration-slower: 600ms;

  /* ---- Gradients ---- */
  --gradient-primary: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
  --gradient-oc: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  --gradient-aurora: radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%);
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);

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
}

body { min-height: 100vh; }

a { color: inherit; text-decoration: none; }

/* ===== Common Utilities ===== */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 24px; border: none; border-radius: var(--radius-full);
  font-family: var(--font-body); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all var(--duration-normal) var(--ease-spring);
  text-decoration: none; line-height: 1.4;
}
.btn:active { transform: scale(0.97); }

.btn-primary {
  background: var(--gradient-oc); color: #fff;
  box-shadow: 0 2px 8px rgba(245,158,11,0.25);
}
.btn-primary:hover { box-shadow: 0 4px 16px rgba(245,158,11,0.35); transform: translateY(-1px); }

.btn-secondary {
  background: var(--bg-white); color: var(--text-primary);
  border: 1px solid var(--border-input);
}
.btn-secondary:hover { border-color: var(--border-focus); color: var(--brand-primary); }

.btn-brand {
  background: var(--gradient-primary); color: #fff;
  box-shadow: 0 2px 8px rgba(93,196,179,0.25);
}
.btn-brand:hover { box-shadow: 0 4px 16px rgba(93,196,179,0.35); transform: translateY(-1px); }

.btn-ghost {
  background: transparent; color: var(--text-secondary);
  border: 1px solid transparent;
}
.btn-ghost:hover { background: rgba(0,0,0,0.04); color: var(--text-primary); }

.btn-sm { padding: 6px 16px; font-size: 13px; }
.btn-lg { padding: 14px 32px; font-size: 16px; }

.btn:disabled {
  opacity: 0.5; cursor: not-allowed; transform: none !important;
  box-shadow: none !important;
}

/* Card */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: all var(--duration-normal) var(--ease-spring);
  backdrop-filter: blur(12px);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-hover);
}

/* Badge */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: var(--radius-full);
  font-size: 12px; font-weight: 600; line-height: 1;
}

/* Upload Zone */
.upload-zone {
  border: 2px dashed var(--border-input);
  border-radius: var(--radius-lg);
  padding: 48px 24px;
  text-align: center;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-spring);
  background: var(--bg-white);
}
.upload-zone:hover, .upload-zone.dragover {
  border-color: var(--oc-dark);
  background: var(--oc-light);
}

/* Step Indicator */
.step-indicator {
  display: flex; align-items: center; justify-content: center; gap: 0;
}
.step-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; color: var(--text-tertiary);
}
.step-item.active { color: var(--oc-dark); font-weight: 600; }
.step-item.completed { color: var(--color-success); }
.step-dot {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  background: var(--bg-page); color: var(--text-tertiary);
  border: 2px solid var(--border-input);
  transition: all var(--duration-normal) var(--ease-spring);
}
.step-item.active .step-dot {
  background: var(--oc-dark); color: #fff; border-color: var(--oc-dark);
}
.step-item.completed .step-dot {
  background: var(--color-success); color: #fff; border-color: var(--color-success);
}
.step-line {
  width: 80px; height: 2px; background: var(--border-input);
  margin: 0 8px;
  transition: background var(--duration-normal) var(--ease-spring);
}
.step-line.active { background: var(--oc-dark); }
.step-line.completed { background: var(--color-success); }

/* Progress Bar */
.progress-bar {
  width: 100%; height: 6px; background: var(--bg-page);
  border-radius: var(--radius-full); overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: var(--radius-full);
  background: var(--gradient-oc);
  transition: width var(--duration-slow) var(--ease-spring);
}

/* Tab */
.tab-group { display: flex; gap: 0; border-bottom: 1px solid var(--border-default); }
.tab-item {
  padding: 12px 24px; font-size: 14px; font-weight: 500;
  color: var(--text-secondary); cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--duration-fast) var(--ease-spring);
}
.tab-item:hover { color: var(--text-primary); }
.tab-item.active {
  color: var(--oc-dark); border-bottom-color: var(--oc-dark); font-weight: 600;
}

/* Status colors */
.status-draft { color: #6e6e73; background: #f5f5f7; }
.status-processing { color: #F59E0B; background: #FEF3C7; }
.status-ready { color: #34c759; background: #dcfce7; }
.status-published { color: #5DC4B3; background: #d1fae5; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes toastIn { from { opacity: 0; transform: translateY(-12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-12px) scale(0.96); } }

.animate-fade-in { animation: fadeIn var(--duration-normal) var(--ease-spring) both; }
.animate-slide-up { animation: slideUp var(--duration-slow) var(--ease-spring) both; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }

/* Selection */
::selection { background: rgba(93,196,179,0.2); color: var(--text-primary); }
`
