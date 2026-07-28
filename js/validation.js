/* =========================================================
   FOODIO — validation.js
   Client-side validation for register, login, checkout and
   newsletter forms. No backend — everything is simulated.
   ========================================================= */

function setFieldState(fieldEl, valid, message) {
   fieldEl.classList.toggle('invalid', !valid);
   fieldEl.classList.toggle('valid', valid);
   const err = fieldEl.querySelector('.error-msg');
   if (err && message) err.textContent = message;
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^[0-9+\s()-]{8,15}$/.test(v);

/* ---------------------------------------------------------
   REGISTER FORM
   --------------------------------------------------------- */
function initRegisterForm() {
   const form = document.getElementById('register-form');
   if (!form) return;

   const passInput = document.getElementById('reg-password');
   passInput?.addEventListener('input', () => {
      const val = passInput.value;
      const bars = document.querySelectorAll('#pass-strength span');
      let score = 0;
      if (val.length >= 6) score++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
      if (val.length >= 10 && /[^A-Za-z0-9]/.test(val)) score++;
      bars.forEach((b, i) => {
         b.className = '';
         if (i < score) b.className = score === 1 ? 'on-weak' : score === 2 ? 'on-mid' : 'on-strong';
      });
   });

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('reg-name');
      if (name.value.trim().length < 2) { setFieldState(name.closest('.field'), false, 'Vui lòng nhập họ và tên.'); valid = false; }
      else setFieldState(name.closest('.field'), true);

      const email = document.getElementById('reg-email');
      if (!isValidEmail(email.value)) { setFieldState(email.closest('.field'), false, 'Vui lòng nhập email hợp lệ.'); valid = false; }
      else setFieldState(email.closest('.field'), true);

      const phone = document.getElementById('reg-phone');
      if (phone.value && !isValidPhone(phone.value)) { setFieldState(phone.closest('.field'), false, 'Vui lòng nhập số điện thoại hợp lệ.'); valid = false; }
      else setFieldState(phone.closest('.field'), true);

      const password = document.getElementById('reg-password');
      if (password.value.length < 6) { setFieldState(password.closest('.field'), false, 'Mật khẩu phải có ít nhất 6 ký tự.'); valid = false; }
      else setFieldState(password.closest('.field'), true);

      const confirm = document.getElementById('reg-confirm');
      if (confirm.value !== password.value || !confirm.value) { setFieldState(confirm.closest('.field'), false, 'Mật khẩu xác nhận không khớp.'); valid = false; }
      else setFieldState(confirm.closest('.field'), true);

      const terms = document.getElementById('reg-terms');
      if (!terms.checked) { showToast('Vui lòng đồng ý với Điều khoản dịch vụ.', 'error'); valid = false; }

      if (!valid) return;

      const result = registerUser({ name: name.value.trim(), email: email.value.trim(), password: password.value, phone: phone.value.trim() });
      if (!result.ok) { showToast(result.message, 'error'); return; }
      showToast('Tạo tài khoản thành công! Chào mừng bạn đến với Foodio 🎉', 'success');

      // Nếu trước đó bấm "Thêm vào giỏ" lúc chưa đăng nhập -> thêm lại món đó vào giỏ ngay bây giờ
      const pending = typeof consumePendingCartAction === 'function' ? consumePendingCartAction() : null;
      if (pending && typeof addToCart === 'function') {
         addToCart(pending.foodId, pending.qty, pending.selectedOptions || []);
      }

      const redirect = sessionStorage.getItem('foodio_after_login') || 'index.html';
      sessionStorage.removeItem('foodio_after_login');
      setTimeout(() => { window.location.href = redirect; }, 900);
   });
}

/* ---------------------------------------------------------
   LOGIN FORM
   --------------------------------------------------------- */
function initLoginForm() {
   const form = document.getElementById('login-form');
   if (!form) return;

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');
      const remember = document.getElementById('login-remember');
      let valid = true;

      if (!isValidEmail(email.value)) { setFieldState(email.closest('.field'), false, 'Vui lòng nhập email hợp lệ.'); valid = false; }
      else setFieldState(email.closest('.field'), true);

      if (!password.value) { setFieldState(password.closest('.field'), false, 'Vui lòng nhập mật khẩu.'); valid = false; }
      else setFieldState(password.closest('.field'), true);

      if (!valid) return;

      const result = loginUser(email.value.trim(), password.value, remember?.checked);
      if (!result.ok) { showToast(result.message, 'error'); return; }
      showToast('Chào mừng bạn quay lại! Đang chuyển hướng...', 'success');

      // Nếu trước đó bấm "Thêm vào giỏ" lúc chưa đăng nhập -> thêm lại món đó vào giỏ ngay bây giờ
      const pending = typeof consumePendingCartAction === 'function' ? consumePendingCartAction() : null;
      if (pending && typeof addToCart === 'function') {
         addToCart(pending.foodId, pending.qty, pending.selectedOptions || []);
      }

      const redirect = sessionStorage.getItem('foodio_after_login') || 'index.html';
      sessionStorage.removeItem('foodio_after_login');
      setTimeout(() => { window.location.href = redirect; }, 700);
   });
}

/* ---------------------------------------------------------
   PASSWORD SHOW/HIDE TOGGLE (login + register)
   --------------------------------------------------------- */
function initPassToggles() {
   document.querySelectorAll('.pass-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
         const input = btn.parentElement.querySelector('input');
         input.type = input.type === 'password' ? 'text' : 'password';
      });
   });
}
/* ---------------------------------------------------------
   CHECKOUT FORM — chọn địa chỉ đã lưu hoặc thêm địa chỉ mới
   Chỉ cần Họ tên, SĐT, Địa chỉ (không còn Thành phố riêng) +
   Ghi chú. Địa chỉ mới nhập sẽ được lưu lại cho lần đặt sau.
   --------------------------------------------------------- */
let ckSelectedAddressId = null; // null = đang dùng form nhập địa chỉ mới

function renderCheckoutAddressList() {
   const wrap = document.getElementById('ck-address-list');
   const newForm = document.getElementById('ck-new-address-form');
   if (!wrap || !newForm) return;

   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   if (!user) {
      // Khách chưa đăng nhập -> không có gì để chọn, chỉ hiện form nhập tay
      wrap.style.display = 'none';
      newForm.style.display = 'block';
      ckSelectedAddressId = null;
      return;
   }

   const addresses = typeof getUserAddresses === 'function' ? getUserAddresses() : [];

   wrap.style.display = 'flex';
   wrap.innerHTML = addresses.map(a => `
      <label class="payment-opt">
         <input type="radio" name="ck-address-choice" value="${a.id}">
         <span class="p-icon">📍</span>
         <span><b>${a.name} · ${a.phone}</b><span>${a.address}</span></span>
      </label>`).join('') + `
      <label class="payment-opt">
         <input type="radio" name="ck-address-choice" value="new">
         <span class="p-icon">➕</span>
         <span><b>Thêm địa chỉ mới</b><span>Nhập và lưu địa chỉ giao hàng khác</span></span>
      </label>`;

   wrap.querySelectorAll('input[name="ck-address-choice"]').forEach(input => {
      input.addEventListener('change', () => applyCheckoutAddressChoice(input.value, addresses));
   });

   // Mặc định: có địa chỉ đã lưu -> chọn cái đầu tiên; chưa có -> chọn "Thêm địa chỉ mới"
   const first = wrap.querySelector('input[name="ck-address-choice"]');
   if (first) {
      first.checked = true;
      applyCheckoutAddressChoice(first.value, addresses);
   }
}

function applyCheckoutAddressChoice(value, addresses) {
   const newForm = document.getElementById('ck-new-address-form');
   const nameEl = document.getElementById('ck-fullname');
   const phoneEl = document.getElementById('ck-phone');
   const addressEl = document.getElementById('ck-address');

   if (value === 'new') {
      ckSelectedAddressId = null;
      newForm.style.display = 'block';
      const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      nameEl.value = user?.name || '';
      phoneEl.value = user?.phone || '';
      addressEl.value = '';
      if (typeof resetCkMapField === 'function') resetCkMapField();
      [nameEl, phoneEl, addressEl].forEach(el => el.closest('.field').classList.remove('valid', 'invalid'));
      nameEl.focus();
      return;
   }

   ckSelectedAddressId = value;
   newForm.style.display = 'none';
   if (typeof resetCkMapField === 'function') resetCkMapField();
   const addr = addresses.find(a => a.id === value);
   if (addr) {
      nameEl.value = addr.name;
      phoneEl.value = addr.phone;
      addressEl.value = addr.address;
      [nameEl, phoneEl, addressEl].forEach(el => setFieldState(el.closest('.field'), true));
   }
}

function initCheckoutSaveAddressButton() {
   const btn = document.getElementById('ck-save-address-btn');
   if (!btn) return;

   btn.addEventListener('click', () => {
      const nameEl = document.getElementById('ck-fullname');
      const phoneEl = document.getElementById('ck-phone');
      const addressEl = document.getElementById('ck-address');
      const mapField = document.getElementById('ck-map-field');

      let valid = true;
      const messages = {
         'ck-fullname': 'Vui lòng nhập họ tên.',
         'ck-phone': 'Vui lòng nhập số điện thoại.',
         'ck-address': 'Vui lòng nhập địa chỉ.',
      };
      [nameEl, phoneEl, addressEl].forEach(el => {
         if (!el.value.trim()) { setFieldState(el.closest('.field'), false, messages[el.id]); valid = false; }
         else setFieldState(el.closest('.field'), true);
      });
      if (phoneEl.value && !isValidPhone(phoneEl.value)) {
         setFieldState(phoneEl.closest('.field'), false, 'Vui lòng nhập số điện thoại hợp lệ.');
         valid = false;
      }
      if (!window.ckSelectedLatLng) {
         mapField?.classList.add('invalid');
         valid = false;
      } else {
         mapField?.classList.remove('invalid');
      }

      if (!valid) { showToast('Vui lòng điền đầy đủ thông tin địa chỉ.', 'error'); return; }
      if (typeof saveUserAddress !== 'function') return;

      const coords = window.ckSelectedLatLng;
      const saved = saveUserAddress({
         name: nameEl.value.trim(),
         phone: phoneEl.value.trim(),
         address: addressEl.value.trim(),
         lat: coords?.lat,
         lng: coords?.lng,
      });
      window.ckSelectedLatLng = null;

      showToast('Đã lưu địa chỉ mới!', 'success');
      renderCheckoutAddressList();

      if (saved) {
         const radio = document.querySelector(`input[name="ck-address-choice"][value="${saved.id}"]`);
         if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
         }
      }
   });
}
/* ---------------------------------------------------------
   CHECKOUT FORM
   --------------------------------------------------------- */
function initCheckoutForm() {
   const form = document.getElementById('checkout-form');
   if (!form) return;
   renderCheckoutAddressList();
   initCheckoutSaveAddressButton();

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const messages = {
         'ck-fullname': 'Vui lòng nhập họ tên.',
         'ck-phone': 'Vui lòng nhập số điện thoại.',
         'ck-address': 'Vui lòng nhập địa chỉ.',
      };
      ['ck-fullname', 'ck-phone', 'ck-address'].forEach(id => {
         const el = document.getElementById(id);
         if (!el.value.trim()) { setFieldState(el.closest('.field'), false, messages[id]); valid = false; }
         else setFieldState(el.closest('.field'), true);
      });
      const phone = document.getElementById('ck-phone');
      if (phone.value && !isValidPhone(phone.value)) { setFieldState(phone.closest('.field'), false, 'Vui lòng nhập số điện thoại hợp lệ.'); valid = false; }

      // Bắt buộc chọn vị trí trên bản đồ khi đang nhập địa chỉ mới
      const mapField = document.getElementById('ck-map-field');
      if (!ckSelectedAddressId && !window.ckSelectedLatLng) {
         mapField?.classList.add('invalid');
         valid = false;
      } else {
         mapField?.classList.remove('invalid');
      }

      if (!valid) { showToast('Vui lòng điền đầy đủ các trường bắt buộc.', 'error'); return; }

      const name = document.getElementById('ck-fullname').value.trim();
      const phoneVal = document.getElementById('ck-phone').value.trim();
      const addressVal = document.getElementById('ck-address').value.trim();

      // Nếu đang nhập địa chỉ mới (chưa chọn từ danh sách đã lưu) -> lưu lại cho lần đặt sau
      if (!ckSelectedAddressId && typeof saveUserAddress === 'function') {
         const coords = window.ckSelectedLatLng || null;
         saveUserAddress({ name, phone: phoneVal, address: addressVal, lat: coords?.lat, lng: coords?.lng });
      }
      window.ckSelectedLatLng = null;

      const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
      const note = document.getElementById('ck-note')?.value.trim() || '';
      const order = placeOrder({
         address: addressVal + (note ? ` (Ghi chú: ${note})` : ''),
         payment,
      });

      if (order) {
         window.location.href = `checkout.html?success=1&order=${order.id}`;
      }
   });
}

/* ---------------------------------------------------------
   NEWSLETTER FORM
   --------------------------------------------------------- */
function initNewsletterForm() {
   const form = document.getElementById('newsletter-form');
   if (!form) return;
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!isValidEmail(input.value)) {
         showToast('Vui lòng nhập địa chỉ email hợp lệ.', 'error');
         input.style.outline = '2px solid #C7391D';
         return;
      }
      input.style.outline = '';
      showToast('Đăng ký thành công! Hãy kiểm tra hộp thư để nhận ưu đãi 🎉', 'success');
      form.reset();
   });
}

/* ---------------------------------------------------------
   CONTACT FORM
   --------------------------------------------------------- */
function initContactForm() {
   const form = document.getElementById('contact-form');
   if (!form) return;
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
         const el = document.getElementById(id);
         if (!el.value.trim()) { setFieldState(el.closest('.field'), false, 'Trường này là bắt buộc.'); valid = false; }
         else setFieldState(el.closest('.field'), true);
      });
      const email = document.getElementById('contact-email');
      if (email.value && !isValidEmail(email.value)) { setFieldState(email.closest('.field'), false, 'Vui lòng nhập email hợp lệ.'); valid = false; }
      if (!valid) return;
      showToast('Đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');
      form.reset();
   });
}

/* ---------------------------------------------------------
   CHANGE PASSWORD FORM (change-password.html)
   --------------------------------------------------------- */
function initChangePasswordForm() {
   const form = document.getElementById('change-password-form');
   if (!form) return;

   const newPassInput = document.getElementById('cp-new');
   newPassInput?.addEventListener('input', () => {
      const val = newPassInput.value;
      const bars = document.querySelectorAll('#cp-strength span');
      let score = 0;
      if (val.length >= 6) score++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
      if (val.length >= 10 && /[^A-Za-z0-9]/.test(val)) score++;
      bars.forEach((b, i) => {
         b.className = '';
         if (i < score) b.className = score === 1 ? 'on-weak' : score === 2 ? 'on-mid' : 'on-strong';
      });
   });

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      if (!user) return;

      const currentEl = document.getElementById('cp-current');
      const newEl = document.getElementById('cp-new');
      const confirmEl = document.getElementById('cp-confirm');
      let valid = true;

      if (currentEl.value !== user.password) {
         setFieldState(currentEl.closest('.field'), false, 'Mật khẩu hiện tại không đúng.');
         valid = false;
      } else setFieldState(currentEl.closest('.field'), true);

      if (newEl.value.length < 6) {
         setFieldState(newEl.closest('.field'), false, 'Mật khẩu mới phải có ít nhất 6 ký tự.');
         valid = false;
      } else setFieldState(newEl.closest('.field'), true);

      if (confirmEl.value !== newEl.value || !confirmEl.value) {
         setFieldState(confirmEl.closest('.field'), false, 'Mật khẩu xác nhận không khớp.');
         valid = false;
      } else setFieldState(confirmEl.closest('.field'), true);

      if (!valid) return;

      const users = getStore(LS.USERS, []);
      const u = users.find(x => x.email === user.email);
      if (u) {
         u.password = newEl.value;
         setStore(LS.USERS, users);
         showToast('Đổi mật khẩu thành công!', 'success');
         form.reset();
         document.querySelectorAll('#cp-strength span').forEach(b => b.className = '');
      }
   });
}

document.addEventListener('DOMContentLoaded', () => {
   initRegisterForm();
   initLoginForm();
   initPassToggles();
   initCheckoutForm();
   initNewsletterForm();
   initContactForm();
   initChangePasswordForm();   
});
