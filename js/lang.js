// js/lang.js

const DEFAULT_LANG = "es";

let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

async function loadTranslations(lang) {

  try {

    const res = await fetch(`lang/${lang}.json`);

    if (!res.ok) {
      throw new Error(`No se pudo cargar lang/${lang}.json`);
    }

    const messages = await res.json();

    applyTranslations(messages, lang);

  } catch (error) {

    console.error("Error cargando idioma:", error);
  }
}

function applyTranslations(messages, lang) {

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {

    const key = el.dataset.i18n;

    const value = messages[key];

    if (value !== undefined) {

      // IMPORTANTE:
      // usamos innerHTML porque algunas traducciones tienen <br>

      el.innerHTML = value;
    }
  });

  // Marcar botón activo

  const buttons = document.querySelectorAll(".flag-btn");

  buttons.forEach(button => {

    const buttonLang = button.dataset.language;

    button.classList.toggle("active", buttonLang === lang);
  });
}

function setLanguage(lang) {

  currentLang = lang;

  localStorage.setItem("lang", lang);

  loadTranslations(lang);
}

document.addEventListener("DOMContentLoaded", () => {

  const flagsContainer = document.getElementById("flags");

  if (flagsContainer) {

    flagsContainer.addEventListener("click", e => {

      const button = e.target.closest("[data-language]");

      if (!button) return;

      const lang = button.dataset.language;

      if (lang && lang !== currentLang) {

        setLanguage(lang);
      }
    });
  }

  setLanguage(currentLang);
});
