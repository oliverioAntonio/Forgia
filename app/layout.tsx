import type { Metadata } from "next";
import "./globals.css";
import { asset, basePath, siteUrl } from "./site-config";

// NB: in questo setup (vinext + Vite) `next/font` non emette alcun @font-face,
// quindi i font vengono caricati esplicitamente nel <head>.
const fontsHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600;700&display=swap";

// Abilita le animazioni d'ingresso solo se il JS gira: senza, tutto resta
// visibile. Eseguito prima del primo paint per evitare lampi.
const enhanceScript = "document.documentElement.classList.add('js')";

export function generateMetadata(): Metadata {
  const baseUrl = siteUrl;
  const title = "Arte del Ferro di Marco Marasco | Fabbro a Cutro (KR)";
  const description =
    "Officina di ferro battuto a Cutro: cancelli, ringhiere, inferriate, scale e restauri forgiati a mano su misura. Sopralluoghi e preventivi in provincia di Crotone.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      "fabbro Cutro",
      "ferro battuto Crotone",
      "cancelli in ferro battuto",
      "ringhiere su misura",
      "inferriate di sicurezza",
      "officina ferro Calabria",
    ],
    alternates: {
      canonical: basePath || "/",
    },
    icons: {
      icon: asset("/favicon.svg"),
      shortcut: asset("/favicon.svg"),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "it_IT",
      siteName: "Arte del Ferro di Marco Marasco",
      images: [
        {
          url: `${baseUrl}${asset("/og.png")}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${asset("/og.png")}`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: enhanceScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
