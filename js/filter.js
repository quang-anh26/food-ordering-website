/* =========================================================
   FOODIO — filter.js
   Category filtering, price range, rating filter and sorting
   used on the Menu page + the featured-foods tabs on Home.
   ========================================================= */

/* ---------------------------------------------------------
   HOME PAGE — simple category tab filter over featured foods
   --------------------------------------------------------- */
function initHomeFilterTabs() {
   const tabs = document.querySelectorAll('.filter-tabs [data-cat]');
   const grid = document.getElementById('featured-grid');
   if (!tabs.length || !grid) return;

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
         const cat = tab.dataset.cat;
         const foods = cat === 'all' ? FOODS.slice(0, 12) : FOODS.filter(f => f.category === cat);
         renderFoodGrid(grid, foods);
         initReveal();
      });
   });
}

/* ---------------------------------------------------------
   MENU PAGE — full filter/sort sidebar
   --------------------------------------------------------- */
const menuState = { categories: [], maxPrice: 200000, minRating: 0, sort: 'popular', query: '', restaurant: null };

function applyMenuFilters() {
   let results = FOODS.slice();

   if (menuState.restaurant) {
      results = results.filter(f => f.restaurantId === menuState.restaurant);
   }
   if (menuState.query) {
      const q = menuState.query.toLowerCase();
      results = results.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
   }
   if (menuState.categories.length) {
      results = results.filter(f => menuState.categories.includes(f.category));
   }
   results = results.filter(f => f.price <= menuState.maxPrice);
   results = results.filter(f => f.rating >= menuState.minRating);

   switch (menuState.sort) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      default: results.sort((a, b) => b.ratingCount - a.ratingCount);
   }

   const grid = document.getElementById('menu-grid');
   renderFoodGrid(grid, results);
   initReveal();

   const countEl = document.getElementById('results-count');
   if (countEl) countEl.textContent = `Tìm thấy ${results.length} món ăn`;
}

function renderRestaurantBanner() {
   const old = document.getElementById('restaurant-filter-banner');
   if (old) old.remove();
   if (!menuState.restaurant) return;

   const rest = findRestaurant(menuState.restaurant);
   const anchor = document.querySelector('.filter-tabs');
   if (!rest || !anchor) return;

   anchor.insertAdjacentHTML('beforebegin', `
      <div class="restaurant-filter-banner" id="restaurant-filter-banner">
        <span>🏬 Đang xem món của <strong>${rest.name}</strong></span>
        <button type="button" id="clear-restaurant-filter">Xóa bộ lọc ✕</button>
      </div>`);

   const clearBtn = document.getElementById('clear-restaurant-filter');
   if (clearBtn) {
      clearBtn.addEventListener('click', () => {
         menuState.restaurant = null;
         const url = new URL(window.location.href);
         url.searchParams.delete('restaurant');
         window.history.replaceState({}, '', url);
         renderRestaurantBanner();
         applyMenuFilters();
      });
   }
}

function initMenuPage() {
   const grid = document.getElementById('menu-grid');
   if (!grid) return;

   // Read ?q=, ?category= and ?restaurant= from URL
   const params = new URLSearchParams(window.location.search);
   if (params.get('q')) menuState.query = params.get('q');
   if (params.get('category')) menuState.categories = [params.get('category')];
   if (params.get('restaurant')) menuState.restaurant = params.get('restaurant');
   renderRestaurantBanner();

   const searchField = document.getElementById('menu-search-field');
   if (searchField) {
      searchField.value = menuState.query;
      searchField.addEventListener('input', () => { menuState.query = searchField.value; applyMenuFilters(); });
   }

   // Category checkboxes
   document.querySelectorAll('.cat-check').forEach(cb => {
      if (menuState.categories.includes(cb.value)) cb.checked = true;
      cb.addEventListener('change', () => {
         menuState.categories = Array.from(document.querySelectorAll('.cat-check:checked')).map(c => c.value);
         applyMenuFilters();
      });
   });

   // Price range
   const priceRange = document.getElementById('price-range');
   const priceLabel = document.getElementById('price-range-label');
   if (priceRange) {
      priceRange.addEventListener('input', () => {
         menuState.maxPrice = Number(priceRange.value);
         if (priceLabel) priceLabel.textContent = formatPrice(priceRange.value);
         applyMenuFilters();
      });
   }

   // Rating filter
   document.querySelectorAll('.rating-check').forEach(cb => {
      cb.addEventListener('change', () => {
         const checked = Array.from(document.querySelectorAll('.rating-check:checked')).map(c => Number(c.value));
         menuState.minRating = checked.length ? Math.min(...checked) : 0;
         applyMenuFilters();
      });
   });

   // Sort select
   const sortSelect = document.getElementById('sort-select');
   if (sortSelect) {
      sortSelect.addEventListener('change', () => { menuState.sort = sortSelect.value; applyMenuFilters(); });
   }

   // Category quick tabs (top of page)
   document.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
         document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
         menuState.categories = tab.dataset.cat === 'all' ? [] : [tab.dataset.cat];
         document.querySelectorAll('.cat-check').forEach(cb => { cb.checked = menuState.categories.includes(cb.value); });
         applyMenuFilters();
      });
   });

   applyMenuFilters();
}

document.addEventListener('DOMContentLoaded', () => {
   initHomeFilterTabs();
   initMenuPage();
});