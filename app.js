"use strict";

const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh-cn"];
const LANGUAGE_ALIASES = {
  kr: "ko",
  jp: "ja",
  cn: "zh-cn",
  zh: "zh-cn"
};
const DEFAULT_LANGUAGE = "ko";
const SERVICE_SLUGS = ["korean-birth-type", "haedurio", "covert"];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function normalizeLanguage(value) {
  if (!value) {
    return "";
  }

  const normalized = value.toLowerCase();
  const alias = LANGUAGE_ALIASES[normalized] || normalized;
  return SUPPORTED_LANGUAGES.includes(alias) ? alias : "";
}

function detectBrowserLanguage() {
  const browserLanguage = (navigator.language || "").toLowerCase();

  if (browserLanguage.startsWith("ja")) {
    return "ja";
  }

  if (browserLanguage.startsWith("zh")) {
    return "zh-cn";
  }

  if (browserLanguage.startsWith("en")) {
    return "en";
  }

  return DEFAULT_LANGUAGE;
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = normalizeLanguage(params.get("lang"));

  if (fromUrl) {
    return fromUrl;
  }

  const fromStorage = normalizeLanguage(
    localStorage.getItem("whalelandLanguage")
  );

  if (fromStorage) {
    return fromStorage;
  }

  return detectBrowserLanguage();
}

function getServiceSlug() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("service")?.toLowerCase() || "";
  return SERVICE_SLUGS.includes(requested) ? requested : "";
}

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

async function loadCopy(language) {
  const response = await fetch(`./locales/${language}.json`, {
    cache: "no-cache"
  });

  if (!response.ok) {
    throw new Error(`Locale request failed: ${response.status}`);
  }

  return response.json();
}

function updateUrl(language, serviceSlug = "") {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);

  if (serviceSlug) {
    url.searchParams.set("service", serviceSlug);
  } else {
    url.searchParams.delete("service");
  }

  window.history.replaceState({}, "", url);
}

function setDocumentLanguage(language) {
  const htmlLanguages = {
    ko: "ko",
    en: "en",
    ja: "ja",
    "zh-cn": "zh-CN"
  };

  document.documentElement.lang = htmlLanguages[language] || "ko";
}

function setActiveLanguage(language) {
  $$('[data-lang]').forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });
}

function applyStaticText(copy) {
  $$('[data-i18n]').forEach((node) => {
    const value = getNestedValue(copy, node.dataset.i18n);

    if (typeof value === "string") {
      node.textContent = value;
    }
  });
}

function updateHomeLinks(language) {
  $$('[data-home-link]').forEach((link) => {
    link.href = `./index.html?lang=${encodeURIComponent(language)}`;
  });

  $$('[data-home-section]').forEach((link) => {
    const section = link.dataset.homeSection;
    link.href = `./index.html?lang=${encodeURIComponent(language)}#${section}`;
  });
}

function illustrationPath(service) {
  const fileNames = {
    birth: "birth-type.svg",
    haedurio: "haedurio.svg",
    covert: "covert.svg"
  };

  return `./assets/illustrations/${fileNames[service.theme] || "covert.svg"}`;
}

function createWorldCard(service, language) {
  const link = document.createElement("a");
  link.className = "world-card reveal";
  link.dataset.theme = service.theme;
  link.href = `./service.html?service=${encodeURIComponent(service.slug)}&lang=${encodeURIComponent(language)}`;

  link.innerHTML = `
    <span class="world-index">${service.order}</span>
    <div class="world-visual">
      <img src="${illustrationPath(service)}" alt="" />
    </div>
    <div class="world-copy">
      <div class="service-meta">
        <span>${service.category}</span>
        <span class="status-pill">${service.status}</span>
      </div>
      <h3>${service.cardTitle}</h3>
      <p>${service.summary}</p>
    </div>
    <span class="world-link" aria-hidden="true">↗</span>
  `;

  return link;
}

function renderHome(copy, language) {
  const worldList = $("#worldList");
  const principleGrid = $("#principleGrid");

  worldList?.replaceChildren(
    ...Object.values(copy.services).map((service) =>
      createWorldCard(service, language)
    )
  );

  principleGrid?.replaceChildren(
    ...copy.home.principles.map((principle) => {
      const article = document.createElement("article");
      article.className = "principle reveal";
      article.innerHTML = `
        <span class="principle-index">${principle.index}</span>
        <h3>${principle.title}</h3>
        <p>${principle.body}</p>
      `;
      return article;
    })
  );
}

function renderService(copy, language, serviceSlug) {
  const service = copy.services[serviceSlug];

  if (!service) {
    window.location.replace(`./index.html?lang=${encodeURIComponent(language)}`);
    return;
  }

  document.body.dataset.theme = service.theme;
  document.title = `${service.title} — Whale Land`;

  const metaDescription = $('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = service.summary;
  }

  const textMap = {
    serviceOrder: `${service.order} / ${service.category}`,
    serviceHeroTitle: service.heroTitle,
    serviceHeroLead: service.heroLead,
    serviceVisualCaption: service.visualCaption,
    statementEyebrow: service.statementEyebrow,
    statementTitle: service.statementTitle,
    statementBody: service.statementBody,
    featuresTitle: service.featuresTitle,
    processEyebrow: service.processEyebrow,
    processTitle: service.processTitle,
    closingTitle: service.closingTitle,
    closingBody: service.closingBody
  };

  Object.entries(textMap).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  });

  const illustration = $("#serviceIllustration");
  if (illustration) {
    illustration.src = illustrationPath(service);
  }

  const tags = $("#tagList");
  tags?.replaceChildren(
    ...service.tags.map((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      return span;
    })
  );

  $$('[data-external-link]').forEach((link) => {
    const externalUrl = service.externalUrl || "#";
    const isExternalUrl = /^https?:\/\//i.test(externalUrl);

    link.href = externalUrl;
    link.textContent = service.externalCta;

    if (isExternalUrl) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute(
        "aria-label",
        `${service.externalCta}. ${copy.common.externalNotice}`
      );
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-label", service.externalCta);
    }
  });

  const featureGrid = $("#featureGrid");
  featureGrid?.replaceChildren(
    ...service.features.map((feature) => {
      const article = document.createElement("article");
      article.className = "feature-card reveal";
      article.innerHTML = `
        <span class="feature-index">${feature.index}</span>
        <h3>${feature.title}</h3>
        <p>${feature.body}</p>
      `;
      return article;
    })
  );

  const processGrid = $("#processGrid");
  processGrid?.replaceChildren(
    ...service.steps.map((step) => {
      const article = document.createElement("article");
      article.className = "process-step reveal";
      article.innerHTML = `
        <span class="step-index">${step.index}</span>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
      `;
      return article;
    })
  );
}

function setupReveal() {
  const nodes = $$(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  nodes.forEach((node) => observer.observe(node));
}

function setupMenu() {
  const button = $(".menu-toggle");
  const panel = $(".mobile-panel");

  if (!button || !panel || button.dataset.bound === "true") {
    return;
  }

  button.dataset.bound = "true";

  button.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  $$("a", panel).forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function setupVoyagePointerMotion() {
  const scene = $(".voyage-scene");

  if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  scene.addEventListener("pointermove", (event) => {
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.setProperty("--pointer-x", `${x * 16}px`);
    scene.style.setProperty("--pointer-y", `${y * 12}px`);
  });

  scene.addEventListener("pointerleave", () => {
    scene.style.setProperty("--pointer-x", "0px");
    scene.style.setProperty("--pointer-y", "0px");
  });
}

let currentLanguage = getInitialLanguage();
let currentCopy = null;

async function renderLanguage(language, { updateHistory = true } = {}) {
  const normalized = normalizeLanguage(language) || DEFAULT_LANGUAGE;
  const page = document.documentElement.dataset.page;
  const serviceSlug = page === "service" ? getServiceSlug() : "";

  currentLanguage = normalized;
  localStorage.setItem("whalelandLanguage", normalized);
  setDocumentLanguage(normalized);
  setActiveLanguage(normalized);

  if (updateHistory) {
    updateUrl(normalized, serviceSlug);
  }

  currentCopy = await loadCopy(normalized);
  document.title = currentCopy.meta?.title || "Whale Land";

  const metaDescription = $('meta[name="description"]');
  if (metaDescription && currentCopy.meta?.description) {
    metaDescription.content = currentCopy.meta.description;
  }

  applyStaticText(currentCopy);
  updateHomeLinks(normalized);

  if (page === "home") {
    renderHome(currentCopy, normalized);
  } else if (page === "service") {
    renderService(currentCopy, normalized, serviceSlug);
  }

  setupReveal();
}

function setupLanguageButtons() {
  $$('[data-lang]').forEach((button) => {
    button.addEventListener("click", async () => {
      const nextLanguage = normalizeLanguage(button.dataset.lang);

      if (!nextLanguage || nextLanguage === currentLanguage) {
        return;
      }

      try {
        await renderLanguage(nextLanguage);
      } catch (error) {
        console.error("Whale Land language switch failed.", error);
      }
    });
  });
}

async function initialize() {
  try {
    const serviceSlug = getServiceSlug();

    if (
      document.documentElement.dataset.page === "service" &&
      !serviceSlug
    ) {
      window.location.replace(
        `./index.html?lang=${encodeURIComponent(currentLanguage)}`
      );
      return;
    }

    setupLanguageButtons();
    setupMenu();
    setupVoyagePointerMotion();
    await renderLanguage(currentLanguage);
  } catch (error) {
    console.error("Whale Land initialization failed.", error);
    document.body.classList.add("locale-error");
  }
}

initialize();
