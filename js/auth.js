function getCurrentUser() {
   const session = getStore(LS.SESSION, null);
   if (!session) return null;
   const users = getStore(LS.USERS, []);
   return users.find(u => u.email === session.email) || null;
}
function isLoggedIn() { return !!getCurrentUser(); }

function setSession(email, remember) {
   setStore(LS.SESSION, { email, remember, loginAt: Date.now() });
}
function clearSession() { localStorage.removeItem(LS.SESSION); }

function seedDemoUser() {
   const users = getStore(LS.USERS, []);
   if (!users.find(u => u.email === 'demo@foodio.com')) {
      users.push({
         name: 'Demo User',
         email: 'demo@foodio.com',
         password: '123456',
         phone: '0901 234 567',
         address: '123 Nguyen Hue, District 1, Ho Chi Minh City',
         addresses: [
            { id: 'ADDR00000001', name: 'Demo User', phone: '0901 234 567', address: '123 Nguyen Hue, District 1, Ho Chi Minh City' },
         ],
         joined: '2024',
      });
      setStore(LS.USERS, users);
   }
}
seedDemoUser();

function getUserAddresses() {
   const user = getCurrentUser();
   return user && Array.isArray(user.addresses) ? user.addresses : [];
}

function saveUserAddress({ name, phone, address, lat, lng }) {
   const user = getCurrentUser();
   if (!user) return null;
   const users = getStore(LS.USERS, []);
   const idx = users.findIndex(u => u.email === user.email);
   if (idx === -1) return null;
   if (!Array.isArray(users[idx].addresses)) users[idx].addresses = [];

   const dup = users[idx].addresses.find(a => a.name === name && a.phone === phone && a.address === address);
   if (dup) {
      if (lat != null && lng != null) { dup.lat = lat; dup.lng = lng; }
      setStore(LS.USERS, users);
      return dup;
   }

   const newAddr = { id: 'ADDR' + Date.now().toString().slice(-8), name, phone, address };
   if (lat != null && lng != null) { newAddr.lat = lat; newAddr.lng = lng; }
   users[idx].addresses.push(newAddr);
   setStore(LS.USERS, users);
   return newAddr;
}

function registerUser({ name, email, password, phone }) {
   const users = getStore(LS.USERS, []);
   if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'Email này đã được đăng ký. Vui lòng đăng nhập.' };
   }
   users.push({ name, email, password, phone: phone || '', address: '', joined: new Date().getFullYear().toString() });
   setStore(LS.USERS, users);
   setSession(email, true);
   return { ok: true };
}

function loginUser(email, password, remember) {
   const users = getStore(LS.USERS, []);
   const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
   if (!user) return { ok: false, message: 'Không tìm thấy tài khoản với email này.' };
   if (user.password !== password) return { ok: false, message: 'Sai mật khẩu. Vui lòng thử lại.' };
   setSession(email, remember);
   return { ok: true };
}

function logoutUser() {
   clearSession();
   showToast('Bạn đã đăng xuất.', 'default');
   setTimeout(() => { window.location.href = 'index.html'; }, 600);
}

function renderAuthHeader() {
   const authSlot = document.getElementById('auth-slot');
   if (!authSlot) return;
   const user = getCurrentUser();

   if (!user) {
      const page = window.location.pathname.split('/').pop();
      const onAuthPage = page === 'login.html' || page === 'register.html';
      const showLogin = !onAuthPage;
      const showRegister = !onAuthPage;
      authSlot.innerHTML = `
         <div class="auth-links">
            ${showLogin ? '<a href="login.html" class="btn btn-outline btn-sm">Đăng nhập</a>' : ''}
            ${showRegister ? '<a href="register.html" class="btn btn-primary btn-sm">Đăng ký</a>' : ''}
         </div>`;
      return;
   }

   const initials = user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
   authSlot.innerHTML = `
    <div class="user-menu" id="user-menu">
      <button class="user-chip" id="user-chip-btn">
        <span class="avatar">${initials}</span>
        <span>Xin chào, ${user.name.split(' ')[0]}</span>
      </button>
      <div class="user-dropdown">
        <a href="profile.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Hồ sơ của tôi</a>
        <a href="orders.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg> Đơn hàng của tôi</a>
        <a href="profile.html#wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.5-10-9.5C.5 6.5 3 3 6.5 3c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 3 23.5 6.5 22 11.5 19.5 16.5 12 21 12 21z"/></svg> Yêu thích</a>
        <hr>
        <button id="logout-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg> Đăng xuất</button>
      </div>
    </div>`;

   document.getElementById('user-chip-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('user-menu').classList.toggle('open');
   });
   document.getElementById('logout-btn').addEventListener('click', logoutUser);
   document.addEventListener('click', () => {
      const um = document.getElementById('user-menu');
      if (um) um.classList.remove('open');
   });
}

function ensureLoginModal() {
   if (document.getElementById('login-required-modal')) return;
   const div = document.createElement('div');
   div.id = 'login-required-modal';
   div.className = 'modal-overlay';
   div.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" id="close-login-modal" aria-label="Close">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h3>Yêu Cầu Đăng Nhập</h3>
      <p>Bạn cần đăng nhập để tiếp tục thao tác này.</p>
      <div class="modal-actions">
        <a href="login.html" class="btn btn-primary btn-block">Đăng nhập</a>
        <a href="register.html" class="btn btn-outline btn-block">Đăng ký</a>
        <button class="link-btn" id="continue-browsing">Tiếp tục xem</button>
      </div>
    </div>`;
   document.body.appendChild(div);
   document.getElementById('close-login-modal').addEventListener('click', hideLoginModal);
   document.getElementById('continue-browsing').addEventListener('click', hideLoginModal);
   div.addEventListener('click', (e) => { if (e.target === div) hideLoginModal(); });
}
function showLoginModal() {
   ensureLoginModal();
  
   sessionStorage.setItem('foodio_after_login', window.location.pathname + window.location.search);
   document.getElementById('login-required-modal').classList.add('show');
   document.body.style.overflow = 'hidden';
}
function hideLoginModal() {
   const modal = document.getElementById('login-required-modal');
   if (modal) modal.classList.remove('show');
   document.body.style.overflow = '';
}
function requireAuth() {
   if (isLoggedIn()) return true;
   showLoginModal();
   return false;
}

function guardPage() {
   if (!isLoggedIn()) {
      sessionStorage.setItem('foodio_redirect_msg', '1');
      window.location.href = 'login.html';
   }
}

function initForgotPasswordModal() {
   const openLink = document.getElementById('open-forgot-modal');
   const modal = document.getElementById('forgot-password-modal');
   if (!openLink || !modal) return;

   const closeBtn = document.getElementById('close-forgot-modal');
   const form = document.getElementById('forgot-password-form');

   function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   openLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
   });
   closeBtn.addEventListener('click', closeModal);
   modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('fp-email');
      const newEl = document.getElementById('fp-new');
      const confirmEl = document.getElementById('fp-confirm');
      let valid = true;

      const users = getStore(LS.USERS, []);
      const user = users.find(u => u.email.toLowerCase() === emailEl.value.trim().toLowerCase());
      if (!user) {
         setFieldState(emailEl.closest('.field'), false, 'Không tìm thấy tài khoản với email này.');
         valid = false;
      } else setFieldState(emailEl.closest('.field'), true);

      if (newEl.value.length < 6) {
         setFieldState(newEl.closest('.field'), false, 'Mật khẩu mới phải có ít nhất 6 ký tự.');
         valid = false;
      } else setFieldState(newEl.closest('.field'), true);

      if (confirmEl.value !== newEl.value || !confirmEl.value) {
         setFieldState(confirmEl.closest('.field'), false, 'Mật khẩu xác nhận không khớp.');
         valid = false;
      } else setFieldState(confirmEl.closest('.field'), true);

      if (!valid) return;

      user.password = newEl.value;
      setStore(LS.USERS, users);
      showToast('Đặt lại mật khẩu thành công! Hãy đăng nhập lại.', 'success');
      form.reset();
      closeModal();

      const loginEmail = document.getElementById('login-email');
      if (loginEmail) loginEmail.value = user.email;
   });
}

document.addEventListener('DOMContentLoaded', () => {
   renderAuthHeader();
   initForgotPasswordModal();
});
