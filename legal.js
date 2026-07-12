(function () {
  'use strict';

  var enButton = document.getElementById('legal-lang-en');
  var deButton = document.getElementById('legal-lang-de');
  var themeButton = document.getElementById('legal-theme');

  function applyLanguage(language) {
    var english = document.querySelectorAll('.lang-en');
    var german = document.querySelectorAll('.lang-de');
    var useGerman = language === 'de';

    english.forEach(function (node) { node.hidden = useGerman; });
    german.forEach(function (node) { node.hidden = !useGerman; });
    document.documentElement.lang = useGerman ? 'de' : 'en';
    enButton.setAttribute('aria-pressed', String(!useGerman));
    deButton.setAttribute('aria-pressed', String(useGerman));

    try { localStorage.setItem('maeuse-site-lang', useGerman ? 'de' : 'en'); } catch (e) {}
  }

  function initialLanguage() {
    try {
      var stored = localStorage.getItem('maeuse-site-lang');
      if (stored === 'en' || stored === 'de') return stored;
    } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('de') === 0 ? 'de' : 'en';
  }

  enButton.addEventListener('click', function () { applyLanguage('en'); });
  deButton.addEventListener('click', function () { applyLanguage('de'); });

  themeButton.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('maeuse-site-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  applyLanguage(initialLanguage());
})();
