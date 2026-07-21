/* =========================================================
   FOODIO — animation.js
   Mobile nav toggle, FAQ accordion, food-detail tabs/gallery,
   animated stat counters, and reveal-on-scroll orchestration.
   ========================================================= */

/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */
function initMobileNav() {
   const toggle = document.getElementById('mobile-toggle');
   const nav = document.getElementById('mobile-nav');
   const overlay = document.getElementById('mobile-overlay');
   const close = document.getElementById('close-mobile');
   if (!toggle || !nav) return;

   const open = () => { nav.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; };
   const shut = () => { nav.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; };

   toggle.addEventListener('click', open);
   close?.addEventListener('click', shut);
   overlay?.addEventListener('click', shut);
   nav.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

/* ---------------------------------------------------------
   FAQ ACCORDION
   --------------------------------------------------------- */
function initFaq() {
   const list = document.getElementById('faq-list');
   if (!list) return;
   list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item ${i === 0 ? 'open' : ''}">
      <button class="faq-q">${f.q}<span class="plus">+</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');

   list.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('.faq-q').addEventListener('click', () => {
         const wasOpen = item.classList.contains('open');
         list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
         if (!wasOpen) item.classList.add('open');
      });
   });
}

/* ---------------------------------------------------------
   ANIMATED STAT COUNTERS (hero section)
   --------------------------------------------------------- */
function initCounters() {
   const counters = document.querySelectorAll('[data-counter]');
   counters.forEach(el => {
      const target = Number(el.dataset.counter);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
         current = Math.min(target, current + step);
         el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
         if (current < target) requestAnimationFrame(tick);
      };
      tick();
   });
}

/* ---------------------------------------------------------
   FOOD DETAIL TABS
   --------------------------------------------------------- */
function initDetailTabs() {
   const heads = document.querySelectorAll('.tab-heads button');
   if (!heads.length) return;
   heads.forEach(btn => {
      btn.addEventListener('click', () => {
         heads.forEach(b => b.classList.remove('active'));
         document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
         btn.classList.add('active');
         document.getElementById(btn.dataset.tab)?.classList.add('active');
      });
   });
}

/* ---------------------------------------------------------
   FOOD DETAIL GALLERY THUMBNAILS
   --------------------------------------------------------- */
function initGallery() {
   const thumbs = document.querySelectorAll('.detail-gallery__thumbs img');
   const main = document.getElementById('gallery-main-img');
   if (!thumbs.length || !main) return;
   thumbs.forEach(t => {
      t.addEventListener('click', () => {
         thumbs.forEach(x => x.classList.remove('active'));
         t.classList.add('active');
         main.src = t.src;
      });
   });
}

document.addEventListener('DOMContentLoaded', () => {
   initMobileNav();
   initFaq();
   initCounters();
   initDetailTabs();
   initGallery();
   initReveal();
});
