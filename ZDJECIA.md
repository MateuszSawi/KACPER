# Lista ujęć dla fotografa

Styl: ciemno, spokojnie, naturalne boczne światło (okno), ciepła temperatura, płytka głębia ostrości.
Paleta zdjęć ma pasować do ciemnej zieleni strony — bez jaskrawych kolorów w kadrze, bez białych
sterylnych ścian, bez pozowanych uśmiechów. Pliki źródłowe min. 3000 px po dłuższym boku.

## Niezbędne (są na nie miejsca na stronie głównej)

| # | Ujęcie | Kadr | Proporcje | Gdzie na stronie |
|---|---|---|---|---|
| 1 | **Wideo do hero**: dłonie przy pracy | zbliżenie, ciepłe boczne światło, powolny ruch, pętla 8–12 s, bez dźwięku | 16:9 (poziom) + wersja pionowa 9:16 | tło hero |
| 2 | Poster do wideo | jedna klatka z wideo nr 1 | jak wideo | hero, zanim wideo się załaduje |
| 3 | Dłonie terapeuty na plecach klienta | zbliżenie z boku, miękkie światło, płytka głębia | 4:5 (pion) | „Jak wygląda sesja” |
| 4 | Portret terapeuty | półpostać, spokojne spojrzenie w obiektyw, ciemne tło, światło z jednej strony | 3:4 (pion) | „O terapeucie” |
| 5 | Terapeuta na pomoście / ze sztangą | szeroki plan z zawodów lub treningu, kreda na dłoniach, kontrastowe światło | 4:3 (poziom) | „O terapeucie” (mniejsze zdjęcie) |
| 6–11 | **Filmy** zakresu ruchu przed i po — 3 pary | opis poniżej | 9:16 (pion, jak rolka) | „Historie klientów” — dwa filmy obok siebie |

### Filmy „przed / po” (6 nagrań)

- telefon **na statywie, pionowo**, w obu nagraniach w tym samym miejscu; klient na oznaczonym punkcie podłogi
- to samo tło, światło i ubranie; cała sylwetka lub cały ruch w kadrze
- ruch **tam i z powrotem**: pozycja wyjściowa → pełny zakres → powrót (pętla nie „skacze”)
- **4–6 sekund**, to samo tempo przed i po; dźwięk nieistotny (zostanie usunięty)
- ruchy: skłon w przód (z boku), rotacja głowy (z przodu lub z góry), uniesienie ramienia (z boku)
- nazwy plików: `historia-1-przed`, `historia-1-po`, `historia-2-przed` … → folder `wideo-zrodla/`, potem `npm run wideo`

Nagrania wymagają pisemnej zgody klientów na publikację wizerunku.

## Na podstrony (etap 2)

- wnętrze gabinetu — szeroki plan, stół, światło z okna
- detale: złożone ręczniki, olejek, fragment stołu, roślina, klamka/wejście
- wejście do budynku i parking (do sekcji „Dojazd”)
- praca z karkiem, barkiem, lędźwiami, przedramieniem, łydką — po jednym zbliżeniu na każdą strefę
- terapeuta podczas rozmowy z klientem (klient tyłem lub nieostry)
- zdjęcie do Open Graph: 1200 × 630 px, nazwa gabinetu czytelna w miniaturze

## Jak podmienić placeholder

W komponencie sekcji zamień `<Photo temat="…" kadr="…" />` na `<Image>` z `next/image`:
plik w `public/images/` w formacie AVIF lub WebP, podane `width` i `height`, sensowny `alt`.
Wideo hero: ścieżki wpisz w `src/data/site.ts` → `hero.wideo` i `hero.poster`.
