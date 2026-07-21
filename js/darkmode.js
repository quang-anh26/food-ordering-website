/* =========================================================
   FOODIO — darkmode.js
   Toggles a `dark-mode` class on <body> and persists choice.
   ========================================================= */

function applyStoredTheme() {
   const theme = localStorage.getItem(LS.THEME);
   if (theme === 'dark') document.body.classList.add('dark-mode');
}

function initDarkModeToggle() {
   const btn = document.getElementById('dark-toggle-btn');
   if (!btn) return;
   btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem(LS.THEME, document.body.classList.contains('dark-mode') ? 'dark' : 'light');
   });
}

applyStoredTheme();
document.addEventListener('DOMContentLoaded', initDarkModeToggle);
