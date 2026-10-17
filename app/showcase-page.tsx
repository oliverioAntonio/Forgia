"use client";

import {
  type CSSProperties,
  type FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { Counter, Embers, useActiveSection, useSiteEffects } from "./effects";
import { GalleryArtwork, ServiceIcon } from "./gallery-art";
import type { Language, SiteContent, Theme } from "./site-content";
import {
  content as siteContent,
  mapsQuery,
  serviceAreas,
  serviceIcons,
  shopAddress,
  shopEmail,
  shopPhone,
  shopVat,
  shopWhatsApp,
  statValues,
} from "./site-content";

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: "it", label: "IT" },
  { value: "en", label: "EN" },
];

const themeOptions: Array<{ value: Theme; label: { it: string; en: string } }> = [
  { value: "dark", label: { it: "Scuro", en: "Dark" } },
  { value: "light", label: { it: "Chiaro", en: "Light" } },
];

/** Ritardo d'ingresso in ms, letto dal CSS come --d. */
function delay(ms: number): CSSProperties {
  return { "--d": ms } as CSSProperties;
}

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ShowcasePage() {
  const [language, setLanguage] = useState<Language>("it");
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArt, setActiveArt] = useState(0);
  const [artPinned, setArtPinned] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const content: SiteContent = siteContent[language];

  const mailHref = `mailto:${shopEmail}?subject=${encodeURIComponent(
    content.contact.mailSubject,
  )}`;
  const sections = [
    { id: "lavorazioni", href: "#lavorazioni", label: content.nav.work },
    { id: "galleria", href: "#galleria", label: content.nav.gallery },
    { id: "metodo", href: "#metodo", label: content.nav.process },
    { id: "officina", href: "#officina", label: content.nav.location },
    { id: "contatti", href: "#contatti", label: content.nav.contact },
  ];
  const activeSection = useActiveSection(sections.map((section) => section.id));

  useSiteEffects(shellRef);

  useEffect(() => {
    // localStorage e leggibile solo dopo l'idratazione: applicare qui le
    // preferenze salvate e voluto, non e un effetto a cascata da evitare.
    /* eslint-disable react-hooks/set-state-in-effect */
    const savedLanguage = window.localStorage.getItem("arte-del-ferro-language");
    const savedTheme = window.localStorage.getItem("arte-del-ferro-theme");

    if (savedLanguage === "it" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function chooseLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("arte-del-ferro-language", nextLanguage);
  }

  function chooseTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("arte-del-ferro-theme", nextTheme);
  }

  function pickArt(index: number) {
    setActiveArt(index);
    setArtPinned(true);
  }

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = content.contact.form;
    const body = [
      `${form.bodyName}: ${data.get("name") ?? ""}`,
      `${form.bodyType}: ${data.get("type") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${shopEmail}?subject=${encodeURIComponent(
      content.contact.mailSubject,
    )}&body=${encodeURIComponent(body)}`;
  }

  function renderControls(className: string) {
    return (
      <div className={className}>
        <div
          className="choice-group"
          aria-label={language === "it" ? "Lingua" : "Language"}
        >
          {languageOptions.map((option) => (
            <button
              aria-pressed={option.value === language}
              className={
                option.value === language ? "choice choice--active" : "choice"
              }
              key={option.value}
              onClick={() => chooseLanguage(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <div
          className="choice-group"
          aria-label={language === "it" ? "Tema" : "Theme"}
        >
          {themeOptions.map((option) => (
            <button
              aria-pressed={option.value === theme}
              className={
                option.value === theme ? "choice choice--active" : "choice"
              }
              key={option.value}
              onClick={() => chooseTheme(option.value)}
              type="button"
            >
              {option.label[language]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const titleWords = content.hero.titleLead.split(" ");
  const accentWords = content.hero.titleAccent.split(" ");
  const art = content.gallery.items[activeArt];
  const marqueeItems = [...content.services.items, ...content.services.items];

  return (
    <div
      className={`site-shell site-shell--${theme}`}
      ref={shellRef}
      style={{ "--progress": 0 } as CSSProperties}
    >
      <header className={scrolled ? "site-header site-header--stuck" : "site-header"}>
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label="Arte del Ferro">
            <img
              className="brand__logo"
              src="/logo-arte-del-ferro-horizontal.png"
              alt="L'arte del Ferro"
              width={216}
              height={72}
            />
            <span className="brand__name">Marco Marasco</span>
          </a>

          <nav
            className="nav__links"
            aria-label={
              language === "it" ? "Navigazione principale" : "Main navigation"
            }
          >
            {sections.map((section) => (
              <a
                aria-current={activeSection === section.id ? "true" : undefined}
                href={section.href}
                key={section.href}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            {renderControls("nav__controls")}
            <a className="button button--primary button--sm" href="#contatti">
              {content.hero.primary}
            </a>
            <button
              aria-expanded={menuOpen}
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <span aria-hidden="true" />
              {menuOpen ? (language === "it" ? "Chiudi" : "Close") : "Menu"}
            </button>
          </div>
        </div>
        <span className="site-header__progress" aria-hidden="true" />
      </header>

      {menuOpen ? (
        <div className="mobile-menu">
          <nav aria-label="Menu">
            {sections.map((section) => (
              <a
                href={section.href}
                key={section.href}
                onClick={() => setMenuOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </nav>
          {renderControls("mobile-menu__controls")}
        </div>
      ) : null}

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section
          className="hero spot"
          id="top"
          aria-label="Arte del Ferro di Marco Marasco"
        >
          <div className="hero__backdrop" aria-hidden="true" />
          <div className="hero__torch" aria-hidden="true" />
          <Embers className="hero__embers" />
          <div className="hero__grain" aria-hidden="true" />

          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">{content.hero.eyebrow}</p>
            <h1>
              <span className="hero__lead">
                {titleWords.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <span className="word">
                      <span style={{ "--w": index } as CSSProperties}>{word}</span>
                    </span>{" "}
                  </Fragment>
                ))}
              </span>
              <span className="hero__accent">
                {accentWords.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <span className="word">
                      <span
                        style={{ "--w": titleWords.length + index } as CSSProperties}
                      >
                        {word}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))}
              </span>
            </h1>
            <p className="hero__copy">{content.hero.copy}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#contatti">
                {content.hero.primary}
              </a>
              <a className="button button--ghost" href="#galleria">
                {content.hero.secondary}
              </a>
            </div>
          </div>

          <div className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="hero__badge-ring">
              <defs>
                <path
                  id="badge-circle"
                  d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="500">
                  {content.hero.badge.repeat(2)}
                </textPath>
              </text>
            </svg>
            <img src="/logo-arte-del-ferro-square.png" alt="" width={120} height={120} />
          </div>

          <div className="hero__foot">
            <aside className="hero__plate" aria-label={content.hero.plateLabel}>
              <span>{content.hero.plateLabel}</span>
              <strong>{content.hero.plateText}</strong>
            </aside>
            <p className="hero__scroll" aria-hidden="true">
              {content.hero.scroll}
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {marqueeItems.map((item, index) => (
              <span className="marquee__item" key={`${item}-${index}`}>
                {item}
                <i />
              </span>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------- intro */}
        <section className="intro band" aria-label={content.intro.eyebrow}>
          <div className="intro__text">
            <p className="eyebrow" data-reveal>
              {content.intro.eyebrow}
            </p>
            <p className="intro__lead" data-reveal style={delay(80)}>
              {content.intro.lead}
            </p>
            <p data-reveal style={delay(160)}>
              {content.intro.body}
            </p>
            <p data-reveal style={delay(240)}>
              {content.intro.body2}
            </p>
          </div>
          <figure className="intro__media" data-reveal style={delay(120)}>
            <div className="intro__frame">
              <img
                data-parallax="0.07"
                src="/forge-hero.png"
                alt={
                  language === "it"
                    ? "Lavorazione del ferro incandescente in officina"
                    : "Glowing iron being worked in the workshop"
                }
                loading="lazy"
              />
              <figcaption>
                <img
                  src="/logo-arte-del-ferro-square.png"
                  alt=""
                  width={120}
                  height={120}
                />
                <span>{content.intro.caption}</span>
              </figcaption>
            </div>
          </figure>

          <dl className="stats">
            {content.intro.stats.map((stat, index) => (
              <div
                className="stats__item"
                data-reveal
                key={stat.label}
                style={delay(index * 110)}
              >
                <dt>
                  <Counter value={statValues[index]} />
                  <small>{stat.suffix}</small>
                </dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------- lavorazioni */}
        <section className="work band" id="lavorazioni">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{content.services.eyebrow}</p>
            <h2>{content.services.title}</h2>
          </div>
          <div className="service-grid">
            {content.services.items.map((service, index) => (
              <div
                className="service spot"
                data-reveal
                key={service}
                style={delay((index % 3) * 90)}
              >
                <div className="service__top">
                  <span className="service__num">{pad(index)}</span>
                  <ServiceIcon name={serviceIcons[index]} />
                </div>
                <p>{service}</p>
                <span className="service__rule" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- galleria */}
        <section className="gallery band" id="galleria">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{content.gallery.eyebrow}</p>
            <h2>{content.gallery.title}</h2>
            <p className="section-heading__note">{content.gallery.note}</p>
          </div>

          <div className="showcase" data-reveal style={delay(100)}>
            <div className="stage spot" aria-live="polite">
              <span className="stage__corner stage__corner--tl" aria-hidden="true" />
              <span className="stage__corner stage__corner--tr" aria-hidden="true" />
              <span className="stage__corner stage__corner--bl" aria-hidden="true" />
              <span className="stage__corner stage__corner--br" aria-hidden="true" />
              <p className="stage__label">
                {content.gallery.figure} {pad(activeArt)} / {pad(content.gallery.items.length - 1)}
              </p>
              <div className="stage__glow" aria-hidden="true" />
              <GalleryArtwork art={art.art} key={`${language}-${art.art}`} />
              <p className="stage__caption">
                <span>{art.kind}</span>
                <strong>{art.title}</strong>
              </p>
            </div>

            <div
              className="showcase__list"
              role="group"
              aria-label={content.gallery.aria}
            >
              {content.gallery.items.map((item, index) => {
                const active = index === activeArt;
                return (
                  <button
                    aria-pressed={active}
                    className={
                      active
                        ? `showcase__item showcase__item--active${artPinned ? " is-pinned" : ""}`
                        : "showcase__item"
                    }
                    key={item.title}
                    onClick={() => pickArt(index)}
                    type="button"
                  >
                    <span className="showcase__num">{pad(index)}</span>
                    <span className="showcase__text">
                      <span className="showcase__kind">{item.kind}</span>
                      <strong>{item.title}</strong>
                      <span className="showcase__desc">{item.description}</span>
                    </span>
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="showcase__bar"
                        onAnimationEnd={() =>
                          setActiveArt(
                            (current) =>
                              (current + 1) % content.gallery.items.length,
                          )
                        }
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ metodo */}
        <section className="process band" id="metodo" aria-label={content.process.aria}>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{content.process.eyebrow}</p>
            <h2>{content.process.title}</h2>
          </div>
          <ol className="steps" data-reveal>
            {content.process.steps.map(([title, body], index) => (
              <li key={title} style={{ "--i": index } as CSSProperties}>
                <span className="steps__node" aria-hidden="true" />
                <span className="steps__num">{pad(index)}</span>
                <strong>{title}</strong>
                <span className="steps__body">{body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- officina */}
        <section className="location band" id="officina">
          <div className="location__copy" data-reveal>
            <p className="eyebrow">{content.location.eyebrow}</p>
            <h2>{content.location.title}</h2>
            <p>{content.location.body}</p>
            <address>{shopAddress}</address>
            <p className="location__areas-label">
              {content.location.areasLabel}
            </p>
            <ul className="chips">
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <a
              className="button button--ghost"
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noreferrer"
            >
              {content.location.mapButton}
            </a>
          </div>
          <div
            className="location__map"
            data-reveal
            style={delay(120)}
            aria-label={`Map: ${shopAddress}`}
          >
            <iframe
              title={content.location.mapTitle}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- contatti */}
        <section className="contact" id="contatti">
          <Embers className="contact__embers" density={0.55} />
          <div className="contact__inner">
            <div className="contact__copy" data-reveal>
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p className="contact__body">{content.contact.body}</p>
              <div className="contact__actions">
                {shopPhone ? (
                  <a
                    className="button button--primary"
                    href={`tel:${shopPhone.replace(/\s/g, "")}`}
                  >
                    {content.contact.callButton}
                  </a>
                ) : null}
                {shopWhatsApp ? (
                  <a
                    className="button button--ghost"
                    href={`https://wa.me/${shopWhatsApp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.contact.whatsappButton}
                  </a>
                ) : null}
                <a className="button button--ghost" href={mailHref}>
                  {shopEmail}
                </a>
              </div>
            </div>

            <form
              className="quote spot"
              data-reveal
              onSubmit={sendQuote}
              style={delay(120)}
            >
              <label>
                <span>{content.contact.form.name}</span>
                <input autoComplete="name" name="name" required type="text" />
              </label>
              <label>
                <span>{content.contact.form.type}</span>
                <select name="type" defaultValue={content.services.items[0]}>
                  {content.services.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                  <option value={content.contact.form.other}>
                    {content.contact.form.other}
                  </option>
                </select>
              </label>
              <label>
                <span>{content.contact.form.message}</span>
                <textarea
                  name="message"
                  placeholder={content.contact.form.placeholder}
                  required
                  rows={4}
                />
              </label>
              <button className="button button--primary" type="submit">
                {content.contact.form.send}
              </button>
              <p className="quote__hint">{content.contact.form.hint}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img
              src="/logo-arte-del-ferro-horizontal.png"
              alt="L'arte del Ferro"
              width={200}
              height={66}
            />
            <p>{content.footer.tagline}</p>
          </div>

          <div className="site-footer__col">
            <h4>{content.footer.nav}</h4>
            <ul>
              {sections.map((section) => (
                <li key={section.href}>
                  <a href={section.href}>{section.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h4>{content.footer.contacts}</h4>
            <ul>
              <li>
                <a href={mailHref}>{shopEmail}</a>
              </li>
              {shopPhone ? (
                <li>
                  <a href={`tel:${shopPhone.replace(/\s/g, "")}`}>{shopPhone}</a>
                </li>
              ) : null}
              <li>{shopAddress}</li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4>{content.footer.areas}</h4>
            <ul>
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="site-footer__mark" aria-hidden="true">
          Arte del Ferro
        </p>

        <div className="site-footer__legal">
          <span>
            © {new Date().getFullYear()} Arte del Ferro di Marco Marasco.{" "}
            {content.footer.rights}
          </span>
          {shopVat ? <span>{shopVat}</span> : null}
        </div>
      </footer>

      <div className="action-bar">
        {shopPhone ? (
          <a
            className="action-bar__item action-bar__item--primary"
            href={`tel:${shopPhone.replace(/\s/g, "")}`}
          >
            {content.contact.callButton}
          </a>
        ) : null}
        {shopWhatsApp ? (
          <a
            className="action-bar__item"
            href={`https://wa.me/${shopWhatsApp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        ) : null}
        <a
          className={
            shopPhone
              ? "action-bar__item"
              : "action-bar__item action-bar__item--primary"
          }
          href={mailHref}
        >
          {content.contact.button}
        </a>
      </div>
    </div>
  );
}
