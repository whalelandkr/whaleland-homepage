"use strict";

const MISSION_LANGUAGES = ["kr", "en", "jp", "cn"];
const params = new URLSearchParams(window.location.search);
const requestedLanguage = params.get("lang")?.toLowerCase();
const savedLanguage = localStorage.getItem("covertLanguage");
const language = MISSION_LANGUAGES.includes(requestedLanguage)
  ? requestedLanguage
  : MISSION_LANGUAGES.includes(savedLanguage)
    ? savedLanguage
    : "kr";

localStorage.setItem("covertLanguage", language);

const langAttributes = {
  kr: "ko",
  en: "en",
  jp: "ja",
  cn: "zh-CN"
};

document.documentElement.lang = langAttributes[language] || "ko";

const messages = {
  kr: [
    "요원님, 새로운 미션이 도착했습니다.",
    "",
    "이번 임무는 서울의 작전 구역을 탐색하고,",
    "현장에서 미션을 완수한 뒤, 유유히 달아나세요.",
    "",
    "요원님을 돕기 위한 현장 요원 'Beomi(범이)'를 보내드립니다.",
    "",
    "준비가 되었다면 작전을 시작하세요.",
    "",
    "이 메시지는 곧 사라집니다.",
    "무사 귀환을 빕니다."
  ].join("\n"),

  en: [
    "Agent, a new mission has arrived.",
    "",
    "Your assignment is to explore the operation zones of Seoul,",
    "complete the mission in the field, and slip away without drawing attention.",
    "",
    "We are dispatching field agent 'Beomi (범이)' to assist you.",
    "",
    "When you are ready, begin the operation.",
    "",
    "This message will disappear shortly.",
    "Wishing you a safe return."
  ].join("\n"),

  jp: [
    "エージェント、新たなミッションが届きました。",
    "",
    "今回の任務は、ソウルの作戦区域を探索し、",
    "現地でミッションを完了したのち、何食わぬ顔で離脱することです。",
    "",
    "あなたを支援する現地エージェント「Beomi（범이）」を派遣します。",
    "",
    "準備ができたら、作戦を開始してください。",
    "",
    "このメッセージはまもなく消去されます。",
    "無事の帰還を祈ります。"
  ].join("\n"),

  cn: [
    "特工，新的任务已经抵达。",
    "",
    "本次任务是探索首尔的作战区域，",
    "在现场完成任务后，若无其事地撤离。",
    "",
    "我们将派出现场特工“Beomi（범이）”协助你。",
    "",
    "准备就绪后，请开始行动。",
    "",
    "本消息即将消失。",
    "祝你平安归来。"
  ].join("\n")
};

const incomingPanel = document.getElementById("incomingPanel");
const terminalPanel = document.getElementById("terminalPanel");
const missionText = document.getElementById("missionText");
const noiseLayer = document.getElementById("noiseLayer");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeText(text, totalDuration) {
  const characters = Array.from(text);
  const delay = totalDuration / Math.max(1, characters.length);

  missionText.textContent = "";

  for (const character of characters) {
    missionText.textContent += character;
    await wait(character === "\n" ? delay * 2.4 : delay);
  }
}

async function run() {
  noiseLayer.classList.add("active");
  await wait(1200);

  incomingPanel.hidden = true;
  terminalPanel.hidden = false;

  await wait(900);
  await typeText(messages[language] || messages.kr, 15000);
  await wait(2600);

  noiseLayer.classList.remove("active");
  void noiseLayer.offsetWidth;
  noiseLayer.classList.add("active");

  await wait(900);

  window.location.replace(`../?lang=${encodeURIComponent(language)}`);
}

run();
