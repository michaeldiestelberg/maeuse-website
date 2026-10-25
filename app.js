/* ===== Mäuse marketing site - theme, language, phone mockup ===== */

(function () {
  'use strict';

  /* ---------- i18n ---------- */

  var strings = {
    en: {
      navFeatures: 'Features', navVoice: 'Voice', navSupport: 'Support', navGet: 'Get the app',
      badge: 'NOW ON THE APP STORE',
      h1a: 'Say what you spent.', h1b: 'That’s it.',
      heroSub: 'Mäuse is the expense tracker for you and your favorite Maus: share costs fairly, no joint account needed. And always know who owes what.',
      voiceHint: '“Paid sixty-two fifty for dinner at Luigi’s”', voiceLogged: 'Logged',
      downloadCta: 'Download on the App Store',
      slang: '“Mäuse” is German slang for money - literally “mice”.',
      tapAround: 'It’s the real app.', tapAround2: 'Tap around!',
      featTitle: 'Everything a Maus needs.', featSub: 'Nothing that nibbles at your attention.',
      f1t: 'Fast as a mouse', f1b: 'Amount, note, done. Logging an expense takes seconds.',
      f2t: 'Slice the cheese', f2b: 'Drag the split slider in 5% steps - you and your Maus each see your share right away.',
      f3t: 'Squeak to log', f3b: 'Just say what you spent. Mäuse turns it into entries, you check and save.',
      f4t: 'The monthly stash', f4b: 'Totals per month and exactly what your Maus owes you. No spreadsheets, no math.',
      bSplitItem: 'Groceries', bSplitAria: 'Your share of the expense', bYou: 'You', bMaus: 'Your Maus',
      bMonth: 'JULY 2026', bOwes: 'Your Maus owes you',
      bAmount: 'Amount', bNote: 'Note', bNoteValue: 'Coffee at Röstlab', bSave: 'Save', bDraft: 'Flowers',
      vTitle: 'Talk. It’s logged.',
      v1t: 'Tap the mic', v1b: 'It’s right there on the main screen.',
      v2t: 'Squeak away', v2b: '“Flowers for 12, cinema tickets for 24 - split both in half.”',
      v3t: 'Check the trap', v3b: 'Review the drafts it caught, then save them all at once.',
      vNote: 'Voice Mode is optional. Two options:',
      vAppleTitle: 'Local AI (Apple)',
      vCloudTitle: 'Cloud AI (OpenAI)', vCloudTag: 'Recommended',
      vRowCost: 'Cost', vAppleCost: 'Free', vCloudCost: 'About $1–2 per 100 dictated expenses, charged to your OpenAI account',
      vRowAudio: 'Your audio', vAppleAudio: 'Stays on your iPhone', vCloudAudio: 'Goes to OpenAI, only after you agree',
      vRowPer: 'Per recording', vApplePer: 'One expense at a time', vCloudPer: 'Several expenses and corrections at once',
      vRowOffline: 'Offline', vAppleOffline: 'Yes, after a one-time speech model download', vCloudOffline: 'No, needs internet',
      vRowNeeds: 'You need', vAppleNeeds: 'An iPhone with Apple Intelligence and iOS 26 or later', vCloudNeeds: 'Your own OpenAI API key',
      pTitle: 'Local first. Clear about cloud.',
      pSub: 'Manual expenses stay on your iPhone. Voice Mode connects to OpenAI only after you agree.',
      mapPhone: 'Your iPhone', mapExpenses: 'Expenses & splits', mapNotes: 'Notes & dates', mapLocalAi: 'Local AI (Apple)',
      mapKey: 'OpenAI key in Keychain', mapBackup: 'Backups are a file you export yourself.',
      mapWire: 'Only with Cloud AI, after you agree', mapOpenAi: 'Live audio and spoken expense details',
      mapCloud: 'Mäuse cloud', mapCloudNone: 'There is none. No account, no cloud database.',
      p1t: 'Manual expenses stay on your device.', p1b: 'Amounts, notes, dates, splits, and imported backups are stored locally on your iPhone.',
      p2t: 'Works offline.', p2b: 'On a plane, in the basement, in a mouse hole - logging always works.',
      p3t: 'No app account, ads, or tracking.', p3b: 'The iPhone app has no analytics or telemetry. This website uses cookie-free, aggregated Vercel Web Analytics.',
      p4t: 'Portable backups.', p4b: 'Export your data as a file, import it anywhere. You own it.',
      p5t: 'Cloud only if you choose it.', p5b: 'With local AI, everything stays on your iPhone. With cloud AI, Mäuse sends live audio and spoken expense details to OpenAI only after you agree. Your key is stored in Keychain and excluded from backups.',
      faqTitle: 'Quick answers.',
      faq1q: 'Where are my expenses stored?',
      faq1a: 'On your iPhone. Mäuse has no user accounts and no cloud database. Before you switch devices, export a backup in Settings → Backup & Restore.',
      faq2q: 'Which voice mode should I choose?',
      faq2a: 'Both turn speech into drafts you review before saving. Cloud AI (OpenAI) is recommended: it understands several expenses and corrections in one go, and sends audio to OpenAI. Local AI (Apple) is free and keeps everything on your iPhone, one expense at a time.',
      faq3q: 'Who pays for Voice Mode?',
      faq3a: 'Local AI is free. Cloud AI uses your own OpenAI API key, and OpenAI may charge about $1–2 per 100 dictated expenses. Mäuse gets no part of that.',
      faq4q: 'What do I need?',
      faq4a: 'An iPhone with iOS 17 or later. No Mäuse account. Manual tracking works offline, and Voice Mode is optional.',
      faqMore: 'More answers on the support page',
      dlTitle: 'The trap is set.',
      dlBody: 'Mäuse is free on the App Store for iPhone. No Mäuse account required.',
      dlMeta: 'Free · iPhone · No account required',
      homeStoryTitle: 'Previously on Mäuse.',
      homeStorySub: 'See how Mäuse has evolved so far – told in little comics.',
      homeStoryFallback: 'Read the volumes in the changelog.',
      footerTag: 'Made for couples who keep it simple.', footerPrivacy: 'Privacy', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Terms'
    },
    de: {
      navFeatures: 'Funktionen', navVoice: 'Sprachmodus', navSupport: 'Support', navGet: 'App holen',
      badge: 'JETZT IM APP STORE',
      h1a: 'Sag, was du ausgegeben hast.', h1b: 'Mehr nicht.',
      heroSub: 'Mäuse ist der Ausgaben-Tracker für dich und deine Lieblingsmaus: gemeinsame Kosten fair teilen, ohne gemeinsames Konto. Und immer wissen, wer wem was schuldet.',
      voiceHint: '„Zweiundsechzig fünfzig fürs Abendessen bei Luigi“', voiceLogged: 'Erfasst',
      downloadCta: 'Im App Store laden',
      slang: '„Mäuse“ ist Umgangssprache für Geld.',
      tapAround: 'Das ist die echte App.', tapAround2: 'Tipp dich durch!',
      featTitle: 'Alles, was eine Maus braucht.', featSub: 'Nichts, was an deiner Aufmerksamkeit knabbert.',
      f1t: 'Flink wie eine Maus', f1b: 'Betrag, Notiz, fertig. Eine Ausgabe ist in Sekunden erfasst.',
      f2t: 'Den Käse teilen', f2b: 'Zieh den Split-Regler in 5%-Schritten - du und deine Maus seht sofort euren Anteil.',
      f3t: 'Piepsen statt tippen', f3b: 'Sag einfach, was du ausgegeben hast. Mäuse macht daraus Einträge, du prüfst und speicherst.',
      f4t: 'Der Monatsvorrat', f4b: 'Monatssummen und genau das, was deine Maus dir schuldet. Keine Tabellen, kein Kopfrechnen.',
      bSplitItem: 'Lebensmittel', bSplitAria: 'Dein Anteil an der Ausgabe', bYou: 'Du', bMaus: 'Deine Maus',
      bMonth: 'JULI 2026', bOwes: 'Deine Maus schuldet dir',
      bAmount: 'Betrag', bNote: 'Notiz', bNoteValue: 'Kaffee bei Röstlab', bSave: 'Speichern', bDraft: 'Blumen',
      vTitle: 'Sprich. Schon erfasst.',
      v1t: 'Tipp aufs Mikro', v1b: 'Sitzt direkt auf dem Hauptbildschirm.',
      v2t: 'Piepse los', v2b: '„Blumen für 12, Kinokarten für 24 - beides halbe-halbe.“',
      v3t: 'Schau in die Falle', v3b: 'Prüfe die gefangenen Entwürfe und speichere alle auf einmal.',
      vNote: 'Der Sprachmodus ist optional. Du hast zwei Varianten:',
      vAppleTitle: 'Lokale KI (Apple)',
      vCloudTitle: 'Cloud-KI (OpenAI)', vCloudTag: 'Empfohlen',
      vRowCost: 'Kosten', vAppleCost: 'Kostenlos', vCloudCost: 'Etwa 1–2 $ pro 100 diktierte Ausgaben, abgerechnet über dein OpenAI-Konto',
      vRowAudio: 'Dein Audio', vAppleAudio: 'Bleibt auf deinem iPhone', vCloudAudio: 'Geht an OpenAI, erst nach deiner Zustimmung',
      vRowPer: 'Pro Aufnahme', vApplePer: 'Eine Ausgabe nach der anderen', vCloudPer: 'Mehrere Ausgaben und Korrekturen auf einmal',
      vRowOffline: 'Offline', vAppleOffline: 'Ja, nach einmaligem Laden des Sprachmodells', vCloudOffline: 'Nein, braucht Internet',
      vRowNeeds: 'Du brauchst', vAppleNeeds: 'Ein iPhone mit Apple Intelligence und iOS 26 oder neuer', vCloudNeeds: 'Deinen eigenen OpenAI-API-Schlüssel',
      pTitle: 'Lokal zuerst. Cloud ganz klar.',
      pSub: 'Manuelle Ausgaben bleiben auf deinem iPhone. Der Sprachmodus verbindet sich erst nach deiner Zustimmung mit OpenAI.',
      mapPhone: 'Dein iPhone', mapExpenses: 'Ausgaben & Aufteilungen', mapNotes: 'Notizen & Daten', mapLocalAi: 'Lokale KI (Apple)',
      mapKey: 'OpenAI-Schlüssel im Schlüsselbund', mapBackup: 'Backups sind eine Datei, die du selbst exportierst.',
      mapWire: 'Nur mit Cloud-KI, nach deiner Zustimmung', mapOpenAi: 'Live-Audio und gesprochene Ausgabendetails',
      mapCloud: 'Mäuse-Cloud', mapCloudNone: 'Gibt es nicht. Kein Konto, keine Cloud-Datenbank.',
      p1t: 'Manuelle Ausgaben bleiben auf deinem Gerät.', p1b: 'Beträge, Notizen, Daten, Aufteilungen und importierte Backups werden lokal auf deinem iPhone gespeichert.',
      p2t: 'Funktioniert offline.', p2b: 'Im Flugzeug, im Keller, im Mauseloch - Eintragen geht immer.',
      p3t: 'Kein App-Konto, keine Werbung, kein Tracking.', p3b: 'Die iPhone-App enthält weder Analytics noch Telemetrie. Diese Website nutzt aggregierte, cookiefreie Vercel Web Analytics.',
      p4t: 'Backups zum Mitnehmen.', p4b: 'Exportiere deine Daten als Datei und importiere sie überall. Sie gehören dir.',
      p5t: 'Cloud nur, wenn du sie wählst.', p5b: 'Mit lokaler KI bleibt alles auf deinem iPhone. Mit Cloud-KI sendet Mäuse erst nach deiner Zustimmung Live-Audio und gesprochene Ausgabendetails an OpenAI. Dein Schlüssel liegt im Schlüsselbund und ist nie im Backup.',
      faqTitle: 'Kurz gefragt.',
      faq1q: 'Wo werden meine Ausgaben gespeichert?',
      faq1a: 'Auf deinem iPhone. Mäuse hat keine Benutzerkonten und keine Cloud-Datenbank. Bevor du das Gerät wechselst, erstelle unter Einstellungen → Backup & Wiederherstellung eine Sicherung.',
      faq2q: 'Welchen Sprachmodus soll ich wählen?',
      faq2a: 'Beide machen aus Sprache Entwürfe, die du vor dem Speichern prüfst. Cloud-KI (OpenAI) ist empfohlen: Sie versteht mehrere Ausgaben und Korrekturen in einem Rutsch und schickt Audio an OpenAI. Lokale KI (Apple) ist kostenlos und lässt alles auf deinem iPhone, eine Ausgabe nach der anderen.',
      faq3q: 'Wer bezahlt den Sprachmodus?',
      faq3a: 'Lokale KI ist kostenlos. Cloud-KI nutzt deinen eigenen OpenAI-API-Schlüssel; OpenAI kann dafür etwa 1–2 $ pro 100 diktierte Ausgaben berechnen. Mäuse erhält davon nichts.',
      faq4q: 'Was brauche ich?',
      faq4a: 'Ein iPhone mit iOS 17 oder neuer. Kein Mäuse-Konto. Die manuelle Erfassung funktioniert offline, der Sprachmodus ist optional.',
      faqMore: 'Mehr Antworten auf der Support-Seite',
      dlTitle: 'Die Falle ist gestellt.',
      dlBody: 'Mäuse ist kostenlos im App Store fürs iPhone. Kein Mäuse-Konto nötig.',
      dlMeta: 'Gratis · iPhone · Kein Konto nötig',
      homeStoryTitle: 'Was bisher geschah.',
      homeStorySub: 'Schau dir an, wie sich Mäuse bislang entwickelt hat – in Form kleiner Comics.',
      homeStoryFallback: 'Die Bände im Changelog lesen.',
      footerTag: 'Gemacht für Paare, die es einfach halten.', footerPrivacy: 'Datenschutz', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Bedingungen'
    }
  };

  var langEn = document.getElementById('lang-en');
  var langDe = document.getElementById('lang-de');
  var currentLang = 'en';
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // website copy (not the English-only phone demo) uses local number formats
  function money(n, lang) {
    var v = n.toFixed(2);
    return (lang || currentLang) === 'de' ? v.replace('.', ',') + ' €' : '€' + v;
  }

  function applyLang(lang) {
    currentLang = lang;
    var t = strings[lang];
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (t[key] != null) nodes[i].textContent = t[key];
    }
    var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
    for (var a = 0; a < ariaNodes.length; a++) {
      var ariaKey = ariaNodes[a].getAttribute('data-i18n-aria');
      if (t[ariaKey] != null) ariaNodes[a].setAttribute('aria-label', t[ariaKey]);
    }
    var moneyNodes = document.querySelectorAll('[data-money]');
    for (var m = 0; m < moneyNodes.length; m++) {
      moneyNodes[m].textContent = money(parseFloat(moneyNodes[m].getAttribute('data-money')), lang);
    }
    var german = lang === 'de';
    var englishNodes = document.querySelectorAll('.lang-en');
    var germanNodes = document.querySelectorAll('.lang-de');
    for (var e = 0; e < englishNodes.length; e++) englishNodes[e].hidden = german;
    for (var g = 0; g < germanNodes.length; g++) germanNodes[g].hidden = !german;
    document.documentElement.lang = lang;
    langEn.setAttribute('aria-pressed', String(lang === 'en'));
    langDe.setAttribute('aria-pressed', String(lang === 'de'));
    document.dispatchEvent(new CustomEvent('maeuse:lang', { detail: { lang: lang } }));
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

  var darkMq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try { return localStorage.getItem('maeuse-site-theme'); } catch (e) { return null; }
  }

  function setDark(dark) {
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  function followSystemTheme() {
    setDark(!!(darkMq && darkMq.matches));
  }

  themeToggle.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    setDark(dark);
    try { localStorage.setItem('maeuse-site-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  // without a saved choice, follow the system setting live
  if (darkMq) {
    var onSystemTheme = function () {
      var saved = savedTheme();
      if (saved !== 'dark' && saved !== 'light') followSystemTheme();
    };
    if (darkMq.addEventListener) darkMq.addEventListener('change', onSystemTheme);
    else if (darkMq.addListener) darkMq.addListener(onSystemTheme);
  }

  /* ---------- hero phone: interactive app demo ---------- */
  /* A vanilla replica of the iOS app: month navigation, expense
     editor with keypad and split slider, scripted voice input, settings. */

  var MONTHS = ['JUNE 2026', 'JULY 2026', 'AUGUST 2026'];
  var ABBRS = ['JUN', 'JUL', 'AUG'];
  var DATE_LABELS = {
    0: 'Jun 28, 2026',
    1: 'Jul 10, 2026',
    2: 'Aug 2, 2026'
  };

  var demo = {
    monthIdx: 1,
    expenses: [
      { id: 1, m: 0, day: 28, desc: 'Weekly shop', partnerPct: 50, amount: 44.90 },
      { id: 2, m: 0, day: 12, desc: 'Pizza night', partnerPct: 50, amount: 31.80 },
      { id: 3, m: 1, day: 9, desc: 'Groceries', partnerPct: 50, amount: 84.30 },
      { id: 4, m: 1, day: 8, desc: 'Coffee at Röstlab', partnerPct: 50, amount: 7.60 },
      { id: 5, m: 1, day: 7, desc: 'Train tickets', partnerPct: 50, amount: 26.00 },
      { id: 6, m: 1, day: 5, desc: 'Dinner at Luigi’s', partnerPct: 50, amount: 62.50 },
      { id: 7, m: 1, day: 3, desc: 'Pharmacy', partnerPct: 55, amount: 18.90 },
      { id: 8, m: 1, day: 1, desc: 'Cleaning supplies', partnerPct: 50, amount: 14.20 }
    ],
    nextId: 100,
    // editor
    editingId: null,
    amountText: '',
    youPct: 50,
    editDay: 10,
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
    return e.amount * e.partnerPct / 100;
  }

  function splitLabel(e) {
    return (100 - e.partnerPct) + ' / ' + e.partnerPct + ' split';
  }

  function dateLabel(monthIdx, day) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // demo months are June/July/August 2026 (idx 0/1/2 → calendar month 5/6/7)
    return months[monthIdx + 5] + ' ' + day + ', 2026';
  }

  function replay(node, fallbackAnim) {
    node.style.animation = 'none';
    void node.offsetWidth;
    node.style.animation = fallbackAnim || '';
  }

  /* ----- main screen ----- */

  function monthExpenses() {
    return demo.expenses
      .filter(function (e) { return e.m === demo.monthIdx && !e.held; })
      .sort(function (a, b) { return b.day - a.day; });
  }

  function monthSums() {
    var total = 0, partner = 0;
    monthExpenses().forEach(function (e) { total += e.amount; partner += partnerOf(e); });
    return { total: total, partner: partner };
  }

  function renderMonth(animateMonth) {
    stopCountUp();
    var inMonth = monthExpenses();
    var sums = monthSums();
    var total = sums.total, partner = sums.partner;

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
  var confirmEl = el('ed-confirm');

  function openEditor(id) {
    demo.editingId = id != null ? id : null;
    confirmEl.hidden = true;
    if (id != null) {
      var e = demo.expenses.find(function (x) { return x.id === id; });
      if (!e) return;
      demo.amountText = e.amount.toFixed(2);
      demo.youPct = 100 - e.partnerPct;
      demo.editDay = e.day;
      noteInput.value = e.desc;
      el('ed-date-val').textContent = dateLabel(e.m, e.day);
    } else {
      demo.amountText = '';
      demo.youPct = 50;
      demo.editDay = 10;
      noteInput.value = '';
      el('ed-date-val').textContent = DATE_LABELS[demo.monthIdx] || dateLabel(demo.monthIdx, 10);
    }
    el('ed-title').textContent = id != null ? 'Edit Expense' : 'New Expense';
    el('ed-remove').hidden = id == null;
    updateEditor();
    el('ed-overlay').hidden = false;
  }

  function setYouPct(pct) {
    var snapped = Math.round(pct / 5) * 5;
    demo.youPct = Math.max(0, Math.min(100, snapped));
    updateEditor();
  }

  function updateEditor() {
    var amt = parseFloat(demo.amountText) || 0;
    var partnerPct = 100 - demo.youPct;
    var youShare = amt * demo.youPct / 100;
    var partnerShare = amt * partnerPct / 100;

    var valEl = el('ed-amount');
    valEl.textContent = demo.amountText || '0.00';
    valEl.classList.toggle('empty', !demo.amountText);

    el('ed-you-pct').textContent = demo.youPct + '%';
    el('ed-partner-pct').textContent = partnerPct + '%';
    el('ed-you-share').textContent = fmt(youShare);
    el('ed-partner-share').textContent = fmt(partnerShare);

    var w = demo.youPct.toFixed(1) + '%';
    el('ed-bar-you').style.width = w;
    el('ed-bar-handle').style.left = w;
    el('ed-bar').setAttribute('aria-valuenow', String(partnerPct));

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

  (function wireSplitBar() {
    var bar = el('ed-bar');
    var dragging = false;

    function pctFromEvent(ev) {
      var rect = bar.getBoundingClientRect();
      var x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
      return (x / rect.width) * 100;
    }

    function onMove(ev) {
      if (!dragging) return;
      ev.preventDefault();
      setYouPct(pctFromEvent(ev));
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      bar.classList.remove('dragging');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    }

    bar.addEventListener('pointerdown', function (ev) {
      dragging = true;
      bar.classList.add('dragging');
      setYouPct(pctFromEvent(ev));
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });
    bar.addEventListener('touchstart', function (ev) {
      dragging = true;
      bar.classList.add('dragging');
      setYouPct(pctFromEvent(ev));
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
    }, { passive: true });
  })();

  el('ed-save').addEventListener('click', function () {
    var amt = parseFloat(demo.amountText) || 0;
    if (amt <= 0) return;
    var desc = noteInput.value.trim() || 'Expense';
    var partnerPct = 100 - demo.youPct;
    if (demo.editingId != null) {
      demo.expenses.forEach(function (e) {
        e.isNew = false;
        if (e.id === demo.editingId) {
          e.desc = desc;
          e.amount = amt;
          e.partnerPct = partnerPct;
          delete e.fixed;
          e.isNew = true;
        }
      });
      renderMonth(false);
    } else {
      addExpenses([{ desc: desc, amount: amt, partnerPct: partnerPct }]);
    }
    replay(el('app-partner'));
    confirmEl.hidden = true;
    el('ed-overlay').hidden = true;
  });

  el('ed-remove').addEventListener('click', function () {
    confirmEl.hidden = false;
  });
  el('ed-confirm-no').addEventListener('click', function () {
    confirmEl.hidden = true;
  });
  el('ed-confirm-yes').addEventListener('click', function () {
    demo.expenses = demo.expenses.filter(function (e) { return e.id !== demo.editingId; });
    renderMonth(false);
    confirmEl.hidden = true;
    el('ed-overlay').hidden = true;
  });

  el('app-plus').addEventListener('click', function () { openEditor(null); });
  el('app-settings').addEventListener('click', function () { el('st-overlay').hidden = false; });
  el('st-help').addEventListener('click', function () {
    el('st-overlay').hidden = true;
  });
  el('st-haptics-toggle').addEventListener('click', function () {
    var on = this.getAttribute('aria-pressed') !== 'true';
    this.setAttribute('aria-pressed', String(on));
  });

  /* ----- voice overlay ----- */

  function clearVoiceTimers() {
    clearTimeout(demo.voiceTimer1);
    clearTimeout(demo.voiceTimer2);
  }

  function renderDrafts() {
    var total = demo.drafts.reduce(function (a, d) { return a + d.amount; }, 0);
    el('vc-count').textContent = 'Your drafts';
    el('vc-total').textContent = demo.drafts.length ? fmt(total) + ' total' : '';
    el('vc-save-label').textContent = 'Save';
    el('vc-save').classList.toggle('disabled', demo.drafts.length === 0);
    el('vc-none').hidden = demo.drafts.length > 0;
    el('vc-understood').hidden = demo.drafts.length === 0;
    var html = '';
    demo.drafts.forEach(function (d) {
      html +=
        '<div class="app-draft" data-id="' + d.id + '">' +
          '<div class="app-draft-head">' +
            '<span class="desc">' + esc(d.desc) + '</span>' +
            '<span class="amount">' + fmt(d.amount) + '</span>' +
            '<svg class="remove" width="14" height="14" viewBox="0 0 14 14" style="stroke:var(--sub)" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>' +
          '</div>' +
          '<div class="app-draft-chips"><span class="when">Today</span><span class="pct">Partner 50%</span></div>' +
        '</div>';
    });
    el('vc-drafts').innerHTML = html;
  }

  function openVoice() {
    clearVoiceTimers();
    demo.drafts = [];
    el('vc-state').textContent = 'Listening…';
    renderDrafts();
    el('vc-overlay').hidden = false;
    demo.voiceTimer1 = setTimeout(function () {
      el('vc-state').textContent = 'Updating…';
    }, 1600);
    demo.voiceTimer2 = setTimeout(function () {
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
      try { localStorage.removeItem('maeuse-site-theme'); } catch (e) {}
      followSystemTheme();
    }
  });
  wireSegment('st-language', null);

  el('st-voice-toggle').addEventListener('click', function () {
    var on = this.getAttribute('aria-pressed') !== 'true';
    this.setAttribute('aria-pressed', String(on));
    document.querySelector('.hero .app').classList.toggle('no-voice', !on);
  });

  demo.voiceProvider = 'openai';

  function applyVoiceProvider(mode) {
    demo.voiceProvider = mode;
    var isApple = mode === 'apple';
    el('st-provider-name').textContent = isApple ? 'Apple · On device' : 'OpenAI · Cloud';
    el('st-provider-badge').textContent = isApple ? 'Free' : 'Recommended';
    el('st-provider-badge').classList.toggle('free', isApple);
    el('st-provider-caption').textContent = isApple
      ? 'Simpler and stricter. Best for one short, clear expense at a time.'
      : 'Records continuously and processes requests with OpenAI. Audio and expense context are sent to OpenAI.';
    el('st-openai-block').hidden = isApple;
    el('st-apple-block').hidden = !isApple;
    el('md-openai').classList.toggle('sel', !isApple);
    el('md-apple').classList.toggle('sel', isApple);
  }

  el('st-change-mode').addEventListener('click', function () {
    el('md-overlay').hidden = false;
  });
  el('md-openai').addEventListener('click', function () {
    applyVoiceProvider('openai');
    el('md-overlay').hidden = true;
  });
  el('md-apple').addEventListener('click', function () {
    applyVoiceProvider('apple');
    el('md-overlay').hidden = true;
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
      if (which === 'ed') confirmEl.hidden = true;
      if (which === 'st') el('md-overlay').hidden = true;
      el(which + '-overlay').hidden = true;
    });
  });

  /* ----- hero intro: the voice hint plays out once ----- */
  /* Types the spoken sentence, stamps it "Logged", then drops the matching
     row into the demo while the totals count up. Any tap on the phone, a
     language switch or reduced motion skips straight to the end state. */

  var hint = el('voice-hint');
  var hintQuote = el('voice-hint-quote');
  var hintLogged = el('voice-hint-logged');
  var heroPhone = el('hero-phone');
  var spoken = demo.expenses.find(function (e) { return e.id === 6; });
  var intro = { running: false, timers: [], raf: 0 };

  function stopCountUp() {
    if (intro && intro.raf) { cancelAnimationFrame(intro.raf); intro.raf = 0; }
  }

  function countUp(from, to) {
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / 650);
      var ease = 1 - Math.pow(1 - p, 3);
      el('app-total').textContent = fmt(from.total + (to.total - from.total) * ease);
      el('app-partner').textContent = fmt(from.partner + (to.partner - from.partner) * ease);
      intro.raf = p < 1 ? requestAnimationFrame(step) : 0;
    }
    intro.raf = requestAnimationFrame(step);
  }

  function paintTyped(text, n) {
    hintQuote.textContent = text.slice(0, n);
    var caret = document.createElement('span');
    caret.className = 'voice-hint-caret';
    var ghost = document.createElement('span');
    ghost.className = 'voice-hint-ghost';
    ghost.textContent = text.slice(n);
    hintQuote.appendChild(caret);
    hintQuote.appendChild(ghost);
  }

  function endIntro(dropRow) {
    if (!intro.running) return;
    intro.running = false;
    intro.timers.forEach(clearTimeout);
    intro.timers = [];
    hintQuote.textContent = strings[currentLang].voiceHint;
    hint.classList.remove('is-typing');
    hintQuote.removeAttribute('aria-hidden');
    hintLogged.classList.remove('is-off');
    hintLogged.removeAttribute('aria-hidden');
    if (!spoken.held) return;
    if (dropRow && demo.monthIdx === spoken.m) {
      var before = monthSums();
      spoken.held = false;
      demo.expenses.forEach(function (e) { e.isNew = e === spoken; });
      renderMonth(false);
      countUp(before, monthSums());
      replay(el('app-partner'));
    } else {
      spoken.held = false;
      renderMonth(false);
    }
  }

  function startIntro() {
    if (reduceMotion || !spoken || !hint || window.scrollY > 120) return;
    intro.running = true;
    spoken.held = true;
    renderMonth(false);
    hint.classList.add('is-typing');
    hintQuote.setAttribute('aria-hidden', 'true');
    hintLogged.setAttribute('aria-hidden', 'true');
    hintLogged.classList.add('is-off');
    paintTyped(strings[currentLang].voiceHint, 0);

    var n = 0;
    function later(fn, ms) { intro.timers.push(setTimeout(fn, ms)); }
    function type() {
      var text = strings[currentLang].voiceHint;
      n++;
      paintTyped(text, n);
      if (n < text.length) later(type, 32);
      else later(stamp, 260);
    }
    function stamp() {
      hint.classList.remove('is-typing');
      hintQuote.textContent = strings[currentLang].voiceHint;
      hintLogged.classList.remove('is-off');
      later(function () { endIntro(true); }, 420);
    }
    later(type, 650);
  }

  function touchPhone() {
    heroPhone.classList.add('is-touched');
    endIntro(false);
  }
  heroPhone.addEventListener('pointerdown', touchPhone, true);
  heroPhone.addEventListener('keydown', touchPhone, true);
  document.addEventListener('maeuse:lang', function () { endIntro(false); });

  /* ----- features: split slider ----- */

  var splitRange = el('split-demo');
  var SPLIT_AMOUNT = 84.30;

  function updateSplit() {
    var you = parseInt(splitRange.value, 10);
    var maus = 100 - you;
    var youAmt = Math.round(SPLIT_AMOUNT * you) / 100;
    var mausAmt = Math.round((SPLIT_AMOUNT - youAmt) * 100) / 100;
    var t = strings[currentLang];
    el('split-you-pct').textContent = you + '%';
    el('split-maus-pct').textContent = maus + '%';
    el('split-you-amt').textContent = money(youAmt);
    el('split-maus-amt').textContent = money(mausAmt);
    splitRange.style.setProperty('--you', you + '%');
    splitRange.setAttribute('aria-valuetext',
      t.bYou + ' ' + you + '% (' + money(youAmt) + '), ' + t.bMaus + ' ' + maus + '% (' + money(mausAmt) + ')');
  }
  splitRange.addEventListener('input', updateSplit);
  document.addEventListener('maeuse:lang', updateSplit);
  updateSplit();

  /* ----- phones: download bar once the hero button has scrolled away ----- */

  var mobileCta = el('mobile-cta');
  var heroActions = document.querySelector('.hero-actions');
  var downloadSection = el('download');
  var ctaShown = false;
  var ctaQueued = false;

  function updateMobileCta() {
    ctaQueued = false;
    var show = heroActions.getBoundingClientRect().bottom < 0 &&
      downloadSection.getBoundingClientRect().top > window.innerHeight;
    if (show === ctaShown) return;
    ctaShown = show;
    mobileCta.classList.toggle('is-visible', show);
    if (show) mobileCta.removeAttribute('inert');
    else mobileCta.setAttribute('inert', '');
  }
  function queueMobileCta() {
    if (ctaQueued) return;
    ctaQueued = true;
    requestAnimationFrame(updateMobileCta);
  }
  window.addEventListener('scroll', queueMobileCta, { passive: true });
  window.addEventListener('resize', queueMobileCta);

  renderMonth(false);
  updateMobileCta();
  startIntro();
})();
