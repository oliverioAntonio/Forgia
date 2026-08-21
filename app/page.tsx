import type { Metadata } from "next";

const galleryItems = [
  {
    title: "Cancelli e ringhiere",
    kind: "Ferro battuto su misura",
    description: "Linee classiche, disegni puliti e dettagli martellati a mano.",
  },
  {
    title: "Inferriate e protezioni",
    kind: "Sicurezza artigianale",
    description: "Strutture robuste pensate per durare, senza perdere eleganza.",
  },
  {
    title: "Scale e parapetti",
    kind: "Interni ed esterni",
    description: "Soluzioni solide, rifinite e proporzionate allo spazio.",
  },
  {
    title: "Elementi decorativi",
    kind: "Pezzi unici",
    description: "Rosoni, volute, insegne e dettagli che danno carattere.",
  },
];

const services = [
  "Cancelli carrabili e pedonali",
  "Ringhiere, parapetti e scale",
  "Inferriate di sicurezza",
  "Restauro e riparazioni",
  "Arredi e dettagli in ferro",
  "Progetti personalizzati",
];

export const metadata: Metadata = {
  title: "Arte del Ferro di Marco Marasco",
  description:
    "Vetrina scenica per lavorazioni artigianali in ferro battuto, cancelli, ringhiere, inferriate e pezzi su misura.",
};

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" aria-label="Arte del Ferro di Marco Marasco">
        <div className="hero__backdrop" />
        <nav className="nav" aria-label="Navigazione principale">
          <a className="brand" href="#top" aria-label="Arte del Ferro">
            <span className="brand__mark">AF</span>
            <span>
              Arte del Ferro
              <small>Marco Marasco</small>
            </span>
          </a>
          <div className="nav__links">
            <a href="#lavorazioni">Lavorazioni</a>
            <a href="#galleria">Galleria</a>
            <a href="#contatti">Contatti</a>
          </div>
        </nav>

        <div className="hero__content" id="top">
          <p className="eyebrow">Ferro battuto su misura</p>
          <h1>Arte del Ferro di Marco Marasco</h1>
          <p className="hero__copy">
            Forgiatura, riparazioni e opere in ferro create per case, cortili,
            locali e spazi che meritano un segno deciso.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#contatti">
              Richiedi un lavoro
            </a>
            <a className="button button--ghost" href="#galleria">
              Guarda i lavori
            </a>
          </div>
        </div>

        <aside className="hero__plate" aria-label="Sintesi officina">
          <span>Su misura</span>
          <strong>Cancelli, ringhiere, inferriate, restauri</strong>
        </aside>
      </section>

      <section className="intro band">
        <p className="intro__lead">
          Il ferro prende forma tra fuoco, misura e mano esperta.
        </p>
        <p>
          Ogni pezzo nasce dal contesto: proporzioni, sicurezza, stile della
          casa e finitura desiderata. La vetrina mette in primo piano il lavoro
          artigianale, poi crescera con foto reali, loghi e nuove schede lavori.
        </p>
      </section>

      <section className="work band" id="lavorazioni">
        <div className="section-heading">
          <p className="eyebrow">Lavorazioni</p>
          <h2>Ferro che protegge, arreda e resta.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <div className="service" key={service}>
              <span />
              <p>{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery band" id="galleria">
        <div className="section-heading">
          <p className="eyebrow">Galleria lavori</p>
          <h2>Una vetrina pronta per le foto reali.</h2>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <article className="gallery-card" key={item.title}>
              <div className={`gallery-card__image gallery-card__image--${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="gallery-card__body">
                <p>{item.kind}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process band" aria-label="Metodo di lavoro">
        <div>
          <p className="eyebrow">Metodo</p>
          <h2>Dal sopralluogo alla posa.</h2>
        </div>
        <ol>
          <li>
            <strong>Misura</strong>
            <span>Rilievo dello spazio, vincoli tecnici e idea estetica.</span>
          </li>
          <li>
            <strong>Disegno</strong>
            <span>Proposta proporzionata, materiale e finitura.</span>
          </li>
          <li>
            <strong>Forgia</strong>
            <span>Taglio, saldatura, martellatura e cura dei dettagli.</span>
          </li>
          <li>
            <strong>Posa</strong>
            <span>Montaggio pulito, controllo finale e consegna.</span>
          </li>
        </ol>
      </section>

      <section className="contact" id="contatti">
        <div>
          <p className="eyebrow">Contatti</p>
          <h2>Porta un'idea in officina.</h2>
          <p>
            Racconta il lavoro, manda misure e qualche foto dello spazio: la
            vetrina e pronta a diventare anche il punto di ingresso per richieste
            e preventivi.
          </p>
        </div>
        <a className="button button--primary" href="mailto:info@artedelferro.it">
          Scrivi per un preventivo
        </a>
      </section>
    </main>
  );
}
