/**
 * OPINIE KLIENTÓW - prawdziwe, z Booksy, każda z oceną 5 gwiazdek.
 *
 * Zasady (decyzja właściciela):
 * - treść zostaje taka, jak napisał klient - niczego nie wycinamy ani nie dopisujemy
 * - poprawiamy wyłącznie zapis: interpunkcję, wielkość liter, literówki; bez emotikonów
 * - najdłuższe opinie są ucięte na końcu znakiem „...”, żeby karty miały podobną wysokość;
 *   pełny tekst zostaje w polu `calosc`
 * - wpis z `przyklad: true` byłby treścią roboczą: dostaje etykietę „Przykład”
 *   i wyłącza indeksowanie całej strony (patrz README)
 *
 * `dlugie: true` = opinia trafia do rzędu z dłuższymi kartami (rzędy mają równą wysokość).
 */

export type Opinia = {
  tresc: string;
  /** Pełna treść opinii, jeśli `tresc` jest skrócona (kończy się „...”) - na razie nigdzie niewyświetlana */
  calosc?: string;
  /** Imię klienta - puste, jeśli nieznane */
  imie?: string;
  dlugie?: boolean;
  przyklad?: boolean;
};

/** Skąd pochodzą opinie - podpis na karcie */
export const zrodloOpinii = "Opinia z Booksy";

export const opinie: Opinia[] = [
  {
    imie: "Arek",
    tresc:
      "Wszystko wspaniale, jak za każdym razem. Piękny, czysty gabinet i ręce pana Kacpra, które leczą z zaangażowaniem i cudownymi skutkami, bez bólu. Profesjonalizm i wiedza pana Kacpra przewyższają wszelkie granice i oczekiwania. Do następnego razu. Polecam.",
    dlugie: true,
  },
  {
    // imię do uzupełnienia
    tresc:
      "Bardzo polecam! Pełen profesjonalizm i indywidualne podejście. Pan Kacper ma dużą wiedzę i potrafi spojrzeć na problem szerzej.",
  },
  {
    imie: "Anna",
    tresc:
      "Ogromna wiedza na temat powiązań między różnymi punktami na ciele. Pełne wsparcie, jeśli chodzi o profilaktykę i plan działania na kolejne wizyty i pracę nad ciałem pomiędzy nimi.",
  },
  {
    imie: "Anna",
    tresc: "Naprawdę czuję dużą różnicę po masażu, ból znacznie ustąpił i mogę normalnie funkcjonować.",
  },
  {
    imie: "Anna",
    tresc:
      "Profesjonalnie, skutecznie i w świetnej atmosferze - już po pierwszej wizycie duża ulga. Szczerze polecam.",
  },
  {
    imie: "Zofia",
    tresc:
      "Pan Kacper to „cudotwórca”. Najlepszy terapeuta. Córka od pół roku miała bóle w okolicach stawu skokowego. Wizyty u lekarzy, leki, RTG, rezonans, orteza i nic - ból coraz większy i częstszy, że ciężko było chodzić, nie mówiąc już o uprawianiu sportu. U pana Kacpra Łapińskiego wystarczyła jedna wizyta i ból praktycznie minął...",
    calosc:
      "Pan Kacper to „cudotwórca”. Najlepszy terapeuta. Córka od pół roku miała bóle w okolicach stawu skokowego. Wizyty u lekarzy, leki, RTG, rezonans, orteza i nic - ból coraz większy i częstszy, że ciężko było chodzić, nie mówiąc już o uprawianiu sportu. U pana Kacpra Łapińskiego wystarczyła jedna wizyta i ból praktycznie minął - niewiarygodne. Córka może bez problemu wrócić do treningów. Gorąco polecam. Aż trudno uwierzyć, że jeden specjalista może w tak krótkim czasie pomóc, a lekarze przez pół roku tylko zlecać kolejne badania.",
    dlugie: true,
  },
  {
    imie: "Michał",
    tresc:
      "Bardzo profesjonalny i wysoki poziom usług! Aku, rozmasowanie i dobre rady (m.in. ćwiczenia) przywróciły moje plecy do użytku po awarii. Gorąco polecam!",
  },
  {
    imie: "Łukasz",
    tresc: "Kacper to profesjonalista w swoim zawodzie. Super podejście i ogrom wiedzy. Polecam każdemu.",
  },
  {
    imie: "Kuba",
    tresc:
      "Trafiłem do Kacpra z polecenia, więc moja wizyta nie była przypadkowa. Od samego początku wykazał się profesjonalnym podejściem do mojego problemu, przeprowadzając merytoryczny wywiad odnośnie przebytych kontuzji, a potem masując odpowiednie partie. Już po pierwszym spotkaniu czuję się lepiej...",
    calosc:
      "Trafiłem do Kacpra z polecenia, więc moja wizyta nie była przypadkowa. Od samego początku wykazał się profesjonalnym podejściem do mojego problemu, przeprowadzając merytoryczny wywiad odnośnie przebytych kontuzji, a potem masując odpowiednie partie. Już po pierwszym spotkaniu czuję się lepiej i wiem, jak walczyć z moją dolegliwością. Serdecznie polecam.",
    dlugie: true,
  },
  {
    imie: "Kasia",
    tresc:
      "Kacper to bardzo profesjonalny terapeuta, przekazał mi podczas wizyty dużo wiedzy i ulżył w bólu. Pokazał metody pracy z ciałem, no i pouciskał tam, gdzie trzeba. Polecam serdecznie! Czuję się świetnie, dziękuję!",
    dlugie: true,
  },
  {
    imie: "Liwia",
    tresc:
      "Przyszłam do Kacpra z naprawdę sporą ilością problemów bólowych. Od kręgosłupa, przez szyję i żuchwę, po głowę. Mogę go opisać jednym słowem: cudotwórca. Wszystko dokładnie wyjaśnia, podchodzi całościowo do problemu i znajduje przyczynę. Za mną 3 wizyty, znacznie mniej bólu, już po pierwszej wizycie poczułam sporą różnicę...",
    calosc:
      "Przyszłam do Kacpra z naprawdę sporą ilością problemów bólowych. Od kręgosłupa, przez szyję i żuchwę, po głowę. Mogę go opisać jednym słowem: cudotwórca. Wszystko dokładnie wyjaśnia, podchodzi całościowo do problemu i znajduje przyczynę. Za mną 3 wizyty, znacznie mniej bólu, już po pierwszej wizycie poczułam sporą różnicę. Podsumowując: bardzo polecam, Kacper pomoże z naprawdę wszystkim!",
    dlugie: true,
  },
  {
    imie: "Damian",
    tresc:
      "Zgłosiłem się do pana Kacpra z bólem kolana oraz pleców w odcinku lędźwiowym. Ból powodował spory dyskomfort i ograniczenie w ruchomości. Był już na tyle dotkliwy, że zdecydowałem się na pomoc u naturoterapeuty. Polecam wszystkim pana Kacpra, zna się na swojej pracy. Miła i uprzejma osoba, wie, gdzie wbić „szpilę”.",
    dlugie: true,
  },
];
