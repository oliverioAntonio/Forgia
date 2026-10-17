import type { Metadata } from "next";
import { ShowcasePage } from "./showcase-page";
import {
  serviceAreas,
  shopEmail,
  shopPhone,
  content,
} from "./site-content";

export const metadata: Metadata = {
  title: "Arte del Ferro di Marco Marasco | Fabbro a Cutro (KR)",
  description:
    "Officina di ferro battuto a Cutro: cancelli, ringhiere, inferriate, scale e restauri forgiati a mano su misura.",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Arte del Ferro di Marco Marasco",
  description:
    "Officina artigianale di ferro battuto: cancelli, ringhiere, inferriate, scale e restauri su misura.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Nazionale 22",
    postalCode: "88842",
    addressLocality: "Cutro",
    addressRegion: "KR",
    addressCountry: "IT",
  },
  areaServed: serviceAreas.map((area) => ({ "@type": "City", name: area })),
  email: shopEmail,
  ...(shopPhone ? { telephone: shopPhone } : {}),
  makesOffer: content.it.services.items.map((item) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: item },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <ShowcasePage />
    </>
  );
}
