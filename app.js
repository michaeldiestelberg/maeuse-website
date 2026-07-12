/* ===== Mäuse marketing site — theme, language, phone mockup ===== */

(function () {
  'use strict';

  /* ---------- i18n ---------- */

  var strings = {
    en: {
      navFeatures: 'Features', navVoice: 'Voice', navPrivacy: 'Privacy', navGet: 'Get the app',
      badge: 'NEW · NOW ON THE APP STORE',
      h1a: 'Say what you spent.', h1b: 'That’s it.',
      heroSub: 'Mäuse is the expense tracker for you and your favorite Maus. Log it, slice the cheese, and always know who owes what - right on your iPhone.',
      voiceHint: '“Paid forty-two fifty for dinner at Luigi’s” - logged.',
      downloadCta: 'Download on the App Store', viewSource: 'View the source',
      slang: '“Mäuse” is German slang for money - literally “mice”.',
      tapAround: 'GO AHEAD, IT’S THE REAL APP - TAP AROUND',
      featTitle: 'Everything a Maus needs.', featSub: 'Nothing that nibbles at your attention.',
      f1t: 'Fast as a mouse', f1b: 'Amount, note, done. Logging an expense takes seconds, not taps.',
      f2t: 'Slice the cheese', f2b: 'Split by percent or a fixed amount, with preset chips for the usual 50 / 30 / 70 / 100.',
      f3t: 'Squeak to log', f3b: 'Say what you spent - even a few things at once. Mäuse drafts them, you tap save.',
      f4t: 'The monthly stash', f4b: 'Totals per month and exactly what your Maus owes you. No spreadsheets, no math.',
      vTitle: 'Talk. It’s logged.',
      v1t: 'Tap the mic', v1b: 'It’s right there on the main screen.',
      v2t: 'Squeak away', v2b: '“Flowers for 12, cinema tickets for 24 - split both in half.”',
      v3t: 'Check the trap', v3b: 'Review the drafts it caught, then save them all at once.',
      vNote: 'Voice mode is the one feature that talks to the cloud - transcription uses your own OpenAI API key, and the key never leaves your device.',
      pTitle: 'No cloud. No account. No crumbs.',
      pSub: 'Your expenses live on your phone and nowhere else. There’s no server, no sign-up, no one peeking in the pantry.',
      p1t: 'Everything stays on your device.', p1b: 'Expenses are stored locally on your iPhone. Nothing is sent anywhere.',
      p2t: 'Works offline.', p2b: 'On a plane, in the basement, in a mouse hole - logging always works.',
      p3t: 'No account, no tracking.', p3b: 'No sign-up, no analytics, no telemetry. Zero data collection.',
      p4t: 'Portable backups.', p4b: 'Export your data as a file, import it anywhere. You own it.',
      p5t: 'One optional cloud connection.', p5b: 'Voice mode sends audio to OpenAI for transcription with your own API key. Everything else is 100% offline, and the key is excluded from backups.',
      osTitle: 'Open source, down to the last crumb.',
      osBody: 'Every line of Mäuse is on GitHub. Read it, fork it, build it yourself - nothing up our sleeves.',
      osCta: 'Browse the code',
      dlTitle: 'The trap is set.',
      dlBody: 'Mäuse is free on the App Store. Grab it, bring your own Maus, and never argue about who paid for dinner again.',
      dlMeta: 'Free · iPhone · No account required',
      footerTag: 'Made for couples who keep it simple.'
    },
    de: {
      navFeatures: 'Funktionen', navVoice: 'Sprachmodus', navPrivacy: 'Privatsphäre', navGet: 'App holen',
      badge: 'NEU · JETZT IM APP STORE',
      h1a: 'Sag, was du ausgegeben hast.', h1b: 'Mehr nicht.',
      heroSub: 'Mäuse ist der Ausgaben-Tracker für dich und deine Lieblingsmaus. Eintragen, den Käse teilen und immer wissen, wer wem was schuldet - direkt auf deinem iPhone.',
      voiceHint: '„Zweiundvierzig fünfzig fürs Abendessen bei Luigi“ - erfasst.',
      downloadCta: 'Jetzt im App Store laden', viewSource: 'Quellcode ansehen',
      slang: '„Mäuse“ ist umgangssprachlich Geld - wortwörtlich: Mäuse.',
      tapAround: 'NUR ZU, DAS IST DIE ECHTE APP - TIPP DICH DURCH',
      featTitle: 'Alles, was eine Maus braucht.', featSub: 'Nichts, was an deiner Aufmerksamkeit knabbert.',
      f1t: 'Flink wie eine Maus', f1b: 'Betrag, Notiz, fertig. Eine Ausgabe ist in Sekunden drin - nicht in Minuten.',
      f2t: 'Den Käse teilen', f2b: 'Nach Prozent oder festem Betrag, mit Chips für die üblichen 50 / 30 / 70 / 100.',
      f3t: 'Piepsen statt tippen', f3b: 'Sag, was du ausgegeben hast - auch mehrere Dinge auf einmal. Mäuse entwirft die Einträge, du tippst auf Speichern.',
      f4t: 'Der Monatsvorrat', f4b: 'Monatssummen und genau das, was deine Maus dir schuldet. Keine Tabellen, kein Kopfrechnen.',
      vTitle: 'Sprich. Schon erfasst.',
      v1t: 'Tipp aufs Mikro', v1b: 'Sitzt direkt auf dem Hauptbildschirm.',
      v2t: 'Piepse los', v2b: '„Blumen für 12, Kinokarten für 24 - beides halbe-halbe.“',
      v3t: 'Schau in die Falle', v3b: 'Prüfe die gefangenen Entwürfe und speichere alle auf einmal.',
      vNote: 'Der Sprachmodus ist das einzige Feature, das mit der Cloud spricht - transkribiert wird mit deinem eigenen OpenAI-API-Key, und der bleibt auf deinem Gerät.',
      pTitle: 'Keine Cloud. Kein Konto. Keine Krümel.',
      pSub: 'Deine Ausgaben leben auf deinem Handy und sonst nirgends. Kein Server, keine Anmeldung, niemand schnüffelt in der Speisekammer.',
      p1t: 'Alles bleibt auf deinem Gerät.', p1b: 'Ausgaben werden lokal auf deinem iPhone gespeichert. Nichts wird irgendwohin geschickt.',
      p2t: 'Funktioniert offline.', p2b: 'Im Flugzeug, im Keller, im Mauseloch - Eintragen geht immer.',
      p3t: 'Kein Konto, kein Tracking.', p3b: 'Keine Anmeldung, keine Analytics, keine Telemetrie. Null Datensammelei.',
      p4t: 'Backups zum Mitnehmen.', p4b: 'Exportiere deine Daten als Datei und importiere sie überall. Sie gehören dir.',
      p5t: 'Eine optionale Cloud-Verbindung.', p5b: 'Der Sprachmodus schickt Audio mit deinem eigenen API-Key zur Transkription an OpenAI. Alles andere ist 100 % offline, und der Key wird nie mitgesichert.',
      osTitle: 'Open Source, bis zum letzten Krümel.',
      osBody: 'Jede Zeile von Mäuse liegt auf GitHub. Lies sie, fork sie, bau sie selbst - nichts im Ärmel, versprochen.',
      osCta: 'Code ansehen',
      dlTitle: 'Die Falle ist gestellt.',
      dlBody: 'Mäuse ist gratis im App Store. Schnapp sie dir, bring deine eigene Maus mit - und streite nie wieder darüber, wer das Abendessen bezahlt hat.',
      dlMeta: 'Gratis · iPhone · Kein Konto nötig',
      footerTag: 'Gemacht für Paare, die es einfach halten.'
    }
  };

  var langEn = document.getElementById('lang-en');
  var langDe = document.getElementById('lang-de');
  var currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    var t = strings[lang];
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (t[key] != null) nodes[i].textContent = t[key];
    }
    document.documentElement.lang = lang;
    langEn.setAttribute('aria-pressed', String(lang === 'en'));
    langDe.setAttribute('aria-pressed', String(lang === 'de'));
  }

  function setLang(lang) {
    try { localStorage.setItem('maeuse-site-lang', lang); } catch (e) {}
    applyLang(lang);
  }

  langEn.addEventListener('click', function () { setLang('en'); });
  langDe.addEventListener('click', function () { setLang('de'); });

  var savedLang = null;
  try { savedLang = localStorage.getItem('maeuse-site-lang'); } catch (e) {}
  if (savedLang !== 'en' && savedLang !== 'de') {
    savedLang = ((navigator.language || 'en').toLowerCase().indexOf('de') === 0) ? 'de' : 'en';
  }
  applyLang(savedLang);

  /* ---------- theme ---------- */

  var themeToggle = document.getElementById('theme-toggle');

  themeToggle.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('maeuse-site-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  /* ---------- hero phone: interactive app demo ---------- */
  /* A vanilla replica of the design prototype: month navigation, expense
     editor with keypad and split presets, scripted voice input, settings. */

  var MONTHS = ['JUNE 2026', 'JULY 2026', 'AUGUST 2026'];
  var ABBRS = ['JUN', 'JUL', 'AUG'];

  var demo = {
    monthIdx: 1,
    expenses: [
      { id: 1, m: 0, day: 28, desc: 'Weekly shop', partnerPct: 50, amount: 44.90 },
      { id: 2, m: 0, day: 12, desc: 'Pizza night', partnerPct: 50, amount: 31.80 },
      { id: 3, m: 1, day: 9, desc: 'Groceries', partnerPct: 50, amount: 84.30 },
      { id: 4, m: 1, day: 8, desc: 'Coffee at Röstlab', partnerPct: 50, amount: 7.60 },
      { id: 5, m: 1, day: 7, desc: 'Train tickets', partnerPct: 50, amount: 26.00 },
      { id: 6, m: 1, day: 5, desc: 'Dinner at Luigi’s', partnerPct: 50, amount: 62.50 },
      { id: 7, m: 1, day: 3, desc: 'Pharmacy', fixed: 10.00, partnerPct: 50, amount: 18.90 },
      { id: 8, m: 1, day: 1, desc: 'Cleaning supplies', partnerPct: 50, amount: 14.20 }
    ],
    nextId: 100,
    // editor
    editingId: null,
    amountText: '',
    youPct: 50,
    fixedMode: false,
    // voice
    drafts: [],
    voiceTimer1: null,
    voiceTimer2: null
  };

  var el = function (id) { return document.getElementById(id); };
  var monthBlock = el('app-month-block');
  var listEl = el('app-list');

  function fmt(n) { return '€' + n.toFixed(2); }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function partnerOf(e) {
    return e.fixed != null ? Math.min(e.fixed, e.amount) : e.amount * e.partnerPct / 100;
  }

  function splitLabel(e) {
    return e.fixed != null
      ? 'Fixed €' + e.fixed.toFixed(2)
      : (100 - e.partnerPct) + ' / ' + e.partnerPct + ' split';
  }

  function replay(node, fallbackAnim) {
    node.style.animation = 'none';
    void node.offsetWidth;
    node.style.animation = fallbackAnim || '';
  }

  /* ----- main screen ----- */

  function renderMonth(animateMonth) {
    var inMonth = demo.expenses
      .filter(function (e) { return e.m === demo.monthIdx; })
      .sort(function (a, b) { return b.day - a.day; });

    var total = 0, partner = 0;
    inMonth.forEach(function (e) { total += e.amount; partner += partnerOf(e); });

    var html = '';
    if (inMonth.length === 0) {
      html =
        '<div class="app-empty">' +
          '<div class="mouse"><div class="ear left"></div><div class="ear right"></div><div class="face">?</div></div>' +
          '<span class="title">The trap is empty</span>' +
          '<span class="hint">Tap + to add your first expense</span>' +
        '</div>';
    } else {
      inMonth.forEach(function (e) {
        html +=
          '<div class="app-row' + (e.isNew ? ' is-new' : '') + '" data-id="' + e.id + '">' +
            '<div class="app-date-chip"><span class="day">' + e.day + '</span><span class="mon">' + ABBRS[e.m] + '</span></div>' +
            '<div class="app-row-mid"><span class="desc">' + esc(e.desc) + '</span><span class="split">' + esc(splitLabel(e)) + '</span></div>' +
            '<div class="app-row-amounts"><span class="amount">' + fmt(e.amount) + '</span><span class="partner">' + fmt(partnerOf(e)) + '</span></div>' +
          '</div>';
      });
    }

    el('app-month-label').textContent = MONTHS[demo.monthIdx];
    el('app-total').textContent = fmt(total);
    el('app-partner').textContent = fmt(partner);
    listEl.innerHTML = html;
    el('app-prev').disabled = demo.monthIdx === 0;
    el('app-next').disabled = demo.monthIdx === MONTHS.length - 1;

    if (animateMonth) replay(monthBlock);
  }

  el('app-prev').addEventListener('click', function () {
    if (demo.monthIdx > 0) { demo.monthIdx--; renderMonth(true); }
  });
  el('app-next').addEventListener('click', function () {
    if (demo.monthIdx < MONTHS.length - 1) { demo.monthIdx++; renderMonth(true); }
  });

  listEl.addEventListener('click', function (ev) {
    var row = ev.target.closest('.app-row');
    if (row) openEditor(parseInt(row.getAttribute('data-id'), 10));
  });

  function addExpenses(items) {
    demo.expenses.forEach(function (e) { e.isNew = false; });
    items.forEach(function (it) {
      it.id = demo.nextId++;
      it.m = demo.monthIdx;
      it.day = 10;
      it.isNew = true;
      demo.expenses.push(it);
    });
    renderMonth(false);
  }

  /* ----- editor sheet ----- */

  var noteInput = el('ed-note');

  function openEditor(id) {
    demo.editingId = id != null ? id : null;
    if (id != null) {
      var e = demo.expenses.find(function (x) { return x.id === id; });
      if (!e) return;
      demo.amountText = e.amount.toFixed(2);
      demo.youPct = e.fixed != null ? 50 : 100 - e.partnerPct;
      demo.fixedMode = e.fixed != null;
      noteInput.value = e.desc;
    } else {
      demo.amountText = '';
      demo.youPct = 50;
      demo.fixedMode = false;
      noteInput.value = '';
    }
    el('ed-title').textContent = id != null ? 'Edit Expense' : 'New Expense';
    el('ed-remove').hidden = id == null;
    updateEditor();
    el('ed-overlay').hidden = false;
  }

  function updateEditor() {
    var amt = parseFloat(demo.amountText) || 0;
    var partnerPct = 100 - demo.youPct;
    var youShare = demo.fixedMode ? Math.max(amt - 10, 0) : amt * demo.youPct / 100;
    var partnerShare = demo.fixedMode ? Math.min(10, amt) : amt * partnerPct / 100;
    var youFrac = demo.fixedMode ? (amt > 0 ? youShare / amt : 0.5) : demo.youPct / 100;

    var valEl = el('ed-amount');
    valEl.textContent = demo.amountText || '0.00';
    valEl.classList.toggle('empty', !demo.amountText);

    el('ed-you-pct').textContent = demo.fixedMode ? 'rest' : demo.youPct + '%';
    el('ed-partner-pct').textContent = demo.fixedMode ? '€10 fixed' : partnerPct + '%';
    el('ed-you-share').textContent = fmt(youShare);
    el('ed-partner-share').textContent = fmt(partnerShare);

    var w = (youFrac * 100).toFixed(1) + '%';
    el('ed-bar-you').style.width = w;
    el('ed-bar-handle').style.left = w;

    var presets = el('ed-presets').querySelectorAll('button');
    presets.forEach(function (b) {
      var p = b.getAttribute('data-preset');
      var sel = p === 'fixed' ? demo.fixedMode : (!demo.fixedMode && demo.youPct === parseInt(p, 10));
      b.classList.toggle('sel', sel);
    });

    el('ed-save').classList.toggle('disabled', amt <= 0);
  }

  el('ed-keypad').addEventListener('click', function (ev) {
    var btn = ev.target.closest('button');
    if (!btn) return;
    var k = btn.getAttribute('data-key');
    var t = demo.amountText;
    if (k === 'back') {
      demo.amountText = t.slice(0, -1);
    } else if (k === '.') {
      if (!t.includes('.')) demo.amountText = (t || '0') + '.';
    } else {
      if (t.includes('.') && t.split('.')[1].length >= 2) return;
      if (t.replace('.', '').length >= 6) return;
      demo.amountText = t === '0' ? k : t + k;
    }
    updateEditor();
  });

  el('ed-presets').addEventListener('click', function (ev) {
    var btn = ev.target.closest('button');
    if (!btn) return;
    var p = btn.getAttribute('data-preset');
    if (p === 'fixed') demo.fixedMode = true;
    else { demo.fixedMode = false; demo.youPct = parseInt(p, 10); }
    updateEditor();
  });

  el('ed-save').addEventListener('click', function () {
    var amt = parseFloat(demo.amountText) || 0;
    if (amt <= 0) return;
    var desc = noteInput.value.trim() || 'Expense';
    var partnerPct = demo.fixedMode ? 50 : 100 - demo.youPct;
    if (demo.editingId != null) {
      demo.expenses.forEach(function (e) {
        e.isNew = false;
        if (e.id === demo.editingId) {
          e.desc = desc;
          e.amount = amt;
          e.partnerPct = partnerPct;
          if (demo.fixedMode) e.fixed = 10.00; else delete e.fixed;
          e.isNew = true;
        }
      });
      renderMonth(false);
    } else {
      var data = { desc: desc, amount: amt, partnerPct: partnerPct };
      if (demo.fixedMode) data.fixed = 10.00;
      addExpenses([data]);
    }
    replay(el('app-partner'));
    el('ed-overlay').hidden = true;
  });

  el('ed-remove').addEventListener('click', function () {
    demo.expenses = demo.expenses.filter(function (e) { return e.id !== demo.editingId; });
    renderMonth(false);
    el('ed-overlay').hidden = true;
  });

  el('app-plus').addEventListener('click', function () { openEditor(null); });
  el('app-settings').addEventListener('click', function () { el('st-overlay').hidden = false; });

  /* ----- voice overlay ----- */

  function clearVoiceTimers() {
    clearTimeout(demo.voiceTimer1);
    clearTimeout(demo.voiceTimer2);
  }

  function renderDrafts() {
    var total = demo.drafts.reduce(function (a, d) { return a + d.amount; }, 0);
    el('vc-count').textContent = 'IN THE TRAP · ' + demo.drafts.length;
    el('vc-total').textContent = demo.drafts.length ? fmt(total) + ' total' : '';
    el('vc-save-label').textContent = demo.drafts.length ? 'Save ' + demo.drafts.length : 'Save';
    el('vc-save').classList.toggle('disabled', demo.drafts.length === 0);
    el('vc-none').hidden = demo.drafts.length > 0;
    var html = '';
    demo.drafts.forEach(function (d) {
      html +=
        '<div class="app-draft" data-id="' + d.id + '">' +
          '<div class="app-draft-head">' +
            '<span class="desc">' + esc(d.desc) + '</span>' +
            '<svg class="remove" width="14" height="14" viewBox="0 0 14 14" style="stroke:var(--sub)" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>' +
          '</div>' +
          '<span class="amount">' + fmt(d.amount) + '</span>' +
          '<div class="app-draft-chips"><span class="pct">50%</span><span class="when">Today</span></div>' +
        '</div>';
    });
    el('vc-drafts').innerHTML = html;
  }

  function openVoice() {
    clearVoiceTimers();
    demo.drafts = [];
    el('vc-state').textContent = 'Listening…';
    el('vc-user').hidden = true;
    el('vc-app').hidden = true;
    renderDrafts();
    el('vc-overlay').hidden = false;
    demo.voiceTimer1 = setTimeout(function () {
      el('vc-user').hidden = false;
      el('vc-state').textContent = 'Updating…';
    }, 1600);
    demo.voiceTimer2 = setTimeout(function () {
      el('vc-app').hidden = false;
      el('vc-state').textContent = 'Listening…';
      demo.drafts = [
        { id: 'd1', desc: 'Flowers', amount: 12.00 },
        { id: 'd2', desc: 'Cinema tickets', amount: 24.00 }
      ];
      renderDrafts();
    }, 3300);
  }

  el('app-mic').addEventListener('click', openVoice);

  el('vc-drafts').addEventListener('click', function (ev) {
    var x = ev.target.closest('.remove');
    if (!x) return;
    var id = x.closest('.app-draft').getAttribute('data-id');
    demo.drafts = demo.drafts.filter(function (d) { return d.id !== id; });
    renderDrafts();
  });

  el('vc-save').addEventListener('click', function () {
    if (!demo.drafts.length) return;
    clearVoiceTimers();
    addExpenses(demo.drafts.map(function (d) {
      return { desc: d.desc, amount: d.amount, partnerPct: 50 };
    }));
    demo.drafts = [];
    replay(el('app-partner'));
    el('vc-overlay').hidden = true;
  });

  /* ----- settings sheet ----- */

  function wireSegment(id, onSelect) {
    el(id).addEventListener('click', function (ev) {
      var btn = ev.target.closest('button');
      if (!btn) return;
      el(id).querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('sel', b === btn);
      });
      if (onSelect) onSelect(btn.getAttribute('data-val'));
    });
  }

  // the appearance control really switches the site theme
  wireSegment('st-appearance', function (val) {
    if (val === 'Dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('maeuse-site-theme', 'dark'); } catch (e) {}
    } else if (val === 'Light') {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('maeuse-site-theme', 'light'); } catch (e) {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.removeItem('maeuse-site-theme'); } catch (e) {}
    }
  });
  wireSegment('st-language', null);

  el('st-voice-toggle').addEventListener('click', function () {
    var on = this.getAttribute('aria-pressed') !== 'true';
    this.setAttribute('aria-pressed', String(on));
    document.querySelector('.hero .app').classList.toggle('no-voice', !on);
  });

  // sync the appearance segment with the current theme when opening settings
  el('app-settings').addEventListener('click', function () {
    var stored = null;
    try { stored = localStorage.getItem('maeuse-site-theme'); } catch (e) {}
    var val = stored === 'dark' ? 'Dark' : stored === 'light' ? 'Light' : 'System';
    el('st-appearance').querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('sel', b.getAttribute('data-val') === val);
    });
  });

  /* ----- overlay close buttons ----- */

  document.querySelectorAll('[data-close]').forEach(function (node) {
    node.addEventListener('click', function () {
      var which = node.getAttribute('data-close');
      if (which === 'vc') clearVoiceTimers();
      el(which + '-overlay').hidden = true;
    });
  });

  renderMonth(false);
})();
