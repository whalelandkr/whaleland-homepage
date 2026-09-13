"use strict";

const supportedLanguages = ["en", "kr", "cn", "jp"];
const defaultLanguage = "kr";

const documentLanguages = {
  en: "en",
  kr: "ko",
  cn: "zh-CN",
  jp: "ja"
};

function getInitialLanguage() {
  const parameters = new URLSearchParams(window.location.search);
  const urlLanguage = parameters.get("lang")?.toLowerCase();

  if (supportedLanguages.includes(urlLanguage)) {
    return urlLanguage;
  }

  const savedLanguage = localStorage.getItem("covertLanguage");

  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return defaultLanguage;
}

function applyLanguage(language) {
  if (!supportedLanguages.includes(language)) {
    return;
  }

  document.documentElement.lang =
    documentLanguages[language] || documentLanguages[defaultLanguage];

  localStorage.setItem("covertLanguage", language);

  document.querySelectorAll(".language-switcher button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  const reportButton = document.querySelector(".report-button");

  if (reportButton && !new URLSearchParams(window.location.search).has("after")) {
    reportButton.href = `report.html?lang=${encodeURIComponent(language)}`;
  }
}

let currentLanguage = getInitialLanguage();
applyLanguage(currentLanguage);

window.addEventListener("click", (event) => {
  const languageButton = event.target.closest(".language-switcher button");

  if (!languageButton) {
    return;
  }

  const nextLanguage = languageButton.dataset.lang;

  if (!supportedLanguages.includes(nextLanguage)) {
    return;
  }

  currentLanguage = nextLanguage;
  applyLanguage(currentLanguage);

  const parameters = new URLSearchParams(window.location.search);
  parameters.set("lang", nextLanguage);

  const queryString = parameters.toString();
  const nextUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.replaceState({}, "", nextUrl);
});
