"use strict";

const completionSupportedLanguages = ["en", "kr", "cn", "jp"];
const completionParameters = new URLSearchParams(window.location.search);
const requestedLanguage = completionParameters.get("lang")?.toLowerCase();
const savedLanguage = localStorage.getItem("covertLanguage");
const completionLanguage = completionSupportedLanguages.includes(requestedLanguage)
  ? requestedLanguage
  : completionSupportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : "kr";

const UNKNOWN_LOCATION_TOKEN = "{{UNKNOWN_LOCATION}}";

/*
 * 다음 목적지 표시 효과
 *
 * redaction:
 * 목적지 정보가 확정되어 있지만 보안상 검열된 형태
 *
 * packet-loss:
 * 목적지 정보가 존재하지만 데이터 전송 과정에서
 * 일부 화면 데이터가 유실된 형태
 */
const UNKNOWN_LOCATION_EFFECT_CLASSES = {
  redaction: "effect-redaction",
  "packet-loss": "effect-packet-loss"
};

/*
 * 일반 보고서 제출 흐름에서 기본으로 사용할 효과다.
 *
 * "redaction"으로 두면 2번 검열 효과가 적용되고,
 * "packet-loss"로 바꾸면 3번 데이터 유실 효과가 적용된다.
 */
const DEFAULT_UNKNOWN_LOCATION_EFFECT =
  "redaction";

/*
 * 테스트할 때 URL에 locationEffect 값을 넣으면
 * 기본 설정을 수정하지 않고도 두 효과를 비교할 수 있다.
 */
const requestedUnknownLocationEffect =
  new URLSearchParams(window.location.search).get(
    "locationEffect"
  );

const UNKNOWN_LOCATION_EFFECT =
  Object.prototype.hasOwnProperty.call(
    UNKNOWN_LOCATION_EFFECT_CLASSES,
    requestedUnknownLocationEffect
  )
    ? requestedUnknownLocationEffect
    : DEFAULT_UNKNOWN_LOCATION_EFFECT;

const UNKNOWN_LOCATION_EFFECT_CLASS =
  UNKNOWN_LOCATION_EFFECT_CLASSES[
    UNKNOWN_LOCATION_EFFECT
  ];

const missionMessages = {
  en: [
    "Agent, congratulations on a successful mission.",
    "",
    `Your next mission is scheduled to commence in "${UNKNOWN_LOCATION_TOKEN}".`,
    "Until then, do not compromise your cover.",
    "",
    "End of transmission."
  ].join("\n"),

  kr: [
    "요원님, 미션 성공을 축하드립니다.",
    "",
    `다음 미션은 "${UNKNOWN_LOCATION_TOKEN}"에서 시작될 예정입니다.`,
    "그때까지 신분을 들키지 않도록 각별히 주의하세요.",
    "",
    "이상, 통신을 종료합니다."
  ].join("\n"),

  cn: [
    "特工，恭喜你顺利完成任务。",
    "",
    `下一项任务预计将在“${UNKNOWN_LOCATION_TOKEN}”展开。`,
    "在此之前，切勿暴露身份。",
    "",
    "通讯结束。"
  ].join("\n"),

  jp: [
    "エージェント、任務完遂を確認しました。おめでとうございます。",
    "",
    `次の任務は「${UNKNOWN_LOCATION_TOKEN}」で開始される予定です。`,
    "それまで、身元が露見しないよう十分ご注意ください。",
    "",
    "以上、通信を終了します。"
  ].join("\n")
};

const completionDocumentLanguages = {
  en: "en",
  kr: "ko",
  cn: "zh-CN",
  jp: "ja"
};

document.documentElement.lang =
  completionDocumentLanguages[completionLanguage] || "ko";

const missionMessage =
  missionMessages[completionLanguage] || missionMessages.kr;

const missionCompleteIntro = document.getElementById("missionCompleteIntro");
const terminalScreen = document.getElementById("terminalScreen");
const terminalText = document.getElementById("terminalText");
const terminalCursor = document.getElementById("terminalCursor");
const signalNoiseOverlay = document.getElementById("signalNoiseOverlay");

const INITIAL_NOISE_DURATION = 1500;
const PRE_TYPING_WAIT_DURATION = 2000;
const TYPING_TOTAL_DURATION = 15000;
const POST_TYPING_HOLD_DURATION = 3000;

/*
 * 페이지 전환 디졸브는 두 페이지에 걸쳐 총 1.5초 동안 이어진다.
 *
 * 현재 페이지에서 노이즈가 차오르는 시간: 0.75초
 * index.html에서 노이즈가 걷히는 시간: 0.75초
 */
const CROSS_PAGE_DISSOLVE_DURATION = 1500;
const OUTGOING_DISSOLVE_DURATION =
  CROSS_PAGE_DISSOLVE_DURATION / 2;

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function getTypingDelayWeight(character) {
  if (character === "\n") {
    return 3.2;
  }

  if (/[.!?。！？]/u.test(character)) {
    return 2.4;
  }

  if (/[,，"'“”‘’]/u.test(character)) {
    return 1.5;
  }

  return 1;
}

function createTerminalTypingLayout(message) {
  /*
   * 이전 텍스트와 이전에 이동됐을 수 있는 커서를 모두 제거한다.
   * terminalCursor 변수 자체는 그대로 살아 있으므로 아래에서 다시 넣는다.
   */
  terminalText.replaceChildren();

  const typingUnits = [];
  const messageParts = message.split(UNKNOWN_LOCATION_TOKEN);

  messageParts.forEach((messagePart, partIndex) => {
    /*
     * 정상 문자는 모두 미리 자리를 잡아두되,
     * 아직 타이핑되지 않은 상태에서는 보이지 않게 만든다.
     *
     * 이렇게 하면 타이핑 도중 글자의 위치나 줄바꿈이
     * 갑자기 움직이지 않는다.
     */
    for (const character of messagePart) {
      if (character === "\n") {
        const lineBreak = document.createElement("br");
        lineBreak.className = "terminal-typing-break";

        terminalText.appendChild(lineBreak);

        typingUnits.push({
          type: "character",
          character,
          node: lineBreak
        });

        continue;
      }

      const characterElement = document.createElement("span");
      characterElement.className =
        "terminal-typing-character is-pending";
      characterElement.textContent = character;

      terminalText.appendChild(characterElement);

      typingUnits.push({
        type: "character",
        character,
        node: characterElement
      });
    }

    /*
     * 다음 도시가 들어갈 위치에는 실제 글자를 넣지 않고,
     * 빈 CRT 고장 영역을 생성한다.
     *
     * 다만 처음에는 is-pending 상태로 숨겨두고,
     * 타이핑 순서가 이 위치에 도달할 때만 화면에 표시한다.
     */
if (partIndex < messageParts.length - 1) {
  const unknownLocationElement =
    document.createElement("span");

  unknownLocationElement.className = [
    "terminal-unknown-location",
    "is-pending",
    UNKNOWN_LOCATION_EFFECT_CLASS
  ].join(" ");

  unknownLocationElement.setAttribute(
    "aria-hidden",
    "true"
  );

  unknownLocationElement.dataset.effect =
    UNKNOWN_LOCATION_EFFECT;

  terminalText.appendChild(unknownLocationElement);

  typingUnits.push({
    type: "unknown-location",
    character: "",
    node: unknownLocationElement
  });
}
  });

  /*
   * 커서를 첫 글자 앞에 넣는다.
   * 타이핑이 진행될 때마다 커서를 현재 글자 뒤로 이동한다.
   */
  terminalText.insertBefore(
    terminalCursor,
    terminalText.firstChild
  );

  return typingUnits;
}

function revealTerminalTypingUnit(typingUnit) {
  if (typingUnit.type === "unknown-location") {
    /*
     * 타이핑 순서가 다음 도시 위치에 도달하는 순간,
     * 숨겨져 있던 빈 CRT 고장 영역을 처음 표시한다.
     */
    typingUnit.node.classList.remove("is-pending");
    typingUnit.node.classList.add("is-visible");

    /*
     * 숨김 상태에서 멈춰 있던 노이즈 애니메이션이
     * 첫 프레임부터 시작되도록 브라우저 화면을 갱신한다.
     */
    void typingUnit.node.offsetWidth;

    /*
     * 오류 영역이 처음 나타나는 약 0.52초 동안은
     * 신호 오류를 조금 더 강하게 표현한다.
     */
    typingUnit.node.classList.add("is-reading");

    window.setTimeout(() => {
      typingUnit.node.classList.remove("is-reading");
    }, 520);

    /*
     * 커서를 오류 영역 뒤로 옮긴 뒤
     * 이어지는 문장을 계속 타이핑한다.
     */
    typingUnit.node.after(terminalCursor);
    return;
  }

  if (typingUnit.character !== "\n") {
    typingUnit.node.classList.remove("is-pending");
    typingUnit.node.classList.add("is-visible");
  }

  typingUnit.node.after(terminalCursor);
}

function getTypingUnitWeight(typingUnit) {
  if (typingUnit.type === "unknown-location") {
    /*
     * 글자를 출력하지는 않지만,
     * 고장 난 데이터를 읽으려다 실패하는 짧은 시간을 준다.
     * 전체 타이핑 시간 15초 안에 포함된다.
     */
    return 2.8;
  }

  return getTypingDelayWeight(typingUnit.character);
}

async function typeMissionMessage(typingUnits) {
  if (typingUnits.length === 0) {
    await wait(TYPING_TOTAL_DURATION);
    return;
  }

  if (typingUnits.length === 1) {
    revealTerminalTypingUnit(typingUnits[0]);
    await wait(TYPING_TOTAL_DURATION);
    return;
  }

  const intervalWeights = typingUnits
    .slice(0, -1)
    .map(getTypingUnitWeight);

  const totalWeight = intervalWeights.reduce(
    (sum, weight) => sum + weight,
    0
  );

  const typingStartedAt = performance.now();
  let accumulatedWeight = 0;

  /*
   * 첫 글자는 타이핑 시작과 동시에 표시한다.
   */
  revealTerminalTypingUnit(typingUnits[0]);

  for (
    let index = 1;
    index < typingUnits.length;
    index += 1
  ) {
    accumulatedWeight += intervalWeights[index - 1];

    const targetElapsedTime =
      (accumulatedWeight / totalWeight) *
      TYPING_TOTAL_DURATION;

    const actualElapsedTime =
      performance.now() - typingStartedAt;

    const remainingDelay = Math.max(
      0,
      targetElapsedTime - actualElapsedTime
    );

    await wait(remainingDelay);

    revealTerminalTypingUnit(typingUnits[index]);
  }
}

async function runMissionSequence() {
  terminalText.replaceChildren();
  terminalCursor.hidden = true;

  /*
   * 1단계
   * MISSION COMPLETE 화면이 1.5초 동안
   * 지지직거리는 노이즈와 함께 암전된다.
   */
  document.body.classList.add("initial-noise-transition");
  signalNoiseOverlay.classList.add("noise-blackout-in");

  await wait(INITIAL_NOISE_DURATION);

  /*
   * 2단계
   * 암전이 완료되면 빈 터미널 화면을 표시한다.
   */
  missionCompleteIntro.hidden = true;
  terminalScreen.hidden = false;
  terminalScreen.classList.add("terminal-active");

  document.body.classList.remove("initial-noise-transition");
  signalNoiseOverlay.classList.remove("noise-blackout-in");

  /*
   * 빈 터미널 화면을 2초 동안 유지한다.
   * 이때 커서, 문장, 고장 영역 모두 표시하지 않는다.
   */
  await wait(PRE_TYPING_WAIT_DURATION);

  /*
   * 3단계
   * 타이핑 시작 순간에 전체 문장의 자리를 미리 잡는다.
   *
   * 정상 글자와 알 수 없는 다음 도시 위치는
   * 모두 보이지 않는 상태로 자리만 차지한다.
   *
   * 타이핑 순서가 다음 도시 위치에 도달하는 순간,
   * 그 자리에서 빈 CRT 오류 영역이 처음 나타난다.
   */
  const typingUnits =
    createTerminalTypingLayout(missionMessage);

  terminalCursor.hidden = false;

  /*
   * 정상 문자만 한 글자씩 표시한다.
   * 전체 타이핑 시간은 기존과 동일하게 15초다.
   */
  await typeMissionMessage(typingUnits);

  /*
   * 4단계
   * 타이핑이 끝난 문장을 3초 동안 그대로 보여준다.
   * 고장 난 장소 영역도 계속 오류 상태를 유지한다.
   */
  await wait(POST_TYPING_HOLD_DURATION);

  terminalCursor.hidden = true;

  /*
   * 5단계
   * 최종 디졸브는 두 페이지에 걸쳐 총 1.5초 동안 진행된다.
   *
   * 현재 페이지: 0.75초 동안 노이즈가 차오름
   * 다음 index.html: 0.75초 동안 노이즈가 걷힘
   */
  sessionStorage.setItem(
    "covertContinueNoiseDissolve",
    "1"
  );

  document.body.classList.add("final-noise-transition");
  signalNoiseOverlay.classList.add("noise-dissolve-out");

  await wait(OUTGOING_DISSOLVE_DURATION);

  const returnUrl = new URL(
    "index.html",
    window.location.href
  );

  returnUrl.searchParams.set("after", "complete");
  returnUrl.searchParams.set("lang", completionLanguage);

  window.location.replace(returnUrl.toString());
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    runMissionSequence,
    { once: true }
  );
} else {
  runMissionSequence();
}