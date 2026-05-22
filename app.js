import { ALBUM_METADATA, GROUPS, SELECTIONS, STICKERS, TEAM_COLORS, TEAM_FLAG_STYLES, TEAM_FLAG_EMOJIS } from "./data.js";

function getTeamFlagStyle(teamCode, fallbackColor = "#c2c6d3") {
  return TEAM_FLAG_STYLES[teamCode] || TEAM_COLORS[teamCode] || fallbackColor;
}

function getTeamFlagEmoji(teamCode) {
  return TEAM_FLAG_EMOJIS[teamCode] || "🏳️";
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
  "team-photos": "Team Photos",
  logos: "Logos",
};

// ─── i18n ────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    // Sections
    inicio:"Inicio", all:"Todos los cromos", repetidos:"Mis repetidos",
    faltantes:"Me faltan", especiales:"Especiales", "coca-cola":"Coca-Cola", stats:"Estadísticas",
    "short.inicio":"Inicio","short.all":"Álbum","short.repetidos":"Repetidos",
    "short.faltantes":"Faltan","short.especiales":"Especiales","short.coca-cola":"Coca","short.stats":"Stats",
    // Filters
    "filter.todos":"Todos","filter.obtenidos":"Obtenidos","filter.repetidos":"Repetidos",
    "filter.faltantes":"Faltantes","filter.especiales":"Especiales","filter.coca-cola":"Coca-Cola",
    "filter.escudos":"Escudos","filter.estadios":"Estadios","filter.team-photos":"Fotos de equipo","filter.logos":"FWC",
    // Controls
    group_by:"Agrupar por", group:"Grupo", selection:"Selección", page:"Página",
    all_groups:"Todos los grupos", group_letter:"Grupo", all_selections:"Todas las selecciones",
    all_pages:"Todas las páginas", page_abbr:"Pág.", page_full:"Página",
    // Status / auth
    syncing:"Sincronizando…", synced:"Sincronizado", read_only:"Solo lectura", sign_in:"Iniciar sesión",
    search_placeholder:"Buscar país, jugador, número…",
    "banner.file_protocol":"Abre la app desde un servidor (http://localhost o GitHub Pages) para iniciar sesión.",
    "banner.not_signed_in":"Modo lectura. Inicia sesión para marcar cromos, generar PDFs y sincronizar tu progreso entre dispositivos.",
    // Sidebar stats
    obtained:"Obtenidos", missing:"Faltantes", duplicates:"Repetidos",
    yet_to_paste:"aún por pegar", available_for_trade:"disponibles para cambio", pct_of_album:"% del álbum",
    global_progress:"Progreso global", stickers_visible:"stickers visibles", stickers_visible_short:"stickers visibles",
    // Sidebar actions
    actions:"Acciones", pdf_missing:"PDF de faltantes", pdf_duplicates:"PDF de repetidos",
    sign_in_register:"Iniciar sesión / registro", reset_progress:"Reiniciar progreso",
    sync_note:"Tu progreso se sincroniza en la nube cuando inicias sesión.",
    language_label:"Idioma", language:"Idioma",
    // Stats view
    "stats.overview":"Panorama general","stats.completed":"Completado",
    "stats.by_category":"Por categoría","stats.team":"Selecciones",
    "stats.top_selections":"Selecciones con más progreso","stats.by_group":"Progreso por grupo",
    "stats.priority":"Pendientes prioritarios","stats.selections_100":"Selecciones al 100%",
    "stats.groups_100":"Grupos al 100%","stats.especiales_pending":"Especiales pendientes",
    "stats.coke_pending":"Coca-Cola pendientes","stats.lagging":"Selecciones más rezagadas",
    "stats.of":"de","stats.edition":"Alemania","stats.edition_label":"Versión",
    // Empty state
    "empty.title":"No hay stickers para esta vista",
    "empty.desc":"Prueba con otro filtro, cambia la agrupación o limpia la búsqueda.",
    // Auth
    "auth.account":"Cuenta","auth.title.login":"Iniciar sesión","auth.title.register":"Crear cuenta",
    "auth.google":"Continuar con Google","auth.or_email":"o con email",
    "auth.email":"Email","auth.password":"Contraseña",
    "auth.forgot_password":"¿Olvidaste tu contraseña?",
    "auth.submit.login":"Entrar","auth.submit.register":"Registrarme","auth.submit.reset":"Enviar enlace",
    "auth.toggle.to_register":"¿No tienes cuenta? Regístrate",
    "auth.toggle.to_login":"¿Ya tienes cuenta? Inicia sesión",
    "auth.toggle.back_to_login":"← Volver a iniciar sesión",
    "auth.title.reset":"Restablecer contraseña",
    "auth.reset_hint":"Ingresa tu email y te enviaremos un enlace para crear una nueva contraseña.",
    "auth.title.update":"Nueva contraseña",
    "auth.submit.update":"Guardar contraseña",
    "auth.update_hint":"Elige una nueva contraseña para tu cuenta.",
    "toast.password_updated":"Contraseña actualizada correctamente.",
    "toast.password_update_error":"No se pudo actualizar la contraseña.",
    "toast.reset_email_sent":"Si existe una cuenta con ese email, recibirás un enlace en tu bandeja de entrada.",
    "toast.reset_email_error":"No pudimos enviar el correo. Verifica el email e inténtalo de nuevo.",
    "auth.error.already_registered":"Este email ya está registrado. Inicia sesión o restablece tu contraseña.",
    "auth.error.invalid_credentials":"Email o contraseña incorrectos.",
    "auth.error.email_not_confirmed":"Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada.",
    "auth.error.weak_password":"La contraseña debe tener al menos 6 caracteres.",
    "auth.error.rate_limit":"Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
    "auth.error.invalid_email":"El formato del email no es válido.",
    "auth.error.link_expired":"Este link ha expirado. Solicita uno nuevo desde el formulario.",
    "home.album_title":"Mi álbum","home.groups":"Los 12 grupos","home.tournament":"Formato del torneo",
    "home.venues_title":"Sedes","home.album_structure":"Estructura del álbum",
    "home.selections":"selecciones","home.groups_count":"grupos","home.matches":"partidos","home.venues":"sedes",
    "home.obtained":"obtenidos","home.missing":"faltantes","home.duplicates":"repetidos",
    "home.specials":"especiales","home.total":"stickers totales",
    "home.stage.group":"Fase de grupos",
    "home.stage.group_desc":"12 grupos de 4 equipos · 48 partidos · Los 2 primeros de cada grupo + 8 mejores terceros clasifican",
    "home.stage.r32":"Ronda de 32","home.stage.r32_desc":"32 equipos · primera eliminatoria directa de la historia del mundial",
    "home.stage.r16":"Octavos de final","home.stage.r16_desc":"16 equipos",
    "home.stage.qf":"Cuartos de final","home.stage.qf_desc":"8 equipos",
    "home.stage.sf":"Semifinales","home.stage.sf_desc":"4 equipos",
    "home.stage.final":"Final","home.stage.final_desc":"MetLife Stadium · East Rutherford, NJ · 19 Jul 2026",
    "home.album.total":"stickers totales","home.album.selections":"selecciones · 1 Logo + 1 Foto de equipo + 18 jugadores",
    "home.album.specials":"especiales FWC · países sede, museos FIFA, leyendas",
    "home.album.coke":"Coca-Cola Germany · edición exclusiva Alemania",
    // Toasts / confirms
    "confirm.reset":"¿Seguro que quieres borrar todo tu progreso sincronizado?",
    "toast.sync_error":"No pudimos sincronizar tu progreso. Intenta de nuevo en unos segundos.",
    "toast.sign_in_required":"Inicia sesión para guardar tu progreso.",
    "toast.invalid_sticker":"El identificador del sticker no es válido.",
    "toast.save_error":"No se pudo guardar tu cambio. Intenta de nuevo.",
    "toast.file_protocol":"La edición de stickers requiere abrir la app desde localhost o GitHub Pages.",
    "toast.not_found":"No encontramos ese sticker en el catálogo.",
    "toast.reset_success":"Álbum reiniciado.","toast.reset_error":"No se pudo reiniciar el álbum.",
    "toast.no_stickers":"No hay stickers para exportar.",
    "toast.reset_session":"Necesitas una sesión activa para reiniciar el álbum.",
    "toast.account_created":"Cuenta creada. Revisa tu correo si te pide confirmar.",
    "toast.signed_in":"Sesión iniciada.","toast.connected_as":"Conectado como","toast.init_error":"No pudimos inicializar la aplicación.",
    "toast.use_server":"Usa localhost o GitHub Pages para iniciar sesión.",
    "toast.login_server":"El login requiere abrir la app desde localhost o GitHub Pages.",
    "toast.export_server":"La exportación autenticada requiere localhost o GitHub Pages.",
    "pdf.missing_title":"Panini 2026 · Faltantes","pdf.duplicates_title":"Panini 2026 · Repetidos",
    "pdf.user":"Usuario","pdf.generated":"Generado","pdf.filename_missing":"panini-faltantes-germany.pdf",
    "pdf.filename_duplicates":"panini-repetidos-germany.pdf",
  },
  en: {
    inicio:"Home", all:"All stickers", repetidos:"My duplicates",
    faltantes:"Missing", especiales:"Specials", "coca-cola":"Coca-Cola", stats:"Statistics",
    "short.inicio":"Home","short.all":"Album","short.repetidos":"Dupes",
    "short.faltantes":"Missing","short.especiales":"Specials","short.coca-cola":"Coke","short.stats":"Stats",
    "filter.todos":"All","filter.obtenidos":"Collected","filter.repetidos":"Duplicates",
    "filter.faltantes":"Missing","filter.especiales":"Specials","filter.coca-cola":"Coca-Cola",
    "filter.escudos":"Shields","filter.estadios":"Stadiums","filter.team-photos":"Team Photos","filter.logos":"FWC",
    group_by:"Group by", group:"Group", selection:"Selection", page:"Page",
    all_groups:"All groups", group_letter:"Group", all_selections:"All selections",
    all_pages:"All pages", page_abbr:"Pg.", page_full:"Page",
    syncing:"Syncing…", synced:"Synced", read_only:"Read only", sign_in:"Sign in",
    search_placeholder:"Search country, player, number…",
    "banner.file_protocol":"Open the app from a server (http://localhost or GitHub Pages) to sign in.",
    "banner.not_signed_in":"Read-only mode. Sign in to mark stickers, generate PDFs and sync your progress.",
    obtained:"Collected", missing:"Missing", duplicates:"Duplicates",
    yet_to_paste:"still to paste", available_for_trade:"available for trade", pct_of_album:"% of album",
    global_progress:"Global progress", stickers_visible:"stickers visible", stickers_visible_short:"stickers visible",
    actions:"Actions", pdf_missing:"PDF of missing", pdf_duplicates:"PDF of duplicates",
    sign_in_register:"Sign in / Register", reset_progress:"Reset progress",
    sync_note:"Your progress syncs to the cloud when you sign in.",
    language_label:"Language", language:"Language",
    "stats.overview":"Overview","stats.completed":"Completed",
    "stats.by_category":"By category","stats.team":"Selections",
    "stats.top_selections":"Top selections by progress","stats.by_group":"Progress by group",
    "stats.priority":"Priority pending","stats.selections_100":"Selections at 100%",
    "stats.groups_100":"Groups at 100%","stats.especiales_pending":"Specials pending",
    "stats.coke_pending":"Coca-Cola pending","stats.lagging":"Most lagging selections",
    "stats.of":"of","stats.edition":"Germany","stats.edition_label":"Version",
    "empty.title":"No stickers for this view",
    "empty.desc":"Try a different filter, change the grouping, or clear the search.",
    "auth.account":"Account","auth.title.login":"Sign in","auth.title.register":"Create account",
    "auth.google":"Continue with Google","auth.or_email":"or with email",
    "auth.email":"Email","auth.password":"Password",
    "auth.forgot_password":"Forgot your password?",
    "auth.submit.login":"Sign in","auth.submit.register":"Register","auth.submit.reset":"Send link",
    "auth.toggle.to_register":"Don't have an account? Register",
    "auth.toggle.to_login":"Already have an account? Sign in",
    "auth.toggle.back_to_login":"← Back to sign in",
    "auth.title.reset":"Reset password",
    "auth.reset_hint":"Enter your email and we'll send you a link to create a new password.",
    "auth.title.update":"New password",
    "auth.submit.update":"Save password",
    "auth.update_hint":"Choose a new password for your account.",
    "toast.password_updated":"Password updated successfully.",
    "toast.password_update_error":"Could not update password.",
    "toast.reset_email_sent":"If an account exists with that email, you'll receive a reset link in your inbox.",
    "toast.reset_email_error":"Could not send the email. Check the address and try again.",
    "auth.error.already_registered":"This email is already registered. Sign in or reset your password.",
    "auth.error.invalid_credentials":"Incorrect email or password.",
    "auth.error.email_not_confirmed":"Please confirm your email before signing in. Check your inbox.",
    "auth.error.weak_password":"Password must be at least 6 characters.",
    "auth.error.rate_limit":"Too many attempts. Please wait a few minutes and try again.",
    "auth.error.invalid_email":"The email format is not valid.",
    "auth.error.link_expired":"This link has expired. Please request a new one from the form.",
    "home.album_title":"My album","home.groups":"The 12 groups","home.tournament":"Tournament format",
    "home.venues_title":"Venues","home.album_structure":"Album structure",
    "home.selections":"selections","home.groups_count":"groups","home.matches":"matches","home.venues":"venues",
    "home.obtained":"collected","home.missing":"missing","home.duplicates":"duplicates",
    "home.specials":"specials","home.total":"total stickers",
    "home.stage.group":"Group stage",
    "home.stage.group_desc":"12 groups of 4 teams · 48 matches · Top 2 from each group + 8 best third-place teams advance",
    "home.stage.r32":"Round of 32","home.stage.r32_desc":"32 teams · first-ever direct knockout round in World Cup history",
    "home.stage.r16":"Round of 16","home.stage.r16_desc":"16 teams",
    "home.stage.qf":"Quarter-finals","home.stage.qf_desc":"8 teams",
    "home.stage.sf":"Semi-finals","home.stage.sf_desc":"4 teams",
    "home.stage.final":"Final","home.stage.final_desc":"MetLife Stadium · East Rutherford, NJ · 19 Jul 2026",
    "home.album.total":"total stickers","home.album.selections":"selections · 1 Logo + 1 Team photo + 18 players",
    "home.album.specials":"FWC specials · host nations, FIFA museums, legends",
    "home.album.coke":"Coca-Cola Germany · Germany exclusive edition",
    "confirm.reset":"Are you sure you want to delete all your synced progress?",
    "toast.sync_error":"Could not sync your progress. Please try again in a few seconds.",
    "toast.sign_in_required":"Sign in to save your progress.",
    "toast.invalid_sticker":"The sticker ID is not valid.",
    "toast.save_error":"Could not save your change. Please try again.",
    "toast.file_protocol":"Sticker editing requires opening the app from localhost or GitHub Pages.",
    "toast.not_found":"That sticker was not found in the catalog.",
    "toast.reset_success":"Album reset.","toast.reset_error":"Could not reset the album.",
    "toast.no_stickers":"No stickers to export.",
    "toast.reset_session":"You need an active session to reset the album.",
    "toast.account_created":"Account created. Check your email if asked to confirm.",
    "toast.signed_in":"Signed in.","toast.connected_as":"Signed in as","toast.init_error":"Could not initialize the application.",
    "toast.use_server":"Use localhost or GitHub Pages to sign in.",
    "toast.login_server":"Login requires opening the app from localhost or GitHub Pages.",
    "toast.export_server":"Authenticated export requires localhost or GitHub Pages.",
    "pdf.missing_title":"Panini 2026 · Missing","pdf.duplicates_title":"Panini 2026 · Duplicates",
    "pdf.user":"User","pdf.generated":"Generated","pdf.filename_missing":"panini-missing-germany.pdf",
    "pdf.filename_duplicates":"panini-duplicates-germany.pdf",
  },
};

function t(key) {
  return (TRANSLATIONS[state?.lang ?? "es"] ?? TRANSLATIONS.es)[key] ?? TRANSLATIONS.es[key] ?? key;
}

const COUNTRY_NAMES_ES = {
  MEX:"México", RSA:"Sudáfrica", KOR:"Corea del Sur", CZE:"República Checa",
  CAN:"Canadá", BIH:"Bosnia-Herzegovina", QAT:"Catar", SUI:"Suiza",
  BRA:"Brasil", MAR:"Marruecos", HAI:"Haití", SCO:"Escocia",
  USA:"EE.UU.", PAR:"Paraguay", AUS:"Australia", TUR:"Türkiye",
  GER:"Alemania", CUW:"Curazao", CIV:"Costa de Marfil", ECU:"Ecuador",
  NED:"Países Bajos", JPN:"Japón", SWE:"Suecia", TUN:"Túnez",
  BEL:"Bélgica", EGY:"Egipto", IRN:"Irán", NZL:"Nueva Zelanda",
  ESP:"España", CPV:"Cabo Verde", KSA:"Arabia Saudita", URU:"Uruguay",
  FRA:"Francia", SEN:"Senegal", IRQ:"Irak", NOR:"Noruega",
  ARG:"Argentina", ALG:"Argelia", AUT:"Austria", JOR:"Jordania",
  POR:"Portugal", COD:"Rep. Dem. Congo", UZB:"Uzbekistán", COL:"Colombia",
  ENG:"Inglaterra", CRO:"Croacia", GHA:"Ghana", PAN:"Panamá",
};

const COUNTRY_NAMES_EN = {
  MEX:"Mexico", RSA:"South Africa", KOR:"Korea Republic", CZE:"Czechia",
  CAN:"Canada", BIH:"Bosnia-Herzegovina", QAT:"Qatar", SUI:"Switzerland",
  BRA:"Brazil", MAR:"Morocco", HAI:"Haiti", SCO:"Scotland",
  USA:"USA", PAR:"Paraguay", AUS:"Australia", TUR:"Türkiye",
  GER:"Germany", CUW:"Curaçao", CIV:"Côte d'Ivoire", ECU:"Ecuador",
  NED:"Netherlands", JPN:"Japan", SWE:"Sweden", TUN:"Tunisia",
  BEL:"Belgium", EGY:"Egypt", IRN:"IR Iran", NZL:"New Zealand",
  ESP:"Spain", CPV:"Cabo Verde", KSA:"Saudi Arabia", URU:"Uruguay",
  FRA:"France", SEN:"Senegal", IRQ:"Iraq", NOR:"Norway",
  ARG:"Argentina", ALG:"Algeria", AUT:"Austria", JOR:"Jordan",
  POR:"Portugal", COD:"Congo DR", UZB:"Uzbekistan", COL:"Colombia",
  ENG:"England", CRO:"Croatia", GHA:"Ghana", PAN:"Panama",
};

function tCountry(code) {
  if (!code) return code;
  return (state?.lang === "en" ? COUNTRY_NAMES_EN : COUNTRY_NAMES_ES)[code] ?? code;
}

function applyStaticTranslations() {
  // Inputs with placeholder
  const qInput = document.querySelector("#query-input");
  if (qInput) qInput.placeholder = t("search_placeholder");
  // View mode select options
  const viewMode = document.querySelector("#view-mode");
  if (viewMode) {
    [...viewMode.options].forEach(opt => {
      if (opt.value === "group")     opt.text = t("group");
      if (opt.value === "selection") opt.text = t("selection");
      if (opt.value === "page")      opt.text = t("page");
    });
  }
  // Controls labels (first text-node children of label elements)
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = t(key);
    } else {
      // Update just the first text node (preserves child elements like <select>)
      const textNode = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (textNode) textNode.textContent = t(key) + " ";
      else el.textContent = t(key);
    }
  });
  // Auth modal dynamic labels — re-apply current mode translations
  if (document.querySelector("#auth-title")) switchAuthMode(state.authMode);
  // Language toggle button flags
  const fromFlag = document.querySelector("#lang-from-flag");
  const toFlag   = document.querySelector("#lang-to-flag");
  if (fromFlag) {
    fromFlag.textContent = state.lang === "es" ? "🇪🇸" : "🇬🇧";
    fromFlag.setAttribute("data-lang", state.lang === "es" ? "es" : "en");
  }
  if (toFlag) {
    toFlag.textContent   = state.lang === "es" ? "🇬🇧" : "🇪🇸";
    toFlag.setAttribute("data-lang", state.lang === "es" ? "en" : "es");
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function stripLeadingEmojiLabel(value) {
  return String(value || "").replace(/^\p{Extended_Pictographic}+\s*/u, "").trim();
}

export const state = {
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
  isRecovering: false,
  pendingLinkError: false,
  lang: (typeof localStorage !== "undefined" && localStorage.getItem("panini-lang")) || "es",
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
  return /^(FWC([0-9]|1[0-9]|20)|CC([1-9]|1[0-2])|[A-Z]{3}([1-9]|1[0-9]|20))$/.test(
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
      state.section = "inicio";
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
      const countryName = state?.lang === "es"
        ? (COUNTRY_NAMES_ES[sticker.equipoCodigo] || sticker.pais)
        : sticker.pais;

      const haystack = normalizeText(
        [
          countryName,
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
        return sticker.id.startsWith("FWC");
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
      label: `${t("group_letter")} ${group.letter}`,
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
      label: tCountry(selection.code),
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
    let label = `${t("group_letter")} ${sticker.grupo}`;
    let accent = sticker.colorGrupo;

    if (mode === "selection") {
      key = sticker.pais;
      label = `${tCountry(sticker.equipoCodigo)} · ${t("page_abbr")} ${sticker.paginaInicioSeleccion}`;
    } else if (mode === "page") {
      key = `page-${sticker.pagina}`;
      label = `${t("page_full")} ${sticker.pagina}`;
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
  const el = document.querySelector(modalId);
  if (el) {
    el.removeAttribute("hidden");
    el.classList.remove("hidden");
    el.classList.add("flex");
  }
}

function closeModal(modalId) {
  const el = document.querySelector(modalId);
  if (el) {
    el.setAttribute("hidden", "hidden");
    el.classList.add("hidden");
    el.classList.remove("flex");
  }
}

function openAuthModal() {
  switchAuthMode("login");
  document.querySelector("#auth-email").value = "";
  document.querySelector("#auth-password").value = "";
  clearAuthError();
  openModal("#auth-modal");
}

function closeAuthModal() {
  closeModal("#auth-modal");
  switchAuthMode("login");
  document.querySelector("#auth-email").value = "";
  document.querySelector("#auth-password").value = "";
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

  // Detect password recovery in URL parameters
  if (typeof window !== "undefined") {
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    if (hash.includes("type=recovery") || search.includes("type=recovery")) {
      state.isRecovering = true;
    }

    // Supabase error redirect (e.g. expired/used recovery link):
    // #error=access_denied&error_code=otp_expired&error_description=...
    if (hash.includes("error=") && (hash.includes("otp_expired") || hash.includes("access_denied"))) {
      state.pendingLinkError = true;
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }

  let createClient;
  try {
    ({ createClient } = await import("https://esm.sh/@supabase/supabase-js@2.49.8"));
  } catch {
    console.warn("Could not load Supabase SDK — running in offline mode.");
    return null;
  }
  // Supabase project sends password-recovery emails with the implicit flow
  // (tokens in the URL hash: #access_token=...&type=recovery).
  // flowType:'implicit' tells detectSessionInUrl to parse the hash fragment;
  // without it the default PKCE client ignores hash tokens and getSession()
  // returns null, so the recovery modal never appears.
  const hashHasToken = (window.location.hash || "").includes("access_token=");
  state.supabase = createClient(state.config.url, state.config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      ...(hashHasToken ? { flowType: "implicit" } : {}),
    },
  });

  if (state.authSubscription) {
    state.authSubscription.unsubscribe();
  }

  const { data: authListener } = state.supabase.auth.onAuthStateChange(async (event, session) => {
    state.session = session;

    const isRecovery = event === "PASSWORD_RECOVERY" || state.isRecovering;
    if (isRecovery) {
      state.isRecovering = false;
      if (typeof window !== "undefined" && window.history && window.history.replaceState) {
        // Strip all Supabase auth params from both hash and search string
        const params = new URLSearchParams(window.location.search);
        ["access_token", "refresh_token", "token_hash", "type", "error", "error_description"].forEach(k => params.delete(k));
        const qs = params.toString();
        const cleanUrl = window.location.pathname + (qs ? "?" + qs : "");
        window.history.replaceState(null, document.title, cleanUrl);
      }
    }

    await loadRemoteProgress();
    renderApp();

    if (isRecovery) {
      switchAuthMode("update");
      openModal("#auth-modal");
    }
  });
  state.authSubscription = authListener.subscription;

  const {
    data: { session },
  } = await state.supabase.auth.getSession();
  state.session = session;

  // Fallback: with Supabase PKCE flow, detectSessionInUrl may process the recovery
  // token during createClient() — before onAuthStateChange is registered — so the
  // PASSWORD_RECOVERY event is never delivered to the listener.  If isRecovering is
  // still true here (no callback consumed it) but we now have a valid session, show
  // the "New password" modal directly.
  if (state.isRecovering && session) {
    state.isRecovering = false;
    if (typeof window !== "undefined" && window.history?.replaceState) {
      const params = new URLSearchParams(window.location.search);
      ["access_token", "refresh_token", "token_hash", "type", "error", "error_description"]
        .forEach(k => params.delete(k));
      const qs = params.toString();
      window.history.replaceState(null, document.title,
        window.location.pathname + (qs ? "?" + qs : ""));
    }
    // Defer until hydrateApp's final renderApp() has finished
    setTimeout(() => {
      switchAuthMode("update");
      openModal("#auth-modal");
    }, 0);
  }

  // Supabase redirected with an error hash (e.g. expired recovery link).
  // Open the reset-password form so the user can request a fresh link,
  // and show a clear message explaining what happened.
  if (state.pendingLinkError) {
    state.pendingLinkError = false;
    setTimeout(() => {
      switchAuthMode("reset");
      openModal("#auth-modal");
      showAuthError(t("auth.error.link_expired"));
    }, 0);
  }

  return state.supabase;
}

async function loadRemoteProgress() {
  if (!state.session || !state.supabase) {
    state.stickers = state.catalog;
    return;
  }

  state.isSyncing = true;
  renderStatus();

  let data = null, error = null;
  try {
    const result = await Promise.race([
      state.supabase
        .from("user_sticker_progress")
        .select("sticker_id, obtained, duplicates")
        .eq("user_id", state.session.user.id),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 15_000)),
    ]);
    data = result.data;
    error = result.error;
  } catch (e) {
    error = e;
  }

  state.isSyncing = false;

  if (error) {
    setBannerMessage(t("toast.sync_error"), "warning");
    state.stickers = state.catalog;
    renderStatus();
    return;
  }

  state.stickers = mergeCatalogWithProgress(state.catalog, data || []);
  renderStatus();
}

async function persistSticker(sticker) {
  if (!state.session || !state.supabase) {
    showToast(t("toast.sign_in_required"));
    return false;
  }

  if (!validateStickerId(sticker.id)) {
    showToast(t("toast.invalid_sticker"));
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
    showToast(t("toast.save_error"));
    return false;
  }

  return true;
}

function patchStickerCard(stickerId, sticker) {
  const article = document.querySelector(`article[data-sticker-id="${escapeHtml(stickerId)}"]`);
  if (!article) return;

  article.classList.toggle("is-owned", sticker.obtenido);
  article.classList.toggle("is-missing", !sticker.obtenido);

  const wrap = article.closest(".sticker-card-wrap");
  if (wrap) {
    let badge = wrap.querySelector(".sticker-card__badge");
    if (sticker.repetidos > 0) {
      if (badge) {
        badge.textContent = `+${sticker.repetidos}`;
      } else {
        badge = document.createElement("span");
        badge.className = "sticker-card__badge";
        badge.textContent = `+${sticker.repetidos}`;
        wrap.insertBefore(badge, wrap.querySelector(".sticker-card__remove"));
      }
    } else if (badge) {
      badge.remove();
    }
  }
}

async function updateSticker(stickerId, updater) {
  if (!isAuthRuntimeAvailable()) {
    showToast(t("toast.file_protocol"));
    return;
  }

  if (!state.session) {
    openAuthModal();
    return;
  }

  const current = state.stickers.find((item) => item.id === stickerId);
  if (!current) {
    showToast(t("toast.not_found"));
    return;
  }
  const next = updater(current);
  state.stickers = state.stickers.map((item) => (item.id === stickerId ? next : item));

  // Paint the card change in the current frame — zero DOM work beyond the one card.
  patchStickerCard(stickerId, next);

  // Defer everything else to after the browser paints the card change.
  const needsFullRender = state.section === "faltantes" || state.section === "repetidos";
  requestAnimationFrame(() => {
    if (needsFullRender) {
      renderApp();
    } else {
      const stats = computeStats(state.stickers);
      renderOverview(stats);
      renderStatus();
    }
  });

  const success = await persistSticker(next);
  if (!success) {
    await loadRemoteProgress();
    renderApp();
  }
}

function renderFilters() {
  const filterBar = document.querySelector("#filter-chips");
  const hiddenInSection = {
    repetidos: ["obtenidos", "repetidos", "faltantes"],
    faltantes:  ["obtenidos", "repetidos", "faltantes"],
  };
  const hidden = hiddenInSection[state.section] || [];
  filterBar.innerHTML = Object.keys(FILTER_LABELS)
    .filter(value => !hidden.includes(value))
    .map(value => `
      <button class="chip ${state.filter === value ? "is-active" : ""}" data-filter="${value}">
        ${escapeHtml(t("filter." + value))}
      </button>
    `)
    .join("");
}

function renderSelectOptions() {
  const groupSelect = document.querySelector("#group-select");
  const teamSelect = document.querySelector("#team-select");
  const pageSelect = document.querySelector("#page-select");

  groupSelect.innerHTML = `
    <option value="all">${t("all_groups")}</option>
    ${GROUPS.map((group) => `<option value="${group.letter}">${t("group_letter")} ${group.letter}</option>`).join("")}
  `;
  groupSelect.value = state.selectedGroup;

  teamSelect.innerHTML = `
    <option value="all">${t("all_selections")}</option>
    ${getSelectionOptions(state.selectedGroup)
      .map((team) => `<option value="${escapeHtml(team.country)}">${escapeHtml(team.country)}</option>`)
      .join("")}
  `;
  if (!getSelectionOptions(state.selectedGroup).some((team) => team.country === state.selectedTeam)) {
    state.selectedTeam = "all";
  }
  teamSelect.value = state.selectedTeam;

  pageSelect.innerHTML = `
    <option value="all">${t("all_pages")}</option>
    ${getPageOptions().map((page) => `<option value="${page}">${t("page_abbr")} ${page}</option>`).join("")}
  `;
  pageSelect.value = state.selectedPage;
}

function renderSectionTabs() {
  const sections = Object.keys(SECTION_LABELS);
  const desktopTabs = sections.map(value => `
    <button class="section-tab ${state.section === value ? "is-active" : ""}" data-section="${value}">
      <span class="material-symbols-outlined">${SECTION_ICONS[value]}</span>
      <span>${escapeHtml(t("short." + value))}</span>
    </button>
  `).join("");

  const mobileTabs = sections.map(value => `
    <button class="mobile-tab ${state.section === value ? "is-active" : ""}" data-section="${value}" title="${escapeHtml(t(value))}">
      <span class="material-symbols-outlined">${SECTION_ICONS[value]}</span>
      <span>${escapeHtml(t("short." + value))}</span>
    </button>
  `).join("");

  document.querySelector("#section-tabs").innerHTML = desktopTabs;
  document.querySelector("#mobile-nav").innerHTML = mobileTabs;
}

function renderStatus() {
  const authButton = document.querySelector("#auth-trigger");
  const signOutButton = document.querySelector("#sign-out-button");
  const syncStatus = document.querySelector("#sync-status");
  const pdfMissingBtn = document.querySelector("#download-missing-pdf");
  const pdfDuplicatesBtn = document.querySelector("#download-repeated-pdf");
  const resetBtn = document.querySelector("#reset-album");
  const openAuthBtn = document.querySelector("#open-auth");

  const loggedIn = !!state.session;
  const disabledClasses = ["opacity-40", "cursor-not-allowed", "pointer-events-none"];

  [pdfMissingBtn, pdfDuplicatesBtn, resetBtn].forEach(btn => {
    if (!btn) return;
    if (loggedIn) {
      btn.disabled = false;
      disabledClasses.forEach(c => btn.classList.remove(c));
    } else {
      btn.disabled = true;
      disabledClasses.forEach(c => btn.classList.add(c));
    }
  });

  if (openAuthBtn) {
    if (loggedIn) {
      openAuthBtn.disabled = true;
      disabledClasses.forEach(c => openAuthBtn.classList.add(c));
    } else {
      openAuthBtn.disabled = false;
      disabledClasses.forEach(c => openAuthBtn.classList.remove(c));
    }
  }


  if (!isAuthRuntimeAvailable()) {
    authButton.textContent = t("read_only");
    authButton.disabled = true;
    disabledClasses.forEach(c => authButton.classList.add(c));
    signOutButton.classList.add("opacity-30", "cursor-not-allowed", "pointer-events-none");
    signOutButton.classList.remove("hover:text-primary", "hover:bg-primary");
    signOutButton.disabled = true;
    setBannerMessage(t("banner.file_protocol"), "warning");
  } else if (!state.session) {
    authButton.textContent = t("sign_in");
    authButton.disabled = false;
    disabledClasses.forEach(c => authButton.classList.remove(c));
    signOutButton.classList.add("opacity-30", "cursor-not-allowed", "pointer-events-none");
    signOutButton.classList.remove("hover:text-primary");
    signOutButton.disabled = true;
    setBannerMessage(t("banner.not_signed_in"), "muted");
  } else {
    authButton.textContent = state.session.user.email.split("@")[0];
    authButton.disabled = true;
    disabledClasses.forEach(c => authButton.classList.add(c));
    signOutButton.classList.remove("opacity-30", "cursor-not-allowed", "pointer-events-none");
    signOutButton.classList.add("hover:text-primary");
    signOutButton.disabled = false;
    setBannerMessage("", "success");
  }


  syncStatus.innerHTML = state.isSyncing
    ? `<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> ${t("syncing")}`
    : `<span class="w-2 h-2 rounded-full bg-secondary"></span> ${t("synced")}`;
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
      <span>${t("obtained")}</span>
      <strong>${escapeHtml(stats.obtenidos)}</strong>
      <small>${escapeHtml(pct)}${t("pct_of_album")}</small>
    </article>
    <article class="metric-card tone-error">
      <span>${t("missing")}</span>
      <strong>${escapeHtml(stats.faltantes)}</strong>
      <small>${t("yet_to_paste")}</small>
    </article>
    <article class="metric-card tone-duplicates">
      <span>${t("duplicates")}</span>
      <strong>${escapeHtml(stats.repetidos)}</strong>
      <small>${t("available_for_trade")}</small>
    </article>
    <article class="metric-card tone-coke">
      <span>Coca-Cola</span>
      <strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong>
      <small>${escapeHtml(stats.cocaCola.repetidos)} ${t("duplicates").toLowerCase()}</small>
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
            ${isCocaColaSticker(sticker) ? `<span class="sticker-card__tag">Coca-Cola ${sticker.numero.replace("CC", "")}</span>` : ""}
          </div>
          <div class="sticker-card__bottom">
            <span class="sticker-card__id">${escapeHtml(sticker.id)}</span>
            <strong class="sticker-card__name">${escapeHtml(sticker.nombre)}</strong>
          </div>
        </button>
      </article>
      ${sticker.repetidos > 0 ? `<span class="sticker-card__badge">+${escapeHtml(sticker.repetidos)}</span>` : ""}
      <button type="button" class="sticker-card__remove" data-action="correct-sticker" data-sticker-id="${sticker.id}" aria-label="Corregir sticker">
        <span class="sticker-card__remove-icon"></span>
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
          `<span class="home-team-pill"><span class="home-team-pill__emoji">${getTeamFlagEmoji(t.code)}</span>${escapeHtml(t.code)}</span>`,
      )
      .join("");
    return `
      <div class="home-group-card" style="--group-accent:${group.color}">
        <div class="home-group-card__header">
          <span class="home-group-card__letter">${t("group_letter")} ${escapeHtml(group.letter)}</span>
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
        <p class="home-hero__eyebrow">Panini Official · ${state.lang === "en" ? "Germany Edition" : "Edición Alemania"}</p>
        <h1 class="home-hero__title">FIFA World Cup 2026™</h1>
        <p class="home-hero__dates">11 Jun – 19 Jul 2026</p>
        <div class="home-hero__hosts">
          <span class="home-host-badge home-host-badge--usa">${state.lang === "en" ? "United States" : "Estados Unidos"}</span>
          <span class="home-host-badge home-host-badge--can">${state.lang === "en" ? "Canada" : "Canadá"}</span>
          <span class="home-host-badge home-host-badge--mex">${state.lang === "en" ? "Mexico" : "México"}</span>
        </div>
      </div>
      <div class="home-hero__kpis">
        <div class="home-kpi"><strong>48</strong><small>${t("home.selections")}</small></div>
        <div class="home-kpi"><strong>12</strong><small>${t("home.groups_count")}</small></div>
        <div class="home-kpi"><strong>104</strong><small>${t("home.matches")}</small></div>
        <div class="home-kpi"><strong>16</strong><small>${t("home.venues")}</small></div>
      </div>
    </section>

    <!-- ALBUM PROGRESS -->
    <section class="home-card home-card--dark">
      <h2 class="home-card__title">${t("home.album_title")}</h2>
      <div class="home-album-bar">
        <div class="home-album-bar__track">
          <div class="home-album-bar__fill" style="width:${pct}%"></div>
        </div>
        <span class="home-album-bar__pct">${pct}%</span>
      </div>
      <div class="home-album-metrics">
        <div class="home-album-metric home-album-metric--owned">
          <strong>${escapeHtml(stats.obtenidos)}</strong><span>${t("home.obtained")}</span>
        </div>
        <div class="home-album-metric home-album-metric--missing">
          <strong>${escapeHtml(stats.faltantes)}</strong><span>${t("home.missing")}</span>
        </div>
        <div class="home-album-metric home-album-metric--duplicates">
          <strong>${escapeHtml(stats.repetidos)}</strong><span>${t("home.duplicates")}</span>
        </div>
        <div class="home-album-metric home-album-metric--coke">
          <strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong><span>Coca-Cola</span>
        </div>
        <div class="home-album-metric home-album-metric--specials">
          <strong>${escapeHtml(stats.especiales.obtenidos)}/${escapeHtml(stats.especiales.total)}</strong><span>${t("home.specials")}</span>
        </div>
        <div class="home-album-metric home-album-metric--total">
          <strong>${escapeHtml(stats.total)}</strong><span>${t("home.total")}</span>
        </div>
      </div>
    </section>

    <!-- GROUPS GRID -->
    <section class="home-card home-card--dark">
      <h2 class="home-card__title">${t("home.groups")}</h2>
      <div class="home-groups-grid">${groupsGrid}</div>
    </section>

    <!-- TOURNAMENT FORMAT + VENUES -->
    <div class="home-two-col">
      <section class="home-card home-card--dark">
        <h2 class="home-card__title">${t("home.tournament")}</h2>
        <ol class="home-format-list">
          <li>
            <span class="home-format-list__label">${t("home.stage.group")}</span>
            <span class="home-format-list__desc">${t("home.stage.group_desc")}</span>
          </li>
          <li>
            <span class="home-format-list__label">${t("home.stage.r32")}</span>
            <span class="home-format-list__desc">${t("home.stage.r32_desc")}</span>
          </li>
          <li>
            <span class="home-format-list__label">${t("home.stage.r16")}</span>
            <span class="home-format-list__desc">${t("home.stage.r16_desc")}</span>
          </li>
          <li>
            <span class="home-format-list__label">${t("home.stage.qf")}</span>
            <span class="home-format-list__desc">${t("home.stage.qf_desc")}</span>
          </li>
          <li>
            <span class="home-format-list__label">${t("home.stage.sf")}</span>
            <span class="home-format-list__desc">${t("home.stage.sf_desc")}</span>
          </li>
          <li>
            <span class="home-format-list__label">${t("home.stage.final")}</span>
            <span class="home-format-list__desc">${t("home.stage.final_desc")}</span>
          </li>
        </ol>
      </section>

      <section class="home-card home-card--dark">
        <h2 class="home-card__title">${t("home.venues_title")} (${WC2026_VENUES.length})</h2>
        <div class="home-venues">${venueRows}</div>
      </section>
    </div>

    <!-- ALBUM STRUCTURE -->
    <section class="home-card home-card--dark">
      <h2 class="home-card__title">${t("home.album_structure")}</h2>
      <div class="home-album-structure">
        <div class="home-structure-item home-structure-item--total">
          <span class="home-structure-item__num">992</span>
          <span class="home-structure-item__label">${t("home.album.total")}</span>
        </div>
        <div class="home-structure-item home-structure-item--accent">
          <span class="home-structure-item__num">48 × 20</span>
          <span class="home-structure-item__label">${t("home.album.selections")}</span>
        </div>
        <div class="home-structure-item home-structure-item--specials">
          <span class="home-structure-item__num">20</span>
          <span class="home-structure-item__label">${t("home.album.specials")}</span>
        </div>
        <div class="home-structure-item home-structure-item--coke">
          <span class="home-structure-item__num">12</span>
          <span class="home-structure-item__label">${t("home.album.coke")}</span>
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

  // Returns an array of section HTML strings (one per group) for progressive rendering
  return [...groupMap.entries()]
    .map(([groupKey, teamMap]) => {
      const groupInfo = GROUPS.find((g) => g.letter === groupKey);
      const groupColor = groupInfo?.color || "#003e7a";
      const groupLabel =
        groupKey === "Especiales"
          ? `${t("especiales")} FWC`
          : groupKey === "Coca-Cola"
            ? "Coca-Cola Germany"
            : `${t("group_letter")} ${groupKey}`;

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
          const teamPages = [...new Set(teamStickers.map(s => s.pagina))].sort((a, b) => a - b);
          const pageLabel = teamPages.length ? ` <span class="team-header__pages">· ${t("page_abbr")} ${teamPages.join(", ")}</span>` : "";

          return `
            <div class="team-subsection">
              <div class="team-header">
                <div class="team-flag" role="img" aria-label="Bandera de ${escapeHtml(teamKey)}">${getTeamFlagEmoji(teamCode)}</div>
                <div class="team-header__info">
                  ${teamCode ? `<span class="team-header__code">${escapeHtml(teamCode)}</span>` : ""}
                  <span class="team-header__label">${escapeHtml(tCountry(teamCode))}${pageLabel}</span>
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
    });
}

// Token used to cancel in-flight progressive renders when a new render starts
let _renderToken = 0;

function renderCollectionView(stickers) {
  const content = document.querySelector("#collection-content");
  // Invalidate any previous in-flight render
  const token = ++_renderToken;

  if (!stickers.length) {
    content.innerHTML = `
      <section class="empty-state">
        <h3>${t("empty.title")}</h3>
        <p>${t("empty.desc")}</p>
      </section>
    `;
    return;
  }

  // Build the array of section HTML strings
  let sections;
  if (state.viewMode === "group") {
    sections = renderGroupedByGroupAndTeam(stickers);
  } else {
    const groups = groupStickers(stickers, state.viewMode);
    sections = groups.map((group) => {
      const obtained = group.stickers.filter((sticker) => sticker.obtenido).length;
      const firstSticker = group.stickers[0];
      return `
        <section class="board-section">
          <div class="team-header">
            <div class="team-flag" role="img" aria-label="Bandera de ${escapeHtml(group.label)}">${getTeamFlagEmoji(firstSticker?.equipoCodigo)}</div>
            <h3>${escapeHtml(group.label)}</h3>
            <span class="team-progress">${escapeHtml(obtained)} / ${escapeHtml(group.stickers.length)}</span>
          </div>
          <div class="sticker-grid">
            ${group.stickers.map(renderStickerCard).join("")}
          </div>
        </section>
      `;
    });
  }

  if (!sections.length) { content.innerHTML = ""; return; }

  // Paint the first section immediately so the user sees content right away
  content.innerHTML = sections[0];

  if (sections.length === 1) return;

  // Append remaining sections progressively, yielding between each one
  // so the browser stays responsive. Cancel if a newer render started.
  let idx = 1;
  const scheduleNext = () => {
    setTimeout(() => {
      if (token !== _renderToken) return; // stale render — abort
      content.insertAdjacentHTML("beforeend", sections[idx]);
      idx++;
      if (idx < sections.length) scheduleNext();
    }, 0);
  };
  scheduleNext();
}

function renderStatsView(stats) {
  const content = document.querySelector("#collection-content");
  const completionPct = stats.porcentaje.toFixed(1);
  const selectionProgress = [...stats.bySelection]
    .sort((left, right) => right.progress - left.progress)
    .slice(0, 12);
  const bottomSelections = [...stats.bySelection]
    .sort((left, right) => left.progress - right.progress || left.label.localeCompare(right.label))
    .slice(0, 3);

  const teamTotal    = stats.total - stats.especiales.total - stats.cocaCola.total;
  const teamObtained = stats.obtenidos - stats.especiales.obtenidos - stats.cocaCola.obtenidos;
  const teamPct      = teamTotal ? (teamObtained / teamTotal * 100) : 0;
  const espPct       = stats.especiales.total ? (stats.especiales.obtenidos / stats.especiales.total * 100) : 0;
  const cokePct      = stats.cocaCola.total   ? (stats.cocaCola.obtenidos   / stats.cocaCola.total   * 100) : 0;

  const panelOverview = `
    <article class="stats-panel" style="grid-area:overview">
      <h3>${t("stats.overview")}</h3>
      <div class="stats-grid">
        <div class="stats-pill stats-pill--obtained"><span>${t("obtained")}</span><strong>${escapeHtml(stats.obtenidos)}</strong></div>
        <div class="stats-pill stats-pill--missing"><span>${t("missing")}</span><strong>${escapeHtml(stats.faltantes)}</strong></div>
        <div class="stats-pill stats-pill--duplicates"><span>${t("duplicates")}</span><strong>${escapeHtml(stats.repetidos)}</strong></div>
        <div class="stats-pill stats-pill--specials"><span>${t("especiales")}</span><strong>${escapeHtml(stats.especiales.obtenidos)}/${escapeHtml(stats.especiales.total)}</strong></div>
        <div class="stats-pill stats-pill--coke"><span>Coca-Cola</span><strong>${escapeHtml(stats.cocaCola.obtenidos)}/${escapeHtml(stats.cocaCola.total)}</strong></div>
        <div class="stats-pill stats-pill--edition"><span>${t("stats.edition_label")}</span><strong>${t("stats.edition")}</strong></div>
      </div>
      <div class="stats-note">
        <strong>${t("stats.completed")}: ${escapeHtml(completionPct)}%</strong>
        <span>${escapeHtml(stats.obtenidos)} ${t("home.obtained")} · ${escapeHtml(stats.faltantes)} ${t("yet_to_paste")}</span>
      </div>
      <div class="stats-category">
        <h4>${t("stats.by_category")}</h4>
        <div class="rank-row">
          <div>
            <strong>${t("stats.team")}</strong>
            <span>${escapeHtml(teamObtained)} ${t("stats.of")} ${escapeHtml(teamTotal)}</span>
          </div>
          <div class="progress-bar"><span style="width:${teamPct.toFixed(1)}%;background:#003e7a"></span></div>
        </div>
        <div class="rank-row">
          <div>
            <strong>${t("especiales")} FWC</strong>
            <span>${escapeHtml(stats.especiales.obtenidos)} ${t("stats.of")} ${escapeHtml(stats.especiales.total)}</span>
          </div>
          <div class="progress-bar"><span style="width:${espPct.toFixed(1)}%;background:#0f4c81"></span></div>
        </div>
        <div class="rank-row">
          <div>
            <strong>Coca-Cola</strong>
            <span>${escapeHtml(stats.cocaCola.obtenidos)} ${t("stats.of")} ${escapeHtml(stats.cocaCola.total)}</span>
          </div>
          <div class="progress-bar"><span style="width:${cokePct.toFixed(1)}%;background:#cc2b24"></span></div>
        </div>
      </div>
    </article>`;

  const panelGroups = `
    <article class="stats-panel stats-panel--groups" style="grid-area:groups">
      <h3>${t("stats.by_group")}</h3>
      <div class="rank-list">
        ${stats.byGroup.map(group => `
          <div class="rank-row">
            <div>
              <strong>${escapeHtml(group.label)}</strong>
              <span>${escapeHtml(group.obtenidos)} ${t("stats.of")} ${escapeHtml(group.total)}</span>
            </div>
            <div class="progress-bar"><span style="width:${group.progress.toFixed(1)}%;background:${group.color}"></span></div>
          </div>
        `).join("")}
      </div>
    </article>`;

  const panelSelections = `
    <article class="stats-panel stats-panel--selections" style="grid-area:selections">
      <h3>${t("stats.top_selections")}</h3>
      <div class="rank-list">
        ${selectionProgress.map(selection => `
          <div class="rank-row">
            <div>
              <strong>${escapeHtml(selection.label)}</strong>
              <span>${t("group_letter")} ${escapeHtml(selection.group)} · ${t("page_abbr")} ${escapeHtml(selection.page)}</span>
            </div>
            <div class="progress-bar"><span style="width:${selection.progress.toFixed(1)}%;background:${selection.color}"></span></div>
          </div>
        `).join("")}
      </div>
    </article>`;

  const panelPriority = `
    <article class="stats-panel" style="grid-area:priority">
      <h3>${t("stats.priority")}</h3>
      <div class="stats-kpis">
        <div class="stats-kpi stats-kpi--selections"><span>${t("stats.selections_100")}</span><strong>${escapeHtml(stats.bySelection.filter(s => s.progress === 100).length)}</strong></div>
        <div class="stats-kpi stats-kpi--groups"><span>${t("stats.groups_100")}</span><strong>${escapeHtml(stats.byGroup.filter(g => g.progress === 100).length)}</strong></div>
        <div class="stats-kpi stats-kpi--specials"><span>${t("stats.especiales_pending")}</span><strong>${escapeHtml(stats.especiales.faltantes)}</strong></div>
        <div class="stats-kpi stats-kpi--coke"><span>${t("stats.coke_pending")}</span><strong>${escapeHtml(stats.cocaCola.faltantes)}</strong></div>
      </div>
      <div class="mini-list">
        <h4>${t("stats.lagging")}</h4>
        ${bottomSelections.map(selection => `
          <div class="mini-row">
            <div>
              <strong>${escapeHtml(selection.label)}</strong>
              <span>${escapeHtml(selection.obtenidos)} ${t("stats.of")} ${escapeHtml(selection.total)} · ${t("group_letter")} ${escapeHtml(selection.group)}</span>
            </div>
            <em>${escapeHtml(selection.progress.toFixed(1))}%</em>
          </div>
        `).join("")}
      </div>
    </article>`;

  content.innerHTML = `
    <div class="stats-cols">
      ${panelOverview}
      ${panelGroups}
      ${panelSelections}
      ${panelPriority}
    </div>
  `;

}

function renderApp() {
  saveViewState();
  applyStaticTranslations();
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

  const logoHome = document.querySelector("#logo-home");
  if (logoHome) {
    const isHome = state.section === "inicio";
    logoHome.disabled = isHome;
    logoHome.classList.toggle("pointer-events-none", isHome);
    logoHome.classList.toggle("cursor-default", isHome);
  }

  document.querySelector("#query-input").value = state.query;

  document.querySelector("#view-mode").value = state.viewMode;

  // Hide album chrome on home / stats pages
  const isAlbumSection = !["inicio", "stats", "coca-cola"].includes(state.section);
  const showHeader = !["inicio", "stats"].includes(state.section); // show for album sections + coca-cola
  const showBanner = !["inicio", "stats"].includes(state.section);
  
  const albumHeader = document.querySelector("#album-header");
  const readOnlyBanner = document.querySelector("#read-only-banner");
  const controlsPanel = document.querySelector("#controls-panel");
  
  albumHeader.classList.toggle("is-hidden", !showHeader);
  albumHeader.toggleAttribute("hidden", !showHeader);
  
  readOnlyBanner.classList.toggle("is-hidden", !showBanner);
  readOnlyBanner.toggleAttribute("hidden", !showBanner);
  
  controlsPanel.classList.toggle("is-hidden", !isAlbumSection);
  controlsPanel.toggleAttribute("hidden", !isAlbumSection);

  if (showHeader) {
    document.querySelector("#section-title").textContent = t(state.section);
    document.querySelector("#results-count").textContent = state.section === "coca-cola"
      ? `12 stickers`
      : `${filtered.length} ${t("stickers_visible")}`;
    document.querySelector("#progress-detail").textContent =
      `${state.stickers.filter(s => s.obtenido).length} / ${state.stickers.length} stickers`;
  }

  if (state.section === "inicio") {
    renderHomeView(stats);
  } else if (state.section === "stats") {
    renderStatsView(stats);
  } else {
    renderCollectionView(filtered);
  }
}

export function mapAuthError(message) {
  const m = (message || "").toLowerCase();
  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already")) return t("auth.error.already_registered");
  if (m.includes("invalid login") || m.includes("invalid credentials") || m.includes("wrong password")) return t("auth.error.invalid_credentials");
  if (m.includes("email not confirmed") || m.includes("not confirmed")) return t("auth.error.email_not_confirmed");
  if (m.includes("password") && (m.includes("least") || m.includes("short") || m.includes("weak"))) return t("auth.error.weak_password");
  if (m.includes("rate limit") || m.includes("rate_limit") || m.includes("too many") || m.includes("429") || m.includes("exceeded") || m.includes("over_email")) return t("auth.error.rate_limit");
  if (m.includes("invalid email") || m.includes("email format") || m.includes("valid email")) return t("auth.error.invalid_email");
  return message;
}

function showAuthError(msg) {
  const el = document.querySelector("#auth-error");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
}

function clearAuthError() {
  const el = document.querySelector("#auth-error");
  if (el) el.classList.add("hidden");
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  clearAuthError();

  const email = document.querySelector("#auth-email").value.trim();
  if (state.authMode !== "update" && !email) {
    showAuthError(t("auth.error.invalid_email"));
    return;
  }

  if (!isAuthRuntimeAvailable()) {
    showAuthError(t("toast.login_server"));
    return;
  }

  const supabase = await ensureSupabaseClient();
  if (!supabase) {
    showAuthError(t("toast.login_server"));
    return;
  }

  const submitBtn = document.querySelector("#auth-submit");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "…";

  try {
    // Update password mode
    if (state.authMode === "update") {
      const password = document.querySelector("#auth-password").value.trim();
      if (!password || password.length < 6) {
        showAuthError(t("auth.error.weak_password"));
        return;
      }
      // Verify the recovery session is still valid before calling updateUser
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        showAuthError(t("toast.password_update_error"));
        return;
      }
      // Race against a 15-second timeout so the button never hangs forever
      let updateResult;
      try {
        updateResult = await Promise.race([
          supabase.auth.updateUser({ password }),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 15_000)),
        ]);
      } catch (e) {
        showAuthError(t("toast.password_update_error"));
        return;
      }
      const { error } = updateResult;
      if (error) {
        showAuthError(mapAuthError(error.message) || t("toast.password_update_error"));
        return;
      }
      closeAuthModal();
      showToast(t("toast.password_updated"));
      return;
    }

    // Reset password mode
    if (state.authMode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname,
      });
      if (error) {
        showAuthError(mapAuthError(error.message) || t("toast.reset_email_error"));
        return;
      }
      closeAuthModal();
      showToast(t("toast.reset_email_sent"));
      return;
    }

    const password = document.querySelector("#auth-password").value.trim();

    const action =
      state.authMode === "register"
        ? supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin + window.location.pathname },
          })
        : supabase.auth.signInWithPassword({ email, password });

    const { data, error } = await action;
    if (error) {
      showAuthError(mapAuthError(error.message));
      return;
    }

    // Supabase can signal "already registered" in two ways when email enumeration prevention is on:
    // 1. identities:[] — email exists but fake-success returned
    // 2. identities undefined / user null — some project configs return this
    if (state.authMode === "register") {
      const identities = data?.user?.identities;
      if (!identities || identities.length === 0) {
        showAuthError(t("auth.error.already_registered"));
        return;
      }
    }

    closeAuthModal();
    showToast(state.authMode === "register" ? t("toast.account_created") : t("toast.signed_in"));
  } catch (err) {
    console.error("Auth submission error:", err);
    showAuthError(mapAuthError(err?.message || err || "Error de conexión. Inténtalo de nuevo."));
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

function switchAuthMode(mode) {
  state.authMode = mode;
  clearAuthError();
  const isReset = mode === "reset";
  const isLogin = mode === "login";
  const isUpdate = mode === "update";

  document.querySelector("#auth-title").textContent =
    t(mode === "login" ? "auth.title.login" : mode === "register" ? "auth.title.register" : mode === "reset" ? "auth.title.reset" : "auth.title.update");
  document.querySelector("#auth-submit").textContent =
    t(mode === "login" ? "auth.submit.login" : mode === "register" ? "auth.submit.register" : mode === "reset" ? "auth.submit.reset" : "auth.submit.update");
  
  const toggleBtn = document.querySelector("#toggle-auth-mode");
  if (toggleBtn) {
    toggleBtn.textContent = t(isReset ? "auth.toggle.back_to_login" : isLogin ? "auth.toggle.to_register" : "auth.toggle.to_login");
    toggleBtn.classList.toggle("hidden", isUpdate);
  }

  // Dynamic required toggle to prevent HTML5 validation errors on hidden fields
  const emailInput = document.querySelector("#auth-email");
  if (emailInput) {
    if (isUpdate) {
      emailInput.removeAttribute("required");
    } else {
      emailInput.setAttribute("required", "required");
    }
  }

  // Show/hide reset or update hint
  const hint = document.querySelector("#auth-reset-hint");
  if (hint) {
    hint.textContent = isReset ? t("auth.reset_hint") : isUpdate ? t("auth.update_hint") : "";
    hint.classList.toggle("hidden", !isReset && !isUpdate);
  }

  // Show/hide OAuth + divider (hidden in reset or update mode)
  const oauth = document.querySelector("#auth-oauth");
  const divider = document.querySelector("#auth-divider");
  if (oauth) oauth.classList.toggle("hidden", isReset || isUpdate);
  if (divider) divider.classList.toggle("hidden", isReset || isUpdate);

  // Show/hide email label (hidden in update mode)
  const emailLabel = document.querySelector("#auth-email")?.closest("label");
  if (emailLabel) emailLabel.classList.toggle("hidden", isUpdate);

  // Show/hide password field + forgot button (hidden in reset mode)
  const pwLabel = document.querySelector("#auth-password")?.closest("label");
  if (pwLabel) pwLabel.classList.toggle("hidden", isReset);
  const forgotWrap = document.querySelector("#forgot-password")?.closest("div");
  if (forgotWrap) forgotWrap.classList.toggle("hidden", isReset || !isLogin);

  // Update password required and minlength attributes dynamically to prevent HTML5 validation errors on hidden fields
  const pwInput = document.querySelector("#auth-password");
  if (pwInput) {
    if (isReset) {
      pwInput.removeAttribute("required");
      pwInput.removeAttribute("minlength");
    } else {
      pwInput.setAttribute("required", "required");
      pwInput.setAttribute("minlength", "6");
    }
  }
}

async function handleForgotPassword() {
  switchAuthMode("reset");
  document.querySelector("#auth-email").focus();
}

async function handleSignOut() {
  if (state.supabase) {
    try {
      await Promise.race([
        state.supabase.auth.signOut(),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 5_000)),
      ]);
    } catch (err) {
      console.warn("Supabase signOut error, proceeding with local sign out:", err);
    }
  }
  state.session = null;
  state.isSyncing = false;
  state.stickers = state.catalog;
  renderApp();
}

async function handleResetAlbum() {
  if (!state.session || !state.supabase) {
    showToast(t("toast.reset_session"));
    return;
  }

  if (!window.confirm(t("confirm.reset"))) {
    return;
  }

  const { error } = await state.supabase
    .from("user_sticker_progress")
    .delete()
    .eq("user_id", state.session.user.id);

  if (error) {
    showToast(t("toast.reset_error"));
    return;
  }

  state.stickers = state.catalog;
  renderApp();
  showToast(t("toast.reset_success"));
}

async function exportPdf(mode) {
  if (!isAuthRuntimeAvailable()) {
    showToast(t("toast.export_server"));
    return;
  }

  if (!state.session) {
    openAuthModal();
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
  doc.text(mode === "faltantes" ? t("pdf.missing_title") : t("pdf.duplicates_title"), 14, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`${t("pdf.user")}: ${state.session.user.email}`, 14, y);
  y += 6;
  doc.text(`${t("pdf.generated")}: ${dateStamp}`, 14, y);
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
      doc.text(t("toast.no_stickers"), 14, y);
    }
  });

  if (stickers.length === 0) {
    doc.text(t("toast.no_stickers"), 14, y);
  }

  doc.save(mode === "faltantes" ? t("pdf.filename_missing") : t("pdf.filename_duplicates"));
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
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.scrollTop = 0;
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

    if (event.target.closest("#lang-toggle")) {
      state.lang = state.lang === "es" ? "en" : "es";
      localStorage.setItem("panini-lang", state.lang);
      renderApp();
      return;
    }

    if (event.target.closest("#auth-trigger")) {
      if (!isAuthRuntimeAvailable()) {
        showToast(t("toast.use_server"));
      } else if (state.session) {
        showToast(`${t("toast.connected_as")} ${state.session.user.email}`);
      } else {
        openAuthModal();
      }
      return;
    }

    if (event.target.closest("#sign-out-button")) {
      await handleSignOut();
      return;
    }

    if (event.target.closest("[data-modal-close]")) {
      const target = event.target.closest("[data-modal-close]").dataset.modalCloseTarget;
      if (target === "#auth-modal") closeAuthModal();
      else closeModal(target);
      return;
    }

    if (event.target.closest("#open-auth")) {
      if (!isAuthRuntimeAvailable()) {
        showToast(t("toast.login_server"));
      } else {
        openAuthModal();
      }
      return;
    }

    if (event.target.closest("#toggle-auth-mode")) {
      const next = state.authMode === "login" ? "register" : "login";
      switchAuthMode(next); // reset→login, register→login, login→register
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

  // Logo → home
  document.querySelector("#logo-home")?.addEventListener("click", () => {
    state.section = "inicio";
    renderApp();
    const mainEl = document.querySelector("main");
    if (mainEl) mainEl.scrollTop = 0;
  });

  document.querySelector("#query-input").addEventListener("input", (event) => {
    state.query = event.target.value;
    // Auto-navigate to album when searching from home or stats
    if (state.query.trim() && ["inicio", "stats"].includes(state.section)) {
      state.section = "all";
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.scrollTop = 0;
    }
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
  document.querySelector("#forgot-password")?.addEventListener("click", handleForgotPassword);

  document.querySelector("#auth-google")?.addEventListener("click", async () => {
    try {
      const supabase = await ensureSupabaseClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + window.location.pathname,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google OAuth error:", err.message);
    }
  });
}

async function hydrateApp() {
  loadViewState();   // always resets section to "inicio"
  bindEvents();
  renderApp();       // instant first paint — home page, no flash of stale HTML

  try {
    await ensureSupabaseClient();
    await loadRemoteProgress();
  } catch (err) {
    console.warn("Supabase not available:", err.message);
  }
  renderApp();       // re-render with remote progress (or catalog if not logged in)
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    hydrateApp().catch((error) => {
      console.error(error);
      showToast(t("toast.init_error"));
    });
  });
}
