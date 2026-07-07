# Whale Land chapter hub refresh
# Run from the whaleland-homepage repository root.

$ErrorActionPreference = "Stop"

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Content
  )

  $fullPath = Join-Path (Get-Location) $Path
  $directory = Split-Path $fullPath -Parent

  if (!(Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)
}

Write-Utf8NoBom "index.html" @'
<!doctype html>
<html lang="ko" data-page="home">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Whale Land</title>
  <meta name="description" content="Whale Land idea company" />
  <link rel="icon" href="./assets/whaleland-logo.png" />
  <link rel="stylesheet" href="./styles.css" />
  <link rel="stylesheet" href="./hub.css" />
</head>
<body>
  <div class="page-grain" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand" href="./index.html" data-home-link aria-label="Whale Land home">
      <img src="./assets/whaleland-logo.png" alt="" />
      <span>Whale Land</span>
    </a>

    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#company" data-home-section="company" data-i18n="common.navCompany"></a>
      <a href="#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
      <a href="#contact" data-home-section="contact" data-i18n="common.navContact"></a>
    </nav>

    <div class="header-actions">
      <nav class="language-nav" aria-label="Language selector">
        <button type="button" data-lang="ko">KR</button>
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="ja">JP</button>
        <button type="button" data-lang="zh-cn">CN</button>
      </nav>

      <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Menu">
        <span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-panel" aria-label="Mobile navigation">
    <a href="#company" data-home-section="company" data-i18n="common.navCompany"></a>
    <a href="#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
    <a href="#service-list" data-home-section="service-list" data-i18n="common.navServiceList"></a>
    <a href="#contact" data-home-section="contact" data-i18n="common.navContact"></a>
  </nav>

  <main class="home-main">
    <section class="chapter logo-chapter" id="top">
      <div class="chapter-bg chapter-bg-one" aria-hidden="true"></div>
      <div class="logo-orbit logo-orbit-one" aria-hidden="true"></div>
      <div class="logo-orbit logo-orbit-two" aria-hidden="true"></div>
      <div class="floating-dot dot-one" aria-hidden="true"></div>
      <div class="floating-dot dot-two" aria-hidden="true"></div>
      <div class="floating-dot dot-three" aria-hidden="true"></div>

      <div class="logo-stage reveal is-visible">
        <p class="eyebrow" data-i18n="home.logoKicker"></p>
        <img class="logo-stage-mark" src="./assets/whaleland-logo.png" alt="Whale Land" />
        <h1 class="logo-stage-title">Whale Land</h1>
        <p class="logo-stage-note" data-i18n="home.logoNote"></p>
      </div>

      <a class="chapter-scroll" href="#company" aria-label="Scroll to company introduction">
        <span></span>
      </a>
    </section>

    <section class="chapter intro-chapter" id="company">
      <div class="chapter-bg chapter-bg-two" aria-hidden="true"></div>
      <div class="intro-card reveal">
        <p class="eyebrow" data-i18n="home.introEyebrow"></p>
        <h2 class="intro-title" data-i18n="home.introTitle"></h2>
        <p class="intro-body" data-i18n="home.introBody"></p>
      </div>
    </section>

    <div class="service-story-chapters" id="service-story" aria-label="Service introductions"></div>

    <section class="chapter service-list-chapter" id="service-list">
      <div class="section-inner">
        <div class="service-list-head reveal">
          <p class="eyebrow" data-i18n="home.serviceListEyebrow"></p>
          <h2 class="section-title" data-i18n="home.serviceListTitle"></h2>
          <p class="section-body" data-i18n="home.serviceListBody"></p>
        </div>

        <div class="service-list-grid" id="serviceList"></div>
      </div>
    </section>

    <section class="chapter contact-chapter" id="contact">
      <div class="chapter-bg chapter-bg-three" aria-hidden="true"></div>
      <div class="contact-card reveal">
        <div>
          <p class="eyebrow" data-i18n="home.contactEyebrow"></p>
          <h2 class="contact-title" data-i18n="home.contactTitle"></h2>
          <p class="contact-body" data-i18n="home.contactBody"></p>
        </div>

        <div class="contact-actions" aria-label="Contact information">
          <a class="contact-line" data-contact-phone-link href="#">
            <span data-i18n="home.contactPhoneLabel"></span>
            <strong data-contact-phone-text></strong>
          </a>
          <a class="contact-line" data-contact-email-link href="#">
            <span data-i18n="home.contactEmailLabel"></span>
            <strong data-contact-email-text></strong>
          </a>
          <button class="copy-email-button" type="button" data-copy-email data-i18n="home.contactCopyEmail"></button>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer hub-footer">
    <div class="footer-brand">
      <img src="./assets/whaleland-logo.png" alt="" />
      <div>
        <strong>Whale Land</strong>
        <span data-i18n="common.footerLine"></span>
      </div>
    </div>

    <nav class="footer-links" aria-label="Footer navigation">
      <a href="#company" data-home-section="company" data-i18n="common.navCompany"></a>
      <a href="#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
      <a href="#service-list" data-home-section="service-list" data-i18n="common.navServiceList"></a>
      <a href="#contact" data-home-section="contact" data-i18n="common.navContact"></a>
    </nav>

    <address class="footer-contact">
      <a data-contact-phone-link href="#"></a>
      <a data-contact-email-link href="#"></a>
      <span data-i18n="common.copyright"></span>
    </address>
  </footer>

  <script src="./app.js"></script>
</body>
</html>
'@

Write-Utf8NoBom "service.html" @'
<!doctype html>
<html lang="ko" data-page="service">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Whale Land Service</title>
  <meta name="description" content="Whale Land service introduction" />
  <link rel="icon" href="./assets/whaleland-logo.png" />
  <link rel="stylesheet" href="./styles.css" />
  <link rel="stylesheet" href="./hub.css" />
</head>
<body class="service-page">
  <div class="page-grain" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand" href="./index.html" data-home-link aria-label="Whale Land home">
      <img src="./assets/whaleland-logo.png" alt="" />
      <span>Whale Land</span>
    </a>

    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="./index.html#company" data-home-section="company" data-i18n="common.navCompany"></a>
      <a href="./index.html#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
      <a href="./index.html#contact" data-home-section="contact" data-i18n="common.navContact"></a>
    </nav>

    <div class="header-actions">
      <nav class="language-nav" aria-label="Language selector">
        <button type="button" data-lang="ko">KR</button>
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="ja">JP</button>
        <button type="button" data-lang="zh-cn">CN</button>
      </nav>

      <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Menu">
        <span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-panel" aria-label="Mobile navigation">
    <a href="./index.html#company" data-home-section="company" data-i18n="common.navCompany"></a>
    <a href="./index.html#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
    <a href="./index.html#service-list" data-home-section="service-list" data-i18n="common.navServiceList"></a>
    <a href="./index.html#contact" data-home-section="contact" data-i18n="common.navContact"></a>
  </nav>

  <main>
    <section class="service-hero">
      <div class="service-hero-copy reveal is-visible">
        <p class="service-order" id="serviceOrder"></p>
        <h1 class="service-hero-title" id="serviceHeroTitle"></h1>
        <p class="service-hero-lead" id="serviceHeroLead"></p>
        <div class="tag-list" id="tagList"></div>
        <a class="button button-primary external-cta" data-external-link href="#"></a>
      </div>

      <div class="service-art reveal is-visible">
        <div class="service-art-orbit" aria-hidden="true"></div>
        <div class="service-art-frame">
          <img id="serviceIllustration" alt="" />
        </div>
        <p class="service-art-caption" id="serviceVisualCaption"></p>
      </div>
    </section>

    <section class="section statement-section">
      <div class="section-inner statement-grid">
        <div class="reveal">
          <p class="eyebrow" id="statementEyebrow"></p>
          <h2 class="statement-title" id="statementTitle"></h2>
        </div>
        <p class="statement-body reveal" id="statementBody"></p>
      </div>
    </section>

    <section class="section feature-section">
      <div class="section-inner">
        <div class="section-head reveal">
          <div>
            <p class="eyebrow">WHAT IT OFFERS</p>
            <h2 class="section-title" id="featuresTitle"></h2>
          </div>
        </div>
        <div class="feature-grid" id="featureGrid"></div>
      </div>
    </section>

    <section class="section process-section">
      <div class="section-inner">
        <div class="section-head reveal">
          <div>
            <p class="eyebrow" id="processEyebrow"></p>
            <h2 class="section-title" id="processTitle"></h2>
          </div>
        </div>
        <div class="process-grid" id="processGrid"></div>
      </div>
    </section>

    <section class="section closing-section">
      <div class="section-inner">
        <div class="closing-card reveal">
          <h2 id="closingTitle"></h2>
          <p id="closingBody"></p>
          <a class="button button-primary" data-external-link href="#"></a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer hub-footer">
    <div class="footer-brand">
      <img src="./assets/whaleland-logo.png" alt="" />
      <div>
        <strong>Whale Land</strong>
        <span data-i18n="common.footerLine"></span>
      </div>
    </div>

    <nav class="footer-links" aria-label="Footer navigation">
      <a href="./index.html#company" data-home-section="company" data-i18n="common.navCompany"></a>
      <a href="./index.html#service-story" data-home-section="service-story" data-i18n="common.navServiceIntro"></a>
      <a href="./index.html#service-list" data-home-section="service-list" data-i18n="common.navServiceList"></a>
      <a href="./index.html#contact" data-home-section="contact" data-i18n="common.navContact"></a>
    </nav>

    <address class="footer-contact">
      <a data-contact-phone-link href="#"></a>
      <a data-contact-email-link href="#"></a>
      <span data-i18n="common.copyright"></span>
    </address>
  </footer>

  <script src="./app.js"></script>
</body>
</html>
'@

Write-Utf8NoBom "app.js" @'
"use strict";

const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh-cn"];
const LANGUAGE_ALIASES = {
  kr: "ko",
  jp: "ja",
  cn: "zh-cn",
  zh: "zh-cn"
};
const DEFAULT_LANGUAGE = "ko";

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
  return params.get("service")?.toLowerCase() || "";
}

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

    if (section) {
      link.href = `./index.html?lang=${encodeURIComponent(language)}#${section}`;
    }
  });

  $$('[data-service-link]').forEach((link) => {
    const slug = link.dataset.serviceLink;

    if (slug) {
      link.href = `./service.html?service=${encodeURIComponent(slug)}&lang=${encodeURIComponent(language)}`;
    }
  });
}

function updateContactLinks(copy) {
  const phone = copy.common?.contactPhone || "070-8028-3008";
  const email = copy.common?.contactEmail || "contact@whalelandkr.com";

  $$('[data-contact-phone-link]').forEach((link) => {
    link.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;

    const textNode = $('[data-contact-phone-text]', link);
    if (textNode) {
      textNode.textContent = phone;
    } else {
      link.textContent = phone;
    }
  });

  $$('[data-contact-email-link]').forEach((link) => {
    link.href = `mailto:${email}`;

    const textNode = $('[data-contact-email-text]', link);
    if (textNode) {
      textNode.textContent = email;
    } else {
      link.textContent = email;
    }
  });
}

function illustrationPath(service) {
  const fileNames = {
    birth: "birth-type.svg",
    haedurio: "haedurio.svg",
    covert: "covert.svg"
  };
  const fileName = service.illustration || fileNames[service.theme] || "covert.svg";

  return `./assets/illustrations/${fileName}`;
}

function getFeaturedServices(copy) {
  const slugs = Array.isArray(copy.home?.featuredServiceSlugs)
    ? copy.home.featuredServiceSlugs
    : Object.keys(copy.services || {});

  return slugs
    .map((slug) => copy.services?.[slug])
    .filter(Boolean);
}

function createServiceFeaturePanel(service, language, index) {
  const section = document.createElement("section");
  section.className = "chapter service-feature-panel reveal";
  section.dataset.theme = service.theme;
  section.style.setProperty("--service-accent", service.accent || "#1674d8");

  section.innerHTML = `
    <div class="service-feature-bg" aria-hidden="true"></div>
    <div class="service-feature-inner">
      <div class="service-feature-copy">
        <p class="eyebrow">${escapeHtml(service.homeEyebrow || service.category)}</p>
        <span class="service-feature-number">${String(index + 3).padStart(2, "0")}</span>
        <h2>${escapeHtml(service.homeTitle || service.title)}</h2>
        <p>${escapeHtml(service.homeDescription || service.summary)}</p>
        <a class="button button-primary" data-service-link="${escapeHtml(service.slug)}" href="./service.html?service=${encodeURIComponent(service.slug)}&lang=${encodeURIComponent(language)}">
          ${escapeHtml(currentCopy?.home?.serviceLinkCta || "View service page")}
        </a>
      </div>
      <div class="service-feature-visual" aria-hidden="true">
        <div class="service-feature-orbit"></div>
        <div class="service-feature-frame">
          <img src="${illustrationPath(service)}" alt="" />
        </div>
      </div>
    </div>
  `;

  return section;
}

function createServiceListCard(service, language) {
  const link = document.createElement("a");
  link.className = "service-list-card reveal";
  link.dataset.theme = service.theme;
  link.dataset.serviceLink = service.slug;
  link.href = `./service.html?service=${encodeURIComponent(service.slug)}&lang=${encodeURIComponent(language)}`;

  link.innerHTML = `
    <span class="service-list-index">${escapeHtml(service.order)}</span>
    <div class="service-list-icon">
      <img src="${illustrationPath(service)}" alt="" />
    </div>
    <div>
      <div class="service-meta">
        <span>${escapeHtml(service.category)}</span>
        <span class="status-pill">${escapeHtml(service.status)}</span>
      </div>
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.summary)}</p>
    </div>
    <span class="world-link" aria-hidden="true">↗</span>
  `;

  return link;
}

function createWorldCard(service, language) {
  return createServiceListCard(service, language);
}

function renderHome(copy, language) {
  const services = getFeaturedServices(copy);
  const serviceStory = $("#serviceStory, #service-story");
  const serviceList = $("#serviceList");
  const worldList = $("#worldList");
  const principleGrid = $("#principleGrid");

  serviceStory?.replaceChildren(
    ...services.map((service, index) =>
      createServiceFeaturePanel(service, language, index)
    )
  );

  serviceList?.replaceChildren(
    ...services.map((service) => createServiceListCard(service, language))
  );

  worldList?.replaceChildren(
    ...services.map((service) => createWorldCard(service, language))
  );

  principleGrid?.replaceChildren(
    ...(copy.home.principles || []).map((principle) => {
      const article = document.createElement("article");
      article.className = "principle reveal";
      article.innerHTML = `
        <span class="principle-index">${escapeHtml(principle.index)}</span>
        <h3>${escapeHtml(principle.title)}</h3>
        <p>${escapeHtml(principle.body)}</p>
      `;
      return article;
    })
  );
}

function renderService(copy, language, serviceSlug) {
  const service = copy.services?.[serviceSlug];

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
      node.textContent = value || "";
    }
  });

  const illustration = $("#serviceIllustration");
  if (illustration) {
    illustration.src = illustrationPath(service);
  }

  const tags = $("#tagList");
  tags?.replaceChildren(
    ...(service.tags || []).map((tag) => {
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
    link.textContent = service.externalCta || copy.common.learnMore;

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
      link.setAttribute("aria-label", service.externalCta || copy.common.learnMore);
    }
  });

  const featureGrid = $("#featureGrid");
  featureGrid?.replaceChildren(
    ...(service.features || []).map((feature) => {
      const article = document.createElement("article");
      article.className = "feature-card reveal";
      article.innerHTML = `
        <span class="feature-index">${escapeHtml(feature.index)}</span>
        <h3>${escapeHtml(feature.title)}</h3>
        <p>${escapeHtml(feature.body)}</p>
      `;
      return article;
    })
  );

  const processGrid = $("#processGrid");
  processGrid?.replaceChildren(
    ...(service.steps || []).map((step) => {
      const article = document.createElement("article");
      article.className = "process-step reveal";
      article.innerHTML = `
        <span class="step-index">${escapeHtml(step.index)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.body)}</p>
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
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
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
  const scene = $(".voyage-scene, .logo-chapter");

  if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  scene.addEventListener("pointermove", (event) => {
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.setProperty("--pointer-x", `${x * 18}px`);
    scene.style.setProperty("--pointer-y", `${y * 14}px`);
  });

  scene.addEventListener("pointerleave", () => {
    scene.style.setProperty("--pointer-x", "0px");
    scene.style.setProperty("--pointer-y", "0px");
  });
}

function setupCopyEmail() {
  $$('[data-copy-email]').forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", async () => {
      const email = currentCopy?.common?.contactEmail || "contact@whalelandkr.com";
      const defaultLabel = currentCopy?.home?.contactCopyEmail || email;
      const copiedLabel = currentCopy?.home?.contactCopiedEmail || defaultLabel;

      try {
        await navigator.clipboard.writeText(email);
        button.textContent = copiedLabel;
        window.setTimeout(() => {
          button.textContent = defaultLabel;
        }, 1800);
      } catch (error) {
        window.location.href = `mailto:${email}`;
      }
    });
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
  updateContactLinks(currentCopy);

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
    setupCopyEmail();
    await renderLanguage(currentLanguage);
  } catch (error) {
    console.error("Whale Land initialization failed.", error);
    document.body.classList.add("locale-error");
  }
}

initialize();
'@

Write-Utf8NoBom "hub.css" @'
/* =========================================================
   WHALE LAND CHAPTER SERVICE HUB
   Full-screen brand chapters + dynamic service hub
   ========================================================= */

:root {
  --hub-ink: #06264a;
  --hub-muted: rgba(6, 38, 74, 0.66);
  --hub-line: rgba(6, 38, 74, 0.11);
  --hub-cream: #fbf4e6;
  --hub-blue: #1674d8;
}

html {
  scroll-padding-top: 76px;
}

body {
  background:
    radial-gradient(circle at 12% 2%, rgba(155, 223, 255, 0.24), transparent 24%),
    radial-gradient(circle at 88% 10%, rgba(95, 201, 130, 0.14), transparent 18%),
    linear-gradient(180deg, #f8fbfc 0%, var(--hub-cream) 100%);
}

.site-header {
  height: 72px;
  color: var(--hub-ink);
  background: rgba(255, 252, 244, 0.82);
  border-bottom: 1px solid rgba(6, 38, 74, 0.09);
  box-shadow: 0 12px 34px rgba(4, 39, 77, 0.06);
  backdrop-filter: blur(20px);
}

.brand img {
  width: 48px;
  height: 48px;
}

.brand span {
  color: var(--hub-ink);
  font-size: 0.96rem;
  letter-spacing: 0.01em;
}

.desktop-nav {
  gap: 24px;
}

.desktop-nav a {
  color: rgba(6, 38, 74, 0.64);
  font-size: 0.72rem;
}

.desktop-nav a:hover {
  color: var(--hub-ink);
}

.language-nav {
  padding: 4px;
  border: 1px solid rgba(6, 38, 74, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
}

.language-nav button {
  color: rgba(6, 38, 74, 0.58);
  font-size: 0.68rem;
}

.language-nav button.is-active {
  color: #fff;
  background: linear-gradient(135deg, var(--hub-blue), #0e4d98);
}

.menu-toggle {
  color: var(--hub-ink);
  border-color: rgba(6, 38, 74, 0.12);
  background: rgba(255,255,255,0.48);
}

.mobile-panel {
  top: 72px;
  background: rgba(255, 252, 244, 0.96);
  border-bottom: 1px solid rgba(6, 38, 74, 0.1);
}

.mobile-panel a {
  color: rgba(6, 38, 74, 0.82);
}

.home-main {
  overflow: hidden;
}

.chapter {
  position: relative;
  min-height: 100svh;
  padding: 110px max(22px, 6vw) 76px;
  display: grid;
  align-items: center;
  isolation: isolate;
  overflow: hidden;
  scroll-margin-top: 72px;
}

.chapter-bg {
  position: absolute;
  inset: 0;
  z-index: -3;
  pointer-events: none;
}

.chapter-bg-one {
  background:
    radial-gradient(circle at 48% 44%, rgba(255, 255, 255, 0.82), transparent 22%),
    radial-gradient(circle at 26% 24%, rgba(155, 223, 255, 0.42), transparent 22%),
    radial-gradient(circle at 78% 74%, rgba(95, 201, 130, 0.20), transparent 24%),
    linear-gradient(180deg, #eefbff 0%, #c6efff 52%, #fbf4e6 100%);
  animation: gradientBreathe 9s ease-in-out infinite alternate;
}

.chapter-bg-two {
  background:
    radial-gradient(circle at 12% 20%, rgba(95, 201, 130, 0.16), transparent 26%),
    radial-gradient(circle at 86% 18%, rgba(155, 223, 255, 0.34), transparent 24%),
    linear-gradient(180deg, #fbf4e6 0%, #eff9fc 100%);
}

.chapter-bg-three {
  background:
    radial-gradient(circle at 20% 10%, rgba(155, 223, 255, 0.22), transparent 26%),
    radial-gradient(circle at 88% 74%, rgba(95, 201, 130, 0.18), transparent 24%),
    linear-gradient(145deg, #05274f 0%, #063667 100%);
}

.logo-chapter {
  place-items: center;
  text-align: center;
  color: var(--hub-ink);
}

.logo-stage {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  transform: translate(var(--pointer-x, 0), var(--pointer-y, 0));
  transition: transform 0.35s ease-out;
}

.logo-stage-mark {
  width: min(360px, 68vw);
  height: auto;
  filter:
    drop-shadow(0 30px 64px rgba(4, 55, 105, 0.18))
    drop-shadow(0 0 10px rgba(255,255,255,0.9));
  animation: logoFloat 6.5s ease-in-out infinite;
}

.logo-stage-title {
  margin: 18px 0 0;
  color: var(--hub-ink);
  font-size: clamp(2.35rem, 7vw, 6.4rem);
  line-height: 0.96;
  letter-spacing: -0.055em;
}

.logo-stage-note {
  margin: 18px 0 0;
  color: rgba(6, 38, 74, 0.48);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.logo-orbit {
  position: absolute;
  z-index: -1;
  border: 1px solid rgba(6, 67, 128, 0.13);
  border-radius: 50%;
  pointer-events: none;
  animation: ringSpin linear infinite;
}

.logo-orbit-one {
  width: min(540px, 86vw);
  aspect-ratio: 1;
  animation-duration: 32s;
}

.logo-orbit-two {
  width: min(700px, 108vw);
  aspect-ratio: 1;
  border-style: dashed;
  opacity: 0.52;
  animation-duration: 46s;
  animation-direction: reverse;
}

.floating-dot {
  position: absolute;
  width: 14px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(22, 116, 216, 0.28);
  box-shadow: 0 0 0 14px rgba(22, 116, 216, 0.05);
  animation: dotFloat 7s ease-in-out infinite;
}

.dot-one { left: 16%; top: 26%; }
.dot-two { right: 18%; top: 30%; animation-delay: -2.1s; }
.dot-three { left: 25%; bottom: 18%; animation-delay: -4.2s; }

.chapter-scroll {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 34px;
  height: 54px;
  border: 1px solid rgba(6, 38, 74, 0.22);
  border-radius: 999px;
  transform: translateX(-50%);
}

.chapter-scroll span {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(6, 38, 74, 0.56);
  transform: translateX(-50%);
  animation: scrollDot 1.8s ease-in-out infinite;
}

.eyebrow {
  margin: 0 0 14px;
  color: #0b79be;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.intro-chapter {
  color: var(--hub-ink);
}

.intro-card,
.contact-card {
  width: min(980px, 100%);
  margin: 0 auto;
  padding: clamp(30px, 6vw, 72px);
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: clamp(26px, 4vw, 44px);
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 26px 70px rgba(5, 61, 116, 0.10);
  backdrop-filter: blur(18px);
}

.intro-title,
.contact-title {
  margin: 0;
  max-width: 880px;
  font-size: clamp(2rem, 5.2vw, 5.4rem);
  line-height: 1.04;
  letter-spacing: -0.055em;
}

.intro-body,
.contact-body {
  max-width: 760px;
  margin: 24px 0 0;
  color: var(--hub-muted);
  font-size: clamp(0.98rem, 1.35vw, 1.16rem);
  line-height: 1.86;
  white-space: pre-line;
}

.service-feature-panel {
  color: var(--hub-ink);
  background:
    radial-gradient(circle at 76% 28%, color-mix(in srgb, var(--service-accent, #1674d8) 22%, transparent), transparent 28%),
    linear-gradient(180deg, #f7fbfc 0%, #fbf4e6 100%);
}

.service-feature-bg {
  position: absolute;
  inset: 0;
  z-index: -3;
  opacity: 0.82;
  background:
    radial-gradient(circle at 16% 18%, rgba(255,255,255,0.74), transparent 22%),
    radial-gradient(circle at 86% 70%, rgba(255,255,255,0.56), transparent 26%);
}

.service-feature-inner {
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.82fr);
  gap: clamp(32px, 5vw, 70px);
  align-items: center;
}

.service-feature-copy {
  position: relative;
}

.service-feature-number {
  display: inline-flex;
  margin-bottom: 22px;
  color: color-mix(in srgb, var(--service-accent, #1674d8) 80%, #06264a);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.service-feature-copy h2 {
  margin: 0;
  max-width: 820px;
  font-size: clamp(2rem, 5.1vw, 5.35rem);
  line-height: 1.03;
  letter-spacing: -0.058em;
}

.service-feature-copy p {
  max-width: 720px;
  margin: 24px 0 0;
  color: var(--hub-muted);
  font-size: clamp(0.98rem, 1.3vw, 1.13rem);
  line-height: 1.82;
}

.service-feature-copy .button {
  margin-top: 30px;
}

.service-feature-visual {
  position: relative;
  min-height: 420px;
  display: grid;
  place-items: center;
}

.service-feature-orbit {
  position: absolute;
  width: min(440px, 82vw);
  aspect-ratio: 1;
  border: 1px dashed color-mix(in srgb, var(--service-accent, #1674d8) 28%, transparent);
  border-radius: 50%;
  animation: ringSpin 42s linear infinite;
}

.service-feature-frame {
  position: relative;
  width: min(340px, 72vw);
  aspect-ratio: 1;
  padding: 34px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.64);
  border-radius: 34px;
  background: rgba(255,255,255,0.68);
  box-shadow: 0 26px 62px rgba(5, 61, 116, 0.12);
  backdrop-filter: blur(14px);
  animation: logoFloat 7.2s ease-in-out infinite;
}

.service-feature-frame img {
  width: 88%;
  height: 88%;
  object-fit: contain;
}

.button {
  min-height: 46px;
  padding: 0 18px;
  font-size: 0.82rem;
}

.button-primary {
  color: #fff;
  background: linear-gradient(135deg, #0b77d8, #074f9e);
  box-shadow: 0 16px 36px rgba(13, 101, 190, 0.20);
}

.service-list-chapter {
  color: var(--hub-ink);
  background: linear-gradient(180deg, #fbf4e6 0%, #eef9fc 100%);
}

.section-inner {
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
}

.service-list-head {
  max-width: 820px;
}

.section-title {
  margin: 0;
  font-size: clamp(1.9rem, 4.3vw, 4.3rem);
  line-height: 1.06;
  letter-spacing: -0.052em;
}

.section-body {
  max-width: 760px;
  margin: 18px 0 0;
  color: var(--hub-muted);
  font-size: 0.98rem;
  line-height: 1.76;
}

.service-list-grid {
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.service-list-card {
  position: relative;
  min-height: 360px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--hub-line);
  border-radius: 26px;
  color: var(--hub-ink);
  background: rgba(255, 255, 255, 0.70);
  box-shadow: 0 18px 42px rgba(5, 61, 116, 0.07);
  text-decoration: none;
  backdrop-filter: blur(12px);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.service-list-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--hub-blue) 28%, transparent);
  box-shadow: 0 28px 58px rgba(5, 61, 116, 0.12);
}

.service-list-index {
  color: rgba(6, 38, 74, 0.46);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72rem;
  font-weight: 900;
}

.service-list-icon {
  height: 128px;
  margin: 18px 0 22px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background:
    radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.96), transparent 24%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(220, 241, 249, 0.82));
}

.service-list-icon img {
  max-width: 78%;
  max-height: 78%;
  object-fit: contain;
}

.service-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: #8090a1;
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.status-pill {
  padding: 5px 8px;
  border-radius: 999px;
  color: #0b3d6f;
  background: rgba(137, 213, 255, 0.24);
}

.service-list-card h3 {
  margin: 12px 0 0;
  font-size: clamp(1.2rem, 2.2vw, 1.7rem);
  line-height: 1.16;
  letter-spacing: -0.036em;
}

.service-list-card p {
  margin: 12px 0 0;
  color: var(--hub-muted);
  font-size: 0.92rem;
  line-height: 1.68;
}

.world-link {
  position: absolute;
  right: 22px;
  bottom: 20px;
  font-size: 1.2rem;
}

.contact-chapter {
  color: #fff;
}

.contact-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.48fr);
  gap: clamp(28px, 5vw, 58px);
  align-items: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.13);
  box-shadow: 0 26px 72px rgba(0, 0, 0, 0.20);
}

.contact-card .eyebrow {
  color: #9bdfff;
}

.contact-body {
  color: rgba(248, 251, 255, 0.72);
}

.contact-actions {
  display: grid;
  gap: 12px;
}

.contact-line,
.copy-email-button {
  width: 100%;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 18px;
  color: #fff;
  background: rgba(255,255,255,0.08);
  text-decoration: none;
  box-shadow: 0 14px 34px rgba(0,0,0,0.12);
  backdrop-filter: blur(12px);
}

.contact-line span {
  color: rgba(248, 251, 255, 0.58);
  font-size: 0.78rem;
  font-weight: 800;
}

.contact-line strong {
  font-size: 0.9rem;
}

.copy-email-button {
  justify-content: center;
  font-weight: 900;
  cursor: pointer;
}

.hub-footer {
  padding: 30px max(22px, 6vw);
  display: grid;
  grid-template-columns: minmax(240px, 1fr) auto minmax(220px, 0.8fr);
  gap: 28px;
  align-items: center;
  color: rgba(6, 38, 74, 0.68);
  background: #fbf4e6;
  border-top: 1px solid rgba(6, 38, 74, 0.09);
  font-size: 0.82rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-brand img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.footer-brand strong,
.footer-brand span {
  display: block;
}

.footer-brand strong {
  color: var(--hub-ink);
}

.footer-brand span {
  margin-top: 4px;
  color: rgba(6, 38, 74, 0.54);
}

.footer-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a,
.footer-contact a {
  color: rgba(6, 38, 74, 0.72);
  text-decoration: none;
}

.footer-links a:hover,
.footer-contact a:hover {
  color: var(--hub-blue);
}

.footer-contact {
  display: grid;
  gap: 5px;
  justify-items: end;
  font-style: normal;
}

.footer-contact span {
  color: rgba(6, 38, 74, 0.42);
  font-size: 0.74rem;
}

.service-page .service-hero {
  min-height: auto;
  padding: 112px max(22px, 6vw) 74px;
  color: var(--hub-ink);
  background:
    radial-gradient(circle at 76% 18%, rgba(255, 246, 203, 0.58), transparent 20%),
    radial-gradient(circle at 84% 48%, rgba(95, 201, 130, 0.20), transparent 18%),
    linear-gradient(180deg, #eefbff 0%, #9fe3ff 52%, #fbf4e6 100%);
}

.service-page .service-hero-title,
.service-page .statement-title,
.service-page .section-title,
.service-page .closing-card h2 {
  font-size: clamp(2rem, 4.2vw, 4.35rem);
  line-height: 1.07;
  letter-spacing: -0.052em;
}

.service-page .service-hero-lead,
.service-page .statement-body,
.service-page .closing-card p {
  font-size: 0.96rem;
  line-height: 1.78;
}

.service-page .service-art {
  min-height: 390px;
}

.service-page .service-art-frame {
  width: min(360px, 78vw);
  padding: 26px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 24px 54px rgba(5, 61, 116, 0.14);
}

.service-page .section {
  padding: 76px max(22px, 6vw);
}

.service-page .feature-card,
.service-page .process-step {
  min-height: 230px;
  padding: 22px;
  border-radius: 22px;
}

.reveal {
  opacity: 0;
  transform: translateY(34px) scale(0.985);
  transition:
    opacity 0.9s ease,
    transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-14px) rotate(1deg); }
}

@keyframes ringSpin {
  to { transform: rotate(360deg); }
}

@keyframes dotFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}

@keyframes scrollDot {
  0% { opacity: 0; transform: translate(-50%, 0); }
  35% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 18px); }
}

@keyframes gradientBreathe {
  from { filter: saturate(0.95) brightness(1); }
  to { filter: saturate(1.08) brightness(1.03); }
}

@media (max-width: 1100px) {
  .chapter {
    min-height: auto;
    padding-top: 104px;
    padding-bottom: 64px;
  }

  .service-feature-inner,
  .contact-card {
    grid-template-columns: 1fr;
  }

  .service-feature-visual {
    min-height: 300px;
    order: -1;
  }

  .service-list-grid {
    grid-template-columns: 1fr;
  }

  .service-list-card {
    min-height: auto;
  }

  .hub-footer {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .footer-links {
    justify-content: flex-start;
  }

  .footer-contact {
    justify-items: start;
  }
}

@media (max-width: 760px) {
  html {
    scroll-padding-top: 68px;
  }

  .site-header {
    height: 68px;
    padding: 0 14px;
  }

  .brand img {
    width: 44px;
    height: 44px;
  }

  .brand span {
    display: none;
  }

  .language-nav button {
    padding: 7px 5px;
  }

  .chapter {
    padding: 94px 18px 52px;
  }

  .logo-stage-mark {
    width: min(280px, 72vw);
  }

  .logo-stage-title {
    font-size: clamp(2.3rem, 13vw, 4.2rem);
  }

  .logo-orbit-one {
    width: min(360px, 92vw);
  }

  .logo-orbit-two {
    width: min(430px, 110vw);
  }

  .intro-card,
  .contact-card {
    padding: 28px 22px;
    border-radius: 26px;
  }

  .intro-title,
  .contact-title,
  .service-feature-copy h2,
  .section-title {
    font-size: clamp(1.72rem, 9vw, 3.05rem);
  }

  .intro-body,
  .contact-body,
  .service-feature-copy p,
  .section-body {
    font-size: 0.94rem;
    line-height: 1.76;
  }

  .service-feature-visual {
    min-height: 250px;
  }

  .service-feature-frame {
    width: min(260px, 78vw);
    padding: 22px;
    border-radius: 24px;
  }

  .service-feature-orbit {
    width: min(310px, 90vw);
  }

  .service-list-grid {
    margin-top: 24px;
  }

  .service-list-icon {
    height: 108px;
  }

  .contact-line {
    display: grid;
    justify-content: stretch;
    gap: 6px;
  }

  .hub-footer {
    padding: 28px 18px 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
'@

Write-Utf8NoBom "locales/ko.json" @'
{
  "meta": {
    "title": "Whale Land — 즐거운 아이디어를 서비스로 만드는 회사",
    "description": "Whale Land는 재밌고 즐거운 아이디어로 세상을 더 다양하고 행복하게 바꾸는 서비스를 만듭니다."
  },
  "common": {
    "navCompany": "회사 소개",
    "navServiceIntro": "서비스 소개",
    "navServiceList": "서비스 목록",
    "navContact": "문의",
    "backHome": "Whale Land로 돌아가기",
    "officialSite": "공식 사이트",
    "learnMore": "자세히 보기",
    "externalNotice": "독립 서비스 사이트로 이동합니다.",
    "contactPhone": "070-8028-3008",
    "contactEmail": "contact@whalelandkr.com",
    "footerLine": "Fun ideas, useful services, happier moments.",
    "copyright": "© 2026 Whale Land. All rights reserved."
  },
  "home": {
    "logoKicker": "WHALE LAND / IDEA COMPANY",
    "logoNote": "SEOUL · IDEAS IN MOTION",
    "introEyebrow": "ABOUT WHALE LAND",
    "introTitle": "재밌고 즐거운 아이디어로, 세상을 조금 더 다양하고 행복하게.",
    "introBody": "웨일랜드는 사람들의 일상과 여행 속에 작은 재미를 더하는 회사를 지향합니다.\n기술, 이야기, 캐릭터, 실물 경험을 자유롭게 섞어 새로운 서비스를 실험하고 만듭니다.\n지금의 서비스는 끝이 아니라, 계속 바뀌고 확장되는 웨일랜드의 현재 모습입니다.",
    "serviceSectionEyebrow": "SERVICE INTRODUCTION",
    "serviceLinkCta": "서비스 페이지 보기",
    "serviceListEyebrow": "SERVICE HUB",
    "serviceListTitle": "지금 만날 수 있는 웨일랜드의 서비스",
    "serviceListBody": "각 서비스는 독립된 세계관과 기능을 가진 프로젝트입니다. 새 서비스가 생기면 이 허브에 자연스럽게 추가됩니다.",
    "contactEyebrow": "CONTACT WHALE LAND",
    "contactTitle": "새로운 제안, 협업, 문의를 기다립니다.",
    "contactBody": "서비스 이용, 제휴, 제작 문의가 있다면 아래 연락처로 보내주세요. 이메일 주소는 버튼으로 바로 복사할 수 있습니다.",
    "contactPhoneLabel": "전화",
    "contactEmailLabel": "이메일",
    "contactCopyEmail": "문의 이메일 복사",
    "contactCopiedEmail": "이메일을 복사했습니다",
    "featuredServiceSlugs": ["korean-birth-type", "haedurio", "covert"],
    "principles": []
  },
  "services": {
    "korean-birth-type": {
      "slug": "korean-birth-type",
      "order": "01",
      "theme": "birth",
      "accent": "#8b6bff",
      "illustration": "birth-type.svg",
      "status": "LIVE",
      "category": "SELF-DISCOVERY",
      "title": "Korean Birth Type",
      "cardTitle": "한국식 사주 해석으로 나를 시험해보세요.",
      "summary": "당신은 당신에 대해서 잘 알고 있나요? 한국식 사주 해석으로 당신을 시험해보세요. 어쩌면 당신의 진짜 사랑과 운을 알 수 있을지 몰라요.",
      "homeEyebrow": "KOREAN BIRTH TYPE",
      "homeTitle": "당신은 당신에 대해서 잘 알고 있나요?",
      "homeDescription": "한국식 사주 해석으로 당신을 시험해보세요. 어쩌면 당신의 진짜 사랑과 운을 알 수 있을지 몰라요.",
      "heroTitle": "한국식 사주 해석으로 나를 시험해보세요.",
      "heroLead": "Korean Birth Type은 사주를 무거운 예언이 아니라, 나를 읽어보는 흥미로운 자기이해 경험으로 다시 만든 서비스입니다.",
      "visualCaption": "A playful self-reading system inspired by Korean saju.",
      "externalUrl": "https://koreanbirthtype.com",
      "externalCta": "Korean Birth Type 시작하기",
      "tags": ["SELF-DISCOVERY", "SAJU", "DIGITAL CARDS"],
      "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
      "statementTitle": "예언보다 가볍게, 테스트보다 깊게.",
      "statementBody": "태어난 날짜와 시간에서 출발하지만 미래를 단정하지 않습니다. 일주, 오행, 관계, 재물의 흐름을 카드처럼 읽으며 내가 어떤 사람인지 새롭게 확인해보는 경험입니다.",
      "featuresTitle": "나를 읽는 카드형 경험",
      "features": [
        {"index": "01", "title": "한국식 해석", "body": "사주의 구조를 현대적인 언어와 카드 경험으로 풀어냅니다."},
        {"index": "02", "title": "사랑과 운의 힌트", "body": "관계, 성향, 흐름을 가볍지만 기억에 남는 방식으로 보여줍니다."},
        {"index": "03", "title": "모바일 저장", "body": "결과를 카드처럼 보고 저장하며 다시 꺼내볼 수 있게 설계합니다."}
      ],
      "processEyebrow": "HOW IT FLOWS",
      "processTitle": "입력하고, 읽고, 저장합니다.",
      "steps": [
        {"index": "01", "title": "생년월일 입력", "body": "나의 기본 정보를 입력합니다."},
        {"index": "02", "title": "카드 리딩", "body": "사주 기반 해석이 카드처럼 펼쳐집니다."},
        {"index": "03", "title": "결과 확인", "body": "마음에 남는 내용을 저장하고 다시 확인합니다."}
      ],
      "closingTitle": "당신의 Korean Birth Type을 확인하세요.",
      "closingBody": "나를 잘 안다고 생각했던 사람에게도 새로운 힌트가 될 수 있습니다."
    },
    "haedurio": {
      "slug": "haedurio",
      "order": "02",
      "theme": "haedurio",
      "accent": "#16a6c8",
      "illustration": "haedurio.svg",
      "status": "LIVE",
      "category": "TRAVEL SUPPORT",
      "title": "해드리오",
      "cardTitle": "한국에서 곤란한 일이 있나요?",
      "summary": "한국에서 곤란한 일이 있나요? 무엇이든 해결하는 해결사, 해드리오 서비스를 이용해보세요.",
      "homeEyebrow": "HAEDURIO",
      "homeTitle": "한국에서 곤란한 일이 있나요?",
      "homeDescription": "무엇이든 해결하는 해결사, 해드리오 서비스를 이용해보세요. 여행 중 막힌 순간을 다시 움직이게 만듭니다.",
      "heroTitle": "여행 중 막힌 순간, 해드리오가 돕습니다.",
      "heroLead": "해드리오는 한국 여행 중 예약, 구매, 배송, 분실 등 혼자 해결하기 어려운 문제를 현지 맥락으로 정리하고 다음 행동을 찾도록 돕는 서비스입니다.",
      "visualCaption": "Local help for the moments that interrupt your trip.",
      "externalUrl": "https://haedurio.com",
      "externalCta": "해드리오 이용하기",
      "tags": ["LOCAL SUPPORT", "TRAVEL HELP", "KOREA"],
      "statementEyebrow": "KEEP THE TRIP MOVING",
      "statementTitle": "곤란한 시간은 짧게, 여행은 계속되게.",
      "statementBody": "낯선 언어와 지역에서는 작은 문제도 여행 전체를 멈추게 할 수 있습니다. 해드리오는 상황을 정리하고 가능한 선택지를 확인해 여행자가 다음 행동을 결정할 수 있도록 돕습니다.",
      "featuresTitle": "문제 설명부터 해결 경로까지",
      "features": [
        {"index": "01", "title": "상황 정리", "body": "복잡한 상황도 필요한 정보부터 차근차근 정리합니다."},
        {"index": "02", "title": "현지 맥락 확인", "body": "한국의 예약, 구매, 배송 환경을 기준으로 가능한 방법을 확인합니다."},
        {"index": "03", "title": "다음 행동 안내", "body": "무엇을 해야 하는지 이해할 수 있도록 진행 방향을 제시합니다."}
      ],
      "processEyebrow": "HOW IT WORKS",
      "processTitle": "문제가 생긴 순간부터, 다시 여행으로 돌아갈 때까지.",
      "steps": [
        {"index": "01", "title": "상황 전달", "body": "무슨 일이 생겼는지 알려주세요."},
        {"index": "02", "title": "해결 경로 확인", "body": "가능한 방법과 필요한 절차를 확인합니다."},
        {"index": "03", "title": "진행 안내", "body": "선택한 방향에 따라 다음 단계로 이어집니다."}
      ],
      "closingTitle": "한국 여행의 해결사, 해드리오.",
      "closingBody": "막힌 순간이 생기면 해드리오에서 상황을 알려주세요."
    },
    "covert": {
      "slug": "covert",
      "order": "03",
      "theme": "covert",
      "accent": "#25384a",
      "illustration": "covert.svg",
      "status": "PREPARING",
      "category": "MISSION TRAVEL",
      "title": "범이 스탬프 투어",
      "cardTitle": "평범한 여행은 그만!",
      "summary": "평범한 여행은 그만! 이제는 잠입침투액션관광의 시대입니다. 범이와 함께 Mission CLEAR!",
      "homeEyebrow": "BEOMI STAMP TOUR",
      "homeTitle": "평범한 여행은 그만!",
      "homeDescription": "이제는 잠입침투액션관광의 시대입니다. 범이와 함께 서울을 누비고, 스탬프를 모으며 Mission CLEAR!",
      "heroTitle": "범이와 함께 Mission CLEAR!",
      "heroLead": "범이 스탬프 투어는 서울의 장소를 작전 구역으로 바꾸고, 여행자가 미션 수첩을 들고 직접 탐험과 기록을 완수하는 스파이 콘셉트 여행 상품입니다.",
      "visualCaption": "A field mission hidden inside an ordinary city trip.",
      "externalUrl": "/covert/?lang=kr",
      "externalCta": "범이 스탬프 투어 입장",
      "tags": ["STAMP TOUR", "SEOUL", "MISSION"],
      "statementEyebrow": "YOUR CITY. YOUR MISSION.",
      "statementTitle": "관광지를 보는 여행에서, 임무를 완수하는 여행으로.",
      "statementBody": "유명한 장소를 보는 것만으로 끝나지 않습니다. 미션 수첩을 펼치고 작전 구역을 찾아가 스탬프와 현장 기록을 수집하면 서울 여행 전체가 하나의 비밀 임무가 됩니다.",
      "featuresTitle": "손에 들고 걷는 비밀 작전",
      "features": [
        {"index": "01", "title": "여권형 미션 수첩", "body": "작전 브리핑, 장소 정보, 기록 공간을 담은 실물 수첩입니다."},
        {"index": "02", "title": "서울 작전 구역", "body": "전통, 쇼핑, 음식, 야경과 동네 문화를 미션처럼 탐험합니다."},
        {"index": "03", "title": "범이와 함께", "body": "귀여운 요원 범이와 함께 스탬프를 모으고 미션을 클리어합니다."}
      ],
      "processEyebrow": "MISSION FLOW",
      "processTitle": "브리핑을 받고, 현장으로 이동하고, 기록을 남깁니다.",
      "steps": [
        {"index": "01", "title": "브리핑 수령", "body": "미션 수첩에서 작전 구역과 지령을 확인합니다."},
        {"index": "02", "title": "현장 작전", "body": "도시를 이동하며 스탬프와 현장 기록을 수집합니다."},
        {"index": "03", "title": "Mission CLEAR", "body": "수첩을 채우고 나만의 서울 작전을 완수합니다."}
      ],
      "closingTitle": "서울은 이미 작전 구역입니다.",
      "closingBody": "범이와 함께 평범한 여행을 미션으로 바꿔보세요."
    }
  }
}
'@

Write-Utf8NoBom "locales/en.json" @'
{
  "meta": {
    "title": "Whale Land — An idea company for playful services",
    "description": "Whale Land creates playful services that make the world more varied, useful, and happy."
  },
  "common": {
    "navCompany": "Company",
    "navServiceIntro": "Services",
    "navServiceList": "Service list",
    "navContact": "Contact",
    "backHome": "Back to Whale Land",
    "officialSite": "Official site",
    "learnMore": "Learn more",
    "externalNotice": "You are entering an independent service site.",
    "contactPhone": "070-8028-3008",
    "contactEmail": "contact@whalelandkr.com",
    "footerLine": "Fun ideas, useful services, happier moments.",
    "copyright": "© 2026 Whale Land. All rights reserved."
  },
  "home": {
    "logoKicker": "WHALE LAND / IDEA COMPANY",
    "logoNote": "SEOUL · IDEAS IN MOTION",
    "introEyebrow": "ABOUT WHALE LAND",
    "introTitle": "We use playful ideas to make the world a little more varied and happy.",
    "introBody": "Whale Land builds services that add small sparks of fun to everyday life and travel.\nWe mix technology, stories, characters, and physical experiences freely.\nThe services you see now are not a fixed lineup, but the current shape of an evolving company.",
    "serviceSectionEyebrow": "SERVICE INTRODUCTION",
    "serviceLinkCta": "View service page",
    "serviceListEyebrow": "SERVICE HUB",
    "serviceListTitle": "Whale Land services you can meet now",
    "serviceListBody": "Each service is an independent project with its own world and purpose. New services can be added to this hub as Whale Land evolves.",
    "contactEyebrow": "CONTACT WHALE LAND",
    "contactTitle": "We welcome proposals, partnerships, and questions.",
    "contactBody": "For service use, partnerships, production, or business inquiries, contact us below. You can copy the email address with one button.",
    "contactPhoneLabel": "Phone",
    "contactEmailLabel": "Email",
    "contactCopyEmail": "Copy inquiry email",
    "contactCopiedEmail": "Email copied",
    "featuredServiceSlugs": ["korean-birth-type", "haedurio", "covert"],
    "principles": []
  },
  "services": {
    "korean-birth-type": {
      "slug": "korean-birth-type",
      "order": "01",
      "theme": "birth",
      "accent": "#8b6bff",
      "illustration": "birth-type.svg",
      "status": "LIVE",
      "category": "SELF-DISCOVERY",
      "title": "Korean Birth Type",
      "cardTitle": "Test yourself through Korean-style saju reading.",
      "summary": "Do you really know yourself? Test yourself through Korean-style saju reading. You may discover hints about your real love and luck.",
      "homeEyebrow": "KOREAN BIRTH TYPE",
      "homeTitle": "Do you really know yourself?",
      "homeDescription": "Test yourself through Korean-style saju reading. You may discover hints about your real love and luck.",
      "heroTitle": "Test yourself through Korean-style saju reading.",
      "heroLead": "Korean Birth Type turns saju into a playful self-understanding experience, not a heavy prediction.",
      "visualCaption": "A playful self-reading system inspired by Korean saju.",
      "externalUrl": "https://koreanbirthtype.com",
      "externalCta": "Start Korean Birth Type",
      "tags": ["SELF-DISCOVERY", "SAJU", "DIGITAL CARDS"],
      "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
      "statementTitle": "Lighter than a prophecy, deeper than a quiz.",
      "statementBody": "It starts from your birth date and time, but it does not define your future. It turns day pillars, five elements, relationships, and luck into cards that help you look at yourself in a new way.",
      "featuresTitle": "A card-based way to read yourself",
      "features": [
        {"index": "01", "title": "Korean-style reading", "body": "Saju structures are translated into modern language and card experiences."},
        {"index": "02", "title": "Hints on love and luck", "body": "Relationships, tendencies, and rhythms are shown in a light but memorable way."},
        {"index": "03", "title": "Mobile saving", "body": "Read the result like cards, save what stays with you, and revisit it later."}
      ],
      "processEyebrow": "HOW IT FLOWS",
      "processTitle": "Enter, read, and save.",
      "steps": [
        {"index": "01", "title": "Enter birth data", "body": "Add the basic information needed for the reading."},
        {"index": "02", "title": "Card reading", "body": "The saju-based interpretation unfolds as cards."},
        {"index": "03", "title": "Check results", "body": "Save memorable parts and return to them later."}
      ],
      "closingTitle": "Find your Korean Birth Type.",
      "closingBody": "Even if you think you know yourself well, it may give you a new clue."
    },
    "haedurio": {
      "slug": "haedurio",
      "order": "02",
      "theme": "haedurio",
      "accent": "#16a6c8",
      "illustration": "haedurio.svg",
      "status": "LIVE",
      "category": "TRAVEL SUPPORT",
      "title": "Haedurio",
      "cardTitle": "Having trouble in Korea?",
      "summary": "Having trouble in Korea? Use Haedurio, the fixer service that helps solve almost anything.",
      "homeEyebrow": "HAEDURIO",
      "homeTitle": "Having trouble in Korea?",
      "homeDescription": "Use Haedurio, the fixer service that helps solve almost anything. We help stuck travel moments move again.",
      "heroTitle": "When your trip gets stuck, Haedurio helps.",
      "heroLead": "Haedurio helps travelers in Korea organize problems such as reservations, purchases, delivery, and lost items, then find the next practical step.",
      "visualCaption": "Local help for the moments that interrupt your trip.",
      "externalUrl": "https://haedurio.com",
      "externalCta": "Use Haedurio",
      "tags": ["LOCAL SUPPORT", "TRAVEL HELP", "KOREA"],
      "statementEyebrow": "KEEP THE TRIP MOVING",
      "statementTitle": "Shorten the trouble. Keep the trip going.",
      "statementBody": "In an unfamiliar language and place, small issues can stop the whole trip. Haedurio organizes the situation, checks possible options, and helps travelers decide what to do next.",
      "featuresTitle": "From problem description to next step",
      "features": [
        {"index": "01", "title": "Situation sorting", "body": "We help organize complicated situations from the necessary information first."},
        {"index": "02", "title": "Local context", "body": "We check possible options based on Korea's reservation, purchase, and delivery environment."},
        {"index": "03", "title": "Next-step guidance", "body": "We help you understand what to do next beyond simple translation."}
      ],
      "processEyebrow": "HOW IT WORKS",
      "processTitle": "From the moment a problem appears to the moment your trip moves again.",
      "steps": [
        {"index": "01", "title": "Share the situation", "body": "Tell us what happened."},
        {"index": "02", "title": "Check paths", "body": "We check possible methods and needed steps."},
        {"index": "03", "title": "Move forward", "body": "Continue with the option that fits your situation."}
      ],
      "closingTitle": "Haedurio, your Korea travel fixer.",
      "closingBody": "When something gets stuck, tell Haedurio what happened."
    },
    "covert": {
      "slug": "covert",
      "order": "03",
      "theme": "covert",
      "accent": "#25384a",
      "illustration": "covert.svg",
      "status": "PREPARING",
      "category": "MISSION TRAVEL",
      "title": "Beomi Stamp Tour",
      "cardTitle": "No more ordinary travel!",
      "summary": "No more ordinary travel! It is time for infiltration-action tourism. Mission CLEAR with Beomi!",
      "homeEyebrow": "BEOMI STAMP TOUR",
      "homeTitle": "No more ordinary travel!",
      "homeDescription": "It is time for infiltration-action tourism. Move through Seoul with Beomi, collect stamps, and Mission CLEAR!",
      "heroTitle": "Mission CLEAR with Beomi!",
      "heroLead": "Beomi Stamp Tour turns Seoul locations into operation zones. Travelers carry a mission booklet, explore the city, and complete records like field agents.",
      "visualCaption": "A field mission hidden inside an ordinary city trip.",
      "externalUrl": "/covert/?lang=kr",
      "externalCta": "Enter Beomi Stamp Tour",
      "tags": ["STAMP TOUR", "SEOUL", "MISSION"],
      "statementEyebrow": "YOUR CITY. YOUR MISSION.",
      "statementTitle": "From seeing tourist spots to clearing missions.",
      "statementBody": "The trip does not end with simply seeing famous places. Open the mission booklet, visit operation zones, collect stamps and field notes, and Seoul becomes one secret mission.",
      "featuresTitle": "A secret operation you can hold",
      "features": [
        {"index": "01", "title": "Passport-style booklet", "body": "A physical booklet with briefings, location info, and recording space."},
        {"index": "02", "title": "Seoul operation zones", "body": "Explore tradition, shopping, food, night views, and local neighborhoods as missions."},
        {"index": "03", "title": "With Beomi", "body": "Collect stamps and clear missions with cute agent Beomi."}
      ],
      "processEyebrow": "MISSION FLOW",
      "processTitle": "Receive the briefing, move to the field, and leave records.",
      "steps": [
        {"index": "01", "title": "Receive briefing", "body": "Check operation zones and directives in the mission booklet."},
        {"index": "02", "title": "Field operation", "body": "Move through the city and collect stamps and field records."},
        {"index": "03", "title": "Mission CLEAR", "body": "Fill the booklet and complete your own Seoul operation."}
      ],
      "closingTitle": "Seoul is already an operation zone.",
      "closingBody": "Turn ordinary travel into a mission with Beomi."
    }
  }
}
'@

Write-Utf8NoBom "locales/ja.json" @'
{
  "meta": {
    "title": "Whale Land — 楽しいアイデアをサービスにする会社",
    "description": "Whale Landは、楽しいアイデアで世界をもっと多様で幸せにするサービスをつくります。"
  },
  "common": {
    "navCompany": "会社紹介",
    "navServiceIntro": "サービス紹介",
    "navServiceList": "サービス一覧",
    "navContact": "お問い合わせ",
    "backHome": "Whale Landへ戻る",
    "officialSite": "公式サイト",
    "learnMore": "詳しく見る",
    "externalNotice": "独立したサービスサイトへ移動します。",
    "contactPhone": "070-8028-3008",
    "contactEmail": "contact@whalelandkr.com",
    "footerLine": "Fun ideas, useful services, happier moments.",
    "copyright": "© 2026 Whale Land. All rights reserved."
  },
  "home": {
    "logoKicker": "WHALE LAND / IDEA COMPANY",
    "logoNote": "SEOUL · IDEAS IN MOTION",
    "introEyebrow": "ABOUT WHALE LAND",
    "introTitle": "楽しくておもしろいアイデアで、世界を少しだけ多様で幸せに。",
    "introBody": "Whale Landは、日常や旅の中に小さな楽しさを加える会社を目指しています。\nテクノロジー、物語、キャラクター、リアルな体験を自由に組み合わせます。\n今あるサービスは固定されたすべてではなく、変化し続けるWhale Landの現在の姿です。",
    "serviceSectionEyebrow": "SERVICE INTRODUCTION",
    "serviceLinkCta": "サービスページを見る",
    "serviceListEyebrow": "SERVICE HUB",
    "serviceListTitle": "いま出会えるWhale Landのサービス",
    "serviceListBody": "それぞれのサービスは、独自の世界観と機能を持つプロジェクトです。新しいサービスが生まれたら、このハブに自然に追加されます。",
    "contactEyebrow": "CONTACT WHALE LAND",
    "contactTitle": "ご提案、協業、お問い合わせをお待ちしています。",
    "contactBody": "サービス利用、提携、制作に関するお問い合わせは下記までお送りください。メールアドレスはボタンでコピーできます。",
    "contactPhoneLabel": "電話",
    "contactEmailLabel": "メール",
    "contactCopyEmail": "問い合わせメールをコピー",
    "contactCopiedEmail": "メールをコピーしました",
    "featuredServiceSlugs": ["korean-birth-type", "haedurio", "covert"],
    "principles": []
  },
  "services": {
    "korean-birth-type": {
      "slug": "korean-birth-type",
      "order": "01",
      "theme": "birth",
      "accent": "#8b6bff",
      "illustration": "birth-type.svg",
      "status": "公開中",
      "category": "SELF-DISCOVERY",
      "title": "Korean Birth Type",
      "cardTitle": "韓国式の四柱推命で自分を試してみませんか。",
      "summary": "あなたは自分のことを本当に知っていますか？韓国式の四柱推命で自分を試してみましょう。もしかすると本当の恋や運のヒントが見つかるかもしれません。",
      "homeEyebrow": "KOREAN BIRTH TYPE",
      "homeTitle": "あなたは自分のことを本当に知っていますか？",
      "homeDescription": "韓国式の四柱推命で自分を試してみましょう。もしかすると本当の恋や運のヒントが見つかるかもしれません。",
      "heroTitle": "韓国式の四柱推命で自分を試してみる。",
      "heroLead": "Korean Birth Typeは、四柱推命を重い予言ではなく、自分を楽しく読み解く体験として再設計したサービスです。",
      "visualCaption": "A playful self-reading system inspired by Korean saju.",
      "externalUrl": "https://koreanbirthtype.com",
      "externalCta": "Korean Birth Typeを始める",
      "tags": ["SELF-DISCOVERY", "SAJU", "DIGITAL CARDS"],
      "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
      "statementTitle": "予言より軽く、診断より深く。",
      "statementBody": "生年月日と出生時刻から始まりますが、未来を断定するものではありません。日柱、五行、関係性、運の流れをカードのように読み、自分を新しい角度から見つめる体験です。",
      "featuresTitle": "自分を読むカード体験",
      "features": [
        {"index": "01", "title": "韓国式の解釈", "body": "四柱推命の構造を現代的な言葉とカード体験に置き換えます。"},
        {"index": "02", "title": "恋と運のヒント", "body": "関係性、性格、流れを軽やかで記憶に残る形で見せます。"},
        {"index": "03", "title": "モバイル保存", "body": "結果をカードのように見て、気になる内容を保存できます。"}
      ],
      "processEyebrow": "HOW IT FLOWS",
      "processTitle": "入力して、読んで、保存します。",
      "steps": [
        {"index": "01", "title": "生年月日を入力", "body": "リーディングに必要な基本情報を入力します。"},
        {"index": "02", "title": "カードリーディング", "body": "四柱推命ベースの解釈がカードとして展開されます。"},
        {"index": "03", "title": "結果確認", "body": "印象に残った内容を保存し、あとで見返せます。"}
      ],
      "closingTitle": "あなたのKorean Birth Typeを確認しましょう。",
      "closingBody": "自分をよく知っていると思っていても、新しいヒントになるかもしれません。"
    },
    "haedurio": {
      "slug": "haedurio",
      "order": "02",
      "theme": "haedurio",
      "accent": "#16a6c8",
      "illustration": "haedurio.svg",
      "status": "公開中",
      "category": "TRAVEL SUPPORT",
      "title": "ヘドゥリオ",
      "cardTitle": "韓国で困ったことがありますか？",
      "summary": "韓国で困ったことがありますか？何でも解決する助っ人、ヘドゥリオを使ってみてください。",
      "homeEyebrow": "HAEDURIO",
      "homeTitle": "韓国で困ったことがありますか？",
      "homeDescription": "何でも解決する助っ人、ヘドゥリオを使ってみてください。旅の途中で止まった瞬間を、もう一度動かします。",
      "heroTitle": "旅の途中で困ったら、ヘドゥリオが助けます。",
      "heroLead": "ヘドゥリオは、韓国旅行中の予約、購入、配送、紛失など、一人では解決しにくい問題を整理し、次の行動を見つけるためのサービスです。",
      "visualCaption": "Local help for the moments that interrupt your trip.",
      "externalUrl": "https://haedurio.com",
      "externalCta": "ヘドゥリオを利用する",
      "tags": ["LOCAL SUPPORT", "TRAVEL HELP", "KOREA"],
      "statementEyebrow": "KEEP THE TRIP MOVING",
      "statementTitle": "困る時間は短く、旅はそのまま続くように。",
      "statementBody": "慣れない言語や地域では、小さな問題でも旅全体が止まってしまうことがあります。ヘドゥリオは状況を整理し、可能な選択肢を確認し、次に何をすべきかを決める手助けをします。",
      "featuresTitle": "問題説明から解決ルートまで",
      "features": [
        {"index": "01", "title": "状況整理", "body": "複雑な状況も必要な情報から順に整理します。"},
        {"index": "02", "title": "現地文脈の確認", "body": "韓国の予約、購入、配送環境を基準に可能な方法を確認します。"},
        {"index": "03", "title": "次の行動案内", "body": "単なる翻訳ではなく、実際に何をすべきか分かるよう案内します。"}
      ],
      "processEyebrow": "HOW IT WORKS",
      "processTitle": "問題が起きた瞬間から、旅に戻るまで。",
      "steps": [
        {"index": "01", "title": "状況を共有", "body": "何が起きたのかを教えてください。"},
        {"index": "02", "title": "解決方法を確認", "body": "可能な方法と必要な手順を確認します。"},
        {"index": "03", "title": "進行案内", "body": "選んだ方向に合わせて次の段階へ進みます。"}
      ],
      "closingTitle": "韓国旅行の助っ人、ヘドゥリオ。",
      "closingBody": "困った瞬間があれば、ヘドゥリオに状況を知らせてください。"
    },
    "covert": {
      "slug": "covert",
      "order": "03",
      "theme": "covert",
      "accent": "#25384a",
      "illustration": "covert.svg",
      "status": "準備中",
      "category": "MISSION TRAVEL",
      "title": "ボミ スタンプツアー",
      "cardTitle": "普通の旅行はもう終わり！",
      "summary": "普通の旅行はもう終わり！これからは潜入アクション観光の時代です。ボミと一緒にMission CLEAR!",
      "homeEyebrow": "BEOMI STAMP TOUR",
      "homeTitle": "普通の旅行はもう終わり！",
      "homeDescription": "これからは潜入アクション観光の時代です。ボミと一緒にソウルを巡り、スタンプを集めてMission CLEAR!",
      "heroTitle": "ボミと一緒にMission CLEAR!",
      "heroLead": "ボミ スタンプツアーは、ソウルのスポットを作戦区域に変え、旅行者がミッション手帳を持って探索と記録を完了するスパイコンセプトの旅行商品です。",
      "visualCaption": "A field mission hidden inside an ordinary city trip.",
      "externalUrl": "/covert/?lang=kr",
      "externalCta": "ボミ スタンプツアーへ",
      "tags": ["STAMP TOUR", "SEOUL", "MISSION"],
      "statementEyebrow": "YOUR CITY. YOUR MISSION.",
      "statementTitle": "観光地を見る旅から、任務を達成する旅へ。",
      "statementBody": "有名な場所を見るだけでは終わりません。ミッション手帳を開き、作戦区域を訪れ、スタンプと現地記録を集めると、ソウル旅行全体がひとつの秘密任務になります。",
      "featuresTitle": "手に持って歩く秘密作戦",
      "features": [
        {"index": "01", "title": "パスポート型ミッション手帳", "body": "作戦ブリーフィング、場所情報、記録スペースを入れた実物手帳です。"},
        {"index": "02", "title": "ソウル作戦区域", "body": "伝統、ショッピング、グルメ、夜景、街の文化をミッションとして探索します。"},
        {"index": "03", "title": "ボミと一緒に", "body": "かわいいエージェントのボミと一緒にスタンプを集め、ミッションをクリアします。"}
      ],
      "processEyebrow": "MISSION FLOW",
      "processTitle": "ブリーフィングを受け、現場へ移動し、記録を残します。",
      "steps": [
        {"index": "01", "title": "ブリーフィング受領", "body": "ミッション手帳で作戦区域と指令を確認します。"},
        {"index": "02", "title": "現場作戦", "body": "街を移動しながらスタンプと現地記録を集めます。"},
        {"index": "03", "title": "Mission CLEAR", "body": "手帳を満たして自分だけのソウル作戦を完了します。"}
      ],
      "closingTitle": "ソウルはすでに作戦区域です。",
      "closingBody": "ボミと一緒に、普通の旅行をミッションに変えてみましょう。"
    }
  }
}
'@

Write-Utf8NoBom "locales/zh-cn.json" @'
{
  "meta": {
    "title": "Whale Land — 把有趣想法做成服务的公司",
    "description": "Whale Land 用有趣、快乐的想法，创造让世界更丰富、更幸福的服务。"
  },
  "common": {
    "navCompany": "公司介绍",
    "navServiceIntro": "服务介绍",
    "navServiceList": "服务列表",
    "navContact": "联系",
    "backHome": "返回 Whale Land",
    "officialSite": "官方网站",
    "learnMore": "了解详情",
    "externalNotice": "即将前往独立服务网站。",
    "contactPhone": "070-8028-3008",
    "contactEmail": "contact@whalelandkr.com",
    "footerLine": "Fun ideas, useful services, happier moments.",
    "copyright": "© 2026 Whale Land. All rights reserved."
  },
  "home": {
    "logoKicker": "WHALE LAND / IDEA COMPANY",
    "logoNote": "SEOUL · IDEAS IN MOTION",
    "introEyebrow": "ABOUT WHALE LAND",
    "introTitle": "用好玩又快乐的想法，让世界多一点丰富和幸福。",
    "introBody": "Whale Land 希望在日常和旅行中加入一点小小的乐趣。\n我们自由混合技术、故事、角色和实体体验，持续实验并制作新的服务。\n现在看到的服务不是全部，而是不断变化、继续扩展的 Whale Land 当前形态。",
    "serviceSectionEyebrow": "SERVICE INTRODUCTION",
    "serviceLinkCta": "查看服务页面",
    "serviceListEyebrow": "SERVICE HUB",
    "serviceListTitle": "现在可以遇见的 Whale Land 服务",
    "serviceListBody": "每项服务都是拥有独立世界观和功能的项目。新的服务出现时，也可以自然加入这个枢纽页面。",
    "contactEyebrow": "CONTACT WHALE LAND",
    "contactTitle": "欢迎新的提案、合作与咨询。",
    "contactBody": "如果有服务使用、合作、制作相关咨询，请通过以下方式联系。邮箱地址可以一键复制。",
    "contactPhoneLabel": "电话",
    "contactEmailLabel": "邮箱",
    "contactCopyEmail": "复制咨询邮箱",
    "contactCopiedEmail": "邮箱已复制",
    "featuredServiceSlugs": ["korean-birth-type", "haedurio", "covert"],
    "principles": []
  },
  "services": {
    "korean-birth-type": {
      "slug": "korean-birth-type",
      "order": "01",
      "theme": "birth",
      "accent": "#8b6bff",
      "illustration": "birth-type.svg",
      "status": "已上线",
      "category": "SELF-DISCOVERY",
      "title": "Korean Birth Type",
      "cardTitle": "用韩式四柱解读测试自己。",
      "summary": "你真的了解自己吗？用韩式四柱解读测试一下自己吧。也许你会发现关于真爱和运气的线索。",
      "homeEyebrow": "KOREAN BIRTH TYPE",
      "homeTitle": "你真的了解自己吗？",
      "homeDescription": "用韩式四柱解读测试一下自己吧。也许你会发现关于真爱和运气的线索。",
      "heroTitle": "用韩式四柱解读测试自己。",
      "heroLead": "Korean Birth Type 将四柱命理重新设计成一种轻松的自我理解体验，而不是沉重的预言。",
      "visualCaption": "A playful self-reading system inspired by Korean saju.",
      "externalUrl": "https://koreanbirthtype.com",
      "externalCta": "开始 Korean Birth Type",
      "tags": ["SELF-DISCOVERY", "SAJU", "DIGITAL CARDS"],
      "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
      "statementTitle": "比预言更轻松，比测试更深入。",
      "statementBody": "它从出生日期和时间开始，但并不定义你的未来。日柱、五行、关系和运势节奏会像卡片一样展开，帮助你从新的角度观察自己。",
      "featuresTitle": "用卡片阅读自己的体验",
      "features": [
        {"index": "01", "title": "韩式解读", "body": "把四柱结构转化为现代语言和卡片体验。"},
        {"index": "02", "title": "爱情与运气提示", "body": "以轻松但有记忆点的方式呈现关系、倾向和节奏。"},
        {"index": "03", "title": "移动端保存", "body": "像看卡片一样查看结果，并保存让你在意的内容。"}
      ],
      "processEyebrow": "HOW IT FLOWS",
      "processTitle": "输入、阅读、保存。",
      "steps": [
        {"index": "01", "title": "输入出生信息", "body": "输入解读所需的基本信息。"},
        {"index": "02", "title": "卡片解读", "body": "基于四柱的解读会以卡片形式展开。"},
        {"index": "03", "title": "查看结果", "body": "保存印象深刻的内容，之后可以再次查看。"}
      ],
      "closingTitle": "确认你的 Korean Birth Type。",
      "closingBody": "即使你觉得很了解自己，也可能获得新的线索。"
    },
    "haedurio": {
      "slug": "haedurio",
      "order": "02",
      "theme": "haedurio",
      "accent": "#16a6c8",
      "illustration": "haedurio.svg",
      "status": "已上线",
      "category": "TRAVEL SUPPORT",
      "title": "Haedurio",
      "cardTitle": "在韩国遇到麻烦了吗？",
      "summary": "在韩国遇到麻烦了吗？试试什么都能帮你解决的帮手服务 Haedurio。",
      "homeEyebrow": "HAEDURIO",
      "homeTitle": "在韩国遇到麻烦了吗？",
      "homeDescription": "试试什么都能帮你解决的帮手服务 Haedurio。让旅途中卡住的瞬间重新动起来。",
      "heroTitle": "旅途中遇到问题时，Haedurio 来帮你。",
      "heroLead": "Haedurio 帮助韩国旅行者整理预约、购买、配送、遗失物等难以独自处理的问题，并找到下一步行动。",
      "visualCaption": "Local help for the moments that interrupt your trip.",
      "externalUrl": "https://haedurio.com",
      "externalCta": "使用 Haedurio",
      "tags": ["LOCAL SUPPORT", "TRAVEL HELP", "KOREA"],
      "statementEyebrow": "KEEP THE TRIP MOVING",
      "statementTitle": "缩短麻烦时间，让旅行继续。",
      "statementBody": "在陌生语言和地区，小问题也可能让整段旅行停下来。Haedurio 会整理情况、确认可选方案，并帮助旅行者决定下一步。",
      "featuresTitle": "从问题说明到解决路径",
      "features": [
        {"index": "01", "title": "整理情况", "body": "从必要信息开始，逐步整理复杂情况。"},
        {"index": "02", "title": "确认本地语境", "body": "以韩国预约、购买、配送环境为基准确认可行方法。"},
        {"index": "03", "title": "下一步指引", "body": "不只是翻译，而是帮助你理解接下来该做什么。"}
      ],
      "processEyebrow": "HOW IT WORKS",
      "processTitle": "从问题发生的瞬间，到重新回到旅行。",
      "steps": [
        {"index": "01", "title": "告知情况", "body": "告诉我们发生了什么。"},
        {"index": "02", "title": "确认解决路径", "body": "确认可行方法和必要流程。"},
        {"index": "03", "title": "继续进行", "body": "根据选择的方向进入下一步。"}
      ],
      "closingTitle": "韩国旅行的帮手，Haedurio。",
      "closingBody": "遇到卡住的瞬间，请告诉 Haedurio 你的情况。"
    },
    "covert": {
      "slug": "covert",
      "order": "03",
      "theme": "covert",
      "accent": "#25384a",
      "illustration": "covert.svg",
      "status": "准备中",
      "category": "MISSION TRAVEL",
      "title": "Beomi Stamp Tour",
      "cardTitle": "普通旅行到此为止！",
      "summary": "普通旅行到此为止！现在是潜入突击行动观光的时代。和 Beomi 一起 Mission CLEAR!",
      "homeEyebrow": "BEOMI STAMP TOUR",
      "homeTitle": "普通旅行到此为止！",
      "homeDescription": "现在是潜入突击行动观光的时代。和 Beomi 一起穿梭首尔、收集印章，Mission CLEAR!",
      "heroTitle": "和 Beomi 一起 Mission CLEAR!",
      "heroLead": "Beomi Stamp Tour 将首尔地点变成作战区域，旅行者拿着任务手册亲自探索、记录并完成任务。",
      "visualCaption": "A field mission hidden inside an ordinary city trip.",
      "externalUrl": "/covert/?lang=kr",
      "externalCta": "进入 Beomi Stamp Tour",
      "tags": ["STAMP TOUR", "SEOUL", "MISSION"],
      "statementEyebrow": "YOUR CITY. YOUR MISSION.",
      "statementTitle": "从观看景点的旅行，到完成任务的旅行。",
      "statementBody": "旅行不只是在著名地点打卡。打开任务手册，前往作战区域，收集印章和现场记录，整个首尔旅行都会变成一项秘密任务。",
      "featuresTitle": "拿在手里的秘密行动",
      "features": [
        {"index": "01", "title": "护照式任务手册", "body": "包含作战简报、地点信息和记录空间的实体手册。"},
        {"index": "02", "title": "首尔作战区域", "body": "把传统、购物、美食、夜景和街区文化当作任务来探索。"},
        {"index": "03", "title": "和 Beomi 一起", "body": "和可爱特工 Beomi 一起收集印章并完成任务。"}
      ],
      "processEyebrow": "MISSION FLOW",
      "processTitle": "领取简报，前往现场，留下记录。",
      "steps": [
        {"index": "01", "title": "领取简报", "body": "在任务手册中确认作战区域和指令。"},
        {"index": "02", "title": "现场行动", "body": "在城市中移动，收集印章和现场记录。"},
        {"index": "03", "title": "Mission CLEAR", "body": "填满手册，完成属于你的首尔行动。"}
      ],
      "closingTitle": "首尔已经是作战区域。",
      "closingBody": "和 Beomi 一起，把普通旅行变成一场任务。"
    }
  }
}
'@

Write-Host "Whale Land chapter hub files were updated."
Write-Host "Next: git status; python -m http.server 5500"
