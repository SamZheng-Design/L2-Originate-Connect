// ═══════════════════════════════════════════════════════
// 模态框组件
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
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn var(--duration-fast) var(--ease-spring) both;
}
.modal-box {
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%; max-width: 480px;
  margin: 24px;
  overflow: hidden;
  animation: slideUp var(--duration-normal) var(--ease-spring) both;
}
.modal-header {
  padding: 24px 24px 0;
  font-size: 18px; font-weight: 700; color: var(--text-title);
}
.modal-body { padding: 20px 24px; }
.modal-footer {
  padding: 16px 24px;
  background: #f8fafc;
  display: flex; justify-content: flex-end; gap: 12px;
  border-top: 1px solid var(--border-default);
}
.form-group { margin-bottom: 16px; }
.form-label {
  display: block; margin-bottom: 6px;
  font-size: 13px; font-weight: 600; color: var(--text-secondary);
}
.form-input {
  width: 100%; padding: 10px 14px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-sm);
  font-size: 14px; font-family: var(--font-body);
  color: var(--text-primary); background: var(--bg-white);
  transition: border-color var(--duration-fast);
  outline: none;
}
.form-input:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px rgba(93,196,179,0.1); }
.form-input::placeholder { color: var(--text-placeholder); }
.form-select {
  width: 100%; padding: 10px 14px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-sm);
  font-size: 14px; font-family: var(--font-body);
  color: var(--text-primary); background: var(--bg-white);
  cursor: pointer; outline: none;
  transition: border-color var(--duration-fast);
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2386868b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}
.form-select:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px rgba(93,196,179,0.1); }
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
