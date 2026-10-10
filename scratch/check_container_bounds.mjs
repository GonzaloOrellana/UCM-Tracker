import fs from 'fs';

const filePath = 'src/data/roadmapTreeData.ts';
const content = fs.readFileSync(filePath, 'utf8');

const markerStart = 'export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = ';
const markerEnd = 'export const ROADMAP_CONNECTIONS';

const startLayout = content.indexOf(markerStart);
const endLayout = content.indexOf(markerEnd);

let layouts = JSON.parse(content.slice(content.indexOf(' = [', startLayout) + 3, content.lastIndexOf(']', endLayout) + 1));

// Shift
layouts.forEach(node => {
  if (node.y >= 6700) node.y += 360;
});

const containers = [
  { id: 'container-spiderman-multiverse', x: 1340, y: 6990, width: 500, height: 1140 },
  { id: 'container-xmen-multiverse', x: 1340, y: 8190, width: 500, height: 1900 },
  { id: 'container-fantasticfour-multiverse', x: -1320, y: 8130, width: 260, height: 760 }
];

const spideyIds = ['spider-man-1-tobey', 'spider-man-2-tobey', 'spider-man-3-tobey', 'the-amazing-spider-man-1-andrew', 'the-amazing-spider-man-2-andrew'];
const xmenIds = ['x-men-2000', 'x-men-2-2003', 'x-men-3-the-last-stand-2006', 'x-men-origins-wolverine-2009', 'x-men-first-class-2011', 'x-men-days-of-future-past-2014', 'logan-2017', 'deadpool-1-2016', 'deadpool-2-2018'];
const f4Ids = ['fantastic-four-2005', 'fantastic-four-rise-of-the-silver-surfer-2007'];

function checkContainer(c, ids) {
  console.log(`Checking ${c.id}: bounds x[${c.x}, ${c.x + c.width}], y[${c.y}, ${c.y + c.height}]`);
  ids.forEach(id => {
    const n = layouts.find(l => l.id === id);
    if (!n) console.log(`  ${id} NOT FOUND`);
    else {
      const inX = n.x >= c.x && (n.x + 180) <= (c.x + c.width);
      const inY = n.y >= c.y && (n.y + 270) <= (c.y + c.height);
      console.log(`  ${id}: (${n.x}, ${n.y}) -> inX: ${inX}, inY: ${inY}`);
    }
  });
}

checkContainer(containers[0], spideyIds);
checkContainer(containers[1], xmenIds);
checkContainer(containers[2], f4Ids);
