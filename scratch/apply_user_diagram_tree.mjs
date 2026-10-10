import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. PHASE_FILTERS
const phaseFiltersCode = `export const PHASE_FILTERS: PhaseFilterMeta[] = [
  {
    id: 'all',
    label: 'Todas las Fases',
    saga: 'UCM Completo',
    color: '#FFFFFF',
    glow: 'rgba(255,255,255,0.4)',
    centerX: 0,
    centerY: 6000,
    zoom: 0.1,
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
    centerY: 5300,
    zoom: 0.55,
  },
  {
    id: 'Fase 4',
    label: 'Fase 4',
    saga: 'The Multiverse Saga (Fracturas)',
    color: '#C084FC',
    glow: 'rgba(192,132,252,0.45)',
    centerX: 0,
    centerY: 7400,
    zoom: 0.35,
  },
  {
    id: 'Fase 5',
    label: 'Fase 5',
    saga: 'The Multiverse Saga (Caos Multiversal)',
    color: '#F472B6',
    glow: 'rgba(244,114,182,0.45)',
    centerX: 0,
    centerY: 8200,
    zoom: 0.35,
  },
  {
    id: 'Fase 6',
    label: 'Fase 6',
    saga: 'The Multiverse Saga (Doomsday)',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.5)',
    centerX: 0,
    centerY: 9100,
    zoom: 0.38,
  },
];`;

content = content.replace(
  /export const PHASE_FILTERS: PhaseFilterMeta\[\] = \[[\s\S]*?\];/m,
  phaseFiltersCode
);

// 2. UNIVERSE_CONTAINERS
const updatedUniverseContainers = `export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
  {
    "id": "container-spiderman-multiverse",
    "title": "Multiverso Spider-Man",
    "badgeColor": "#E11D48",
    "borderColor": "rgba(225, 29, 72, 0.45)",
    "glowColor": "rgba(225, 29, 72, 0.18)",
    "x": -2200,
    "y": 6900,
    "width": 510,
    "height": 1000,
    "era": "fase-4"
  },
  {
    "id": "container-defenders",
    "title": "La Saga The Defenders",
    "badgeColor": "#DC2626",
    "borderColor": "rgba(220, 38, 38, 0.45)",
    "glowColor": "rgba(220, 38, 38, 0.18)",
    "x": -2950,
    "y": 7900,
    "width": 1470,
    "height": 1000,
    "era": "fase-5"
  },
  {
    "id": "container-xmen-multiverse",
    "title": "Universo X-Men",
    "badgeColor": "#F59E0B",
    "borderColor": "rgba(245, 158, 11, 0.45)",
    "glowColor": "rgba(245, 158, 11, 0.18)",
    "x": 1500,
    "y": 7350,
    "width": 820,
    "height": 1060,
    "era": "fase-5"
  },
  {
    "id": "container-fantasticfour-multiverse",
    "title": "Universo Los 4 Fantásticos",
    "badgeColor": "#06B6D4",
    "borderColor": "rgba(0, 182, 212, 0.45)",
    "glowColor": "rgba(0, 182, 212, 0.18)",
    "x": 410,
    "y": 7700,
    "width": 260,
    "height": 710,
    "era": "fase-6"
  }
];`;

content = content.replace(
  /export const UNIVERSE_CONTAINERS: UniverseContainerConfig\[\] = \[[\s\S]*?\];/m,
  updatedUniverseContainers
);

// 3. ROADMAP_NODE_LAYOUTS
// Import existing layouts to retain metadata like 'lane', 'era', 'isNexus', 'isSpecial'
const startLayoutOld = content.indexOf('export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ');
const endLayoutOld = content.indexOf('export const ROADMAP_CONNECTIONS');

let existingLayouts = JSON.parse(content.slice(content.indexOf(' = [', startLayoutOld) + 3, content.lastIndexOf(']', endLayoutOld) + 1));
const oldMap = new Map(existingLayouts.map(l => [l.id, l]));

// Precise Coordinates from user diagram
const Y_ROOT       = 7060;
const Y_L2         = 7440;
const Y_L3         = 7820;
const Y_L4         = 8200;
const Y_L5         = 8580;
const Y_DOOMSDAY   = 9160;
const Y_SECRETWARS = 9540;

const preciseCoords = {
  // Phase 1
  'iron-man-1': { x: 0, y: 100 },
  'the-incredible-hulk-2': { x: 0, y: 460 },
  'thor-4': { x: 0, y: 820 },
  'iron-man-2-3': { x: 0, y: 1180 },
  'captain-america-the-first-avenger-5': { x: 0, y: 1540 },
  'agent-carter-s1': { x: 260, y: 1540 },
  'the-avengers-6': { x: 0, y: 1900 },
  'agents-of-shield-7': { x: 260, y: 1900 },

  // Phase 2
  'thor-the-dark-world-8': { x: 0, y: 2260 },
  'iron-man-3-9': { x: 0, y: 2620 },
  'captain-america-the-winter-soldier-10': { x: 0, y: 2980 },
  'avengers-age-of-ultron-13': { x: 0, y: 3340 },
  'guardians-of-the-galaxy-11': { x: 260, y: 3340 },
  'guardians-of-the-galaxy-vol-2-12': { x: 260, y: 3700 },
  'ant-man-14': { x: 0, y: 3700 },

  // Phase 3
  'captain-america-civil-war-15': { x: 0, y: 4060 },
  'spider-man-homecoming-17': { x: 0, y: 4420 },
  'black-panther-19': { x: 0, y: 4780 },
  'doctor-strange-16': { x: 0, y: 5140 },
  'thor-ragnarok-18': { x: 0, y: 5500 },
  'avengers-infinity-war-20': { x: 0, y: 5860 },
  'ant-man-and-the-wasp-21': { x: -240, y: 6220 },
  'captain-marvel-22': { x: 240, y: 6220 },
  'avengers-endgame-23': { x: 0, y: 6580 },

  // --- POST-ENDGAME 12 COLUMNS ---
  // Col 1: Spider-Man
  'spider-man-far-from-home-24': { x: -1420, y: Y_ROOT },
  'spider-man-no-way-home-33':   { x: -1420, y: Y_L2 },

  // Col 2: Hawkeye & Street
  'hawkeye-32':                  { x: -1100, y: Y_ROOT },
  'she-hulk-37':                 { x: -1210, y: Y_L2 },
  'echo-2024':                   { x: -990,  y: Y_L2 },
  'daredevil-born-again-s1':     { x: -1100, y: Y_L3 },
  'daredevil-born-again-s2':     { x: -1100, y: Y_L4 },
  'up-daredevil-born-again-s3':  { x: -890,  y: Y_L4 },

  // Punisher Special & Spider-Man 4 (Brand New Day)
  'punisher-one-last-kill':      { x: -1350, y: Y_L4 + 60 },
  'up-spider-man-4':             { x: -1050, y: Y_L5 + 60 },

  // Col 3: Black Widow
  'black-widow-27':              { x: -770, y: Y_ROOT },

  // Col 4: Shang-Chi & Wonder Man
  'shang-chi-and-the-legend-of-the-ten-rings-30': { x: -550, y: Y_ROOT },
  'wonder-man-47':                               { x: -660, y: Y_L2 },

  // Col 5: Wakanda & Ironheart
  'black-panther-wakanda-forever-38': { x: -330, y: Y_ROOT },
  'ironheart-49':                     { x: -330, y: Y_L2 },
  'up-armor-wars':                    { x: -330, y: Y_L3 },

  // Col 6: Ms. Marvel & Cosmic
  'ms-marvel-36':         { x: -110, y: Y_ROOT },
  'secret-invasion-2023': { x: -110, y: Y_L2 },
  'the-marvels-41':        { x: -110, y: Y_L3 },

  // Col 7: WandaVision & Magic
  'wanda-vision-25':       { x: 110, y: Y_ROOT },
  'doctor-strange-2-34':   { x: 110, y: Y_L2 },
  'agatha-all-along-2024': { x: 110, y: Y_L3 },
  'up-vision-quest':       { x: 110, y: Y_L4 },

  // Col 8: Falcon & Cap America
  'falcon-and-winter-soldier-26':      { x: 330, y: Y_ROOT },
  'captain-america-brave-new-world-43': { x: 440, y: Y_L2 },

  // Col 9: Eternals
  'eternals-31': { x: 550, y: Y_ROOT },

  // Col 10: Thor & Guardians
  'thor-love-and-thunder-35':         { x: 770, y: Y_ROOT },
  'guardians-galaxy-holiday-special': { x: 770, y: Y_L2 },
  'guardians-of-the-galaxy-vol-3-40': { x: 770, y: Y_L3 },

  // Col 11: Moon Knight
  'moon-knight-35':    { x: 990, y: Y_ROOT },
  'werewolf-by-night': { x: 990, y: Y_L2 },

  // Col 12: Loki & Kang
  'loki-s1':                { x: 1210, y: Y_ROOT },
  'ant-man-quantumania-39': { x: 1210, y: Y_L2 },
  'loki-s2':                { x: 1210, y: Y_L3 },

  // Lower Climax Tier
  'thunderbolts-44':                 { x: -450, y: Y_L5 },
  'fantastic-four-first-steps-2025': { x: 450,  y: Y_L5 },
  'deadpool-wolverine-42':           { x: 950,  y: Y_L5 },

  'up-avengers-doomsday':            { x: 0,    y: Y_DOOMSDAY },
  'up-avengers-secret-wars':         { x: 0,    y: Y_SECRETWARS },

  // --- SONY SPIDER-MAN CONTAINER ---
  'spider-man-1-tobey':             { x: -2150, y: 6950 },
  'spider-man-2-tobey':             { x: -2150, y: 7270 },
  'spider-man-3-tobey':             { x: -2150, y: 7590 },
  'the-amazing-spider-man-1-andrew': { x: -1910, y: 7270 },
  'the-amazing-spider-man-2-andrew': { x: -1910, y: 7590 },

  // --- THE DEFENDERS CONTAINER ---
  'punisher-s1':          { x: -2900, y: 8270 },
  'punisher-s2':          { x: -2900, y: 8590 },
  'daredevil-netflix-s1': { x: -2660, y: 7950 },
  'daredevil-netflix-s2': { x: -2660, y: 8270 },
  'jessica-jones-s1':     { x: -2420, y: 7950 },
  'jessica-jones-s2':     { x: -2420, y: 8270 },
  'jessica-jones-s3':     { x: -2420, y: 8590 },
  'the-defenders':        { x: -2180, y: 8270 },
  'daredevil-netflix-s3': { x: -2180, y: 8590 },
  'luke-cage-s1':         { x: -1940, y: 7950 },
  'luke-cage-s2':         { x: -1940, y: 8270 },
  'iron-fist-s1':         { x: -1700, y: 7950 },
  'iron-fist-s2':         { x: -1700, y: 8270 },

  // --- X-MEN & DEADPOOL CONTAINER ---
  'deadpool-1-2016': { x: 1550, y: 7400 },
  'deadpool-2-2018': { x: 1550, y: 7750 },
  'logan-2017':      { x: 1550, y: 8100 },

  'x-men-2000':                     { x: 1850, y: 7400 },
  'x-men-2-2003':                   { x: 1850, y: 7750 },
  'x-men-3-the-last-stand-2006':     { x: 1850, y: 8100 },
  'x-men-first-class-2011':         { x: 2090, y: 7400 },
  'x-men-days-of-future-past-2014': { x: 2090, y: 7750 },
  'x-men-origins-wolverine-2009':   { x: 2090, y: 8100 },

  // Fox Fantastic Four
  'fantastic-four-2005':                           { x: 450, y: 7750 },
  'fantastic-four-rise-of-the-silver-surfer-2007': { x: 450, y: 8100 },
};

// Build new layout list preserving lanes & metadata
const newLayouts = Object.entries(preciseCoords).map(([id, coords]) => {
  const old = oldMap.get(id) || {};
  return {
    id,
    x: coords.x,
    y: coords.y,
    lane: old.lane || 'core',
    era: old.era || 'fase-4',
    ...(old.isNexus !== undefined ? { isNexus: old.isNexus } : {}),
    ...(old.isSpecial !== undefined ? { isSpecial: old.isSpecial } : {}),
  };
});

const updatedLayoutsSection = `export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ` +
  JSON.stringify(newLayouts, null, 2) + `;\n\n`;

// 4. ROADMAP_CONNECTIONS (Exact from user diagram!)
const newConnections = [
  // --- FASE 1 ---
  { id: 'e-im1-hulk', source: 'iron-man-1', target: 'the-incredible-hulk-2', arc: 'core-avengers', isEssential: true },
  { id: 'e-hulk-thor1', source: 'the-incredible-hulk-2', target: 'thor-4', arc: 'core-avengers', isEssential: true },
  { id: 'e-thor1-im2', source: 'thor-4', target: 'iron-man-2-3', arc: 'core-avengers', isEssential: true },
  { id: 'e-im2-cap1', source: 'iron-man-2-3', target: 'captain-america-the-first-avenger-5', arc: 'core-avengers', isEssential: true },
  { id: 'e-cap1-carter', source: 'captain-america-the-first-avenger-5', target: 'agent-carter-s1', arc: 'core-avengers', isEssential: false },
  { id: 'e-cap1-av1', source: 'captain-america-the-first-avenger-5', target: 'the-avengers-6', arc: 'core-avengers', isEssential: true },
  { id: 'e-av1-aos', source: 'the-avengers-6', target: 'agents-of-shield-7', arc: 'core-avengers', isEssential: false },

  // --- FASE 2 ---
  { id: 'e-av1-thor2', source: 'the-avengers-6', target: 'thor-the-dark-world-8', arc: 'cosmic', isEssential: true },
  { id: 'e-thor2-im3', source: 'thor-the-dark-world-8', target: 'iron-man-3-9', arc: 'core-avengers', isEssential: true },
  { id: 'e-im3-ws', source: 'iron-man-3-9', target: 'captain-america-the-winter-soldier-10', arc: 'core-avengers', isEssential: true },
  { id: 'e-ws-aou', source: 'captain-america-the-winter-soldier-10', target: 'avengers-age-of-ultron-13', arc: 'core-avengers', isEssential: true },
  { id: 'e-ws-gotg1', source: 'captain-america-the-winter-soldier-10', target: 'guardians-of-the-galaxy-11', arc: 'cosmic', isEssential: false },
  { id: 'e-gotg1-gotg2', source: 'guardians-of-the-galaxy-11', target: 'guardians-of-the-galaxy-vol-2-12', arc: 'cosmic', isEssential: false },
  { id: 'e-aou-ant1', source: 'avengers-age-of-ultron-13', target: 'ant-man-14', arc: 'core-avengers', isEssential: true },

  // --- FASE 3 ---
  { id: 'e-ant1-cw', source: 'ant-man-14', target: 'captain-america-civil-war-15', arc: 'core-avengers', isEssential: true },
  { id: 'e-cw-sp1', source: 'captain-america-civil-war-15', target: 'spider-man-homecoming-17', arc: 'street', isEssential: true },
  { id: 'e-sp1-bp', source: 'spider-man-homecoming-17', target: 'black-panther-19', arc: 'core-avengers', isEssential: true },
  { id: 'e-bp-ds1', source: 'black-panther-19', target: 'doctor-strange-16', arc: 'mystic', isEssential: true },
  { id: 'e-ds1-rag', source: 'doctor-strange-16', target: 'thor-ragnarok-18', arc: 'cosmic', isEssential: true },
  { id: 'e-rag-iw', source: 'thor-ragnarok-18', target: 'avengers-infinity-war-20', arc: 'cosmic', isEssential: true },
  { id: 'e-gotg2-iw', source: 'guardians-of-the-galaxy-vol-2-12', target: 'avengers-infinity-war-20', arc: 'cosmic', isEssential: true },
  { id: 'e-iw-ant2', source: 'avengers-infinity-war-20', target: 'ant-man-and-the-wasp-21', arc: 'core-avengers', isEssential: true },
  { id: 'e-iw-cm', source: 'avengers-infinity-war-20', target: 'captain-marvel-22', arc: 'cosmic', isEssential: true },
  { id: 'e-ant2-eg', source: 'ant-man-and-the-wasp-21', target: 'avengers-endgame-23', arc: 'core-avengers', isEssential: true },
  { id: 'e-cm-eg', source: 'captain-marvel-22', target: 'avengers-endgame-23', arc: 'cosmic', isEssential: true },

  // --- POST-ENDGAME: DISTRIBUTION FROM AVENGERS: ENDGAME ---
  { id: 'e-eg-ffh', source: 'avengers-endgame-23', target: 'spider-man-far-from-home-24', arc: 'street', isEssential: true },
  { id: 'e-eg-hawk', source: 'avengers-endgame-23', target: 'hawkeye-32', arc: 'street', isEssential: true },
  { id: 'e-eg-bw', source: 'avengers-endgame-23', target: 'black-widow-27', arc: 'core-avengers', isEssential: true },
  { id: 'e-eg-shang', source: 'avengers-endgame-23', target: 'shang-chi-and-the-legend-of-the-ten-rings-30', arc: 'core-avengers', isEssential: true },
  { id: 'e-eg-bp2', source: 'avengers-endgame-23', target: 'black-panther-wakanda-forever-38', arc: 'core-avengers', isEssential: true },
  { id: 'e-eg-msm', source: 'avengers-endgame-23', target: 'ms-marvel-36', arc: 'cosmic', isEssential: true },
  { id: 'e-eg-wv', source: 'avengers-endgame-23', target: 'wanda-vision-25', arc: 'multiverse', isEssential: true },
  { id: 'e-eg-fal', source: 'avengers-endgame-23', target: 'falcon-and-winter-soldier-26', arc: 'core-avengers', isEssential: true },
  { id: 'e-eg-eternals', source: 'avengers-endgame-23', target: 'eternals-31', arc: 'cosmic', isEssential: true },
  { id: 'e-eg-thor4', source: 'avengers-endgame-23', target: 'thor-love-and-thunder-35', arc: 'cosmic', isEssential: true },
  { id: 'e-eg-mk', source: 'avengers-endgame-23', target: 'moon-knight-35', arc: 'mystic', isEssential: false },
  { id: 'e-eg-loki', source: 'avengers-endgame-23', target: 'loki-s1', arc: 'multiverse', isEssential: true },

  // --- SPIDER-MAN MCU & SONY ---
  { id: 'e-sp1_tobey-sp2', source: 'spider-man-1-tobey', target: 'spider-man-2-tobey', arc: 'legacy', isEssential: false },
  { id: 'e-sp2_tobey-sp3', source: 'spider-man-2-tobey', target: 'spider-man-3-tobey', arc: 'legacy', isEssential: false },
  { id: 'e-sp1_andrew-sp2', source: 'the-amazing-spider-man-1-andrew', target: 'the-amazing-spider-man-2-andrew', arc: 'legacy', isEssential: false },
  { id: 'e-tobey-nwh', source: 'spider-man-3-tobey', target: 'spider-man-no-way-home-33', arc: 'multiverse', isEssential: true },
  { id: 'e-andrew-nwh', source: 'the-amazing-spider-man-2-andrew', target: 'spider-man-no-way-home-33', arc: 'multiverse', isEssential: true },
  { id: 'e-ffh-nwh', source: 'spider-man-far-from-home-24', target: 'spider-man-no-way-home-33', arc: 'street', isEssential: true },
  { id: 'e-nwh-bnd', source: 'spider-man-no-way-home-33', target: 'up-spider-man-4', arc: 'street', isEssential: true },

  // --- STREET & DEFENDERS SAGA ---
  { id: 'e-bw-hawk', source: 'black-widow-27', target: 'hawkeye-32', arc: 'street', isEssential: true, label: 'Misión post-créditos Yelena' },
  { id: 'e-hawk-echo', source: 'hawkeye-32', target: 'echo-2024', arc: 'street', isEssential: true },
  { id: 'e-shehulk-ddba', source: 'she-hulk-37', target: 'daredevil-born-again-s1', arc: 'street', isEssential: true },
  { id: 'e-echo-ddba', source: 'echo-2024', target: 'daredevil-born-again-s1', arc: 'street', isEssential: true },
  { id: 'e-ddba1-ddba2', source: 'daredevil-born-again-s1', target: 'daredevil-born-again-s2', arc: 'street', isEssential: true },
  { id: 'e-ddba2-ddba3', source: 'daredevil-born-again-s2', target: 'up-daredevil-born-again-s3', arc: 'street', isEssential: false },
  { id: 'e-ddba2-bnd', source: 'daredevil-born-again-s2', target: 'up-spider-man-4', arc: 'street', isEssential: true },

  // Defenders internal connections:
  { id: 'e-dd1-dd2', source: 'daredevil-netflix-s1', target: 'daredevil-netflix-s2', arc: 'street', isEssential: false },
  { id: 'e-pun1-pun2', source: 'punisher-s1', target: 'punisher-s2', arc: 'street', isEssential: false },
  { id: 'e-jj1-jj2', source: 'jessica-jones-s1', target: 'jessica-jones-s2', arc: 'street', isEssential: false },
  { id: 'e-jj2-jj3', source: 'jessica-jones-s2', target: 'jessica-jones-s3', arc: 'street', isEssential: false },
  { id: 'e-lc1-lc2', source: 'luke-cage-s1', target: 'luke-cage-s2', arc: 'street', isEssential: false },
  { id: 'e-if1-if2', source: 'iron-fist-s1', target: 'iron-fist-s2', arc: 'street', isEssential: false },
  { id: 'e-dd2-def', source: 'daredevil-netflix-s2', target: 'the-defenders', arc: 'street', isEssential: false },
  { id: 'e-jj-def', source: 'jessica-jones-s2', target: 'the-defenders', arc: 'street', isEssential: false },
  { id: 'e-lc-def', source: 'luke-cage-s2', target: 'the-defenders', arc: 'street', isEssential: false },
  { id: 'e-if-def', source: 'iron-fist-s2', target: 'the-defenders', arc: 'street', isEssential: false },
  { id: 'e-def-dd3', source: 'the-defenders', target: 'daredevil-netflix-s3', arc: 'street', isEssential: false },
  // From Defenders container outwards:
  { id: 'e-dd3-ddba', source: 'daredevil-netflix-s3', target: 'daredevil-born-again-s1', arc: 'street', isEssential: true },
  { id: 'e-pun2-punspec', source: 'punisher-s2', target: 'punisher-one-last-kill', arc: 'street', isEssential: true },
  { id: 'e-punspec-bnd', source: 'punisher-one-last-kill', target: 'up-spider-man-4', arc: 'street', isEssential: true },

  // --- SHANG-CHI & WONDER MAN ---
  { id: 'e-shang-wm', source: 'shang-chi-and-the-legend-of-the-ten-rings-30', target: 'wonder-man-47', arc: 'core-avengers', isEssential: false },
  { id: 'e-wm-tb', source: 'wonder-man-47', target: 'thunderbolts-44', arc: 'core-avengers', isEssential: true },
  { id: 'e-shang-doom', source: 'shang-chi-and-the-legend-of-the-ten-rings-30', target: 'up-avengers-doomsday', arc: 'core-avengers', isEssential: true },

  // --- WAKANDA & IRONHEART ---
  { id: 'e-wf-ih', source: 'black-panther-wakanda-forever-38', target: 'ironheart-49', arc: 'core-avengers', isEssential: true },
  { id: 'e-ih-aw', source: 'ironheart-49', target: 'up-armor-wars', arc: 'core-avengers', isEssential: false },
  { id: 'e-ih-doom', source: 'ironheart-49', target: 'up-avengers-doomsday', arc: 'core-avengers', isEssential: true },

  // --- MS. MARVEL, INVASION SECRETA & THE MARVELS ---
  { id: 'e-msm-si', source: 'ms-marvel-36', target: 'secret-invasion-2023', arc: 'cosmic', isEssential: true },
  { id: 'e-si-tm', source: 'secret-invasion-2023', target: 'the-marvels-41', arc: 'cosmic', isEssential: true },
  { id: 'e-wv-tm', source: 'wanda-vision-25', target: 'the-marvels-41', arc: 'cosmic', isEssential: true, label: 'Monica Rambeau' },
  { id: 'e-tm-doom', source: 'the-marvels-41', target: 'up-avengers-doomsday', arc: 'cosmic', isEssential: true },

  // --- WANDAVISION & MAGIC ---
  { id: 'e-wv-ds2', source: 'wanda-vision-25', target: 'doctor-strange-2-34', arc: 'multiverse', isEssential: true },
  { id: 'e-ds2-agatha', source: 'doctor-strange-2-34', target: 'agatha-all-along-2024', arc: 'mystic', isEssential: true },
  { id: 'e-agatha-vq', source: 'agatha-all-along-2024', target: 'up-vision-quest', arc: 'mystic', isEssential: true },
  { id: 'e-vq-doom', source: 'up-vision-quest', target: 'up-avengers-doomsday', arc: 'multiverse', isEssential: true },

  // --- FALCON, CAP AMERICA & ETERNALS ---
  { id: 'e-fal-cap4', source: 'falcon-and-winter-soldier-26', target: 'captain-america-brave-new-world-43', arc: 'core-avengers', isEssential: true },
  { id: 'e-eternals-cap4', source: 'eternals-31', target: 'captain-america-brave-new-world-43', arc: 'core-avengers', isEssential: true, label: 'Tiamut / Adamantium' },
  { id: 'e-cap4-tb', source: 'captain-america-brave-new-world-43', target: 'thunderbolts-44', arc: 'core-avengers', isEssential: true },

  // --- THOR & GUARDIANS ---
  { id: 'e-thor4-ghs', source: 'thor-love-and-thunder-35', target: 'guardians-galaxy-holiday-special', arc: 'cosmic', isEssential: true },
  { id: 'e-ghs-gotg3', source: 'guardians-galaxy-holiday-special', target: 'guardians-of-the-galaxy-vol-3-40', arc: 'cosmic', isEssential: true },
  { id: 'e-gotg3-doom', source: 'guardians-of-the-galaxy-vol-3-40', target: 'up-avengers-doomsday', arc: 'cosmic', isEssential: true },

  // --- LOKI & QUANTUMANIA ---
  { id: 'e-loki1-qm', source: 'loki-s1', target: 'ant-man-quantumania-39', arc: 'multiverse', isEssential: true },
  { id: 'e-qm-loki2', source: 'ant-man-quantumania-39', target: 'loki-s2', arc: 'multiverse', isEssential: true },
  { id: 'e-loki2-doom', source: 'loki-s2', target: 'up-avengers-doomsday', arc: 'multiverse', isEssential: true },

  // --- THUNDERBOLTS & SPIDER-MAN 4 ---
  { id: 'e-bw-tb', source: 'black-widow-27', target: 'thunderbolts-44', arc: 'core-avengers', isEssential: true, label: 'Yelena Belova & Red Guardian' },
  { id: 'e-bnd-tb', source: 'up-spider-man-4', target: 'thunderbolts-44', arc: 'street', isEssential: false },
  { id: 'e-bnd-doom', source: 'up-spider-man-4', target: 'up-avengers-doomsday', arc: 'street', isEssential: true },
  { id: 'e-tb-doom', source: 'thunderbolts-44', target: 'up-avengers-doomsday', arc: 'core-avengers', isEssential: true },

  // --- FOX FANTASTIC FOUR & FIRST STEPS ---
  { id: 'e-f4_05-f4_07', source: 'fantastic-four-2005', target: 'fantastic-four-rise-of-the-silver-surfer-2007', arc: 'legacy', isEssential: false },
  { id: 'e-f4_07-f4steps', source: 'fantastic-four-rise-of-the-silver-surfer-2007', target: 'fantastic-four-first-steps-2025', arc: 'multiverse', isEssential: false },
  { id: 'e-f4steps-doom', source: 'fantastic-four-first-steps-2025', target: 'up-avengers-doomsday', arc: 'multiverse', isEssential: true },

  // --- MUTANTS / X-MEN & DEADPOOL ---
  { id: 'e-dp1-dp2', source: 'deadpool-1-2016', target: 'deadpool-2-2018', arc: 'legacy', isEssential: false },
  { id: 'e-dp2-logan', source: 'deadpool-2-2018', target: 'logan-2017', arc: 'legacy', isEssential: false },
  { id: 'e-logan-dpw', source: 'logan-2017', target: 'deadpool-wolverine-42', arc: 'multiverse', isEssential: true },
  { id: 'e-dp2-dpw', source: 'deadpool-2-2018', target: 'deadpool-wolverine-42', arc: 'multiverse', isEssential: true },
  { id: 'e-dofp-dpw', source: 'x-men-days-of-future-past-2014', target: 'deadpool-wolverine-42', arc: 'multiverse', isEssential: true },
  { id: 'e-dpw-doom', source: 'deadpool-wolverine-42', target: 'up-avengers-doomsday', arc: 'multiverse', isEssential: true },

  // --- CLIMAX ---
  { id: 'e-doom-secretwars', source: 'up-avengers-doomsday', target: 'up-avengers-secret-wars', arc: 'multiverse', isEssential: true },
];

const updatedConnectionsSection = `export const ROADMAP_CONNECTIONS: NarrativeConnection[] = ` +
  JSON.stringify(newConnections, null, 2) + `;\n\n`;

const endConnOld = content.indexOf('// Mapas auxiliares');

content = content.slice(0, startLayoutOld) + 
  updatedLayoutsSection + 
  updatedConnectionsSection + 
  content.slice(endConnOld);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully wrote exact user diagram roadmapTreeData.ts!');
