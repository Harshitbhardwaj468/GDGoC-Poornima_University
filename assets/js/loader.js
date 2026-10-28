// 1. Loading Screen: Displayed for 2 seconds whenever the website is opened
(function() {
  var loadingEl = document.getElementById('loading-screen');
  if (loadingEl) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      loadingEl.style.transition = 'opacity 0.7s ease-out';
      loadingEl.style.opacity = '0';
      loadingEl.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setTimeout(function() {
        loadingEl.style.display = 'none';
        if (typeof loadingEl.remove === 'function') {
          loadingEl.remove();
        } else if (loadingEl.parentNode) {
          loadingEl.parentNode.removeChild(loadingEl);
        }
      }, 700);
    }, 2000);
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
})();
