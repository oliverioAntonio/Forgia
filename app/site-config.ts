// Percorso base e URL pubblico, impostati in fase di build.
//  - GitHub Pages (progetto):  NEXT_PUBLIC_BASE_PATH=/Forgia
//  - dominio proprio:          nessun percorso base, NEXT_PUBLIC_SITE_URL=https://dominio.it
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artedelferro.it"
).replace(/\/$/, "");

/** Prefissa un file di /public con il percorso base. */
export function asset(path: string) {
  return `${basePath}${path}`;
}
