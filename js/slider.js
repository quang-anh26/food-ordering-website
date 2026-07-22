/* =========================================================
   FOODIO — slider.js
   Reviews carousel: renders review slides in groups of 3
   and handles prev/next + dot navigation + autoplay.
   ========================================================= */

function initReviewSlider() {
   const track = document.getElementById('review-track');
   const dotsWrap = document.getElementById('review-dots');
   if (!track) return;

   const perSlide = window.innerWidth <= 640 ? 1 : window.innerWidth <= 992 ? 2 : 3;
   const slides = [];
   for (let i = 0; i < REVIEWS.length; i += perSlide) slides.push(REVIEWS.slice(i, i + perSlide));

   track.innerHTML = slides.map(group => `
    <div class="review-slide">
      ${group.map(r => `
        <div class="review-card">
          ${starsHtml(r.rating)}
          <p>"${r.text}"</p>
          <div class="review-user">
            <img src="${r.avatar}" alt="${r.name}">
            <div><b>${r.name}</b><span>${r.role}</span></div>
          </div>
        </div>`).join('')}
    </div>`).join('');

   if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `<span data-dot="${i}" class="${i === 0 ? 'active' : ''}"></span>`).join('');
   }

   let current = 0;
   function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsWrap) {
         dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === current));
      }
   }

   document.getElementById('review-prev')?.addEventListener('click', () => goTo(current - 1));
   document.getElementById('review-next')?.addEventListener('click', () => goTo(current + 1));
   dotsWrap?.querySelectorAll('span').forEach(dot => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.dot)));
   });

   let autoplay = setInterval(() => goTo(current + 1), 5500);
   track.closest('.reviews-wrap')?.addEventListener('mouseenter', () => clearInterval(autoplay));
   track.closest('.reviews-wrap')?.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 5500); });
}

document.addEventListener('DOMContentLoaded', initReviewSlider);
