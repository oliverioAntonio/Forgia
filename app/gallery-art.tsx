import type { GalleryArt, ServiceIconName } from "./site-content";

// `pathLength=1` normalizza la lunghezza di ogni tratto: cosi il CSS puo
// "disegnare" qualsiasi linea con un unico dash-array, senza misurarla.
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
};

function Scroll({
  x,
  y,
  flip = false,
  scale = 1,
}: {
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
}) {
  return (
    <path
      d="M0 0c0-11 9-20 20-20s20 9 20 20-8 17-16 17-13-6-13-12 5-10 10-10 8 4 8 8"
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
      strokeWidth={2.2 / scale}
      {...strokeProps}
    />
  );
}

function Gate() {
  const bars = [34, 52, 70, 88, 112, 130, 148, 166];
  return (
    <>
      {/* montanti e traverse */}
      <path d="M16 70v150M184 70v150M100 52v168" strokeWidth="3.4" {...strokeProps} />
      <path d="M16 70q42-34 84-34t84 34" strokeWidth="3.4" {...strokeProps} />
      <path d="M16 190h168M16 220h168M16 112h168" strokeWidth="2.6" {...strokeProps} />
      {/* aste verticali */}
      {bars.map((bx) => (
        <path
          key={bx}
          d={`M${bx} ${bx < 100 ? 62 - (100 - bx) * 0.06 : 62 - (bx - 100) * 0.06}v158`}
          strokeWidth="2"
          opacity="0.85"
          {...strokeProps}
        />
      ))}
      {/* punte */}
      {bars.map((bx) => (
        <path
          key={`t-${bx}`}
          d={`M${bx - 5} 62l5-12 5 12`}
          strokeWidth="2"
          opacity="0.7"
          {...strokeProps}
        />
      ))}
      {/* volute centrali */}
      <Scroll x={97} y={178} scale={1.05} />
      <Scroll x={103} y={178} flip scale={1.05} />
    </>
  );
}

function Grille() {
  const bars = [40, 64, 88, 112, 136, 160];
  return (
    <>
      <path d="M20 44h160v176H20z" strokeWidth="3.4" {...strokeProps} />
      <path d="M20 74h160M20 190h160" strokeWidth="2.6" {...strokeProps} />
      {bars.map((bx) => (
        <path key={bx} d={`M${bx} 44v176`} strokeWidth="2.2" opacity="0.85" {...strokeProps} />
      ))}
      {/* rombo centrale */}
      <path d="M100 96l38 36-38 36-38-36z" strokeWidth="2.6" {...strokeProps} />
      <path d="M100 114l20 18-20 18-20-18z" strokeWidth="2" opacity="0.7" {...strokeProps} />
      {/* fasce di rinforzo */}
      <path d="M20 132h44M136 132h44" strokeWidth="2.6" {...strokeProps} />
      <circle cx="100" cy="132" r="4" strokeWidth="2" {...strokeProps} />
    </>
  );
}

function Railing() {
  // corrimano inclinato da (16, 92) a (184, 40)
  const railY = (x: number) => 92 + (x - 16) * ((40 - 92) / (184 - 16));
  const posts = [30, 100, 170];
  const balusters = [48, 64, 80, 118, 134, 150];
  return (
    <>
      {/* corrimano */}
      <path d="M16 92l168-52" strokeWidth="4" {...strokeProps} />
      <path d="M16 214h168" strokeWidth="3" {...strokeProps} />
      {/* gradini: restano tratteggiati, quindi compaiono in dissolvenza */}
      <path
        className="keep-dash"
        d="M16 214v-16h40v-18h40v-18h40v-18h40v-18"
        strokeWidth="1.8"
        opacity="0.4"
        strokeDasharray="6 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {posts.map((px) => (
        <path
          key={px}
          d={`M${px} 214V${(railY(px) - 8).toFixed(1)}`}
          strokeWidth="3.4"
          {...strokeProps}
        />
      ))}
      {balusters.map((bx) => (
        <path
          key={bx}
          d={`M${bx} 214V${(railY(bx) + 3).toFixed(1)}`}
          strokeWidth="2"
          opacity="0.85"
          {...strokeProps}
        />
      ))}
      <Scroll x={69} y={196} scale={0.62} />
      <Scroll x={141} y={174} flip scale={0.62} />
    </>
  );
}

function Rosette() {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      <circle cx="100" cy="130" r="82" strokeWidth="2.2" opacity="0.45" {...strokeProps} />
      <circle cx="100" cy="130" r="58" strokeWidth="3" {...strokeProps} />
      <circle cx="100" cy="130" r="13" strokeWidth="2.6" {...strokeProps} />
      {petals.map((angle) => (
        <path
          key={angle}
          d="M0 -13c14-6 30 2 30 18 0 12-10 20-20 16"
          transform={`translate(100 130) rotate(${angle})`}
          strokeWidth="2.2"
          opacity="0.9"
          {...strokeProps}
        />
      ))}
      {petals.map((angle) => (
        <path
          key={`r-${angle}`}
          d="M0 -58v-24"
          transform={`translate(100 130) rotate(${angle + 22.5})`}
          strokeWidth="2"
          opacity="0.6"
          {...strokeProps}
        />
      ))}
    </>
  );
}

const drawings: Record<GalleryArt, () => React.ReactElement> = {
  gate: Gate,
  grille: Grille,
  railing: Railing,
  scroll: Rosette,
};

export function GalleryArtwork({ art }: { art: GalleryArt }) {
  const Drawing = drawings[art];

  return (
    <svg
      className="artwork"
      viewBox="0 0 200 240"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Drawing />
    </svg>
  );
}

const icons: Record<ServiceIconName, string> = {
  gate: "M4 21V9a8 8 0 0 1 16 0v12M12 3v18M8 7v14M16 7v14M3 21h18",
  rail: "M3 9l18-5M3 21h18M7 21V8M12 21V6.5M17 21V5",
  grille: "M4 4h16v16H4zM4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  restore: "M13 5l6 6M10 8l5-5 6 6-5 5zM13 11L4 20M4 20l-1-1",
  furniture: "M3 8h13c0 3.2-2 4.5-5 4.5V16h4v4H7v-4h2v-3.5C5.5 12.5 3 11 3 8zM16 8h5",
  custom: "M4 20l1.2-5.2L16.5 3.5l4 4L9.2 18.8zM14 6l4 4",
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      className="service__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icons[name]} />
    </svg>
  );
}
