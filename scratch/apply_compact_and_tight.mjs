import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Updated PHASE_FILTERS centers
const updatedPhaseFilters = `export const PHASE_FILTERS: PhaseFilterMeta[] = [
  {
    id: 'all',
    label: 'Todas las Fases',
    saga: 'UCM Completo',
    color: '#FFFFFF',
    glow: 'rgba(255,255,255,0.4)',
    centerX: 0,
    centerY: 7700,
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
    centerY: 3100,
    zoom: 0.7,
  },
  {
    id: 'Fase 3',
    label: 'Fase 3',
    saga: 'The Infinity Saga (Clímax)',
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.45)',
    centerX: 0,
    centerY: 5400,
    zoom: 0.55,
  },
  {
    id: 'Fase 4',
    label: 'Fase 4',
    saga: 'The Multiverse Saga (Fracturas)',
    color: '#C084FC',
    glow: 'rgba(192,132,252,0.45)',
    centerX: 0,
    centerY: 8200,
    zoom: 0.45,
  },
  {
    id: 'Fase 5',
    label: 'Fase 5',
    saga: 'The Multiverse Saga (Caos Multiversal)',
    color: '#F472B6',
    glow: 'rgba(244,114,182,0.45)',
    centerX: -200,
    centerY: 11200,
    zoom: 0.4,
  },
  {
    id: 'Fase 6',
    label: 'Fase 6',
    saga: 'The Multiverse Saga (Doomsday)',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.5)',
    centerX: 0,
    centerY: 13800,
    zoom: 0.4,
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
    "x": 600,
    "y": 7380,
    "width": 560,
    "height": 1150,
    "era": "fase-4"
  },
  {
    "id": "container-xmen-multiverse",
    "title": "Universo X-Men",
    "badgeColor": "#F59E0B",
    "borderColor": "rgba(245, 158, 11, 0.45)",
    "glowColor": "rgba(245, 158, 11, 0.18)",
    "x": -930,
    "y": 9670,
    "width": 550,
    "height": 3040,
    "era": "fase-5"
  },
  {
    "id": "container-fantasticfour-multiverse",
    "title": "Universo Los 4 Fantásticos",
    "badgeColor": "#06B6D4",
    "borderColor": "rgba(0, 182, 212, 0.45)",
    "glowColor": "rgba(0, 182, 212, 0.18)",
    "x": -640,
    "y": 13850,
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
    "x": -1280,
    "y": 10050,
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
    "x": 800,
    "y": 11950,
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
  'the-incredible-hulk-2': { x: 0, y: 480 },
  'thor-4': { x: 0, y: 860 },
  'iron-man-2-3': { x: 0, y: 1240 },
  'captain-america-the-first-avenger-5': { x: 0, y: 1620 },
  'agent-carter-s1': { x: 240, y: 1620 },
  'the-avengers-6': { x: 0, y: 2000 },
  'agents-of-shield-7': { x: 240, y: 2000 },

  // Phase 2
  'thor-the-dark-world-8': { x: 0, y: 2380 },
  'iron-man-3-9': { x: 0, y: 2760 },
  'captain-america-the-winter-soldier-10': { x: 0, y: 3140 },
  'avengers-age-of-ultron-13': { x: 0, y: 3520 },
  'guardians-of-the-galaxy-11': { x: 240, y: 3520 },
  'guardians-of-the-galaxy-vol-2-12': { x: 240, y: 3900 },
  'ant-man-14': { x: 0, y: 3900 },

  // Phase 3
  'captain-america-civil-war-15': { x: 0, y: 4280 },
  'doctor-strange-16': { x: 0, y: 4660 },
  'spider-man-homecoming-17': { x: 0, y: 5040 },
  'thor-ragnarok-18': { x: 0, y: 5420 },
  'black-panther-19': { x: 0, y: 5800 },
  'ant-man-and-the-wasp-21': { x: -240, y: 5800 },
  'avengers-infinity-war-20': { x: 0, y: 6180 },
  'captain-marvel-22': { x: 240, y: 6180 },
  'avengers-endgame-23': { x: 0, y: 6560 },

  // Phase 4 post-Endgame wave (Y = 7080)
  'eternals-31': { x: -660, y: 7080 },
  'spider-man-far-from-home-24': { x: -440, y: 7080 },
  'wanda-vision-25': { x: -220, y: 7080 },
  'black-widow-27': { x: 0, y: 7080 },
  'hawkeye-32': { x: 220, y: 7080 },
  'falcon-and-winter-soldier-26': { x: 440, y: 7080 },
  'loki-s1': { x: 660, y: 7080 },
  'shang-chi-and-the-legend-of-the-ten-rings-30': { x: 880, y: 7080 },

  // Phase 4 Extras
  'what-if-s1': { x: -300, y: 7460 },
  'i-am-groot-s1': { x: -560, y: 7460 },

  // Sony Spider-Man Multiverse (Tobey & Andrew)
  'spider-man-1-tobey': { x: 640, y: 7460 },
  'spider-man-2-tobey': { x: 640, y: 7840 },
  'spider-man-3-tobey': { x: 640, y: 8220 },
  'the-amazing-spider-man-1-andrew': { x: 900, y: 7840 },
  'the-amazing-spider-man-2-andrew': { x: 900, y: 8220 },

  // No Way Home at Y = 8220
  'spider-man-no-way-home-33': { x: 0, y: 8220 },

  // Remaining Phase 4
  'doctor-strange-2-34': { x: 0, y: 8600 },
  'moon-knight-35': { x: -280, y: 8600 },
  'ms-marvel-36': { x: 0, y: 8980 },
  'she-hulk-37': { x: 0, y: 9360 },
  'werewolf-by-night': { x: -280, y: 9360 },
  'black-panther-wakanda-forever-38': { x: 0, y: 9740 },
  'eye-of-wakanda-45': { x: -280, y: 9740 },
  'thor-love-and-thunder-35': { x: 0, y: 10120 },

  // Phase 5
  'guardians-galaxy-holiday-special': { x: -280, y: 10500 },
  'guardians-of-the-galaxy-vol-3-40': { x: 0, y: 10500 },
  'i-am-groot-s2': { x: -280, y: 10880 },
  'ant-man-quantumania-39': { x: 0, y: 10880 },
  'loki-s2': { x: -280, y: 11260 },
  'what-if-s2': { x: -560, y: 11260 },
  'secret-invasion-2023': { x: 0, y: 11260 },
  'the-marvels-41': { x: 0, y: 11640 },
  'agatha-all-along-2024': { x: -220, y: 12020 },
  'deadpool-wolverine-42': { x: 0, y: 12400 },

  // Fox X-Men and Deadpool Container
  'x-men-2000': { x: -880, y: 9740 },
  'x-men-2-2003': { x: -880, y: 10120 },
  'x-men-3-the-last-stand-2006': { x: -880, y: 10500 },
  'x-men-origins-wolverine-2009': { x: -880, y: 10880 },
  'x-men-first-class-2011': { x: -880, y: 11260 },
  'x-men-days-of-future-past-2014': { x: -880, y: 11640 },
  'logan-2017': { x: -880, y: 12400 },
  'deadpool-1-2016': { x: -600, y: 11640 },
  'deadpool-2-2018': { x: -600, y: 12020 },

  // Animated X-Men
  'x-men-animated-series-1992': { x: -1240, y: 10120 },
  'x-men-97-s1': { x: -1240, y: 10500 },
  'x-men-97-s2': { x: -1240, y: 10880 },

  // Street branch
  'echo-2024': { x: 280, y: 12780 },
  'what-if-s3': { x: -280, y: 12780 },
  'marvel-zombies-46': { x: -280, y: 13160 },

  // Netflix Defenders
  'daredevil-netflix-s1': { x: 280, y: 10880 },
  'daredevil-netflix-s2': { x: 280, y: 11260 },
  'jessica-jones-s1': { x: 560, y: 10880 },
  'luke-cage-s1': { x: 840, y: 10880 },
  'iron-fist-s1': { x: 1120, y: 10880 },
  'the-defenders': { x: 280, y: 11640 },
  'jessica-jones-s2': { x: 560, y: 11260 },
  'jessica-jones-s3': { x: 560, y: 11640 },
  'luke-cage-s2': { x: 840, y: 11260 },
  'iron-fist-s2': { x: 1120, y: 11260 },
  'daredevil-netflix-s3': { x: 280, y: 12020 },
  'punisher-s1': { x: 560, y: 12020 },
  'punisher-s2': { x: 560, y: 12400 },

  // Phase 6
  'daredevil-born-again-s1': { x: 280, y: 13160 },
  'daredevil-born-again-s2': { x: 280, y: 13540 },
  'up-daredevil-born-again-s3': { x: 280, y: 13920 },
  'punisher-one-last-kill': { x: 560, y: 13540 },
  'up-spider-man-4': { x: 560, y: 13920 },

  'captain-america-brave-new-world-43': { x: 0, y: 13160 },
  'wonder-man-47': { x: -280, y: 13540 },
  'ironheart-49': { x: 0, y: 13540 },
  'up-armor-wars': { x: -280, y: 13920 },
  'thunderbolts-44': { x: 0, y: 13920 },

  'fantastic-four-2005': { x: -600, y: 13920 },
  'fantastic-four-rise-of-the-silver-surfer-2007': { x: -600, y: 14300 },
  'fantastic-four-first-steps-2025': { x: 0, y: 14300 },

  'up-vision-quest': { x: -220, y: 14680 },
  'up-avengers-doomsday': { x: 0, y: 15060 },
  'up-avengers-secret-wars': { x: 0, y: 15440 },

  // Spider-Man Animated Container
  'spider-man-animated-series-1994': { x: 840, y: 12020 },
  'the-spectacular-spider-man-2008': { x: 840, y: 12400 },
  'your-friendly-neighborhood-spider-man-s1': { x: 840, y: 12780 },
  'up-yfnsm-s2': { x: 840, y: 13160 },
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
console.log('Successfully updated roadmapTreeData.ts with compact coordinates and updated container & filter configs!');
