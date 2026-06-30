"use strict";

const simpleReportCopies = {
  en: {
    finalReport: "FINAL REPORT",
    reportLabel: "REPORT",
    reportPlaceholder: "Send your mission report.",
    imageLabel: "Attach image (optional)",
    imageButton: "Select image",
    removeImage: "Remove",
    emailLabel: "Email for the next mission",
    emailPlaceholder: "example@email.com (optional)",
    marketingAgreeText: "I agree to receive promotional emails about future stamp books, city missions, goods, events, and discounts.",
    sendButton: "Send Report",
    alertReport: "Please write your report.",
    alertEmail: "The email format is not valid.",
    alertImageType: "Please select an image file.",
    alertImageSize: "The image must be 10 MB or smaller.",
    confirmNoConsent: "You entered an email but did not agree to receive promotional emails.\n\nPress OK to submit without saving the email.\nPress Cancel to go back."
  },
  kr: {
    finalReport: "FINAL REPORT",
    reportLabel: "보고",
    reportPlaceholder: "미션 결과를 보고해주세요.",
    imageLabel: "이미지 첨부 (선택)",
    imageButton: "이미지 선택",
    removeImage: "삭제",
    emailLabel: "다음 미션을 받을 이메일",
    emailPlaceholder: "example@email.com (선택)",
    marketingAgreeText: "광고성 정보 수신에 동의합니다. 다음 스탬프 북, 도시별 미션, 상품, 이벤트, 할인 정보 등을 이메일로 받을 수 있습니다.",
    sendButton: "Send Report",
    alertReport: "보고 내용을 입력해주세요.",
    alertEmail: "이메일 형식이 올바르지 않습니다.",
    alertImageType: "이미지 파일을 선택해주세요.",
    alertImageSize: "이미지는 10MB 이하만 첨부할 수 있습니다.",
    confirmNoConsent: "이메일을 입력했지만 광고성 정보 수신에 동의하지 않았습니다.\n\n확인을 누르면 이메일을 저장하지 않고 보고서만 전송합니다.\n취소를 누르면 다시 확인할 수 있습니다."
  },
  cn: {
    finalReport: "FINAL REPORT",
    reportLabel: "报告",
    reportPlaceholder: "请提交任务报告。",
    imageLabel: "添加图片（选填）",
    imageButton: "选择图片",
    removeImage: "删除",
    emailLabel: "接收下一次任务的邮箱",
    emailPlaceholder: "example@email.com（选填）",
    marketingAgreeText: "我同意接收有关未来集章册、城市任务、商品、活动和折扣信息的广告邮件。",
    sendButton: "Send Report",
    alertReport: "请输入报告内容。",
    alertEmail: "邮箱格式不正确。",
    alertImageType: "请选择图片文件。",
    alertImageSize: "图片大小不能超过10MB。",
    confirmNoConsent: "你填写了邮箱，但没有同意接收广告邮件。\n\n点击确认将不保存邮箱，只提交报告。\n点击取消返回修改。"
  },
  jp: {
    finalReport: "FINAL REPORT",
    reportLabel: "レポート",
    reportPlaceholder: "任務の結果を報告してください。",
    imageLabel: "画像を添付（任意）",
    imageButton: "画像を選択",
    removeImage: "削除",
    emailLabel: "次のミッション案内を受け取るメール",
    emailPlaceholder: "example@email.com（任意）",
    marketingAgreeText: "今後のスタンプブック、都市ミッション、グッズ、イベント、割引情報に関する広告メールの受信に同意します。",
    sendButton: "Send Report",
    alertReport: "レポートを入力してください。",
    alertEmail: "メールアドレスの形式が正しくありません。",
    alertImageType: "画像ファイルを選択してください。",
    alertImageSize: "画像は10MB以下にしてください。",
    confirmNoConsent: "メールアドレスが入力されていますが、広告メールの受信に同意していません。\n\nOKを押すと、メールアドレスを保存せずにレポートだけ送信します。\nキャンセルを押すと戻ります。"
  }
};

const simpleSupportedLanguages = ["en", "kr", "cn", "jp"];
const maxImageSize = 10 * 1024 * 1024;

function getSimpleReportLanguage() {
  const params = new URLSearchParams(window.location.search);
  const urlLanguage = params.get("lang")?.toLowerCase();

  if (simpleSupportedLanguages.includes(urlLanguage)) {
    return urlLanguage;
  }

  const savedLanguage = localStorage.getItem("covertLanguage");
  if (simpleSupportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return "kr";
}

let simpleReportLanguage = getSimpleReportLanguage();

function getSimpleReportCopy() {
  return simpleReportCopies[simpleReportLanguage] || simpleReportCopies.kr;
}

function applySimpleReportLanguage(language) {
  if (!simpleSupportedLanguages.includes(language)) {
    return;
  }

  simpleReportLanguage = language;
  const copy = getSimpleReportCopy();

  document.querySelectorAll("[data-simple-i18n]").forEach((node) => {
    const key = node.getAttribute("data-simple-i18n");
    if (copy[key]) {
      node.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-simple-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-simple-placeholder");
    if (copy[key]) {
      node.setAttribute("placeholder", copy[key]);
    }
  });
}

applySimpleReportLanguage(simpleReportLanguage);

window.addEventListener("click", (event) => {
  const languageButton = event.target.closest(".language-switcher button");
  if (!languageButton) {
    return;
  }

  const nextLanguage = languageButton.dataset.lang;
  window.setTimeout(() => {
    applySimpleReportLanguage(nextLanguage);
  }, 0);
});

const simpleReportForm = document.getElementById("simpleReportForm");
const reportImageInput = document.getElementById("reportImage");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewImage = document.getElementById("imagePreviewImage");
const imageFileName = document.getElementById("imageFileName");
const removeImageButton = document.getElementById("removeImageButton");
const sendReportButton = document.getElementById("sendReportButton");

let previewObjectUrl = "";

function isImageFile(file) {
  if (!file) {
    return false;
  }

  return (
    file.type.startsWith("image/") ||
    /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)
  );
}

function clearImageSelection() {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = "";
  }

  reportImageInput.value = "";
  imagePreviewImage.removeAttribute("src");
  imagePreviewImage.hidden = false;
  imageFileName.textContent = "";
  imagePreview.hidden = true;
}

reportImageInput.addEventListener("change", () => {
  const copy = getSimpleReportCopy();
  const file = reportImageInput.files?.[0];

  if (!file) {
    clearImageSelection();
    return;
  }

  if (!isImageFile(file)) {
    alert(copy.alertImageType);
    clearImageSelection();
    return;
  }

  if (file.size > maxImageSize) {
    alert(copy.alertImageSize);
    clearImageSelection();
    return;
  }

  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
  }

  previewObjectUrl = URL.createObjectURL(file);
  imagePreviewImage.hidden = false;
  imagePreviewImage.src = previewObjectUrl;
  imagePreviewImage.onerror = () => {
    imagePreviewImage.hidden = true;
  };
  imageFileName.textContent = file.name;
  imagePreview.hidden = false;
});

removeImageButton.addEventListener("click", clearImageSelection);

function createReportId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `report-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function openCovertReportDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not supported."));
      return;
    }

    const request = indexedDB.open("covertMissionDatabase", 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("reportImages")) {
        database.createObjectStore("reportImages", { keyPath: "reportId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveReportImage(reportId, file) {
  const database = await openCovertReportDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction("reportImages", "readwrite");
    const store = transaction.objectStore("reportImages");

    store.put({
      reportId,
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      savedAt: new Date().toISOString()
    });

    transaction.oncomplete = () => {
      database.close();
      resolve(true);
    };

    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

simpleReportForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const copy = getSimpleReportCopy();
  const reportText = document.getElementById("reportText").value.trim();
  let email = document.getElementById("email").value.trim();
  const marketingAgree = document.getElementById("marketingAgree").checked;
  const imageFile = reportImageInput.files?.[0] || null;

  if (!reportText) {
    alert(copy.alertReport);
    return;
  }

  if (email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert(copy.alertEmail);
      return;
    }
  }

  if (imageFile && !isImageFile(imageFile)) {
    alert(copy.alertImageType);
    return;
  }

  if (imageFile && imageFile.size > maxImageSize) {
    alert(copy.alertImageSize);
    return;
  }

  if (email && !marketingAgree) {
    const continueWithoutEmail = window.confirm(copy.confirmNoConsent);
    if (!continueWithoutEmail) {
      return;
    }

    email = "";
  }

  sendReportButton.disabled = true;

  const reportId = createReportId();
  let imageStored = false;

  if (imageFile) {
    try {
      imageStored = await saveReportImage(reportId, imageFile);
    } catch (error) {
      console.warn("The selected image could not be stored locally.", error);
    }
  }

  const reportPayload = {
    reportId,
    language: simpleReportLanguage,
    reportText,
    email,
    marketingAgree: Boolean(email && marketingAgree),
    image: imageFile
      ? {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size,
          storedLocally: imageStored
        }
      : null,
    submittedAt: new Date().toISOString()
  };

  localStorage.setItem(
    "latestCovertMissionReport",
    JSON.stringify(reportPayload)
  );

  const completionUrl = new URL("mission-complete.html", window.location.href);
  completionUrl.searchParams.set("lang", simpleReportLanguage);
  window.location.assign(completionUrl.toString());
});
