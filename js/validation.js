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
      setTimeout(() => { window.location.href = 'index.html'; }, 900);
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
   CHECKOUT FORM
   --------------------------------------------------------- */
function initCheckoutForm() {
   const form = document.getElementById('checkout-form');
   if (!form) return;

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      ['ck-fullname', 'ck-phone', 'ck-address', 'ck-city'].forEach(id => {
         const el = document.getElementById(id);
         if (!el.value.trim()) { setFieldState(el.closest('.field'), false, 'Trường này là bắt buộc.'); valid = false; }
         else setFieldState(el.closest('.field'), true);
      });
      const phone = document.getElementById('ck-phone');
      if (phone.value && !isValidPhone(phone.value)) { setFieldState(phone.closest('.field'), false, 'Vui lòng nhập số điện thoại hợp lệ.'); valid = false; }

      if (!valid) { showToast('Vui lòng điền đầy đủ các trường bắt buộc.', 'error'); return; }

      const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
      const order = placeOrder({
         address: `${document.getElementById('ck-address').value}, ${document.getElementById('ck-city').value}`,
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

document.addEventListener('DOMContentLoaded', () => {
   initRegisterForm();
   initLoginForm();
   initPassToggles();
   initCheckoutForm();
   initNewsletterForm();
   initContactForm();
});
