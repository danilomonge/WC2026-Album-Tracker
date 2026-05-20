const GROUP_PAGE_MAP = {
  A: [
    { code: "MEX", country: "México", page: 8 },
    { code: "RSA", country: "South Africa", page: 10 },
    { code: "KOR", country: "Korea Republic", page: 12 },
    { code: "CZE", country: "Czechia", page: 14 },
  ],
  B: [
    { code: "CAN", country: "Canada", page: 16 },
    { code: "BIH", country: "Bosnia-Herzegovina", page: 18 },
    { code: "QAT", country: "Qatar", page: 20 },
    { code: "SUI", country: "Switzerland", page: 22 },
  ],
  C: [
    { code: "BRA", country: "Brazil", page: 24 },
    { code: "MAR", country: "Morocco", page: 26 },
    { code: "HAI", country: "Haiti", page: 28 },
    { code: "SCO", country: "Scotland", page: 30 },
  ],
  D: [
    { code: "USA", country: "USA", page: 32 },
    { code: "PAR", country: "Paraguay", page: 34 },
    { code: "AUS", country: "Australia", page: 36 },
    { code: "TUR", country: "Türkiye", page: 38 },
  ],
  E: [
    { code: "GER", country: "Germany", page: 40 },
    { code: "CUW", country: "Curaçao", page: 42 },
    { code: "CIV", country: "Côte d’Ivoire", page: 44 },
    { code: "ECU", country: "Ecuador", page: 46 },
  ],
  F: [
    { code: "NED", country: "Netherlands", page: 48 },
    { code: "JPN", country: "Japan", page: 50 },
    { code: "SWE", country: "Sweden", page: 52 },
    { code: "TUN", country: "Tunisia", page: 54 },
  ],
  G: [
    { code: "BEL", country: "Belgium", page: 58 },
    { code: "EGY", country: "Egypt", page: 60 },
    { code: "IRN", country: "IR Iran", page: 62 },
    { code: "NZL", country: "New Zealand", page: 64 },
  ],
  H: [
    { code: "ESP", country: "Spain", page: 66 },
    { code: "CPV", country: "Cabo Verde", page: 68 },
    { code: "KSA", country: "Saudi Arabia", page: 70 },
    { code: "URU", country: "Uruguay", page: 72 },
  ],
  I: [
    { code: "FRA", country: "France", page: 74 },
    { code: "SEN", country: "Senegal", page: 76 },
    { code: "IRQ", country: "Iraq", page: 78 },
    { code: "NOR", country: "Norway", page: 80 },
  ],
  J: [
    { code: "ARG", country: "Argentina", page: 82 },
    { code: "ALG", country: "Algeria", page: 84 },
    { code: "AUT", country: "Austria", page: 86 },
    { code: "JOR", country: "Jordan", page: 88 },
  ],
  K: [
    { code: "POR", country: "Portugal", page: 90 },
    { code: "COD", country: "Congo DR", page: 92 },
    { code: "UZB", country: "Uzbekistan", page: 94 },
    { code: "COL", country: "Colombia", page: 96 },
  ],
  L: [
    { code: "ENG", country: "England", page: 98 },
    { code: "CRO", country: "Croatia", page: 100 },
    { code: "GHA", country: "Ghana", page: 102 },
    { code: "PAN", country: "Panama", page: 104 },
  ],
};

const GROUP_COLORS = {
  A: "#4c8f57",
  B: "#d5305c",
  C: "#d3b33b",
  D: "#3054b2",
  E: "#d56331",
  F: "#1d6c6c",
  G: "#b2a8d9",
  H: "#72badc",
  I: "#5b34b5",
  J: "#e7b9c9",
  K: "#cf2b8f",
  L: "#7e1633",
  Especiales: "#0f4c81",
  "Coca-Cola": "#cc2b24",
};

const TOURNAMENT_SPECIALS = [
  ["FWC1", "Official Emblem", "Logo", "Tournament Opener", 1],
  ["FWC2", "Official Mascot", "Mascota", "Tournament Opener", 1],
  ["FWC3", "FIFA World Cup Trophy", "Trophy", "Tournament Opener", 1],
  ["FWC4", "Final Match Ball", "Especial", "Tournament Opener", 1],
  ["FWC5", "Mexico City Host City", "Host City", "Host Cities", 1],
  ["FWC6", "Guadalajara Host City", "Host City", "Host Cities", 1],
  ["FWC7", "Monterrey Host City", "Host City", "Host Cities", 1],
  ["FWC8", "Toronto Host City", "Host City", "Host Cities", 1],
  ["FWC9", "Vancouver Host City", "Host City", "Host Cities", 1],
  ["FWC10", "New York/New Jersey Host City", "Host City", "Host Cities", 1],
  ["FWC11", "Dallas Host City", "Host City", "Host Cities", 2],
  ["FWC12", "Los Angeles Host City", "Host City", "Host Cities", 2],
  ["FWC13", "Miami Host City", "Host City", "Host Cities", 2],
  ["FWC14", "Atlanta Host City", "Host City", "Host Cities", 2],
  ["FWC15", "Seattle Host City", "Host City", "Host Cities", 2],
  ["FWC16", "Azteca Stadium", "Estadio", "Host Stadiums", 2],
  ["FWC17", "MetLife Stadium", "Estadio", "Host Stadiums", 2],
  ["FWC18", "SoFi Stadium", "Estadio", "Host Stadiums", 2],
  ["FWC19", "Collector Poster", "Promocional", "Collector Extras", 2],
  ["FWC20", "Opening Ceremony", "Especial", "Collector Extras", 2],
];

const COCA_COLA_GERMANY = Array.from({ length: 12 }, (_, index) => ({
  id: `CC${index + 1}`,
  numero: `CC${index + 1}`,
  grupo: "Coca-Cola",
  pais: "Coca-Cola",
  nombre: `Coca-Cola Germany ${String(index + 1).padStart(2, "0")}`,
  tipo: "Coca-Cola",
  categoriaEspecial: "Coca-Cola Germany",
  pagina: index < 6 ? 106 : 107,
  paginaInicioSeleccion: 106,
  obtenido: false,
  repetidos: 0,
  ordenGrupo: 14,
  ordenPais: 0,
  equipoCodigo: "CC",
  colorGrupo: GROUP_COLORS["Coca-Cola"],
  edicion: "germany",
}));

function createTeamSticker(team, group, order) {
  return Array.from({ length: 20 }, (_, index) => {
    const stickerNumber = index + 1;
    let tipo = "Normal";
    let categoriaEspecial = "";
    let nombre = `${team.country} Player ${String(stickerNumber - 2).padStart(2, "0")}`;

    if (stickerNumber === 1) {
      tipo = "Escudo";
      categoriaEspecial = "Team Identity";
      nombre = `${team.country} Crest`;
    } else if (stickerNumber === 2) {
      tipo = "Team Photo";
      categoriaEspecial = "Team Identity";
      nombre = `${team.country} Team Photo`;
    } else if (stickerNumber === 19) {
      tipo = "Especial";
      categoriaEspecial = "Star Player";
      nombre = `${team.country} Star Player`;
    } else if (stickerNumber === 20) {
      tipo = "Especial";
      categoriaEspecial = "Celebration";
      nombre = `${team.country} Celebration`;
    }

    return {
      id: `${team.code}${stickerNumber}`,
      numero: `${team.code}${stickerNumber}`,
      grupo: group,
      pais: team.country,
      nombre,
      tipo,
      categoriaEspecial,
      pagina: team.page + Math.floor(index / 10),
      paginaInicioSeleccion: team.page,
      obtenido: false,
      repetidos: 0,
      ordenGrupo: group.charCodeAt(0) - 64,
      ordenPais: order,
      equipoCodigo: team.code,
      colorGrupo: GROUP_COLORS[group],
      edicion: "germany",
    };
  });
}

export const GROUPS = Object.entries(GROUP_PAGE_MAP).map(([group, teams]) => ({
  letter: group,
  color: GROUP_COLORS[group],
  teams,
}));

export const SELECTIONS = GROUPS.flatMap((group) =>
  group.teams.map((team, index) => ({
    ...team,
    group: group.letter,
    color: group.color,
    order: index,
  })),
);

const TEAM_STICKERS = GROUPS.flatMap((group) =>
  group.teams.flatMap((team, index) =>
    createTeamSticker(team, group.letter, index),
  ),
);

const SPECIAL_STICKERS = TOURNAMENT_SPECIALS.map(
  ([id, nombre, tipo, categoriaEspecial, pagina], index) => ({
    id,
    numero: id,
    grupo: "Especiales",
    pais: "Tournament",
    nombre,
    tipo,
    categoriaEspecial,
    pagina,
    paginaInicioSeleccion: 1,
    obtenido: false,
    repetidos: 0,
    ordenGrupo: 13,
    ordenPais: 0,
    equipoCodigo: "FWC",
    colorGrupo: GROUP_COLORS.Especiales,
    edicion: "germany",
    ordenEspecial: index,
  }),
);

export const STICKERS = [...SPECIAL_STICKERS, ...TEAM_STICKERS, ...COCA_COLA_GERMANY];

export const ALBUM_METADATA = {
  name: "Panini FIFA World Cup 2026",
  edition: "germany",
  totalStickers: STICKERS.length,
  totalTeamStickers: TEAM_STICKERS.length,
  totalSpecialStickers: SPECIAL_STICKERS.length,
  totalCocaCola: COCA_COLA_GERMANY.length,
  firstTeamPage: 8,
  lastTeamPage: 105,
  lastAlbumPage: 107,
};
