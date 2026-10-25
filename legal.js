/* Shared chrome (header/footer) + bilingual article switching for legal pages */

(function () {
  'use strict';

  var strings = {
    en: {
      navFeatures: 'Features', navVoice: 'Voice', navSupport: 'Support', navGet: 'Get the app',
      footerTag: 'Made for couples who keep it simple.', footerPrivacy: 'Privacy', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Terms',
      mangaKicker: 'RELEASES', mangaTitle: 'Changelog',
      mangaLead: 'What’s new in Mäuse, as manga volumes.'
    },
    de: {
      navFeatures: 'Funktionen', navVoice: 'Sprachmodus', navSupport: 'Support', navGet: 'App holen',
      footerTag: 'Gemacht für Paare, die es einfach halten.', footerPrivacy: 'Datenschutz', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Bedingungen',
      mangaKicker: 'VERSIONEN', mangaTitle: 'Changelog',
      mangaLead: 'Was ist neu in Mäuse, als Manga-Bände.'
    }
  };

  var mangaPacks = window.MAEUSE_MANGA_STRINGS;
  if (mangaPacks) {
    ['en', 'de'].forEach(function (lang) {
      var pack = mangaPacks[lang];
      if (!pack) return;
      Object.keys(pack).forEach(function (key) { strings[lang][key] = pack[key]; });
    });
  }

  var langEn = document.getElementById('lang-en');
  var langDe = document.getElementById('lang-de');
  var themeToggle = document.getElementById('theme-toggle');

  function applyChrome(lang) {
    var t = strings[lang];
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (t[key] != null) nodes[i].textContent = t[key];
    }
    var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
    for (var j = 0; j < ariaNodes.length; j++) {
      var ariaKey = ariaNodes[j].getAttribute('data-i18n-aria');
      if (t[ariaKey] != null) ariaNodes[j].setAttribute('aria-label', t[ariaKey]);
    }
  }

  function applyLanguage(language) {
    var useGerman = language === 'de';
    var english = document.querySelectorAll('.lang-en');
    var german = document.querySelectorAll('.lang-de');

    english.forEach(function (node) { node.hidden = useGerman; });
    german.forEach(function (node) { node.hidden = !useGerman; });
    document.documentElement.lang = useGerman ? 'de' : 'en';
    langEn.setAttribute('aria-pressed', String(!useGerman));
    langDe.setAttribute('aria-pressed', String(useGerman));
    applyChrome(useGerman ? 'de' : 'en');

    try { localStorage.setItem('maeuse-site-lang', useGerman ? 'de' : 'en'); } catch (e) {}
    document.dispatchEvent(new CustomEvent('maeuse:lang', { detail: { lang: useGerman ? 'de' : 'en' } }));
  }

  function initialLanguage() {
    try {
      var stored = localStorage.getItem('maeuse-site-lang');
      if (stored === 'en' || stored === 'de') return stored;
    } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('de') === 0 ? 'de' : 'en';
  }

  function languageFromHash() {
    var id = (location.hash || '').replace(/^#/, '');
    if (id === 'voice-mode') return 'en';
    if (id === 'voice-mode-de') return 'de';
    return null;
  }

  function scrollToHash() {
    var id = (location.hash || '').replace(/^#/, '');
    if (!id) return;
    var target = document.getElementById(id);
    if (!target || target.closest('[hidden]')) return;
    target.scrollIntoView();
  }

  langEn.addEventListener('click', function () { applyLanguage('en'); });
  langDe.addEventListener('click', function () { applyLanguage('de'); });

  themeToggle.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('maeuse-site-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  // without a saved choice, follow the system setting live
  var darkMq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (darkMq) {
    var followSystem = function () {
      var saved = null;
      try { saved = localStorage.getItem('maeuse-site-theme'); } catch (e) {}
      if (saved === 'dark' || saved === 'light') return;
      if (darkMq.matches) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
    };
    if (darkMq.addEventListener) darkMq.addEventListener('change', followSystem);
    else if (darkMq.addListener) darkMq.addListener(followSystem);
  }

  applyLanguage(languageFromHash() || initialLanguage());
  // Toggling hidden articles cancels the browser's initial hash scroll.
  scrollToHash();
})();
