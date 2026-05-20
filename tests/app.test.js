import test from "node:test";
import assert from "node:assert/strict";

import { STICKERS, ALBUM_METADATA } from "../data.js";
import {
  applyStickerClick,
  applyStickerCorrection,
  computeStats,
  filterStickers,
  mergeCatalogWithProgress,
} from "../app.js";

test("el dataset usa la edicion Alemania con 12 Coca-Cola y 20 FWC", () => {
  assert.equal(ALBUM_METADATA.edition, "germany");
  assert.equal(STICKERS.length, 992);
  assert.equal(
    STICKERS.filter((sticker) => sticker.tipo === "Coca-Cola").length,
    12,
  );
  assert.equal(
    STICKERS.filter((sticker) => sticker.numero.startsWith("FWC")).length,
    20,
  );
});

test("el dataset respeta las paginas de inicio por seleccion del screenshot", () => {
  const mexico = STICKERS.find((sticker) => sticker.pais === "México");
  const germany = STICKERS.find((sticker) => sticker.pais === "Germany");
  const panama = STICKERS.find((sticker) => sticker.pais === "Panama");

  assert.equal(mexico.paginaInicioSeleccion, 8);
  assert.equal(germany.paginaInicioSeleccion, 40);
  assert.equal(panama.paginaInicioSeleccion, 104);
});

test("un sticker pasa de faltante a obtenido y luego suma repetidos", () => {
  const original = {
    id: "MEX1",
    obtenido: false,
    repetidos: 0,
  };

  const firstClick = applyStickerClick(original);
  const secondClick = applyStickerClick(firstClick);
  const thirdClick = applyStickerClick(secondClick);

  assert.deepEqual(firstClick, {
    id: "MEX1",
    obtenido: true,
    repetidos: 0,
  });
  assert.deepEqual(secondClick, {
    id: "MEX1",
    obtenido: true,
    repetidos: 1,
  });
  assert.deepEqual(thirdClick, {
    id: "MEX1",
    obtenido: true,
    repetidos: 2,
  });
});

test("el boton de correccion resta repetidos y luego devuelve a faltante", () => {
  const withRepeats = {
    id: "MEX1",
    obtenido: true,
    repetidos: 2,
  };

  const lessRepeated = applyStickerCorrection(withRepeats);
  const onlyOwned = applyStickerCorrection(lessRepeated);
  const missingAgain = applyStickerCorrection(onlyOwned);

  assert.deepEqual(lessRepeated, {
    id: "MEX1",
    obtenido: true,
    repetidos: 1,
  });
  assert.deepEqual(onlyOwned, {
    id: "MEX1",
    obtenido: true,
    repetidos: 0,
  });
  assert.deepEqual(missingAgain, {
    id: "MEX1",
    obtenido: false,
    repetidos: 0,
  });
});

test("mergeCatalogWithProgress aplica el overlay del progreso autenticado", () => {
  const merged = mergeCatalogWithProgress(
    [
      { id: "MEX1", obtenido: false, repetidos: 0, pais: "México" },
      { id: "CC1", obtenido: false, repetidos: 0, pais: "Coca-Cola" },
    ],
    [
      { sticker_id: "MEX1", obtained: true, duplicates: 2 },
      { sticker_id: "CC1", obtained: true, duplicates: 1 },
    ],
  );

  assert.equal(merged[0].obtenido, true);
  assert.equal(merged[0].repetidos, 2);
  assert.equal(merged[1].obtenido, true);
  assert.equal(merged[1].repetidos, 1);
});

test("mergeCatalogWithProgress sanea repetidos invalidos del servidor", () => {
  const merged = mergeCatalogWithProgress(
    [{ id: "MEX1", obtenido: false, repetidos: 0, pais: "México" }],
    [{ sticker_id: "MEX1", obtained: false, duplicates: -7 }],
  );

  assert.equal(merged[0].obtenido, false);
  assert.equal(merged[0].repetidos, 0);
});

test("los filtros encuentran Coca-Cola faltantes y repetidos correctamente", () => {
  const stickers = [
    { id: "CC1", pais: "Coca-Cola", tipo: "Coca-Cola", obtenido: false, repetidos: 0, grupo: "Coca-Cola", nombre: "CC1", numero: "CC1", categoriaEspecial: "Coca-Cola Germany" },
    { id: "CC2", pais: "Coca-Cola", tipo: "Coca-Cola", obtenido: true, repetidos: 2, grupo: "Coca-Cola", nombre: "CC2", numero: "CC2", categoriaEspecial: "Coca-Cola Germany" },
  ];

  assert.equal(
    filterStickers(stickers, { section: "coca-cola", filter: "faltantes", query: "" }).length,
    1,
  );
  assert.equal(
    filterStickers(stickers, { section: "repetidos", filter: "repetidos", query: "" }).length,
    1,
  );
});

test("computeStats calcula progreso general y de Coca-Cola Alemania", () => {
  const stickers = [
    { id: "FWC1", grupo: "Especiales", pais: "Tournament", tipo: "Especial", categoriaEspecial: "FWC", obtenido: true, repetidos: 0 },
    { id: "MEX1", grupo: "A", pais: "México", tipo: "Escudo", categoriaEspecial: "", obtenido: true, repetidos: 1 },
    { id: "CC1", grupo: "Coca-Cola", pais: "Coca-Cola", tipo: "Coca-Cola", categoriaEspecial: "Coca-Cola Germany", obtenido: false, repetidos: 0 },
  ];

  const stats = computeStats(stickers);

  assert.equal(stats.total, 3);
  assert.equal(stats.obtenidos, 2);
  assert.equal(stats.faltantes, 1);
  assert.equal(stats.repetidos, 1);
  assert.equal(stats.cocaCola.total, 1);
  assert.equal(stats.cocaCola.faltantes, 1);
  assert.equal(stats.especiales.obtenidos, 2);
});
