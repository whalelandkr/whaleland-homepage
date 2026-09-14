/* ==========================================================
   C.O.V.E.R.T — 모든 페이지가 공유하는 부트 스크립트

   왜 한 파일인가 —
     같은 코드가 29개 페이지에 복사돼 있었습니다. 그중 언어 전환 핸들러가
     보존 화면(/briefing/ /mission/ /report/)이 읽는 covertLanguage 를 남기지
     않아, 언어를 고르고 지령을 받으러 가면 언어가 초기화됐습니다.
     복사본이 29개면 그런 어긋남을 고칠 수가 없습니다.

   <head> 안에서 «막고» 읽습니다. 언어 이동과 모션 모드는 첫 그림이 그려지기
   전에 정해져야 하기 때문입니다. 파일이 2KB 대라 그 값을 합니다.

   쓰는 법
     <script src="../assets/boot.js"></script>              보통 페이지
     <script src="assets/boot.js" data-root></script>       배포 루트 홈에만

   data-root 는 «?lang= 을 받아 언어 폴더로 보내는 라우터»와
   «브라우저 언어 1회 자동 이동»을 켭니다. 다른 언어판 홈에 켜면 서로 튕겨냅니다.

   ⚠️ 분석 도구를 붙이는 자리는 «여기»입니다 (GA4 · 메타 픽셀).
      2026-09-13 까지 33쪽 중 8쪽에만 주석으로 흩어져 있었습니다. 그대로 두면
      ID 가 나오는 날 그 여덟 쪽만 켜지고 구매 동선(/kit/ /get/ /zones/)이 통째로 빠집니다.
      붙일 때는 이 파일 «맨 아래»에 한 번만 넣고, 아래 둘을 반드시 지킵니다 —
        · 로밍 가드(thrifty)와 같은 판단을 씁니다. 데이터를 아껴 달라고 한 손님에게
          추적 스크립트를 내려받게 하지 않습니다
        · /privacy/ 네 벌에 «먼저» 적습니다. 지금 그 페이지는 「자동 수집 장치를
          운영하지 않는다」고 적고 있어, 붙이는 순간 거짓이 됩니다 (법 제30조제1항제7호)

   localStorage 키
     covertLanguage   보존 5화면이 읽는 키 (kr|en|jp|cn)
     cov_lang         자동 이동을 «이미 했다»는 표시
     covert-motion    모션 모드 (auto|full|static)
     cov_seen_open    개봉 연출을 본 적 있다
   ========================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var me = document.currentScript;
  var isRoot = !!(me && me.hasAttribute('data-root'));

  /* CSS 가 «JS 가 도는 문서인지» 알아야 합니다.
     .rv 는 기본이 opacity:0 이라, JS 가 없으면 본문이 통째로 사라집니다. */
  doc.classList.add('js');

  var ls = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var LANGS = { kr: 'kr/', en: '', jp: 'jp/', cn: 'cn/' };

  /* ── 1. 보존 화면에서 돌아오는 ?lang= 을 받는다 ───────────────────
     지령 터미널은 끝나면 ../?lang=xx 로 replace 하고, Final report 의
     「More…?」 버튼도 같은 곳을 가리킵니다. 그 두 줄은 «고치지 않습니다»
     (절대 규칙 0). 대신 여기서 받아 언어 폴더로 보냅니다.
     ⚠️ 브라우저 언어 자동 이동보다 «먼저» 와야 합니다. 손님이 고른 언어를
        브라우저 설정이 덮어쓰면 안 됩니다. */
  if (isRoot) {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1];
    if (q) {
      q = q.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LANGS, q)) {
        ls.set('covertLanguage', q);
        ls.set('cov_lang', '1');
        if (LANGS[q]) { location.replace(LANGS[q]); return; }
      }
    }
  }

  /* ── 2. 브라우저 언어 1회 자동 이동 ──────────────────────────────
     ⚠️ ?lang= 으로 들어온 사람은 위 1 에서 이미 플래그가 찍혀 여기까지 오지 않습니다.
        그 밖의 쿼리(?utm_source= 같은)는 «막지 않습니다» — 막으면 광고로 들어온
        첫 방문자가 제 언어판을 못 받습니다. 크롤러는 covertLanguage 를 안 남기므로
        매번 영문 홈을 요청하고, 자동 이동은 실제 브라우저에서만 한 번 돕니다.
     ⚠️ 플래그는 «실제로 이동할 때만» 남깁니다. 그래야 아직 판본이 없는
        언어의 방문자가 나중에 정상 전환됩니다. */
  var BY_NAV = { ko: 'kr', ja: 'jp', zh: 'cn' };
  if (isRoot && !ls.get('cov_lang')) {
    var nav = (navigator.language || 'en').toLowerCase().slice(0, 2);
    var code = BY_NAV[nav];
    if (code) {
      ls.set('cov_lang', '1');
      ls.set('covertLanguage', code);
      location.replace(LANGS[code]);
      return;
    }
  }

  /* ── 3. 모션 모드 ────────────────────────────────────────────────
     auto   시스템 설정을 따릅니다 (기본)
     full   시스템이 «줄이기»여도 전부 봅니다
     static 스크롤 연출 없이 정지 화면으로 봅니다
     ⚠️ 2단(켬/끔)으로 두면 한 번 끈 사람이 영영 정적에 갇힙니다. */
  var MODES = ['auto', 'full', 'static'];
  var mode = ls.get('covert-motion');
  if (MODES.indexOf(mode) < 0) mode = 'auto';

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* 로밍으로 들어온 손님. 초도 1,500세트 중 1,000세트가 일본·중국 몫이고
     그 손님은 공항 와이파이나 로밍으로 엽니다. 데이터를 아껴 달라고
     «브라우저가 말해 주면» 정지 화면으로 내립니다. */
  var thrifty = false;
  try {
    var c = navigator.connection;
    if (c && (c.saveData === true || /^(slow-)?2g$/.test(c.effectiveType || '') || c.effectiveType === '3g')) thrifty = true;
  } catch (e) {}

  function effective() {
    if (mode === 'full') return 'full';
    if (mode === 'static') return 'static';
    if (thrifty) return 'static';
    return reduce ? 'soft' : 'full';
  }
  function applyMotion(announce) {
    doc.setAttribute('data-motion', effective());
    doc.setAttribute('data-motion-mode', mode);
    /* 개봉 엔진(assets/opening.js)이 이 신호를 듣고 다시 그린다.
       ⚠️ 모드 판정을 두 군데 두지 않는다. 여기가 «주인»이고 저쪽은 읽기만 한다 */
    if (announce) document.dispatchEvent(new CustomEvent('covert:motion'));
  }
  applyMotion();

  /* 시스템 설정을 «켜는 중»에 바꿔도 따라간다 (자동일 때만) */
  try {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    var onSys = function (e) { reduce = e.matches; if (mode === 'auto') applyMotion(true); };
    if (mq.addEventListener) mq.addEventListener('change', onSys);
    else if (mq.addListener) mq.addListener(onSys);
  } catch (e) {}

  /* ── 4. 개봉을 본 적 있는가 ──────────────────────────────────────
     두 번째 방문·언어 전환·지령 귀환에서는 개봉을 정지 히어로 한 장으로
     접습니다. 12화면을 다시 보게 하지 않습니다.
     ⚠️ scrollTo 로 위치를 조작하지 않습니다 — 뒤로가기와 싸웁니다. */
  if (ls.get('cov_seen_open') || /[?&]keep=1\b/.test(location.search)) {
    doc.setAttribute('data-seen', '1');
  }

  /* ── 여기부터는 DOM 이 필요합니다 ─────────────────────────────── */
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {

    /* 언어 선택 — 보존 화면이 읽는 키와 새 사이트가 쓰는 키를 «같이» 남깁니다.
       예전에는 cov_lang 만 남겨서, 언어를 고르고 지령을 받으러 가면
       보존 화면이 그 선택을 몰랐습니다. */
    var sel = document.getElementById('lang');
    if (sel) {
      sel.addEventListener('change', function () {
        var v = sel.value || '';
        var code = 'en';
        if (/(^|\/)kr\//.test(v)) code = 'kr';
        else if (/(^|\/)jp\//.test(v)) code = 'jp';
        else if (/(^|\/)cn\//.test(v)) code = 'cn';
        ls.set('cov_lang', '1');
        ls.set('covertLanguage', code);
        /* 개봉을 이미 본 사람이 언어만 바꿨을 때 처음부터 다시 보지 않게 합니다 */
        location.href = v + (doc.hasAttribute('data-seen') ? (v.indexOf('?') < 0 ? '?keep=1' : '&keep=1') : '');
      });
    }

    /* 건너뛰기 — 개봉 구간을 지나 본문으로 «즉시» 내려놓는다.
       ⚠️ behavior:'auto' 다. 부드럽게 두면 1,080vh 를 지나며 연출이 폭주 재생된다 */
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('[data-skip]');
      if (!b) return;
      var to = document.querySelector(b.getAttribute('data-skip'));
      if (!to) return;
      ev.preventDefault();
      window.scrollTo({ top: to.getBoundingClientRect().top + window.scrollY, behavior: 'auto' });
      /* ⚠️ 화면만 내리면 «초점은 단추에 그대로 남는다». 그러면 이어서 Tab 을 쳤을 때
         개봉 구간 안으로 되돌아간다 — 화면은 본문인데 초점은 개봉인 어긋난 상태다.
         이 단추는 편의 장치가 아니라 키보드 손님의 «유일한 탈출구»다
         (푸터가 유일한 내비인데 개봉이 그 위에 620vh 를 깐다).
         preventScroll 로 방금 맞춘 위치를 다시 흔들지 않는다. 2026-09-13 에 잡았다 */
      if (to.tabIndex < 0) to.setAttribute('tabindex', '-1');
      try { to.focus({ preventScroll: true }); } catch (e) { to.focus(); }
      ls.set('cov_seen_open', '1');
    });

    /* 개봉을 끝까지 본 사람은 다음부터 접어서 본다 */
    var op = document.getElementById('op-opening');
    if (op) {
      window.addEventListener('scroll', function () {
        var r = op.getBoundingClientRect();
        if (r.bottom <= window.innerHeight * 1.2) ls.set('cov_seen_open', '1');
      }, { passive: true });
    }

    /* 스크롤 등장 */
    var rv = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && effective() !== 'static' && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: .12 });
      Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
    } else {
      Array.prototype.forEach.call(rv, function (el) { el.classList.add('in'); });
    }

    /* 모션 전환 단추 — 푸터 글자 한 줄.
       ⚠️ 법정 고지는 절대 JS 로 넣지 않습니다 (구 사이트가 그 함정에서 빈 푸터를
          만들었습니다). 이건 «JS 가 있어야 뜻이 있는» 조작 장치라 넣어도 됩니다. */
    var slot = document.querySelector('.legal-links');
    if (slot) {
      var L = {
        ko: { auto: '모션: 자동', full: '모션: 전체', static: '모션: 정적' },
        ja: { auto: 'モーション: 自動', full: 'モーション: フル', static: 'モーション: 静止' },
        'zh-Hans': { auto: '动效：自动', full: '动效：完整', static: '动效：静态' },
        en: { auto: 'Motion: Auto', full: 'Motion: Full', static: 'Motion: Static' }
      };
      var lab = L[doc.lang] || L[(doc.lang || '').slice(0, 2)] || L.en;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'motionbtn';
      btn.textContent = lab[mode];
      btn.addEventListener('click', function () {
        mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
        ls.set('covert-motion', mode);
        applyMotion(true);
        btn.textContent = lab[mode];
      });
      slot.appendChild(btn);
    }
  });
})();
