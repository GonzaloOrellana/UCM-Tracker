import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Updated UNIVERSE_CONTAINERS (Solamente los 3 universos Live-Action externos)
const updatedUniverseContainers = `export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
  {
    "id": "container-spiderman-multiverse",
    "title": "Multiverso Spider-Man",
    "badgeColor": "#E11D48",
    "borderColor": "rgba(225, 29, 72, 0.45)",
    "glowColor": "rgba(225, 29, 72, 0.18)",
    "x": 1340,
    "y": 6630,
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
    "y": 7830,
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
    "y": 7770,
    "width": 260,
    "height": 760,
    "era": "fase-6"
  }
];`;

content = content.replace(
  /export const UNIVERSE_CONTAINERS: UniverseContainerConfig\[\] = \[[\s\S]*?\];/m,
  updatedUniverseContainers
);

// 2. Remove animated IDs from ROADMAP_NODE_LAYOUTS
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

const markerStart = 'export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ';
const markerEnd = 'export const ROADMAP_CONNECTIONS';

const startLayout = content.indexOf(markerStart);
const endLayout = content.indexOf(markerEnd);

const layoutJsonStart = content.indexOf('[', startLayout + markerStart.length - 1);
const layoutJsonEnd = content.lastIndexOf(']', endLayout);

let layouts = JSON.parse(content.slice(layoutJsonStart, layoutJsonEnd + 1));

const filteredLayouts = layouts.filter(l => !animIds.has(l.id));

const updatedLayoutsSection = markerStart + 
  JSON.stringify(filteredLayouts, null, 2) + `;\n\n`;

content = content.slice(0, startLayout) + updatedLayoutsSection + content.slice(endLayout);

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully removed animated productions! Layouts count: ${filteredLayouts.length}`);
