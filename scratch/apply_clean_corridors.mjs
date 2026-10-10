import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Updated PHASE_FILTERS
const updatedPhaseFilters = `export const PHASE_FILTERS: PhaseFilterMeta[] = [
  {
    id: 'all',
    label: 'Todas las Fases',
    saga: 'UCM Completo',
    color: '#FFFFFF',
    glow: 'rgba(255,255,255,0.4)',
    centerX: 0,
    centerY: 5500,
    zoom: 0.12,
  },
  {
    id: 'Fase 1',
    label: 'Fase 1',
    saga: 'The Infinity Saga (Orígenes)',
    color: '#00A8FF',
    glow: 'rgba(0,168,255,0.45)',
    centerX: 120,
    centerY: 1050,
    zoom: 0.65,
  },
  {
    id: 'Fase 2',
    label: 'Fase 2',
    saga: 'The Infinity Saga (Expansión)',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.45)',
    centerX: 120,
    centerY: 2950,
    zoom: 0.7,
  },
  {
    id: 'Fase 3',
    label: 'Fase 3',
    saga: 'The Infinity Saga (Clímax)',
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.45)',
    centerX: 0,
    centerY: 5100,
    zoom: 0.55,
  },
  {
    id: 'Fase 4',
    label: 'Fase 4',
    saga: 'The Multiverse Saga (Fracturas)',
    color: '#C084FC',
    glow: 'rgba(192,132,252,0.45)',
    centerX: 0,
    centerY: 7200,
    zoom: 0.45,
  },
  {
    id: 'Fase 5',
    label: 'Fase 5',
    saga: 'The Multiverse Saga (Caos Multiversal)',
    color: '#F472B6',
    glow: 'rgba(244,114,182,0.45)',
    centerX: 200,
    centerY: 8200,
    zoom: 0.42,
  },
  {
    id: 'Fase 6',
    label: 'Fase 6',
    saga: 'The Multiverse Saga (Doomsday)',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.5)',
    centerX: 0,
    centerY: 9500,
    zoom: 0.42,
  },
];`;

content = content.replace(
  /export const PHASE_FILTERS: PhaseFilterMeta\[\] = \[[\s\S]*?\];/m,
  updatedPhaseFilters
);

// 2. Updated UNIVERSE_CONTAINERS (Separados con amplios márgenes del UCM)
const updatedUniverseContainers = `export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
  {
    "id": "container-spiderman-multiverse",
    "title": "Multiverso Spider-Man",
    "badgeColor": "#E11D48",
    "borderColor": "rgba(225, 29, 72, 0.45)",
    "glowColor": "rgba(225, 29, 72, 0.18)",
    "x": 1340,
    "y": 6630,
    "width": 500,
    "height": 1140,
    "era": "fase-4"
  },
  {
    "id": "container-xmen-multiverse",
    "title": "Universo X-Men",
    "badgeColor": "#F59E0B",
    "borderColor": "rgba(245, 158, 11, 0.45)",
    "glowColor": "rgba(245, 158, 11, 0.18)",
    "x": 1340,
    "y": 7830,
    "width": 500,
    "height": 1900,
    "era": "fase-5"
  },
  {
    "id": "container-fantasticfour-multiverse",
    "title": "Universo Los 4 Fantásticos",
    "badgeColor": "#06B6D4",
    "borderColor": "rgba(0, 182, 212, 0.45)",
    "glowColor": "rgba(0, 182, 212, 0.18)",
    "x": -1320,
    "y": 7770,
    "width": 260,
    "height": 760,
    "era": "fase-6"
  },
  {
    "id": "container-xmen-animated",
    "title": "Universo Animado X-Men",
    "badgeColor": "#8B5CF6",
    "borderColor": "rgba(139, 92, 246, 0.4)",
    "glowColor": "rgba(139, 92, 246, 0.15)",
    "x": 1840,
    "y": 8210,
    "width": 260,
    "height": 1140,
    "era": "fase-5"
  },
  {
    "id": "container-spiderman-animated",
    "title": "Multiverso Animado Spider-Man",
    "badgeColor": "#EC4899",
    "borderColor": "rgba(236, 72, 153, 0.4)",
    "glowColor": "rgba(236, 72, 153, 0.15)",
    "x": 1840,
    "y": 6630,
    "width": 260,
    "height": 1520,
    "era": "fase-6"
  }
];`;

content = content.replace(
  /export const UNIVERSE_CONTAINERS: UniverseContainerConfig\[\] = \[[\s\S]*?\];/m,
  updatedUniverseContainers
);

// 3. Updated ROADMAP_NODE_LAYOUTS
const coords = {
  // Phase 1 (Infinity Saga - Origins)
  'iron-man-1': { x: 0, y: 100 },
  'the-incredible-hulk-2': { x: 0, y: 460 },
  'thor-4': { x: 0, y: 820 },
  'iron-man-2-3': { x: 0, y: 1180 },
  'captain-america-the-first-avenger-5': { x: 0, y: 1540 },
  'agent-carter-s1': { x: 260, y: 1540 },
  'the-avengers-6': { x: 0, y: 1900 },
  'agents-of-shield-7': { x: 260, y: 1900 },

  // Phase 2 (Infinity Saga - Expansion)
  'thor-the-dark-world-8': { x: 0, y: 2260 },
  'iron-man-3-9': { x: 0, y: 2620 },
  'captain-america-the-winter-soldier-10': { x: 0, y: 2980 },
  'avengers-age-of-ultron-13': { x: 0, y: 3340 },
  'guardians-of-the-galaxy-11': { x: 260, y: 3340 },
  'guardians-of-the-galaxy-vol-2-12': { x: 260, y: 3700 },
  'ant-man-14': { x: 0, y: 3700 },

  // Phase 3 (Infinity Saga - Climax)
  'captain-america-civil-war-15': { x: 0, y: 4060 },
  'doctor-strange-16': { x: 0, y: 4420 },
  'spider-man-homecoming-17': { x: 0, y: 4780 },
  'thor-ragnarok-18': { x: 0, y: 5140 },
  'black-panther-19': { x: 0, y: 5500 },
  'ant-man-and-the-wasp-21': { x: -260, y: 5500 },
  'avengers-infinity-war-20': { x: 0, y: 5860 },
  'captain-marvel-22': { x: 260, y: 5860 },
  'avengers-endgame-23': { x: 0, y: 6220 },

  // ==============================================================
  // MULTIVERSE SAGA: CLEAN DEDICATED NARRATIVE CORRIDORS
  // ==============================================================
  // Post-Endgame Origin Wave at Y = 6700:
  'eternals-31': { x: -750, y: 6700 },
  'wanda-vision-25': { x: -500, y: 6700 },
  'black-widow-27': { x: -250, y: 6700 },
  'hawkeye-32': { x: 0, y: 6700 },
  'falcon-and-winter-soldier-26': { x: 250, y: 6700 },
  'spider-man-far-from-home-24': { x: 500, y: 6700 },
  'loki-s1': { x: 750, y: 6700 },
  'shang-chi-and-the-legend-of-the-ten-rings-30': { x: 1000, y: 6700 },

  // --- CORRIDOR 1: MAGIC & WANDA (X = -500) ---
  'doctor-strange-2-34': { x: -500, y: 7080 },
  'agatha-all-along-2024': { x: -500, y: 7460 },
  'up-vision-quest': { x: -500, y: 7840 },
  'fantastic-four-first-steps-2025': { x: -500, y: 8220 },

  // --- CORRIDOR 2: THE MARVELS & ESPIONAGE (X = -250) ---
  'ms-marvel-36': { x: -250, y: 7080 },
  'the-marvels-41': { x: -250, y: 7460 },
  'secret-invasion-2023': { x: -250, y: 7840 },

  // --- CORRIDOR 3: STREET & KINGPIN (X = 0) ---
  'echo-2024': { x: 0, y: 7080 },
  'daredevil-born-again-s1': { x: 0, y: 7460 },
  'daredevil-born-again-s2': { x: 0, y: 7840 },
  'up-daredevil-born-again-s3': { x: 0, y: 8220 },

  // --- CORRIDOR 4: CAPTAIN AMERICA & THUNDERBOLTS (X = 250) ---
  'captain-america-brave-new-world-43': { x: 250, y: 7080 },
  'she-hulk-37': { x: 250, y: 7460 },
  'thunderbolts-44': { x: 250, y: 7840 },
  'wonder-man-47': { x: 250, y: 8220 },

  // --- CORRIDOR 5: SPIDER-MAN (X = 500) ---
  'spider-man-no-way-home-33': { x: 500, y: 7080 },
  'up-spider-man-4': { x: 500, y: 7460 },

  // --- CORRIDOR 6: LOKI & TVA (X = 750) ---
  'loki-s2': { x: 750, y: 7080 },
  'ant-man-quantumania-39': { x: 750, y: 7460 },

  // --- CORRIDOR 7: COSMIC & GUARDIANS (X = 1000) ---
  'thor-love-and-thunder-35': { x: 1000, y: 7080 },
  'guardians-galaxy-holiday-special': { x: 1000, y: 7460 },
  'guardians-of-the-galaxy-vol-3-40': { x: 1000, y: 7840 },
  'deadpool-wolverine-42': { x: 1000, y: 8220 },

  // --- CORRIDOR 8: WAKANDA & TECHNOLOGY (X = -750) ---
  'black-panther-wakanda-forever-38': { x: -750, y: 7080 },
  'ironheart-49': { x: -750, y: 7460 },
  'up-armor-wars': { x: -750, y: 7840 },

  // --- STANDALONE SPECIALS (X = -980) ---
  'eye-of-wakanda-45': { x: -980, y: 7080 },
  'moon-knight-35': { x: -980, y: 7460 },
  'werewolf-by-night': { x: -980, y: 7840 },

  // ==============================================================
  // OTROS UNIVERSOS (SEPARADOS EN SUS PROPIOS CONTENEDORES)
  // ==============================================================
  // --- CONTAINER 1: SONY SPIDER-MAN MULTIVERSE (X = 1380 a 1620) ---
  'spider-man-1-tobey': { x: 1380, y: 6700 },
  'spider-man-2-tobey': { x: 1380, y: 7080 },
  'spider-man-3-tobey': { x: 1380, y: 7460 },
  'the-amazing-spider-man-1-andrew': { x: 1620, y: 7080 },
  'the-amazing-spider-man-2-andrew': { x: 1620, y: 7460 },

  // --- CONTAINER 2: FOX X-MEN MULTIVERSE (X = 1380 a 1620, Y = 7900+) ---
  'x-men-2000': { x: 1380, y: 7900 },
  'x-men-2-2003': { x: 1380, y: 8280 },
  'x-men-3-the-last-stand-2006': { x: 1380, y: 8660 },
  'x-men-origins-wolverine-2009': { x: 1380, y: 9040 },
  'x-men-first-class-2011': { x: 1620, y: 7900 },
  'x-men-days-of-future-past-2014': { x: 1620, y: 8280 },
  'deadpool-1-2016': { x: 1620, y: 8660 },
  'deadpool-2-2018': { x: 1620, y: 9040 },
  'logan-2017': { x: 1380, y: 9420 },

  // --- CONTAINER 3: FOX FANTASTIC FOUR (X = -1280) ---
  'fantastic-four-2005': { x: -1280, y: 7840 },
  'fantastic-four-rise-of-the-silver-surfer-2007': { x: -1280, y: 8220 },

  // --- CONTAINER 4: ANIMATED X-MEN (X = 1880, Y = 8280+) ---
  'x-men-animated-series-1992': { x: 1880, y: 8280 },
  'x-men-97-s1': { x: 1880, y: 8660 },
  'x-men-97-s2': { x: 1880, y: 9040 },

  // --- CONTAINER 5: ANIMATED SPIDER-MAN (X = 1880, Y = 6700+) ---
  'spider-man-animated-series-1994': { x: 1880, y: 6700 },
  'the-spectacular-spider-man-2008': { x: 1880, y: 7080 },
  'your-friendly-neighborhood-spider-man-s1': { x: 1880, y: 7460 },
  'up-yfnsm-s2': { x: 1880, y: 7840 },

  // --- FLOATING EXTRAS (Extremo izquierdo, X = -1540 a -1760) ---
  'what-if-s1': { x: -1540, y: 6700 },
  'what-if-s2': { x: -1540, y: 7080 },
  'what-if-s3': { x: -1540, y: 7460 },
  'marvel-zombies-46': { x: -1540, y: 7840 },
  'i-am-groot-s1': { x: -1760, y: 6700 },
  'i-am-groot-s2': { x: -1760, y: 7080 },

  // --- THE DEFENDERS SAGA (NETFLIX) ---
  'daredevil-netflix-s1': { x: -250, y: 8680 },
  'daredevil-netflix-s2': { x: -250, y: 9060 },
  'daredevil-netflix-s3': { x: -250, y: 9440 },
  'the-defenders': { x: 0, y: 9060 },
  'jessica-jones-s1': { x: 250, y: 8680 },
  'jessica-jones-s2': { x: 250, y: 9060 },
  'jessica-jones-s3': { x: 250, y: 9440 },
  'luke-cage-s1': { x: 500, y: 8680 },
  'luke-cage-s2': { x: 500, y: 9060 },
  'iron-fist-s1': { x: 750, y: 8680 },
  'iron-fist-s2': { x: 750, y: 9060 },
  'punisher-s1': { x: 0, y: 9440 },
  'punisher-s2': { x: 500, y: 9440 },
  'punisher-one-last-kill': { x: 250, y: 9820 },

  // --- CLIMAX: AVENGERS DOOMSDAY & SECRET WARS ---
  'up-avengers-doomsday': { x: 0, y: 10280 },
  'up-avengers-secret-wars': { x: 0, y: 10660 },
};

const startLayout = content.indexOf('export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ');
const endLayout = content.indexOf('];\n\nexport const ROADMAP_CONNECTIONS');
let layouts = JSON.parse(content.slice(startLayout + 57, endLayout + 1));

layouts.forEach(l => {
  if (coords[l.id]) {
    l.x = coords[l.id].x;
    l.y = coords[l.id].y;
  }
});

const updatedLayoutsStr = `export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ` + JSON.stringify(layouts, null, 2);

content = content.slice(0, startLayout) + updatedLayoutsStr + content.slice(endLayout);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully written clean corridor layout with separated universes!');
