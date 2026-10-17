import assert from "node:assert/strict";
import test, { after } from "node:test";

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const cli = new URL("../node_modules/vinext/dist/cli.js", import.meta.url);
const port = 4313;
let server;
let cached;

// Usa il server di produzione vero (`vinext start`) sulla build in dist/.
async function render() {
  if (!server) {
    server = spawn(process.execPath, [fileURLToPath(cli), "start", "-p", String(port)], {
      stdio: "ignore",
    });
  }
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`, {
        headers: { accept: "text/html" },
      });
      if (response.ok) {
        cached ??= await response.text();
        return new Response(cached, {
          status: response.status,
          headers: response.headers,
        });
      }
    } catch {
      // il server si sta ancora avviando: riprova
    }
    await sleep(500);
  }
  throw new Error("Il server di produzione non risponde");
}

after(() => server?.kill());

test("server-renders the Arte del Ferro showcase", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Arte del Ferro di Marco Marasco/i);
  assert.match(html, /<html[^>]*lang="it"/i);

  // hero: il titolo e spezzato in parole animate, quindi si controllano le parole
  assert.match(html, /<h1[\s\S]*Cancelli,[\s\S]*forgiate[\s\S]*mano[\s\S]*<\/h1>/);

  // tutte le sezioni ancorate dal menu
  for (const id of ["top", "lavorazioni", "galleria", "metodo", "officina", "contatti"]) {
    assert.match(html, new RegExp(`id="${id}"`), `manca la sezione #${id}`);
  }

  // gallery interattiva e form preventivo
  assert.match(html, /class="showcase"/);
  assert.match(html, /<form[^>]*class="quote/);
  assert.match(html, /name="message"/);
});

test("exposes structured data and keeps content free of template leftovers", async () => {
  const html = await (await render()).text();

  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HomeAndConstructionBusiness/);
  assert.match(html, /Cutro/);

  // contatti non ancora definitivi: senza telefono/WhatsApp non devono esserci
  // link vuoti
  assert.doesNotMatch(html, /href="tel:"/);
  assert.doesNotMatch(html, /href="https:\/\/wa\.me\/"/);

  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});
