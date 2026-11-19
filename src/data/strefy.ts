import type { UslugaId } from "./oferta";

export type StrefaId =
  | "glowa"
  | "kark"
  | "barki"
  | "lopatki"
  | "ledzwia"
  | "biodra"
  | "przedramiona"
  | "nogi";

export type Strefa = {
  id: StrefaId;
  nazwa: string;
  /** Na której sylwetce strefa jest zaznaczona */
  widok: "przod" | "tyl";
  /** Dwa zdania językiem klienta: co zwykle za tym stoi */
  opis: string;
  usluga: UslugaId;
};

export const strefy: Strefa[] = [
  {
    id: "glowa",
    nazwa: "Głowa",
    widok: "przod",
    opis: "Ucisk w skroniach czy uczucie obręczy wokół głowy pod koniec dnia często zaczyna się niżej - w napiętym karku, barkach i szczęce. Im dłużej patrzysz w ekran, tym mocniej to czuć.",
    usluga: "kark",
  },
  {
    id: "kark",
    nazwa: "Kark",
    widok: "tyl",
    opis: "Sztywność przy obracaniu głowy, najgorsza rano albo po całym dniu pracy. Zwykle to efekt godzin spędzonych z głową wysuniętą do przodu lub pochyloną w dół.",
    usluga: "kark",
  },
  {
    id: "barki",
    nazwa: "Barki",
    widok: "przod",
    opis: "Barki podciągnięte pod uszy, twarde jak kamień i bolesne przy próbie uniesienia rąk. Tak ciało kumuluje stres, pracę przy biurku i wysiłek fizyczny.",
    usluga: "tkanki-glebokie",
  },
  {
    id: "lopatki",
    nazwa: "Między łopatkami",
    widok: "tyl",
    opis: "Tępe, piekące napięcie, którego nie da się samemu rozmasować ani rozciągnąć. Typowe dla osób, które godzinami siedzą z zaokrąglonymi plecami.",
    usluga: "plecy",
  },
  {
    id: "ledzwia",
    nazwa: "Lędźwia",
    widok: "tyl",
    opis: "Po pracy fizycznej albo dwóch godzinach w aucie i na krześle trudno się wyprostować, a pierwsze kroki są sztywne. Napięcie w odcinku lędźwiowym rzadko jest tylko „sprawą pleców” - często trzymają też biodra.",
    usluga: "leczniczy",
  },
  {
    id: "biodra",
    nazwa: "Biodra i pośladki",
    widok: "tyl",
    opis: "Ciągnięcie w pośladku, sztywne biodra po wstaniu z fotela, dyskomfort przy dłuższym siedzeniu. Nadmierne przeciążenia skracają i usztywniają tkanki, które powinny być sprężyste.",
    usluga: "powieziowy",
  },
  {
    id: "przedramiona",
    nazwa: "Przedramiona",
    widok: "przod",
    opis: "Zmęczone łokcie, twarde przedramiona i napięte dłonie po dniu z myszką, telefonem albo sztangą. Drobne mięśnie pracują godzinami bez przerwy i w końcu przestają odpuszczać.",
    usluga: "powieziowy",
  },
  {
    id: "nogi",
    nazwa: "Nogi",
    widok: "przod",
    opis: "Ból kolan, ciężkie uda i łydki, które sztywnieją po dniu na stojąco. Tkanki potrzebują pracy, której samo rolowanie nie zastąpi.",
    usluga: "sportowy",
  },
];
