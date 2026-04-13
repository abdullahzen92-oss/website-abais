/* =============================================
   ABAIS Bilingual Toggle (ID / EN)
   ============================================= */

const translations = {
  id: null,
  en: null,
};

let currentLang = 'id';

export async function initI18n() {
  // Load saved language
  const saved = localStorage.getItem('abais-lang');
  if (saved && (saved === 'id' || saved === 'en')) {
    currentLang = saved;
  }

  // Pre-load translations
  try {
    const [idRes, enRes] = await Promise.all([
      fetch('/translations/id.json'),
      fetch('/translations/en.json'),
    ]);
    translations.id = await idRes.json();
    translations.en = await enRes.json();
  } catch (err) {
    console.warn('i18n: Could not load translations', err);
    return;
  }

  // Apply current language
  applyLanguage(currentLang);

  // Setup toggle buttons
  const toggleBtns = document.querySelectorAll('.lang-toggle__btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang === currentLang) return;
      switchLanguage(lang);
    });
  });
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('abais-lang', lang);
  applyLanguage(lang);
  updateToggleUI(lang);
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(dict, key);
    if (value !== undefined) {
      // Handle input placeholders
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
  updateToggleUI(lang);
}

function updateToggleUI(lang) {
  const toggleBtns = document.querySelectorAll('.lang-toggle__btn');
  toggleBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('lang-toggle__btn--active');
    } else {
      btn.classList.remove('lang-toggle__btn--active');
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj);
}
