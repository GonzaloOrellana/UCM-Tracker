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

// Shift nodes with y >= 6700 by +360
const SHIFT_Y = 360;
layouts.forEach(node => {
  if (node.y >= 6700) {
    node.y += SHIFT_Y;
  }
});

// Update Phase 3
const p3Updates = {
  'captain-america-civil-war-15': { x: 0, y: 4060 },
  'spider-man-homecoming-17': { x: 0, y: 4420 },
  'black-panther-19': { x: 0, y: 4780 },
  'doctor-strange-16': { x: 0, y: 5140 },
  'thor-ragnarok-18': { x: 0, y: 5500 },
  'avengers-infinity-war-20': { x: 0, y: 5860 },
  'ant-man-and-the-wasp-21': { x: -240, y: 6220 },
  'captain-marvel-22': { x: 240, y: 6220 },
  'avengers-endgame-23': { x: 0, y: 6580 },
};

Object.entries(p3Updates).forEach(([id, coords]) => {
  const node = layouts.find(l => l.id === id);
  if (node) {
    node.x = coords.x;
    node.y = coords.y;
  }
});

// Check Phase 3 edges
const startConn = content.indexOf('export const ROADMAP_CONNECTIONS');
const endConn = content.indexOf('// Mapas auxiliares');
const conns = JSON.parse(content.slice(content.indexOf(' = [', startConn) + 3, content.lastIndexOf(']', endConn) + 1));

const nodeMap = new Map(layouts.map(l => [l.id, l]));

const p3Ids = new Set(Object.keys(p3Updates));
const p3Conns = conns.filter(c => p3Ids.has(c.source) || p3Ids.has(c.target));

console.log('--- Phase 3 Connections Direction Check ---');
p3Conns.forEach(c => {
  const s = nodeMap.get(c.source);
  const t = nodeMap.get(c.target);
  if (s && t) {
    const dy = t.y - s.y;
    console.log(`${c.id}: ${c.source} (${s.x},${s.y}) -> ${c.target} (${t.x},${t.y}) | dy = ${dy}`);
  }
});
