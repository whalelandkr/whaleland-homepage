"use strict";

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function createServiceCard(service) {
  const article = document.createElement("article");
  article.className = "service-card";
  article.dataset.tone = service.tone || "";

  const meta = document.createElement("div");
  meta.className = "service-meta";

  const number = document.createElement("span");
  number.textContent = service.number || "";

  const status = document.createElement("span");
  status.textContent = service.status || "";

  meta.append(number, status);

  const category = document.createElement("div");
  category.className = "service-category";
  category.textContent = service.category || "";

  const title = document.createElement("h3");
  title.textContent = service.title || "";

  const description = document.createElement("p");
  description.textContent = service.description || "";

  const link = document.createElement("a");
  link.className = "service-link";
  link.textContent = service.cta || "";
  link.href = service.enabled ? service.url : "#";
  link.setAttribute("aria-disabled", service.enabled ? "false" : "true");

  if (service.enabled) {
    link.rel = "noopener";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }

  article.append(meta, category, title, description, link);
  return article;
}

async function initializePage() {
  const locale = document.documentElement.dataset.locale || "ko";
  const root = document.documentElement.dataset.root || "../";

  localStorage.setItem("whalelandLanguage", locale);

  document.querySelectorAll("[data-language]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.language === locale);
    link.addEventListener("click", () => {
      localStorage.setItem("whalelandLanguage", link.dataset.language);
    });
  });

  try {
    const response = await fetch(`${root}locales/${locale}.json`, {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error(`Locale request failed: ${response.status}`);
    }

    const copy = await response.json();

    document.title = copy.meta?.title || "Whale Land";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription && copy.meta?.description) {
      metaDescription.setAttribute("content", copy.meta.description);
    }

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const value = getNestedValue(copy, key);

      if (typeof value === "string") {
        node.textContent = value;
      }
    });

    const serviceGrid = document.getElementById("serviceGrid");
    serviceGrid.replaceChildren();

    copy.services.items.forEach((service) => {
      serviceGrid.appendChild(createServiceCard(service));
    });
  } catch (error) {
    console.error("Whale Land locale loading failed.", error);

    const serviceGrid = document.getElementById("serviceGrid");
    serviceGrid.textContent =
      "The language file could not be loaded. Please refresh the page.";
  }
}

initializePage();
