# Strona gabinetu terapii manualnej — Rumia

> ## ⚠️ Najpierw to: treści przykładowe i `noindex`
>
> Historie klientów i ocena w hero są na razie **zmyślone**
> i oznaczone w danych polem `przyklad: true`. Dopóki istnieje choć jeden taki wpis:
>
> - na stronie przy każdym z nich widać etykietę **„Przykład”**,
> - cała witryna dostaje `<meta name="robots" content="noindex, nofollow">`,
> - `npm run build` wypisuje w konsoli ostrzeżenie z listą plików.
>
> Żeby stronę opublikować i zaindeksować: wklej prawdziwe treści i ustaw `przyklad: false`
> (albo usuń pole) w `src/data/historie.ts` oraz w `src/data/site.ts`
> (`ocena`). Pokazywanie zmyślonych opinii jako prawdziwych jest nielegalne.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statyczna strona w folderze out/
npm run lint
```

Wymagany Node 20+.

## Stack

- **Next.js 16** (App Router) ze statycznym eksportem (`output: "export"`) — wynik to czysty HTML/CSS/JS w `out/`
- **SCSS Modules**; zmienne, funkcje i mixiny z `src/styles/abstracts` są dostępne w każdym pliku `.scss` bez importu
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** — ładowane dynamicznie po starcie strony, nie blokują renderowania
- Fonty **Fraunces** + **Inter** pobierane przy buildzie i serwowane z własnej domeny

## Gdzie co jest

| Co | Gdzie |
|---|---|
| Dane firmy (jedno źródło prawdy) | `src/data/site.ts` |
| Usługi, cena sesji, pakiety | `src/data/oferta.ts` |
| Strefy mapy ciała i ich opisy | `src/data/strefy.ts` |
| Opinie / historie / FAQ | `src/data/opinie.ts`, `historie.ts`, `faq.ts` |
| Sekcje strony głównej | `src/components/sections/` (kolejność w `src/app/page.tsx`) |
| Silnik animacji | `src/components/motion/Engine.tsx` |
| Kolory, typografia, przyciski | `src/styles/globals.scss` |

### Zdjęcia

Oryginały leżą w `public/images` i `public/images/test`. Strona ich nie ładuje bezpośrednio —
`npm run obrazy` generuje z nich lekkie wersje AVIF/WebP do `public/images/opt` i manifest
`src/data/obrazy.json`. Które zdjęcie trafia w które miejsce, ustawiasz w `scripts/obrazy.mjs`
(lista `zrodla`); po zmianie uruchom skrypt ponownie. Przed wdrożeniem przenieś oryginały poza
`public/`, bo inaczej trafią na serwer (ok. 25 MB).

### Filmy „przed / po”

Surowe nagrania (pion 9:16) wrzuć do `wideo-zrodla/` i uruchom `npm run wideo` (wymaga ffmpeg).
Skrypt tworzy w `public/video/` plik MP4 720×1280 bez dźwięku i klatkę-poster WebP.
Ścieżki wpisz w `src/data/historie.ts` → `wideo.przed` / `wideo.po` (`src`, `poster`).
Bez `src` na stronie jest placeholder.

### Animacje

Sekcje tylko oznaczają elementy atrybutami, resztę robi `Engine.tsx`:
`data-reveal`, `data-split`, `data-line`, `data-parallax`, `data-count`, `data-magnetic`.
Animowane są wyłącznie `transform` i `opacity`; `prefers-reduced-motion` wyłącza ruch.

### Analityka

Każdy link rezerwacji i telefonu ma `data-track` + `data-section` (nazwa sekcji).
Zdarzenia trafiają do Plausible (bez cookies, bez banera), jeśli w `site.ts` podasz
`analityka.plausibleDomena`. Puste pole = analityka wyłączona.

## Język — ograniczenie prawne

Terapeuta nie jest fizjoterapeutą. W treściach **nie używamy** słów: fizjoterapia, rehabilitacja,
leczenie, diagnoza, badanie, pacjent, nazw jednostek chorobowych, nastawiania/manipulacji, gwarancji efektu.
Wyjątek: uczciwa nota „nie jestem fizjoterapeutą, nie stawiam diagnoz” (sekcja „O terapeucie” i FAQ).

## Wdrożenie

Cloudflare Pages lub Netlify: polecenie build `npm run build`, katalog publikacji `out`.

## Do uzupełnienia przed publikacją

- [ ] `src/data/site.ts`: domena (`url`), współrzędne, godziny
- [ ] kwalifikacje i osiągnięcia sportowe
- [ ] dojazd: czasy dojazdu z Redy, Wejherowa i Gdyni
- [ ] formy płatności (`src/data/faq.ts`)
- [ ] adres strony ze wszystkimi opiniami (`linki.wszystkieOpinie` w `src/data/site.ts`) - bez niego przycisk „Zobacz wszystkie opinie” pod księgą nigdzie nie prowadzi
- [ ] pakiety w `src/data/oferta.ts`: potwierdzić ceny
- [ ] prawdziwe historie klientów i ocena (patrz ramka na górze)
- [ ] zdjęcia i wideo do hero — lista ujęć w `ZDJECIA.md`
- [ ] weryfikacja treści przez prawnika (m.in. samo określenie „terapia manualna”)
- [ ] w profilu Booksy są nazwy „Masaż leczniczy” i opis „diagnostyka” — warto je zmienić tak jak na stronie

## Status

Gotowa strona główna. Następny etap: podstrony usług i problemów, blog, polityka prywatności, 404,
`sitemap.xml`, `robots.txt`, obraz Open Graph.

## Poradniki (blog) i Pages CMS

- Wpisy: pliki Markdown w `content/poradniki/` (nazwa pliku = adres `/poradniki/<nazwa>/`). Pola i panel opisuje `.pages.yml`; instrukcja dla autora: `BLOG-INSTRUKCJA.md`.
- Wczytywanie i walidacja: `src/lib/poradniki.ts`. Wpis z `draft: true` (albo bez pola `draft`) nie trafia na stronę, do `sitemap.xml` ani do `/poradniki/rss.xml`. Brakujące pola dają ostrzeżenie w buildzie, nie błąd.
- Lista kategorii jest w dwóch miejscach i musi się zgadzać: `.pages.yml` (pole `category`) oraz `KATEGORIE` w `src/lib/poradniki.ts`.
- Zdjęcia: CMS wgrywa je do `public/images/blog/`. Przed każdym `npm run dev` i `npm run build` skrypt `scripts/obrazy-blog.mjs` robi z nich wersje AVIF/WebP (480-1600 px) w `public/images/opt/blog/` - ten katalog i `src/data/obrazy-blog.json` nie są commitowane.
- Po buildzie `scripts/po-buildzie.mjs` kopiuje pliki wstępnego ładowania podstron pod nazwy, o które prosi przeglądarka (inaczej zwykły hosting plików zwraca dla nich 404).
- Publikacja z panelu = commit w repozytorium. Hosting musi sam przebudowywać stronę po każdym commicie (`npm run build`, katalog `out`).
