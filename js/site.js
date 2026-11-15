// Waywe website: menu, dropdowns, hero slider, footer year
(function () {
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }
  document.querySelectorAll('.dd-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var dd = b.parentElement, open = !dd.classList.contains('open');
      document.querySelectorAll('.dd.open').forEach(function (x) { x.classList.remove('open'); });
      if (open) dd.classList.add('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dd')) document.querySelectorAll('.dd.open').forEach(function (x) { x.classList.remove('open'); });
  });

  var slides = document.querySelectorAll('#slides .slide');
  var dots = document.getElementById('dots');
  if (slides.length && dots) {
    var idx = 0, timer;
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { go(i, true); });
      dots.appendChild(d);
    });
    function go(i, user) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === idx); });
      dots.querySelectorAll('button').forEach(function (d, k) { d.classList.toggle('on', k === idx); });
      if (user) restart();
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
    document.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { go(idx + Number(b.getAttribute('data-go')), true); });
    });
    go(0); restart();
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
