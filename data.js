// Datos reales del álbum Panini FIFA World Cup 2026™.
// Fuente: https://www.checklistinsider.com/2026-panini-fifa-world-cup-sticker
// y https://www.laststicker.com/cards/panini_world_cup_2026/
// Estructura por equipo: 1 = Logo FOIL, 13 = Team Photo, 2-12 y 14-20 = jugadores.

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

// Colores de selección (basados en bandera / camiseta principal)
const TEAM_COLORS = {
  MEX: "#006847",
  RSA: "#007a4d",
  KOR: "#cd2e3a",
  CZE: "#11457e",
  CAN: "#d52b1e",
  BIH: "#002395",
  QAT: "#8a1538",
  SUI: "#d52b1e",
  BRA: "#fedf00",
  MAR: "#c1272d",
  HAI: "#00209f",
  SCO: "#005eb8",
  USA: "#3c3b6e",
  PAR: "#d52b1e",
  AUS: "#00843d",
  TUR: "#e30a17",
  GER: "#1c1b1b",
  CUW: "#003399",
  CIV: "#ff7900",
  ECU: "#ffd100",
  NED: "#ae1c28",
  JPN: "#bc002d",
  SWE: "#006aa7",
  TUN: "#e70013",
  BEL: "#000000",
  EGY: "#c8102e",
  IRN: "#239f40",
  NZL: "#000000",
  ESP: "#aa151b",
  CPV: "#003893",
  KSA: "#006c35",
  URU: "#7fb3d5",
  FRA: "#0055a4",
  SEN: "#00853f",
  IRQ: "#ce1126",
  NOR: "#ba0c2f",
  ARG: "#75aadb",
  ALG: "#006633",
  AUT: "#ed2939",
  JOR: "#000000",
  POR: "#006600",
  COD: "#007fff",
  UZB: "#1eb53a",
  COL: "#fcd116",
  ENG: "#ffffff",
  CRO: "#171796",
  GHA: "#fcd116",
  PAN: "#005293",
};

// Grupos A–L, cada uno con 4 selecciones y su página inicial.
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

// Especiales de torneo: 20 stickers reales (#00 Panini Logo + FWC1–FWC19).
const TOURNAMENT_SPECIALS = [
  ["FWC0", "00", "Panini Logo", "Logo", "Tournament Opener", 1],
  ["FWC1", "FWC1", "Official Emblem", "Logo", "Tournament Opener", 1],
  ["FWC2", "FWC2", "Official Emblem", "Logo", "Tournament Opener", 1],
  ["FWC3", "FWC3", "Official Mascots", "Mascota", "Tournament Opener", 2],
  ["FWC4", "FWC4", "Official Slogan", "Especial", "Tournament Opener", 2],
  ["FWC5", "FWC5", "Official Ball", "Especial", "Tournament Opener", 2],
  ["FWC6", "FWC6", "Canada — Host Country", "Host City", "Host Countries", 3],
  ["FWC7", "FWC7", "Mexico — Host Country", "Host City", "Host Countries", 3],
  ["FWC8", "FWC8", "USA — Host Country", "Host City", "Host Countries", 3],
  ["FWC9", "FWC9", "Italy 1934", "Especial", "FIFA Museum", 4],
  ["FWC10", "FWC10", "Uruguay 1950", "Especial", "FIFA Museum", 4],
  ["FWC11", "FWC11", "West Germany 1954", "Especial", "FIFA Museum", 4],
  ["FWC12", "FWC12", "Brazil 1962", "Especial", "FIFA Museum", 5],
  ["FWC13", "FWC13", "West Germany 1974", "Especial", "FIFA Museum", 5],
  ["FWC14", "FWC14", "Argentina 1986", "Especial", "FIFA Museum", 5],
  ["FWC15", "FWC15", "Brazil 1994", "Especial", "FIFA Museum", 6],
  ["FWC16", "FWC16", "Brazil 2002", "Especial", "FIFA Museum", 6],
  ["FWC17", "FWC17", "Italy 2006", "Especial", "FIFA Museum", 6],
  ["FWC18", "FWC18", "Germany 2014", "Especial", "FIFA Museum", 7],
  ["FWC19", "FWC19", "Argentina 2022", "Especial", "FIFA Museum", 7],
];

// Roster real por selección. Cada lista tiene 19 entradas (posiciones 2–12 y 14–20).
// Posición 1 = Logo del equipo (FOIL). Posición 13 = Team Photo.
const TEAM_ROSTERS = {
  MEX: [
    "Luis Malagón", "Johan Vasquez", "Jorge Sánchez", "César Montes", "Jesús Gallardo",
    "Israel Reyes", "Diego Lainez", "Carlos Rodríguez", "Edson Álvarez", "Orbelín Pineda",
    "Marcel Ruiz",
    "Érick Sánchez", "Hirving Lozano", "Santiago Giménez", "Raúl Jiménez", "Alexis Vega",
    "Roberto Alvarado", "César Huerta",
  ],
  RSA: [
    "Ronwen Williams", "Sipho Chaine", "Aubrey Modiba", "Samukele Kabini", "Mbekezeli Mbokazi",
    "Khulumani Ndamane", "Siyabonga Ngezana", "Khuliso Mudau", "Nkosinathi Sibisi",
    "Teboho Mokoena", "Thalente Mbatha",
    "Bathasi Aubaas", "Yaya Sithole", "Sipho Mbule", "Lyle Foster", "Iqraam Rayners",
    "Mohau Nkota", "Oswin Appollis",
  ],
  KOR: [
    "Jo Hyeon-woo", "Kim Seung-gyu", "Kim Min-jae", "Cho Yu-min", "Seol Young-woo",
    "Lee Han-beom", "Lee Tae-seok", "Lee Myung-jae", "Lee Jae-sung", "Hwang In-beom",
    "Lee Kang-in",
    "Paik Seung-ho", "Jens Castrop", "Lee Dong-gyeong", "Cho Gue-sung", "Son Heung-min",
    "Hwang Hee-chan", "Oh Hyeon-gyu",
  ],
  CZE: [
    "Matěj Kovář", "Jindřich Staněk", "Ladislav Krejčí", "Vladimír Coufal", "Jaroslav Zelený",
    "Tomáš Holeš", "David Zima", "Michal Sadílek", "Lukáš Provod", "Lukáš Červ",
    "Tomáš Souček",
    "Pavel Šulc", "Matěj Vydra", "Vasil Kušej", "Tomáš Chorý", "Václav Černý",
    "Adam Hložek", "Patrik Schick",
  ],
  CAN: [
    "Dayne St. Clair", "Alphonso Davies", "Alistair Johnston", "Samuel Adekugbe", "Richie Laryea",
    "Derek Cornelius", "Moïse Bombito", "Kamal Miller", "Stephen Eustáquio", "Ismaël Koné",
    "Jonathan Osorio",
    "Jacob Shaffelburg", "Mathieu Choinière", "Niko Sigur", "Tajon Buchanan", "Liam Millar",
    "Cyle Larin", "Jonathan David",
  ],
  BIH: [
    "Nikola Vasilj", "Amer Dedić", "Sead Kolašinac", "Tarik Muharemović", "Nihad Mujakić",
    "Nikola Katić", "Amir Hadžiahmetović", "Benjamin Tahirović", "Armin Gigović",
    "Ivan Šunjić", "Ivan Bašić",
    "Dženis Burnić", "Esmir Bajraktarević", "Amar Memić", "Ermedin Demirović", "Edin Džeko",
    "Samed Baždar", "Haris Tabaković",
  ],
  QAT: [
    "Meshaal Barsham", "Sultan Albrake", "Lucas Mendes", "Homam Ahmed", "Boualem Khoukhi",
    "Pedro Miguel", "Tarek Salman", "Mohamed Al-Mannai", "Karim Boudiaf", "Assim Madibo",
    "Ahmed Fatehi",
    "Mohammed Waad", "Abdulaziz Hatem", "Hassan Al-Haydos", "Edmilson Junior", "Akram Afif",
    "Ahmed Al-Ganehi", "Almoez Ali",
  ],
  SUI: [
    "Gregor Kobel", "Yvon Mvogo", "Manuel Akanji", "Ricardo Rodriguez", "Nico Elvedi",
    "Aurèle Amenda", "Silvan Widmer", "Granit Xhaka", "Denis Zakaria", "Remo Freuler",
    "Fabian Rieder",
    "Ardon Jashari", "Johan Manzambi", "Michel Aebischer", "Breel Embolo", "Rubén Vargas",
    "Dan Ndoye", "Zeki Amdouni",
  ],
  BRA: [
    "Alisson", "Bento", "Marquinhos", "Éder Militão", "Gabriel Magalhães",
    "Danilo", "Wesley", "Lucas Paquetá", "Casemiro", "Bruno Guimarães",
    "Luiz Henrique",
    "Vinícius Júnior", "Rodrygo", "João Pedro", "Matheus Cunha", "Gabriel Martinelli",
    "Raphinha", "Estêvão",
  ],
  MAR: [
    "Yassine Bounou", "Munir El Kajoui", "Achraf Hakimi", "Noussair Mazraoui", "Nayef Aguerd",
    "Romain Saïss", "Jawad El Yamiq", "Adam Masina", "Sofyan Amrabat", "Azzedine Ounahi",
    "Eliesse Ben Seghir",
    "Bilal El Khannouss", "Ismael Saibari", "Youssef En-Nesyri", "Abde Ezzalzouli",
    "Soufiane Rahimi", "Brahim Díaz", "Ayoub El Kaabi",
  ],
  HAI: [
    "Johny Placide", "Carlens Arcus", "Martin Experience", "Jean-Kevin Duverne", "Ricardo Adé",
    "Duke Lacroix", "Garven Metusala", "Hannes Delcroix", "Leverton Pierre",
    "Danley Jean Jacques", "Jean-Ricner Bellegarde",
    "Christopher Attys", "Derrick Etienne Jr.", "Josué Casimir", "Ruben Providence",
    "Duckens Nazon", "Louicius Deedson", "Frantzdy Pierrot",
  ],
  SCO: [
    "Angus Gunn", "Jack Hendry", "Kieran Tierney", "Aaron Hickey", "Andrew Robertson",
    "Scott McKenna", "John Souttar", "Anthony Ralston", "Grant Hanley", "Scott McTominay",
    "Billy Gilmour",
    "Lewis Ferguson", "Ryan Christie", "Kenny McLean", "John McGinn", "Lyndon Dykes",
    "Che Adams", "Ben Doak",
  ],
  USA: [
    "Matt Freese", "Chris Richards", "Tim Ream", "Mark McKenzie", "Alex Freeman",
    "Antonee Robinson", "Tyler Adams", "Tanner Tessmann", "Weston McKennie", "Christian Roldan",
    "Timothy Weah",
    "Diego Luna", "Malik Tillman", "Christian Pulisic", "Brenden Aaronson", "Ricardo Pepi",
    "Haji Wright", "Folarin Balogun",
  ],
  PAR: [
    "Roberto Fernández", "Orlando Gill", "Gustavo Gómez", "Fabián Balbuena", "Juan José Cáceres",
    "Omar Alderete", "Junior Alonso", "Mathías Villasanti", "Diego Gómez", "Damián Bobadilla",
    "Andrés Cubas",
    "Matías Galarza Fonda", "Julio Enciso", "Alejandro Romero Gamarra", "Miguel Almirón",
    "Ramón Sosa", "Ángel Romero", "Antonio Sanabria",
  ],
  AUS: [
    "Mathew Ryan", "Joe Gauci", "Harry Souttar", "Alessandro Circati", "Jordan Bos",
    "Aziz Behich", "Cameron Burgess", "Lewis Miller", "Miloš Degenek", "Jackson Irvine",
    "Riley McGree",
    "Aiden O'Neill", "Connor Metcalfe", "Patrick Yazbek", "Craig Goodwin", "Kusini Yengi",
    "Nestory Irankunda", "Mohamed Touré",
  ],
  TUR: [
    "Uğurcan Çakır", "Mert Müldür", "Zeki Çelik", "Abdülkerim Bardakcı", "Çağlar Söyüncü",
    "Merih Demiral", "Ferdi Kadıoğlu", "Kaan Ayhan", "İsmail Yüksek", "Hakan Çalhanoğlu",
    "Orkun Kökçü",
    "Arda Güler", "İrfan Can Kahveci", "Yunus Akgün", "Can Uzun", "Barış Alper Yılmaz",
    "Kerem Aktürkoğlu", "Kenan Yıldız",
  ],
  GER: [
    "Marc-André ter Stegen", "Jonathan Tah", "David Raum", "Nico Schlotterbeck", "Antonio Rüdiger",
    "Waldemar Anton", "Ridle Baku", "Maximilian Mittelstädt", "Joshua Kimmich", "Florian Wirtz",
    "Felix Nmecha",
    "Leon Goretzka", "Jamal Musiala", "Serge Gnabry", "Kai Havertz", "Leroy Sané",
    "Karim Adeyemi", "Nick Woltemade",
  ],
  CUW: [
    "Eloy Room", "Armando Obispo", "Sherel Floranus", "Jurien Gaari", "Joshua Brenet",
    "Roshon Van Eijma", "Shurandy Sambo", "Livano Comenencia", "Godfried Roemeratoe",
    "Juninho Bacuna", "Leandro Bacuna",
    "Tahith Chong", "Kenji Gorre", "Jearl Margaritha", "Jürgen Locadia", "Jeremy Antonisse",
    "Gervane Kastaneer", "Sontje Hansen",
  ],
  CIV: [
    "Yahia Fofana", "Ghislain Konan", "Wilfried Singo", "Odilon Kossounou", "Evan Ndicka",
    "Willy Boly", "Emmanuel Agbadou", "Ousmane Diomandé", "Franck Kessié", "Seko Fofana",
    "Ibrahim Sangaré",
    "Jean-Philippe Gbamin", "Amad Diallo", "Sébastien Haller", "Simon Adingra", "Yan Diomandé",
    "Evann Guessand", "Oumar Diakité",
  ],
  ECU: [
    "Hernán Galíndez", "Gonzalo Valle", "Piero Hincapié", "Pervis Estupiñán", "Willian Pacho",
    "Ángelo Preciado", "Joel Ordóñez", "Moisés Caicedo", "Alan Franco", "Kendry Páez",
    "Pedro Vite",
    "John Yeboah", "Leonardo Campana", "Gonzalo Plata", "Nilson Angulo", "Alan Minda",
    "Kevin Rodríguez", "Enner Valencia",
  ],
  NED: [
    "Bart Verbruggen", "Virgil van Dijk", "Micky van de Ven", "Jurriën Timber", "Denzel Dumfries",
    "Nathan Aké", "Jeremie Frimpong", "Jan Paul van Hecke", "Tijjani Reijnders",
    "Ryan Gravenberch", "Teun Koopmeiners",
    "Frenkie de Jong", "Xavi Simons", "Justin Kluivert", "Memphis Depay", "Donyell Malen",
    "Wout Weghorst", "Cody Gakpo",
  ],
  JPN: [
    "Zion Suzuki", "Henry Heroki Mochizuki", "Ayumu Seko", "Junnosuke Suzuki", "Shogo Taniguchi",
    "Tsuyoshi Watanabe", "Kaishu Sano", "Yuki Soma", "Ao Tanaka", "Daichi Kamada",
    "Takefusa Kubo",
    "Ritsu Doan", "Keito Nakamura", "Takumi Minamino", "Shuto Machino", "Junya Ito",
    "Koki Ogawa", "Ayase Ueda",
  ],
  SWE: [
    "Victor Johansson", "Isak Hien", "Gabriel Gudmundsson", "Emil Holm", "Victor Nilsson Lindelöf",
    "Gustaf Lagerbielke", "Lucas Bergvall", "Hugo Larsson", "Jesper Karlström", "Yasin Ayari",
    "Mattias Svanberg",
    "Daniel Svensson", "Ken Sema", "Roony Bardghji", "Dejan Kulusevski", "Anthony Elanga",
    "Alexander Isak", "Viktor Gyökeres",
  ],
  TUN: [
    "Bechir Ben Saïd", "Aymen Dahmen", "Yan Valery", "Montassar Talbi", "Yassine Meriah",
    "Ali Abdi", "Dylan Bronn", "Ellyes Skhiri", "Aïssa Laïdouni", "Ferjani Sassi",
    "Mohamed Ali Ben Romdhane",
    "Hannibal Mejbri", "Elias Achouri", "Elias Saad", "Hazem Mastouri", "Ismaël Gharbi",
    "Sayfallah Ltaief", "Naïm Sliti",
  ],
  BEL: [
    "Thibaut Courtois", "Arthur Theate", "Timothy Castagne", "Zeno Debast", "Brandon Mechele",
    "Maxim De Cuyper", "Thomas Meunier", "Youri Tielemans", "Amadou Onana", "Nicolas Raskin",
    "Alexis Saelemaekers",
    "Hans Vanaken", "Kevin De Bruyne", "Jérémy Doku", "Charles De Ketelaere", "Leandro Trossard",
    "Loïs Openda", "Romelu Lukaku",
  ],
  EGY: [
    "Mohamed El Shenawy", "Mohamed Hany", "Mohamed Hamdy", "Yasser Ibrahim", "Khaled Sobhi",
    "Ramy Rabia", "Hossam Abdelmaguid", "Ahmed Fatouh", "Marwan Attia", "Zizo",
    "Hamdy Fathy",
    "Mohamed Lasheen", "Emam Ashour", "Osama Faisal", "Mohamed Salah", "Mostafa Mohamed",
    "Trezeguet", "Omar Marmoush",
  ],
  IRN: [
    "Alireza Beiranvand", "Morteza Pouraliganji", "Ehsan Hajsafi", "Milad Mohammadi",
    "Shojae Khalilzadeh", "Ramin Rezaeian", "Hossein Kanaani", "Sadegh Moharrami",
    "Saleh Hardani", "Saeid Ezatolahi", "Saman Ghoddos",
    "Omid Noorafkan", "Roozbeh Cheshmi", "Mohammad Mohebi", "Sardar Azmoun", "Mehdi Taremi",
    "Alireza Jahanbakhsh", "Ali Gholizadeh",
  ],
  NZL: [
    "Max Crocombe Payne", "Alex Paulsen", "Michael Boxall", "Liberato Cacace", "Tim Payne",
    "Tyler Bindon", "Francis de Vries", "Finn Surman", "Joe Bell", "Sarpreet Singh",
    "Ryan Thomas",
    "Matthew Garbett", "Marko Stamenić", "Ben Old", "Chris Wood", "Elijah Just",
    "Callum McCowatt", "Kosta Barbarouses",
  ],
  ESP: [
    "Unai Simón", "Robin Le Normand", "Aymeric Laporte", "Dean Huijsen", "Pedro Porro",
    "Dani Carvajal", "Marc Cucurella", "Martín Zubimendi", "Rodri", "Pedri",
    "Fabián Ruiz",
    "Mikel Merino", "Lamine Yamal", "Dani Olmo", "Nico Williams", "Ferran Torres",
    "Álvaro Morata", "Mikel Oyarzabal",
  ],
  CPV: [
    "Vozinha", "Logan Costa", "Pico", "Diney", "Steven Moreira",
    "Wagner Pina", "João Paulo", "Yannick Semedo", "Kevin Pina", "Patrick Andrade",
    "Jamiro Monteiro",
    "Deroy Duarte", "Garry Rodrigues", "Jovane Cabral", "Ryan Mendes", "Dailon Livramento",
    "Willy Semedo", "Bebé",
  ],
  KSA: [
    "Nawaf Al-Aqidi", "Abdulrahman Al-Sanbi", "Saud Abdulhamid", "Nawaf Bouwashl", "Jihad Thakri",
    "Moteb Al-Harbi", "Hassan Al-Tambakti", "Musab Al-Juwayr", "Ziyad Al-Johani",
    "Abdullah Al-Khaibari", "Nasser Al-Dawsari",
    "Saleh Abu Al-Shamat", "Marwan Al-Sahafi", "Salem Al-Dawsari", "Abdulrahman Al-Aboud",
    "Feras Al-Brikan", "Saleh Al-Shehri", "Abdullah Al-Hamdan",
  ],
  URU: [
    "Sergio Rochet", "Santiago Mele", "Ronald Araújo", "José María Giménez", "Sebastián Cáceres",
    "Mathías Olivera", "Guillermo Varela", "Nahitan Nández", "Federico Valverde",
    "Giorgian de Arrascaeta", "Rodrigo Bentancur",
    "Manuel Ugarte", "Nicolás de la Cruz", "Maxi Araújo", "Darwin Núñez", "Federico Viñas",
    "Rodrigo Aguirre", "Facundo Pellistri",
  ],
  FRA: [
    "Mike Maignan", "Theo Hernández", "William Saliba", "Jules Koundé", "Ibrahima Konaté",
    "Dayot Upamecano", "Lucas Digne", "Aurélien Tchouaméni", "Eduardo Camavinga", "Manu Koné",
    "Adrien Rabiot",
    "Michael Olise", "Ousmane Dembélé", "Bradley Barcola", "Désiré Doué", "Kingsley Coman",
    "Hugo Ekitiké", "Kylian Mbappé",
  ],
  SEN: [
    "Édouard Mendy", "Yehvann Diouf", "Moussa Niakhaté", "Abdoulaye Seck", "Ismaïl Jakobs",
    "El Hadji Malick Diouf", "Kalidou Koulibaly", "Idrissa Gana Gueye", "Pape Matar Sarr",
    "Pape Gueye", "Habib Diarra",
    "Lamine Camara", "Sadio Mané", "Ismaïla Sarr", "Boulaye Dia", "Iliman Ndiaye",
    "Nicolas Jackson", "Krépin Diatta",
  ],
  IRQ: [
    "Jalal Hassan", "Rebin Sulaka", "Hussein Ali", "Akam Hashem", "Merchas Doski",
    "Zaid Tahseen", "Manaf Younis", "Zidane Iqbal", "Amir Al-Ammari", "Ibrahim Bayesh",
    "Ali Jasim",
    "Youssef Amyn", "Aimar Sher", "Marko Farji", "Osama Rashid", "Ali Al-Hamadi",
    "Aymen Hussein", "Mohanad Ali",
  ],
  NOR: [
    "Ørjan Nyland", "Julian Ryerson", "Leo Østigård", "Kristoffer Vassbakk Ajer",
    "Marcus Holmgren Pedersen", "David Møller Wolfe", "Torbjørn Heggem", "Morten Thorsby",
    "Martin Ødegaard", "Sander Berge", "Andreas Schjelderup",
    "Patrick Berg", "Erling Haaland", "Alexander Sørloth", "Aron Dønnum", "Jørgen Strand Larsen",
    "Antonio Nusa", "Oscar Bobb",
  ],
  ARG: [
    "Emiliano Martínez", "Nahuel Molina", "Cristian Romero", "Nicolás Otamendi", "Nicolás Tagliafico",
    "Leonardo Balerdi", "Enzo Fernández", "Alexis Mac Allister", "Rodrigo De Paul",
    "Exequiel Palacios", "Leandro Paredes",
    "Nico Paz", "Franco Mastantuono", "Nico González", "Lionel Messi", "Lautaro Martínez",
    "Julián Álvarez", "Giuliano Simeone",
  ],
  ALG: [
    "Alexis Guendouz", "Ramy Bensebaini", "Youcef Atal", "Rayan Aït-Nouri", "Mohamed Amine Tougai",
    "Aïssa Mandi", "Ismaël Bennacer", "Houssem Aouar", "Hicham Boudaoui", "Ramiz Zerrouki",
    "Nabil Bentaleb",
    "Farès Chaïbi", "Riyad Mahrez", "Saïd Benrahma", "Anis Hadj Moussa", "Amine Gouiri",
    "Baghdad Bounedjah", "Mohammed Amoura",
  ],
  AUT: [
    "Alexander Schlager", "Patrick Pentz", "David Alaba", "Kevin Danso", "Philipp Lienhart",
    "Stefan Posch", "Phillipp Mwene", "Alexander Prass", "Xaver Schlager", "Marcel Sabitzer",
    "Konrad Laimer",
    "Florian Grillitsch", "Nicolas Seiwald", "Romano Schmid", "Patrick Wimmer",
    "Christoph Baumgartner", "Michael Gregoritsch", "Marko Arnautović",
  ],
  JOR: [
    "Yazeed Abulaila", "Ihsan Haddad", "Mohammad Abu Hashish", "Yazan Al-Arab", "Abdallah Nasib",
    "Saleem Obaid", "Mohammad Abu Alnadi", "Ibrahim Saadeh", "Nizar Al-Rashdan",
    "Noor Al-Rawabdeh", "Mohannad Abu Taha",
    "Amer Jamous", "Musa Al-Taamari", "Yazan Al-Naimat", "Mahmoud Al-Mardi", "Ali Olwan",
    "Mohammad Abu Zrayq", "Ibrahim Sabra",
  ],
  POR: [
    "Diogo Costa", "José Sá", "Rúben Dias", "João Cancelo", "Diogo Dalot",
    "Nuno Mendes", "Gonçalo Inácio", "Bernardo Silva", "Bruno Fernandes", "Rúben Neves",
    "Vitinha",
    "João Neves", "Cristiano Ronaldo", "Francisco Trincão", "João Félix", "Gonçalo Ramos",
    "Pedro Neto", "Rafael Leão",
  ],
  COD: [
    "Lionel Mpasi", "Aaron Wan-Bissaka", "Axel Tuanzebe", "Arthur Masuaku", "Chancel Mbemba",
    "Joris Kayembe", "Charles Pickel", "Ngal'ayel Mukau", "Edo Kayembe", "Samuel Moutoussamy",
    "Noah Sadiki",
    "Théo Bongonda", "Meschack Elia", "Yoane Wissa", "Brian Cipenga", "Fiston Mayele",
    "Cédric Bakambu", "Nathanaël Mbuku",
  ],
  UZB: [
    "Utkir Yusupov", "Farrukh Sayfiev", "Sherzod Nasrullaev", "Umar Eshmurodov", "Husniddin Aliqulov",
    "Rustamjon Ashurmatov", "Khojiakbar Alijonov", "Abdukodir Khusanov", "Odiljon Hamrobekov",
    "Otabek Shukurov", "Jamshid Iskanderov",
    "Azizbek Turgunboev", "Khojimat Erkinov", "Eldor Shomurodov", "Oston Urunov",
    "Jaloliddin Masharipov", "Igor Sergeev", "Abbosbek Fayzullaev",
  ],
  COL: [
    "Camilo Vargas", "David Ospina", "Dávinson Sánchez", "Yerry Mina", "Daniel Muñoz",
    "Johan Mojica", "Jhon Lucumí", "Santiago Arias", "Jefferson Lerma", "Kevin Castaño",
    "Richard Ríos",
    "James Rodríguez", "Juan Fernando Quintero", "Jorge Carrascal", "Jhon Arias", "Jhon Córdoba",
    "Luis Suárez", "Luis Díaz",
  ],
  ENG: [
    "Jordan Pickford", "John Stones", "Marc Guéhi", "Ezri Konsa", "Trent Alexander-Arnold",
    "Reece James", "Dan Burn", "Jordan Henderson", "Declan Rice", "Jude Bellingham",
    "Cole Palmer",
    "Morgan Rogers", "Anthony Gordon", "Phil Foden", "Bukayo Saka", "Harry Kane",
    "Marcus Rashford", "Ollie Watkins",
  ],
  CRO: [
    "Dominik Livaković", "Duje Ćaleta-Car", "Joško Gvardiol", "Josip Stanišić", "Luka Vušković",
    "Josip Šutalo", "Kristijan Jakić", "Luka Modrić", "Mateo Kovačić", "Martin Baturina",
    "Lovro Majer",
    "Mario Pašalić", "Petar Sučić", "Ivan Perišić", "Marco Pašalić", "Ante Budimir",
    "Andrej Kramarić", "Franjo Ivanović",
  ],
  GHA: [
    "Lawrence Ati-Zigi", "Tariq Lamptey", "Mohammed Salisu", "Alidu Seidu", "Alexander Djiku",
    "Gideon Mensah", "Caleb Yirenkyi", "Abdul Fatawu Issahaku", "Thomas Partey",
    "Salis Abdul Samed", "Kamaldeen Sulemana",
    "Mohammed Kudus", "Iñaki Williams", "Jordan Ayew", "André Ayew", "Joseph Paintsil",
    "Osman Bukari", "Antoine Semenyo",
  ],
  PAN: [
    "Orlando Mosquera", "Luis Mejía", "Fidel Escobar", "Andrés Andrade", "Michael Amir Murillo",
    "Eric Davis", "José Córdoba", "César Blackman", "Cristian Martínez", "Aníbal Godoy",
    "Adalberto Carrasquilla",
    "Édgar Bárcenas", "Carlos Harvey", "Ismael Díaz", "José Fajardo", "Cecilio Waterman",
    "José Luis Rodríguez", "Alberto Quintero",
  ],
};

// Coca-Cola Germany (subset regional opcional, 12 cromos).
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
  colorPais: GROUP_COLORS["Coca-Cola"],
  edicion: "germany",
}));

function nameForPosition(roster, position) {
  // Posición 1 = logo. Posición 13 = team photo. Resto, jugador.
  if (position === 1) return null;
  if (position === 13) return null;
  // Roster trae 18 jugadores en orden: posiciones 2..12 (11) y 14..20 (7) = 18.
  const idx = position < 13 ? position - 2 : position - 3;
  return roster[idx];
}

function buildTeamStickers(team, group, order) {
  const roster = TEAM_ROSTERS[team.code];
  if (!roster) {
    throw new Error(`Roster faltante para ${team.code}`);
  }

  return Array.from({ length: 20 }, (_, index) => {
    const position = index + 1;
    let tipo = "Normal";
    let categoriaEspecial = "";
    let nombre;

    if (position === 1) {
      tipo = "Escudo";
      categoriaEspecial = "Team Identity";
      nombre = `${team.country} Logo`;
    } else if (position === 13) {
      tipo = "Team Photo";
      categoriaEspecial = "Team Identity";
      nombre = `${team.country} Team Photo`;
    } else {
      nombre = nameForPosition(roster, position) || `${team.country} #${position}`;
    }

    return {
      id: `${team.code}${position}`,
      numero: `${team.code}${position}`,
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
      colorPais: TEAM_COLORS[team.code] || GROUP_COLORS[group],
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
    color: GROUP_COLORS[group.letter],
    order: index,
  })),
);

const TEAM_STICKERS = GROUPS.flatMap((group) =>
  group.teams.flatMap((team, index) => buildTeamStickers(team, group.letter, index)),
);

const SPECIAL_STICKERS = TOURNAMENT_SPECIALS.map(
  ([id, numero, nombre, tipo, categoriaEspecial, pagina], index) => ({
    id,
    numero,
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
    colorPais: GROUP_COLORS.Especiales,
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
