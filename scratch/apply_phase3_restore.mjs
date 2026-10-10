import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update PHASE_FILTERS
content = content.replace(
  /centerY:\s*7200,/g,
  'centerY: 7560,'
).replace(
  /centerY:\s*8200,/g,
  'centerY: 8560,'
).replace(
  /centerY:\s*9500,/g,
  'centerY: 9860,'
).replace(
  /centerY:\s*5500,/g,
  'centerY: 5700,'
);

// 2. Update UNIVERSE_CONTAINERS
const updatedUniverseContainers = `export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
  {
    "id": "container-spiderman-multiverse",
    "title": "Multiverso Spider-Man",
    "badgeColor": "#E11D48",
    "borderColor": "rgba(225, 29, 72, 0.45)",
    "glowColor": "rgba(225, 29, 72, 0.18)",
    "x": 1340,
    "y": 6990,
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
    "y": 8190,
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
    "y": 8130,
    "width": 260,
    "height": 760,
    "era": "fase-6"
  }
];`;

content = content.replace(
  /export const UNIVERSE_CONTAINERS: UniverseContainerConfig\[\] = \[[\s\S]*?\];/m,
  updatedUniverseContainers
);

// 3. Update ROADMAP_NODE_LAYOUTS
const markerStart = 'export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ';
const markerEnd = 'export const ROADMAP_CONNECTIONS';

const startLayout = content.indexOf(markerStart);
const endLayout = content.indexOf(markerEnd);

const layoutJsonStart = content.indexOf(' = [', startLayout) + 3;
const layoutJsonEnd = content.lastIndexOf(']', endLayout);

let layouts = JSON.parse(content.slice(layoutJsonStart, layoutJsonEnd + 1));

// Shift nodes with y >= 6700 by +360
const SHIFT_Y = 360;
layouts.forEach(node => {
  if (node.y >= 6700) {
    node.y += SHIFT_Y;
  }
});

// Update Phase 3 nodes
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

const updatedLayoutsSection = markerStart + JSON.stringify(layouts, null, 2) + `;\n\n`;

content = content.slice(0, startLayout) + updatedLayoutsSection + content.slice(endLayout);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully applied Phase 3 restoration and corridor offset!');
