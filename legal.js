/* Shared chrome (header/footer) + bilingual article switching for legal pages */

(function () {
  'use strict';

  var strings = {
    en: {
      navFeatures: 'Features', navVoice: 'Voice', navSupport: 'Support', navGet: 'Get the app',
      footerTag: 'Made for couples who keep it simple.', footerPrivacy: 'Privacy', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Terms'
    },
    de: {
      navFeatures: 'Funktionen', navVoice: 'Sprachmodus', navSupport: 'Support', navGet: 'App holen',
      footerTag: 'Gemacht für Paare, die es einfach halten.', footerPrivacy: 'Datenschutz', footerSupport: 'Support', footerChangelog: 'Changelog', footerTerms: 'Bedingungen'
    }
  };

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

  applyLanguage(languageFromHash() || initialLanguage());
  // Toggling hidden articles cancels the browser's initial hash scroll.
  scrollToHash();
})();
