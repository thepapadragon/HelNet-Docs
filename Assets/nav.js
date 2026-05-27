(function () {
  // UTC clock
  var clockEl = document.getElementById('utc-clock');
  if (clockEl) {
    function tick() {
      clockEl.textContent = new Date().toUTCString().slice(17, 25) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);
  }

  // Hamburger toggle
  var hbBtn = document.getElementById('nav-hamburger');
  var hbMenu = document.getElementById('nav-mobile');
  if (hbBtn && hbMenu) {
    hbBtn.addEventListener('click', function () {
      hbBtn.classList.toggle('open');
      hbMenu.classList.toggle('open');
    });
    hbMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hbBtn.classList.remove('open');
        hbMenu.classList.remove('open');
      });
    });
  }

  // Active nav state — compare fully-resolved URLs
  var current = window.location.href
    .replace(/[?#].*$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    var href = a.href
      .replace(/[?#].*$/, '')
      .replace(/\.html$/, '')
      .replace(/\/$/, '');
    if (href === current) {
      a.classList.add('active');
      var dropdown = a.closest('.nav-dropdown');
      if (dropdown) {
        var btn = dropdown.querySelector('.nav-dropbtn');
        if (btn) btn.classList.add('active');
      }
    }
  });
})();
