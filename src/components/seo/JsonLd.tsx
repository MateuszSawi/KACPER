import { sesja } from "@/data/oferta";
import { site } from "@/data/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Dane pochodzą wyłącznie z naszych plików w src/data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const sameAs = [site.linki.booksy, site.linki.instagram, site.linki.facebook].filter(Boolean);

/** Uwaga: celowo HealthAndBeautyBusiness - NIE MedicalBusiness / Physiotherapy. Bez ocen i gwiazdek. */
export const businessLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${site.url}/#gabinet`,
  name: site.nazwa,
  url: site.url,
  telephone: site.kontakt.telefonHref,
  email: site.kontakt.emailHref,
  priceRange: `${sesja.cena} zł`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.adres.ulica,
    postalCode: site.adres.kod,
    addressLocality: site.adres.miasto,
    addressRegion: site.adres.region,
    addressCountry: site.adres.kraj,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.adres.geo.lat, longitude: site.adres.geo.lng },
  openingHoursSpecification: site.godziny.map((g) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: g.schema,
    opens: g.od,
    closes: g.do,
  })),
  areaServed: ["Rumia", "Reda", "Wejherowo", "Gdynia"].map((name) => ({ "@type": "City", name })),
  sameAs,
  founder: { "@id": `${site.url}/#terapeuta` },
};

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#terapeuta`,
  name: site.terapeuta,
  jobTitle: "Terapeuta manualny",
  worksFor: { "@id": `${site.url}/#gabinet` },
  url: site.url,
};
