// Genera una cartella statica (`site-out/`) pronta per GitHub Pages o qualsiasi
// hosting di file: costruisce il sito, avvia il server di produzione, salva
// l'HTML renderizzato e lo affianca agli asset della build.
//
//   NEXT_PUBLIC_BASE_PATH=/Forgia   -> pubblicazione su github.io/Forgia/
//   (vuoto)                         -> dominio proprio, alla radice
//   NEXT_PUBLIC_SITE_URL=https://dominio.it   (origine pubblica, per SEO/OG)
import { spawn, spawnSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const cli = new URL("../node_modules/vinext/dist/cli.js", import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, "$1");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const port = 4311;
const out = "site-out";

const build = spawnSync(process.execPath, [cli, "build"], {
  stdio: "inherit",
  env: process.env,
});
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn(process.execPath, [cli, "start", "-p", String(port)], {
  stdio: "ignore",
  env: process.env,
});

async function fetchPage(path) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${path}`);
      if (res.ok) return await res.text();
    } catch {
      // il server si sta avviando: riprova
    }
    await sleep(500);
  }
  throw new Error(`Il server non risponde su ${path}`);
}

try {
  const html = await fetchPage(`${basePath}/`);
  if (!html.includes("<h1")) throw new Error("HTML inatteso: manca il titolo");

  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  // Gli URL del sito sono `${basePath}/x`: qui i file stanno alla radice di
  // `site-out/`, quindi GitHub Pages (che serve la cartella sotto /Forgia/) li
  // trova senza altro.
  await cp("dist/client", out, { recursive: true });
  if (basePath && existsSync(`${out}${basePath}`)) {
    await cp(`${out}${basePath}`, out, { recursive: true });
    await rm(`${out}${basePath}`, { recursive: true, force: true });
  }
  await writeFile(`${out}/index.html`, html);
  await writeFile(`${out}/.nojekyll`, "");

  // pagina 404: riusa la home (un solo percorso, nessuna sotto-pagina)
  await writeFile(`${out}/404.html`, html);
  console.log(`Pronto: ${out}/ (${(await readFile(`${out}/index.html`)).length} byte di HTML)`);
} finally {
  server.kill();
}
