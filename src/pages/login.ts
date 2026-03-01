// ═══════════════════════════════════════════════════════
// 登录 / 注册页面 — 完全对齐 MC-Revolution v33
// Aurora深色背景 + 白色圆角卡片 + 双圆Logo + 角色选择
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
  <script src="https://cdn.tailwindcss.com"></script>
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

  <!-- ===== Auth Page (v33) ===== -->
  <div class="page active flex flex-col min-h-screen cyber-bg particles-bg">
    <div class="flex-1 flex items-center justify-center p-4 relative z-10">
      <!-- Language switch -->
      <a href="?lang=${otherLang}" class="login-lang-btn">${langLabel}</a>

      <!-- White card (v33 style) -->
      <div class="bg-white rounded-3xl max-w-md w-full overflow-hidden animate-scale-in" style="box-shadow: 0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08);">
        
        <!-- Logo区域 -->
        <div class="p-8 text-center" style="border-bottom: 1px solid rgba(0,0,0,0.06);">
          <div class="mx-auto mb-5 animate-float" style="width:52px; height:68px; position:relative;">
            <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, #2EC4B6 0%, #3DD8CA 100%); position:absolute; top:0; left:4px; box-shadow: 0 4px 16px rgba(46,196,182,0.35);"></div>
            <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, #28A696 0%, #2EC4B6 100%); position:absolute; bottom:0; left:4px; box-shadow: 0 4px 16px rgba(40,166,150,0.3); opacity:0.85;"></div>
          </div>
          <h1 style="font-family:'Montserrat',sans-serif; font-weight:900; font-size:22px; letter-spacing:0.04em; color:#1a1a1a; line-height:1.15; margin-bottom:6px;">ORIGINATE<br>CONNECT</h1>
          <div style="width:120px; height:2.5px; background:#2EC4B6; margin:8px auto 10px; border-radius:2px;"></div>
          <p style="font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:0.2em; color:#666; font-weight:500;">POWERED BY MICRO CONNECT GROUP</p>
          <p class="text-lg font-bold mt-3" style="color:#1a1a1a;">${tt(TEXT.appName, lang)}</p>
        </div>

        <!-- 登录/注册 Tab -->
        <div class="flex" style="border-bottom: 1px solid rgba(0,0,0,0.06);">
          <button onclick="switchAuthTab('login')" id="tabLogin" class="flex-1 py-3 text-center font-semibold" style="color:#2EC4B6; border-bottom: 2px solid #2EC4B6;">${tt(TEXT.login, lang)}</button>
          <button onclick="switchAuthTab('register')" id="tabRegister" class="flex-1 py-3 text-center font-semibold" style="color:#86868b;">${tt(TEXT.register, lang)}</button>
        </div>

        <!-- ===== 登录表单 ===== -->
        <div id="formLogin" class="p-6">
          <form onsubmit="event.preventDefault(); handleLogin();" autocomplete="on">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.emailOrUsername, lang)}</label>
              <input type="text" id="loginUsername" placeholder="${lang === 'zh' ? '请输入用户名或邮箱' : 'Enter username or email'}" autocomplete="username"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                onkeydown="if(event.key==='Enter')document.getElementById('loginPassword').focus()">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.password, lang)}</label>
              <div class="password-wrapper">
                <input type="password" id="loginPassword" placeholder="${lang === 'zh' ? '请输入密码' : 'Enter password'}" autocomplete="current-password"
                  class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                <button type="button" onclick="togglePasswordVisibility('loginPassword', this)" class="password-toggle" tabindex="-1">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center text-gray-600 cursor-pointer whitespace-nowrap">
                <input type="checkbox" id="rememberMe" class="mr-2 rounded" style="width:16px;height:16px;flex-shrink:0; accent-color: #2EC4B6;">
                <span>${tt(TEXT.rememberMe, lang)}</span>
              </label>
              <a href="#" class="text-teal-600 hover:text-teal-700">${tt(TEXT.forgotPassword, lang)}</a>
            </div>
            <button type="submit" id="loginBtn" class="w-full py-3 btn-primary rounded-xl font-medium shadow-lg">
              <i class="fas fa-sign-in-alt mr-2"></i>${tt(TEXT.login, lang)}
            </button>
            <button type="button" onclick="handleGuestLogin()" class="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
              <i class="fas fa-user-secret mr-2"></i>${lang === 'zh' ? '游客模式（体验功能）' : 'Guest Mode (Try Features)'}
            </button>
          </div>
          <p id="loginError" class="hidden mt-4 text-sm text-red-500 text-center"></p>
          </form>

          <!-- 企业SSO入口 -->
          <div class="mt-6 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-400 text-center mb-3">${lang === 'zh' ? '企业用户' : 'Enterprise'}</p>
            <button onclick="handleSSOLogin()" class="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center text-sm">
              <i class="fas fa-building mr-2"></i>${lang === 'zh' ? '公司SSO登录（即将上线）' : 'Company SSO Login (Coming Soon)'}
            </button>
          </div>
        </div>

        <!-- ===== 注册表单 ===== -->
        <div id="formRegister" class="hidden p-6">
          <form onsubmit="event.preventDefault(); handleRegister();" autocomplete="on">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">${lang === 'zh' ? '用户名' : 'Username'} <span class="text-red-500">*</span></label>
                <input type="text" id="regUsername" placeholder="${lang === 'zh' ? '用于登录' : 'For login'}" 
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.displayName, lang)}</label>
                <input type="text" id="regDisplayName" placeholder="${lang === 'zh' ? '显示名称' : 'Display name'}" 
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.email, lang)} <span class="text-red-500">*</span></label>
              <input type="email" id="regEmail" placeholder="your@email.com" 
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${lang === 'zh' ? '手机号' : 'Phone'}</label>
              <input type="tel" id="regPhone" placeholder="${lang === 'zh' ? '13800138000' : '+1 (555) 000-0000'}" 
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.password, lang)} <span class="text-red-500">*</span></label>
              <div class="password-wrapper">
                <input type="password" id="regPassword" placeholder="${lang === 'zh' ? '至少6位' : 'Min 6 chars'}" autocomplete="new-password"
                  class="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  onkeydown="if(event.key==='Enter')handleRegister()">
                <button type="button" onclick="togglePasswordVisibility('regPassword', this)" class="password-toggle" tabindex="-1">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${lang === 'zh' ? '默认角色' : 'Default Role'}</label>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" onclick="selectRegRole('investor')" id="regRoleInvestor" class="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-300 text-center transition-colors">
                  <i class="fas fa-landmark text-teal-500 block mb-1"></i>${lang === 'zh' ? '投资方' : 'Investor'}
                </button>
                <button type="button" onclick="selectRegRole('borrower')" id="regRoleBorrower" class="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-amber-300 text-center transition-colors">
                  <i class="fas fa-store text-amber-500 block mb-1"></i>${lang === 'zh' ? '融资方' : 'Borrower'}
                </button>
                <button type="button" onclick="selectRegRole('both')" id="regRoleBoth" class="py-2 px-3 border-2 rounded-lg text-sm text-center transition-colors" style="border-color:#2EC4B6; background:rgba(46,196,182,0.08);">
                  <i class="fas fa-exchange-alt text-cyan-500 block mb-1"></i>${lang === 'zh' ? '两者皆可' : 'Both'}
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">${tt(TEXT.company, lang)}</label>
                <input type="text" id="regCompany" placeholder="${lang === 'zh' ? '所属公司' : 'Your company'}" 
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">${lang === 'zh' ? '职位' : 'Title'}</label>
                <input type="text" id="regTitle" placeholder="${lang === 'zh' ? '您的职位' : 'Your title'}" 
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
              </div>
            </div>
            <button type="submit" id="registerBtn" class="w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-lg text-sm">
              <i class="fas fa-user-plus mr-2"></i>${tt(TEXT.register, lang)}
            </button>
          </div>
          <p id="registerError" class="hidden mt-4 text-sm text-red-500 text-center"></p>
          </form>
        </div>
      </div>
    </div>
    <p class="text-center text-sm pb-4 relative z-10" style="color: rgba(255,255,255,0.4);">${tt(TEXT.copyright, lang)}</p>
  </div>

  <script>
    const LANG = '${lang}';
    let selectedRegRole = 'both';

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

    // ---- Tab switching ----
    function switchAuthTab(tab) {
      var tabLogin = document.getElementById('tabLogin');
      var tabReg = document.getElementById('tabRegister');
      // Reset both
      tabLogin.className = 'flex-1 py-3 text-center font-semibold';
      tabReg.className = 'flex-1 py-3 text-center font-semibold';
      if (tab === 'login') {
        tabLogin.style.color = '#2EC4B6'; tabLogin.style.borderBottom = '2px solid #2EC4B6';
        tabReg.style.color = '#86868b'; tabReg.style.borderBottom = 'none';
        document.getElementById('formLogin').classList.remove('hidden');
        document.getElementById('formRegister').classList.add('hidden');
      } else {
        tabReg.style.color = '#2EC4B6'; tabReg.style.borderBottom = '2px solid #2EC4B6';
        tabLogin.style.color = '#86868b'; tabLogin.style.borderBottom = 'none';
        document.getElementById('formRegister').classList.remove('hidden');
        document.getElementById('formLogin').classList.add('hidden');
      }
    }

    // ---- Password toggle ----
    function togglePasswordVisibility(inputId, btn) {
      var input = document.getElementById(inputId);
      if (!input) return;
      var icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    }

    // ---- Role selector ----
    function selectRegRole(role) {
      selectedRegRole = role;
      ['investor', 'borrower', 'both'].forEach(function(r) {
        var btn = document.getElementById('regRole' + r.charAt(0).toUpperCase() + r.slice(1));
        if (btn) {
          if (r === role) {
            btn.style.borderColor = '#2EC4B6';
            btn.style.backgroundColor = 'rgba(46,196,182,0.08)';
          } else {
            btn.style.borderColor = '';
            btn.style.backgroundColor = '';
            btn.className = 'py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300 text-center transition-colors';
          }
        }
      });
    }

    // ---- Login handler ----
    function handleLogin() {
      var username = document.getElementById('loginUsername').value.trim();
      var password = document.getElementById('loginPassword').value;
      var errorEl = document.getElementById('loginError');
      var loginBtn = document.getElementById('loginBtn');

      if (!username || !password) {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>${lang === 'zh' ? '请输入用户名和密码' : 'Please enter username and password'}';
        errorEl.className = 'form-error mt-4';
        return;
      }

      if (loginBtn) { loginBtn.classList.add('btn-loading'); loginBtn.disabled = true; }

      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          localStorage.setItem('oc_token', data.token);
          localStorage.setItem('oc_user', JSON.stringify(data.user));
          errorEl.className = 'hidden';
          onLoginSuccess(data.user);
        } else {
          errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || '${lang === 'zh' ? '登录失败' : 'Login failed'}');
          errorEl.className = 'form-error mt-4';
          if (loginBtn) { loginBtn.classList.remove('btn-loading'); loginBtn.disabled = false; }
        }
      })
      .catch(function() {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>${lang === 'zh' ? '网络错误，请重试' : 'Network error, please retry'}';
        errorEl.className = 'form-error mt-4';
        if (loginBtn) { loginBtn.classList.remove('btn-loading'); loginBtn.disabled = false; }
      });
    }

    // ---- Register handler ----
    function handleRegister() {
      var username = document.getElementById('regUsername').value.trim();
      var email = document.getElementById('regEmail').value.trim();
      var password = document.getElementById('regPassword').value;
      var displayName = document.getElementById('regDisplayName').value.trim();
      var phone = document.getElementById('regPhone').value.trim();
      var company = document.getElementById('regCompany').value.trim();
      var title = document.getElementById('regTitle').value.trim();
      var errorEl = document.getElementById('registerError');
      var regBtn = document.getElementById('registerBtn');

      if (!username || !email || !password) {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>${lang === 'zh' ? '请填写必填项（用户名、邮箱、密码）' : 'Please fill required fields (username, email, password)'}';
        errorEl.className = 'form-error mt-4';
        return;
      }
      if (password.length < 6) {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>${lang === 'zh' ? '密码至少6位' : 'Password must be at least 6 characters'}';
        errorEl.className = 'form-error mt-4';
        return;
      }

      if (regBtn) { regBtn.classList.add('btn-loading'); regBtn.disabled = true; }

      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, email: email, password: password, displayName: displayName || username, phone: phone, company: company, title: title, defaultRole: selectedRegRole })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          localStorage.setItem('oc_token', data.token);
          localStorage.setItem('oc_user', JSON.stringify(data.user));
          errorEl.className = 'hidden';
          onLoginSuccess(data.user);
        } else {
          errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || '${lang === 'zh' ? '注册失败' : 'Registration failed'}');
          errorEl.className = 'form-error mt-4';
          if (regBtn) { regBtn.classList.remove('btn-loading'); regBtn.disabled = false; }
        }
      })
      .catch(function() {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>${lang === 'zh' ? '网络错误，请重试' : 'Network error, please retry'}';
        errorEl.className = 'form-error mt-4';
        if (regBtn) { regBtn.classList.remove('btn-loading'); regBtn.disabled = false; }
      });
    }

    // ---- Guest login ----
    function handleGuestLogin() {
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
      onLoginSuccess(guestUser);
    }

    // ---- SSO login placeholder ----
    function handleSSOLogin() {
      alert(LANG === 'zh' ? '企业SSO登录即将上线，敬请期待' : 'Enterprise SSO login coming soon');
    }

    // ---- On login success ----
    function onLoginSuccess(user) {
      var name = user.displayName || user.username || 'User';
      // Simple success toast
      showLoginToast(LANG === 'zh' ? '登录成功，欢迎 ' + name : 'Welcome, ' + name, 'success');
      setTimeout(function() {
        location.href = '/' + (LANG === 'en' ? '?lang=en' : '');
      }, 800);
    }

    // ---- Simple toast for login page ----
    function showLoginToast(msg, type) {
      var toast = document.createElement('div');
      toast.className = 'login-toast login-toast-' + type;
      toast.innerHTML = '<i class="fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-info-circle') + '"></i> ' + msg;
      document.body.appendChild(toast);
      setTimeout(function() {
        toast.classList.add('login-toast-exit');
        setTimeout(function() { toast.remove(); }, 300);
      }, 2500);
    }

    // ---- Auto redirect if already logged in ----
    (function() {
      var token = localStorage.getItem('oc_token');
      if (token) {
        location.href = '/' + (LANG === 'en' ? '?lang=en' : '');
      }
    })();
  </script>
</body>
</html>`
}

// ═══════════════════════════════════════════════════════
// Login CSS — v33 aligned
// ═══════════════════════════════════════════════════════
const loginCSS = `
/* ===== Splash (v33) ===== */
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
.loading-spinner {
  position: relative; z-index: 1; width: 48px; height: 48px;
  border: 2.5px solid rgba(255, 255, 255, 0.12); border-radius: 50%;
  border-top-color: white; animation: spin 0.7s linear infinite;
}
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

/* ===== Language button ===== */
.login-lang-btn {
  position: absolute; top: 24px; right: 28px; z-index: 10;
  padding: 6px 16px; border-radius: 9999px;
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.7); text-decoration: none;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  transition: all 0.28s cubic-bezier(0.28, 0.11, 0.32, 1);
}
.login-lang-btn:hover {
  color: #fff; border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
}

/* ===== Password wrapper ===== */
.password-wrapper { position: relative; }
.password-toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8; cursor: pointer;
  transition: all 0.15s;
  background: transparent; border: none; padding: 0;
}
.password-toggle:hover { color: #475569; background: #f1f5f9; }

/* ===== Form error (v33 shake) ===== */
.form-error {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px;
  background: #fef2f2; border: 1px solid #fecaca;
  border-radius: 12px; color: #dc2626; font-size: 13px;
  animation: shakeX 0.4s ease-in-out;
}
@keyframes shakeX {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

/* ===== Button loading (v33) ===== */
.btn-loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}
.btn-loading::after {
  content: '';
  position: absolute; width: 20px; height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%; border-top-color: white;
  animation: spin 0.7s linear infinite;
  left: 50%; top: 50%;
  margin-left: -10px; margin-top: -10px;
}

/* ===== btn-primary (v33 teal gradient) ===== */
.btn-primary {
  background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
  color: #fff; border: none; cursor: pointer;
  transition: all 0.28s cubic-bezier(0.28, 0.11, 0.32, 1);
}
.btn-primary:hover {
  filter: brightness(1.06);
  box-shadow: 0 8px 24px rgba(93,196,179,0.35);
  transform: translateY(-1px);
}

/* ===== Toast ===== */
.login-toast {
  position: fixed; top: 24px; right: 24px; z-index: 10000;
  padding: 14px 24px; border-radius: 12px;
  font-size: 14px; font-weight: 500;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  animation: toastIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.login-toast-success { background: rgba(52, 199, 89, 0.9); color: #fff; }
.login-toast-info { background: rgba(50, 173, 230, 0.9); color: #fff; }
.login-toast-exit { animation: toastOut 0.3s ease both; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-12px) scale(0.96); } }

/* ===== Animations ===== */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes spin { to { transform: rotate(360deg); } }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-scale-in { animation: scaleIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
`
