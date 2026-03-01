// ═══════════════════════════════════════════════════════
// Toast 通知组件
// ═══════════════════════════════════════════════════════

export function renderToast(): string {
  return `<div id="toast-container" class="toast-container"></div>`
}

export const toastCSS = `
.toast-container {
  position: fixed; top: 72px; right: 24px; z-index: 9999;
  display: flex; flex-direction: column; gap: 8px;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: var(--radius-md);
  background: var(--bg-white);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-lg);
  font-size: 14px; font-weight: 500; color: var(--text-primary);
  animation: toastIn var(--duration-normal) var(--ease-spring) both;
  max-width: 360px;
}
.toast.toast-out { animation: toastOut var(--duration-fast) var(--ease-spring) both; }
.toast-icon { font-size: 16px; flex-shrink: 0; }
.toast-success .toast-icon { color: var(--color-success); }
.toast-warning .toast-icon { color: var(--color-warning); }
.toast-error .toast-icon { color: var(--color-error); }
.toast-info .toast-icon { color: var(--color-info); }
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
