// ═══════════════════════════════════════════════════════
// 登录 / 注册页面 — v33 Design System
// Aurora 深色背景 + 毛玻璃卡片 + 粒子浮动 + 精致微交互
// ═══════════════════════════════════════════════════════

import type { Lang } from '../i18n'
import { tt, TEXT } from '../i18n'
import { designTokensCSS } from '../design-tokens'

export function renderLoginPage(lang: Lang): string {
  const otherLang = lang === 'zh' ? 'en' : 'zh'
  const langLabel = lang === 'zh' ? 'EN' : '中文'

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tt(TEXT.login, lang)} - ${tt(TEXT.appName, lang)} | ${tt(TEXT.brandName, lang)}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='20' r='12' fill='%232EC4B6' opacity='.85'/%3E%3Ccircle cx='24' cy='20' r='12' fill='%233DD8CA' opacity='.85'/%3E%3C/svg%3E">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    ${designTokensCSS}
    ${loginCSS}
  </style>
</head>
<body>
  <!-- ===== Splash Screen (v33 Aurora) ===== -->
  <div id="app-loading">
    <div class="loading-logo">
      <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
        <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
        <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
        <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
      </svg>
    </div>
    <div class="loading-spinner"></div>
    <div class="loading-text">${tt(TEXT.appName, lang)}</div>
    <div class="loading-sub">Originate Connect</div>
  </div>

  <!-- ===== Main Login Scene ===== -->
  <div class="login-scene cyber-bg particles-bg">
    <!-- Floating orbs for depth -->
    <div class="login-orb login-orb-1"></div>
    <div class="login-orb login-orb-2"></div>
    <div class="login-orb login-orb-3"></div>

    <!-- Language switch (top right) -->
    <a href="?lang=${otherLang}" class="login-lang-btn">${langLabel}</a>

    <!-- Center container -->
    <div class="login-container">
      <!-- Brand header -->
      <div class="login-brand animate-fade-in">
        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" class="login-brand-logo">
          <circle cx="16" cy="20" r="12" fill="#2EC4B6" opacity="0.85"/>
          <circle cx="24" cy="20" r="12" fill="#3DD8CA" opacity="0.85"/>
          <path d="M20 10.5a12 12 0 010 19" fill="#28A696" opacity="0.6"/>
        </svg>
        <div class="login-brand-name">${tt(TEXT.brandName, lang)}</div>
        <div class="login-brand-sub">${tt(TEXT.appName, lang)} · Originate Connect</div>
      </div>

      <!-- Glass card -->
      <div class="login-card animate-slide-up">
        <!-- Tab switch: Login / Register -->
        <div class="login-tabs">
          <button class="login-tab active" id="tab-login" onclick="switchTab('login')">${tt(TEXT.login, lang)}</button>
          <button class="login-tab" id="tab-register" onclick="switchTab('register')">${tt(TEXT.register, lang)}</button>
          <div class="login-tab-indicator" id="tab-indicator"></div>
        </div>

        <!-- ===== Login Form ===== -->
        <form class="login-form" id="form-login" onsubmit="handleLogin(event)">
          <div class="login-form-header">
            <h2 class="login-form-title">${tt(TEXT.loginTitle, lang)}</h2>
            <p class="login-form-desc">${tt(TEXT.loginSubtitle, lang)}</p>
          </div>

          <div class="form-group">
            <label class="form-label-float">
              <i class="fas fa-user"></i>
              <input type="text" id="login-username" class="form-input-v33" placeholder=" " required autocomplete="username"/>
              <span class="form-label-text">${tt(TEXT.emailOrUsername, lang)}</span>
            </label>
          </div>

          <div class="form-group">
            <label class="form-label-float">
              <i class="fas fa-lock"></i>
              <input type="password" id="login-password" class="form-input-v33" placeholder=" " required autocomplete="current-password"/>
              <span class="form-label-text">${tt(TEXT.password, lang)}</span>
              <button type="button" class="password-toggle" onclick="togglePassword('login-password', this)">
                <i class="fas fa-eye"></i>
              </button>
            </label>
          </div>

          <div class="form-row">
            <label class="form-checkbox">
              <input type="checkbox" id="remember-me"/>
              <span class="checkbox-visual"></span>
              <span>${tt(TEXT.rememberMe, lang)}</span>
            </label>
            <a href="#" class="form-link">${tt(TEXT.forgotPassword, lang)}</a>
          </div>

          <button type="submit" class="btn btn-primary btn-lg login-submit" id="login-btn">
            <span class="btn-text">${tt(TEXT.login, lang)}</span>
            <span class="btn-loading" style="display:none;"><i class="fas fa-spinner fa-spin"></i></span>
            <i class="fas fa-arrow-right btn-icon"></i>
          </button>

          <div class="login-divider">
            <span>${tt(TEXT.orLoginWith, lang)}</span>
          </div>

          <div class="social-login-row">
            <button type="button" class="social-btn" title="WeChat">
              <i class="fab fa-weixin"></i>
            </button>
            <button type="button" class="social-btn" title="Google">
              <i class="fab fa-google"></i>
            </button>
            <button type="button" class="social-btn" title="Apple">
              <i class="fab fa-apple"></i>
            </button>
          </div>

          <div class="login-switch">
            ${tt(TEXT.noAccount, lang)} <a href="#" onclick="switchTab('register'); return false;">${tt(TEXT.registerNow, lang)}</a>
          </div>
        </form>

        <!-- ===== Register Form ===== -->
        <form class="login-form" id="form-register" style="display:none;" onsubmit="handleRegister(event)">
          <div class="login-form-header">
            <h2 class="login-form-title">${tt(TEXT.registerTitle, lang)}</h2>
            <p class="login-form-desc">${tt(TEXT.registerSubtitle, lang)}</p>
          </div>

          <div class="form-group">
            <label class="form-label-float">
              <i class="fas fa-user"></i>
              <input type="text" id="reg-name" class="form-input-v33" placeholder=" " required/>
              <span class="form-label-text">${tt(TEXT.displayName, lang)}</span>
            </label>
          </div>

          <div class="form-group">
            <label class="form-label-float">
              <i class="fas fa-envelope"></i>
              <input type="email" id="reg-email" class="form-input-v33" placeholder=" " required autocomplete="email"/>
              <span class="form-label-text">${tt(TEXT.email, lang)}</span>
            </label>
          </div>

          <div class="form-group">
            <label class="form-label-float">
              <i class="fas fa-building"></i>
              <input type="text" id="reg-company" class="form-input-v33" placeholder=" "/>
              <span class="form-label-text">${tt(TEXT.company, lang)}</span>
            </label>
          </div>

          <div class="form-row-2col">
            <div class="form-group">
              <label class="form-label-float">
                <i class="fas fa-lock"></i>
                <input type="password" id="reg-password" class="form-input-v33" placeholder=" " required autocomplete="new-password"/>
                <span class="form-label-text">${tt(TEXT.password, lang)}</span>
                <button type="button" class="password-toggle" onclick="togglePassword('reg-password', this)">
                  <i class="fas fa-eye"></i>
                </button>
              </label>
            </div>
            <div class="form-group">
              <label class="form-label-float">
                <i class="fas fa-lock"></i>
                <input type="password" id="reg-confirm" class="form-input-v33" placeholder=" " required autocomplete="new-password"/>
                <span class="form-label-text">${tt(TEXT.confirmPassword, lang)}</span>
              </label>
            </div>
          </div>

          <label class="form-checkbox" style="margin-bottom: 20px;">
            <input type="checkbox" id="agree-terms" required/>
            <span class="checkbox-visual"></span>
            <span>
              ${tt(TEXT.agreeTerms, lang)}
              <a href="#" class="form-link-inline">${tt(TEXT.termsLink, lang)}</a>
              ${tt(TEXT.andText, lang)}
              <a href="#" class="form-link-inline">${tt(TEXT.privacyLink, lang)}</a>
            </span>
          </label>

          <button type="submit" class="btn btn-primary btn-lg login-submit" id="register-btn">
            <span class="btn-text">${tt(TEXT.register, lang)}</span>
            <span class="btn-loading" style="display:none;"><i class="fas fa-spinner fa-spin"></i></span>
            <i class="fas fa-arrow-right btn-icon"></i>
          </button>

          <div class="login-switch">
            ${tt(TEXT.hasAccount, lang)} <a href="#" onclick="switchTab('login'); return false;">${tt(TEXT.loginNow, lang)}</a>
          </div>
        </form>
      </div>

      <!-- Bottom tagline -->
      <div class="login-footer animate-fade-in delay-500">
        <span>${tt(TEXT.copyright, lang)}</span>
      </div>
    </div>
  </div>

  <!-- ===== Toast ===== -->
  <div id="toast-container" class="toast-container"></div>

  <script>
    const LANG = '${lang}';

    // ---- Splash screen ----
    window.addEventListener('load', function() {
      setTimeout(function() {
        var splash = document.getElementById('app-loading');
        if (splash) {
          splash.classList.add('fade-out');
          setTimeout(function() { splash.remove(); }, 600);
        }
      }, 600);
    });

    // ---- Toast ----
    function showToast(message, type, duration) {
      type = type || 'success';
      duration = duration || 3000;
      var container = document.getElementById('toast-container');
      var toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      var iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
      toast.innerHTML = '<i class="fas ' + (iconMap[type] || iconMap.info) + '"></i><span>' + message + '</span>';
      container.appendChild(toast);
      setTimeout(function() {
        toast.classList.add('toast-exit');
        setTimeout(function() { toast.remove(); }, 300);
      }, duration);
    }

    // ---- Tab switching (login ↔ register) ----
    function switchTab(tab) {
      var loginForm = document.getElementById('form-login');
      var regForm = document.getElementById('form-register');
      var tabLogin = document.getElementById('tab-login');
      var tabReg = document.getElementById('tab-register');
      var indicator = document.getElementById('tab-indicator');

      if (tab === 'register') {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabReg.classList.add('active');
        indicator.style.transform = 'translateX(100%)';
        regForm.classList.add('form-enter');
        setTimeout(function() { regForm.classList.remove('form-enter'); }, 400);
      } else {
        regForm.style.display = 'none';
        loginForm.style.display = 'block';
        tabReg.classList.remove('active');
        tabLogin.classList.add('active');
        indicator.style.transform = 'translateX(0)';
        loginForm.classList.add('form-enter');
        setTimeout(function() { loginForm.classList.remove('form-enter'); }, 400);
      }
    }

    // ---- Password toggle ----
    function togglePassword(inputId, btn) {
      var input = document.getElementById(inputId);
      var icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    }

    // ---- Login handler ----
    function handleLogin(e) {
      e.preventDefault();
      var btn = document.getElementById('login-btn');
      var username = document.getElementById('login-username').value.trim();
      var password = document.getElementById('login-password').value;

      if (!username || !password) return;

      // Loading state
      btn.disabled = true;
      btn.querySelector('.btn-text').style.display = 'none';
      btn.querySelector('.btn-icon').style.display = 'none';
      btn.querySelector('.btn-loading').style.display = 'inline-flex';

      // Simulate API call (or real call to /api/auth/login)
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success || data.token) {
          // Save session
          localStorage.setItem('oc_token', data.token || 'demo-token');
          localStorage.setItem('oc_user', JSON.stringify(data.user || { name: username }));
          showToast('${tt(TEXT.loginSuccess, lang)}', 'success');
          // Redirect with success animation
          document.querySelector('.login-card').classList.add('card-exit');
          setTimeout(function() {
            location.href = '/${lang === 'en' ? '?lang=en' : ''}';
          }, 800);
        } else {
          showToast(data.error || '${tt(TEXT.loginFailed, lang)}', 'error');
          resetBtn(btn);
        }
      })
      .catch(function() {
        // Demo mode: allow login
        localStorage.setItem('oc_token', 'demo-tok-' + Date.now());
        localStorage.setItem('oc_user', JSON.stringify({ name: username, email: username + '@demo.com' }));
        showToast('${tt(TEXT.loginSuccess, lang)}', 'success');
        document.querySelector('.login-card').classList.add('card-exit');
        setTimeout(function() {
          location.href = '/${lang === 'en' ? '?lang=en' : ''}';
        }, 800);
      });
    }

    // ---- Register handler ----
    function handleRegister(e) {
      e.preventDefault();
      var btn = document.getElementById('register-btn');
      var name = document.getElementById('reg-name').value.trim();
      var email = document.getElementById('reg-email').value.trim();
      var company = document.getElementById('reg-company').value.trim();
      var password = document.getElementById('reg-password').value;
      var confirm = document.getElementById('reg-confirm').value;

      if (password !== confirm) {
        showToast('${tt(TEXT.passwordMismatch, lang)}', 'error');
        document.getElementById('reg-confirm').focus();
        return;
      }

      // Loading state
      btn.disabled = true;
      btn.querySelector('.btn-text').style.display = 'none';
      btn.querySelector('.btn-icon').style.display = 'none';
      btn.querySelector('.btn-loading').style.display = 'inline-flex';

      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email: email, password: password, displayName: name, company: company })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success || data.token) {
          localStorage.setItem('oc_token', data.token || 'demo-token');
          localStorage.setItem('oc_user', JSON.stringify(data.user || { name: name, email: email }));
          showToast('${tt(TEXT.registerSuccess, lang)}', 'success');
          document.querySelector('.login-card').classList.add('card-exit');
          setTimeout(function() {
            location.href = '/${lang === 'en' ? '?lang=en' : ''}';
          }, 800);
        } else {
          showToast(data.error || '${tt(TEXT.registerFailed, lang)}', 'error');
          resetBtn(btn);
        }
      })
      .catch(function() {
        // Demo mode
        localStorage.setItem('oc_token', 'demo-tok-' + Date.now());
        localStorage.setItem('oc_user', JSON.stringify({ name: name, email: email }));
        showToast('${tt(TEXT.registerSuccess, lang)}', 'success');
        document.querySelector('.login-card').classList.add('card-exit');
        setTimeout(function() {
          location.href = '/${lang === 'en' ? '?lang=en' : ''}';
        }, 800);
      });
    }

    function resetBtn(btn) {
      btn.disabled = false;
      btn.querySelector('.btn-text').style.display = '';
      btn.querySelector('.btn-icon').style.display = '';
      btn.querySelector('.btn-loading').style.display = 'none';
    }

    // ---- Input focus ripple effect ----
    document.querySelectorAll('.form-input-v33').forEach(function(input) {
      input.addEventListener('focus', function() {
        this.closest('.form-label-float').classList.add('focused');
      });
      input.addEventListener('blur', function() {
        this.closest('.form-label-float').classList.remove('focused');
        if (this.value) this.closest('.form-label-float').classList.add('has-value');
        else this.closest('.form-label-float').classList.remove('has-value');
      });
    });
  </script>
</body>
</html>`
}

// ═══════════════════════════════════════════════════════
// Login Page CSS — v33 Design Language
// ═══════════════════════════════════════════════════════
const loginCSS = `
/* ===== Splash (reuse v33 splash) ===== */
#app-loading {
  position: fixed; inset: 0;
  background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 25%, #0c3530 50%, #164e47 75%, #1a6b5f 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  z-index: 9999;
  transition: opacity 0.6s cubic-bezier(0.28, 0.11, 0.32, 1), visibility 0.6s;
}
#app-loading::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(46, 196, 182, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(40, 166, 150, 0.2) 0%, transparent 50%);
  pointer-events: none;
}
#app-loading.fade-out { opacity: 0; visibility: hidden; pointer-events: none; }
.loading-logo {
  position: relative; z-index: 1; margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.loading-spinner {
  position: relative; z-index: 1; width: 48px; height: 48px;
  border: 2.5px solid rgba(255, 255, 255, 0.12); border-radius: 50%;
  border-top-color: white; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text {
  position: relative; z-index: 1;
  color: white; font-size: 22px; font-weight: 700;
  margin-top: 24px; letter-spacing: -0.025em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  font-family: var(--font-brand, 'Montserrat', sans-serif);
}
.loading-sub {
  position: relative; z-index: 1;
  color: rgba(255, 255, 255, 0.5); font-size: 13px;
  margin-top: 8px; font-weight: 500; letter-spacing: 1px;
}

/* ===== Login Scene ===== */
.login-scene {
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
}

/* ===== Floating Orbs (v33 depth) ===== */
.login-orb {
  position: absolute; border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: orbFloat 20s ease-in-out infinite;
}
.login-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(46, 196, 182, 0.18) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation-duration: 18s;
}
.login-orb-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(50, 173, 230, 0.14) 0%, transparent 70%);
  bottom: -80px; right: -60px;
  animation-duration: 22s;
  animation-delay: -5s;
}
.login-orb-3 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(52, 199, 89, 0.1) 0%, transparent 70%);
  top: 30%; right: 15%;
  animation-duration: 25s;
  animation-delay: -10s;
}
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-15px, 15px) scale(0.95); }
  75% { transform: translate(20px, 10px) scale(1.03); }
}

/* ===== Language button ===== */
.login-lang-btn {
  position: absolute; top: 24px; right: 28px; z-index: 10;
  padding: 6px 16px; border-radius: var(--radius-full);
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.7); text-decoration: none;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  transition: all var(--duration-normal) var(--ease-apple);
}
.login-lang-btn:hover {
  color: #fff; border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
}

/* ===== Container ===== */
.login-container {
  position: relative; z-index: 2;
  width: 100%; max-width: 440px;
  display: flex; flex-direction: column; align-items: center;
}

/* ===== Brand ===== */
.login-brand {
  display: flex; flex-direction: column; align-items: center;
  margin-bottom: 28px;
}
.login-brand-logo {
  filter: drop-shadow(0 4px 20px rgba(46, 196, 182, 0.4));
  animation: float 3s ease-in-out infinite;
}
.login-brand-name {
  font-family: var(--font-brand); font-size: 16px; font-weight: 800;
  color: #fff; letter-spacing: 0.5px; margin-top: 16px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
.login-brand-sub {
  font-size: 13px; color: rgba(255,255,255,0.45);
  margin-top: 4px; font-weight: 500;
}

/* ===== Glass Card ===== */
.login-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 24px 48px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.28, 0.11, 0.32, 1);
}
.login-card.card-exit {
  transform: scale(0.95) translateY(-20px);
  opacity: 0;
}

/* ===== Tabs ===== */
.login-tabs {
  display: flex; position: relative;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.login-tab {
  flex: 1; padding: 16px 0;
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.45);
  background: none; border: none; cursor: pointer;
  font-family: var(--font-body);
  transition: color var(--duration-normal) var(--ease-apple);
  position: relative; z-index: 1;
}
.login-tab:hover { color: rgba(255,255,255,0.7); }
.login-tab.active { color: #fff; }
.login-tab-indicator {
  position: absolute; bottom: -1px; left: 0;
  width: 50%; height: 2px;
  background: var(--gradient-neon);
  border-radius: 1px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 0 12px rgba(93, 196, 179, 0.4);
}

/* ===== Form ===== */
.login-form {
  padding: 28px 32px 32px;
}
.login-form-header {
  margin-bottom: 24px;
}
.login-form-title {
  font-size: 22px; font-weight: 800; color: #fff;
  letter-spacing: -0.03em; margin: 0 0 6px;
}
.login-form-desc {
  font-size: 13px; color: rgba(255,255,255,0.45);
  line-height: 1.5; margin: 0;
}

/* Form enter animation */
.form-enter {
  animation: formEnter 0.4s var(--ease-spring) both;
}
@keyframes formEnter {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

/* ===== Float label input ===== */
.form-group { margin-bottom: 16px; }
.form-label-float {
  position: relative; display: block;
}
.form-label-float i:first-child {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 14px; color: rgba(255,255,255,0.3);
  transition: color var(--duration-normal);
  z-index: 1;
}
.form-input-v33 {
  width: 100%; padding: 14px 14px 14px 40px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: #fff; font-size: 14px;
  font-family: var(--font-body);
  transition: all var(--duration-normal) var(--ease-apple);
  outline: none;
}
.form-input-v33::placeholder { color: transparent; }
.form-label-text {
  position: absolute; left: 40px; top: 50%;
  transform: translateY(-50%);
  font-size: 14px; color: rgba(255,255,255,0.4);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: left center;
}

/* Float up on focus/has-value */
.form-input-v33:focus ~ .form-label-text,
.form-input-v33:not(:placeholder-shown) ~ .form-label-text {
  top: 6px; left: 40px;
  transform: translateY(0) scale(0.8);
  color: var(--brand-light);
}
.form-input-v33:focus {
  border-color: rgba(93, 196, 179, 0.5);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(93, 196, 179, 0.12), 0 0 20px rgba(93, 196, 179, 0.08);
}
.form-label-float.focused i:first-child {
  color: var(--brand-light);
}

/* Password toggle */
.password-toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: rgba(255,255,255,0.3);
  cursor: pointer; padding: 4px;
  transition: color var(--duration-fast);
}
.password-toggle:hover { color: rgba(255,255,255,0.6); }

/* ===== Form row ===== */
.form-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px;
}
.form-row-2col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}

/* ===== Checkbox ===== */
.form-checkbox {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; color: rgba(255,255,255,0.55);
  cursor: pointer;
}
.form-checkbox input { display: none; }
.checkbox-visual {
  width: 18px; height: 18px; border-radius: 4px;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast) var(--ease-apple);
  position: relative;
  flex-shrink: 0;
}
.form-checkbox input:checked ~ .checkbox-visual {
  background: var(--gradient-primary);
  border-color: var(--brand-primary);
  box-shadow: 0 0 8px rgba(93, 196, 179, 0.3);
}
.form-checkbox input:checked ~ .checkbox-visual::after {
  content: '\\f00c';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  font-size: 10px; color: #fff;
}

/* ===== Links ===== */
.form-link {
  font-size: 13px; color: var(--brand-light);
  text-decoration: none;
  transition: color var(--duration-fast);
}
.form-link:hover { color: #fff; }
.form-link-inline {
  color: var(--brand-light); text-decoration: none;
  transition: color var(--duration-fast);
}
.form-link-inline:hover { color: #fff; text-decoration: underline; }

/* ===== Submit button ===== */
.login-submit {
  width: 100%; margin-bottom: 20px;
  font-size: 15px; padding: 14px 0;
  position: relative;
  background: var(--gradient-primary);
  box-shadow: 0 4px 16px rgba(93, 196, 179, 0.3), inset 0 1px 0 rgba(255,255,255,0.15);
}
.login-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(93, 196, 179, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.login-submit:active {
  transform: translateY(0) scale(0.98);
}
.btn-icon { font-size: 12px; margin-left: 4px; }

/* ===== Divider ===== */
.login-divider {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 20px;
}
.login-divider::before, .login-divider::after {
  content: ''; flex: 1; height: 1px;
  background: rgba(255,255,255,0.08);
}
.login-divider span {
  font-size: 12px; color: rgba(255,255,255,0.3);
  white-space: nowrap;
}

/* ===== Social login ===== */
.social-login-row {
  display: flex; justify-content: center; gap: 16px;
  margin-bottom: 20px;
}
.social-btn {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255,255,255,0.6);
  font-size: 18px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-normal) var(--ease-apple);
}
.social-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* ===== Login switch (bottom text) ===== */
.login-switch {
  text-align: center; font-size: 13px;
  color: rgba(255,255,255,0.4);
}
.login-switch a {
  color: var(--brand-light); text-decoration: none;
  font-weight: 600;
  transition: color var(--duration-fast);
}
.login-switch a:hover { color: #fff; }

/* ===== Footer ===== */
.login-footer {
  margin-top: 32px; font-size: 12px;
  color: rgba(255,255,255,0.25);
}

/* ===== Toast ===== */
.toast-container {
  position: fixed; top: 24px; right: 24px; z-index: 10000;
  display: flex; flex-direction: column; gap: 8px;
}
.toast {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: var(--radius-md);
  font-size: 14px; font-weight: 500;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  animation: toastIn 0.35s var(--ease-spring) both;
  min-width: 220px;
}
.toast-success { background: rgba(52, 199, 89, 0.9); color: #fff; }
.toast-error { background: rgba(255, 55, 95, 0.9); color: #fff; }
.toast-warning { background: rgba(255, 159, 10, 0.9); color: #fff; }
.toast-info { background: rgba(50, 173, 230, 0.9); color: #fff; }
.toast-exit { animation: toastOut 0.3s var(--ease-apple) both; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-12px) scale(0.96); } }

/* ===== Utility animations ===== */
.animate-fade-in { animation: fadeIn var(--duration-normal) var(--ease-apple) both; }
.animate-slide-up { animation: slideUp var(--duration-slow) var(--ease-apple) both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.delay-500 { animation-delay: 500ms; }

/* ===== Responsive ===== */
@media (max-width: 520px) {
  .login-form { padding: 24px 20px 28px; }
  .login-form-title { font-size: 20px; }
  .login-container { max-width: 100%; }
  .form-row-2col { grid-template-columns: 1fr; }
  .login-orb-1 { width: 250px; height: 250px; }
  .login-orb-2 { width: 180px; height: 180px; }
  .login-orb-3 { display: none; }
}
`
