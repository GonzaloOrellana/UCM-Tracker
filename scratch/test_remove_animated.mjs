import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

const animIds = new Set([
  'what-if-s1',
  'what-if-s2',
  'what-if-s3',
  'i-am-groot-s1',
  'i-am-groot-s2',
  'marvel-zombies-46',
  'eye-of-wakanda-45',
  'x-men-animated-series-1992',
  'x-men-97-s1',
  'x-men-97-s2',
  'spider-man-animated-series-1994',
  'the-spectacular-spider-man-2008',
  'your-friendly-neighborhood-spider-man-s1',
  'up-yfnsm-s2',
]);

const startLayout = content.indexOf('export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ');
const endLayout = content.indexOf('];\n\nexport const ROADMAP_CONNECTIONS');
let layouts = JSON.parse(content.slice(startLayout + 57, endLayout + 1));

console.log('Original layouts count:', layouts.length);
const filteredLayouts = layouts.filter(l => !animIds.has(l.id));
console.log('Filtered layouts count:', filteredLayouts.length);

// Check collisions
const CARD_W = 180;
const CARD_H = 270;
let collisions = [];
for (let i = 0; i < filteredLayouts.length; i++) {
  for (let j = i + 1; j < filteredLayouts.length; j++) {
    const a = filteredLayouts[i];
    const b = filteredLayouts[j];
    const overlapX = Math.abs(a.x - b.x) < CARD_W;
    const overlapY = Math.abs(a.y - b.y) < CARD_H;
    if (overlapX && overlapY) {
      collisions.push(`${a.id} (${a.x},${a.y}) <-> ${b.id} (${b.x},${b.y})`);
    }
  }
}
console.log('Total collisions in remaining nodes:', collisions.length);

// Check connections
const startConn = content.indexOf('export const ROADMAP_CONNECTIONS: NarrativeConnection[] = ');
const endConn = content.indexOf('];\n\n// Mapas auxiliares');
const conns = JSON.parse(content.slice(startConn + 58, endConn + 1));
const filteredConns = conns.filter(c => !animIds.has(c.source) && !animIds.has(c.target));
console.log('Conns count before:', conns.length, 'after:', filteredConns.length);
