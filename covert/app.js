"use strict";

const COVERT_LANGUAGES = ["kr", "en", "jp", "cn"];
const DEFAULT_LANGUAGE = "kr";

const COVERT_COPY = {
  kr: {
    htmlLang: "ko",
    navBriefing: "미션 수령",
    navKit: "키트",
    navZones: "작전 구역",
    navStore: "판매 안내",
    navReport: "FINAL REPORT",
    productEyebrow: "SEOUL SECRET MISSION",
    productTitle: "도시를 걷는 대신, 임무를 수행하세요.",
    productLead: "C.O.V.E.R.T는 서울의 장소를 비밀 작전 구역으로 바꾸고, 여행자가 직접 요원이 되어 탐험과 기록을 완수하는 스파이 콘셉트 스탬프 투어입니다.",
    briefingCta: "미션 먼저 받기",
    storeCta: "오늘 판매 안내",
    reportCta: "FINAL REPORT",
    kitEyebrow: "MISSION KIT",
    kitTitle: "손에 들고 걷는 비밀 작전",
    kitLead: "서울을 관광지가 아니라 작전 구역으로 바라보게 만드는 미션형 스탬프북입니다.",
    kitItems: [
      ["01", "여권형 미션 수첩", "서울 작전 구역과 기록 공간을 담은 휴대용 스탬프북입니다."],
      ["02", "현장 요원 Beomi(범이)", "임무를 안내하고 세계관을 연결하는 C.O.V.E.R.T 현장 요원입니다."],
      ["03", "최종 보고 QR", "여행이 끝나면 HQ에 보고서를 보내고 다음 작전을 기다립니다."]
    ],
    zonesEyebrow: "OPERATION ZONES",
    zonesTitle: "서울 전체가 하나의 작전 지도입니다.",
    zonesLead: "전통, 쇼핑, 음식, 야경, 동네 문화를 서로 다른 작전 구역처럼 탐험합니다.",
    zones: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "FIELD SALES",
    storeTitle: "지금은 현장 구매로만 요원 등록이 가능합니다.",
    storeLead: "성수, 홍대, 명동 등 지정된 현장에서 일정에 따라 판매합니다. 온라인 쇼핑몰은 추후 오픈 예정입니다."
  },
  en: {
    htmlLang: "en",
    navBriefing: "Briefing",
    navKit: "Kit",
    navZones: "Zones",
    navStore: "Field Sale",
    navReport: "FINAL REPORT",
    productEyebrow: "SEOUL SECRET MISSION",
    productTitle: "Don’t just visit the city. Complete the mission.",
    productLead: "C.O.V.E.R.T turns Seoul into a field operation. Become an agent, explore operation zones, collect records, and complete your final report.",
    briefingCta: "Receive mission first",
    storeCta: "Today’s sale info",
    reportCta: "FINAL REPORT",
    kitEyebrow: "MISSION KIT",
    kitTitle: "A secret operation you can hold in your hand",
    kitLead: "A mission-style stamp book that turns Seoul from a tourist map into a field operation.",
    kitItems: [
      ["01", "Passport-style mission book", "A portable stamp book containing Seoul operation zones and field-note spaces."],
      ["02", "Field agent Beomi (범이)", "The C.O.V.E.R.T field agent who guides the mission and carries the story."],
      ["03", "Final report QR", "Send your report to HQ and wait for the next operation."]
    ],
    zonesEyebrow: "OPERATION ZONES",
    zonesTitle: "Seoul becomes one mission map.",
    zonesLead: "Explore tradition, shopping, food, night views, and local streets as separate operation zones.",
    zones: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "FIELD SALES",
    storeTitle: "Agent registration is currently available on site only.",
    storeLead: "Sales take place at selected field locations such as Seongsu, Hongdae, and Myeongdong. Online purchase will open later."
  },
  jp: {
    htmlLang: "ja",
    navBriefing: "ミッション受領",
    navKit: "キット",
    navZones: "作戦区域",
    navStore: "販売案内",
    navReport: "FINAL REPORT",
    productEyebrow: "SEOUL SECRET MISSION",
    productTitle: "街を歩くのではなく、任務を遂行する。",
    productLead: "C.O.V.E.R.Tはソウルのスポットを秘密作戦エリアに変え、旅人自身がエージェントとして探索と記録を完了するスパイコンセプトのスタンプツアーです。",
    briefingCta: "まずミッションを受け取る",
    storeCta: "本日の販売案内",
    reportCta: "FINAL REPORT",
    kitEyebrow: "MISSION KIT",
    kitTitle: "手に持って歩く秘密作戦",
    kitLead: "ソウルを観光地ではなく作戦区域として楽しむミッション型スタンプブックです。",
    kitItems: [
      ["01", "パスポート型ミッションブック", "ソウルの作戦区域と記録スペースを収めた携帯用スタンプブックです。"],
      ["02", "現地エージェント Beomi（범이）", "任務を案内し、世界観をつなぐC.O.V.E.R.Tの現地エージェントです。"],
      ["03", "最終報告QR", "旅の終わりにHQへ報告書を送り、次の作戦を待ちます。"]
    ],
    zonesEyebrow: "OPERATION ZONES",
    zonesTitle: "ソウル全体がひとつの作戦地図になります。",
    zonesLead: "伝統、ショッピング、グルメ、夜景、街歩きをそれぞれの作戦エリアとして探索します。",
    zones: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "FIELD SALES",
    storeTitle: "現在、エージェント登録は現地購入のみ可能です。",
    storeLead: "ソンス、ホンデ、明洞など指定された現地で、スケジュールに沿って販売します。オンライン購入は後日オープン予定です。"
  },
  cn: {
    htmlLang: "zh-CN",
    navBriefing: "领取任务",
    navKit: "套装",
    navZones: "任务区域",
    navStore: "销售信息",
    navReport: "FINAL REPORT",
    productEyebrow: "SEOUL SECRET MISSION",
    productTitle: "不要只是逛城市，而是完成任务。",
    productLead: "C.O.V.E.R.T 将首尔的地点变成秘密任务区域，让旅行者以特工身份完成探索、记录与最终报告。",
    briefingCta: "先领取任务",
    storeCta: "查看今日销售",
    reportCta: "FINAL REPORT",
    kitEyebrow: "MISSION KIT",
    kitTitle: "拿在手中的秘密任务",
    kitLead: "一款把首尔从观光地图变成作战区域的任务型集章册。",
    kitItems: [
      ["01", "护照式任务手册", "包含首尔任务区域和记录空间的便携式集章册。"],
      ["02", "现场特工 Beomi（범이）", "引导任务并连接世界观的 C.O.V.E.R.T 现场特工。"],
      ["03", "最终报告 QR", "旅行结束后向总部提交报告，并等待下一次作战。"]
    ],
    zonesEyebrow: "OPERATION ZONES",
    zonesTitle: "整座首尔就是一张任务地图。",
    zonesLead: "将传统、购物、美食、夜景和街区文化作为不同任务区域来探索。",
    zones: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "FIELD SALES",
    storeTitle: "目前只能通过现场购买完成特工登记。",
    storeLead: "将在圣水、弘大、明洞等指定现场按日程销售。线上购买功能将于之后开放。"
  }
};

const LANGUAGE_MAP = { ko: "kr", ja: "jp", "zh-cn": "cn" };

function normalizeLanguage(value) {
  const language = (value || "").toLowerCase();
  const mapped = LANGUAGE_MAP[language] || language;
  return COVERT_LANGUAGES.includes(mapped) ? mapped : DEFAULT_LANGUAGE;
}

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  return normalizeLanguage(params.get("lang") || localStorage.getItem("covertLanguage"));
}

let currentLanguage = getLanguage();

function getCopy() {
  return COVERT_COPY[currentLanguage] || COVERT_COPY.kr;
}

function applyLanguage(language) {
  currentLanguage = normalizeLanguage(language);
  const copy = getCopy();

  document.documentElement.lang = copy.htmlLang;
  localStorage.setItem("covertLanguage", currentLanguage);

  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.dataset.copy;
    if (copy[key]) {
      node.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });

  document.querySelectorAll("[data-link]").forEach((link) => {
    const type = link.dataset.link;
    const encoded = encodeURIComponent(currentLanguage);

    if (type === "briefing" || type === "briefingCta") {
      link.href = `./briefing/?lang=${encoded}`;
      link.textContent = type === "briefing" ? copy.navBriefing : copy.briefingCta;
    }

    if (type === "store" || type === "storeCta") {
      link.href = `./store/?lang=${encoded}`;
      link.textContent = type === "store" ? copy.navStore : copy.storeCta;
    }

    if (type === "report" || type === "reportCta") {
      link.href = `./report/?lang=${encoded}`;
      link.textContent = type === "report" ? copy.navReport : copy.reportCta;
    }
  });

  renderKit(copy);
  renderZones(copy);

  const params = new URLSearchParams(window.location.search);
  params.set("lang", currentLanguage);
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}${window.location.hash}`);
}

function renderKit(copy) {
  const grid = document.getElementById("kitGrid");
  if (!grid) return;

  grid.replaceChildren(
    ...copy.kitItems.map(([index, title, body]) => {
      const article = document.createElement("article");
      article.className = "info-card";
      article.innerHTML = `<span>${index}</span><h3>${title}</h3><p>${body}</p>`;
      return article;
    })
  );
}

function renderZones(copy) {
  const list = document.getElementById("zoneList");
  if (!list) return;

  list.replaceChildren(
    ...copy.zones.map((zone, index) => {
      const item = document.createElement("div");
      item.className = "zone-item";
      item.textContent = `${String(index + 1).padStart(2, "0")} · ${zone}`;
      return item;
    })
  );
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) return;
  applyLanguage(button.dataset.lang);
});

applyLanguage(currentLanguage);
