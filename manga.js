/* Interactive manga changelog: 3D carousel + open-volume reader */

(function () {
  'use strict';

  var gallery = document.getElementById('manga-gallery');
  if (!gallery) return;

  var stage = gallery.querySelector('.manga-stage');
  var volumes = Array.prototype.slice.call(gallery.querySelectorAll('.manga-volume'));
  var prevBtn = gallery.querySelector('.manga-arrow-prev');
  var nextBtn = gallery.querySelector('.manga-arrow-next');
  var readerPrev = document.querySelector('.manga-reader-nav.manga-arrow-prev');
  var readerNext = document.querySelector('.manga-reader-nav.manga-arrow-next');
  var closeBtn = document.querySelector('.manga-close');
  var dotsWrap = gallery.querySelector('.manga-dots');
  var live = gallery.querySelector('.manga-live');
  var backdrop = document.querySelector('.manga-backdrop');
  var reader = document.getElementById('manga-reader');

  var index = 0;
  var reading = false;
  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = reduceMq.matches;

  function currentLang() {
    return document.documentElement.lang === 'de' ? 'de' : 'en';
  }

  function volumeLabel(vol) {
    var lang = currentLang();
    var el = vol.querySelector('.manga-card-title .lang-' + lang) || vol.querySelector('.manga-card-title');
    return (el && el.textContent.trim()) || vol.getAttribute('data-volume');
  }

  function applyAlts() {
    var lang = currentLang();
    var imgs = document.querySelectorAll('#manga-gallery img[data-alt-en], #manga-reader img[data-alt-en]');
    for (var i = 0; i < imgs.length; i++) {
      var alt = imgs[i].getAttribute(lang === 'de' ? 'data-alt-de' : 'data-alt-en');
      if (alt) imgs[i].setAttribute('alt', alt);
    }
  }

  function announce() {
    if (!live) return;
    var vol = volumes[index];
    live.textContent = volumeLabel(vol);
  }

  function setHash(open) {
    var id = volumes[index].getAttribute('data-volume');
    var next = '#' + id + (open ? '-open' : '');
    if (location.hash !== next) {
      try { history.replaceState(null, '', next); } catch (e) {}
    }
  }

  function layout() {
    volumes.forEach(function (vol, i) {
      var offset = i - index;
      var abs = Math.abs(offset);
      vol.classList.toggle('is-selected', offset === 0);
      var btn = vol.querySelector('.manga-cover-btn');
      if (btn) {
        btn.setAttribute('aria-current', offset === 0 ? 'true' : 'false');
        btn.setAttribute('tabindex', abs > 3 ? '-1' : '0');
      }
      if (reading) return;

      vol.style.setProperty('--ox', String(offset));
      vol.style.setProperty('--abs', String(Math.min(abs, 4)));
      vol.style.setProperty('--scale', offset === 0 ? '1' : String(Math.max(0.74, 1 - abs * 0.09)));
      vol.style.transform = '';
      if (reduce) {
        vol.style.opacity = abs === 0 ? '1' : (abs === 1 ? '0.55' : '0');
        vol.style.filter = 'none';
      } else {
        vol.style.opacity = abs > 3 ? '0' : '1';
        vol.style.filter = offset === 0 ? 'none' : 'brightness(0.84)';
      }
      vol.style.zIndex = String(30 - abs);
      vol.style.pointerEvents = (reduce ? abs > 1 : abs > 3) ? 'none' : 'auto';
    });

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === volumes.length - 1;
    if (readerPrev) readerPrev.disabled = index === 0;
    if (readerNext) readerNext.disabled = index === volumes.length - 1;

    var dots = dotsWrap ? dotsWrap.querySelectorAll('.manga-dot') : [];
    for (var d = 0; d < dots.length; d++) {
      dots[d].setAttribute('aria-current', d === index ? 'true' : 'false');
    }
    announce();
  }

  function select(i, opts) {
    opts = opts || {};
    var next = Math.max(0, Math.min(volumes.length - 1, i));
    if (next === index && !opts.force) return;
    var changed = next !== index;
    index = next;
    if (reading && changed) {
      if (!reduce) {
        document.documentElement.classList.add('manga-flip');
        window.setTimeout(function () {
          document.documentElement.classList.remove('manga-flip');
        }, 420);
      }
      showSpread(volumes[index]);
    }
    layout();
    setHash(reading);
    if (opts.focus && volumes[index]) {
      var b = volumes[index].querySelector('.manga-cover-btn');
      if (b && !reading) b.focus();
    }
  }

  function restoreSpread() {
    if (!reader) return;
    var spread = reader.querySelector('.manga-spread');
    if (!spread) return;
    var homeId = spread.getAttribute('data-home');
    var home = homeId && document.querySelector('.manga-volume[data-volume="' + homeId + '"]');
    if (home) home.appendChild(spread);
  }

  function showSpread(vol) {
    if (!reader || !vol) return;
    restoreSpread();
    var spread = vol.querySelector('.manga-spread');
    if (!spread) return;
    spread.setAttribute('data-home', vol.getAttribute('data-volume'));
    reader.appendChild(spread);
    var headings = document.querySelectorAll('.manga-spread h2');
    for (var h = 0; h < headings.length; h++) headings[h].removeAttribute('id');
    var heading = spread.querySelector('h2');
    if (heading) heading.id = 'manga-reader-title';
  }

  function openVolume() {
    if (reading) return;
    reading = true;
    document.documentElement.classList.add('manga-reading');
    volumes[index].classList.add('is-open');
    showSpread(volumes[index]);
    if (reader) reader.hidden = false;
    setHash(true);
    if (backdrop) backdrop.hidden = false;
    if (closeBtn) {
      closeBtn.hidden = false;
      closeBtn.focus();
    }
  }

  function closeVolume() {
    if (!reading) return;
    reading = false;
    document.documentElement.classList.remove('manga-reading', 'manga-flip');
    volumes.forEach(function (vol) { vol.classList.remove('is-open'); });
    restoreSpread();
    if (reader) reader.hidden = true;
    setHash(false);
    layout();
    if (backdrop) backdrop.hidden = true;
    if (closeBtn) closeBtn.hidden = true;
    var b = volumes[index].querySelector('.manga-cover-btn');
    if (b) b.focus();
  }

  function onCoverClick(i) {
    return function () {
      if (i === index) openVolume();
      else select(i);
    };
  }

  volumes.forEach(function (vol, i) {
    var btn = vol.querySelector('.manga-cover-btn');
    if (btn) btn.addEventListener('click', onCoverClick(i));
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { select(index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { select(index + 1); });
  if (readerPrev) readerPrev.addEventListener('click', function () { select(index - 1); });
  if (readerNext) readerNext.addEventListener('click', function () { select(index + 1); });
  if (closeBtn) closeBtn.addEventListener('click', closeVolume);
  if (backdrop) backdrop.addEventListener('click', closeVolume);

  if (dotsWrap) {
    dotsWrap.addEventListener('click', function (e) {
      var dot = e.target.closest('.manga-dot');
      if (!dot) return;
      var i = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(i)) select(i);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) return;
    if (reading && e.key === 'Tab') {
      var cycle = [closeBtn, readerPrev, readerNext].filter(function (el) {
        return el && !el.hidden && !el.disabled;
      });
      if (!cycle.length) return;
      var active = document.activeElement;
      var at = cycle.indexOf(active);
      if (e.shiftKey) {
        if (at <= 0) { e.preventDefault(); cycle[cycle.length - 1].focus(); }
      } else if (at === cycle.length - 1 || at === -1) {
        e.preventDefault();
        cycle[0].focus();
      }
      return;
    }
    if (e.key === 'Escape' && reading) {
      e.preventDefault();
      closeVolume();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      select(index - 1, { focus: !reading });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      select(index + 1, { focus: !reading });
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0, { focus: !reading });
    } else if (e.key === 'End') {
      e.preventDefault();
      select(volumes.length - 1, { focus: !reading });
    } else if ((e.key === 'Enter' || e.key === ' ') && !reading) {
      var active = document.activeElement;
      if (active && active.classList.contains('manga-cover-btn')) return;
      if (gallery.contains(active) || active === document.body || active === document.documentElement) {
        e.preventDefault();
        openVolume();
      }
    }
  });

  /* swipe / drag */
  var pointerId = null;
  var startX = 0;
  var tracking = false;

  stage.addEventListener('pointerdown', function (e) {
    if (reading) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    tracking = true;
  });

  stage.addEventListener('pointerup', function (e) {
    if (!tracking || e.pointerId !== pointerId) return;
    tracking = false;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 42) {
      if (dx < 0) select(index + 1);
      else select(index - 1);
    }
  });

  stage.addEventListener('pointercancel', function () { tracking = false; });

  document.addEventListener('maeuse:lang', applyAlts);

  function syncReduce(on) {
    reduce = on;
    document.documentElement.classList.toggle('manga-reduce', on);
    layout();
  }
  if (reduceMq.addEventListener) reduceMq.addEventListener('change', function (e) { syncReduce(e.matches); });
  else if (reduceMq.addListener) reduceMq.addListener(function (e) { syncReduce(e.matches); });

  window.addEventListener('resize', function () {
    layout();
  });

  function fromHash() {
    var raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return { i: 0, open: false };
    var open = /-open$/.test(raw);
    var id = raw.replace(/-open$/, '');
    for (var i = 0; i < volumes.length; i++) {
      if (volumes[i].getAttribute('data-volume') === id) return { i: i, open: open };
    }
    return { i: 0, open: false };
  }

  window.addEventListener('hashchange', function () {
    var h = fromHash();
    select(h.i, { force: true });
    if (h.open && !reading) openVolume();
    if (!h.open && reading) closeVolume();
  });

  document.documentElement.classList.add('manga-js');
  document.documentElement.classList.toggle('manga-reduce', reduce);
  applyAlts();

  var initial = fromHash();
  index = initial.i;
  layout();
  document.documentElement.classList.add('manga-ready');
  if (initial.open) openVolume();
})();
