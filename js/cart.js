const TAX_RATE = 0.08;

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
   if (!wrap) return;
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

const PROMO_CODES = {
   FOODIO10: { rate: 0.10, maxOrder: 500000, maxUses: 2, label: 'Giảm 10%', desc: 'Giảm 10% cho đơn hàng tối đa 500.000₫, tối đa 2 lần/khách.' },
   WELCOME15: { rate: 0.15, maxOrder: 300000, maxUses: 1, label: 'Giảm 15%', desc: 'Giảm 15% cho đơn hàng tối đa 300.000₫, áp dụng cho đơn đầu tiên.' },
   HEMTOP20: { rate: 0.20, minOrder: 100000, maxDiscount: 50000, maxUses: 2, label: 'Giảm 20%', desc: 'Giảm 20% (tối đa 50k) cho đơn từ 100.000₫.' },
   KTAHP50: { rate: 0.50, minOrder: 200000, maxDiscount: 100000, maxUses: 1, label: 'Giảm 50%', desc: 'Giảm 50% (tối đa 100k) cho đơn từ 200.000₫.' },
   FREESHIP: { freeShip: true, minOrder: 80000, maxShipDiscount: 30000, rate: 0, label: 'Freeship', desc: 'Miễn phí giao hàng (tối đa 30k) cho đơn từ 80.000₫.' },
   DEMO30: { rate: 0.30, minOrder: 60000, maxDiscount: 40000, maxUses: 3, label: 'Giảm 30%', desc: 'Mã dùng thử giảm 30% (tối đa 40k) cho đơn từ 60.000₫.' }
};

function promoUsageKey() {
   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   return 'foodio_promo_usage_' + (user ? user.email : 'guest');
}
function promoNoAutoKey() {
   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   return 'foodio_promo_no_auto_' + (user ? user.email : 'guest');
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

function isPromoEligible(code, subtotal) {
   const cfg = PROMO_CODES[code];
   if (!cfg) return false;
   const minOrderOk = !cfg.minOrder || subtotal >= cfg.minOrder;
   const maxOrderOk = !cfg.maxOrder || subtotal <= cfg.maxOrder;
   const usesOk = !cfg.maxUses || getPromoUsage(code) < cfg.maxUses;
   return minOrderOk && maxOrderOk && usesOk;
}

function computePromoDiscount(code, subtotal, delivery) {
   const cfg = PROMO_CODES[code];
   if (!cfg || !isPromoEligible(code, subtotal)) return null;
   let rateDiscount = subtotal * (cfg.rate || 0);
   if (cfg.maxDiscount && rateDiscount > cfg.maxDiscount) rateDiscount = cfg.maxDiscount;
   let shipDiscount = 0;
   if (cfg.freeShip) shipDiscount = Math.min(delivery, cfg.maxShipDiscount || 30000);
   return rateDiscount + shipDiscount;
}

function getBestEligiblePromo(subtotal, delivery) {
   let best = null;
   Object.keys(PROMO_CODES).forEach(code => {
      const discount = computePromoDiscount(code, subtotal, delivery);
      if (discount !== null && discount > 0 && (!best || discount > best.discount)) {
         best = { code, discount };
      }
   });
   return best;
}

function ensureBestPromoApplied() {
   const cart = getSelectedCartItems();
   if (!cart.length) {
      localStorage.removeItem(promoNoAutoKey());
      return;
   }
   const subtotal = cart.reduce((sum, i) => {
      const f = findFood(i.id);
      const price = i.unitPrice ?? (f ? f.price : 0);
      return sum + price * i.qty;
   }, 0);
   const delivery = getDeliveryFee();
   const currentCode = getStore('foodio_promo', null);

   if (currentCode && isPromoEligible(currentCode, subtotal)) return;
   if (localStorage.getItem(promoNoAutoKey()) === '1') return;

   const best = getBestEligiblePromo(subtotal, delivery);
   if (best && best.code !== currentCode) {
      setStore('foodio_promo', best.code);
      showToast(`🎉 Đã tự động áp dụng mã tốt nhất cho bạn: ${best.code} (-${formatPrice(best.discount)})`, 'success');
   } else if (!best && currentCode) {
      localStorage.removeItem('foodio_promo');
   }
}

function cartStorageKey() {
   const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
   return user ? 'foodio_cart_' + user.email : 'foodio_cart_guest';
}

function savePendingCartAction(foodId, qty, selectedOptions) {
   sessionStorage.setItem('foodio_pending_cart', JSON.stringify({ foodId, qty, selectedOptions }));
}
function consumePendingCartAction() {
   const raw = sessionStorage.getItem('foodio_pending_cart');
   if (!raw) return null;
   sessionStorage.removeItem('foodio_pending_cart');
   try { return JSON.parse(raw); } catch (e) { return null; }
}

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
   const lineId = foodId + '::' + optionsLabel;
   const cart = getStore(cartStorageKey(), []);
   const existing = cart.find(i => i.lineId === lineId);
   if (existing) existing.qty += qty;
   else cart.push({ lineId, id: foodId, qty, unitPrice, optionsLabel, selected: true });
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
   localStorage.removeItem(promoNoAutoKey());
   updateCartBadge();
   renderCartPage();
}

function isItemSelected(item) {
   return item.selected !== false;
}
function getSelectedCartItems() {
   return getStore(cartStorageKey(), []).filter(isItemSelected);
}
function setCartItemSelected(lineId, selected) {
   const cart = getStore(cartStorageKey(), []);
   const item = cart.find(i => (i.lineId || i.id) === lineId);
   if (!item) return;
   item.selected = selected;
   setStore(cartStorageKey(), cart);
}
function setAllCartItemsSelected(selected) {
   const cart = getStore(cartStorageKey(), []);
   cart.forEach(i => i.selected = selected);
   setStore(cartStorageKey(), cart);
}

function cartTotals() {
   ensureBestPromoApplied();
   const cart = getSelectedCartItems();
   const subtotal = cart.reduce((sum, i) => {
      const f = findFood(i.id);
      const price = i.unitPrice ?? (f ? f.price : 0);
      return sum + price * i.qty;
   }, 0);
   const promo = getStore('foodio_promo', null);
   let discount = 0;
   const delivery = cart.length ? getDeliveryFee() : 0;
   if (promo && PROMO_CODES[promo]) {
      const cfg = PROMO_CODES[promo];
      const withinMax = !cfg.maxOrder || subtotal <= cfg.maxOrder;
      const hasUsesLeft = !cfg.maxUses || getPromoUsage(promo) < cfg.maxUses;
      const minOrderOk = !cfg.minOrder || subtotal >= cfg.minOrder;
      if (withinMax && hasUsesLeft && minOrderOk) {
         let rateDiscount = subtotal * (cfg.rate || 0);
         if (cfg.maxDiscount && rateDiscount > cfg.maxDiscount) {
            rateDiscount = cfg.maxDiscount;
         }
         let shipDiscount = 0;
         if (cfg.freeShip) {
            shipDiscount = Math.min(delivery, cfg.maxShipDiscount || 30000);
         }
         discount = rateDiscount + shipDiscount;
      }
   }
   const total = Math.max(0, subtotal - discount + delivery);
   return { subtotal, discount, delivery, total, count: cart.reduce((s, i) => s + i.qty, 0) };
}

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

function cartItemRow(item) {
   const food = findFood(item.id);
   if (!food) return '';
   const price = item.unitPrice ?? food.price;
   const selected = isItemSelected(item);
   return `
  <div class="cart-item ${selected ? '' : 'cart-item--unselected'}" data-line="${item.lineId || food.id}">
      <label class="cart-item__check">
         <input type="checkbox" data-select-item ${selected ? 'checked' : ''} aria-label="Chọn món để thanh toán">
      </label>
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
   listEl.querySelectorAll('[data-select-item]').forEach(chk => {
      chk.addEventListener('change', () => {
         const lineId = chk.closest('.cart-item').dataset.line;
         setCartItemSelected(lineId, chk.checked);
         renderCartPage();
      });
   });

   updateSelectAllCheckbox(cart);
   renderSummary();
}

function updateSelectAllCheckbox(cart) {
   const selectAll = document.getElementById('select-all-cart');
   if (!selectAll) return;
   const selectedCount = cart.filter(isItemSelected).length;
   selectAll.checked = selectedCount === cart.length && cart.length > 0;
   selectAll.indeterminate = selectedCount > 0 && selectedCount < cart.length;
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
   renderVoucherSelector();
}

function renderVoucherSelector() {
   const container = document.getElementById('voucher-selector-container');
   if (!container) return;

   const { subtotal } = cartTotals();
   const appliedCode = getStore('foodio_promo', null);
   const bestPromo = getBestEligiblePromo(subtotal, getDeliveryFee());

   const tagIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L4 3a1 1 0 0 0-1 1l.24 5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83Z"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;


   const sortedEntries = Object.entries(PROMO_CODES).sort(([codeA], [codeB]) => {
      const rank = (code) => {
         if (code === appliedCode) return 0;
         if (bestPromo && code === bestPromo.code) return 1;
         return isPromoEligible(code, subtotal) ? 2 : 3;
      };
      return rank(codeA) - rank(codeB);
   });

   const cardsHtml = sortedEntries.map(([code, cfg]) => {
      const isApplied = appliedCode === code;
      const minOrderOk = !cfg.minOrder || subtotal >= cfg.minOrder;
      const maxOrderOk = !cfg.maxOrder || subtotal <= cfg.maxOrder;
      const usesOk = !cfg.maxUses || getPromoUsage(code) < cfg.maxUses;
      const eligible = minOrderOk && maxOrderOk && usesOk;
      const disabled = !eligible && !isApplied;
      const isBest = bestPromo && bestPromo.code === code;

      let btnLabel = 'Chọn';
      if (isApplied) btnLabel = 'Đang dùng';
      else if (disabled) btnLabel = 'Không đủ ĐK';

      const usageInfo = cfg.maxUses
         ? `<div class="voucher-usage">Đã dùng ${getPromoUsage(code)}/${cfg.maxUses} lần</div>`
         : '';

      return `
      <div class="voucher-card ${isApplied ? 'applied' : ''} ${disabled ? 'disabled' : ''}" data-code="${code}">
         <div class="voucher-info">
            <div class="voucher-code">${code}${isBest ? ' <span class="voucher-best-tag">Tốt nhất</span>' : ''}</div>
            <div class="voucher-desc">${cfg.desc}</div>
            ${usageInfo}
         </div>
         <button type="button" class="btn-apply-voucher ${isApplied ? 'applied' : ''} ${disabled ? 'locked' : ''}" data-voucher-btn="${code}" ${disabled ? 'disabled' : ''}>${btnLabel}</button>
      </div>`;
   }).join('');

   container.innerHTML = `
      <div class="voucher-selector-section">
         <div class="voucher-selector-header">
            ${tagIconSvg}
            <span>Voucher dành riêng cho bạn:</span>
         </div>
         <div class="vouchers-list">
            ${cardsHtml}
         </div>
      </div>`;

   container.querySelectorAll('[data-voucher-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
         if (btn.disabled) return;
         const code = btn.dataset.voucherBtn;
         if (getStore('foodio_promo', null) === code) {
            removePromo();
         } else {
            applyPromo(code);
         }
      });
   });
}

function removePromo() {
   localStorage.removeItem('foodio_promo');
   localStorage.setItem(promoNoAutoKey(), '1');
   showToast('Đã hủy áp dụng mã giảm giá.', 'default');
   renderCartPage();
   renderCheckoutSummary();
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
   const successMsg = cfg.freeShip && !cfg.rate
      ? `Áp dụng mã ${clean} thành công: Miễn phí phí giao hàng!`
      : `Áp dụng mã ${clean} thành công: -${cfg.rate * 100}%`;
   showToast(successMsg, 'success');
   renderCartPage();
   renderCheckoutSummary();
}

function renderCheckoutSummary() {
   const el = document.getElementById('checkout-items');
   if (!el) return;
   renderDeliveryOptions();
   const isSuccess = new URLSearchParams(window.location.search).get('success');
   const cart = getSelectedCartItems();
   if (!cart.length) {
      if (!isSuccess) window.location.href = 'cart.html';
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
   const cart = getSelectedCartItems();
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

   const promo = getStore('foodio_promo', null);
   if (promo && t.discount > 0) incPromoUsage(promo);

   const remainingCart = getStore(cartStorageKey(), []).filter(i => !isItemSelected(i));
   setStore(cartStorageKey(), remainingCart);
   localStorage.removeItem('foodio_promo');
   localStorage.removeItem(promoNoAutoKey());
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

   const selectAll = document.getElementById('select-all-cart');
   if (selectAll) {
      selectAll.addEventListener('change', () => {
         setAllCartItemsSelected(selectAll.checked);
         renderCartPage();
      });
   }

   const goCheckoutBtn = document.getElementById('go-checkout-btn');
   if (goCheckoutBtn) {
      goCheckoutBtn.addEventListener('click', (e) => {
         e.preventDefault();
         if (!getSelectedCartItems().length) {
            showToast('Vui lòng chọn ít nhất 1 món để thanh toán.', 'error');
            return;
         }
         window.location.href = 'checkout.html';
      });
   }

   document.body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      if (addBtn) { addToCart(addBtn.dataset.add, 1); return; }
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) { toggleFavorite(favBtn.dataset.fav); return; }
   });

   renderCheckoutSummary();
});

function initPromoCountdown() {
   const box = document.getElementById('promo-code-box');
   if (!box) return;

   const session = getStore(LS.SESSION, null);
   if (!session) { box.style.display = 'none'; return; }

   const EXPIRY_MS = 2 * 60 * 60 * 1000;

   const promoTimers = getStore(LS.PROMO_TIMERS, {});
   if (!promoTimers[session.email]) {
      promoTimers[session.email] = Date.now();
      setStore(LS.PROMO_TIMERS, promoTimers);
   }
   const expiry = promoTimers[session.email] + EXPIRY_MS;
   const timerEl = document.getElementById('promo-code-timer');

   let interval;
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
   interval = setInterval(tick, 1000);
   tick();

   document.getElementById('promo-copy-btn')?.addEventListener('click', () => {
      const code = document.getElementById('promo-code-value').textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
         showToast(`Đã sao chép mã ${code}!`, 'success');
      });
   });
}