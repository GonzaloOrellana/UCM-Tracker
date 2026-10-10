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
    centerY: 5200,
    zoom: 0.14,
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
    centerY: 7800,
    zoom: 0.42,
  },
  {
    id: 'Fase 6',
    label: 'Fase 6',
    saga: 'The Multiverse Saga (Doomsday)',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.5)',
    centerX: 0,
    centerY: 8800,
    zoom: 0.42,
  },
];`;

content = content.replace(
  /export const PHASE_FILTERS: PhaseFilterMeta\[\] = \[[\s\S]*?\];/m,
  updatedPhaseFilters
);

// 2. Updated UNIVERSE_CONTAINERS
const updatedUniverseContainers = `export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
  {
    "id": "container-spiderman-multiverse",
    "title": "Multiverso Spider-Man",
    "badgeColor": "#E11D48",
    "borderColor": "rgba(225, 29, 72, 0.45)",
    "glowColor": "rgba(225, 29, 72, 0.18)",
    "x": 680,
    "y": 6990,
    "width": 480,
    "height": 1140,
    "era": "fase-4"
  },
  {
    "id": "container-xmen-multiverse",
    "title": "Universo X-Men",
    "badgeColor": "#F59E0B",
    "borderColor": "rgba(245, 158, 11, 0.45)",
    "glowColor": "rgba(245, 158, 11, 0.18)",
    "x": 1160,
    "y": 8130,
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
    "x": -740,
    "y": 8510,
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
    "x": 1640,
    "y": 8130,
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
    "x": 920,
    "y": 7750,
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
  // Phase 1
  'iron-man-1': { x: 0, y: 100 },
  'the-incredible-hulk-2': { x: 0, y: 460 },
  'thor-4': { x: 0, y: 820 },
  'iron-man-2-3': { x: 0, y: 1180 },
  'captain-america-the-first-avenger-5': { x: 0, y: 1540 },
  'agent-carter-s1': { x: 240, y: 1540 },
  'the-avengers-6': { x: 0, y: 1900 },
  'agents-of-shield-7': { x: 240, y: 1900 },

  // Phase 2
  'thor-the-dark-world-8': { x: 0, y: 2260 },
  'iron-man-3-9': { x: 0, y: 2620 },
  'captain-america-the-winter-soldier-10': { x: 0, y: 2980 },
  'avengers-age-of-ultron-13': { x: 0, y: 3340 },
  'guardians-of-the-galaxy-11': { x: 240, y: 3340 },
  'guardians-of-the-galaxy-vol-2-12': { x: 240, y: 3700 },
  'ant-man-14': { x: 0, y: 3700 },

  // Phase 3
  'captain-america-civil-war-15': { x: 0, y: 4060 },
  'doctor-strange-16': { x: 0, y: 4420 },
  'spider-man-homecoming-17': { x: 0, y: 4780 },
  'thor-ragnarok-18': { x: 0, y: 5140 },
  'black-panther-19': { x: 0, y: 5500 },
  'ant-man-and-the-wasp-21': { x: -240, y: 5500 },
  'avengers-infinity-war-20': { x: 0, y: 5860 },
  'captain-marvel-22': { x: 240, y: 5860 },
  'avengers-endgame-23': { x: 0, y: 6220 },

  // ==============================================================
  // POST-ENDGAME NARRATIVE TREE (ORGANIZED STRICTLY BY EVENTS!)
  // ==============================================================
  // Root Row (Y = 6680):
  'eternals-31': { x: -720, y: 6680 },
  'wanda-vision-25': { x: -480, y: 6680 },
  'black-widow-27': { x: -240, y: 6680 },
  'hawkeye-32': { x: 0, y: 6680 },
  'falcon-and-winter-soldier-26': { x: 240, y: 6680 },
  'spider-man-far-from-home-24': { x: 480, y: 6680 },
  'loki-s1': { x: 1000, y: 6680 },
  'shang-chi-and-the-legend-of-the-ten-rings-30': { x: 1240, y: 6680 },

  // --- FLOATING EXTRAS (Far left, completely out of the way) ---
  'what-if-s1': { x: -1400, y: 6680 },
  'what-if-s2': { x: -1400, y: 7060 },
  'what-if-s3': { x: -1400, y: 7440 },
  'i-am-groot-s1': { x: -1160, y: 6680 },
  'i-am-groot-s2': { x: -1160, y: 7060 },
  'marvel-zombies-46': { x: -1400, y: 7820 },

  // --- COL -480: WANDAVISION CONSEQUENCES COLUMN (Directly under WandaVision) ---
  'doctor-strange-2-34': { x: -480, y: 7060 },
  'agatha-all-along-2024': { x: -480, y: 7440 },
  'up-vision-quest': { x: -480, y: 7820 },

  // --- COL -240: MS MARVEL & THE MARVELS ---
  'ms-marvel-36': { x: -240, y: 7060 },
  'the-marvels-41': { x: -240, y: 7440 },
  'secret-invasion-2023': { x: -240, y: 7820 },

  // --- COL 0: HAWKEYE & STREET COLUMN (Directly under Hawkeye) ---
  'echo-2024': { x: 0, y: 7060 },
  'daredevil-born-again-s1': { x: 0, y: 7440 },
  'daredevil-born-again-s2': { x: 0, y: 7820 },
  'up-daredevil-born-again-s3': { x: 0, y: 8200 },

  // --- COL 240: FALCON & WINTER SOLDIER -> BRAVE NEW WORLD -> THUNDERBOLTS ---
  'captain-america-brave-new-world-43': { x: 240, y: 7060 },
  'thunderbolts-44': { x: 240, y: 7820 },

  // --- COL 480: SPIDER-MAN BRANCH ---
  'spider-man-no-way-home-33': { x: 480, y: 7060 },
  'up-spider-man-4': { x: 480, y: 7440 },

  // --- SONY SPIDER-MAN MULTIVERSE (Directly to the right of No Way Home) ---
  'spider-man-1-tobey': { x: 720, y: 7060 },
  'spider-man-2-tobey': { x: 720, y: 7440 },
  'spider-man-3-tobey': { x: 720, y: 7820 },
  'the-amazing-spider-man-1-andrew': { x: 940, y: 7060 },
  'the-amazing-spider-man-2-andrew': { x: 940, y: 7440 },

  // --- LOKI & COSMIC ---
  'loki-s2': { x: 1180, y: 7060 },
  'guardians-galaxy-holiday-special': { x: 1420, y: 6680 },
  'guardians-of-the-galaxy-vol-3-40': { x: 1420, y: 7060 },
  'thor-love-and-thunder-35': { x: 1180, y: 7440 },
  'ant-man-quantumania-39': { x: 1180, y: 7820 },

  // --- WAKANDA / IRONHEART (BY EVENTS!) ---
  'black-panther-wakanda-forever-38': { x: -720, y: 7060 },
  'eye-of-wakanda-45': { x: -940, y: 7060 },
  'ironheart-49': { x: -720, y: 7440 },
  'up-armor-wars': { x: -940, y: 7440 },

  // --- MYSTIC / STREET SPECIALS ---
  'moon-knight-35': { x: -720, y: 7820 },
  'werewolf-by-night': { x: -940, y: 7820 },
  'she-hulk-37': { x: 240, y: 7440 },
  'wonder-man-47': { x: 480, y: 7820 },

  // --- NETFLIX DEFENDERS (Street block leading into Daredevil Born Again) ---
  'daredevil-netflix-s1': { x: -240, y: 8200 },
  'daredevil-netflix-s2': { x: -240, y: 8580 },
  'daredevil-netflix-s3': { x: -240, y: 8960 },
  'the-defenders': { x: 0, y: 8580 },
  'jessica-jones-s1': { x: 240, y: 8200 },
  'jessica-jones-s2': { x: 240, y: 8580 },
  'jessica-jones-s3': { x: 240, y: 8960 },
  'luke-cage-s1': { x: 480, y: 8200 },
  'luke-cage-s2': { x: 480, y: 8580 },
  'iron-fist-s1': { x: 720, y: 8200 },
  'iron-fist-s2': { x: 720, y: 8580 },
  'punisher-s1': { x: 0, y: 8960 },
  'punisher-s2': { x: 480, y: 8960 },
  'punisher-one-last-kill': { x: 240, y: 9340 },

  // --- FOX X-MEN & DEADPOOL (Leading into Deadpool & Wolverine) ---
  'x-men-2000': { x: 1200, y: 8200 },
  'x-men-2-2003': { x: 1200, y: 8580 },
  'x-men-3-the-last-stand-2006': { x: 1200, y: 8960 },
  'x-men-origins-wolverine-2009': { x: 1200, y: 9340 },
  'x-men-first-class-2011': { x: 1440, y: 8200 },
  'x-men-days-of-future-past-2014': { x: 1440, y: 8580 },
  'deadpool-1-2016': { x: 1440, y: 8960 },
  'deadpool-2-2018': { x: 1440, y: 9340 },
  'logan-2017': { x: 1200, y: 9720 },
  'deadpool-wolverine-42': { x: 960, y: 9720 },

  // --- ANIMATED X-MEN ---
  'x-men-animated-series-1992': { x: 1680, y: 8200 },
  'x-men-97-s1': { x: 1680, y: 8580 },
  'x-men-97-s2': { x: 1680, y: 8960 },

  // --- ANIMATED SPIDER-MAN ---
  'spider-man-animated-series-1994': { x: 960, y: 7820 },
  'the-spectacular-spider-man-2008': { x: 960, y: 8200 },
  'your-friendly-neighborhood-spider-man-s1': { x: 960, y: 8580 },
  'up-yfnsm-s2': { x: 960, y: 8960 },

  // --- FANTASTIC FOUR MULTIVERSE ---
  'fantastic-four-2005': { x: -700, y: 8580 },
  'fantastic-four-rise-of-the-silver-surfer-2007': { x: -700, y: 8960 },
  'fantastic-four-first-steps-2025': { x: -480, y: 8960 },

  // --- AVENGERS DOOMSDAY & SECRET WARS ---
  'up-avengers-doomsday': { x: 0, y: 9800 },
  'up-avengers-secret-wars': { x: 0, y: 10180 },
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
console.log('Successfully written narrative event tree coordinates and config to roadmapTreeData.ts!');
