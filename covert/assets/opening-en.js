/* C.O.V.E.R.T — 개봉 엔진
   ⚠️ social/_extract-opening.mjs 가 «생성»한다. 직접 고치지 않는다.
      원본은 _개봉-바닐라.html 의 마지막 <script> 다. */
/* ═════════════════════════════════════════════════════════════
   개봉 시퀀스 — 바닐라. GSAP 없음, 외부 요청 0개.

   원리는 GSAP 판과 «완전히 같다».
     · 핀        → CSS position:sticky (.anim .pin)
     · scrub     → 목표 진행률을 lerp 로 따라간다
     · 타임라인  → 0~1 구간에 각 동작을 매핑한다 (seg 함수)

   ⚠️ 시간 값(.03 / .05 / .10 …)은 GSAP 판에서 그대로 가져왔다.
      _selftest.html 로 실측해 맞춘 값이므로 임의로 바꾸지 않는다.
   ⚠️ 여권 미끄러짐 --out 95%→28% 의 «28%» 는 생성 사진의 여권 위치에
      맞춘 값이다. 건드리면 바꿔치는 순간 여권이 튄다.
   ═════════════════════════════════════════════════════════════ */
(function () {
  var M    = window.__motion;
  var root = document.documentElement;

  var q  = function (s) { return document.querySelector(s); };
  var qa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var opening   = q('#op-opening');
  var hint      = q('#op-hint');
  var pass      = q('#op-pass');
  var pclip     = q('#op-pclip');
  var settled   = q('#op-settled');
  var composite = q('#op-composite');
  /* 넘김 — 이제 같은 핀 안에 있다. 별도 섹션이 아니다 */
  var lipmask   = q('#op-lipmask');
  var pagecopy  = q('#op-pagecopy');
  var bookwrap  = q('.bookwrap');
  var stage     = q('.bookstage');   /* --t0..2 의 «주인». .book 은 상속으로 받는다 */
  var book      = q('#op-book');
  var leaves    = [q('#op-leaf0'), q('#op-leaf1'), q('#op-leaf2'),
                   q('#op-leaf3')];
  var sc0f = q('#op-sc0 .frame'), sc0c = q('#op-sc0 .copy');
  var sc1f = q('#op-sc1 .frame'), sc1c = q('#op-sc1 .copy');
  var sc2c = q('#op-sc2 .copy');
  /* sc3 의 «그림»은 이제 사진이 아니라 3D 책이다. 등장·일어섬은 .riser 에 건다 */
  var sc3f = q('#op-riser'), sc3c = q('#op-sc3 .copy');

  /* % · 완전히 봉투 속 → 다 나온 상태.
     끝값이 0 인 것은 «사진 속 제자리»라는 뜻이다. 누끼가 사진에서 나왔으므로
     0 이면 자동으로 맞는다 — 예전처럼 28 같은 실측값을 유지할 필요가 없다.
     시작값 34 는 여권 윗변(2.4%)이 봉투 입술선(약 34.6%) 아래로 내려가는 거리다 */
  var OUT_IN = 1, OUT_END = 0;

  /* ── 보간 도구 ─────────────────────────── */
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  /* 구간 [start, start+dur] 안에서 0→1 */
  function seg(p, start, dur) { return clamp((p - start) / dur); }
  function px(n) { return n.toFixed(2) + 'px'; }

  /* ── 카피 한 덩어리의 등장·퇴장을 한 번에 계산한다 ──
     GSAP 판의 두 트윈(들어옴 / 나감)을 합친 것이다.
     들어올 때 y 24→0, 나갈 때 0→-22 (soft 는 이동 없음) */
  function copy(el, p, soft, inAt, inDur, outAt, outDur) {
    var tIn  = seg(p, inAt, inDur);
    var tOut = outAt == null ? 0 : seg(p, outAt, outDur);
    el.style.opacity = tIn * (1 - tOut);
    el.style.transform = soft ? 'none'
      : 'translateY(' + px(24 * (1 - tIn) + (-22) * tOut) + ')';
  }

  /* ── 한 프레임 그리기 ───────────────────── */
  function render(p, soft) {
    /* 0.00~0.05 · 히어로를 붙잡는다 */
    hint.style.opacity = String(1 - seg(p, .03, .05));
    var t0 = seg(p, .05, .08);
    sc0c.style.opacity   = String(1 - t0);
    /* ⚠️ sc0 는 사라져도 DOM 에 남는다. 투명해진 링크가 계속 눌리고 탭 초점도 받는다.
       opacity 를 CSS 로 질의할 방법이 없으므로 같은 자리에서 «셋 다» 끈다.
       포인터만 끄면 눈에 아무것도 안 보이는 채로 탭 초점이 그 링크에 머문다 —
       2026-09-13 마무리 점검에서 잡혔다. 주석이 「탭 초점도 받는다」고 적어 놓고
       정작 포인터만 끄고 있었다. inert 는 포인터·초점·접근성 트리를 한꺼번에 빼고,
       안 받는 브라우저를 위해 tabIndex 도 같이 건다 */
    var off = t0 > .5;
    sc0c.style.pointerEvents = off ? 'none' : '';
    if ('inert' in sc0c) sc0c.inert = off;
    var sc0a = sc0c.querySelectorAll('a,button');
    for (var ai = 0; ai < sc0a.length; ai++) sc0a[ai].tabIndex = off ? -1 : 0;
    sc0c.style.transform = soft ? 'none' : 'translateY(' + px(-22 * t0) + ')';

    /* 0.10~0.22 · 봉투가 그 자리에서 열린다
       ⚠️ 크로스페이드 규칙 — 아래장(sc0)을 불투명하게 둔 채 위장(sc1)만 올리고,
          다 올라온 뒤에 아래장을 끈다 */
    sc0f.style.opacity = p >= .23 ? '0' : '1';
    sc1f.style.opacity = p >= .34 ? '0' : String(seg(p, .10, .12));
    copy(sc1c, p, soft, .18, .08, .32, .06);

    /* 0.34 · sc1 과 sc2 는 같은 봉투 사진이라 이 교체는 눈에 보이지 않는다.

       0.76~0.86 · 봉투가 «떨어져 나간다». 앞판 사본(#op-lipmask)이 «똑같은» 값을 받는 것이 핵심이다.
       순서 — 불투명한 채로 먼저 내려가 표지 아랫부분을 지나가며 드러내고(.76~),
              다 지나간 뒤에 흐려진다(.80~.86). 실측상 앞판 입술선은 .80 에 이미
              책 최하단보다 52px 아래에 있어 «반투명 유령»이 생기는 프레임이 없다.
       ⚠️ translateZ 를 쓰지 말 것. .scene .pic 의 perspective:1400px 때문에
          #op-composite 만 원근 배율을 먹어 앞판 사본과 어긋난다. scale 은 안 어긋난다.
       ⚠️ saturate·brightness·contrast 를 넣지 말 것. 사진 네 변이 페이지색과
          «정확히» 같게 평탄화돼 있어서 채도를 조금만 건드려도 사각 테두리가 드러난다.
          색을 안 바꾸는 blur 만 쓴다 */
    var cVis = p < .34 ? 0 : 1 - seg(p, .88, .06);
    var ct = seg(p, .85, .09); ct = 1 - (1 - ct) * (1 - ct);   /* 처음이 빠른 곡선 */
    var cTr = ct ? 'translateY(' + (24 * ct).toFixed(2) + '%) scale(' +
                   (1 - .08 * ct).toFixed(4) + ')' : 'none';
    var blur = soft ? 0 : 6 * seg(p, .86, .07);
    var cFl = blur > .02 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
    composite.style.opacity   = String(cVis);
    composite.style.transform = cTr;
    composite.style.filter    = cFl;
    /* 앞판 사본은 .60~.64 에 «흐려 들어온다». 밑에 깔린 그림과 픽셀이 같아
       화면에는 변화가 없지만, 뚝 켜면 스탬프·끈 가장자리의 1px 링잉이 «팝»으로 보인다 */
    lipmask.style.opacity   = String(seg(p, .60, .04) * cVis);
    lipmask.style.transform = cTr;
    lipmask.style.filter    = cFl;

    /* 0.36~0.56 · 닫힌 여권이 봉투에서 «미끄러져» 올라온다
       ⚠️ soft 에서도 유지한다. 장식이 아니라 «내용»이다. */
    var to = seg(p, .36, .20);
    pass.style.setProperty('--out', (OUT_IN + (OUT_END - OUT_IN) * to).toFixed(4));

    /* 0.57~0.63 · 다 나온 뒤 «사진»으로 바꿔친다
       ⚠️ 누끼는 «봉투 입술 선»에서 잘라 두기 때문에(.pclip) 멈춘 그림으로 두면
          여권 가운데가 잘려 보인다. 다 나온 시점에 사진으로 갈아끼우고
          0.64 에서 누끼를 꺼야 «중간이 짤린» 여권이 남지 않는다.
       ⚠️ 두 장의 네이비 박스가 0.1% 이내로 일치하므로 이 교체는 튀지 않는다.
       ⚠️ 사진 여권은 .72~.76 에 «책 밑에서» 빠진다. 그때 책은 이미 불투명하고
          같은 자리를 덮고 있으며 앞판 사본도 아직 제자리라, 위아래로 완전히 갇힌 채
          사라진다 — 구멍이 안 생긴다. 반드시 봉투가 움직이기 «전»(.76 전)에 끝나야 한다.
          봉투가 먼저 움직이면 사진 여권이 책 밑에서 빠져나와 여권이 두 개가 된다 */
    settled.style.opacity = String(seg(p, .57, .06) * (1 - seg(p, .72, .04)));
    pclip.style.opacity   = p >= .64 ? '0' : '1';

    copy(sc2c, p, soft, .40, .08, .64, .06);

    /* 0.66~0.94 · 인계. «사진 속 여권이 있던 그 자리 · 그 크기 · 그 각도»에서
       3D 책이 나타나고, 그대로 일어선다.

       ⚠️ soft 에서도 자리·크기·각도·기립을 그대로 한다. 분기가 없다.
          예전에는 soft 에서 transform 을 'none' 으로 둬서 인계가 «아예 없었다» —
          책이 사진 여권과 중심 (99.7, 168.3)px 떨어진 곳에 2.8배 크기로 그냥 떠올랐다.
          대표 화면은 항상 soft 이므로, 대표가 지적한 «아래에 있는 다른 여권»이
          거기에만 그대로 살아 있었던 셈이다.
          여권이 봉투에서 나오는 것과 같은 이유로 이것도 «장식»이 아니라 «내용»이고,
          스크롤 스크럽이라 저절로 재생되지도 않는다.
          soft 에서 빼는 것은 blur 와 카피의 y 이동뿐이다.

       ⚠️ 예전에는 perspective(1400px) rotateX(72°) 로 «납작한 사진»을 세웠다.
          3D 책에 그걸 걸면 원근이 두 번 걸려(riser + .bookstage 의 perspective:2200px)
          표지가 비스듬한 판때기로 찌그러진다. 실제로 그렇게 나왔다. */
    sc3f.style.opacity = String(seg(p, .66, .06));
    /* 인쇄 표지(p01)에 «사진 속 가죽 밝기»를 입혔다가 .72~.84 에 걷는다.
       모양은 0.5px 안에서 겹치는데 밝기가 2.5배 달라서, 안 걸면 그 자리에서
       표지가 툭 어두워지는 것이 보인다 */
    /* ⚠️ 무늬가 바뀌는 구간을 «기립(.78~.94)» 안에 통째로 넣는다.
       두 표지의 무늬는 애초에 다른 물건이라 어떤 식으로 겹쳐도 한 번은 바뀐다.
       없앨 수 없으니 «움직이는 동안»으로 옮기는 것이 최선이다 —
       정지 상태에서 바꾸면 금박 원과 SEOUL 이 두 겹으로 어긋나는 것이 그대로 보인다.
       봉투는 .85 부터 물러나는데 사진 겹은 그 전에 이미 0 이다 —
       그래야 사진에 자료가 없는 표지 아랫부분(알파 0)의 이음매가 안 드러난다 */
    stage.style.setProperty('--lit', (1 - seg(p, .82, .03)).toFixed(3));

    var t3 = seg(p, .78, .16);
    /* smootherstep — 양끝이 «둘 다» 아주 느리다. 시작이 느려야 겹쳐 있는 순간이
       실제로 정지해 보이고, 끝이 느려야 툭 서지 않는다.
       smoothstep(3t²−2t³)은 시작에서 이미 2.3%/프레임 자라 겹침이 흐려진다 */
    var e = t3 * t3 * t3 * (t3 * (t3 * 6 - 15) + 10);
    var k = HAND.k + (1 - HAND.k) * e;
    /* transform-origin 이 표지 한가운데이므로 translate 는 그냥 두 중심의 차이다.
       ⚠️ 순서가 translate → rotate → scale 이어야 한다. CSS 는 오른쪽부터 적용하므로
          «표지 중심에서 키우고 → 표지 중심에서 돌리고 → 옮긴다» 가 된다 */
    sc3f.style.transform =
      'translate(' + (HAND.tx * (1 - e)).toFixed(1) + 'px,' +
                     (HAND.ty * (1 - e)).toFixed(1) + 'px)' +
      ' rotate(' + (HAND.deg * (1 - e)).toFixed(2) + 'deg)' +
      ' scale(' + k.toFixed(4) + ')';

    copy(sc3c, p, soft, .86, .08, null, 0);
  }

  /* ── 여권 → 책 이어붙이기 실측 ───────────
     사진 속 여권이 화면 어디에 얼마만 하게 있는지 재고, 닫힌 표지(leaf0)를
     거기서 출발시킨다. 값을 손으로 적지 않으므로 사진·판형·뷰포트가 바뀌어도 맞는다.

     ⚠️ riser 를 scale 하면 «riser 중심» 기준으로 커진다. leaf0 중심 기준이 아니다.
        그래서 옮길 거리는 두 중심의 차이까지 넣어 풀어야 한다 */
  /* 사진 속 «표지»의 자리 — 프레임 대비 %.
       cx, cy  표지 «윗변»의 중심
       w       표지 폭 (가시 깊이 한가운데에서 잰 값)
       deg     기울기

     ⚠️ .pass 상자(left 51.375 / top 2.313 / w 34.125 / h 33.938)를 쓰면 «안 된다».
        그건 기울어진 표지를 감싼 축정렬 bbox 라 표지보다 1.54배 넓다 —
        실측(1440×860) 그 값으로 잡은 표지 184.6px, 사진 속 실제 표지 119.8px.
        처음에 그 값을 써서 인계 순간 여권이 두 개로 보였다.
     ⚠️ 「13°」도 아니다. 13° 는 여권이 «밀려 나오는 방향»(누끼 스크립트 값)이고,
        표지 자체의 기울기는 26.49° 다. 13° 로 돌렸더니 반대로 기운 것처럼 보였다.

     네 값은 passport-cut.webp 의 알파에서 실측한다 —
     social/_make-passport-cut.mjs 를 돌리면 그대로 찍어 준다. 사진을 갈아 끼우면
     반드시 다시 뽑을 것. 안 뽑으면 오류 없이 «조용히» 어긋난다 */
  var COVER = { cx: 75.585, cy: 6.878, w: 22.255, deg: 26.49 };
  var HAND  = { k: .36, deg: COVER.deg, tx: 0, ty: 0 };

  /* ⚠️⚠️ measure() 가 «한 번이라도 성공했는지» 기억한다.
     실패하면 봉투 앞판 사본(.lipmask)이 자리·크기를 못 받아 «원본 1200px» 그대로
     남는다. 543px 짜리 장면 위에 1200px 봉투가 덮여 «봉투가 확 커졌다 작아지는»
     것으로 보인다. 2026-09-14 에 실제로 그렇게 배포돼 있었다.
     여기(프로토타입)는 그림을 바로 받아 첫 호출에 성공하지만,
     «배포본»은 _extract-opening.mjs 가 지연 로딩(wave)을 끼워 넣어
     #op-composite 가 그림이 오기 전까지 0×0 이다 — 그래서 첫 호출이 걸러진다.
     예전에는 resize 때만 다시 쟀다. 창을 안 건드리면 영영 안 고쳐졌다. */
  var measured = false;

  function measure() {
    if (!composite || !sc3f || !leaves[0]) return;
    /* ⚠️ 싼 검사를 «먼저» 한다. 아래에서 변형을 걷어내는 것은 강제 리플로라
       그림이 오기 전 프레임마다 되풀이하면 그만큼 비싸다 */
    if (!composite.getBoundingClientRect().width) return;
    /* ⚠️ 재는 동안 변형을 «걷어낸다».
       걸린 채로 재면 그 배율이 다시 곱해져 값이 눈덩이처럼 커진다 —
       실제로 k 가 0.56 이어야 하는데 1.58 까지 튀었다.
       --t0 도 0 으로 되돌려야 닫힌 표지의 자리를 잰다 */
    var pt = sc3f.style.transform;
    var pv = stage.style.getPropertyValue('--t0');
    /* ⚠️⚠️ #op-composite 의 변형도 «반드시» 같이 걷어낸다.
       연출 막바지(진행률 .85~)에 render() 가 여기에
       translateY(24%) scale(.92) 를 건다. 그 상태로 재면 cr 이 그 값을 머금어
       ① 앞판 사본(.lipmask)이 아래로 94px · 폭 27px 어긋나고 — 봉투가 «둘»로 보인다
       ② HAND.k 가 cr.width 로 나오므로 표지 배율까지 같이 틀어진다.
       2026-09-14 에 실측으로 확인했다 (390×844).
       언제 그 시점에 재게 되나 — iOS 사파리는 «스크롤 중 주소표시줄이 접힐 때»
       resize 를 낸다. 연출 어느 지점에서든 여기로 들어온다. */
    var pc = composite.style.transform;
    sc3f.style.transform = 'none';
    composite.style.transform = 'none';
    stage.style.setProperty('--t0', '0');

    var cr = composite.getBoundingClientRect();
    var lr = leaves[0].getBoundingClientRect();
    var rr = sc3f.getBoundingClientRect();

    sc3f.style.transform = pt;
    composite.style.transform = pc;
    if (pv) stage.style.setProperty('--t0', pv); else stage.style.removeProperty('--t0');

    if (!cr.width || !lr.width || !rr.width) return;

    /* 앞판 사본을 봉투 사진에 «픽셀로» 포갠다.
       둘 다 같은 .pin 안이라 스크롤 위치가 상쇄된다 — 어디서 재도 같은 값이다 */
    var wr = bookwrap.getBoundingClientRect();
    lipmask.style.left   = (cr.left - wr.left).toFixed(1) + 'px';
    lipmask.style.top    = (cr.top - wr.top).toFixed(1) + 'px';
    lipmask.style.width  = cr.width.toFixed(1) + 'px';
    lipmask.style.height = cr.height.toFixed(1) + 'px';

    /* 배율은 «균일»이다. 세로만 눌러 맞추는 보정을 넣지 않는다 —
       ① 표지 아랫변은 봉투 앞판에 가려 «보이지 않으므로» 세로 배율은 관측되지 않는다.
       ② .book 의 rotateX(5deg) 가 이미 원근 사다리꼴을 만든다
          (그려진 윗변/아랫변 비 1.019, 사진 속 표지 1.028).
       ③ 균일이라 일어서기가 rotate→0 · scale→1 의 «닮음 변환»이 되어
          표지가 인쇄 비율(88:125)을 잃지 않는다 */
    var th = COVER.deg * Math.PI / 180;
    var kk = (cr.width * COVER.w / 100) / lr.width;

    /* 표지 중심 = 윗변 중심 + (표지 아래 방향) × (그려진 높이 / 2).
       높이를 «지금 그려진 leaf0» 에서 가져오므로 판형·원근·뷰포트가 바뀌어도 따라간다 */
    var hh = lr.height * kk / 2;
    var px = cr.left + cr.width * COVER.cx / 100 - Math.sin(th) * hh;
    var py = cr.top + cr.height * COVER.cy / 100 + Math.cos(th) * hh;
    var lcx = lr.left + lr.width / 2, lcy = lr.top + lr.height / 2;

    /* 변형 기준점을 «표지 한가운데»로 옮긴다. 그래야 커지는 것도 도는 것도
       표지를 축으로 일어나고, 옮길 거리가 그냥 두 중심의 차이가 된다.
       riser 중심을 기준으로 두면 회전할 때 표지가 큰 호를 그리며 휙 돈다 */
    sc3f.style.transformOrigin = (lcx - rr.left).toFixed(1) + 'px ' + (lcy - rr.top).toFixed(1) + 'px';
    HAND = { k: kk, deg: COVER.deg, tx: px - lcx, ty: py - lcy };
    measured = true;
  }

  /* ── 페이지 넘김 ───────────────────────
     세 장을 순차로 넘긴다. 앞뒤에 여유를 둬야 «넘기다 만» 상태로 끝나지 않는다.
       leaf0  p01 → p02   (표지가 열린다)
       leaf1  p03 → p04
       leaf2  p05 → p06   (경복궁 지령 면이 왼쪽에 선다)
     다 넘기면 왼쪽 p06 · 오른쪽 p07 = 경복궁 펼침면 */
  /* 여섯 번 넘긴다. 경복궁 펼침면(세 번째)에서 한참 쉬는 것이 핵심이다 —
     그 구간에 손글씨가 채워지고 마지막에 스티커가 붙는다.
       .02~.14  표지 → 2·3
       .16~.28  → 4·5
       .30~.42  → 6·7  경복궁
       .44~.62  ⟵ 쉬면서 «쓰는» 구간 (WRITE)
       .64~.74  → 36·37
       .76~.86  → 38·39
       .88~.98  → 40   뒤표지로 닫힌다 */
  /* 여섯 번 넘긴다. 넘김 사이사이에 «직접 쓰는» 구간이 넷 들어간다 —
       2·3   요원 정보 (옆으로 돌려서 쓴다)
       4·5   서약 서명
       6·7   경복궁 기록면 + 인장 스티커
       36·37 임무 기록 두 장 */
  /* 장이 넘어가는 자리 — [시작, 길이] (넘김 진행률 기준).
     뒷장을 떼면서 마지막 사건이 .70 에서 끝나 전체를 1/.70 배로 늘렸다.
     손으로 맞춘 순서와 간격이 그대로 보존된다. */
  var SPANS = [[.0143, .0571], [.4000, .0571], [.5500, .0571]];

  /* 채워 넣기 — 이름 → [시작, 길이] (넘김 진행률 기준).
     순서가 곧 사람이 쓰는 순서다 */
  var WRITE = [
    /* 2·3 요원 정보. @아이디를 먼저 쓰고, 책을 옆으로 돌려 세로 칸을 채운 뒤 되돌린다 */
    ['id02',   .0886, .0371],
    ['fname',  .1771, .0186], ['fid',   .1986, .0214], ['fcode', .2229, .0171],
    ['fnat',   .2429, .0171], ['fdob',  .2629, .0200], ['fsex',  .2857, .0114],
    ['fmbti',  .3000, .0143], ['fcolor', .3171, .0171],

    /* 4·5 서약 서명 */
    ['p04sign', .4786, .0429],

    /* 6·7 경복궁 기록면 — 여기가 끝이다. 다 쓰고 투명 인장을 붙이면 핀이 끝난다 */
    ['hd1', .6400, .0171], ['hd2', .6614, .0171],
    ['hwx', .6857, .0171],
    ['hy1', .7100, .0271], ['hy2', .7414, .0271], ['hy3', .7729, .0243], ['hy4', .8014, .0243],
    ['hcx', .8314, .0143],
    ['hm',  .8514, .0214],
    ['hc',  .8786, .0157],
    ['hk1', .9000, .0114], ['hk2', .9129, .0114], ['hk3', .9257, .0114],
    ['wg',  .9429, .0200],
    ['wh',  .9657, .0171]
  ];

  /* 책을 옆으로 돌리는 구간 — 세로쓰기 칸을 채우는 동안만 90° 다 */
  var TURN_IN = [.1343, .0343], TURN_OUT = [.3429, .0343];

  /* 지면마다 붙는 설명이 «보이는 구간» — [들어옴, 나감] */
  var CAPS = [[.0643, .3929], [.4500, .5429], [.6000, .9929]];
  function renderPages(p) {
    for (var i = 0; i < SPANS.length; i++) {
      var t = seg(p, SPANS[i][0], SPANS[i][1]);
      leaves[i].style.transform = 'rotateY(' + (-180 * t).toFixed(2) + 'deg)';
      /* 안 넘긴 장은 위에서부터, 넘어간 장은 아래에서부터 쌓인다.
         이걸 안 하면 넘어간 장이 아직 안 넘긴 장을 덮는다 */
      leaves[i].style.zIndex = String(t < .5 ? (10 - i) : (i + 1));
      stage.style.setProperty('--t' + i, t.toFixed(4));
    }
    /* 펼침 정도 — 표지가 열리면 1. 책 그림자가 이 값으로 넓어진다.
       예전에는 «마지막 장이 넘어가면 다시 0» 이었지만, 책을 닫는 장(leaf5)을
       뗐으므로 열린 채로 끝난다 */
    stage.style.setProperty('--open', seg(p, SPANS[0][0], SPANS[0][1]).toFixed(4));
    /* 채워 넣기 — 값이 .bookstage 에 있으면 상속으로 .fill 까지 내려간다 */
    /* ⚠️ 루프 변수를 q 로 쓰지 말 것. 이 파일의 q 는 querySelector 헬퍼다 —
       clearAll 안에서 var q 를 선언하면 그 함수 안의 q() 호출이 통째로 죽는다.
       실제로 그렇게 페이지가 안 떴다 */
    stage.style.setProperty('--turn',
      (seg(p, TURN_IN[0], TURN_IN[1]) * (1 - seg(p, TURN_OUT[0], TURN_OUT[1]))).toFixed(4));
    for (var ci = 0; ci < CAPS.length; ci++) {
      /* ⚠️ 설명 상자는 .bookstage 의 자식이 «아니다». 책 밖에 따로 있으므로
         상속이 안 닿는다 — 값을 그 요소에 직접 걸어야 한다 */
      pagecopy.style.setProperty('--cap' + (ci + 1),
        (seg(p, CAPS[ci][0], .025) * (1 - seg(p, CAPS[ci][1], .025))).toFixed(4));
    }
    for (var w = 0; w < WRITE.length; w++) {
      stage.style.setProperty('--' + WRITE[w][0],
        seg(p, WRITE[w][1], WRITE[w][2]).toFixed(4));
    }
    /* sc3 카피를 «넘김이 시작될 때» 뺀다.
       render() 는 개봉 진행률만 보므로 여기서 처리해야 한다. 예전에는 구간이 끝나며
       화면 밖으로 밀려 나가 문제가 없었지만, 합친 뒤에는 페이지가 넘어가는 내내
       책 뒤에 남는다.
       ⚠️ p>0 일 때만 손댄다. 넘김이 시작됐다는 것은 개봉 진행률이 이미 1 이라는 뜻이고
          (pO=min(1,P*2) · pP=max(0,P*2-1) 이므로 둘이 겹치지 않는다),
          그때 render() 가 넣는 값은 항상 정확히 1 이다. 그래서 여기서 덮어써도 안전하다.
          p===0 에서 건드리면 등장 중인 카피를 지워 버린다 */
    if (p > 0) sc3c.style.opacity = String(1 - seg(p, 0, .05));
  }

  /* ── 진행률 ─────────────────────────────
     분할점 R = 개봉 구간이 전체 미끄럼에서 차지하는 몫.
     CSS 의 --open-vh / --turn-vh 하나만 읽으므로 «숫자가 두 군데 있지 않다».
     예전에는 P×6 처럼 2160vh 에 못 박혀 있어서, 길이를 바꾸면 배분표
     37줄을 통째로 다시 계산해야 했다. */
  var SPLIT = 1 / 6;
  function readSplit(el) {
    var cs = getComputedStyle(el);
    var o = parseFloat(cs.getPropertyValue('--open-vh'));
    var t = parseFloat(cs.getPropertyValue('--turn-vh'));
    if (o > 0 && t > 0) SPLIT = o / (o + t);
    return SPLIT;
  }
  /* 원좌표 P 하나를 두 타임라인으로 나눈다. 세 군데가 이 함수를 «같이» 쓴다 —
     따로 적어 두면 모드를 바꾼 직후 한 프레임이 틀린 자리에 그려진다 */
  function mapAt(P) {
    return { o: clamp(P / SPLIT), p: clamp((P - SPLIT) / (1 - SPLIT)) };
  }

  function progressOf(el) {
    var r = el.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    return total > 0 ? clamp(-r.top / total) : 0;
  }

  /* ── 상태 초기화 (모드 전환 시 남은 인라인 스타일을 지운다) ──
     ⚠️ leaf 를 빠뜨리면 모드를 바꿨을 때 여권이 «넘어간 채로» 굳는다 */
  var TARGETS = ['#op-hint', '#op-pass', '#op-pclip', '#op-settled', '#op-composite',
                 '#op-sc0 .frame', '#op-sc0 .copy', '#op-sc1 .frame', '#op-sc1 .copy',
                 '#op-sc2 .copy', '#op-riser', '#op-sc3 .copy', '#op-lipmask', '#op-pagecopy',
                 '.bookstage', '#op-book', '#op-leaf0', '#op-leaf1', '#op-leaf2'];
  function clearAll() {
    TARGETS.forEach(function (s) {
      var el = q(s); if (!el) return;
      el.style.opacity = '';
      el.style.pointerEvents = '';
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.filter = '';
      el.style.left = el.style.top = el.style.width = el.style.height = '';
      el.style.zIndex = '';
      el.style.removeProperty('--out');
      for (var n = 0; n < 6; n++) el.style.removeProperty('--t' + n);
      el.style.removeProperty('--open');
      el.style.removeProperty('--turn');
      for (var w = 0; w < WRITE.length; w++) el.style.removeProperty('--' + WRITE[w][0]);
      for (var ci = 0; ci < CAPS.length; ci++) el.style.removeProperty('--cap' + (ci + 1));
      el.style.removeProperty('--lit');
    });
  }

  /* ── 루프 ─────────────────────────────────
     두 구간(개봉 · 넘김)이 각자 진행률을 갖는다. 서로 다른 섹션이라
     하나로 합치면 한쪽이 끝나기 전에 다른 쪽이 시작한다 */
  var curO = 0, tarO = 0, curP = 0, tarP = 0;
  var raf = 0, running = false, soft = false;

  function tick() {
    /* scrub 0.6 에 해당하는 추종. 값이 거의 닿으면 루프를 멈춰 배터리를 아낀다 */
    curO += (tarO - curO) * 0.14;
    curP += (tarP - curP) * 0.14;
    if (Math.abs(tarO - curO) < 0.0004) curO = tarO;
    if (Math.abs(tarP - curP) < 0.0004) curP = tarP;
    render(curO, soft);
    renderPages(curP);
    if (curO !== tarO || curP !== tarP) { raf = requestAnimationFrame(tick); }
    else { raf = 0; }
  }
  function onScroll() {
    if (!running) return;
    /* ⚠️ 아직 못 쟀으면 다시 잰다. 봉투 사진이 «늦게» 오는 배포본에서
       첫 호출이 걸러지기 때문이다 (measured 주석 참조).
       성공하면 다시는 안 부른다 — 싼 검사가 measure() 맨 앞에 있다 */
    if (!measured) measure();
    /* 한 구간에 두 타임라인을 싣는다. 분할점은 근사가 아니라 정확히 0.5 다 —
       핀의 이동거리가 height−100vh 라서 1180vh 의 «앞 1/3»(360vh)이
       합치기 전 개봉 구간의 이동거리(460−100)와 같다.
       넘김은 장이 셋에서 여섯으로 늘어 두 배(720vh)를 쓴다.
       그래서 render()·renderPages()·SPANS 의 튜닝값을 하나도 안 고쳤다 */
    var P = progressOf(opening);
    if (window.__wave) window.__wave(P);
    var m = mapAt(P);
    tarO = m.o; tarP = m.p;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  /* ── 모드 적용 ─────────────────────────── */
  function apply(view) {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    clearAll();

    if (view === 'static') {
      /* 모드는 boot.js 가 html[data-motion] 에 적는다. 여기서 고치지 않는다 */
      /* 정적에서는 여권이 «봉투에서 나온 상태»로 멈춰 있고,
         넘김 구간은 CSS 기본값(--t 전부 1)이라 경복궁 펼침면이 그대로 보인다.
         ⚠️ 누끼(.pclip)를 끄고 사진을 켜야 한다. 안 끄면 잘린 채로 굳는다 */
      pass.style.setProperty('--out', String(OUT_END));
      pclip.style.opacity   = '0';
      settled.style.opacity = '1';
    } else {
      soft = (view === 'soft');
      /* 표지 크기는 --pw 가 정한다. 예전의 endScale(1.24)은 «납작한 사진»을
         키우려고 두었던 값이라 3D 책에는 필요 없다 */
      running = true;
      /* ⚠️ onScroll 과 «같은» 매핑이어야 한다. 여기를 빠뜨리면 모드를 바꾼 직후
         한 프레임이 틀린 자리에 그려진다 */
      readSplit(opening);
      var m0 = mapAt(progressOf(opening));
      curO = tarO = m0.o;
      curP = tarP = m0.p;
      /* ⚠️ clearAll() 이 방금 lipmask 의 자리·크기를 지웠다. 다시 재야 한다 */
      measured = false;
      measure();
      render(curO, soft);
      renderPages(curP);
    }
    window.__view = view;
  }

  /* boot.js 가 html[data-motion] 에 적어 둔 값을 읽어 시작한다.
     full · soft · static 세 가지이고, 푸터의 모션 단추가 바꾸면 다시 적용한다 */
  function currentView() {
    var v = root.getAttribute('data-motion');
    return (v === 'soft' || v === 'static') ? v : 'full';
  }
  apply(currentView());
  document.addEventListener('covert:motion', function () { apply(currentView()); });

  /* ── 그림을 «필요할 때» 받는다 ────────────────────────────────
     loading="lazy" 는 여기서 듣지 않는다 — 지면이 전부 핀 안에 겹쳐 있어
     브라우저 눈에는 «전부 화면 안»이다. 그래서 직접 넣는다.
     ⚠️ 한참 앞서 받는다. 2차는 p>0.06 에서 시작하는데 책이 서는 것은 p≈0.30 이다 */
  var waved = {};
  function wave(n) {
    if (waved[n]) return;
    waved[n] = 1;
    var list = opening.querySelectorAll('img[data-wave="' + n + '"]');
    for (var i = 0; i < list.length; i++) {
      var im = list[i];
      /* ⚠️⚠️ 그림이 «도착하면» 다시 잰다.
         measure() 는 #composite 의 rect 로 봉투 앞판 사본(.lipmask)의 자리와
         크기를 정하는데, 지연 로딩을 끼운 탓에 그 그림이 오기 전에는 0×0 이다.
         그래서 첫 호출이 걸러지고 lipmask 가 «원본 1200px» 로 남아
         화면을 덮는다 — 봉투가 확 커졌다 작아지는 것으로 보인다.
         2026-09-14 에 실제로 그렇게 배포돼 있었다. 프로토타입에는 지연 로딩이
         없어 이 결함이 «생성물에만» 생긴다. 원본만 보면 못 잡는다 */
      /* ⚠️ 「아직 못 쟀을 때»만» 잰다. 2026-09-14 에 조건 없이 불렀더니
         폰에서 책 지면 그림이 늦게·띄엄띄엄 도착하면서 연출 막바지에 재는 일이
         생겼다. 그 시점에는 #composite 에 변형이 걸려 있어 값이 오염된다.
         measure() 안에서도 변형을 걷어내지만, 부를 이유가 없는 호출은 안 만든다 */
      im.addEventListener('load', function () { if (!measured) measure(); }, { once: true });
      im.src = im.getAttribute('data-src');
      im.removeAttribute('data-src');
    }
  }
  function waveAt(P) { if (P > 0.004) wave(1); if (P > 0.06) wave(2); }
  /* 정적 모드와 «이미 본» 상태에서는 스크롤이 없다. 바로 다 받는다 */
  if (currentView() === 'static' || root.hasAttribute('data-seen')) { wave(1); wave(2); }
  window.__wave = waveAt;
  waveAt(progressOf(opening));

  window.addEventListener('scroll', onScroll, { passive: true });
  /* ⚠️ HAND 의 tx/ty/k 는 절대 px 라 창 크기가 바뀌면 통째로 틀린다.
     예전에는 860px 경계를 «넘을 때»만 다시 지어서, 데스크톱 안에서 창을 줄이면
     낡은 값이 남아 표지가 100px 넘게 어긋났다. measure() 는 rect 를 네 번 읽을
     뿐이라 resize 마다 불러도 싸다 */
  window.addEventListener('resize', function () {
    /* 길이를 미디어쿼리로 줄이는 화면폭이 있다. 폭이 바뀌면 분할점도 바뀐다 —
       다시 읽지 않으면 좁은 화면에서 두 구간의 경계가 어긋난다 */
    readSplit(opening);
    if (window.__view !== 'static') measure();
    onScroll();
  }, { passive: true });
  /* 사진이 다 로드된 뒤 높이가 바뀌므로 다시 잰다 */
  window.addEventListener('load', function () { measure(); onScroll(); });

  /* 데스크톱↔모바일 경계를 «넘을 때»만 다시 짓는다 (끝 배율이 달라진다) */
  var mqW = window.matchMedia('(max-width:860px)');
  var rebuild = function () { if (window.__view !== 'static') apply(window.__view); };
  if (mqW.addEventListener) mqW.addEventListener('change', rebuild);
  else if (mqW.addListener) mqW.addListener(rebuild);

  /* 시스템 설정이 바뀌면 boot.js 가 data-motion 을 다시 적고 covert:motion 을 쏜다.
     여기서는 그 신호만 듣는다 — 판정이 두 군데 있으면 반드시 어긋난다 */

  /* 검수용 — _selftest.html 이 읽어가는 계측 훅.
     GSAP 판의 st.progress 를 대신한다.

     ⚠️ seek() 이 «반드시» 있어야 한다.
     rAF 가 얼면(창이 가려짐 · 프리뷰 패널 숨김 · 헤드리스 --virtual-time-budget)
     스크롤을 아무리 시켜도 cur 이 0 에 머물러 «멀쩡한 코드가 버그처럼» 보인다.
     그때 seek(p) 로 진행률을 직접 넣어 «값이 맞는지»와 «rAF 가 도는지»를 갈라 본다.
     단 seek 으로 그림이 맞았다고 「스크롤하면 열린다」를 증명한 것은 아니다 —
     그건 창을 «보이게» 두고 target 이 따라오는지로 따로 확인한다 */
  window.__opening = {
    progress: function () { return curO; },
    target:   function () { return tarO; },
    view:     function () { return window.__view; },
    out:      function () { return getComputedStyle(pass).getPropertyValue('--out').trim(); },
    seek:     function (p) { curO = tarO = clamp(p); render(curO, soft); return curO; },
    /* 넘김 구간 — 0 닫힘 → 1 경복궁 펼침면 */
    pages:    function () { return curP; },
    seekPages: function (p) { curP = tarP = clamp(p); renderPages(curP); return curP; },
    /* 합친 구간의 «원좌표» 하나로 두 타임라인을 동시에 못 박는다.
       스크롤을 실제로 내렸을 때와 같은 상태가 되므로 «정말 이어지는가»를 이걸로 본다 */
    seekAll: function (P) {
      P = clamp(P);
      var m = mapAt(P);
      curO = tarO = m.o;
      curP = tarP = m.p;
      render(curO, soft); renderPages(curP);
      return { P: P, opening: curO, pages: curP };
    },
    hand:     function () { return HAND; },
    leaves:   function () {
      return [0, 1, 2, 3, 4, 5].map(function (i) {
        return +(getComputedStyle(book).getPropertyValue('--t' + i).trim() || 0);
      });
    },
    /* rAF 가 실제로 도는지 — 두 프레임을 기다려 본다 */
    rafAlive: function () {
      return new Promise(function (res) {
        var t = setTimeout(function () { res(false); }, 500);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { clearTimeout(t); res(true); });
        });
      });
    }
  };
})();
