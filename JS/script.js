// ==================== TYPING EFFECT ====================

let typingIndex = 0;
let typingText = "Desarrollador Web & Multiplataforma";
let typingTimeout;

function typing() {
  if (typingIndex < typingText.length) {
    document.getElementById("typing").innerHTML += typingText.charAt(typingIndex);
    typingIndex++;
    typingTimeout = setTimeout(typing, 50);
  }
}

function restartTyping(newText) {
  clearTimeout(typingTimeout);
  typingIndex = 0;
  typingText = newText;
  document.getElementById("typing").innerHTML = "";
  typing();
}

typing();


// ==================== THEME TOGGLE ====================

const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("light");

    // Cambia el icono según el tema activo
    toggle.textContent =
      document.body.classList.contains("light") ? "☀️" : "🌙";
  };
}

// ==================== LANGUAGE TOGGLE ====================

const langToggle = document.getElementById("idiomsToggle");

if (langToggle) {
  langToggle.onclick = () => {
    const newLang = currentLang === "es" ? "en" : "es";
    setLanguage(newLang);
  };
}

// ==================== I18N ====================

let currentLang = "es";
let translations = null;

// Cargar JSON (si lo tienes en archivo externo)
fetch("Json/lenguage.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    setLanguage(currentLang);
  });

function setLanguage(lang) {
  if (!translations) return;

  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const keys = key.split(".");
    let value = translations[lang];

    keys.forEach(k => {
      value = value?.[k];
    });

    if (value) {
      el.innerHTML = value;
    }
  });

  // Typing text también por idioma
  const typingText =
    lang === "es"
      ? "Desarrollador Web & Multiplataforma"
      : "Web & Cross-platform Developer";

  restartTyping(typingText);
}
