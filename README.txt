WHALE LAND 다국어 홈페이지 적용 안내
=====================================

1. 이 폴더의 파일과 폴더를 whaleland-homepage 저장소 루트에 업로드합니다.

2. 기존 저장소의 아래 파일은 유지하거나 교체합니다.
   - CNAME: 이 패키지의 CNAME으로 교체 가능
   - whaleland-logo.png: 기존 파일을 반드시 루트에 그대로 둡니다.

3. 최종 구조:
   CNAME
   index.html
   styles.css
   app.js
   whaleland-logo.png
   locales/
     ko.json
     en.json
     ja.json
     zh-cn.json
   ko/index.html
   en/index.html
   ja/index.html
   zh-cn/index.html

4. C.O.V.E.R.T가 배포되면 각 locales/*.json에서 아래 값을 수정합니다.
   "enabled": false  →  "enabled": true

5. JSON 수정 시 주의:
   - 큰따옴표(")를 지우지 않습니다.
   - 항목 끝의 쉼표 위치를 임의로 바꾸지 않습니다.
   - 저장 인코딩은 UTF-8을 사용합니다.

6. 로컬에서 HTML을 더블클릭하면 브라우저 보안 정책 때문에 JSON fetch가 차단될 수 있습니다.
   GitHub Pages에 업로드한 뒤 테스트하거나 VS Code Live Server를 사용하세요.
