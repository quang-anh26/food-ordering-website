

/* ---------------------------------------------------------
   1. MOCK DATA
   --------------------------------------------------------- */
const CATEGORIES = [
   { id: 'pho-bun', name: 'Phở & Bún', icon: '🍜' },
   { id: 'com', name: 'Cơm', icon: '🍚' },
   { id: 'banh', name: 'Bánh Mì & Bánh', icon: '🥖' },
   { id: 'cuon', name: 'Món Cuốn', icon: '🥬' },
   { id: 'lau-haisan', name: 'Lẩu & Hải Sản', icon: '🍲' },
   { id: 'trang-mieng', name: 'Chè & Tráng Miệng', icon: '🍧' },
   { id: 'ca-phe', name: 'Cà Phê', icon: '☕' },
   { id: 'nuoc-uong', name: 'Trà Sữa & Nước Ép', icon: '🧋' },
];

const RESTAURANTS = [
   { id: 'r1', name: 'Phở Ông Hùng', cuisine: 'Phở • Bún Việt', rating: 4.8, time: '20-30 phút', distance: '1.2 km', status: 'open', image: './images/restaurants/phoonghung.png' },
   { id: 'r2', name: 'Cơm Tấm Hưng Phát', cuisine: 'Cơm Tấm • Cơm Gà', rating: 4.7, time: '15-25 phút', distance: '2.0 km', status: 'open', image: './images/restaurants/comtamhungphat.png' },
   { id: 'r3', name: 'Bánh Mì Cô Lành', cuisine: 'Bánh Mì • Bánh Xèo', rating: 4.9, time: '10-20 phút', distance: '0.8 km', status: 'open', image: './images/restaurants/banhmicolanh.png' },
   { id: 'r4', name: 'Cuốn Sài Gòn Xưa', cuisine: 'Gỏi Cuốn • Nem Rán', rating: 4.6, time: '15-20 phút', distance: '1.5 km', status: 'open', image: './images/restaurants/banhcuonxua.png' },
   { id: 'r5', name: 'Lẩu Hải Sản Biển Đông', cuisine: 'Lẩu • Hải Sản', rating: 4.8, time: '25-35 phút', distance: '1.8 km', status: 'open', image: './images/restaurants/lauhaisanbiendong.png' },
   { id: 'r6', name: 'Chè Cô Hoa', cuisine: 'Chè • Tráng Miệng', rating: 4.9, time: '10-20 phút', distance: '0.6 km', status: 'closed', image: './images/restaurants/checohoa.png' },
   { id: 'r7', name: 'Cà Phê Sương Sớm', cuisine: 'Cà Phê Việt', rating: 4.7, time: '10-15 phút', distance: '0.9 km', status: 'open', image: './images/restaurants/caphesuongwsom.png' },
   { id: 'r8', name: 'Trà Sữa Ngọc Trai', cuisine: 'Trà Sữa • Nước Ép', rating: 4.6, time: '10-15 phút', distance: '1.1 km', status: 'open', image: './images/restaurants/trasuangoctrai.png' },
   { id: 'r9', name: 'Bún Chả Hà Nội', cuisine: 'Bún Chả • Nem Cua Bể', rating: 4.8, time: '15-25 phút', distance: '1.3 km', status: 'open', image: './images/restaurants/bunchahanoi.png' },
   { id: 'r10', name: 'Hủ Tiếu Nam Vang', cuisine: 'Hủ Tiếu • Bánh Canh', rating: 4.7, time: '15-25 phút', distance: '1.0 km', status: 'open', image: './images/restaurants/hutieu.png' },
];

const FOODS = [
   { id: 'f1', name: 'Phở Bò Tái Nạm', category: 'pho-bun', restaurantId: 'r1', price: 45000, oldPrice: 55000, rating: 4.9, ratingCount: 341, time: '20-30', desc: 'Nước dùng hầm xương 12 tiếng, bánh phở dai mềm, thịt bò tái nạm thái mỏng.', image: 'https://picsum.photos/seed/pho1/600/450', badge: 'Bán Chạy' },
   { id: 'f2', name: 'Bún Bò Huế Đặc Biệt', category: 'pho-bun', restaurantId: 'r1', price: 49000, rating: 4.8, ratingCount: 258, time: '20-30', desc: 'Đậm vị sả ớt đặc trưng xứ Huế, đầy đủ giò heo, chả cua, huyết.', image: 'https://picsum.photos/seed/bunbo1/600/450', badge: 'Nổi Bật' },
   { id: 'f3', name: 'Bún Chả Hà Nội', category: 'pho-bun', restaurantId: 'r4', price: 52000, rating: 4.8, ratingCount: 187, time: '18-25', desc: 'Chả nướng than hoa thơm lừng, ăn kèm bún tươi và nước chấm chua ngọt.', image: 'https://picsum.photos/seed/buncha1/600/450' },
   { id: 'f4', name: 'Hủ Tiếu Nam Vang', category: 'pho-bun', restaurantId: 'r2', price: 42000, rating: 4.6, ratingCount: 132, time: '15-25', desc: 'Hủ tiếu dai giòn, tôm thịt bằm, gan heo và nước lèo thanh ngọt.', image: 'https://picsum.photos/seed/hutieu1/600/450' },
   { id: 'f5', name: 'Cơm Tấm Sườn Bì Chả', category: 'com', restaurantId: 'r2', price: 55000, oldPrice: 65000, rating: 4.9, ratingCount: 302, time: '15-20', desc: 'Sườn nướng mật ong, bì heo, chả trứng hấp, ăn kèm nước mắm chua ngọt.', image: 'https://picsum.photos/seed/comtam1/600/450', badge: 'Bán Chạy' },
   { id: 'f6', name: 'Cơm Gà Xối Mỡ', category: 'com', restaurantId: 'r2', price: 48000, rating: 4.6, ratingCount: 154, time: '15-20', desc: 'Đùi gà chiên giòn rụm, cơm dẻo thơm, dưa leo và nước mắm gừng.', image: 'https://picsum.photos/seed/comga1/600/450' },
   { id: 'f7', name: 'Bánh Mì Thịt Nướng', category: 'banh', restaurantId: 'r3', price: 25000, rating: 4.7, ratingCount: 276, time: '10-20', desc: 'Bánh mì giòn rụm, thịt nướng thơm lừng, pate béo ngậy, rau thơm tươi.', image: 'https://picsum.photos/seed/banhmi1/600/450', badge: 'Bán Chạy' },
   { id: 'f8', name: 'Bánh Xèo Miền Tây', category: 'banh', restaurantId: 'r3', price: 39000, rating: 4.7, ratingCount: 168, time: '15-25', desc: 'Vỏ bánh giòn tan vàng ươm, nhân tôm thịt giá đỗ, cuốn rau sống chấm mắm.', image: 'https://picsum.photos/seed/banhxeo1/600/450' },
   { id: 'f9', name: 'Gỏi Cuốn Tôm Thịt', category: 'cuon', restaurantId: 'r4', price: 35000, rating: 4.8, ratingCount: 201, time: '10-15', desc: 'Cuốn tươi mát với tôm, thịt luộc, bún và rau sống, chấm tương đậu phộng.', image: 'https://picsum.photos/seed/goicuon1/600/450' },
   { id: 'f10', name: 'Nem Rán Hà Nội', category: 'cuon', restaurantId: 'r4', price: 38000, rating: 4.7, ratingCount: 145, time: '15-20', desc: 'Nem rán giòn tan nhân thịt, miến, mộc nhĩ, chấm nước mắm chua ngọt.', image: 'https://picsum.photos/seed/nemran1/600/450' },
   { id: 'f11', name: 'Lẩu Thái Hải Sản', category: 'lau-haisan', restaurantId: 'r5', price: 189000, rating: 4.9, ratingCount: 128, time: '25-35', desc: 'Vị chua cay đặc trưng, đầy ắp tôm mực cá, ăn kèm rau và bún tươi.', image: 'https://picsum.photos/seed/lauthai1/600/450', badge: 'Cao Cấp' },
   { id: 'f12', name: 'Hải Sản Nướng Mỡ Hành', category: 'lau-haisan', restaurantId: 'r5', price: 149000, rating: 4.7, ratingCount: 96, time: '25-35', desc: 'Set hải sản tươi sống nướng mỡ hành, thơm béo và đậm đà hương biển.', image: 'https://picsum.photos/seed/haisan1/600/450' },
   { id: 'f13', name: 'Chè Thái Trân Châu', category: 'trang-mieng', restaurantId: 'r6', price: 29000, rating: 4.8, ratingCount: 210, time: '10-15', desc: 'Thạch nhiều màu, trân châu dai giòn, nước cốt dừa béo ngậy mát lạnh.', image: 'https://picsum.photos/seed/chethai1/600/450', badge: 'Ngọt Ngào' },
   { id: 'f14', name: 'Chè Khúc Bạch', category: 'trang-mieng', restaurantId: 'r6', price: 32000, rating: 4.7, ratingCount: 154, time: '10-15', desc: 'Khúc bạch béo mềm, hạnh nhân giòn tan, nhãn tươi và nước đường thơm mát.', image: 'https://picsum.photos/seed/khucbach1/600/450' },
   { id: 'f15', name: 'Cà Phê Sữa Đá', category: 'ca-phe', restaurantId: 'r7', price: 25000, rating: 4.8, ratingCount: 288, time: '5-10', desc: 'Cà phê phin nguyên chất, sữa đặc béo ngậy, đá mát lạnh đúng chất Việt.', image: 'https://picsum.photos/seed/caphesuada/600/450', badge: 'Bán Chạy' },
   { id: 'f16', name: 'Trà Sữa Trân Châu Đường Đen', category: 'nuoc-uong', restaurantId: 'r8', price: 39000, rating: 4.7, ratingCount: 233, time: '5-10', desc: 'Trân châu đường đen dẻo thơm, trà sữa béo mịn, topping đầy đặn.', image: 'https://picsum.photos/seed/trasuadd/600/450', badge: 'Nổi Bật' },
];

const REVIEWS = [
   { name: 'Minh Anh', role: 'Người sành ăn', rating: 5, text: 'Đồ ăn giao siêu nhanh và vẫn còn nóng hổi. Giao diện đặt hàng cực kỳ mượt!', avatar: 'https://i.pravatar.cc/100?img=32' },
   { name: 'Đức Trọng', role: 'Khách hàng thân thiết', rating: 5, text: 'Trải nghiệm đặt món tốt nhất mình từng dùng. Giao diện cảm giác rất cao cấp.', avatar: 'https://i.pravatar.cc/100?img=12' },
   { name: 'Lan Phạm', role: 'Blogger ẩm thực', rating: 4, text: 'Chất lượng món ăn tuyệt vời, nhiều lựa chọn nhà hàng đa dạng.', avatar: 'https://i.pravatar.cc/100?img=45' },
   { name: 'Quốc Huy', role: 'Khách hàng đã xác thực', rating: 5, text: 'Thanh toán mượt mà, mã giảm giá áp dụng ngay lập tức. Rất đáng để thử!', avatar: 'https://i.pravatar.cc/100?img=8' },
   { name: 'Thu Huyền', role: 'Khách hàng', rating: 5, text: 'Ứng dụng đẹp, dễ dùng, phần yêu thích giúp mình đặt lại món quen rất nhanh.', avatar: 'https://i.pravatar.cc/100?img=47' },
   { name: 'Anh Khoa', role: 'Khách hàng đã xác thực', rating: 4, text: 'Nhiều nhà hàng đa dạng gần khu vực mình ở, thời gian giao hàng khá chính xác.', avatar: 'https://i.pravatar.cc/100?img=15' },
];

const FAQS = [
   { q: 'Tôi có cần đăng nhập để đặt món không?', a: 'Bạn có thể xem thực đơn và nhà hàng tự do, nhưng cần đăng nhập để thêm vào giỏ hàng, thanh toán hoặc lưu món yêu thích.' },
   { q: 'Thời gian giao hàng trung bình là bao lâu?', a: 'Tùy nhà hàng, thời gian giao hàng trung bình dao động từ 15 đến 35 phút kể từ khi xác nhận đơn hàng.' },
   { q: 'Tôi có thể thanh toán bằng những hình thức nào?', a: 'Foodio hỗ trợ thanh toán khi nhận hàng (COD), thẻ tín dụng/ghi nợ và ví điện tử.' },
   { q: 'Làm sao để theo dõi đơn hàng của tôi?', a: 'Sau khi đặt hàng, bạn có thể xem trạng thái chi tiết trong mục "Đơn hàng của tôi" tại trang Hồ sơ cá nhân.' },
   { q: 'Tôi có thể hủy đơn hàng sau khi đặt không?', a: 'Bạn có thể hủy đơn trong vòng 5 phút sau khi đặt tại mục Đơn hàng của tôi, trước khi nhà hàng xác nhận chế biến.' },
];

/* ---------------------------------------------------------
   2. STORAGE KEYS
   --------------------------------------------------------- */
const LS = {
   USERS: 'foodio_users',
   SESSION: 'foodio_session',
   CART: 'foodio_cart',
   WISHLIST: 'foodio_wishlist',
   ORDERS: 'foodio_orders',
   THEME: 'foodio_theme',
};

/* ---------------------------------------------------------
   3. GENERIC HELPERS
   --------------------------------------------------------- */
function getStore(key, fallback) {
   try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
   } catch (e) { return fallback; }
}
function setStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function formatPrice(n) { return Number(n).toLocaleString('vi-VN') + '₫'; }

function findFood(id) { return FOODS.find(f => f.id === id); }
function findRestaurant(id) { return RESTAURANTS.find(r => r.id === id); }

function starsHtml(rating, size = 14) {
   const full = Math.round(rating);
   let html = '<span class="stars">';
   for (let i = 0; i < 5; i++) {
      html += `<svg viewBox="0 0 24 24" style="width:${size}px;height:${size}px;opacity:${i < full ? 1 : .25}"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
   }
   html += '</span>';
   return html;
}

/* ---------------------------------------------------------
   4. TOAST NOTIFICATIONS
   --------------------------------------------------------- */
function ensureToastWrap() {
   let wrap = document.querySelector('.toast-wrap');
   if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
   }
   return wrap;
}
function showToast(message, type = 'default') {
   const wrap = ensureToastWrap();
   const toast = document.createElement('div');
   toast.className = `toast ${type}`;
   const icon = type === 'success'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : type === 'error'
         ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
         : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
   toast.innerHTML = `${icon}<span>${message}</span>`;
   wrap.appendChild(toast);
   setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
   }, 3200);
}

/* ---------------------------------------------------------
   5. LOADING SCREEN
   --------------------------------------------------------- */
window.addEventListener('load', () => {
   const loader = document.getElementById('loading-screen');
   if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
});

/* ---------------------------------------------------------
   6. SCROLL PROGRESS + SCROLL TO TOP + HEADER SHADOW
   --------------------------------------------------------- */
function initScrollFx() {
   const progress = document.getElementById('scroll-progress');
   const topBtn = document.getElementById('scroll-top');
   const header = document.getElementById('site-header');
   window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
      if (topBtn) topBtn.classList.toggle('show', scrollTop > 400);
      if (header) header.classList.toggle('scrolled', scrollTop > 30);
   });
   if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------
   7. CART BADGE (used by every page's header)
   --------------------------------------------------------- */
function updateCartBadge() {
   const cart = getStore(LS.CART, []);
   const count = cart.reduce((sum, i) => sum + i.qty, 0);
   document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
   });
}

/* ---------------------------------------------------------
   8. FOOD CARD RENDERER (shared by home / menu / detail / wishlist)
   --------------------------------------------------------- */
function foodCardHtml(food) {
   const wishlist = getStore(LS.WISHLIST, []);
   const isFav = wishlist.includes(food.id);
   const rest = findRestaurant(food.restaurantId);
   return `
  <div class="food-card reveal" data-id="${food.id}">
    <div class="food-card__media">
      <a href="food-detail.html?id=${food.id}">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
      </a>
      ${food.badge ? `<span class="food-card__badge ${food.oldPrice ? 'discount' : ''}">${food.badge}</span>` : ''}
      <button class="food-card__fav ${isFav ? 'active' : ''}" data-fav="${food.id}" aria-label="Yêu thích">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.5-10-9.5C.5 6.5 3 3 6.5 3c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 3 23.5 6.5 22 11.5 19.5 16.5 12 21 12 21z"/></svg>
      </button>
    </div>
    <div class="food-card__body">
      <div class="food-card__top">
        <a href="food-detail.html?id=${food.id}" class="food-card__name">${food.name}</a>
        <span class="food-card__rating">${food.rating.toFixed(1)}
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
        </span>
      </div>
      <p class="food-card__desc">${food.desc}</p>
      <div class="food-card__meta">
        <span>⏱ ${food.time} phút</span>
        <span>🏬 ${rest ? rest.name : ''}</span>
      </div>
      <div class="food-card__bottom">
        <span class="food-card__price">${formatPrice(food.price)}${food.oldPrice ? `<small>${formatPrice(food.oldPrice)}</small>` : ''}</span>
        <button class="food-card__add" data-add="${food.id}" aria-label="Thêm vào giỏ hàng">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function renderFoodGrid(container, foods) {
   if (!container) return;
   if (!foods.length) {
      container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <h3>Không tìm thấy món ăn nào</h3>
        <p>Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn.</p>
      </div>`;
      return;
   }
   container.innerHTML = foods.map(foodCardHtml).join('');
}

/* ---------------------------------------------------------
   9. REVEAL ON SCROLL (basic init, refined in animation.js)
   --------------------------------------------------------- */
function initReveal() {
   const items = document.querySelectorAll('.reveal');
   const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
         }
      });
   }, { threshold: 0.12 });
   items.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------
   10. INIT ON EVERY PAGE
   --------------------------------------------------------- */
function highlightActiveNav() {
   const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
   document.querySelectorAll('.main-nav a[data-nav]').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === page || (page === '' && a.dataset.nav === 'index'));
   });
}

function initHomePage() {
   const catWrap = document.getElementById('category-scroll');
   if (catWrap) {
      catWrap.innerHTML = CATEGORIES.map(c => `
      <a href="menu.html?category=${c.id}" class="category-item reveal">
        <div class="cat-icon">${c.icon}</div>
        <span>${c.name}</span>
      </a>`).join('');
   }

   const featuredGrid = document.getElementById('featured-grid');
   if (featuredGrid) renderFoodGrid(featuredGrid, FOODS.slice(0, 12));

   const restWrap = document.getElementById('restaurants-grid');
   if (restWrap) {
      restWrap.innerHTML = RESTAURANTS.map(r => `
      <a href="restaurant.html#${r.id}" class="restaurant-card reveal">
        <div class="restaurant-card__media">
          <img src="${r.image}" alt="${r.name}">
          <span class="restaurant-card__status ${r.status === 'closed' ? 'closed' : ''}">${r.status === 'closed' ? 'Đã đóng cửa' : 'Đang mở cửa'}</span>
          <div class="restaurant-card__logo">${r.name[0]}</div>
        </div>
        <div class="restaurant-card__body">
          <h4>${r.name}</h4>
          <div class="tags-row"><span>${r.cuisine}</span></div>
          <div class="restaurant-card__foot">
            <span>${starsHtml(r.rating, 13)} ${r.rating}</span>
            <span>⏱ ${r.time}</span>
          </div>
        </div>
      </a>`).join('');
   }
}

document.addEventListener('DOMContentLoaded', () => {
   initScrollFx();
   updateCartBadge();
   highlightActiveNav();
   initHomePage();
   initReveal();
});

