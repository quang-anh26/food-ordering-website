/* =========================================================
   FOODIO — cart.js
   Add/remove/update cart items, favorites (wishlist), cart
   page rendering, promo codes, and checkout order placement.
   All state lives in localStorage so it survives refreshes.
   ========================================================= */

const DELIVERY_FEE = 15000;
const TAX_RATE = 0.08;
const PROMO_CODES = { FOODIO10: 0.10, WELCOME15: 0.15 };

/* ---------------------------------------------------------
   CART CRUD
   --------------------------------------------------------- */
function addToCart(foodId, qty = 1) {
   if (!requireAuth()) return;
   const food = findFood(foodId);
   if (!food) return;
   const cart = getStore(LS.CART, []);
   const existing = cart.find(i => i.id === foodId);
   if (existing) existing.qty += qty;
   else cart.push({ id: foodId, qty });
   setStore(LS.CART, cart);
   updateCartBadge();
   showToast(`Đã thêm ${food.name} vào giỏ hàng!`, 'success');
}

function removeFromCart(foodId) {
   let cart = getStore(LS.CART, []);
   cart = cart.filter(i => i.id !== foodId);
   setStore(LS.CART, cart);
   updateCartBadge();
   renderCartPage();
   showToast('Đã xóa món khỏi giỏ hàng.', 'default');
}

function updateCartQty(foodId, delta) {
   const cart = getStore(LS.CART, []);
   const item = cart.find(i => i.id === foodId);
   if (!item) return;
   item.qty += delta;
   if (item.qty <= 0) {
      removeFromCart(foodId);
      return;
   }
   setStore(LS.CART, cart);
   updateCartBadge();
   renderCartPage();
}

function clearCart() {
   setStore(LS.CART, []);
   updateCartBadge();
   renderCartPage();
}

function cartTotals() {
   const cart = getStore(LS.CART, []);
   const subtotal = cart.reduce((sum, i) => {
      const f = findFood(i.id);
      return sum + (f ? f.price * i.qty : 0);
   }, 0);
   const promo = getStore('foodio_promo', null);
   const discount = promo && PROMO_CODES[promo] ? subtotal * PROMO_CODES[promo] : 0;
   const tax = (subtotal - discount) * TAX_RATE;
   const delivery = cart.length ? DELIVERY_FEE : 0;
   const total = subtotal - discount + tax + delivery;
   return { subtotal, discount, tax, delivery, total, count: cart.reduce((s, i) => s + i.qty, 0) };
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
   return `
  <div class="cart-item" data-id="${food.id}">
    <div class="cart-item__img"><img src="${food.image}" alt="${food.name}"></div>
    <div class="cart-item__info">
      <h4>${food.name}</h4>
      <div class="opts">${findRestaurant(food.restaurantId)?.name || ''}</div>
      <div class="unit-price">${formatPrice(food.price)} / món</div>
    </div>
    <div class="cart-item__qty">
      <button data-qty="-1" aria-label="Decrease">−</button>
      <span>${item.qty}</span>
      <button data-qty="1" aria-label="Increase">+</button>
    </div>
    <div class="cart-item__price">${formatPrice(food.price * item.qty)}</div>
    <button class="cart-item__remove" data-remove aria-label="Remove item">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0l-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
    </button>
  </div>`;
}

function renderCartPage() {
   const listEl = document.getElementById('cart-list-body');
   if (!listEl) return;
   const cart = getStore(LS.CART, []);
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
         const id = btn.closest('.cart-item').dataset.id;
         updateCartQty(id, parseInt(btn.dataset.qty, 10));
      });
   });
   listEl.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.closest('.cart-item').dataset.id));
   });

   renderSummary();
}

function renderSummary() {
   const t = cartTotals();
   const map = {
      'sum-subtotal': formatPrice(t.subtotal),
      'sum-discount': '-' + formatPrice(t.discount),
      'sum-tax': formatPrice(t.tax),
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
   if (PROMO_CODES[clean]) {
      setStore('foodio_promo', clean);
      showToast(`Áp dụng mã giảm giá thành công: -${PROMO_CODES[clean] * 100}%`, 'success');
      renderCartPage();
      renderCheckoutSummary();
   } else {
      showToast('Mã giảm giá không hợp lệ.', 'error');
   }
}

/* ---------------------------------------------------------
   CHECKOUT PAGE
   --------------------------------------------------------- */
function renderCheckoutSummary() {
   const el = document.getElementById('checkout-items');
   if (!el) return;
   const cart = getStore(LS.CART, []);
   if (!cart.length) { window.location.href = 'cart.html'; return; }
   el.innerHTML = cart.map(item => {
      const f = findFood(item.id);
      return `<div class="order-review-item">
      <img src="${f.image}" alt="${f.name}">
      <div style="flex:1"><b>${f.name}</b><br><span class="qty-badge">x${item.qty}</span></div>
      <div>${formatPrice(f.price * item.qty)}</div>
    </div>`;
   }).join('');
   renderSummary();
}

function placeOrder(formData) {
   const cart = getStore(LS.CART, []);
   if (!cart.length) return;
   const t = cartTotals();
   const orders = getStore(LS.ORDERS, []);
   const user = getCurrentUser();
   const order = {
      id: 'ORD' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: cart.map(i => ({ id: i.id, qty: i.qty, name: findFood(i.id)?.name, image: findFood(i.id)?.image, price: findFood(i.id)?.price })),
      total: t.total,
      status: 'processing',
      address: formData.address,
      payment: formData.payment,
      userEmail: user ? user.email : 'guest',
   };
   orders.unshift(order);
   setStore(LS.ORDERS, orders);
   setStore(LS.CART, []);
   localStorage.removeItem('foodio_promo');
   updateCartBadge();
   return order;
}

document.addEventListener('DOMContentLoaded', () => {
   renderCartPage();

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
