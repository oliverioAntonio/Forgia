"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
  wobble: number;
};

/**
 * Scintille che salgono dalla forgia. Canvas leggero: si ferma quando esce
 * dallo schermo o quando l'utente chiede meno movimento.
 */
export function Embers({
  className,
  density = 1,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const embers: Ember[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Ember {
      // piu fitte verso destra, dove nella foto c'e il fuoco
      const x = width * (0.35 + Math.random() * 0.65);
      return {
        x,
        y: height + 10,
        vx: (Math.random() - 0.35) * 0.5,
        vy: -(0.5 + Math.random() * 1.5),
        r: 0.6 + Math.random() * 1.9,
        life: 0,
        max: 160 + Math.random() * 220,
        wobble: Math.random() * Math.PI * 2,
      };
    }

    function tick() {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const target = Math.round((width / 14) * density);
      if (embers.length < target && Math.random() < 0.6) embers.push(spawn());

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        e.wobble += 0.035;
        e.x += e.vx + Math.sin(e.wobble) * 0.35;
        e.y += e.vy;
        e.vy *= 0.9994;

        const t = e.life / e.max;
        if (t >= 1 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        const alpha = Math.sin(Math.min(t * 1.4, 1) * Math.PI) * 0.9;
        const green = Math.round(150 - t * 90);

        ctx!.fillStyle = `rgba(255, ${green}, 40, ${alpha * 0.16})`;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(255, ${green + 70}, 90, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    resize();
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas aria-hidden="true" className={className} ref={canvasRef} />;
}

/** Numero che sale da 0 al valore quando entra nello schermo. */
export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frame = 0;
    // parte da 0 solo dopo l'idratazione: senza JS resta il valore finale
    setShown(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1700;

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setShown(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

/**
 * Effetti legati allo scroll e al puntatore, tutti su un unico contenitore:
 *  - [data-reveal]   compare quando entra nello schermo (classe `is-in`)
 *  - .spot           luce che segue il cursore (--mx / --my)
 *  - [data-parallax] spostamento verticale proporzionale allo scroll (--py)
 *  - --progress      avanzamento di lettura della pagina (0 -> 1)
 *  - hero            --hx / --hy per la torcia che segue il mouse
 */
export function useSiteEffects(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();

    // --- comparsa allo scroll -------------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((node) => revealObserver.observe(node));

    // --- progresso e parallasse -----------------------------------------
    const parallax = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let ticking = false;

    function update() {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      root!.style.setProperty("--progress", progress.toFixed(4));

      if (reduced) return;
      for (const node of parallax) {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
        const speed = Number(node.dataset.parallax) || 0.1;
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        node.style.setProperty("--py", `${(-offset * speed).toFixed(1)}px`);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    // --- luce che segue il cursore --------------------------------------
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const target = event.target as HTMLElement | null;
      const spot = target?.closest<HTMLElement>(".spot");
      if (!spot) return;
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    root.addEventListener("pointermove", onPointerMove);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.removeEventListener("pointermove", onPointerMove);
    };
  }, [rootRef]);
}

/** Id della sezione attualmente al centro dello schermo (per il menu). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const nodes = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
