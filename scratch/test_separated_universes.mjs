import fs from 'fs';

const content = fs.readFileSync('src/data/roadmapTreeData.ts', 'utf8');
const startLayout = content.indexOf('export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ');
const endLayout = content.indexOf('];\n\nexport const ROADMAP_CONNECTIONS');
let layouts = JSON.parse(content.slice(startLayout + 57, endLayout + 1));

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
  // Corridors:
  // X = -750: Wakanda & Celestials
  // X = -500: Magic & Wanda
  // X = -250: Cosmic Women & Espionage
  // X = 0:    Street & Hawkeye
  // X = 250:  Cap & Thunderbolts
  // X = 500:  Spider-Man
  // X = 750:  Loki & TVA
  // X = 1000: Cosmic & Guardians
  'eternals-31': { x: -750, y: 6700 },
  'wanda-vision-25': { x: -500, y: 6700 },
  'black-widow-27': { x: -250, y: 6700 },
  'hawkeye-32': { x: 0, y: 6700 },
  'falcon-and-winter-soldier-26': { x: 250, y: 6700 },
  'spider-man-far-from-home-24': { x: 500, y: 6700 },
  'loki-s1': { x: 750, y: 6700 },
  'shang-chi-and-the-legend-of-the-ten-rings-30': { x: 1000, y: 6700 },

  // --- CORRIDOR 1: MAGIC & WANDA (X = -500) ---
  // WandaVision -> Doctor Strange 2 -> Agatha -> VisionQuest
  'doctor-strange-2-34': { x: -500, y: 7080 },
  'agatha-all-along-2024': { x: -500, y: 7460 },
  'up-vision-quest': { x: -500, y: 7840 },
  'fantastic-four-first-steps-2025': { x: -500, y: 8220 },

  // --- CORRIDOR 2: THE MARVELS & ESPIONAGE (X = -250) ---
  // Ms Marvel -> The Marvels -> Secret Invasion
  'ms-marvel-36': { x: -250, y: 7080 },
  'the-marvels-41': { x: -250, y: 7460 },
  'secret-invasion-2023': { x: -250, y: 7840 },

  // --- CORRIDOR 3: STREET & KINGPIN (X = 0) ---
  // Hawkeye -> Echo -> Daredevil Born Again S1 -> S2 -> S3
  'echo-2024': { x: 0, y: 7080 },
  'daredevil-born-again-s1': { x: 0, y: 7460 },
  'daredevil-born-again-s2': { x: 0, y: 7840 },
  'up-daredevil-born-again-s3': { x: 0, y: 8220 },

  // --- CORRIDOR 4: CAPTAIN AMERICA & THUNDERBOLTS (X = 250) ---
  // Falcon & Winter Soldier -> Cap 4 -> She-Hulk -> Thunderbolts
  'captain-america-brave-new-world-43': { x: 250, y: 7080 },
  'she-hulk-37': { x: 250, y: 7460 },
  'thunderbolts-44': { x: 250, y: 7840 },
  'wonder-man-47': { x: 250, y: 8220 },

  // --- CORRIDOR 5: SPIDER-MAN (X = 500) ---
  // Far From Home -> No Way Home -> Spider-Man 4
  'spider-man-no-way-home-33': { x: 500, y: 7080 },
  'up-spider-man-4': { x: 500, y: 7460 },

  // --- CORRIDOR 6: LOKI & TVA (X = 750) ---
  // Loki S1 -> Loki S2 -> Quantumania
  'loki-s2': { x: 750, y: 7080 },
  'ant-man-quantumania-39': { x: 750, y: 7460 },

  // --- CORRIDOR 7: COSMIC & GUARDIANS (X = 1000) ---
  // Shang-Chi -> Thor 4 -> Guardians Holiday -> Guardians 3 -> Deadpool & Wolverine
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
  // OTROS UNIVERSOS (SEPARADOS CLARAMENTE EN SUS PROPIOS CONTENEDORES)
  // ==============================================================
  // --- CONTAINER 1: SONY SPIDER-MAN MULTIVERSE (X = 1380 a 1620) ---
  // Separado por 380px de espacio libre del MCU!
  'spider-man-1-tobey': { x: 1380, y: 6700 },
  'spider-man-2-tobey': { x: 1380, y: 7080 },
  'spider-man-3-tobey': { x: 1380, y: 7460 },
  'the-amazing-spider-man-1-andrew': { x: 1620, y: 7080 },
  'the-amazing-spider-man-2-andrew': { x: 1620, y: 7460 },

  // --- CONTAINER 2: FOX X-MEN MULTIVERSE (X = 1380 a 1620, Y = 7900+) ---
  // Separado por 380px de espacio libre!
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
  // Separado claramente a la izquierda!
  'fantastic-four-2005': { x: -1280, y: 7840 },
  'fantastic-four-rise-of-the-silver-surfer-2007': { x: -1280, y: 8220 },

  // --- CONTAINER 4: ANIMATED X-MEN (X = 1880) ---
  'x-men-animated-series-1992': { x: 1880, y: 7900 },
  'x-men-97-s1': { x: 1880, y: 8280 },
  'x-men-97-s2': { x: 1880, y: 8660 },

  // --- CONTAINER 5: ANIMATED SPIDER-MAN (X = 1880) ---
  'spider-man-animated-series-1994': { x: 1880, y: 6700 },
  'the-spectacular-spider-man-2008': { x: 1880, y: 7080 },
  'your-friendly-neighborhood-spider-man-s1': { x: 1880, y: 7460 },
  'up-yfnsm-s2': { x: 1880, y: 7840 },

  // --- FLOATING EXTRAS (Far left, completely separate, X = -1540) ---
  'what-if-s1': { x: -1540, y: 6700 },
  'what-if-s2': { x: -1540, y: 7080 },
  'what-if-s3': { x: -1540, y: 7460 },
  'marvel-zombies-46': { x: -1540, y: 7840 },
  'i-am-groot-s1': { x: -1760, y: 6700 },
  'i-am-groot-s2': { x: -1760, y: 7080 },

  // --- THE DEFENDERS SAGA (NETFLIX) ---
  // Dedicated Street Block (Y = 8680 to 9820)
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
