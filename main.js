/* MAXCOIN — interactions */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── copy contract ─────────────────────────────────────── */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var done = function () {
        var label = btn.textContent;
        btn.textContent = 'copied';
        btn.classList.add('is-done');
        setTimeout(function () {
          btn.textContent = label;
          btn.classList.remove('is-done');
        }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* nothing to do */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ── mobile menu ───────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── reveal on scroll ──────────────────────────────────── */
  var targets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduced) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 5, 4) * 55) + 'ms';
      io.observe(el);
    });
  }

  /* ── rolling hash under the mark ───────────────────────── */
  var hashEl = document.getElementById('hash');
  var HEX = '0123456789abcdef';

  if (hashEl && !reduced) {
    setInterval(function () {
      var out = '0x';
      for (var i = 0; i < 16; i++) out += HEX[(Math.random() * 16) | 0];
      hashEl.textContent = out;
    }, 780);
  }

  /* ── hero hash field ───────────────────────────────────── */
  var canvas = document.getElementById('hashfield');
  if (!canvas || reduced) return;

  var ctx = canvas.getContext('2d');
  var cols = [];
  var step = 18;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;

  function size() {
    var rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = '11px "JetBrains Mono", monospace';

    var count = Math.ceil(w / step);
    cols = [];
    for (var i = 0; i < count; i++) {
      cols.push({
        y: Math.random() * h,
        speed: 0.22 + Math.random() * 0.55,
        alpha: 0.08 + Math.random() * 0.20
      });
    }
  }

  var last = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (now - last < 55) return;
    last = now;

    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < cols.length; i++) {
      var c = cols[i];
      var x = i * step + 4;

      for (var j = 0; j < 5; j++) {
        var y = c.y - j * 15;
        if (y < -12 || y > h + 12) continue;
        ctx.fillStyle = 'rgba(59,102,255,' + (c.alpha * (1 - j / 5)).toFixed(3) + ')';
        ctx.fillText(HEX[(Math.random() * 16) | 0], x, y);
      }

      c.y += c.speed;
      if (c.y > h + 60) {
        c.y = -Math.random() * 90;
        c.speed = 0.22 + Math.random() * 0.55;
        c.alpha = 0.08 + Math.random() * 0.20;
      }
    }
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(size, 160);
  });

  size();
  requestAnimationFrame(frame);
})();
