/* Interactive manga changelog: 3D carousel + open-volume reader.
   The homepage mounts the same markup from changelog.html. */

(function () {
  'use strict';

  function boot() {
    var gallery = document.getElementById('manga-gallery');
    if (!gallery) return;

    var embedded = !gallery.closest('main.manga-main');
    var root = document.documentElement;
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
    var pos = 0;
    var reading = false;
    var leaving = false;
    var spread = null;
    var running = null;
    var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    var stackedMq = window.matchMedia('(max-width: 760px)');
    var hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    var reduce = reduceMq.matches;
    var canAnimate = typeof Element.prototype.animate === 'function';

    function clampIndex(i) {
      return Math.max(0, Math.min(volumes.length - 1, i));
    }

    function currentLang() {
      return root.lang === 'de' ? 'de' : 'en';
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
      if (live) live.textContent = volumeLabel(volumes[index]);
    }

    function setHash(open) {
      if (embedded) return;
      var id = volumes[index].getAttribute('data-volume');
      var next = '#' + id + (open ? '-open' : '');
      if (location.hash !== next) {
        try { history.replaceState(null, '', next); } catch (e) {}
      }
    }

    /* ---------- carousel ---------- */

    // Places one cover at a (possibly fractional) offset from the front slot.
    function place(vol, o) {
      var a = Math.abs(o);
      var s = o < 0 ? -1 : 1;
      var near = Math.min(a, 1);
      var far = Math.max(0, a - 1);
      vol.style.setProperty('--tx', (s * (near * 0.8 + far * 0.5)).toFixed(4));
      vol.style.setProperty('--rot', (-s * near * 34).toFixed(3));
      vol.style.setProperty('--tz', (-(near * 120 + far * 50)).toFixed(2));
      vol.style.setProperty('--scale', (1 - near * 0.1 - far * 0.05).toFixed(4));
      vol.style.setProperty('--near', near.toFixed(4));
      if (reduce) {
        vol.style.opacity = a < 0.5 ? '1' : (a <= 1.5 ? '0.55' : '0');
        vol.style.pointerEvents = a > 1.5 ? 'none' : 'auto';
      } else {
        vol.style.opacity = String(Math.max(0, Math.min(1, 4 - a)));
        vol.style.pointerEvents = a > 3 ? 'none' : 'auto';
      }
      vol.style.zIndex = String(Math.round(100 - a * 10));
    }

    function render(p) {
      pos = p;
      volumes.forEach(function (vol, i) { place(vol, i - p); });
    }

    // Panel art is lazy inside the hidden spreads; fetch it once a volume is
    // near the front so the pages are ready when the book opens.
    function prefetch(vol) {
      var imgs = vol.querySelectorAll('.manga-spread img[loading="lazy"]');
      for (var i = 0; i < imgs.length; i++) imgs[i].loading = 'eager';
    }

    function layout() {
      volumes.forEach(function (vol, i) {
        var offset = i - index;
        var abs = Math.abs(offset);
        vol.classList.toggle('is-selected', offset === 0);
        vol.classList.toggle('is-out', reading && offset === 0);
        var prefetchRadius = embedded ? (reading ? 1 : 0) : 1;
        if (abs <= prefetchRadius) prefetch(vol);
        var btn = vol.querySelector('.manga-cover-btn');
        if (btn) {
          btn.setAttribute('aria-current', offset === 0 ? 'true' : 'false');
          btn.setAttribute('tabindex', abs > 3 ? '-1' : '0');
        }
      });
      render(index);

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
      if (leaving) return;
      var next = clampIndex(i);
      if (next === index && !opts.force) return;
      var prev = index;
      index = next;
      if (reading && next !== prev) turnTo(next > prev ? 1 : -1);
      layout();
      setHash(reading);
      if (opts.focus && !reading) {
        var b = volumes[index].querySelector('.manga-cover-btn');
        if (b) b.focus({ preventScroll: true });
      }
    }

    /* ---------- animation bookkeeping ---------- */

    // Runs a set of Web Animations as one job; a new action can settle it early.
    function run(anims, done) {
      var job = { over: false };
      job.finish = function () {
        if (job.over) return;
        job.over = true;
        if (running === job) running = null;
        anims.forEach(function (a) { a.cancel(); });
        done();
      };
      running = job;
      Promise.all(anims.map(function (a) { return a.finished; })).then(job.finish, job.finish);
    }

    function settle() {
      if (running) running.finish();
    }

    function stripIds(node) {
      if (node.id) node.removeAttribute('id');
      var withId = node.querySelectorAll('[id]');
      for (var i = 0; i < withId.length; i++) withId[i].removeAttribute('id');
    }

    /* ---------- reader ---------- */

    function mountSpread(vol) {
      var sp = vol.querySelector('.manga-spread');
      if (!sp) return null;
      sp.setAttribute('data-home', vol.getAttribute('data-volume'));
      sp.style.setProperty('--cover', vol.style.getPropertyValue('--cover'));
      reader.appendChild(sp);
      var headings = document.querySelectorAll('.manga-spread h2');
      for (var h = 0; h < headings.length; h++) headings[h].removeAttribute('id');
      var heading = sp.querySelector('h2');
      if (heading) heading.id = 'manga-reader-title';
      return sp;
    }

    function unmountSpread(sp) {
      if (!sp) return;
      sp.classList.remove('is-revealing', 'is-stamping', 'is-flying', 'is-turning', 'manga-ghost');
      sp.removeAttribute('style');
      var home = document.querySelector('.manga-volume[data-volume="' + sp.getAttribute('data-home') + '"]');
      if (home) home.appendChild(sp);
    }

    function reveal(sp, full) {
      sp.classList.remove('is-revealing', 'is-stamping');
      void sp.offsetWidth;
      sp.classList.add(full ? 'is-revealing' : 'is-stamping');
    }

    function rectIn(el, base) {
      var r = el.getBoundingClientRect();
      return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
    }

    // Flies the spread between the shelf cover and the centre of the screen.
    // The cover itself swings open around the spine like a real book.
    function flyBook(sp, vol, cover, closing, done) {
      var book = !stackedMq.matches;
      if (book) sp.classList.add('is-flying');
      var R = sp.getBoundingClientRect();
      var left = sp.querySelector('.manga-page-left');
      var t = book
        ? rectIn(sp.querySelector('.manga-page-right'), R)
        : { x: 0, y: 0, w: R.width, h: Math.min(R.height, R.width * 4 / 3) };

      var sx = cover.width / t.w;
      var sy = cover.height / t.h;
      var tx = cover.left - (R.left + t.x * sx);
      var ty = cover.top - (R.top + t.y * sy);

      var leaf = document.createElement('div');
      leaf.className = 'manga-leaf';
      leaf.setAttribute('aria-hidden', 'true');
      var pic = vol.querySelector('.manga-cover-3d picture');
      if (pic) leaf.appendChild(pic.cloneNode(true));
      leaf.style.left = (t.x - sp.clientLeft) + 'px';
      leaf.style.top = (t.y - sp.clientTop) + 'px';
      leaf.style.width = t.w + 'px';
      leaf.style.height = t.h + 'px';
      sp.appendChild(leaf);
      if (!book) sp.style.perspectiveOrigin = '50% ' + (t.h / 2) + 'px';

      function order(frames) { return closing ? frames.slice().reverse() : frames; }

      var shelf = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + sx + ', ' + sy + ')';
      var flight;
      if (book) {
        flight = order([{ transform: shelf }, { transform: 'none' }]);
      } else {
        // Stacked pages: keep the rest of the page tucked behind the cover
        // until it has started to swing open.
        var shut = 'inset(0 0 ' + (R.height - t.h) + 'px 0 round 8px)';
        var full = 'inset(0 0 0 0 round 10px)';
        var ease = closing ? 'cubic-bezier(0.55, 0, 0.3, 1)' : 'cubic-bezier(0.25, 0.8, 0.25, 1)';
        flight = closing
          ? [{ transform: 'none', clipPath: full, easing: ease }, { offset: 0.6, clipPath: shut }, { transform: shelf, clipPath: shut }]
          : [{ transform: shelf, clipPath: shut, easing: ease }, { offset: 0.4, clipPath: shut, easing: 'ease-out' }, { transform: 'none', clipPath: full }];
      }

      var anims = [];
      anims.push(sp.animate(flight, {
        duration: closing ? 560 : 720,
        delay: closing ? 140 : 0,
        easing: book ? (closing ? 'cubic-bezier(0.55, 0, 0.3, 1)' : 'cubic-bezier(0.25, 0.8, 0.25, 1)') : 'linear',
        fill: 'both'
      }));

      var swing = { duration: closing ? 480 : 640, delay: closing ? 0 : 120, easing: 'cubic-bezier(0.45, 0.05, 0.35, 1)', fill: 'both' };
      var openTo = book ? -180 : -100;
      anims.push(leaf.animate(order([
        { transform: 'rotateY(0deg)', filter: 'brightness(1)' },
        { transform: 'rotateY(' + openTo / 2 + 'deg)', filter: 'brightness(0.82)' },
        { transform: 'rotateY(' + openTo + 'deg)', filter: 'brightness(0.82)' }
      ]), swing));
      if (book) {
        left.style.transformOrigin = 'right center';
        left.style.backfaceVisibility = 'hidden';
        anims.push(left.animate(order([
          { transform: 'rotateY(180deg)', filter: 'brightness(0.82)' },
          { transform: 'rotateY(90deg)', filter: 'brightness(0.82)' },
          { transform: 'rotateY(0deg)', filter: 'brightness(1)' }
        ]), swing));
      }

      run(anims, function () {
        leaf.remove();
        left.style.transformOrigin = '';
        left.style.backfaceVisibility = '';
        sp.style.perspectiveOrigin = '';
        sp.classList.remove('is-flying');
        done();
      });
    }

    function openVolume() {
      if (reading) return;
      settle();
      var vol = volumes[index];
      resetTilt();
      reading = true;
      var scrollbar = window.innerWidth - root.clientWidth;
      root.style.setProperty('--manga-sbw', scrollbar + 'px');
      root.classList.add('manga-reading');
      var cover = vol.querySelector('.manga-cover-3d').getBoundingClientRect();
      spread = mountSpread(vol);
      var animate = spread && !reduce && canAnimate;
      // Drop the page frame before the first style pass so it fades in, not out.
      if (animate && !stackedMq.matches) spread.classList.add('is-flying');
      if (reader) reader.hidden = false;
      if (closeBtn) closeBtn.hidden = false;
      void root.offsetWidth;
      root.classList.add('manga-open');
      setHash(true);
      layout();
      if (closeBtn) closeBtn.focus({ preventScroll: true });
      if (!spread) return;
      reveal(spread, true);
      if (animate) flyBook(spread, vol, cover, false, function () {});
    }

    function closeVolume() {
      if (!reading) return;
      settle();
      var vol = volumes[index];
      var sp = spread;
      leaving = true;
      root.classList.remove('manga-open');
      setHash(false);

      function done() {
        reading = false;
        leaving = false;
        root.classList.remove('manga-reading');
        unmountSpread(sp);
        if (spread === sp) spread = null;
        if (reader) reader.hidden = true;
        if (closeBtn) closeBtn.hidden = true;
        layout();
        var b = vol.querySelector('.manga-cover-btn');
        if (b) b.focus({ preventScroll: true });
      }

      if (reduce || !canAnimate || !sp) { done(); return; }
      var cover = vol.querySelector('.manga-cover-3d').getBoundingClientRect();
      flyBook(sp, vol, cover, true, done);
    }

    function ghostPage(clone, at, cover) {
      stripIds(clone);
      clone.classList.add('manga-ghost-page');
      clone.setAttribute('aria-hidden', 'true');
      clone.style.left = at.offsetLeft + 'px';
      clone.style.top = at.offsetTop + 'px';
      clone.style.width = at.offsetWidth + 'px';
      clone.style.height = at.offsetHeight + 'px';
      clone.style.setProperty('--cover', cover);
      return clone;
    }

    // Book layout: the old page turns over the spine to reveal the next volume.
    // Stacked layout: the volumes slide past each other.
    function turnTo(dir) {
      settle();
      var old = spread;
      var animate = old && !reduce && canAnimate;
      var stacked = stackedMq.matches;
      var oldCover = old ? old.style.getPropertyValue('--cover') : '';
      var oldLeft = null;
      var oldRight = null;

      if (animate && stacked) {
        // Pin the outgoing spread in place so it leaves the reader's flex flow.
        var r = old.getBoundingClientRect();
        old.classList.add('manga-ghost');
        old.style.left = r.left + 'px';
        old.style.top = r.top + 'px';
        old.style.width = r.width + 'px';
        old.style.height = r.height + 'px';
      } else {
        if (animate) {
          oldLeft = old.querySelector('.manga-page-left').cloneNode(true);
          oldRight = old.querySelector('.manga-page-right').cloneNode(true);
        }
        unmountSpread(old);
      }

      var next = mountSpread(volumes[index]);
      spread = next;
      if (!animate || !next) return;

      if (stacked) {
        var slide = { duration: 440, easing: 'cubic-bezier(0.3, 0.7, 0.2, 1)', fill: 'both' };
        run([
          old.animate([{ transform: 'none' }, { transform: 'translateX(' + (-dir * 112) + '%)' }], slide),
          next.animate([{ transform: 'translateX(' + (dir * 112) + '%)' }, { transform: 'none' }], slide)
        ], function () {
          unmountSpread(old);
          reveal(next, false);
        });
        return;
      }

      var newLeft = next.querySelector('.manga-page-left');
      var newRight = next.querySelector('.manga-page-right');
      var forward = dir > 0;
      var under = ghostPage(forward ? oldLeft : oldRight, forward ? newLeft : newRight, oldCover);
      var leaf = ghostPage(forward ? oldRight : oldLeft, forward ? newRight : newLeft, oldCover);
      var incoming = forward ? newLeft : newRight;

      next.classList.add('is-turning');
      leaf.classList.add('manga-ghost-leaf');
      leaf.style.transformOrigin = forward ? 'left center' : 'right center';
      incoming.style.transformOrigin = forward ? 'right center' : 'left center';
      incoming.style.backfaceVisibility = 'hidden';
      incoming.style.zIndex = '2';
      next.appendChild(under);
      next.appendChild(leaf);

      var sign = forward ? -1 : 1;
      var turn = { duration: 660, easing: 'cubic-bezier(0.45, 0.05, 0.3, 1)', fill: 'both' };
      run([
        leaf.animate([
          { transform: 'rotateY(0deg)', filter: 'brightness(1)' },
          { transform: 'rotateY(' + sign * 90 + 'deg)', filter: 'brightness(0.8)' },
          { transform: 'rotateY(' + sign * 180 + 'deg)', filter: 'brightness(0.8)' }
        ], turn),
        incoming.animate([
          { transform: 'rotateY(' + -sign * 180 + 'deg)', filter: 'brightness(0.8)' },
          { transform: 'rotateY(' + -sign * 90 + 'deg)', filter: 'brightness(0.8)' },
          { transform: 'rotateY(0deg)', filter: 'brightness(1)' }
        ], turn)
      ], function () {
        under.remove();
        leaf.remove();
        incoming.style.transformOrigin = '';
        incoming.style.backfaceVisibility = '';
        incoming.style.zIndex = '';
        next.classList.remove('is-turning');
        reveal(next, false);
      });
    }

    /* ---------- front-cover tilt ---------- */

    function resetTilt() {
      var tilted = gallery.querySelectorAll('.manga-cover-3d.is-tilting');
      for (var i = 0; i < tilted.length; i++) {
        tilted[i].classList.remove('is-tilting');
        tilted[i].style.removeProperty('--tilt-x');
        tilted[i].style.removeProperty('--tilt-y');
      }
    }

    stage.addEventListener('pointermove', function (e) {
      if (drag || reading || reduce || e.pointerType !== 'mouse' || !hoverMq.matches) return;
      var vol = volumes[index];
      var cover = vol.querySelector('.manga-cover-3d');
      var r = vol.getBoundingClientRect();
      var h = r.width * 4 / 3;
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / h - 0.5;
      if (Math.abs(px) > 0.6 || Math.abs(py) > 0.6) { resetTilt(); return; }
      cover.classList.add('is-tilting');
      cover.style.setProperty('--tilt-x', (px * 24).toFixed(2));
      cover.style.setProperty('--tilt-y', (-py * 18).toFixed(2));
    });
    stage.addEventListener('pointerleave', resetTilt);

    /* ---------- drag / swipe with follow-through ---------- */

    var drag = null;
    var suppressClick = false;

    function stepPx() {
      return (volumes[0].offsetWidth || 200) * 0.8;
    }

    function rubber(p) {
      var max = volumes.length - 1;
      if (p < 0) return p * 0.3;
      if (p > max) return max + (p - max) * 0.3;
      return p;
    }

    stage.addEventListener('pointerdown', function (e) {
      if (reading || e.button > 0) return;
      settle();
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, p0: pos, moved: false, samples: [{ x: e.clientX, t: e.timeStamp }] };
    });

    stage.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x0;
      if (!drag.moved) {
        if (Math.abs(dx) < 6) return;
        if (Math.abs(e.clientY - drag.y0) > Math.abs(dx)) { drag = null; return; }
        drag.moved = true;
        stage.classList.add('is-dragging');
        resetTilt();
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      }
      drag.samples.push({ x: e.clientX, t: e.timeStamp });
      if (drag.samples.length > 8) drag.samples.shift();
      render(rubber(drag.p0 - dx / stepPx()));
    });

    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag;
      drag = null;
      if (!d.moved) return;
      stage.classList.remove('is-dragging');
      suppressClick = true;
      window.setTimeout(function () { suppressClick = false; }, 0);
      var last = d.samples[d.samples.length - 1];
      var recent = d.samples.filter(function (s) { return last.t - s.t <= 100; });
      var first = recent[0];
      var v = e.type === 'pointerup' && last.t > first.t ? (last.x - first.x) / (last.t - first.t) : 0;
      var projected = pos - (v * 180) / stepPx();
      select(Math.round(projected), { force: true });
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('click', function (e) {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
    }, true);
    stage.addEventListener('dragstart', function (e) { e.preventDefault(); });

    /* ---------- horizontal trackpad / shift-wheel ---------- */

    var wheelPos = null;
    var wheelTimer = 0;

    stage.addEventListener('wheel', function (e) {
      if (reading || drag) return;
      var dx = e.deltaX;
      if (!dx && e.shiftKey) dx = e.deltaY;
      if (!dx || Math.abs(dx) < Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      if (e.deltaMode === 1) dx *= 16;
      if (wheelPos === null) {
        settle();
        wheelPos = pos;
        stage.classList.add('is-dragging');
        resetTilt();
      }
      wheelPos = Math.max(-1, Math.min(volumes.length, wheelPos + dx / (stepPx() * 1.4)));
      render(rubber(wheelPos));
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(function () {
        stage.classList.remove('is-dragging');
        var target = Math.round(wheelPos);
        var travel = wheelPos - index;
        if (target === index && Math.abs(travel) >= 0.2) target = index + (travel > 0 ? 1 : -1);
        wheelPos = null;
        select(target, { force: true });
      }, 140);
    }, { passive: false });

    /* ---------- swipe between volumes inside the reader ---------- */

    var readerSwipe = null;

    if (reader) {
      reader.addEventListener('pointerdown', function (e) {
        if (!reading || e.pointerType === 'mouse') return;
        readerSwipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
      });
      reader.addEventListener('pointerup', function (e) {
        if (!readerSwipe || e.pointerId !== readerSwipe.id) return;
        var dx = e.clientX - readerSwipe.x;
        var dy = e.clientY - readerSwipe.y;
        readerSwipe = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1));
      });
      reader.addEventListener('pointercancel', function () { readerSwipe = null; });
    }

    /* ---------- buttons & keys ---------- */

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
      if (embedded) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (!reading) {
          var active = document.activeElement;
          if (!active || !gallery.contains(active)) return;
        }
      }
      if (e.defaultPrevented) return;
      if (reading && e.key === 'Tab') {
        var cycle = [closeBtn, readerPrev, readerNext].filter(function (el) {
          return el && !el.hidden && !el.disabled && el.offsetParent !== null;
        });
        if (!cycle.length) return;
        var focused = document.activeElement;
        var at = cycle.indexOf(focused);
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
        if (gallery.contains(active) || active === document.body || active === root) {
          e.preventDefault();
          openVolume();
        }
      }
    });

    function applyMangaCopy() {
      var packs = window.MAEUSE_MANGA_STRINGS || {};
      var pack = packs[currentLang()] || {};
      var nodes = document.querySelectorAll('[data-i18n="mangaContents"], [data-i18n="mangaContinued"]');
      for (var n = 0; n < nodes.length; n++) {
        var key = nodes[n].getAttribute('data-i18n');
        if (pack[key] != null) nodes[n].textContent = pack[key];
      }
      var ariaNodes = document.querySelectorAll('#manga-gallery [data-i18n-aria], .manga-close[data-i18n-aria], .manga-reader-nav[data-i18n-aria]');
      for (var a = 0; a < ariaNodes.length; a++) {
        var ariaKey = ariaNodes[a].getAttribute('data-i18n-aria');
        if (pack[ariaKey] != null) ariaNodes[a].setAttribute('aria-label', pack[ariaKey]);
      }
      var de = currentLang() === 'de';
      var labels = document.querySelectorAll('#manga-gallery .lang-en, #manga-gallery .lang-de, #manga-reader .lang-en, #manga-reader .lang-de');
      for (var b = 0; b < labels.length; b++) {
        var isGerman = labels[b].classList.contains('lang-de');
        labels[b].hidden = isGerman ? !de : de;
      }
    if (embedded) {
      var storyTitle = document.getElementById('story-title');
      if (storyTitle) gallery.setAttribute('aria-labelledby', 'story-title');
    }
    applyAlts();
  }

  document.addEventListener('maeuse:lang', function () {
    applyMangaCopy();
    if (volumes.length) announce();
  });

    function syncReduce(on) {
      reduce = on;
      root.classList.toggle('manga-reduce', on);
      if (on) settle();
      layout();
    }
    if (reduceMq.addEventListener) reduceMq.addEventListener('change', function (e) { syncReduce(e.matches); });
    else if (reduceMq.addListener) reduceMq.addListener(function (e) { syncReduce(e.matches); });

    window.addEventListener('resize', function () {
      settle();
      layout();
    });

    function fromHash() {
      if (embedded) return { i: 0, open: false };
      var raw = (location.hash || '').replace(/^#/, '');
      if (!raw) return { i: 0, open: false };
      var open = /-open$/.test(raw);
      var id = raw.replace(/-open$/, '');
      for (var i = 0; i < volumes.length; i++) {
        if (volumes[i].getAttribute('data-volume') === id) return { i: i, open: open };
      }
      return { i: 0, open: false };
    }

    if (!embedded) window.addEventListener('hashchange', function () {
      var h = fromHash();
      select(h.i, { force: true });
      if (h.open && !reading) openVolume();
      if (!h.open && reading) closeVolume();
    });

    root.classList.add('manga-js');
    root.classList.toggle('manga-reduce', reduce);
    applyMangaCopy();

    var initial = fromHash();
    index = initial.i;
    layout();
    root.classList.add('manga-ready');
    if (initial.open) openVolume();

    var slot = document.getElementById('manga-slot');
    if (slot) {
      slot.classList.add('is-ready');
      slot.removeAttribute('aria-busy');
    }
  }

  function ensureMangaCss() {
    var existing = document.querySelector('link[href="manga.css"]');
    if (existing && existing.sheet) return Promise.resolve();
    return new Promise(function (resolve) {
      var link = existing || document.createElement('link');
      var settled = false;
      function done() {
        if (settled) return;
        settled = true;
        resolve();
      }
      link.addEventListener('load', done);
      link.addEventListener('error', done);
      if (!existing) {
        link.rel = 'stylesheet';
        link.href = 'manga.css';
        document.head.appendChild(link);
      }
      if (link.sheet) done();
    });
  }

  function mountHomepageGallery() {
    var slot = document.getElementById('manga-slot');
    if (!slot || document.getElementById('manga-gallery')) return;
    slot.classList.add('is-pending');
    slot.setAttribute('aria-busy', 'true');
    var started = false;

    function fail() {
      slot.classList.add('is-failed');
      slot.removeAttribute('aria-busy');
      var fallback = document.getElementById('manga-fallback');
      if (fallback) fallback.hidden = false;
    }

    function start() {
      if (started) return;
      started = true;
      var cssReady = ensureMangaCss();
      var htmlReady = fetch('changelog.html', { credentials: 'same-origin' }).then(function (res) {
        if (!res.ok) throw new Error('changelog');
        return res.text();
      });
      Promise.all([cssReady, htmlReady]).then(function (results) {
        var doc = new DOMParser().parseFromString(results[1], 'text/html');
        var gallery = doc.getElementById('manga-gallery');
        var backdrop = doc.querySelector('.manga-backdrop');
        var reader = doc.getElementById('manga-reader');
        var closeBtn = doc.querySelector('.manga-close');
        var navs = doc.querySelectorAll('.manga-reader-nav');
        if (!gallery || !backdrop || !reader || !closeBtn || navs.length < 2) throw new Error('markup');
        var covers = gallery.querySelectorAll('.manga-cover-img');
        for (var i = 0; i < covers.length; i++) {
          covers[i].setAttribute('loading', 'lazy');
          covers[i].removeAttribute('fetchpriority');
        }
        document.documentElement.classList.add('manga-js');
        slot.appendChild(gallery);
        document.body.appendChild(backdrop);
        document.body.appendChild(reader);
        document.body.appendChild(closeBtn);
        for (var n = 0; n < navs.length; n++) document.body.appendChild(navs[n]);
        boot();
      }).catch(fail);
    }

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          io.disconnect();
          start();
          return;
        }
      }
    }, { rootMargin: '640px 0px', threshold: 0.01 });
    io.observe(slot);
  }

  if (document.getElementById('manga-gallery')) boot();
  else mountHomepageGallery();
})();
