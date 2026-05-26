import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
const styles = readFileSync(resolve(ROOT, "styles.css"), "utf8");

function pngMetadata(filename) {
  const bytes = readFileSync(resolve(ROOT, filename));
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    colorType: bytes[25],
  };
}

test("GitHub Pages ofrece el favicon fotografico y fallbacks versionados", () => {
  assert.match(
    html,
    /<link rel="icon" type="image\/png" sizes="32x32" href="\.\/favicon-32x32\.png\?v=\d+" \/>/,
  );
  assert.match(
    html,
    /<link rel="shortcut icon" href="\.\/favicon\.ico\?v=\d+" \/>/,
  );
  assert.doesNotMatch(html, /<link rel="icon" type="image\/svg\+xml"/);
  assert.equal(existsSync(resolve(ROOT, "favicon-32x32.png")), true);
  assert.equal(existsSync(resolve(ROOT, "favicon.ico")), true);
  assert.equal(existsSync(resolve(ROOT, "soccer-ball-logo.png")), true);
});

test("el icono de instalacion movil mantiene el mismo arte visual", () => {
  assert.match(
    html,
    /<link rel="apple-touch-icon" sizes="180x180" href="\.\/apple-touch-icon\.png\?v=\d+" \/>/,
  );
  assert.equal(existsSync(resolve(ROOT, "apple-touch-icon.png")), true);
});

test("los PNG del balon conservan dimensiones y canal alfa esperados", () => {
  assert.deepEqual(pngMetadata("soccer-ball-logo.png"), {
    width: 128,
    height: 128,
    colorType: 6,
  });
  assert.deepEqual(pngMetadata("favicon-32x32.png"), {
    width: 32,
    height: 32,
    colorType: 6,
  });
  assert.deepEqual(pngMetadata("apple-touch-icon.png"), {
    width: 180,
    height: 180,
    colorType: 6,
  });
});

test("el logotipo reutiliza el balon fotografico sin depender del emoji", () => {
  assert.match(
    html,
    /<img class="logo-home__ball" src="\.\/soccer-ball-logo\.png\?v=\d+" alt="" aria-hidden="true" \/>/,
  );
  assert.match(html, /<span class="logo-home__brand">/);
  assert.doesNotMatch(html, />\s*⚽\s*WC2026/);
  assert.match(styles, /\.logo-home__ball\s*\{[^}]*width:\s*1\.1em;[^}]*height:\s*1\.1em;/s);
  assert.match(styles, /@media \(min-width: 768px\)\s*\{\s*\.logo-home__ball\s*\{[^}]*width:\s*1em;[^}]*height:\s*1em;/s);
});
