"use strict";

const COPIES = {
  kr: {
    htmlLang: "ko",
    navKit: "키트",
    navRoute: "작전 구역",
    navStore: "상품",
    navReport: "FINAL REPORT",
    heroEyebrow: "SEOUL SECRET MISSION / FIELD KIT",
    heroTitle: "도시를 걷는 대신, 임무를 수행하세요.",
    heroLead: "C.O.V.E.R.T는 서울의 장소를 비밀 작전 구역으로 바꾸고, 여행자가 직접 요원이 되어 탐험과 기록을 완수하는 스파이 콘셉트 스탬프 투어입니다.",
    primaryCta: "상품 보기",
    reportCta: "보고 페이지",
    missionNote: "MISSION KIT · SEOUL · PREPARING FOR LAUNCH",
    kitEyebrow: "MISSION KIT",
    kitTitle: "손에 들고 걷는 비밀 작전",
    kitLead: "상품 페이지는 추후 실제 구매 링크와 결제 페이지로 확장됩니다.",
    kitItems: [
      ["01", "여권형 미션 수첩", "서울 작전 구역과 기록 공간을 담은 휴대용 스탬프북입니다."],
      ["02", "작전 스티커와 기록", "현장에서 수집한 정보와 감상을 스파이 파일처럼 남깁니다."],
      ["03", "최종 보고 QR", "마지막 페이지에서 HQ에 보고서를 전송하고 다음 미션을 기다립니다."]
    ],
    flowEyebrow: "HOW IT WORKS",
    flowTitle: "브리핑을 받고, 현장으로 이동하고, 보고합니다.",
    flowItems: [
      ["01", "브리핑 수령", "미션 수첩에서 작전 구역과 지령을 확인합니다."],
      ["02", "현장 작전", "서울 곳곳을 이동하며 스탬프와 현장 기록을 수집합니다."],
      ["03", "HQ 보고", "마지막 QR로 임무 결과를 전송하고 다음 작전을 기다립니다."]
    ],
    routeEyebrow: "OPERATION ZONES",
    routeTitle: "서울 전체가 하나의 작전 지도입니다.",
    routeLead: "전통, 쇼핑, 음식, 야경, 동네 문화를 서로 다른 작전 구역처럼 탐험합니다.",
    routeItems: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "AGENT STORE",
    storeTitle: "C.O.V.E.R.T 상품 페이지 준비 중",
    storeLead: "이 영역은 추후 실제 상품 이미지, 가격, 구매 버튼, 외부 판매처 링크 또는 자체 결제 페이지로 확장됩니다.",
    buyButton: "구매 준비 중",
    alreadyAgentButton: "이미 요원이라면 보고하기",
    storeNote: "결제 기능 연결 전까지는 보고 페이지와 상품 소개만 활성화됩니다.",
    footer: "Whale Land · Mission Travel Project"
  },
  en: {
    htmlLang: "en",
    navKit: "Kit",
    navRoute: "Zones",
    navStore: "Store",
    navReport: "FINAL REPORT",
    heroEyebrow: "SEOUL SECRET MISSION / FIELD KIT",
    heroTitle: "Don’t just visit the city. Complete the mission.",
    heroLead: "C.O.V.E.R.T turns Seoul into a field operation. Explore the city as an agent, collect records, and complete your final report.",
    primaryCta: "View product",
    reportCta: "Report page",
    missionNote: "MISSION KIT · SEOUL · PREPARING FOR LAUNCH",
    kitEyebrow: "MISSION KIT",
    kitTitle: "A secret operation you can hold in your hand",
    kitLead: "This product page will later expand into real purchase links and checkout flows.",
    kitItems: [
      ["01", "Passport-style mission book", "A portable stamp book containing operation zones and field-note spaces."],
      ["02", "Stickers and field records", "Archive the places you visit like a classified field file."],
      ["03", "Final report QR", "Send your report to HQ and wait for the next mission."]
    ],
    flowEyebrow: "HOW IT WORKS",
    flowTitle: "Receive the briefing, move through the city, and report to HQ.",
    flowItems: [
      ["01", "Receive briefing", "Check the mission book for operation zones and instructions."],
      ["02", "Field operation", "Move through Seoul and collect stamps and records."],
      ["03", "Report to HQ", "Use the final QR to submit your mission report."]
    ],
    routeEyebrow: "OPERATION ZONES",
    routeTitle: "Seoul becomes one mission map.",
    routeLead: "Explore tradition, shopping, food, night views, and local streets as separate operation zones.",
    routeItems: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "AGENT STORE",
    storeTitle: "C.O.V.E.R.T product page is preparing",
    storeLead: "This section will later include product photos, pricing, purchase buttons, external shop links, or checkout pages.",
    buyButton: "Store preparing",
    alreadyAgentButton: "Already an agent? Report",
    storeNote: "Until checkout is connected, product information and the report page are active.",
    footer: "Whale Land · Mission Travel Project"
  },
  jp: {
    htmlLang: "ja",
    navKit: "キット",
    navRoute: "作戦エリア",
    navStore: "商品",
    navReport: "FINAL REPORT",
    heroEyebrow: "SEOUL SECRET MISSION / FIELD KIT",
    heroTitle: "街を歩くのではなく、任務を遂行する。",
    heroLead: "C.O.V.E.R.Tはソウルのスポットを秘密作戦エリアに変え、旅人自身がエージェントとして探索と記録を完了するスパイコンセプトのスタンプツアーです。",
    primaryCta: "商品を見る",
    reportCta: "報告ページ",
    missionNote: "MISSION KIT · SEOUL · PREPARING FOR LAUNCH",
    kitEyebrow: "MISSION KIT",
    kitTitle: "手に持って歩く秘密作戦",
    kitLead: "この商品ページは、今後実際の購入リンクや決済ページへ拡張されます。",
    kitItems: [
      ["01", "パスポート型ミッションブック", "作戦エリアと記録スペースを収めた携帯用スタンプブックです。"],
      ["02", "ステッカーと現場記録", "訪れた場所を機密ファイルのように記録します。"],
      ["03", "最終報告QR", "HQへ報告書を送信し、次の任務を待ちます。"]
    ],
    flowEyebrow: "HOW IT WORKS",
    flowTitle: "ブリーフィングを受け、街へ向かい、HQへ報告します。",
    flowItems: [
      ["01", "ブリーフィング受領", "ミッションブックで作戦エリアと指令を確認します。"],
      ["02", "現場作戦", "ソウルを移動し、スタンプと記録を集めます。"],
      ["03", "HQ報告", "最後のQRから任務結果を送信します。"]
    ],
    routeEyebrow: "OPERATION ZONES",
    routeTitle: "ソウル全体がひとつの作戦地図になります。",
    routeLead: "伝統、ショッピング、グルメ、夜景、街歩きをそれぞれの作戦エリアとして探索します。",
    routeItems: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "AGENT STORE",
    storeTitle: "C.O.V.E.R.T 商品ページ準備中",
    storeLead: "今後、商品写真、価格、購入ボタン、外部販売先リンク、決済ページを追加します。",
    buyButton: "準備中",
    alreadyAgentButton: "すでにエージェントなら報告する",
    storeNote: "決済機能の接続前は、商品紹介と報告ページのみ有効です。",
    footer: "Whale Land · Mission Travel Project"
  },
  cn: {
    htmlLang: "zh-CN",
    navKit: "套装",
    navRoute: "任务区域",
    navStore: "商品",
    navReport: "FINAL REPORT",
    heroEyebrow: "SEOUL SECRET MISSION / FIELD KIT",
    heroTitle: "不要只是逛城市，而是完成任务。",
    heroLead: "C.O.V.E.R.T 将首尔的地点变成秘密任务区域，让旅行者以特工身份完成探索、记录与最终报告。",
    primaryCta: "查看商品",
    reportCta: "报告页面",
    missionNote: "MISSION KIT · SEOUL · PREPARING FOR LAUNCH",
    kitEyebrow: "MISSION KIT",
    kitTitle: "拿在手中的秘密任务",
    kitLead: "该商品页面之后将扩展为真实购买链接和结算页面。",
    kitItems: [
      ["01", "护照式任务手册", "包含任务区域和记录空间的便携式集章册。"],
      ["02", "贴纸与现场记录", "像整理机密文件一样记录访问过的地点。"],
      ["03", "最终报告 QR", "向总部提交报告，并等待下一次任务。"]
    ],
    flowEyebrow: "HOW IT WORKS",
    flowTitle: "领取简报，前往现场，向总部报告。",
    flowItems: [
      ["01", "领取简报", "在任务手册中确认任务区域和指令。"],
      ["02", "现场任务", "在首尔移动，收集印章和现场记录。"],
      ["03", "向总部报告", "通过最后的 QR 提交任务结果。"]
    ],
    routeEyebrow: "OPERATION ZONES",
    routeTitle: "整座首尔就是一张任务地图。",
    routeLead: "将传统、购物、美食、夜景和街区文化作为不同任务区域来探索。",
    routeItems: ["Gyeongbokgung", "Gwanghwamun", "National Museum", "COEX", "The Hyundai Seoul", "Dosan Park", "Lotte Tower", "Namsan", "Banpo Hangang", "Itaewon", "Seongsu", "Hongdae", "Myeongdong", "DDP", "Gwangjang Market"],
    storeEyebrow: "AGENT STORE",
    storeTitle: "C.O.V.E.R.T 商品页面准备中",
    storeLead: "之后这里将加入商品图片、价格、购买按钮、外部店铺链接或结算页面。",
    buyButton: "购买准备中",
    alreadyAgentButton: "已经是特工？提交报告",
    storeNote: "在结算功能连接前，商品介绍和报告页面会先开放。",
    footer: "Whale Land · Mission Travel Project"
  }
};

const SUPPORTED_LANGUAGES = ["en", "kr", "cn", "jp"];
const DEFAULT_LANGUAGE = "kr";

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang")?.toLowerCase();

  if (SUPPORTED_LANGUAGES.includes(fromUrl)) {
    return fromUrl;
  }

  const saved = localStorage.getItem("covertLanguage");
  if (SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }

  return DEFAULT_LANGUAGE;
}

function setLanguage(language) {
  const copy = COPIES[language] || COPIES[DEFAULT_LANGUAGE];

  document.documentElement.lang = copy.htmlLang;
  document.title = `C.O.V.E.R.T | ${copy.navStore}`;
  localStorage.setItem("covertLanguage", language);

  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.dataset.copy;
    if (copy[key]) {
      node.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  document.querySelectorAll("[data-report-link]").forEach((link) => {
    link.href = `./report/?lang=${encodeURIComponent(language)}`;
  });

  renderList("kitGrid", copy.kitItems, "kit-card", "kit-icon");
  renderList("flowGrid", copy.flowItems, "flow-card", "flow-index");
  renderRouteList(copy.routeItems);

  const params = new URLSearchParams(window.location.search);
  params.set("lang", language);
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}${window.location.hash}`);
}

function renderList(id, items, cardClass, iconClass) {
  const container = document.getElementById(id);
  if (!container) return;

  container.replaceChildren(
    ...items.map(([index, title, body]) => {
      const article = document.createElement("article");
      article.className = cardClass;
      article.innerHTML = `
        <span class="${iconClass}">${index}</span>
        <h3>${title}</h3>
        <p>${body}</p>
      `;
      return article;
    })
  );
}

function renderRouteList(items) {
  const container = document.getElementById("routeList");
  if (!container) return;

  container.replaceChildren(
    ...items.map((item, index) => {
      const div = document.createElement("div");
      div.className = "route-item";
      div.textContent = `${String(index + 1).padStart(2, "0")} · ${item}`;
      return div;
    })
  );
}

let currentLanguage = getInitialLanguage();
setLanguage(currentLanguage);

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) return;

  const nextLanguage = button.dataset.lang;
  if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return;

  setLanguage(nextLanguage);
});
