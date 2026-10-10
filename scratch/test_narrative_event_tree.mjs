import fs from 'fs';

const content = fs.readFileSync('src/data/roadmapTreeData.ts', 'utf8');

const startLayout = content.indexOf('export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ');
const endLayout = content.indexOf('];\n\nexport const ROADMAP_CONNECTIONS');
let layouts = JSON.parse(content.slice(startLayout + 57, endLayout + 1));

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

  // --- FLOATING EXTRAS (Far left, out of the way) ---
  'what-if-s1': { x: -1400, y: 6680 },
  'what-if-s2': { x: -1400, y: 7060 },
  'what-if-s3': { x: -1400, y: 7440 },
  'i-am-groot-s1': { x: -1160, y: 6680 },
  'i-am-groot-s2': { x: -1160, y: 7060 },
  'marvel-zombies-46': { x: -1400, y: 7820 },

  // --- COL -480: WANDAVISION CONSEQUENCES COLUMN (Red Box from user photo!) ---
  'doctor-strange-2-34': { x: -480, y: 7060 },
  'agatha-all-along-2024': { x: -480, y: 7440 },
  'up-vision-quest': { x: -480, y: 7820 },

  // --- COL -240: MS MARVEL & THE MARVELS (Connected to WandaVision & Ms Marvel) ---
  'ms-marvel-36': { x: -240, y: 7060 },
  'the-marvels-41': { x: -240, y: 7440 },
  'secret-invasion-2023': { x: -240, y: 7820 },

  // --- COL 0: HAWKEYE & STREET COLUMN (Red Box from user photo!) ---
  // Black Widow (-240, 6680) connects to Hawkeye (0, 6680)
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

  // --- SONY SPIDER-MAN MULTIVERSE (Aligned directly to the right of No Way Home) ---
  'spider-man-1-tobey': { x: 720, y: 7060 },
  'spider-man-2-tobey': { x: 720, y: 7440 },
  'spider-man-3-tobey': { x: 720, y: 7820 },
  'the-amazing-spider-man-1-andrew': { x: 940, y: 7060 },
  'the-amazing-spider-man-2-andrew': { x: 940, y: 7440 },

  // --- COL 1000 & 1240: LOKI & COSMIC ---
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

  // --- NETFLIX DEFENDERS (Street block feeding into Daredevil Born Again) ---
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

let updated = 0;
layouts.forEach(l => {
  if (coords[l.id]) {
    l.x = coords[l.id].x;
    l.y = coords[l.id].y;
    updated++;
  } else {
    console.warn('Missing coords for:', l.id);
  }
});
console.log(`Updated ${updated} / ${layouts.length} nodes.`);

// Check collisions
const CARD_W = 180;
const CARD_H = 270;
let collisions = [];
for (let i = 0; i < layouts.length; i++) {
  for (let j = i + 1; j < layouts.length; j++) {
    const a = layouts[i];
    const b = layouts[j];
    const overlapX = Math.abs(a.x - b.x) < CARD_W;
    const overlapY = Math.abs(a.y - b.y) < CARD_H;
    if (overlapX && overlapY) {
      collisions.push(`${a.id} (${a.x},${a.y}) <-> ${b.id} (${b.x},${b.y})`);
    }
  }
}
console.log('Total collisions:', collisions.length);
if (collisions.length > 0) {
  collisions.slice(0, 10).forEach(c => console.log('Collision:', c));
}

// Distance analysis with conns
const startConn = content.indexOf("export const ROADMAP_CONNECTIONS: NarrativeConnection[] = ");
const endConn = content.indexOf("];\n\n// Mapas auxiliares");
const conns = JSON.parse(content.slice(startConn + 58, endConn + 1));

const posMap = {};
layouts.forEach(l => posMap[l.id] = { x: l.x, y: l.y });

const keyConns = [
  ['wanda-vision-25', 'doctor-strange-2-34'],
  ['doctor-strange-2-34', 'agatha-all-along-2024'],
  ['wanda-vision-25', 'agatha-all-along-2024'],
  ['wanda-vision-25', 'up-vision-quest'],
  ['black-widow-27', 'hawkeye-32'],
  ['hawkeye-32', 'echo-2024'],
  ['echo-2024', 'daredevil-born-again-s1'],
  ['daredevil-born-again-s1', 'daredevil-born-again-s2'],
  ['falcon-and-winter-soldier-26', 'captain-america-brave-new-world-43'],
  ['loki-s1', 'loki-s2'],
  ['spider-man-far-from-home-24', 'spider-man-no-way-home-33'],
  ['ms-marvel-36', 'the-marvels-41'],
  ['wanda-vision-25', 'the-marvels-41'],
  ['black-panther-wakanda-forever-38', 'ironheart-49'],
  ['guardians-galaxy-holiday-special', 'guardians-of-the-galaxy-vol-3-40'],
];

console.log('\nKey narrative connections distances:');
keyConns.forEach(([from, to]) => {
  const p1 = posMap[from];
  const p2 = posMap[to];
  if (p1 && p2) {
    const dist = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));
    console.log(`${from} -> ${to}: dist=${dist}px (dx=${p2.x - p1.x}, dy=${p2.y - p1.y})`);
  }
});
