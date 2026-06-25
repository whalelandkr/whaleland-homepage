# Whale Land premium multipage website

## Structure
- `/ko/`, `/en/`, `/ja/`, `/zh-cn/`: language homepages
- `/{language}/services/{service}/`: dedicated introduction pages
- `/locales/*.json`: all text, links, and service data

## Upload
Upload every file and folder in this package to the root of the `whaleland-homepage` repository. Keep your existing `whaleland-logo.png` if desired; this package uses its own SVG brand mark and does not require it.

## External links
Edit these values in all four JSON files when needed:
- `services.korean-birth-type.externalUrl`
- `services.haedurio.externalUrl`
- `services.covert.externalUrl`

C.O.V.E.R.T is currently set to `https://covert.whalelandkr.com`. Connect that domain before publishing the external button.

## Local testing
JSON fetch can fail when opening HTML with `file://`. Test after GitHub Pages deployment or use a local HTTP server.
