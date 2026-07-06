"use strict";

const LANGUAGES = ["kr", "en", "jp", "cn"];
const LANGUAGE_MAP = { ko: "kr", ja: "jp", "zh-cn": "cn" };
const DEFAULT_LANGUAGE = "kr";

const STORE_COPY = {
  kr: {
    htmlLang: "ko",
    todayLabel: "TODAY'S FIELD SALE",
    openTitle: "오늘 판매는 {location}에서 진행됩니다.",
    openBody: "현장 판매 시간은 {time}입니다.",
    closedTitle: "오늘은 현장 판매가 없습니다.",
    closedBody: "아래 3일 판매 일정을 확인해주세요.",
    openSchedule: "{location} · {time}",
    closedSchedule: "판매 없음",
    shopTitle: "온라인 쇼핑몰 준비 중",
    shopBody: "현재는 얼리버드 운영 기간으로 현장 구매만 가능합니다.",
    shopButton: "온라인 쇼핑몰",
    help: "현재는 얼리버드 운영 기간으로 성수, 홍대, 명동 등 현장 구매만 가능합니다. 온라인 구매 버튼은 정식 판매 오픈 후 활성화됩니다."
  },
  en: {
    htmlLang: "en",
    todayLabel: "TODAY'S FIELD SALE",
    openTitle: "Today's sale takes place in {location}.",
    openBody: "Field sale hours: {time}.",
    closedTitle: "There is no field sale today.",
    closedBody: "Please check the 3-day field sale schedule below.",
    openSchedule: "{location} · {time}",
    closedSchedule: "No field sale",
    shopTitle: "Online shop preparing",
    shopBody: "During the early-bird period, purchases are available on site only.",
    shopButton: "Online shop",
    help: "During the early-bird period, C.O.V.E.R.T is available only through on-site purchases in areas such as Seongsu, Hongdae, and Myeongdong. The online shop button will be enabled after the official launch."
  },
  jp: {
    htmlLang: "ja",
    todayLabel: "TODAY'S FIELD SALE",
    openTitle: "本日の販売は{location}で行われます。",
    openBody: "現地販売時間は{time}です。",
    closedTitle: "本日の現地販売はありません。",
    closedBody: "下の3日間の販売スケジュールをご確認ください。",
    openSchedule: "{location} · {time}",
    closedSchedule: "販売なし",
    shopTitle: "オンラインショップ準備中",
    shopBody: "現在はアーリーバード期間のため、現地購入のみ可能です。",
    shopButton: "オンラインショップ",
    help: "現在はアーリーバード期間のため、ソンス、ホンデ、明洞などでの現地購入のみ可能です。オンライン購入ボタンは正式販売開始後に有効になります。"
  },
  cn: {
    htmlLang: "zh-CN",
    todayLabel: "TODAY'S FIELD SALE",
    openTitle: "今日销售将在{location}进行。",
    openBody: "现场销售时间为 {time}。",
    closedTitle: "今天没有现场销售。",
    closedBody: "请查看下方3天销售日程。",
    openSchedule: "{location} · {time}",
    closedSchedule: "无现场销售",
    shopTitle: "线上商店准备中",
    shopBody: "目前为早鸟运营期，仅支持现场购买。",
    shopButton: "线上商店",
    help: "目前为早鸟运营期，仅可在圣水、弘大、明洞等现场购买。线上购买按钮将在正式销售开始后启用。"
  }
};

function normalizeLanguage(value) {
  const language = (value || "").toLowerCase();
  const mapped = LANGUAGE_MAP[language] || language;
  return LANGUAGES.includes(mapped) ? mapped : DEFAULT_LANGUAGE;
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  return normalizeLanguage(params.get("lang") || localStorage.getItem("covertLanguage"));
}

function formatKoreaDate(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function addDays(dateText, amount) {
  const date = new Date(`${dateText}T00:00:00+09:00`);
  date.setUTCDate(date.getUTCDate() + amount);
  return formatKoreaDate(date);
}

function formatDisplayDate(dateText, language) {
  const date = new Date(`${dateText}T00:00:00+09:00`);

  if (language === "kr") {
    return new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" }).format(date);
  }
  if (language === "jp") {
    return new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" }).format(date);
  }
  if (language === "cn") {
    return new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", month: "short", day: "numeric", weekday: "short" }).format(date);
}

function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || "");
}

async function loadSchedule() {
  const response = await fetch(`../data/schedule.json?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load schedule.");
  return response.json();
}

let currentLanguage = getInitialLanguage();
let scheduleData = null;

function getLocationName(locationKey) {
  if (!locationKey || !scheduleData?.locations?.[locationKey]) return "";
  return scheduleData.locations[locationKey][currentLanguage] || scheduleData.locations[locationKey].kr || "";
}

function findSale(dateText) {
  return scheduleData.sales.find((sale) => sale.date === dateText) || {
    date: dateText,
    status: "closed",
    location: "",
    start: "",
    end: ""
  };
}

function saleTime(sale) {
  return sale.start && sale.end ? `${sale.start} - ${sale.end}` : "";
}

function renderStore() {
  const copy = STORE_COPY[currentLanguage] || STORE_COPY.kr;
  document.documentElement.lang = copy.htmlLang;
  localStorage.setItem("covertLanguage", currentLanguage);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });

  const today = formatKoreaDate(new Date());
  const todaySale = findSale(today);
  const todayLocation = getLocationName(todaySale.location);
  const todayTime = saleTime(todaySale);

  document.getElementById("todayLabel").textContent = copy.todayLabel;
  document.getElementById("todayDate").textContent = formatDisplayDate(today, currentLanguage);

  if (todaySale.status === "open") {
    document.getElementById("todayTitle").textContent = fill(copy.openTitle, { location: todayLocation });
    document.getElementById("todayBody").textContent = fill(copy.openBody, { time: todayTime });
  } else {
    document.getElementById("todayTitle").textContent = copy.closedTitle;
    document.getElementById("todayBody").textContent = copy.closedBody;
  }

  const grid = document.getElementById("scheduleGrid");
  grid.replaceChildren();

  for (let index = 0; index < 3; index += 1) {
    const dateText = addDays(today, index);
    const sale = findSale(dateText);
    const card = document.createElement("article");
    card.className = `schedule-card ${sale.status === "open" ? "open" : "closed"}`;

    const location = getLocationName(sale.location);
    const time = saleTime(sale);
    const body = sale.status === "open"
      ? fill(copy.openSchedule, { location, time })
      : copy.closedSchedule;

    card.innerHTML = `<strong>${formatDisplayDate(dateText, currentLanguage)}</strong><p>${body}</p>`;
    grid.appendChild(card);
  }

  document.getElementById("shopTitle").textContent = copy.shopTitle;
  document.getElementById("shopBody").textContent = copy.shopBody;
  document.getElementById("shopButton").textContent = copy.shopButton;
  document.getElementById("helpBox").textContent = copy.help;

  const params = new URLSearchParams(window.location.search);
  params.set("lang", currentLanguage);
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

document.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-lang]");
  if (languageButton) {
    currentLanguage = normalizeLanguage(languageButton.dataset.lang);
    renderStore();
    return;
  }

  if (event.target.closest("#helpButton")) {
    const helpBox = document.getElementById("helpBox");
    helpBox.hidden = !helpBox.hidden;
  }
});

loadSchedule()
  .then((schedule) => {
    scheduleData = schedule;
    renderStore();
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("todayTitle").textContent = "Schedule unavailable";
  });
