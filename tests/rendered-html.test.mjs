import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

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
