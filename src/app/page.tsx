import { BodyMap } from "@/components/sections/BodyMap";
import { Dlaczego } from "@/components/sections/Dlaczego";
import { Dojazd } from "@/components/sections/Dojazd";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Historie } from "@/components/sections/Historie";
import { OMnie } from "@/components/sections/OMnie";
import { Oferta } from "@/components/sections/Oferta";
import { Opinie } from "@/components/sections/Opinie";
import { Poradniki } from "@/components/sections/Poradniki";
import { Problemy } from "@/components/sections/Problemy";
import { Sesja } from "@/components/sections/Sesja";
import { Voucher } from "@/components/sections/Voucher";
import { ZnaszTo } from "@/components/sections/ZnaszTo";

// Kolejność sekcji = ścieżka sprzedaży
export default function Home() {
  return (
    <>
      <Hero />
      <ZnaszTo />
      <Problemy />
      <BodyMap />
      <OMnie />
      <Sesja />
      <Historie />
      <Dlaczego />
      <Opinie />
      <Oferta />
      <Voucher />
      <Faq />
      <Dojazd />
      <Poradniki />
      <FinalCta />
    </>
  );
}
