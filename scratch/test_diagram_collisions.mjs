import fs from 'fs';

const CARD_W = 180;
const CARD_H = 270;

// Levels
const Y_ROOT       = 7060;
const Y_L2         = 7440;
const Y_L3         = 7820;
const Y_L4         = 8200;
const Y_L5         = 8580;
const Y_DOOMSDAY   = 9160;
const Y_SECRETWARS = 9540;

const allCoords = {
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

  // -------------------------------------------------------------------
  // 12 COLUMNS OF THE MAIN TREE POST-ENDGAME (Exact user diagram order!)
  // -------------------------------------------------------------------
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

  // -------------------------------------------------------------------
  // LOWER CLIMAX TIER
  // -------------------------------------------------------------------
  'thunderbolts-44':                 { x: -450, y: Y_L5 },
  'fantastic-four-first-steps-2025': { x: 450,  y: Y_L5 },
  'deadpool-wolverine-42':           { x: 950,  y: Y_L5 },

  'up-avengers-doomsday':            { x: 0,    y: Y_DOOMSDAY },
  'up-avengers-secret-wars':         { x: 0,    y: Y_SECRETWARS },

  // -------------------------------------------------------------------
  // CONTAINERS
  // -------------------------------------------------------------------
  // Sony Spider-Man (Top-Left)
  'spider-man-1-tobey':             { x: -2150, y: 6950 },
  'spider-man-2-tobey':             { x: -2150, y: 7270 },
  'spider-man-3-tobey':             { x: -2150, y: 7590 },
  'the-amazing-spider-man-1-andrew': { x: -1910, y: 7270 },
  'the-amazing-spider-man-2-andrew': { x: -1910, y: 7590 },

  // The Defenders (Bottom-Left)
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

  // Mutants & X-Men (Far-Right)
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

const keys = Object.keys(allCoords);
console.log('Total nodes defined:', keys.length);

let collisions = [];
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const a = allCoords[keys[i]];
    const b = allCoords[keys[j]];
    if (Math.abs(a.x - b.x) < CARD_W && Math.abs(a.y - b.y) < CARD_H) {
      collisions.push(`${keys[i]} (${a.x},${a.y}) <-> ${keys[j]} (${b.x},${b.y})`);
    }
  }
}

console.log('Collisions count:', collisions.length);
if (collisions.length > 0) {
  console.log(collisions);
} else {
  console.log('ZERO COLLISIONS! COMPLETE SUCCESS!');
}
