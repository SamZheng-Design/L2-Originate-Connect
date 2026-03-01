// ═══════════════════════════════════════════════════════
// 模态框组件 — v33 对齐版：毛玻璃遮罩 + 弹性动画
// ═══════════════════════════════════════════════════════

export function renderModal(): string {
  return `<div id="modal-overlay" class="modal-overlay" style="display:none;" onclick="closeModal(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div id="modal-content"></div>
    </div>
  </div>`
}

export const modalCSS = `
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  animation: fadeIn var(--duration-fast) var(--ease-apple) both;
}
.modal-box {
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
  width: 100%; max-width: 520px;
  max-height: 85vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  isolation: isolate;
  animation: modalSlideUp var(--duration-normal) var(--ease-apple) both;
}
.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 18px; font-weight: 700; color: var(--text-title);
  flex-shrink: 0;
}
.modal-body {
  padding: 20px 24px;
  overflow-y: auto; flex: 1; min-height: 0;
}
.modal-footer {
  padding: 16px 24px;
  background: #f8fafc;
  display: flex; justify-content: flex-end; gap: 12px;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;
}
.form-group { margin-bottom: 16px; }
.form-label {
  display: block; margin-bottom: 6px;
  font-size: 13px; font-weight: 600; color: var(--text-secondary);
}
.form-input {
  width: 100%; padding: 12px 16px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: var(--radius-md);
  font-size: 14px; font-family: var(--font-body);
  color: var(--text-primary); background: white;
  transition: all var(--duration-fast) var(--ease-apple);
  outline: none;
}
.form-input:hover { border-color: rgba(0,0,0,0.2); }
.form-input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(93,196,179,0.12), 0 1px 2px rgba(0,0,0,0.04);
}
.form-input::placeholder { color: var(--text-placeholder); }
.form-select {
  width: 100%; padding: 12px 16px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: var(--radius-md);
  font-size: 14px; font-family: var(--font-body);
  color: var(--text-primary); background: white;
  cursor: pointer; outline: none;
  transition: all var(--duration-fast) var(--ease-apple);
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2386868b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}
.form-select:hover { border-color: rgba(0,0,0,0.2); }
.form-select:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(93,196,179,0.12), 0 1px 2px rgba(0,0,0,0.04);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 12px; align-items: flex-end;
  }
  .modal-box {
    margin: 12px; max-height: 90vh;
    border-radius: var(--radius-xl);
  }
}
`

export const modalScript = `
function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e && e.target && e.target.id !== 'modal-overlay') return;
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}
function closeModalDirect() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}
`
