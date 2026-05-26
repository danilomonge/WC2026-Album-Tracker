import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
const svg = readFileSync(resolve(ROOT, "favicon.svg"), "utf8");
const styles = readFileSync(resolve(ROOT, "styles.css"), "utf8");

test("GitHub Pages ofrece favicons compatibles y versionados para la pestana", () => {
  assert.match(
    html,
    /<link rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg\?v=\d+" \/>/,
  );
  assert.match(
    html,
    /<link rel="icon" type="image\/png" sizes="32x32" href="\.\/favicon-32x32\.png\?v=\d+" \/>/,
  );
  assert.match(
    html,
    /<link rel="shortcut icon" href="\.\/favicon\.ico\?v=\d+" \/>/,
  );
  assert.equal(existsSync(resolve(ROOT, "favicon-32x32.png")), true);
  assert.equal(existsSync(resolve(ROOT, "favicon.ico")), true);
});

test("el icono de instalacion movil mantiene el mismo arte visual", () => {
  assert.match(
    html,
    /<link rel="apple-touch-icon" sizes="180x180" href="\.\/apple-touch-icon\.png\?v=\d+" \/>/,
  );
  assert.equal(existsSync(resolve(ROOT, "apple-touch-icon.png")), true);
});

test("el SVG evita efectos que rasterizan el balon como un circulo negro", () => {
  assert.doesNotMatch(svg, /rgba\(/);
  assert.doesNotMatch(svg, /<radialGradient/);
});

test("el logotipo reutiliza el balon vectorial sin depender del emoji", () => {
  assert.match(
    html,
    /<img class="logo-home__ball" src="\.\/favicon\.svg\?v=\d+" alt="" aria-hidden="true" \/>/,
  );
  assert.match(html, /<span class="logo-home__brand">/);
  assert.doesNotMatch(html, />\s*⚽\s*WC2026/);
  assert.match(styles, /\.logo-home__ball\s*\{[^}]*width:\s*1\.1em;[^}]*height:\s*1\.1em;/s);
  assert.match(styles, /@media \(min-width: 768px\)\s*\{\s*\.logo-home__ball\s*\{[^}]*width:\s*1em;[^}]*height:\s*1em;/s);
});
