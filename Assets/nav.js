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

  // Dropdown click/touch toggle — hover alone never fires on touch devices
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  function closeDropdowns() {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  }
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('.nav-dropbtn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', closeDropdowns);

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
