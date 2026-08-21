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
    siteLink: "공식 사이트에서 키트 보기",
    shopTitle: "정식 판매 중",
    shopBody: "얼리버드 기간이 끝나고 정식 판매로 전환되었습니다. 온라인 쇼핑몰은 곧 열립니다.",
    shopButton: "온라인 쇼핑몰",
    help: "정식 판매로 전환되었습니다. 지금은 성수, 홍대, 명동 등 지정된 현장에서 구매하실 수 있고, 온라인 구매 버튼은 쇼핑몰이 열리면 활성화됩니다. 키트 구성과 배송·환불 안내는 공식 사이트에서 확인하실 수 있습니다."
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
    siteLink: "See the kit on the official site",
    shopTitle: "Now on general sale",
    shopBody: "The early-bird period has ended and the kit is now on general sale. The online shop opens soon.",
    shopButton: "Online shop",
    help: "The kit is now on general sale. For now it is available at field locations such as Seongsu, Hongdae, and Myeongdong, and the online purchase button will be enabled once the shop opens. You can find what is in the kit, along with shipping and refund details, on the official site."
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
    siteLink: "公式サイトでキットを見る",
    shopTitle: "正式販売中",
    shopBody: "アーリーバード期間が終了し、正式販売に切り替わりました。オンラインショップは近日オープンします。",
    shopButton: "オンラインショップ",
    help: "正式販売に切り替わりました。現在はソンス、ホンデ、明洞など指定の現場でご購入いただけます。オンライン購入ボタンはショップの開設後に有効になります。キットの内容と配送・返品のご案内は公式サイトでご確認いただけます。"
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
    siteLink: "在官方网站查看套装",
    shopTitle: "正式发售中",
    shopBody: "早鸟期已结束，现已转为正式发售。线上商店即将开放。",
    shopButton: "线上商店",
    help: "现已转为正式发售。目前可在圣水、弘大、明洞等指定现场购买，线上购买按钮将在商店开放后启用。套装内容与配送、退换说明可在官方网站查看。"
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

  /* 새 공식 사이트. 영어판은 루트, 나머지는 언어 폴더로 보낸다. */
  const siteLink = document.getElementById("siteLink");
  if (siteLink) {
    siteLink.textContent = copy.siteLink;
    siteLink.href = currentLanguage === "en" ? "../site/" : "../site/" + currentLanguage + "/";
  }

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
