import { ALBUM_METADATA, GROUPS, SELECTIONS, STICKERS, TEAM_COLORS } from "./data.js";

function getTeamFlagStyle(teamCode, fallbackColor = "#c2c6d3") {
  const flags = {
    MEX: "linear-gradient(to right, #006847 0 33.33%, #ffffff 33.33% 66.66%, #ce1126 66.66% 100%)",
    RSA: "linear-gradient(to bottom, #de3831 0 33.33%, #ffffff 33.33% 66.66%, #002395 66.66% 100%)",
    KOR: "#ffffff",
    CZE: "linear-gradient(to bottom, #ffffff 0 50%, #d7141a 50% 100%)",
    CAN: "linear-gradient(to right, #d52b1e 0 25%, #ffffff 25% 75%, #d52b1e 75% 100%)",
    BIH: "linear-gradient(135deg, #002f6c 0 62%, #fcd116 62% 70%, #002f6c 70% 100%)",
    QAT: "linear-gradient(to right, #8a1538 0 70%, #ffffff 70% 100%)",
    SUI: "#d52b1e",
    BRA: "#009b3a", MAR: "#c1272d", HAI: "linear-gradient(to bottom, #00209f 0 50%, #d21034 50% 100%)", SCO: "#005eb8",
    USA: "repeating-linear-gradient(to bottom, #b22234 0 8%, #ffffff 8% 16%)", PAR: "linear-gradient(to right, #d52b1e 0 33.33%, #ffffff 33.33% 66.66%, #0038a8 66.66% 100%)", AUS: "#012169", TUR: "#e30a17",
    GER: "linear-gradient(to bottom, #000000 0 33.33%, #dd0000 33.33% 66.66%, #ffce00 66.66% 100%)", CUW: "linear-gradient(to bottom, #002b7f 0 100%)", CIV: "linear-gradient(to right, #f77f00 0 33.33%, #ffffff 33.33% 66.66%, #009e60 66.66% 100%)", ECU: "linear-gradient(to bottom, #fcd116 0 50%, #003893 50% 75%, #ce1126 75% 100%)",
    NED: "linear-gradient(to bottom, #ae1c28 0 33.33%, #ffffff 33.33% 66.66%, #21468b 66.66% 100%)", JPN: "#ffffff", SWE: "#006aa7", TUN: "#e70013",
    BEL: "linear-gradient(to right, #000000 0 33.33%, #ffe936 33.33% 66.66%, #ef3340 66.66% 100%)", EGY: "linear-gradient(to bottom, #ce1126 0 33.33%, #ffffff 33.33% 66.66%, #000000 66.66% 100%)", IRN: "linear-gradient(to bottom, #239f40 0 33.33%, #ffffff 33.33% 66.66%, #da0000 66.66% 100%)", NZL: "#00247d",
    ESP: "linear-gradient(to bottom, #aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75% 100%)", CPV: "#003893", KSA: "#006c35", URU: "repeating-linear-gradient(to bottom, #ffffff 0 12.5%, #5eb6e4 12.5% 25%)",
    FRA: "linear-gradient(to right, #0055a4 0 33.33%, #ffffff 33.33% 66.66%, #ef4135 66.66% 100%)", SEN: "linear-gradient(to right, #00853f 0 33.33%, #fdef42 33.33% 66.66%, #e31b23 66.66% 100%)", IRQ: "linear-gradient(to bottom, #ce1126 0 33.33%, #ffffff 33.33% 66.66%, #000000 66.66% 100%)", NOR: "#ba0c2f",
    ARG: "linear-gradient(to bottom, #74acdf 0 33.33%, #ffffff 33.33% 66.66%, #74acdf 66.66% 100%)", ALG: "linear-gradient(to right, #006233 0 50%, #ffffff 50% 100%)", AUT: "linear-gradient(to bottom, #ed2939 0 33.33%, #ffffff 33.33% 66.66%, #ed2939 66.66% 100%)", JOR: "linear-gradient(to bottom, #000000 0 33.33%, #ffffff 33.33% 66.66%, #007a3d 66.66% 100%)",
    POR: "linear-gradient(to right, #006600 0 40%, #ff0000 40% 100%)", COD: "#00a3e0", UZB: "linear-gradient(to bottom, #1eb5e6 0 33.33%, #ffffff 33.33% 66.66%, #1eb53a 66.66% 100%)", COL: "linear-gradient(to bottom, #fcd116 0 50%, #003893 50% 75%, #ce1126 75% 100%)",
    ENG: "#ffffff", CRO: "linear-gradient(to bottom, #ff0000 0 33.33%, #ffffff 33.33% 66.66%, #171796 66.66% 100%)", GHA: "linear-gradient(to bottom, #ce1126 0 33.33%, #fcd116 33.33% 66.66%, #006b3f 66.66% 100%)", PAN: "linear-gradient(to bottom, #ffffff 0 50%, #d21034 50% 100%)",
  };

  return flags[teamCode] || fallbackColor;
}


const STORAGE_KEYS = {
  config: "panini-supabase-config",
  view: "panini-ui-view",
};

const DEFAULT_SUPABASE_CONFIG = {
  url: "https://aeavyxfybxiqrfjrriqe.supabase.co",
  anonKey: "sb_publishable_6J5tU2ZuqOR8ONsLyYYc_g_EzbB_Bh8",
};

const SECTION_LABELS = {
  inicio: "Inicio",
  all: "Todos los cromos",
  repetidos: "Mis repetidos",
  faltantes: "Me faltan",
  especiales: "Especiales",
  "coca-cola": "Coca-Cola",
  stats: "Estadísticas",
};

const SECTION_ICONS = {
  inicio: "home",
  all: "menu_book",
  repetidos: "swap_horiz",
  faltantes: "star_outline",
  especiales: "auto_awesome",
  "coca-cola": "local_drink",
  stats: "query_stats",
};

const SECTION_SHORT = {
  inicio: "Inicio",
  all: "Álbum",
  repetidos: "Repetidos",
  faltantes: "Faltan",
  especiales: "Especiales",
  "coca-cola": "Coca",
  stats: "Stats",
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
  section: "inicio",
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

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function sanitizeDuplicates(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return Math.min(parsed, 99);
}

export function validateStickerId(stickerId) {
  return /^(FWC([1-9]|1[0-9]|20)|CC([1-9]|1[0-2])|[A-Z]{3}([1-9]|1[0-9]|20))$/.test(
    String(stickerId || ""),
  );
}

function isFileProtocol() {
  return typeof window !== "undefined" && window.location.protocol === "file:";
}

function isAuthRuntimeAvailable() {
  return !isFileProtocol();
}

export function validateSupabaseConfig(config) {
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
    return { ...DEFAULT_SUPABASE_CONFIG };
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.config));
    if (saved && saved.url && saved.anonKey) {
      return saved;
    }
  } catch {
    // fall through to defaults
  }
  return { ...DEFAULT_SUPABASE_CONFIG };
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
      // query is intentionally NOT restored — searches should not persist across page loads
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
      // query is intentionally excluded — searches should not persist across page loads
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
    progressRows
      .filter((row) => validateStickerId(row.sticker_id))
      .map((row) => [
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

  let createClient;
  try {
    ({ createClient } = await import("https://esm.sh/@supabase/supabase-js@2.49.8"));
  } catch {
    console.warn("Could not load Supabase SDK — running in offline mode.");
    return null;
  }
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
    setBannerMessage("No pudimos sincronizar tu progreso. Intenta de nuevo en unos segundos.", "warning");
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

  if (!validateStickerId(sticker.id)) {
    showToast("El identificador del sticker no es válido.");
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
    showToast("No se pudo guardar tu cambio. Intenta de nuevo.");
    return false;
  }

  return true;
}

async function updateSticker(stickerId, updater) {
  if (!isAuthRuntimeAvailable()) {
    showToast("La edición de stickers requiere abrir la app desde localhost o GitHub Pages.");
    return;
  }

  if (!state.session) {
    openModal("#auth-modal");
    return;
  }

  const current = state.stickers.find((item) => item.id === stickerId);
  if (!current) {
    showToast("No encontramos ese sticker en el catálogo.");
    return;
  }
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
          ${escapeHtml(label)}
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
      .map((team) => `<option value="${escapeHtml(team.country)}">${escapeHtml(team.country)}</option>`)
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
  const desktopTabs = Object.entries(SECTION_LABELS)
    .map(
      ([value]) => `
        <button class="section-tab ${state.section === value ? "is-active" : ""}" data-section="${value}">
          <span class="material-symbols-outlined">${SECTION_ICONS[value]}</span>
          <span>${escapeHtml(SECTION_SHORT[value])}</span>
        </button>
      `,
    )
    .join("");

  const mobileTabs = Object.entries(SECTION_LABELS)
    .map(
      ([value, label]) => `
        <button class="mobile-tab ${state.section === value ? "is-active" : ""}" data-section="${value}" title="${escapeHtml(label)}">
          <span class="material-symbols-outlined">${SECTION_ICONS[value]}</span>
          <span>${escapeHtml(SECTION_SHORT[value])}</span>
        </button>
      `,
    )
    .join("");

  document.querySelector("#section-tabs").innerHTML = desktopTabs;
  document.querySelector("#mobile-nav").innerHTML = mobileTabs;
}

function renderStatus() {
  const authButton = document.querySelector("#auth-trigger");
  const signOutButton = document.querySelector("#sign-out-button");
  const syncStatus = document.querySelector("#sync-status");

  if (!isAuthRuntimeAvailable()) {
    authButton.textContent = "Solo lectura";
    signOutButton.hidden = true;
    setBannerMessage(
      "Abre la app desde un servidor (http://localhost o GitHub Pages) para iniciar sesión.",
      "warning",
    );
  } else if (!state.session) {
    authButton.textContent = "Iniciar sesión";
    signOutButton.hidden = true;
    setBannerMessage(
      "Modo lectura. Inicia sesión para marcar cromos, generar PDFs y sincronizar tu progreso entre dispositivos.",
      "muted",
    );
  } else {
    authButton.textContent = state.session.user.email.split("@")[0];
    signOutButton.hidden = false;
    setBannerMessage("", "success");
  }

  syncStatus.innerHTML = state.isSyncing
    ? '<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Sincronizando…'
    : '<span class="w-2 h-2 rounded-full bg-secondary"></span> Sincronizado';
}

function renderOverview(stats) {
  const pct = stats.porcentaje.toFixed(1);

  const percentEl = document.querySelector("#progress-percent");
  const barEl = document.querySelector("#progress-bar");
  const detailEl = document.querySelector("#progress-detail");
  if (percentEl) percentEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (detailEl) detailEl.textContent = `${stats.obtenidos} / ${stats.total} stickers`;

  document.querySelector("#stats-summary").innerHTML = `
    <article class="metric-card tone-success">
      <span>Obtenidos</span>
      <strong>${escapeHtml(stats.obtenidos)}</strong>
      <small>${escapeHtml(pct)}% del álbum</small>
    </article>
    <article class="metric-card tone-error">
      <span>Faltantes</span>
      <strong>${escapeHtml(stats.faltantes)}</strong>
      <small>aún por pegar</small>
    </article>
    <article class="metric-card">
      <span>Repetidos</span>
      <strong>${escapeHtml(stats.repetidos)}</strong>
      <small>disponibles para cambio</small>
    </article>
    <article class="metric-card tone-coke">
      <span>Coca-Cola</span>
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
  const accent = sticker.colorPais || sticker.colorGrupo || "#c2c6d3";
  const typePill = sticker.tipo && sticker.tipo !== "Normal"
    ? `<span class="type-pill">${escapeHtml(sticker.tipo)}</span>`
    : "";

  // The badge and remove button are placed OUTSIDE the <article> (which has
  // overflow:hidden) but inside a position:relative wrapper, so they are never clipped.
  return `
    <div class="sticker-card-wrap">
      <article
        class="sticker-card ${statusClass}${specialClass}${cokeClass}${authClass}"
        data-sticker-id="${sticker.id}"
        data-group="${sticker.grupo}"
        style="--team-accent:${accent};--group-accent:${sticker.colorGrupo}"
      >
        <button type="button" class="sticker-card__surface" data-action="toggle-sticker" data-sticker-id="${sticker.id}">
          <div class="sticker-card__top">
            ${typePill}
            <span class="number-plate">${escapeHtml(sticker.numero)}</span>
            <span class="page-pill">P${escapeHtml(sticker.pagina)}</span>
            ${isCocaColaSticker(sticker) ? '<span class="sticker-card__tag">Coca-Cola</span>' : ""}
          </div>
          <div class="sticker-card__bottom">
            <span class="sticker-card__id">${escapeHtml(sticker.id)}</span>
            <strong class="sticker-card__name">${escapeHtml(sticker.nombre)}</strong>
          </div>
        </button>
      </article>
      ${sticker.repetidos > 0 ? `<span class="sticker-card__badge">+${escapeHtml(sticker.repetidos)}</span>` : ""}
      <button type="button" class="sticker-card__remove" data-action="correct-sticker" data-sticker-id="${sticker.id}" aria-label="Corregir sticker">
        −
      </button>
    </div>
  `;
}

const WC2026_VENUES = [
  { city: "Los Ángeles", country: "USA", capacity: "93 000" },
  { city: "Nueva York / NJ", country: "USA", capacity: "82 500" },
  { city: "Dallas", country: "USA", capacity: "80 000" },
  { city: "San Francisco", country: "USA", capacity: "75 000" },
  { city: "Seattle", country: "USA", capacity: "69 000" },
  { city: "Miami", country: "USA", capacity: "65 326" },
  { city: "Atlanta", country: "USA", capacity: "71 000" },
  { city: "Kansas City", country: "USA", capacity: "76 416" },
  { city: "Houston", country: "USA", capacity: "72 220" },
  { city: "Boston", country: "USA", capacity: "65 624" },
  { city: "Philadelphia", country: "USA", capacity: "69 176" },
  { city: "Ciudad de México", country: "MEX", capacity: "87 523" },
  { city: "Guadalajara", country: "MEX", capacity: "48 071" },
  { city: "Monterrey", country: "MEX", capacity: "51 350" },
  { city: "Toronto", country: "CAN", capacity: "45 000" },
  { city: "Vancouver", country: "CAN", capacity: "54 500" },
];

function renderHomeView(stats) {
  const content = document.querySelector("#collection-content");
  const pct = stats.porcentaje.toFixed(1);

  const topGroups = [...stats.byGroup].sort((a, b) => b.progress - a.progress).slice(0, 3);

  const groupsGrid = GROUPS.map((group) => {
    const groupStats = stats.byGroup.find((g) => g.key === group.letter);
    const groupPct = groupStats ? groupStats.progress.toFixed(0) : 0;
    const teamPills = group.teams
      .map(
        (t) =>
          `<span class="home-team-pill" style="--team-accent:${TEAM_COLORS[t.code] || group.color}">
            <span class="home-team-pill__dot"></span>
            ${escapeHtml(t.code)}
          </span>`,
      )
      .join("");
    return `
      <div class="home-group-card" style="--group-accent:${group.color}">
        <div class="home-group-card__header">
          <span class="home-group-card__letter">Grupo ${escapeHtml(group.letter)}</span>
          <span class="home-group-card__pct">${groupPct}%</span>
        </div>
        <div class="home-group-card__teams">${teamPills}</div>
        <div class="home-group-card__bar">
          <span style="width:${groupPct}%;background:${group.color}"></span>
        </div>
      </div>
    `;
  }).join("");

  const venueRows = WC2026_VENUES.map(
    (v) => `
      <div class="home-venue-row">
        <span class="home-venue-row__city">${escapeHtml(v.city)}</span>
        <span class="home-venue-row__country">${escapeHtml(v.country)}</span>
        <span class="home-venue-row__cap">${escapeHtml(v.capacity)}</span>
      </div>
    `,
  ).join("");

  content.innerHTML = `
    <!-- HERO -->
    <section class="home-hero">
      <div class="home-hero__inner">
        <p class="home-hero__eyebrow">Panini Official · Edición Alemania</p>
        <h1 class="home-hero__title">FIFA World Cup 2026™</h1>
        <p class="home-hero__dates">11 Jun – 19 Jul 2026</p>
        <div class="home-hero__hosts">
          <span class="home-host-badge home-host-badge--usa">Estados Unidos</span>
          <span class="home-host-badge home-host-badge--can">Canadá</span>
          <span class="home-host-badge home-host-badge--mex">México</span>
        </div>
      </div>
      <div class="home-hero__kpis">
        <div class="home-kpi"><strong>48</strong><small>selecciones</small></div>
        <div class="home-kpi"><strong>12</strong><small>grupos</small></div>
        <div class="home-kpi"><strong>104</strong><small>partidos</small></div>
        <div class="home-kpi"><strong>16</strong><small>sedes</small></div>
      </div>
    </section>

    <!-- ALBUM PROGRESS -->
    <section class="home-card">
      <h2 class="home-card__title">Mi álbum</h2>
      <div class="home-album-bar">
        <div class="home-album-bar__track">
          <div class="home-album-bar__fill" style="width:${pct}%"></div>
        </div>
        <span class="home-album-bar__pct">${pct}%</span>
      </div>
      <div class="home-album-metrics">
        <div class="home-album-metric home-album-metric--owned">
          <strong>${escapeHtml(stats.obtenidos)}</strong><span>obtenidos</span>
        </div>
        <div class="home-album-metric home-album-metric--missing">
          <strong>${escapeHtml(stats.faltantes)}</strong><span>faltantes</span>
        </div>
        <div class="home-album-metric">
          <strong>${escapeHtml(stats.repetidos)}</strong><span>repetidos</span>
        </div>
        <div class="home-album-metric home-album-metric--coke">
          <strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong><span>Coca-Cola</span>
        </div>
        <div class="home-album-metric">
          <strong>${escapeHtml(stats.especiales.obtenidos)}/${escapeHtml(stats.especiales.total)}</strong><span>especiales</span>
        </div>
        <div class="home-album-metric">
          <strong>${escapeHtml(stats.total)}</strong><span>stickers totales</span>
        </div>
      </div>
    </section>

    <!-- GROUPS GRID -->
    <section class="home-card">
      <h2 class="home-card__title">Los 12 grupos</h2>
      <div class="home-groups-grid">${groupsGrid}</div>
    </section>

    <!-- TOURNAMENT FORMAT + VENUES -->
    <div class="home-two-col">
      <section class="home-card">
        <h2 class="home-card__title">Formato del torneo</h2>
        <ol class="home-format-list">
          <li>
            <span class="home-format-list__label">Fase de grupos</span>
            <span class="home-format-list__desc">12 grupos de 4 equipos · 48 partidos · Los 2 primeros de cada grupo + 8 mejores terceros clasifican</span>
          </li>
          <li>
            <span class="home-format-list__label">Ronda de 32</span>
            <span class="home-format-list__desc">32 equipos · primera eliminatoria directa de la historia del mundial</span>
          </li>
          <li>
            <span class="home-format-list__label">Octavos de final</span>
            <span class="home-format-list__desc">16 equipos</span>
          </li>
          <li>
            <span class="home-format-list__label">Cuartos de final</span>
            <span class="home-format-list__desc">8 equipos</span>
          </li>
          <li>
            <span class="home-format-list__label">Semifinales</span>
            <span class="home-format-list__desc">4 equipos</span>
          </li>
          <li>
            <span class="home-format-list__label">Final</span>
            <span class="home-format-list__desc">MetLife Stadium · East Rutherford, NJ · 19 Jul 2026</span>
          </li>
        </ol>
      </section>

      <section class="home-card">
        <h2 class="home-card__title">Sedes (${WC2026_VENUES.length})</h2>
        <div class="home-venues">${venueRows}</div>
      </section>
    </div>

    <!-- ALBUM STRUCTURE -->
    <section class="home-card">
      <h2 class="home-card__title">Estructura del álbum</h2>
      <div class="home-album-structure">
        <div class="home-structure-item">
          <span class="home-structure-item__num">992</span>
          <span class="home-structure-item__label">stickers totales</span>
        </div>
        <div class="home-structure-item home-structure-item--accent">
          <span class="home-structure-item__num">48 × 20</span>
          <span class="home-structure-item__label">selecciones · 1 Logo + 1 Foto de equipo + 18 jugadores</span>
        </div>
        <div class="home-structure-item">
          <span class="home-structure-item__num">20</span>
          <span class="home-structure-item__label">especiales FWC · países sede, museos FIFA, leyendas</span>
        </div>
        <div class="home-structure-item home-structure-item--coke">
          <span class="home-structure-item__num">12</span>
          <span class="home-structure-item__label">Coca-Cola Germany · edición exclusiva Alemania</span>
        </div>
      </div>
    </section>
  `;
}

function renderGroupedByGroupAndTeam(stickers) {
  const sorted = sortStickers(stickers);

  const groupMap = new Map();
  sorted.forEach((sticker) => {
    const groupKey = sticker.grupo;
    if (!groupMap.has(groupKey)) groupMap.set(groupKey, new Map());
    const teamMap = groupMap.get(groupKey);
    const teamKey = sticker.pais;
    if (!teamMap.has(teamKey)) teamMap.set(teamKey, []);
    teamMap.get(teamKey).push(sticker);
  });

  return [...groupMap.entries()]
    .map(([groupKey, teamMap]) => {
      const groupInfo = GROUPS.find((g) => g.letter === groupKey);
      const groupColor = groupInfo?.color || "#003e7a";
      const groupLabel =
        groupKey === "Especiales"
          ? "Especiales FWC"
          : groupKey === "Coca-Cola"
            ? "Coca-Cola Germany"
            : `Grupo ${groupKey}`;

      const allGroupStickers = [...teamMap.values()].flat();
      const groupObtained = allGroupStickers.filter((s) => s.obtenido).length;

      const teamPills = groupInfo?.teams
        ? groupInfo.teams
            .map((t) => `<span class="team-code-pill">${escapeHtml(t.code)}</span>`)
            .join("")
        : "";

      const teamSections = [...teamMap.entries()]
        .map(([teamKey, teamStickers]) => {
          const obtained = teamStickers.filter((s) => s.obtenido).length;
          const first = teamStickers[0];
          const teamAccent = first?.colorPais || groupColor;
          const teamCode = first?.equipoCodigo || "";
          const teamPage = first?.paginaInicioSeleccion;
          const pageLabel = teamPage ? ` · Pág. ${teamPage}` : "";

          return `
            <div class="team-subsection">
              <div class="team-header">
                <div class="team-flag" style="--team-flag:${getTeamFlagStyle(teamCode, teamAccent)};--team-accent:${teamAccent}"></div>
                <div class="team-header__info">
                  ${teamCode ? `<span class="team-header__code">${escapeHtml(teamCode)}</span>` : ""}
                  <span class="team-header__label">${escapeHtml(teamKey)}${pageLabel}</span>
                </div>
                <span class="team-progress">${obtained} / ${teamStickers.length}</span>
              </div>
              <div class="sticker-grid">
                ${teamStickers.map(renderStickerCard).join("")}
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <section class="board-section">
          <div class="group-header" style="--group-accent:${groupColor}">
            <div class="group-header__left">
              <h2>${escapeHtml(groupLabel)}</h2>
              ${teamPills ? `<div class="group-codes">${teamPills}</div>` : ""}
            </div>
            <span class="team-progress">${groupObtained} / ${allGroupStickers.length}</span>
          </div>
          ${teamSections}
        </section>
      `;
    })
    .join("");
}

function renderCollectionView(stickers) {
  const content = document.querySelector("#collection-content");

  if (!stickers.length) {
    content.innerHTML = `
      <section class="empty-state">
        <h3>No hay stickers para esta vista</h3>
        <p>Prueba con otro filtro, cambia la agrupación o limpia la búsqueda.</p>
      </section>
    `;
    return;
  }

  if (state.viewMode === "group") {
    content.innerHTML = renderGroupedByGroupAndTeam(stickers);
    return;
  }

  const groups = groupStickers(stickers, state.viewMode);
  content.innerHTML = groups
    .map((group) => {
      const obtained = group.stickers.filter((sticker) => sticker.obtenido).length;
      const firstSticker = group.stickers[0];
      const teamAccent = firstSticker?.colorPais || firstSticker?.colorGrupo || "#003e7a";

      return `
        <section class="board-section">
          <div class="team-header">
            <div class="team-flag" style="--team-flag:${getTeamFlagStyle(firstSticker?.equipoCodigo, teamAccent)};--team-accent:${teamAccent}"></div>
            <h3>${escapeHtml(group.label)}</h3>
            <span class="team-progress">${escapeHtml(obtained)} / ${escapeHtml(group.stickers.length)}</span>
          </div>
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
  document.querySelector("#view-mode").value = state.viewMode;

  // Hide album chrome on home / stats pages
  const isAlbumSection = !["inicio", "stats"].includes(state.section);
  document.querySelector("#album-header").classList.toggle("is-hidden", !isAlbumSection);
  document.querySelector("#read-only-banner").classList.toggle("is-hidden", !isAlbumSection);
  document.querySelector("#controls-panel").classList.toggle("is-hidden", !isAlbumSection);

  if (isAlbumSection) {
    document.querySelector("#section-title").textContent = SECTION_LABELS[state.section];
    document.querySelector("#results-count").textContent = `${filtered.length} stickers visibles`;
  }

  if (state.section === "inicio") {
    renderHomeView(stats);
  } else if (state.section === "stats") {
    renderStatsView(stats);
  } else {
    renderCollectionView(filtered);
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.querySelector("#auth-email").value.trim();
  const password = document.querySelector("#auth-password").value.trim();

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
          options: { emailRedirectTo: window.location.origin + window.location.pathname },
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
      ? "Cuenta creada. Revisa tu correo si te pide confirmar."
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
  if (!isAuthRuntimeAvailable()) {
    showToast("La exportación autenticada requiere localhost o GitHub Pages.");
    return;
  }

  if (!state.session) {
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
    if (y + wrapped.length * 6 > 280) {
      doc.addPage();
      y = 18;
    }
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
      // Reset transient UI state on section change so the new view is never
      // contaminated by a search or filter left over from another section.
      state.query = "";
      state.filter = "todos";
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
      if (!isAuthRuntimeAvailable()) {
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

    if (event.target.closest("#open-auth")) {
      if (!isAuthRuntimeAvailable()) {
        showToast("El login necesita abrir la app desde localhost o GitHub Pages.");
      } else {
        openModal("#auth-modal");
      }
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
}

async function hydrateApp() {
  loadViewState();
  bindEvents();
  try {
    await ensureSupabaseClient();
    await loadRemoteProgress();
  } catch (err) {
    console.warn("Supabase not available:", err.message);
  }
  renderApp(); // always render, even without auth
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    hydrateApp().catch((error) => {
      console.error(error);
      showToast("No pudimos inicializar la aplicación.");
    });
  });
}
