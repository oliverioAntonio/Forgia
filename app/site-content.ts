export const shopAddress = "Via Nazionale n. 22, 88842 Cutro (KR)";
export const mapsQuery = "Via%20Nazionale%2022%2C%2088842%20Cutro";

// Compila questi campi quando hai i recapiti definitivi: se restano vuoti,
// i relativi pulsanti (telefono, WhatsApp) non vengono mostrati.
export const shopPhone: string = ""; // es. "+39 333 1234567"
export const shopWhatsApp: string = ""; // solo cifre, es. "393331234567"
export const shopEmail = "info@artedelferro.it";
export const shopVat: string = ""; // es. "P. IVA 01234567890"

export const serviceAreas = [
  "Cutro",
  "Crotone",
  "Isola Capo Rizzuto",
  "Santa Severina",
  "Rocca di Neto",
  "Marchesato",
];

export type GalleryArt = "gate" | "railing" | "grille" | "scroll";
export type ServiceIconName =
  | "gate"
  | "rail"
  | "grille"
  | "restore"
  | "furniture"
  | "custom";

// Stesso ordine di `services.items` in ogni lingua.
export const serviceIcons: ServiceIconName[] = [
  "gate",
  "rail",
  "grille",
  "restore",
  "furniture",
  "custom",
];

// Valori numerici delle statistiche in `intro.stats` (stesso ordine).
// Il terzo e calcolato: segue sempre l'elenco delle zone servite.
export const statValues = [100, 4, serviceAreas.length];

export const content = {
  it: {
    lang: "it",
    nav: {
      work: "Lavorazioni",
      gallery: "Galleria",
      process: "Metodo",
      location: "Officina",
      contact: "Contatti",
    },
    hero: {
      eyebrow: "Officina di ferro battuto · Cutro (KR)",
      titleLead: "Cancelli, ringhiere e opere in ferro",
      titleAccent: "forgiate a mano",
      copy:
        "Forgiatura, restauro e realizzazioni su misura per case, cortili, locali e spazi che meritano un segno deciso.",
      primary: "Richiedi un preventivo",
      secondary: "Guarda i lavori",
      location: "Dove siamo",
      plateLabel: "Su misura",
      plateText: "Cancelli · Ringhiere · Inferriate · Restauri",
      badge: "Forgiato a mano · Su misura · Cutro · ",
      scroll: "Scorri",
    },
    intro: {
      eyebrow: "L'officina",
      lead: "Il ferro prende forma tra fuoco, misura e mano esperta.",
      body:
        "Ogni pezzo nasce dal suo contesto: proporzioni, sicurezza, stile della casa e finitura desiderata. Si parte dal sopralluogo, si disegna la soluzione giusta e si forgia in officina, pezzo per pezzo.",
      body2:
        "Niente semilavorati di serie montati in fretta: taglio, saldatura, martellatura e finitura si fanno qui, e il risultato è pensato per durare decenni all'aperto.",
      caption: "Officina · Cutro (KR)",
      stats: [
        { suffix: "%", label: "Forgiato in officina" },
        { suffix: "", label: "Fasi, dal rilievo alla posa" },
        { suffix: "", label: "Comuni serviti" },
      ],
    },
    services: {
      eyebrow: "Lavorazioni",
      title: "Ferro che protegge, arreda e resta.",
      items: [
        "Cancelli carrabili e pedonali",
        "Ringhiere, parapetti e scale",
        "Inferriate di sicurezza",
        "Restauro e riparazioni",
        "Arredi e dettagli in ferro",
        "Progetti personalizzati",
      ],
    },
    gallery: {
      eyebrow: "Galleria lavori",
      title: "Il segno della forgia, pezzo per pezzo.",
      note: "Disegni tecnici delle lavorazioni tipiche dell'officina.",
      figure: "Tav.",
      aria: "Scegli una lavorazione",
      items: [
        {
          title: "Cancelli e ringhiere",
          kind: "Ferro battuto su misura",
          description:
            "Linee classiche, disegni puliti e dettagli martellati a mano.",
          art: "gate" as GalleryArt,
        },
        {
          title: "Inferriate e protezioni",
          kind: "Sicurezza artigianale",
          description:
            "Strutture robuste pensate per durare, senza perdere eleganza.",
          art: "grille" as GalleryArt,
        },
        {
          title: "Scale e parapetti",
          kind: "Interni ed esterni",
          description: "Soluzioni solide, rifinite e proporzionate allo spazio.",
          art: "railing" as GalleryArt,
        },
        {
          title: "Elementi decorativi",
          kind: "Pezzi unici",
          description: "Rosoni, volute, insegne e dettagli che danno carattere.",
          art: "scroll" as GalleryArt,
        },
      ],
    },
    process: {
      eyebrow: "Metodo",
      title: "Dal sopralluogo alla posa.",
      aria: "Metodo di lavoro",
      steps: [
        ["Misura", "Rilievo dello spazio, vincoli tecnici e idea estetica."],
        ["Disegno", "Proposta proporzionata, materiale e finitura."],
        ["Forgia", "Taglio, saldatura, martellatura e cura dei dettagli."],
        ["Posa", "Montaggio pulito, controllo finale e consegna."],
      ],
    },
    location: {
      eyebrow: "Officina",
      title: "Ci trovi a Cutro.",
      body:
        "Vieni in officina per misure, sopralluoghi e richieste su misura, oppure chiedi un sopralluogo a casa tua.",
      areasLabel: "Zone servite",
      mapButton: "Apri su Google Maps",
      mapTitle: "Mappa Arte del Ferro",
    },
    contact: {
      eyebrow: "Contatti",
      title: "Porta un'idea in officina.",
      body:
        "Racconta il lavoro, manda le misure e qualche foto dello spazio: ti rispondiamo con una proposta e un preventivo.",
      button: "Scrivi per un preventivo",
      callButton: "Chiama ora",
      whatsappButton: "Scrivi su WhatsApp",
      mailSubject: "Richiesta preventivo",
      form: {
        name: "Il tuo nome",
        type: "Tipo di lavoro",
        other: "Altro",
        message: "Racconta il lavoro",
        placeholder: "Misure, zona, stile che hai in mente…",
        send: "Invia la richiesta",
        hint: "Si apre la tua email già compilata: allega pure le foto.",
        bodyName: "Nome",
        bodyType: "Lavoro",
      },
    },
    footer: {
      tagline:
        "Ferro battuto e lavorazioni artigianali dal cuore del Marchesato.",
      rights: "Tutti i diritti riservati.",
      nav: "Naviga",
      contacts: "Contatti",
      areas: "Zone servite",
    },
  },
  en: {
    lang: "en",
    nav: {
      work: "Craft",
      gallery: "Gallery",
      process: "Method",
      location: "Workshop",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Wrought iron workshop · Cutro, Italy",
      titleLead: "Gates, railings and ironwork",
      titleAccent: "forged by hand",
      copy:
        "Forging, restoration and bespoke ironwork for homes, courtyards, venues and spaces that deserve a decisive mark.",
      primary: "Request a quote",
      secondary: "View the work",
      location: "Find us",
      plateLabel: "Bespoke",
      plateText: "Gates · Railings · Grilles · Restorations",
      badge: "Hand forged · Bespoke · Cutro · ",
      scroll: "Scroll",
    },
    intro: {
      eyebrow: "The workshop",
      lead: "Iron takes shape through fire, measure and a skilled hand.",
      body:
        "Every piece starts from its setting: proportions, safety, the style of the building and the desired finish. We survey the space, draw the right solution and forge it in the workshop, piece by piece.",
      body2:
        "No off-the-shelf parts bolted together in a hurry: cutting, welding, hammering and finishing all happen here, and the result is built to last outdoors for decades.",
      caption: "Workshop · Cutro, Italy",
      stats: [
        { suffix: "%", label: "Forged in the workshop" },
        { suffix: "", label: "Stages, from survey to fitting" },
        { suffix: "", label: "Towns served" },
      ],
    },
    services: {
      eyebrow: "Craft",
      title: "Ironwork that protects, furnishes and lasts.",
      items: [
        "Driveway and pedestrian gates",
        "Railings, parapets and stairs",
        "Security grilles",
        "Restoration and repairs",
        "Iron furniture and details",
        "Custom projects",
      ],
    },
    gallery: {
      eyebrow: "Project gallery",
      title: "The mark of the forge, piece by piece.",
      note: "Technical drawings of the workshop's typical work.",
      figure: "Plate",
      aria: "Choose a type of work",
      items: [
        {
          title: "Gates and railings",
          kind: "Bespoke wrought iron",
          description:
            "Classic lines, clean drawings and hand-hammered details.",
          art: "gate" as GalleryArt,
        },
        {
          title: "Security grilles",
          kind: "Artisanal protection",
          description:
            "Strong structures built to last without losing elegance.",
          art: "grille" as GalleryArt,
        },
        {
          title: "Stairs and parapets",
          kind: "Interior and exterior",
          description: "Solid, refined solutions scaled to the space.",
          art: "railing" as GalleryArt,
        },
        {
          title: "Decorative pieces",
          kind: "One-off work",
          description:
            "Rosettes, scrolls, signs and details that give character.",
          art: "scroll" as GalleryArt,
        },
      ],
    },
    process: {
      eyebrow: "Method",
      title: "From survey to installation.",
      aria: "Work method",
      steps: [
        ["Measure", "Survey of the space, technical limits and visual intent."],
        ["Design", "A balanced proposal for material, form and finish."],
        ["Forge", "Cutting, welding, hammering and careful detailing."],
        ["Install", "Clean fitting, final checks and delivery."],
      ],
    },
    location: {
      eyebrow: "Workshop",
      title: "Find us in Cutro.",
      body:
        "Come to the workshop for measurements, site visits and bespoke requests, or ask for a survey at your place.",
      areasLabel: "Areas served",
      mapButton: "Open in Google Maps",
      mapTitle: "Arte del Ferro map",
    },
    contact: {
      eyebrow: "Contact",
      title: "Bring an idea to the workshop.",
      body:
        "Describe the project, send measurements and a few photos of the space: we will reply with a proposal and a quote.",
      button: "Request a quote",
      callButton: "Call now",
      whatsappButton: "Message on WhatsApp",
      mailSubject: "Quote request",
      form: {
        name: "Your name",
        type: "Type of work",
        other: "Other",
        message: "Describe the project",
        placeholder: "Measurements, location, the style you have in mind…",
        send: "Send the request",
        hint: "Your email app opens pre-filled: feel free to attach photos.",
        bodyName: "Name",
        bodyType: "Work",
      },
    },
    footer: {
      tagline:
        "Wrought iron and artisanal metalwork from the heart of Calabria.",
      rights: "All rights reserved.",
      nav: "Navigate",
      contacts: "Contact",
      areas: "Areas served",
    },
  },
} as const;

export type SiteContent = (typeof content)[keyof typeof content];
export type Language = keyof typeof content;
export type Theme = "dark" | "light";
