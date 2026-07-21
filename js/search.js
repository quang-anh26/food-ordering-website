/* =========================================================
   FOODIO — search.js
   Live search suggestions in the header dropdown, plus the
   hero search bar which redirects to menu.html?q=...
   ========================================================= */

function searchFoods(query) {
   const q = query.trim().toLowerCase();
   if (!q) return [];
   return FOODS.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q)
   ).slice(0, 6);
}

function initHeaderSearch() {
   const input = document.getElementById('header-search-input');
   const suggestBox = document.getElementById('search-suggestions');
   if (!input || !suggestBox) return;

   input.addEventListener('input', () => {
      const results = searchFoods(input.value);
      if (!input.value.trim()) { suggestBox.classList.remove('show'); return; }
      if (!results.length) {
         suggestBox.innerHTML = `<div class="empty">Không tìm thấy món "${input.value}"</div>`;
      } else {
         suggestBox.innerHTML = results.map(f => `
        <a href="food-detail.html?id=${f.id}">
          <img src="${f.image}" alt="${f.name}">
          <span>${f.name}<br><small style="color:var(--c-gray-400)">${formatPrice(f.price)}</small></span>
        </a>`).join('');
      }
      suggestBox.classList.add('show');
   });

   input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
         window.location.href = `menu.html?q=${encodeURIComponent(input.value.trim())}`;
      }
   });

   document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) suggestBox.classList.remove('show');
   });
}

function initHeroSearch() {
   const form = document.getElementById('hero-search-form');
   if (!form) return;
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('hero-search-input').value.trim();
      window.location.href = val ? `menu.html?q=${encodeURIComponent(val)}` : 'menu.html';
   });
}

document.addEventListener('DOMContentLoaded', () => {
   initHeaderSearch();
   initHeroSearch();
});
