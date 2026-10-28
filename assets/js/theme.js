// Prevent theme flashing before render (FOUC)
(function () {
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.warn('Theme access error:', e);
  }
})();

// Interactive Reactive Theme State Management (Persistent across page navigation)
(function () {
  var toggleBtn = document.getElementById('theme-toggle-btn');
  var thumb = document.getElementById('theme-slider-thumb');
  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');

  function updateThemeUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (thumb) {
        thumb.classList.remove('translate-x-0');
        thumb.classList.add('translate-x-7');
      }
      if (sunIcon) {
        sunIcon.classList.remove('opacity-100', 'text-primary');
        sunIcon.classList.add('opacity-0', 'pointer-events-none');
      }
      if (moonIcon) {
        moonIcon.classList.remove('opacity-40', 'text-outline');
        moonIcon.classList.add('opacity-100', 'text-blue-400');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (thumb) {
        thumb.classList.remove('translate-x-7');
        thumb.classList.add('translate-x-0');
      }
      if (sunIcon) {
        sunIcon.classList.remove('opacity-0', 'pointer-events-none');
        sunIcon.classList.add('opacity-100', 'text-primary');
      }
      if (moonIcon) {
        moonIcon.classList.remove('opacity-100', 'text-blue-400');
        moonIcon.classList.add('opacity-40', 'text-outline');
      }
    }
  }

  // Synchronize toggle UI state with documentElement class on page load
  var currentThemeIsDark = document.documentElement.classList.contains('dark');
  updateThemeUI(currentThemeIsDark);

  // Toggle handler saving new preference directly to localStorage
  function toggleTheme() {
    var willBeDark = !document.documentElement.classList.contains('dark');
    updateThemeUI(willBeDark);
    try {
      localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Unable to persist theme to localStorage:', e);
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleTheme();
    });
    toggleBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
})();
