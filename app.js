import { ALBUM_METADATA, GROUPS, SELECTIONS, STICKERS } from "./data.js";

const STORAGE_KEYS = {
  config: "panini-supabase-config",
  view: "panini-ui-view",
};

const SECTION_LABELS = {
  all: "Todos los cromos",
  repetidos: "Mis repetidos",
  faltantes: "Me faltan",
  especiales: "Especiales",
  "coca-cola": "Coca-Cola",
  stats: "Estadísticas",
};

const FILTER_LABELS = {
  todos: "Todos",
  obtenidos: "Obtenidos",
  repetidos: "Repetidos",
  faltantes: "Faltantes",
  especiales: "Especiales",
  "coca-cola": "Coca-Cola",
  escudos: "Escudos",
  estadios: "Estadios",
  "team-photos": "Team Photos",
  logos: "Logos",
};

const state = {
  catalog: STICKERS,
  stickers: STICKERS,
  session: null,
  supabase: null,
  authMode: "login",
  section: "all",
  filter: "todos",
  query: "",
  viewMode: "group",
  selectedGroup: "all",
  selectedTeam: "all",
  selectedPage: "all",
  isSyncing: false,
  config: loadConfig(),
  authSubscription: null,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeDuplicates(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return Math.min(parsed, 99);
}

function isFileProtocol() {
  return typeof window !== "undefined" && window.location.protocol === "file:";
}

function isAuthRuntimeAvailable() {
  return !isFileProtocol();
}

function validateSupabaseConfig(config) {
  if (!config.url || !config.anonKey) {
    return {
      valid: false,
      message: "Completa la URL del proyecto y la anon key.",
    };
  }

  try {
    const parsed = new URL(config.url);
    const validHost = /\.supabase\.co$/i.test(parsed.hostname);
    const validProtocol = parsed.protocol === "https:";
    if (!validProtocol || !validHost) {
      return {
        valid: false,
        message: "La URL debe ser HTTPS y terminar en .supabase.co.",
      };
    }
  } catch {
    return {
      valid: false,
      message: "La URL de Supabase no es válida.",
    };
  }

  if (!/^sb_(publishable|anon)_/i.test(config.anonKey)) {
    return {
      valid: false,
      message: "La anon key no tiene el formato esperado de Supabase.",
    };
  }

  return { valid: true, message: "" };
}

function loadConfig() {
  if (typeof window === "undefined") {
    return { url: "", anonKey: "" };
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.config)) || {
      url: "",
      anonKey: "",
    };
  } catch {
    return { url: "", anonKey: "" };
  }
}

function saveConfig(config) {
  window.localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
}

function loadViewState() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.view));
    if (saved) {
      state.section = saved.section || state.section;
      state.filter = saved.filter || state.filter;
      state.viewMode = saved.viewMode || state.viewMode;
      state.selectedGroup = saved.selectedGroup || state.selectedGroup;
      state.selectedTeam = saved.selectedTeam || state.selectedTeam;
      state.selectedPage = saved.selectedPage || state.selectedPage;
      state.query = saved.query || state.query;
    }
  } catch {
    return;
  }
}

function saveViewState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEYS.view,
    JSON.stringify({
      section: state.section,
      filter: state.filter,
      viewMode: state.viewMode,
      selectedGroup: state.selectedGroup,
      selectedTeam: state.selectedTeam,
      selectedPage: state.selectedPage,
      query: state.query,
    }),
  );
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isSpecialSticker(sticker) {
  return [
    "Especial",
    "Escudo",
    "Team Photo",
    "Estadio",
    "Logo",
    "Mascota",
    "Trophy",
    "Host City",
    "Promocional",
    "Coca-Cola",
    "Coca-Cola especial",
  ].includes(sticker.tipo);
}

function isCocaColaSticker(sticker) {
  return sticker.tipo === "Coca-Cola" || sticker.categoriaEspecial === "Coca-Cola Germany";
}

export function applyStickerClick(sticker) {
  if (!sticker.obtenido) {
    return { ...sticker, obtenido: true, repetidos: 0 };
  }

  return {
    ...sticker,
    obtenido: true,
    repetidos: sanitizeDuplicates(sticker.repetidos + 1),
  };
}

export function applyStickerCorrection(sticker) {
  if (sticker.repetidos > 0) {
    return { ...sticker, repetidos: sticker.repetidos - 1 };
  }

  if (sticker.obtenido) {
    return { ...sticker, obtenido: false, repetidos: 0 };
  }

  return sticker;
}

export function mergeCatalogWithProgress(catalog, progressRows) {
  const progressMap = new Map(
    progressRows.map((row) => [
      row.sticker_id,
      {
        obtenido: Boolean(row.obtained) || sanitizeDuplicates(row.duplicates) > 0,
        repetidos: sanitizeDuplicates(row.duplicates),
      },
    ]),
  );

  return catalog.map((sticker) => ({
    ...sticker,
    ...(progressMap.get(sticker.id) || {
      obtenido: false,
      repetidos: 0,
    }),
  }));
}

export function filterStickers(stickers, options) {
  const {
    section = "all",
    filter = "todos",
    query = "",
    selectedGroup = "all",
    selectedTeam = "all",
    selectedPage = "all",
  } = options;

  const normalizedQuery = normalizeText(query);

  return stickers.filter((sticker) => {
    if (selectedGroup !== "all" && sticker.grupo !== selectedGroup) {
      return false;
    }

    if (selectedTeam !== "all" && sticker.pais !== selectedTeam) {
      return false;
    }

    if (selectedPage !== "all" && String(sticker.pagina) !== String(selectedPage)) {
      return false;
    }

    if (normalizedQuery) {
      const haystack = normalizeText(
        [
          sticker.pais,
          sticker.grupo,
          sticker.nombre,
          sticker.numero,
          sticker.tipo,
          sticker.categoriaEspecial,
        ].join(" "),
      );

      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    if (section === "repetidos" && sticker.repetidos <= 0) {
      return false;
    }

    if (section === "faltantes" && sticker.obtenido) {
      return false;
    }

    if (section === "especiales" && !isSpecialSticker(sticker)) {
      return false;
    }

    if (section === "coca-cola" && !isCocaColaSticker(sticker)) {
      return false;
    }

    switch (filter) {
      case "obtenidos":
        return sticker.obtenido;
      case "repetidos":
        return sticker.repetidos > 0;
      case "faltantes":
        return !sticker.obtenido;
      case "especiales":
        return isSpecialSticker(sticker);
      case "coca-cola":
        return isCocaColaSticker(sticker);
      case "escudos":
        return sticker.tipo === "Escudo";
      case "estadios":
        return sticker.tipo === "Estadio";
      case "team-photos":
        return sticker.tipo === "Team Photo";
      case "logos":
        return sticker.tipo === "Logo";
      default:
        return true;
    }
  });
}

export function computeStats(stickers) {
  const total = stickers.length;
  const obtenidos = stickers.filter((sticker) => sticker.obtenido).length;
  const faltantes = total - obtenidos;
  const repetidos = stickers.reduce((sum, sticker) => sum + sticker.repetidos, 0);
  const especiales = stickers.filter(isSpecialSticker);
  const cocaCola = stickers.filter(isCocaColaSticker);

  const byGroup = GROUPS.map((group) => {
    const groupStickers = stickers.filter((sticker) => sticker.grupo === group.letter);
    const collected = groupStickers.filter((sticker) => sticker.obtenido).length;

    return {
      label: `Grupo ${group.letter}`,
      key: group.letter,
      total: groupStickers.length,
      obtenidos: collected,
      progress: groupStickers.length ? (collected / groupStickers.length) * 100 : 0,
      color: group.color,
    };
  });

  const bySelection = SELECTIONS.map((selection) => {
    const selectionStickers = stickers.filter((sticker) => sticker.pais === selection.country);
    const collected = selectionStickers.filter((sticker) => sticker.obtenido).length;

    return {
      label: selection.country,
      key: selection.code,
      total: selectionStickers.length,
      obtenidos: collected,
      progress: selectionStickers.length
        ? (collected / selectionStickers.length) * 100
        : 0,
      group: selection.group,
      page: selection.page,
      color: selection.color,
    };
  });

  return {
    total,
    obtenidos,
    faltantes,
    repetidos,
    porcentaje: total ? (obtenidos / total) * 100 : 0,
    especiales: {
      total: especiales.length,
      obtenidos: especiales.filter((sticker) => sticker.obtenido).length,
      faltantes: especiales.filter((sticker) => !sticker.obtenido).length,
    },
    cocaCola: {
      total: cocaCola.length,
      obtenidos: cocaCola.filter((sticker) => sticker.obtenido).length,
      faltantes: cocaCola.filter((sticker) => !sticker.obtenido).length,
      repetidos: cocaCola.reduce((sum, sticker) => sum + sticker.repetidos, 0),
    },
    byGroup,
    bySelection,
  };
}

function sortStickers(stickers) {
  return [...stickers].sort((left, right) => {
    if (left.ordenGrupo !== right.ordenGrupo) {
      return left.ordenGrupo - right.ordenGrupo;
    }

    if (left.ordenPais !== right.ordenPais) {
      return left.ordenPais - right.ordenPais;
    }

    if (left.pagina !== right.pagina) {
      return left.pagina - right.pagina;
    }

    return String(left.numero).localeCompare(String(right.numero), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
}

function groupStickers(stickers, mode) {
  const sorted = sortStickers(stickers);
  const groups = new Map();

  sorted.forEach((sticker) => {
    let key = sticker.grupo;
    let label = `Grupo ${sticker.grupo}`;
    let accent = sticker.colorGrupo;

    if (mode === "selection") {
      key = sticker.pais;
      label = `${sticker.pais} · Pág. ${sticker.paginaInicioSeleccion}`;
    } else if (mode === "page") {
      key = `page-${sticker.pagina}`;
      label = `Página ${sticker.pagina}`;
    }

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label,
        accent,
        stickers: [],
      });
    }

    groups.get(key).stickers.push(sticker);
  });

  return [...groups.values()];
}

function getSelectionOptions(selectedGroup) {
  const allSelections =
    selectedGroup === "all"
      ? SELECTIONS
      : SELECTIONS.filter((selection) => selection.group === selectedGroup);
  return allSelections;
}

function getPageOptions() {
  const pages = new Set(STICKERS.map((sticker) => sticker.pagina));
  return [...pages].sort((left, right) => left - right);
}

function setBannerMessage(message, tone = "muted") {
  const banner = document.querySelector("#read-only-banner");
  banner.dataset.tone = tone;
  banner.textContent = message;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

function openModal(modalId) {
  document.querySelector(modalId).removeAttribute("hidden");
}

function closeModal(modalId) {
  document.querySelector(modalId).setAttribute("hidden", "hidden");
}

async function ensureSupabaseClient() {
  if (state.supabase) {
    return state.supabase;
  }

  if (!isAuthRuntimeAvailable()) {
    return null;
  }

  if (!state.config.url || !state.config.anonKey) {
    return null;
  }

  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.49.8");
  state.supabase = createClient(state.config.url, state.config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  if (state.authSubscription) {
    state.authSubscription.unsubscribe();
  }

  const { data: authListener } = state.supabase.auth.onAuthStateChange(async (_event, session) => {
    state.session = session;
    await loadRemoteProgress();
    renderApp();
  });
  state.authSubscription = authListener.subscription;

  const {
    data: { session },
  } = await state.supabase.auth.getSession();
  state.session = session;
  return state.supabase;
}

async function loadRemoteProgress() {
  if (!state.session || !state.supabase) {
    state.stickers = state.catalog;
    return;
  }

  state.isSyncing = true;
  renderStatus();

  const { data, error } = await state.supabase
    .from("user_sticker_progress")
    .select("sticker_id, obtained, duplicates")
    .eq("user_id", state.session.user.id);

  state.isSyncing = false;

  if (error) {
    setBannerMessage(
      "No pudimos sincronizar tu progreso con Supabase. Revisa la tabla `user_sticker_progress` y las políticas RLS.",
      "warning",
    );
    state.stickers = state.catalog;
    renderStatus();
    return;
  }

  state.stickers = mergeCatalogWithProgress(state.catalog, data || []);
  renderStatus();
}

async function persistSticker(sticker) {
  if (!state.session || !state.supabase) {
    showToast("Inicia sesión para guardar tu progreso.");
    return false;
  }

  const payload = {
    user_id: state.session.user.id,
    sticker_id: sticker.id,
    obtained: sticker.obtenido,
    duplicates: sticker.repetidos,
  };

  state.isSyncing = true;
  renderStatus();

  let error = null;
  if (!sticker.obtenido && sticker.repetidos === 0) {
    ({ error } = await state.supabase
      .from("user_sticker_progress")
      .delete()
      .eq("user_id", state.session.user.id)
      .eq("sticker_id", sticker.id));
  } else {
    ({ error } = await state.supabase
      .from("user_sticker_progress")
      .upsert(payload, { onConflict: "user_id,sticker_id" }));
  }

  state.isSyncing = false;
  renderStatus();

  if (error) {
    showToast("No se pudo guardar en Supabase.");
    return false;
  }

  return true;
}

async function updateSticker(stickerId, updater) {
  if (!state.session || !isAuthRuntimeAvailable()) {
    openModal("#auth-modal");
    return;
  }

  const current = state.stickers.find((item) => item.id === stickerId);
  const next = updater(current);
  state.stickers = state.stickers.map((item) => (item.id === stickerId ? next : item));
  renderApp();

  const success = await persistSticker(next);
  if (!success) {
    await loadRemoteProgress();
    renderApp();
  }
}

function renderFilters() {
  const filterBar = document.querySelector("#filter-chips");
  filterBar.innerHTML = Object.entries(FILTER_LABELS)
    .map(
      ([value, label]) => `
        <button class="chip ${state.filter === value ? "is-active" : ""}" data-filter="${value}">
          ${label}
        </button>
      `,
    )
    .join("");
}

function renderSelectOptions() {
  const groupSelect = document.querySelector("#group-select");
  const teamSelect = document.querySelector("#team-select");
  const pageSelect = document.querySelector("#page-select");

  groupSelect.innerHTML = `
    <option value="all">Todos los grupos</option>
    ${GROUPS.map((group) => `<option value="${group.letter}">Grupo ${group.letter}</option>`).join("")}
  `;
  groupSelect.value = state.selectedGroup;

  teamSelect.innerHTML = `
    <option value="all">Todas las selecciones</option>
    ${getSelectionOptions(state.selectedGroup)
      .map((team) => `<option value="${team.country}">${team.country}</option>`)
      .join("")}
  `;
  if (!getSelectionOptions(state.selectedGroup).some((team) => team.country === state.selectedTeam)) {
    state.selectedTeam = "all";
  }
  teamSelect.value = state.selectedTeam;

  pageSelect.innerHTML = `
    <option value="all">Todas las páginas</option>
    ${getPageOptions().map((page) => `<option value="${page}">Pág. ${page}</option>`).join("")}
  `;
  pageSelect.value = state.selectedPage;
}

function renderSectionTabs() {
  const sections = Object.entries(SECTION_LABELS)
    .map(
      ([value, label]) => `
        <button class="nav-link ${state.section === value ? "is-active" : ""}" data-section="${value}">
          ${escapeHtml(label)}
        </button>
      `,
    )
    .join("");

  document.querySelector("#section-tabs").innerHTML = sections;
  document.querySelector("#mobile-nav").innerHTML = sections;
}

function renderStatus() {
  const authButton = document.querySelector("#auth-trigger");
  const signOutButton = document.querySelector("#sign-out-button");
  const syncStatus = document.querySelector("#sync-status");
  const configStatus = document.querySelector("#config-status");

  if (!state.config.url || !state.config.anonKey) {
    configStatus.textContent = "Supabase sin configurar";
    authButton.textContent = "Configurar";
    signOutButton.hidden = true;
    setBannerMessage(
      "La app está en modo lectura. Abre la configuración de Supabase para activar inicio de sesión y sincronización entre dispositivos.",
      "warning",
    );
  } else if (!isAuthRuntimeAvailable()) {
    configStatus.textContent = "Modo archivo";
    authButton.textContent = "Solo lectura";
    signOutButton.hidden = true;
    setBannerMessage(
      "Abriste la app como archivo local. La exploración funciona, pero para iniciar sesión con Supabase necesitas usar http://localhost o GitHub Pages.",
      "warning",
    );
  } else if (!state.session) {
    configStatus.textContent = "Supabase listo";
    authButton.textContent = "Iniciar sesión";
    signOutButton.hidden = true;
    setBannerMessage(
      "Modo lectura activo. Puedes explorar todo el álbum, pero necesitas iniciar sesión para marcar cromos, generar PDFs personales y sincronizar tu progreso.",
      "muted",
    );
  } else {
    configStatus.textContent = state.session.user.email;
    authButton.textContent = "Cuenta";
    signOutButton.hidden = false;
    setBannerMessage(
      `Sincronización activa para ${state.session.user.email}. Tus cambios se guardan en Supabase y se reflejan en todos tus dispositivos.`,
      "success",
    );
  }

  syncStatus.textContent = state.isSyncing ? "Sincronizando..." : "Sincronizado";
}

function renderOverview(stats) {
  document.querySelector("#hero-stats").innerHTML = `
    <article class="hero-stat">
      <span class="hero-stat__label">Edición</span>
      <strong>${escapeHtml(ALBUM_METADATA.edition.toUpperCase())}</strong>
    </article>
    <article class="hero-stat">
      <span class="hero-stat__label">Total stickers</span>
      <strong>${escapeHtml(stats.total)}</strong>
    </article>
    <article class="hero-stat">
      <span class="hero-stat__label">Coca-Cola</span>
      <strong>${escapeHtml(stats.cocaCola.total)}</strong>
    </article>
    <article class="hero-stat">
      <span class="hero-stat__label">Páginas de selecciones</span>
      <strong>${escapeHtml(ALBUM_METADATA.firstTeamPage)}-${escapeHtml(ALBUM_METADATA.lastTeamPage)}</strong>
    </article>
  `;

  document.querySelector("#stats-summary").innerHTML = `
    <article class="metric-card">
      <span>Completado</span>
      <strong>${escapeHtml(stats.porcentaje.toFixed(1))}%</strong>
      <small>${stats.obtenidos} de ${stats.total}</small>
    </article>
    <article class="metric-card">
      <span>Faltantes</span>
      <strong>${escapeHtml(stats.faltantes)}</strong>
      <small>base + especiales + Coca-Cola</small>
    </article>
    <article class="metric-card">
      <span>Repetidos</span>
      <strong>${escapeHtml(stats.repetidos)}</strong>
      <small>totales registrados</small>
    </article>
    <article class="metric-card metric-card--coke">
      <span>Coca-Cola Alemania</span>
      <strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong>
      <small>${escapeHtml(stats.cocaCola.repetidos)} repetidos</small>
    </article>
  `;
}

function renderStickerCard(sticker) {
  const authClass = state.session ? "" : " is-locked";
  const statusClass = sticker.obtenido ? "is-owned" : "is-missing";
  const specialClass = isSpecialSticker(sticker) ? " is-special" : "";
  const cokeClass = isCocaColaSticker(sticker) ? " is-coke" : "";
  const subtitle = [sticker.tipo, sticker.categoriaEspecial].filter(Boolean).join(" · ");

  return `
    <article
      class="sticker-card ${statusClass}${specialClass}${cokeClass}${authClass}"
      data-sticker-id="${sticker.id}"
      data-group="${sticker.grupo}"
      style="--group-accent:${sticker.colorGrupo}"
    >
      <button class="sticker-card__surface" data-action="toggle-sticker" data-sticker-id="${sticker.id}">
        ${sticker.repetidos > 0 ? `<span class="sticker-card__badge">+${escapeHtml(sticker.repetidos)}</span>` : ""}
        ${isCocaColaSticker(sticker) ? '<span class="sticker-card__tag">Coca-Cola</span>' : ""}
        <span class="sticker-card__number">${escapeHtml(sticker.numero)}</span>
        <strong class="sticker-card__name">${escapeHtml(sticker.nombre)}</strong>
        <span class="sticker-card__meta">${escapeHtml(sticker.pais)}</span>
        <span class="sticker-card__meta">${escapeHtml(subtitle || `Pág. ${sticker.pagina}`)}</span>
      </button>
      <button class="sticker-card__remove" data-action="correct-sticker" data-sticker-id="${sticker.id}" aria-label="Corregir sticker">
        −
      </button>
    </article>
  `;
}

function renderCollectionView(stickers) {
  const content = document.querySelector("#collection-content");
  const groups = groupStickers(stickers, state.viewMode);

  if (!groups.length) {
    content.innerHTML = `
      <section class="empty-state">
        <h3>No encontramos stickers para esta vista.</h3>
        <p>Prueba con otro filtro, cambia la agrupación o limpia la búsqueda.</p>
      </section>
    `;
    return;
  }

  content.innerHTML = groups
    .map((group) => {
      const obtained = group.stickers.filter((sticker) => sticker.obtenido).length;
      const progress = group.stickers.length
        ? (obtained / group.stickers.length) * 100
        : 0;

      return `
        <section class="board-section">
          <header class="board-section__header" style="--group-accent:${group.accent}">
            <div>
              <p class="eyebrow">Agrupación</p>
              <h3>${escapeHtml(group.label)}</h3>
            </div>
            <div class="board-section__progress">
              <strong>${escapeHtml(obtained)}/${escapeHtml(group.stickers.length)}</strong>
              <div class="progress-bar">
                <span style="width:${progress.toFixed(1)}%"></span>
              </div>
            </div>
          </header>
          <div class="sticker-grid">
            ${group.stickers.map(renderStickerCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderStatsView(stats) {
  const content = document.querySelector("#collection-content");
  const selectionProgress = [...stats.bySelection]
    .sort((left, right) => right.progress - left.progress)
    .slice(0, 12);

  content.innerHTML = `
    <section class="stats-board">
      <article class="stats-panel">
        <h3>Panorama general</h3>
        <div class="stats-grid">
          <div class="stats-pill"><span>Obtenidos</span><strong>${escapeHtml(stats.obtenidos)}</strong></div>
          <div class="stats-pill"><span>Faltantes</span><strong>${escapeHtml(stats.faltantes)}</strong></div>
          <div class="stats-pill"><span>Repetidos</span><strong>${escapeHtml(stats.repetidos)}</strong></div>
          <div class="stats-pill"><span>Especiales</span><strong>${escapeHtml(stats.especiales.obtenidos)}/${escapeHtml(stats.especiales.total)}</strong></div>
          <div class="stats-pill"><span>Coca-Cola</span><strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong></div>
          <div class="stats-pill"><span>Edición</span><strong>Alemania</strong></div>
        </div>
      </article>
      <article class="stats-panel">
        <h3>Progreso por grupo</h3>
        <div class="rank-list">
          ${stats.byGroup
            .map(
              (group) => `
                <div class="rank-row">
                  <div>
                    <strong>${escapeHtml(group.label)}</strong>
                    <span>${escapeHtml(group.obtenidos)} de ${escapeHtml(group.total)}</span>
                  </div>
                  <div class="progress-bar progress-bar--tight"><span style="width:${group.progress.toFixed(1)}%;background:${group.color}"></span></div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
      <article class="stats-panel">
        <h3>Selecciones con más progreso</h3>
        <div class="rank-list">
          ${selectionProgress
            .map(
              (selection) => `
                <div class="rank-row">
                  <div>
                    <strong>${escapeHtml(selection.label)}</strong>
                    <span>Grupo ${escapeHtml(selection.group)} · Pág. ${escapeHtml(selection.page)}</span>
                  </div>
                  <div class="progress-bar progress-bar--tight"><span style="width:${selection.progress.toFixed(1)}%;background:${selection.color}"></span></div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
    </section>
  `;
}

function renderApp() {
  saveViewState();
  renderSectionTabs();
  renderFilters();
  renderSelectOptions();

  const filtered = filterStickers(state.stickers, {
    section: state.section,
    filter: state.filter,
    query: state.query,
    selectedGroup: state.selectedGroup,
    selectedTeam: state.selectedTeam,
    selectedPage: state.selectedPage,
  });

  const stats = computeStats(state.stickers);
  renderOverview(stats);
  renderStatus();

  document.querySelector("#query-input").value = state.query;
  document.querySelector("#section-title").textContent = SECTION_LABELS[state.section];
  document.querySelector("#results-count").textContent = `${filtered.length} stickers visibles`;
  document.querySelector("#view-mode").value = state.viewMode;

  if (state.section === "stats") {
    renderStatsView(stats);
  } else {
    renderCollectionView(filtered);
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.querySelector("#auth-email").value.trim();
  const password = document.querySelector("#auth-password").value.trim();

  if (!state.config.url || !state.config.anonKey) {
    showToast("Configura Supabase antes de iniciar sesión.");
    openModal("#config-modal");
    return;
  }

  if (!isAuthRuntimeAvailable()) {
    showToast("El login requiere abrir la app desde localhost o GitHub Pages.");
    return;
  }

  const supabase = await ensureSupabaseClient();
  const action =
    state.authMode === "register"
      ? supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.href },
        })
      : supabase.auth.signInWithPassword({ email, password });

  const { error } = await action;
  if (error) {
    showToast(error.message);
    return;
  }

  closeModal("#auth-modal");
  showToast(
    state.authMode === "register"
      ? "Cuenta creada. Revisa tu correo si Supabase pide confirmación."
      : "Sesión iniciada.",
  );
}

async function handleSignOut() {
  if (!state.supabase) {
    return;
  }

  await state.supabase.auth.signOut();
  state.session = null;
  state.stickers = state.catalog;
  renderApp();
}

async function handleResetAlbum() {
  if (!state.session || !state.supabase) {
    showToast("Necesitas una sesión activa para reiniciar el álbum.");
    return;
  }

  if (!window.confirm("¿Seguro que quieres borrar todo tu progreso sincronizado?")) {
    return;
  }

  const { error } = await state.supabase
    .from("user_sticker_progress")
    .delete()
    .eq("user_id", state.session.user.id);

  if (error) {
    showToast("No se pudo reiniciar el álbum.");
    return;
  }

  state.stickers = state.catalog;
  renderApp();
  showToast("Álbum reiniciado.");
}

async function exportPdf(mode) {
  if (!state.session || !isAuthRuntimeAvailable()) {
    openModal("#auth-modal");
    return;
  }

  const { jsPDF } = await import("https://esm.sh/jspdf@2.5.1");
  const stickers = sortStickers(
    filterStickers(state.stickers, {
      section: mode === "faltantes" ? "faltantes" : "repetidos",
      filter: mode,
      query: "",
      selectedGroup: "all",
      selectedTeam: "all",
      selectedPage: "all",
    }),
  );

  const doc = new jsPDF();
  const dateStamp = new Date().toLocaleString("es-ES");
  let y = 18;

  doc.setFontSize(18);
  doc.text(
    mode === "faltantes"
      ? "Panini 2026 · Faltantes"
      : "Panini 2026 · Repetidos",
    14,
    y,
  );
  y += 8;
  doc.setFontSize(10);
  doc.text(`Usuario: ${state.session.user.email}`, 14, y);
  y += 6;
  doc.text(`Generado: ${dateStamp}`, 14, y);
  y += 8;

  stickers.forEach((sticker, index) => {
    if (y > 280) {
      doc.addPage();
      y = 18;
    }

    const line =
      mode === "faltantes"
        ? `${sticker.grupo} · ${sticker.pais} · ${sticker.numero} · ${sticker.nombre}`
        : `${sticker.grupo} · ${sticker.pais} · ${sticker.numero} · ${sticker.nombre} · x${sticker.repetidos}`;

    const wrapped = doc.splitTextToSize(line, 180);
    doc.text(wrapped, 14, y);
    y += wrapped.length * 6;

    if (index === stickers.length - 1 && stickers.length === 0) {
      doc.text("No hay stickers para exportar.", 14, y);
    }
  });

  if (stickers.length === 0) {
    doc.text("No hay stickers para exportar.", 14, y);
  }

  doc.save(
    mode === "faltantes"
      ? "panini-faltantes-germany.pdf"
      : "panini-repetidos-germany.pdf",
  );
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      state.section = sectionButton.dataset.section;
      renderApp();
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.filter = filterButton.dataset.filter;
      renderApp();
      return;
    }

    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "toggle-sticker") {
      await updateSticker(action.dataset.stickerId, applyStickerClick);
      return;
    }

    if (action?.dataset.action === "correct-sticker") {
      await updateSticker(action.dataset.stickerId, applyStickerCorrection);
      return;
    }

    if (event.target.closest("#auth-trigger")) {
      if (!state.config.url || !state.config.anonKey) {
        openModal("#config-modal");
      } else if (!isAuthRuntimeAvailable()) {
        showToast("Usa localhost o GitHub Pages para iniciar sesión.");
      } else if (state.session) {
        showToast(`Conectado como ${state.session.user.email}`);
      } else {
        openModal("#auth-modal");
      }
      return;
    }

    if (event.target.closest("#sign-out-button")) {
      await handleSignOut();
      return;
    }

    if (event.target.closest("[data-modal-close]")) {
      closeModal(event.target.closest("[data-modal-close]").dataset.modalCloseTarget);
      return;
    }

    if (event.target.closest("#open-config")) {
      openModal("#config-modal");
      return;
    }

    if (event.target.closest("#open-auth")) {
      openModal("#auth-modal");
      return;
    }

    if (event.target.closest("#toggle-auth-mode")) {
      state.authMode = state.authMode === "login" ? "register" : "login";
      document.querySelector("#auth-title").textContent =
        state.authMode === "login" ? "Iniciar sesión" : "Crear cuenta";
      document.querySelector("#auth-submit").textContent =
        state.authMode === "login" ? "Entrar" : "Registrarme";
      document.querySelector("#toggle-auth-mode").textContent =
        state.authMode === "login"
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión";
      return;
    }

    if (event.target.closest("#reset-album")) {
      await handleResetAlbum();
      return;
    }

    if (event.target.closest("#download-missing-pdf")) {
      await exportPdf("faltantes");
      return;
    }

    if (event.target.closest("#download-repeated-pdf")) {
      await exportPdf("repetidos");
    }
  });

  document.querySelector("#query-input").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderApp();
  });

  document.querySelector("#view-mode").addEventListener("change", (event) => {
    state.viewMode = event.target.value;
    renderApp();
  });

  document.querySelector("#group-select").addEventListener("change", (event) => {
    state.selectedGroup = event.target.value;
    state.selectedTeam = "all";
    renderApp();
  });

  document.querySelector("#team-select").addEventListener("change", (event) => {
    state.selectedTeam = event.target.value;
    renderApp();
  });

  document.querySelector("#page-select").addEventListener("change", (event) => {
    state.selectedPage = event.target.value;
    renderApp();
  });

  document.querySelector("#auth-form").addEventListener("submit", handleAuthSubmit);

  document.querySelector("#config-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextConfig = {
      url: document.querySelector("#supabase-url").value.trim(),
      anonKey: document.querySelector("#supabase-anon-key").value.trim(),
    };
    const validation = validateSupabaseConfig(nextConfig);
    if (!validation.valid) {
      showToast(validation.message);
      return;
    }

    state.config = nextConfig;
    saveConfig(state.config);
    if (state.authSubscription) {
      state.authSubscription.unsubscribe();
      state.authSubscription = null;
    }
    state.supabase = null;
    state.session = null;
    await ensureSupabaseClient();
    await loadRemoteProgress();
    closeModal("#config-modal");
    renderApp();
    showToast("Configuración de Supabase guardada.");
  });
}

async function hydrateApp() {
  loadViewState();
  document.querySelector("#supabase-url").value = state.config.url || "";
  document.querySelector("#supabase-anon-key").value = state.config.anonKey || "";
  bindEvents();
  await ensureSupabaseClient();
  await loadRemoteProgress();
  renderApp();
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    hydrateApp().catch((error) => {
      console.error(error);
      showToast("No pudimos inicializar la aplicación.");
    });
  });
}
