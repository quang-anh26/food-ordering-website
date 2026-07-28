/* =========================================================
   FOODIO — cart.js
   Add/remove/update cart items, favorites (wishlist), cart
   page rendering, promo codes, and checkout order placement.
   All state lives in localStorage so it survives refreshes.
   ========================================================= */

const TAX_RATE = 0.08;
/* ---------------------------------------------------------
   PHÍ GIAO HÀNG — ngẫu nhiên mỗi phiên thanh toán, nhưng giao
   hỏa tốc LUÔN đắt hơn giao nhanh (chênh 10.000 - 20.000đ).
   Lưu trong sessionStorage để không đổi giá liên tục khi
   người dùng qua lại giữa các bước trong cùng 1 lần đặt hàng.
   --------------------------------------------------------- */
function getDeliveryFees() {
   let fees = null;
   try { fees = JSON.parse(sessionStorage.getItem('foodio_delivery_fees')); } catch (e) { fees = null; }
   if (!fees || !fees.fast || !fees.express) {
      const fast = (15 + Math.floor(Math.random() * 11)) * 1000;               // 15.000 - 25.000đ
      const express = fast + (10 + Math.floor(Math.random() * 11)) * 1000;     // luôn đắt hơn giao nhanh 10.000 - 20.000đ
      fees = { fast, express };
      sessionStorage.setItem('foodio_delivery_fees', JSON.stringify(fees));
   }
   return fees;
}
function getDeliveryMethod() {
   return sessionStorage.getItem('foodio_delivery_method') || 'fast';
}
function setDeliveryMethod(method) {
   sessionStorage.setItem('foodio_delivery_method', method);
}
function getDeliveryFee() {
   const fees = getDeliveryFees();
   const method = getDeliveryMethod();
   return fees[method] || fees.fast;
}
function renderDeliveryOptions() {
   const wrap = document.getElementById('ck-delivery-options');
   if (!wrap) return; // không phải trang thanh toán
   const fees = getDeliveryFees();
   const method = getDeliveryMethod();
   wrap.innerHTML = `
      <label class="payment-opt">
         <input type="radio" name="delivery-method" value="fast" ${method === 'fast' ? 'checked' : ''}>
         <span class="p-icon">🚚</span>
         <span><b>Giao hàng nhanh</b><span>Dự kiến 30-45 phút · ${formatPrice(fees.fast)}</span></span>
      </label>
      <label class="payment-opt">
         <input type="radio" name="delivery-method" value="express" ${method === 'express' ? 'checked' : ''}>
         <span class="p-icon">⚡</span>
         <span><b>Giao hàng hỏa tốc</b><span>Dự kiến 10-15 phút · ${formatPrice(fees.express)}</span></span>
      </label>`;
   wrap.querySelectorAll('input[name="delivery-method"]').forEach(input => {
      input.addEventListener('change', () => {
         setDeliveryMethod(input.value);
         renderCheckoutSummary();
      });
   });
}
// Mỗi mã có thể khai báo thêm maxOrder (đơn tối đa được áp dụng) và maxUses (số lần dùng tối đa / khách)
const PROMO_CODES = {
   FOODIO10: { rate: 0.10, maxOrder: 500000, maxUses: 2 },
   WELCOME15: { rate: 0.15 },
};

/* ---------------------------------------------------------
   PROMO USAGE TRACKING — lưu số lần đã dùng theo từng khách
   (khách chưa đăng nhập dùng chung bộ đếm "guest")
   --------------------------------------------------------- */
function promoUsageKey() {
   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   return 'foodio_promo_usage_' + (user ? user.email : 'guest');
}
function getPromoUsage(code) {
   const usage = getStore(promoUsageKey(), {});
   return usage[code] || 0;
}
function incPromoUsage(code) {
   const usage = getStore(promoUsageKey(), {});
   usage[code] = (usage[code] || 0) + 1;
   setStore(promoUsageKey(), usage);
}

/* ---------------------------------------------------------
   CART STORAGE KEY — giỏ hàng gắn theo từng tài khoản, không
   dùng chung 1 key cho tất cả mọi người. Khách chưa đăng nhập
   dùng key riêng (luôn trống vì addToCart yêu cầu đăng nhập).
   --------------------------------------------------------- */
function cartStorageKey() {
   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   return user ? 'foodio_cart_' + user.email : 'foodio_cart_guest';
}

/* ---------------------------------------------------------
   PENDING ADD-TO-CART — khi khách chưa đăng nhập bấm "Thêm vào
   giỏ", lưu tạm món đó lại. Sau khi đăng nhập/đăng ký thành
   công, món sẽ được tự động thêm vào giỏ (xem validation.js).
   --------------------------------------------------------- */
function savePendingCartAction(foodId, qty, selectedOptions) {
   sessionStorage.setItem('foodio_pending_cart', JSON.stringify({ foodId, qty, selectedOptions }));
}
function consumePendingCartAction() {
   const raw = sessionStorage.getItem('foodio_pending_cart');
   if (!raw) return null;
   sessionStorage.removeItem('foodio_pending_cart');
   try { return JSON.parse(raw); } catch (e) { return null; }
}

/* ---------------------------------------------------------
   CART CRUD
   --------------------------------------------------------- */
function addToCart(foodId, qty = 1, selectedOptions = []) {
   if (!isLoggedIn()) {
      savePendingCartAction(foodId, qty, selectedOptions);
      showLoginModal();
      return;
   }
   const food = findFood(foodId);
   if (!food) return;
   const optionsPrice = selectedOptions.reduce((s, o) => s + o.price, 0);
   const unitPrice = food.price + optionsPrice;
   const optionsLabel = selectedOptions.map(o => o.label).join(', ');
   const lineId = foodId + '::' + optionsLabel; // món + tùy chọn khác nhau -> dòng riêng trong giỏ
   const cart = getStore(cartStorageKey(), []);
   const existing = cart.find(i => i.lineId === lineId);
   if (existing) existing.qty += qty;
   else cart.push({ lineId, id: foodId, qty, unitPrice, optionsLabel });
   setStore(cartStorageKey(), cart);
   updateCartBadge();
   showToast(`Đã thêm ${food.name} vào giỏ hàng!`, 'success');
}

function removeFromCart(lineId) {
   let cart = getStore(cartStorageKey(), []);
   cart = cart.filter(i => (i.lineId || i.id) !== lineId);
   setStore(cartStorageKey(), cart);
   updateCartBadge();
   renderCartPage();
   showToast('Đã xóa món khỏi giỏ hàng.', 'default');
}
function updateCartQty(lineId, delta) {
   const cart = getStore(cartStorageKey(), []);
   const item = cart.find(i => (i.lineId || i.id) === lineId);
   if (!item) return;
   item.qty += delta;
   if (item.qty <= 0) { removeFromCart(lineId); return; }
   setStore(cartStorageKey(), cart);
   updateCartBadge();
   renderCartPage();
}

function clearCart() {
   setStore(cartStorageKey(), []);
   localStorage.removeItem('foodio_promo');
   updateCartBadge();
   renderCartPage();
}

function cartTotals() {
   const cart = getStore(cartStorageKey(), []);
   const subtotal = cart.reduce((sum, i) => {
      const f = findFood(i.id);
      const price = i.unitPrice ?? (f ? f.price : 0);
      return sum + price * i.qty;
   }, 0);
   const promo = getStore('foodio_promo', null);
   let discount = 0;
   if (promo && PROMO_CODES[promo]) {
      const cfg = PROMO_CODES[promo];
      const withinMax = !cfg.maxOrder || subtotal <= cfg.maxOrder;
      const hasUsesLeft = !cfg.maxUses || getPromoUsage(promo) < cfg.maxUses;
      if (withinMax && hasUsesLeft) discount = subtotal * cfg.rate;
   }
   const delivery = cart.length ? getDeliveryFee() : 0;
   const total = subtotal - discount + delivery;
   return { subtotal, discount, delivery, total, count: cart.reduce((s, i) => s + i.qty, 0) };
}

/* ---------------------------------------------------------
   WISHLIST (Favorites)
   --------------------------------------------------------- */
function toggleFavorite(foodId) {
   if (!requireAuth()) return;
   let wishlist = getStore(LS.WISHLIST, []);
   const idx = wishlist.indexOf(foodId);
   if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast('Đã bỏ khỏi danh sách yêu thích.', 'default');
   } else {
      wishlist.push(foodId);
      showToast('Đã thêm vào danh sách yêu thích!', 'success');
   }
   setStore(LS.WISHLIST, wishlist);
   document.querySelectorAll(`[data-fav="${foodId}"]`).forEach(btn => {
      btn.classList.toggle('active');
      const svg = btn.querySelector('svg');
      svg.setAttribute('fill', btn.classList.contains('active') ? 'currentColor' : 'none');
   });
}

/* ---------------------------------------------------------
   CART PAGE RENDER
   --------------------------------------------------------- */
function cartItemRow(item) {
   const food = findFood(item.id);
   if (!food) return '';
   const price = item.unitPrice ?? food.price;
   return `
  <div class="cart-item" data-line="${item.lineId || food.id}">
      <div class="cart-item__img"><img src="${food.image}" alt="${food.name}"></div>
      <div class="cart-item__info">
         <h4>${food.name}</h4>
         <div class="opts">${item.optionsLabel || findRestaurant(food.restaurantId)?.name || ''}</div>
         <div class="unit-price">${formatPrice(price)} / món</div>
      </div>
      <div class="cart-item__qty">
         <button data-qty="-1" aria-label="Decrease">−</button>
         <span>${item.qty}</span>
         <button data-qty="1" aria-label="Increase">+</button>
      </div>
      <div class="cart-item__price">${formatPrice(price * item.qty)}</div>
      <button class="cart-item__remove" data-remove aria-label="Remove item">
         <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0l-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
      </button>
  </div>`;
}

function renderCartPage() {
   const listEl = document.getElementById('cart-list-body');
   if (!listEl) return;
   const cart = getStore(cartStorageKey(), []);
   const emptyEl = document.getElementById('cart-empty');
   const layoutEl = document.getElementById('cart-layout');

   if (!cart.length) {
      if (layoutEl) layoutEl.style.display = 'none';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
   }
   if (layoutEl) layoutEl.style.display = 'grid';
   if (emptyEl) emptyEl.style.display = 'none';

   listEl.innerHTML = cart.map(cartItemRow).join('');

   listEl.querySelectorAll('[data-qty]').forEach(btn => {
      btn.addEventListener('click', () => {
         const lineId = btn.closest('.cart-item').dataset.line;
         updateCartQty(lineId, parseInt(btn.dataset.qty, 10));
      });
   });
   listEl.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.closest('.cart-item').dataset.line));
   });

   renderSummary();
}

function renderSummary() {
   const t = cartTotals();
   const map = {
      'sum-subtotal': formatPrice(t.subtotal),
      'sum-discount': '-' + formatPrice(t.discount),
      'sum-delivery': formatPrice(t.delivery),
      'sum-total': formatPrice(t.total),
   };
   Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
   });
   const discountRow = document.getElementById('discount-row');
   if (discountRow) discountRow.style.display = t.discount > 0 ? 'flex' : 'none';
}

function applyPromo(code) {
   const clean = code.trim().toUpperCase();
   const cfg = PROMO_CODES[clean];
   if (!cfg) {
      showToast('Mã giảm giá không hợp lệ.', 'error');
      return;
   }
   const { subtotal } = cartTotals();
   if (cfg.maxOrder && subtotal > cfg.maxOrder) {
      showToast(`Mã ${clean} chỉ áp dụng cho đơn hàng tối đa ${formatPrice(cfg.maxOrder)}.`, 'error');
      return;
   }
   if (cfg.maxUses && getPromoUsage(clean) >= cfg.maxUses) {
      showToast(`Mã ${clean} đã hết lượt sử dụng (tối đa ${cfg.maxUses} lần).`, 'error');
      return;
   }
   setStore('foodio_promo', clean);
   showToast(`Áp dụng mã giảm giá thành công: -${cfg.rate * 100}%`, 'success');
   renderCartPage();
   renderCheckoutSummary();
}

/* ---------------------------------------------------------
   CHECKOUT PAGE
   --------------------------------------------------------- */
function renderCheckoutSummary() {
   const el = document.getElementById('checkout-items');
   if (!el) return;
   renderDeliveryOptions();
   const cart = getStore(cartStorageKey(), []);
   const isSuccess = new URLSearchParams(window.location.search).get('success');
   if (!cart.length) {
      if (!isSuccess) window.location.href = 'cart.html';   // chỉ redirect khi KHÔNG phải trang success
      return;
   }
   el.innerHTML = cart.map(item => {
      const f = findFood(item.id);
      return `<div class="order-review-item">
                  <img src="${f.image}" alt="${f.name}">
                  <div style="flex:1"><b>${f.name}</b><br><span class="qty-badge">x${item.qty}</span></div>
                  <div>${formatPrice((item.unitPrice ?? f.price) * item.qty)}</div>
               </div>`;
   }).join('');
   renderSummary();
}

function placeOrder(formData) {
   const cart = getStore(cartStorageKey(), []);
   if (!cart.length) return;
   const t = cartTotals();
   const orders = getStore(LS.ORDERS, []);
   const user = getCurrentUser();
   const order = {
      id: 'ORD' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: cart.map(i => ({ id: i.id, qty: i.qty, name: findFood(i.id)?.name, image: findFood(i.id)?.image, price: i.unitPrice ?? findFood(i.id)?.price })),
      total: t.total,
      status: 'processing',
      address: formData.address,
      payment: formData.payment,
      deliveryMethod: getDeliveryMethod(),
      deliveryFee: t.delivery,
      userEmail: user ? user.email : 'guest',
   };
   orders.unshift(order);
   setStore(LS.ORDERS, orders);

   // Đã dùng mã giảm giá thành công -> trừ vào số lượt còn lại của khách
   const promo = getStore('foodio_promo', null);
   if (promo && t.discount > 0) incPromoUsage(promo);

   setStore(cartStorageKey(), []);
   localStorage.removeItem('foodio_promo');
   sessionStorage.removeItem('foodio_delivery_fees');
   sessionStorage.removeItem('foodio_delivery_method');
   updateCartBadge();
   return order;
}

document.addEventListener('DOMContentLoaded', () => {
   renderCartPage();
   initPromoCountdown();

   const promoBtn = document.getElementById('apply-promo-btn');
   if (promoBtn) {
      promoBtn.addEventListener('click', () => {
         const input = document.getElementById('promo-input');
         if (input && input.value) applyPromo(input.value);
      });
   }

   const clearBtn = document.getElementById('clear-cart-btn');
   if (clearBtn) clearBtn.addEventListener('click', clearCart);

   // Delegate add-to-cart / favorite clicks site-wide
   document.body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      if (addBtn) { addToCart(addBtn.dataset.add, 1); return; }
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) { toggleFavorite(favBtn.dataset.fav); return; }
   });

   renderCheckoutSummary();
});

/* ---------------------------------------------------------
   PROMO CODE BOX — sao chép mã + đếm ngược 2 tiếng từ lúc đăng nhập
   --------------------------------------------------------- */
function initPromoCountdown() {
   const box = document.getElementById('promo-code-box');
   if (!box) return;

   const session = getStore(LS.SESSION, null);
   if (!session) { box.style.display = 'none'; return; }

   const EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 tiếng

   // Mốc bắt đầu đếm giờ RIÊNG cho từng tài khoản, chỉ set 1 LẦN DUY NHẤT.
   // Đăng xuất/đăng nhập lại không reset, vì chỉ đọc lại giá trị đã lưu.
   const promoTimers = getStore(LS.PROMO_TIMERS, {});
   if (!promoTimers[session.email]) {
      promoTimers[session.email] = Date.now();
      setStore(LS.PROMO_TIMERS, promoTimers);
   }
   const expiry = promoTimers[session.email] + EXPIRY_MS;
   const timerEl = document.getElementById('promo-code-timer');

   let interval;                    // 👈 THÊM dòng này lên trước hàm tick
   const tick = () => {
      const remain = expiry - Date.now();
      if (remain <= 0) {
         box.style.display = 'none';
         clearInterval(interval);
         return;
      }
      const h = String(Math.floor(remain / 3600000)).padStart(2, '0');
      const m = String(Math.floor((remain % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((remain % 60000) / 1000)).padStart(2, '0');
      timerEl.textContent = `⏳ ${h}:${m}:${s}`;
   };
   interval = setInterval(tick, 1000);   // 👈 ĐỔI: bỏ chữ "const", gọi setInterval TRƯỚC
   tick();                               // 👈 ĐỔI: gọi tick() SAU khi interval đã có giá trị

   document.getElementById('promo-copy-btn')?.addEventListener('click', () => {
      const code = document.getElementById('promo-code-value').textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
         showToast(`Đã sao chép mã ${code}!`, 'success');
      });
   });
}