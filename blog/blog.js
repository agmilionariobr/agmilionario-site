(function () {
  /* Menu mobile */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  /* E-mail montado via JS (o Cloudflare ofusca mailto: escritos no HTML) */
  document.querySelectorAll('[data-email]').forEach(function (el) {
    var addr = el.getAttribute('data-email') + '@' + 'agmilionario.com.br';
    el.href = 'mailto:' + addr;
    el.textContent = addr;
  });

  /* Filtro por categoria (página do blog) */
  var chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip); });
      document.querySelectorAll('[data-category]').forEach(function (card) {
        card.hidden = f !== 'all' && card.getAttribute('data-category') !== f;
      });
    });
  });

  /* Barra de progresso de leitura */
  var bar = document.querySelector('.progress');
  var article = document.querySelector('.prose');
  if (bar && article) {
    var update = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var pct = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.style.width = (pct * 100) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* Sumário: destaca a seção atual */
  var links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    document.querySelectorAll('.prose h2[id]').forEach(function (h) { obs.observe(h); });
  }

  /* Copiar link */
  var copy = document.querySelector('[data-copy]');
  if (copy) {
    copy.addEventListener('click', function () {
      var done = function () { copy.setAttribute('aria-label', 'Link copiado'); copy.title = 'Link copiado'; };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done);
    });
  }
})();
