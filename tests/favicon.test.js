import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
const styles = readFileSync(resolve(ROOT, "styles.css"), "utf8");
const readme = readFileSync(resolve(ROOT, "README.md"), "utf8");

function pngMetadata(filename) {
  const bytes = readFileSync(resolve(ROOT, filename));
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    colorType: bytes[25],
  };
}

test("GitHub Pages ofrece el balon WC26 premium y fallbacks versionados", () => {
  assert.match(
    html,
    /<link rel="icon" type="image\/png" sizes="32x32" href="\.\/favicon-32x32\.png\?v=\d+" \/>/,
  );
  assert.match(
    html,
    /<link rel="shortcut icon" href="\.\/favicon\.ico\?v=\d+" \/>/,
  );
  assert.doesNotMatch(html, /<link rel="icon" type="image\/svg\+xml"/);
  assert.equal(existsSync(resolve(ROOT, "wc26-mark.svg")), false);
  assert.equal(existsSync(resolve(ROOT, "wc26-ball-premium.png")), true);
  assert.equal(existsSync(resolve(ROOT, "favicon-32x32.png")), true);
  assert.equal(existsSync(resolve(ROOT, "favicon.ico")), true);
  assert.equal(existsSync(resolve(ROOT, "soccer-ball-logo.png")), false);
});

test("el icono de instalacion movil mantiene el mismo arte visual", () => {
  assert.match(
    html,
    /<link rel="apple-touch-icon" sizes="180x180" href="\.\/apple-touch-icon\.png\?v=\d+" \/>/,
  );
  assert.equal(existsSync(resolve(ROOT, "apple-touch-icon.png")), true);
});

test("los assets raster del emblema conservan dimensiones de publicacion", () => {
  assert.deepEqual(pngMetadata("wc26-ball-premium.png"), {
    width: 512,
    height: 512,
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
  assert.deepEqual(pngMetadata("github-social-preview.png"), {
    width: 1280,
    height: 640,
    colorType: 2,
  });
});

test("el logotipo reutiliza el balon WC26 premium sin depender del emoji", () => {
  assert.match(
    html,
    /<img class="logo-home__ball" src="\.\/wc26-ball-premium\.png\?v=\d+" alt="" aria-hidden="true" \/>/,
  );
  assert.match(html, /<span class="logo-home__brand">/);
  assert.doesNotMatch(html, />\s*⚽\s*WC2026/);
  assert.match(styles, /\.logo-home__ball\s*\{[^}]*width:\s*1\.1em;[^}]*height:\s*1\.1em;/s);
  assert.match(styles, /@media \(min-width: 768px\)\s*\{\s*\.logo-home__ball\s*\{[^}]*width:\s*1em;[^}]*height:\s*1em;/s);
});

test("el repositorio publica el logotipo premium y su vista previa social", () => {
  assert.match(readme, /<img src="\.\/wc26-ball-premium\.png"/);
  assert.match(readme, /github-social-preview\.png/);
});
