// ═══════════════════════════════════════════════════════
// Toast 通知组件 — v33 对齐版：毛玻璃 + 精致阴影
// ═══════════════════════════════════════════════════════

export function renderToast(): string {
  return `<div id="toast-container" class="toast-container"></div>`
}

export const toastCSS = `
.toast-container {
  position: fixed; top: 72px; right: 24px; z-index: 9000;
  display: flex; flex-direction: column; gap: 10px;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px; border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: var(--shadow-lg);
  font-size: 14px; font-weight: 500; color: var(--text-primary);
  animation: toastIn var(--duration-normal) var(--ease-apple) both;
  max-width: 360px;
}
.toast.toast-out { animation: toastOut var(--duration-fast) var(--ease-apple) both; }
.toast-icon { font-size: 16px; flex-shrink: 0; }
.toast-success .toast-icon { color: var(--color-success); }
.toast-warning .toast-icon { color: var(--color-warning); }
.toast-error .toast-icon { color: var(--color-error); }
.toast-info .toast-icon { color: var(--color-info); }
.toast-success { border-left: 3px solid var(--color-success); }
.toast-warning { border-left: 3px solid var(--color-warning); }
.toast-error { border-left: 3px solid var(--color-error); }
.toast-info { border-left: 3px solid var(--color-info); }
`

export const toastScript = `
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = '<i class="fas ' + (icons[type] || icons.success) + ' toast-icon"></i><span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 200);
  }, duration);
}
`
