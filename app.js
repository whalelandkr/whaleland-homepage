"use strict";

const SUPPORTED_LANGUAGES = ["ko", "en"];
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
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
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
      link.href = document.documentElement.dataset.page === "home"
        ? `#${section}`
        : `./index.html?lang=${encodeURIComponent(language)}#${section}`;
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
    covert: "covert.svg",
    pixelwar: "pixelwar.svg"
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

function serviceExternalUrl(service, language) {
  return (
    service.externalUrl ||
    `./service.html?service=${encodeURIComponent(service.slug)}&lang=${encodeURIComponent(language)}`
  );
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

// An explicitly labelled, schematic preview. No live game data is simulated.
function pixelWarMap(service, id) {
  const land = 'M45 70L73 50 103 49 116 34 147 40 159 56 186 56 190 75 176 94 156 101 145 125 126 139 125 155 143 165 149 185 133 180 119 163 103 151 91 122 74 119 65 104 45 98Z M170 35L195 28 217 35 211 58 190 73 177 60Z M151 177L173 182 189 199 202 208 198 231 180 249 170 276 158 288 151 264 142 245 140 221 130 203 135 186Z M276 97L286 86 300 87 306 67 323 59 330 77 317 97 323 107 310 120 290 115 281 122 268 114Z M279 126L308 122 330 134 342 156 329 181 320 194 313 220 297 229 285 213 280 184 264 168 263 145Z M324 83L347 65 380 58 395 49 431 53 455 47 490 64 534 70 554 87 533 102 513 104 501 122 480 132 472 154 460 156 452 178 441 167 437 143 414 133 407 151 392 175 381 158 375 137 354 131 342 112 321 108Z M469 189L487 195 501 205 487 212 470 204 453 202 446 194Z M482 228L510 215 539 230 545 250 531 269 502 271 479 254Z M553 274L563 263 567 272 556 288 549 291Z M340 213L348 204 350 221 343 232Z M512 129L519 117 524 132 515 146 507 149Z M262 99L268 94 270 107 262 112Z';
  return `<figure class="pw-preview">
    <div class="pw-preview-bar"><span>PIXELWAR / WORLD</span><span>CONCEPT PREVIEW</span></div>
    <svg class="pw-map" viewBox="0 0 600 320" role="img" aria-label="${escapeHtml(service.mapAlt)}">
      <defs>
        <pattern id="${id}-sea" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#dde5ee" stroke-width=".5"/></pattern>
        <pattern id="${id}-cells" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M6 0H0V6" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width=".65"/></pattern>
        <clipPath id="${id}-land"><path d="${land}"/></clipPath>
      </defs>
      <rect width="600" height="320" fill="#edf2f7"/>
      <rect width="600" height="320" fill="url(#${id}-sea)"/>
      <path d="${land}" fill="#cbd7e3" stroke="#b7c6d5" stroke-width=".8"/>
      <g clip-path="url(#${id}-land)">
        <path d="M60 66H150V84H168V108H132V126H96V108H60Z M270 132H312V150H324V174H300V180H276Z" fill="#9aa9ee"/>
        <path d="M330 78H432V96H414V120H378V132H354V114H330Z M144 198H186V222H174V246H150Z" fill="#8fc7bc"/>
        <path d="M438 96H528V114H504V144H474V150H456V132H438Z M492 228H540V252H516V264H492Z" fill="#e7be7f"/>
        <rect width="600" height="320" fill="url(#${id}-cells)"/>
        <path class="pw-front" d="M432 96H438V114H444V126H456V132H462V150" fill="none" stroke="#4f629a" stroke-width="2" stroke-dasharray="3 3"/>
        <g class="pw-selected" fill="#6178dc" stroke="#fff" stroke-width="1"><rect x="432" y="102" width="6" height="6"/><rect x="438" y="114" width="6" height="6"/><rect x="444" y="126" width="6" height="6"/></g>
      </g>
    </svg>
    <figcaption><span>${escapeHtml(service.previewNote)}</span><span class="pw-preview-state">DEMO IN DEVELOPMENT</span></figcaption>
  </figure>`;
}

function renderPixelWar(service) {
  const e = escapeHtml;
  const title = (eyebrow, heading) => `<p class="pw-eyebrow">${eyebrow}</p><h2>${e(heading)}</h2>`;
  $("main").innerHTML = `<div class="pw-page">
    <section class="pw-hero pw-section">
      <div class="pw-hero-copy reveal is-visible">
        <p class="pw-eyebrow">PIXELWAR / GLOBAL TERRITORY GAME</p>
        <h1>${e(service.heroTitle)}</h1>
        <p class="pw-lead">${e(service.heroLead)}</p>
        <span class="pw-status">IN DEVELOPMENT</span>
      </div>
      <div class="pw-hero-art reveal is-visible">${pixelWarMap(service, 'detail')}</div>
    </section>
    <section class="pw-world pw-section reveal">
      <div>${title('THE WORLD IS THE BOARD', service.worldTitle)}<p>${e(service.worldBody)}</p></div>
      <div class="pw-count"><strong>${e(service.cellCount)}</strong><span>PLAYABLE CELLS</span><div class="pw-cell-cross" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>
    </section>
    <section class="pw-moves pw-section">
      <div class="reveal">${title('HOW THE WAR MOVES', service.movesTitle)}</div>
      <div class="pw-three">${service.moves.map((m,i)=>`<article class="pw-move reveal" style="--rd:${i*.12}s"><div class="pw-move-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="pw-eyebrow">0${i+1} / ${e(m[0])}</p><h3>${e(m[1])}</h3><p>${e(m[2])}</p></article>`).join('')}</div>
      <p class="pw-supply reveal"><strong>SUPPLY</strong>${e(service.supply)}</p>
    </section>
    <section class="pw-rankings pw-section reveal">
      ${title('MORE THAN ONE RANKING', service.rankTitle)}<p class="pw-rank-intro">${e(service.rankBody)}</p>
      <div class="pw-three pw-rank-grid">${service.ranks.map((r)=>`<div><span class="pw-eyebrow">${e(r[0])}</span><h3>${e(r[1])}</h3></div>`).join('')}</div>
      <p class="pw-unit-note">${e(service.unitNote)}</p>
    </section>
    <section class="pw-final pw-section reveal">
      <div class="pw-final-mark" aria-hidden="true"><span>FINAL MAP</span><i></i><i></i><i></i><i></i></div>
      <div>${title('EVERY WAR ENDS', service.finalTitle)}<p>${e(service.finalBody)}</p><p class="pw-dev-note">${e(service.devNote)}</p></div>
    </section>
  </div>`;
}

function createServiceFeaturePanel(service, language, index) {
  const section = document.createElement("section");
  section.className = "chapter service-feature-panel";
  section.dataset.theme = service.theme;
  section.style.setProperty("--service-accent", service.accent || "#1674d8");

  const url = serviceExternalUrl(service, language);
  const externalAttrs = isExternalUrl(url)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  const ctaLabel =
    service.externalCta ||
    currentCopy?.home?.serviceLinkCta ||
    "View service page";

  section.innerHTML = `
    <div class="service-feature-inner">
      <div class="service-feature-copy reveal">
        <p class="eyebrow">${escapeHtml(service.homeEyebrow || service.category)}</p>
        <span class="service-feature-number">${String(index + 1).padStart(2, "0")}</span>
        <h2>${escapeHtml(service.homeTitle || service.title)}</h2>
        <p>${escapeHtml(service.homeDescription || service.summary)}</p>
        ${service.slug === "pixelwar" ? `<div class="home-service-tags">${service.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        <a class="button button-primary" href="${escapeHtml(url)}"${externalAttrs}>
          ${escapeHtml(ctaLabel)}
        </a>
      </div>
      <div class="service-feature-visual reveal" style="--rd:.15s">
        ${service.slug === "pixelwar" ? pixelWarMap(service, "home") : `<div class="service-feature-orbit" aria-hidden="true"></div><div class="service-feature-frame"><img src="${illustrationPath(service)}" alt="" /></div>`}
      </div>
    </div>
  `;

  return section;
}

function createServiceListCard(service, language, index = 0) {
  const link = document.createElement("a");
  link.className = "service-list-card reveal";
  link.dataset.theme = service.theme;
  link.style.setProperty("--service-accent", service.accent || "#1674d8");
  link.style.setProperty("--rd", `${index * 0.12}s`);

  const url = serviceExternalUrl(service, language);
  link.href = url;

  if (isExternalUrl(url)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

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

function createWorldCard(service, language, index = 0) {
  return createServiceListCard(service, language, index);
}

function renderHome(copy, language) {
  const services = getFeaturedServices(copy);
  const proof = $("#teamProductProof");
  if (proof) {
    proof.setAttribute("aria-label", copy.home.productProofLabel);
    proof.replaceChildren(...["korean-birth-type", "covert", "pixelwar"].map((slug, index) => {
      const service = copy.services[slug];
      const item = document.createElement("li");
      item.className = "team-product-proof-item reveal";
      item.style.setProperty("--rd", `${index * .12}s`);
      const url = serviceExternalUrl(service, language);
      const external = isExternalUrl(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
      item.innerHTML = `<a href="${escapeHtml(url)}"${external}>
        <strong>${escapeHtml(service.title)}</strong>
        <span class="team-proof-status" data-state="${service.status === "LIVE" ? "live" : "development"}">${escapeHtml(service.status)}</span>
        <span class="team-proof-description">${escapeHtml(copy.home.productProofDescriptions[slug])}</span>
      </a>`;
      return item;
    }));
  }
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
    ...services.map((service, index) =>
      createServiceListCard(service, language, index)
    )
  );

  worldList?.replaceChildren(
    ...services.map((service, index) =>
      createWorldCard(service, language, index)
    )
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

  if (serviceSlug === "pixelwar") {
    renderPixelWar(service);
    return;
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
    const externalUrl = service.externalUrl || "";
    const isExternalUrl = /^https?:\/\//i.test(externalUrl);

    if (!externalUrl) {
      link.hidden = true;
      link.removeAttribute("href");
      return;
    }

    link.hidden = false;
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

function setupHeaderScroll() {
  const header = $(".site-header");

  if (!header || header.dataset.bound === "true") {
    return;
  }

  header.dataset.bound = "true";

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
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
let languageRequest = 0;

async function renderLanguage(language, { updateHistory = true } = {}) {
  const normalized = normalizeLanguage(language) || DEFAULT_LANGUAGE;
  const page = document.documentElement.dataset.page;
  const serviceSlug = page === "service" ? getServiceSlug() : "";

  const request = ++languageRequest;
  const copy = await loadCopy(normalized);
  if (request !== languageRequest) return;

  currentLanguage = normalized;
  localStorage.setItem("whalelandLanguage", normalized);
  setDocumentLanguage(normalized);
  setActiveLanguage(normalized);

  if (updateHistory) {
    updateUrl(normalized, serviceSlug);
  }

  currentCopy = copy;
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
    setupHeaderScroll();
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