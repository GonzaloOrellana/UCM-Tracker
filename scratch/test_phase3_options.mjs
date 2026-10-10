import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
const content = fs.readFileSync(filePath, 'utf8');

const markerStart = 'export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ';
const markerEnd = 'export const ROADMAP_CONNECTIONS';

const startLayout = content.indexOf(markerStart);
const endLayout = content.indexOf(markerEnd);

const layoutJsonStart = content.indexOf('[', startLayout + markerStart.length - 1);
const layoutJsonEnd = content.lastIndexOf(']', endLayout);

let layouts = JSON.parse(content.slice(layoutJsonStart, layoutJsonEnd + 1));

// Option A: Shift Phase 4+ by +360px
// Option B: Adjust Phase 3 to fit cleanly before Y=6700
console.log('Total layouts:', layouts.length);

// Let's inspect Phase 3 nodes
const p3Ids = [
  'captain-america-civil-war-15',
  'spider-man-homecoming-17',
  'black-panther-19',
  'doctor-strange-16',
  'thor-ragnarok-18',
  'avengers-infinity-war-20',
  'ant-man-and-the-wasp-21',
  'captain-marvel-22',
  'avengers-endgame-23'
];

p3Ids.forEach(id => {
  const node = layouts.find(l => l.id === id);
  console.log(id, ':', node ? { x: node.x, y: node.y } : 'MISSING');
});
