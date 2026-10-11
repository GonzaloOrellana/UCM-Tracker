import { NarrativeConnection, StorylineArc, MCUPriority } from '../types/mcu';
import { PRODUCTIONS } from './productions';

export type PhaseFilter = 'all' | 'Fase 1' | 'Fase 2' | 'Fase 3' | 'Fase 4' | 'Fase 5' | 'Fase 6';

export interface PhaseFilterMeta {
  id: PhaseFilter;
  label: string;
  saga: string;
  color: string;
  glow: string;
  centerX: number;
  centerY: number;
  zoom: number;
}

export const PHASE_FILTERS: PhaseFilterMeta[] = [
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
];

export interface UniverseContainerConfig {
  id: string;
  title: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  era: 'fase-4' | 'fase-5' | 'fase-6';
}

export const UNIVERSE_CONTAINERS: UniverseContainerConfig[] = [
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
  }
];

export interface RoadmapNodeLayout {
  id: string;
  x: number;
  y: number;
  lane: 'core' | 'multiverse' | 'cosmic' | 'mystic' | 'street' | 'mutants' | 'special' | 'legacy';
  era: 'legacy' | 'fase-1' | 'fase-2' | 'fase-3' | 'fase-4' | 'fase-5' | 'fase-6';
  isNexus?: boolean;
  isSpecial?: boolean; // Especiales fuera de la línea principal
}

export const ROADMAP_NODE_LAYOUTS: RoadmapNodeLayout[] = [
  {
    "id": "iron-man-1",
    "x": 0,
    "y": 100,
    "lane": "core",
    "era": "fase-1"
  },
  {
    "id": "the-incredible-hulk-2",
    "x": 0,
    "y": 460,
    "lane": "core",
    "era": "fase-1"
  },
  {
    "id": "thor-4",
    "x": 0,
    "y": 820,
    "lane": "cosmic",
    "era": "fase-1"
  },
  {
    "id": "iron-man-2-3",
    "x": 0,
    "y": 1180,
    "lane": "core",
    "era": "fase-1"
  },
  {
    "id": "captain-america-the-first-avenger-5",
    "x": 0,
    "y": 1540,
    "lane": "core",
    "era": "fase-1"
  },
  {
    "id": "agent-carter-s1",
    "x": 260,
    "y": 1540,
    "lane": "street",
    "era": "fase-1",
    "isSpecial": true
  },
  {
    "id": "the-avengers-6",
    "x": 0,
    "y": 1900,
    "lane": "core",
    "era": "fase-1",
    "isNexus": true
  },
  {
    "id": "agents-of-shield-7",
    "x": 260,
    "y": 1900,
    "lane": "street",
    "era": "fase-1",
    "isSpecial": true
  },
  {
    "id": "thor-the-dark-world-8",
    "x": 0,
    "y": 2260,
    "lane": "cosmic",
    "era": "fase-2"
  },
  {
    "id": "iron-man-3-9",
    "x": 0,
    "y": 2620,
    "lane": "core",
    "era": "fase-2"
  },
  {
    "id": "captain-america-the-winter-soldier-10",
    "x": 0,
    "y": 2980,
    "lane": "core",
    "era": "fase-2"
  },
  {
    "id": "avengers-age-of-ultron-13",
    "x": 0,
    "y": 3340,
    "lane": "core",
    "era": "fase-2",
    "isNexus": true
  },
  {
    "id": "guardians-of-the-galaxy-11",
    "x": 260,
    "y": 3340,
    "lane": "cosmic",
    "era": "fase-2"
  },
  {
    "id": "guardians-of-the-galaxy-vol-2-12",
    "x": 260,
    "y": 3700,
    "lane": "cosmic",
    "era": "fase-2"
  },
  {
    "id": "ant-man-14",
    "x": 0,
    "y": 3700,
    "lane": "core",
    "era": "fase-3"
  },
  {
    "id": "captain-america-civil-war-15",
    "x": 0,
    "y": 4060,
    "lane": "core",
    "era": "fase-3",
    "isNexus": true
  },
  {
    "id": "spider-man-homecoming-17",
    "x": 0,
    "y": 4420,
    "lane": "street",
    "era": "fase-3"
  },
  {
    "id": "black-panther-19",
    "x": 0,
    "y": 4780,
    "lane": "core",
    "era": "fase-3"
  },
  {
    "id": "doctor-strange-16",
    "x": 0,
    "y": 5140,
    "lane": "mystic",
    "era": "fase-3"
  },
  {
    "id": "thor-ragnarok-18",
    "x": 0,
    "y": 5500,
    "lane": "cosmic",
    "era": "fase-3"
  },
  {
    "id": "avengers-infinity-war-20",
    "x": 0,
    "y": 5860,
    "lane": "core",
    "era": "fase-3",
    "isNexus": true
  },
  {
    "id": "ant-man-and-the-wasp-21",
    "x": -240,
    "y": 6220,
    "lane": "core",
    "era": "fase-3"
  },
  {
    "id": "captain-marvel-22",
    "x": 240,
    "y": 6220,
    "lane": "cosmic",
    "era": "fase-3"
  },
  {
    "id": "avengers-endgame-23",
    "x": 0,
    "y": 6580,
    "lane": "core",
    "era": "fase-3",
    "isNexus": true
  },
  {
    "id": "spider-man-far-from-home-24",
    "x": -1420,
    "y": 7060,
    "lane": "street",
    "era": "fase-4"
  },
  {
    "id": "spider-man-no-way-home-33",
    "x": -1420,
    "y": 7640,
    "lane": "multiverse",
    "era": "fase-4",
    "isNexus": true
  },
  {
    "id": "hawkeye-32",
    "x": -1100,
    "y": 7060,
    "lane": "street",
    "era": "fase-4"
  },
  {
    "id": "she-hulk-37",
    "x": -1210,
    "y": 7640,
    "lane": "street",
    "era": "fase-4"
  },
  {
    "id": "echo-2024",
    "x": -990,
    "y": 7640,
    "lane": "street",
    "era": "fase-5"
  },
  {
    "id": "daredevil-born-again-s1",
    "x": -1100,
    "y": 8020,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "daredevil-born-again-s2",
    "x": -1100,
    "y": 8400,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "up-daredevil-born-again-s3",
    "x": -890,
    "y": 8400,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "punisher-one-last-kill",
    "x": -1350,
    "y": 8460,
    "lane": "street",
    "era": "fase-6",
    "isSpecial": true
  },
  {
    "id": "up-spider-man-4",
    "x": -1050,
    "y": 8840,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "black-widow-27",
    "x": -770,
    "y": 7060,
    "lane": "core",
    "era": "fase-4"
  },
  {
    "id": "shang-chi-and-the-legend-of-the-ten-rings-30",
    "x": -550,
    "y": 7060,
    "lane": "core",
    "era": "fase-4"
  },
  {
    "id": "wonder-man-47",
    "x": -660,
    "y": 7440,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "black-panther-wakanda-forever-38",
    "x": -330,
    "y": 7060,
    "lane": "core",
    "era": "fase-4"
  },
  {
    "id": "ironheart-49",
    "x": -330,
    "y": 7440,
    "lane": "core",
    "era": "fase-6"
  },
  {
    "id": "up-armor-wars",
    "x": -330,
    "y": 7820,
    "lane": "core",
    "era": "fase-6"
  },
  {
    "id": "ms-marvel-36",
    "x": -110,
    "y": 7060,
    "lane": "street",
    "era": "fase-4"
  },
  {
    "id": "secret-invasion-2023",
    "x": -110,
    "y": 7440,
    "lane": "street",
    "era": "fase-5"
  },
  {
    "id": "the-marvels-41",
    "x": -110,
    "y": 7820,
    "lane": "cosmic",
    "era": "fase-5"
  },
  {
    "id": "wanda-vision-25",
    "x": 110,
    "y": 7060,
    "lane": "multiverse",
    "era": "fase-4"
  },
  {
    "id": "doctor-strange-2-34",
    "x": 110,
    "y": 7440,
    "lane": "multiverse",
    "era": "fase-4",
    "isNexus": true
  },
  {
    "id": "agatha-all-along-2024",
    "x": 110,
    "y": 7820,
    "lane": "mystic",
    "era": "fase-5"
  },
  {
    "id": "up-vision-quest",
    "x": 110,
    "y": 8200,
    "lane": "multiverse",
    "era": "fase-6"
  },
  {
    "id": "falcon-and-winter-soldier-26",
    "x": 330,
    "y": 7060,
    "lane": "street",
    "era": "fase-4"
  },
  {
    "id": "captain-america-brave-new-world-43",
    "x": 440,
    "y": 7440,
    "lane": "core",
    "era": "fase-6"
  },
  {
    "id": "eternals-31",
    "x": 550,
    "y": 7060,
    "lane": "cosmic",
    "era": "fase-4"
  },
  {
    "id": "thor-love-and-thunder-35",
    "x": 770,
    "y": 7060,
    "lane": "cosmic",
    "era": "fase-4"
  },
  {
    "id": "guardians-galaxy-holiday-special",
    "x": 770,
    "y": 7440,
    "lane": "special",
    "era": "fase-5",
    "isSpecial": true
  },
  {
    "id": "guardians-of-the-galaxy-vol-3-40",
    "x": 770,
    "y": 7820,
    "lane": "cosmic",
    "era": "fase-5"
  },
  {
    "id": "moon-knight-35",
    "x": 990,
    "y": 7060,
    "lane": "mystic",
    "era": "fase-4"
  },
  {
    "id": "werewolf-by-night",
    "x": 990,
    "y": 7440,
    "lane": "special",
    "era": "fase-4",
    "isSpecial": true
  },
  {
    "id": "loki-s1",
    "x": 1210,
    "y": 7060,
    "lane": "multiverse",
    "era": "fase-4",
    "isNexus": true
  },
  {
    "id": "ant-man-quantumania-39",
    "x": 1210,
    "y": 7440,
    "lane": "multiverse",
    "era": "fase-5"
  },
  {
    "id": "loki-s2",
    "x": 1210,
    "y": 7820,
    "lane": "multiverse",
    "era": "fase-5",
    "isNexus": true
  },
  {
    "id": "thunderbolts-44",
    "x": -450,
    "y": 8580,
    "lane": "core",
    "era": "fase-6",
    "isNexus": true
  },
  {
    "id": "fantastic-four-first-steps-2025",
    "x": 450,
    "y": 8580,
    "lane": "multiverse",
    "era": "fase-6",
    "isNexus": true
  },
  {
    "id": "deadpool-wolverine-42",
    "x": 950,
    "y": 8580,
    "lane": "multiverse",
    "era": "fase-5",
    "isNexus": true
  },
  {
    "id": "up-avengers-doomsday",
    "x": 0,
    "y": 9160,
    "lane": "multiverse",
    "era": "fase-6",
    "isNexus": true
  },
  {
    "id": "up-avengers-secret-wars",
    "x": 0,
    "y": 9540,
    "lane": "multiverse",
    "era": "fase-6",
    "isNexus": true
  },
  {
    "id": "spider-man-1-tobey",
    "x": -2150,
    "y": 6950,
    "lane": "legacy",
    "era": "fase-4"
  },
  {
    "id": "spider-man-2-tobey",
    "x": -2150,
    "y": 7270,
    "lane": "legacy",
    "era": "fase-4"
  },
  {
    "id": "spider-man-3-tobey",
    "x": -2150,
    "y": 7590,
    "lane": "legacy",
    "era": "fase-4"
  },
  {
    "id": "the-amazing-spider-man-1-andrew",
    "x": -1910,
    "y": 7270,
    "lane": "legacy",
    "era": "fase-4"
  },
  {
    "id": "the-amazing-spider-man-2-andrew",
    "x": -1910,
    "y": 7590,
    "lane": "legacy",
    "era": "fase-4"
  },
  {
    "id": "iron-fist-s1",
    "x": -2900,
    "y": 7950,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "iron-fist-s2",
    "x": -2900,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "luke-cage-s1",
    "x": -2660,
    "y": 7950,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "luke-cage-s2",
    "x": -2660,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "jessica-jones-s1",
    "x": -2420,
    "y": 7950,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "jessica-jones-s2",
    "x": -2420,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "jessica-jones-s3",
    "x": -2420,
    "y": 8590,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "the-defenders",
    "x": -2180,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "daredevil-netflix-s1",
    "x": -1940,
    "y": 7950,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "daredevil-netflix-s2",
    "x": -1940,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "daredevil-netflix-s3",
    "x": -1940,
    "y": 8590,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "punisher-s1",
    "x": -1700,
    "y": 8270,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "punisher-s2",
    "x": -1700,
    "y": 8590,
    "lane": "street",
    "era": "fase-6"
  },
  {
    "id": "deadpool-1-2016",
    "x": 1550,
    "y": 7400,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "deadpool-2-2018",
    "x": 1550,
    "y": 7750,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "logan-2017",
    "x": 1550,
    "y": 8100,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-2000",
    "x": 1850,
    "y": 7400,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-2-2003",
    "x": 1850,
    "y": 7750,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-3-the-last-stand-2006",
    "x": 1850,
    "y": 8100,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-first-class-2011",
    "x": 2090,
    "y": 7400,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-days-of-future-past-2014",
    "x": 2090,
    "y": 7750,
    "lane": "legacy",
    "era": "fase-5"
  },
  {
    "id": "x-men-origins-wolverine-2009",
    "x": 2090,
    "y": 8100,
    "lane": "legacy",
    "era": "fase-5"
  }
];

export const ROADMAP_CONNECTIONS: NarrativeConnection[] = [
  {
    "id": "e-im1-hulk",
    "source": "iron-man-1",
    "target": "the-incredible-hulk-2",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-hulk-thor1",
    "source": "the-incredible-hulk-2",
    "target": "thor-4",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-thor1-im2",
    "source": "thor-4",
    "target": "iron-man-2-3",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-im2-cap1",
    "source": "iron-man-2-3",
    "target": "captain-america-the-first-avenger-5",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-cap1-carter",
    "source": "captain-america-the-first-avenger-5",
    "target": "agent-carter-s1",
    "arc": "core-avengers",
    "isEssential": false
  },
  {
    "id": "e-cap1-av1",
    "source": "captain-america-the-first-avenger-5",
    "target": "the-avengers-6",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-av1-aos",
    "source": "the-avengers-6",
    "target": "agents-of-shield-7",
    "arc": "core-avengers",
    "isEssential": false
  },
  {
    "id": "e-av1-thor2",
    "source": "the-avengers-6",
    "target": "thor-the-dark-world-8",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-thor2-im3",
    "source": "thor-the-dark-world-8",
    "target": "iron-man-3-9",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-im3-ws",
    "source": "iron-man-3-9",
    "target": "captain-america-the-winter-soldier-10",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-ws-aou",
    "source": "captain-america-the-winter-soldier-10",
    "target": "avengers-age-of-ultron-13",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-ws-gotg1",
    "source": "captain-america-the-winter-soldier-10",
    "target": "guardians-of-the-galaxy-11",
    "arc": "cosmic",
    "isEssential": false
  },
  {
    "id": "e-gotg1-gotg2",
    "source": "guardians-of-the-galaxy-11",
    "target": "guardians-of-the-galaxy-vol-2-12",
    "arc": "cosmic",
    "isEssential": false
  },
  {
    "id": "e-aou-ant1",
    "source": "avengers-age-of-ultron-13",
    "target": "ant-man-14",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-ant1-cw",
    "source": "ant-man-14",
    "target": "captain-america-civil-war-15",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-cw-sp1",
    "source": "captain-america-civil-war-15",
    "target": "spider-man-homecoming-17",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-sp1-bp",
    "source": "spider-man-homecoming-17",
    "target": "black-panther-19",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-bp-ds1",
    "source": "black-panther-19",
    "target": "doctor-strange-16",
    "arc": "mystic",
    "isEssential": true
  },
  {
    "id": "e-ds1-rag",
    "source": "doctor-strange-16",
    "target": "thor-ragnarok-18",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-rag-iw",
    "source": "thor-ragnarok-18",
    "target": "avengers-infinity-war-20",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-gotg2-iw",
    "source": "guardians-of-the-galaxy-vol-2-12",
    "target": "avengers-infinity-war-20",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-iw-ant2",
    "source": "avengers-infinity-war-20",
    "target": "ant-man-and-the-wasp-21",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-iw-cm",
    "source": "avengers-infinity-war-20",
    "target": "captain-marvel-22",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-ant2-eg",
    "source": "ant-man-and-the-wasp-21",
    "target": "avengers-endgame-23",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-cm-eg",
    "source": "captain-marvel-22",
    "target": "avengers-endgame-23",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-eg-ffh",
    "source": "avengers-endgame-23",
    "target": "spider-man-far-from-home-24",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-eg-hawk",
    "source": "avengers-endgame-23",
    "target": "hawkeye-32",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-eg-bw",
    "source": "avengers-endgame-23",
    "target": "black-widow-27",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-eg-shang",
    "source": "avengers-endgame-23",
    "target": "shang-chi-and-the-legend-of-the-ten-rings-30",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-eg-bp2",
    "source": "avengers-endgame-23",
    "target": "black-panther-wakanda-forever-38",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-eg-msm",
    "source": "avengers-endgame-23",
    "target": "ms-marvel-36",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-eg-wv",
    "source": "avengers-endgame-23",
    "target": "wanda-vision-25",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-eg-fal",
    "source": "avengers-endgame-23",
    "target": "falcon-and-winter-soldier-26",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-eg-eternals",
    "source": "avengers-endgame-23",
    "target": "eternals-31",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-eg-thor4",
    "source": "avengers-endgame-23",
    "target": "thor-love-and-thunder-35",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-eg-mk",
    "source": "avengers-endgame-23",
    "target": "moon-knight-35",
    "arc": "mystic",
    "isEssential": false
  },
  {
    "id": "e-eg-loki",
    "source": "avengers-endgame-23",
    "target": "loki-s1",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-sp1_tobey-sp2",
    "source": "spider-man-1-tobey",
    "target": "spider-man-2-tobey",
    "arc": "legacy",
    "isEssential": false
  },
  {
    "id": "e-sp2_tobey-sp3",
    "source": "spider-man-2-tobey",
    "target": "spider-man-3-tobey",
    "arc": "legacy",
    "isEssential": false
  },
  {
    "id": "e-sp1_andrew-sp2",
    "source": "the-amazing-spider-man-1-andrew",
    "target": "the-amazing-spider-man-2-andrew",
    "arc": "legacy",
    "isEssential": false
  },
  {
    "id": "e-spidiverse-nwh",
    "source": "container-spiderman-multiverse",
    "target": "spider-man-no-way-home-33",
    "arc": "multiverse",
    "isEssential": true,
    "label": "Multiverso Spider-Man"
  },
  {
    "id": "e-ffh-nwh",
    "source": "spider-man-far-from-home-24",
    "target": "spider-man-no-way-home-33",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-nwh-bnd",
    "source": "spider-man-no-way-home-33",
    "target": "up-spider-man-4",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-bw-hawk",
    "source": "black-widow-27",
    "target": "hawkeye-32",
    "arc": "street",
    "isEssential": true,
    "label": "Misión post-créditos Yelena"
  },
  {
    "id": "e-hawk-echo",
    "source": "hawkeye-32",
    "target": "echo-2024",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-shehulk-ddba",
    "source": "she-hulk-37",
    "target": "daredevil-born-again-s1",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-echo-ddba",
    "source": "echo-2024",
    "target": "daredevil-born-again-s1",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-ddba1-ddba2",
    "source": "daredevil-born-again-s1",
    "target": "daredevil-born-again-s2",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-ddba1-punspec",
    "source": "daredevil-born-again-s1",
    "target": "punisher-one-last-kill",
    "arc": "street",
    "isEssential": true,
    "label": "Frank Castle"
  },
  {
    "id": "e-ddba2-ddba3",
    "source": "daredevil-born-again-s2",
    "target": "up-daredevil-born-again-s3",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-ddba2-bnd",
    "source": "daredevil-born-again-s2",
    "target": "up-spider-man-4",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-dd1-dd2",
    "source": "daredevil-netflix-s1",
    "target": "daredevil-netflix-s2",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-dd2-dd3",
    "source": "daredevil-netflix-s2",
    "target": "daredevil-netflix-s3",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-pun1-pun2",
    "source": "punisher-s1",
    "target": "punisher-s2",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-jj1-jj2",
    "source": "jessica-jones-s1",
    "target": "jessica-jones-s2",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-jj2-jj3",
    "source": "jessica-jones-s2",
    "target": "jessica-jones-s3",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-lc1-lc2",
    "source": "luke-cage-s1",
    "target": "luke-cage-s2",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-if1-if2",
    "source": "iron-fist-s1",
    "target": "iron-fist-s2",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-dd2-def",
    "source": "daredevil-netflix-s2",
    "target": "the-defenders",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-jj-def",
    "source": "jessica-jones-s2",
    "target": "the-defenders",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-lc-def",
    "source": "luke-cage-s2",
    "target": "the-defenders",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-if-def",
    "source": "iron-fist-s2",
    "target": "the-defenders",
    "arc": "street",
    "isEssential": false
  },
  {
    "id": "e-def-dd3",
    "source": "the-defenders",
    "target": "daredevil-netflix-s3",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-defenders-ddba",
    "source": "container-defenders",
    "target": "daredevil-born-again-s1",
    "arc": "street",
    "isEssential": true,
    "label": "The Defenders Saga"
  },
  {
    "id": "e-punspec-bnd",
    "source": "punisher-one-last-kill",
    "target": "up-spider-man-4",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-shang-wm",
    "source": "shang-chi-and-the-legend-of-the-ten-rings-30",
    "target": "wonder-man-47",
    "arc": "core-avengers",
    "isEssential": false
  },
  {
    "id": "e-wm-tb",
    "source": "wonder-man-47",
    "target": "thunderbolts-44",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-shang-doom",
    "source": "shang-chi-and-the-legend-of-the-ten-rings-30",
    "target": "up-avengers-doomsday",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-wf-ih",
    "source": "black-panther-wakanda-forever-38",
    "target": "ironheart-49",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-ih-aw",
    "source": "ironheart-49",
    "target": "up-armor-wars",
    "arc": "core-avengers",
    "isEssential": false
  },
  {
    "id": "e-ih-doom",
    "source": "ironheart-49",
    "target": "up-avengers-doomsday",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-msm-si",
    "source": "ms-marvel-36",
    "target": "secret-invasion-2023",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-si-tm",
    "source": "secret-invasion-2023",
    "target": "the-marvels-41",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-wv-tm",
    "source": "wanda-vision-25",
    "target": "the-marvels-41",
    "arc": "cosmic",
    "isEssential": true,
    "label": "Monica Rambeau"
  },
  {
    "id": "e-tm-doom",
    "source": "the-marvels-41",
    "target": "up-avengers-doomsday",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-wv-ds2",
    "source": "wanda-vision-25",
    "target": "doctor-strange-2-34",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-ds2-agatha",
    "source": "doctor-strange-2-34",
    "target": "agatha-all-along-2024",
    "arc": "mystic",
    "isEssential": true
  },
  {
    "id": "e-agatha-vq",
    "source": "agatha-all-along-2024",
    "target": "up-vision-quest",
    "arc": "mystic",
    "isEssential": true
  },
  {
    "id": "e-vq-doom",
    "source": "up-vision-quest",
    "target": "up-avengers-doomsday",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-fal-cap4",
    "source": "falcon-and-winter-soldier-26",
    "target": "captain-america-brave-new-world-43",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-eternals-cap4",
    "source": "eternals-31",
    "target": "captain-america-brave-new-world-43",
    "arc": "core-avengers",
    "isEssential": true,
    "label": "Tiamut / Adamantium"
  },
  {
    "id": "e-cap4-tb",
    "source": "captain-america-brave-new-world-43",
    "target": "thunderbolts-44",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-thor4-ghs",
    "source": "thor-love-and-thunder-35",
    "target": "guardians-galaxy-holiday-special",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-ghs-gotg3",
    "source": "guardians-galaxy-holiday-special",
    "target": "guardians-of-the-galaxy-vol-3-40",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-gotg3-doom",
    "source": "guardians-of-the-galaxy-vol-3-40",
    "target": "up-avengers-doomsday",
    "arc": "cosmic",
    "isEssential": true
  },
  {
    "id": "e-loki1-qm",
    "source": "loki-s1",
    "target": "ant-man-quantumania-39",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-qm-loki2",
    "source": "ant-man-quantumania-39",
    "target": "loki-s2",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-loki2-doom",
    "source": "loki-s2",
    "target": "up-avengers-doomsday",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-bw-tb",
    "source": "black-widow-27",
    "target": "thunderbolts-44",
    "arc": "core-avengers",
    "isEssential": true,
    "label": "Yelena Belova & Red Guardian"
  },
  {
    "id": "e-fal-tb",
    "source": "falcon-and-winter-soldier-26",
    "target": "thunderbolts-44",
    "arc": "core-avengers",
    "isEssential": true,
    "label": "Bucky Barnes & John Walker"
  },
  {
    "id": "e-ant2-tb",
    "source": "ant-man-and-the-wasp-21",
    "target": "thunderbolts-44",
    "arc": "core-avengers",
    "isEssential": true,
    "label": "Ava Starr / Ghost"
  },
  {
    "id": "e-tb-bnd",
    "source": "thunderbolts-44",
    "target": "up-spider-man-4",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-bnd-doom",
    "source": "up-spider-man-4",
    "target": "up-avengers-doomsday",
    "arc": "street",
    "isEssential": true
  },
  {
    "id": "e-tb-doom",
    "source": "thunderbolts-44",
    "target": "up-avengers-doomsday",
    "arc": "core-avengers",
    "isEssential": true
  },
  {
    "id": "e-f4steps-doom",
    "source": "fantastic-four-first-steps-2025",
    "target": "up-avengers-doomsday",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-dp1-dp2",
    "source": "deadpool-1-2016",
    "target": "deadpool-2-2018",
    "arc": "legacy",
    "isEssential": false
  },
  {
    "id": "e-dp2-logan",
    "source": "deadpool-2-2018",
    "target": "logan-2017",
    "arc": "legacy",
    "isEssential": false
  },
  {
    "id": "e-xmen-dpw",
    "source": "container-xmen-multiverse",
    "target": "deadpool-wolverine-42",
    "arc": "multiverse",
    "isEssential": true,
    "label": "Universo X-Men"
  },
  {
    "id": "e-dpw-doom",
    "source": "deadpool-wolverine-42",
    "target": "up-avengers-doomsday",
    "arc": "multiverse",
    "isEssential": true
  },
  {
    "id": "e-doom-secretwars",
    "source": "up-avengers-doomsday",
    "target": "up-avengers-secret-wars",
    "arc": "multiverse",
    "isEssential": true
  }
];

// Mapa O(1) indexado por ID de nodo para evitar búsquedas O(N) .find() repetitivas
export const ROADMAP_NODE_LAYOUT_MAP = new Map(
  ROADMAP_NODE_LAYOUTS.map((layout) => [layout.id, layout])
);

// Registrar contenedores de universos en el mapa de layouts para cálculo de aristas
UNIVERSE_CONTAINERS.forEach((container) => {
  ROADMAP_NODE_LAYOUT_MAP.set(container.id, {
    id: container.id,
    x: container.x,
    y: container.y,
    lane: 'street',
    era: container.era,
  });
});

// Mapas auxiliares para cálculo eficiente de caminos de precedencia
const predecessorsMap = new Map<string, string[]>();
const successorsMap = new Map<string, string[]>();

ROADMAP_CONNECTIONS.forEach((conn) => {
  if (!successorsMap.has(conn.source)) {
    successorsMap.set(conn.source, []);
  }
  successorsMap.get(conn.source)!.push(conn.target);

  if (!predecessorsMap.has(conn.target)) {
    predecessorsMap.set(conn.target, []);
  }
  predecessorsMap.get(conn.target)!.push(conn.source);
});

// Enlazar lógicamente las series de The Defenders con su contenedor para trazabilidad bidireccional
const DEFENDERS_SERIES_IDS = [
  'daredevil-netflix-s1',
  'daredevil-netflix-s2',
  'daredevil-netflix-s3',
  'the-defenders',
  'jessica-jones-s1',
  'jessica-jones-s2',
  'jessica-jones-s3',
  'luke-cage-s1',
  'luke-cage-s2',
  'iron-fist-s1',
  'iron-fist-s2',
  'punisher-s1',
  'punisher-s2',
];

DEFENDERS_SERIES_IDS.forEach((id) => {
  if (!successorsMap.has(id)) successorsMap.set(id, []);
  successorsMap.get(id)!.push('container-defenders');

  if (!predecessorsMap.has('container-defenders')) predecessorsMap.set('container-defenders', []);
  predecessorsMap.get('container-defenders')!.push(id);
});

// Enlazar lógicamente el Multiverso Spider-Man con su contenedor
const SPIDERMAN_LEGACY_IDS = [
  'spider-man-1-tobey',
  'spider-man-2-tobey',
  'spider-man-3-tobey',
  'the-amazing-spider-man-1-andrew',
  'the-amazing-spider-man-2-andrew',
];

SPIDERMAN_LEGACY_IDS.forEach((id) => {
  if (!successorsMap.has(id)) successorsMap.set(id, []);
  successorsMap.get(id)!.push('container-spiderman-multiverse');

  if (!predecessorsMap.has('container-spiderman-multiverse'))
    predecessorsMap.set('container-spiderman-multiverse', []);
  predecessorsMap.get('container-spiderman-multiverse')!.push(id);
});

// Enlazar lógicamente el Universo X-Men con su contenedor
const XMEN_LEGACY_IDS = [
  'deadpool-1-2016',
  'deadpool-2-2018',
  'logan-2017',
  'x-men-2000',
  'x-men-2-2003',
  'x-men-3-the-last-stand-2006',
  'x-men-first-class-2011',
  'x-men-days-of-future-past-2014',
  'x-men-origins-wolverine-2009',
];

XMEN_LEGACY_IDS.forEach((id) => {
  if (!successorsMap.has(id)) successorsMap.set(id, []);
  successorsMap.get(id)!.push('container-xmen-multiverse');

  if (!predecessorsMap.has('container-xmen-multiverse'))
    predecessorsMap.set('container-xmen-multiverse', []);
  predecessorsMap.get('container-xmen-multiverse')!.push(id);
});

// Precomputar todos los ancestros y sucesores para todos los nodos en tiempo de inicio (O(1) lookups en render)
const precomputedPredecessors = new Map<string, Set<string>>();
const precomputedSuccessors = new Map<string, Set<string>>();
const EMPTY_SET = new Set<string>();

const ALL_GRAPH_NODES = [
  ...ROADMAP_NODE_LAYOUTS,
  ...UNIVERSE_CONTAINERS.map((c) => ({ id: c.id })),
];

ALL_GRAPH_NODES.forEach((node) => {
  // Predecesores
  const preds = new Set<string>();
  const pQueue = [node.id];
  while (pQueue.length > 0) {
    const cur = pQueue.shift()!;
    const directPreds = predecessorsMap.get(cur) || [];
    for (const p of directPreds) {
      if (!preds.has(p)) {
        preds.add(p);
        pQueue.push(p);
      }
    }
  }
  precomputedPredecessors.set(node.id, preds);

  // Sucesores
  const succs = new Set<string>();
  const sQueue = [node.id];
  while (sQueue.length > 0) {
    const cur = sQueue.shift()!;
    const directSuccs = successorsMap.get(cur) || [];
    for (const s of directSuccs) {
      if (!succs.has(s)) {
        succs.add(s);
        sQueue.push(s);
      }
    }
  }
  precomputedSuccessors.set(node.id, succs);
});

export function getAllPredecessorIds(targetId: string): Set<string> {
  return precomputedPredecessors.get(targetId) || EMPTY_SET;
}

export function getAllSuccessorIds(sourceId: string): Set<string> {
  return precomputedSuccessors.get(sourceId) || EMPTY_SET;
}

// Mapa O(1) para consultar la prioridad de cada producción del UCM
const PRODUCTIONS_PRIORITY_MAP = new Map<string, MCUPriority>(
  PRODUCTIONS.map((p) => [p.id, p.prioridad || 'esencial'])
);

// Estructura estática precomputada de aristas (geometría, handles y eras precalculadas)
export interface StaticEdgeSpec {
  id: string;
  source: string;
  target: string;
  arc: Exclude<StorylineArc, 'all'>;
  priority: MCUPriority;
  isEssential: boolean;
  label?: string;
  sourceHandle: string;
  targetHandle: string;
  sourceEra?: string;
  targetEra?: string;
  isLongDistance: boolean;
  isSameSideVertical: boolean;
  isPostEndgame: boolean;
  isMergedTarget: boolean;
  isPrimaryIncoming: boolean;
  targetJunctionOffset: number;
  isEndgameBranch: boolean;
}

const incomingByTarget = new Map<string, NarrativeConnection[]>();
ROADMAP_CONNECTIONS.forEach((conn) => {
  if (!incomingByTarget.has(conn.target)) {
    incomingByTarget.set(conn.target, []);
  }
  incomingByTarget.get(conn.target)!.push(conn);
});

export const STATIC_EDGE_SPECS: StaticEdgeSpec[] = ROADMAP_CONNECTIONS.map((conn) => {
  const sourceLayout = ROADMAP_NODE_LAYOUT_MAP.get(conn.source);
  const targetLayout = ROADMAP_NODE_LAYOUT_MAP.get(conn.target);

  const deltaY = sourceLayout && targetLayout ? Math.abs(targetLayout.y - sourceLayout.y) : 0;
  const deltaX = sourceLayout && targetLayout ? Math.abs(targetLayout.x - sourceLayout.x) : 0;
  const isHorizontal = sourceLayout && targetLayout && deltaY < 100;
  const isLongDistance = deltaY > 550;

  let sourceHandle = 'source-bottom';
  let targetHandle = 'target-top';

  if (isHorizontal && sourceLayout && targetLayout) {
    if (targetLayout.x > sourceLayout.x) {
      sourceHandle = 'source-right';
      targetHandle = 'target-left';
    } else {
      sourceHandle = 'source-left';
      targetHandle = 'target-right';
    }
  } else if (sourceLayout && targetLayout) {
    if (deltaY > 500 && deltaX < 180 && deltaX > 0) {
      if (sourceLayout.x <= 0) {
        sourceHandle = 'source-left';
        targetHandle = 'target-left';
      } else {
        sourceHandle = 'source-right';
        targetHandle = 'target-right';
      }
    }
  }

  // Conexiones de los contenedores de universos hacia el UCM principal
  if (conn.id === 'e-defenders-ddba') {
    sourceHandle = 'source-right';
    targetHandle = 'target-left';
  }
  if (conn.id === 'e-spidiverse-nwh') {
    sourceHandle = 'source-right';
    targetHandle = 'target-left';
  }
  // Corrección Foto 1: Salir por la base de la columna de Logan del Universo X-Men y entrar por la derecha a Deadpool & Wolverine
  if (conn.id === 'e-xmen-dpw') {
    sourceHandle = 'source-bottom';
    targetHandle = 'target-right';
  }

  // Corrección Foto 2: Conexión vertical 100% directa entre Spider-Man: Far From Home y Spider-Man: No Way Home
  if (conn.id === 'e-ffh-nwh') {
    sourceHandle = 'source-bottom';
    targetHandle = 'target-top';
  }

  // Conexión de Daredevil Born Again S1 a Punisher Special (salir por la base, entrar por arriba)
  if (conn.id === 'e-ddba1-punspec') {
    sourceHandle = 'source-bottom';
    targetHandle = 'target-top';
  }

  // The Defenders entra por el lateral izquierdo a Daredevil S3
  if (conn.id === 'e-def-dd3') {
    sourceHandle = 'source-right';
    targetHandle = 'target-left';
  }

  // Guardianes de la Galaxia Vol. 2 baja directo por la derecha y entra por la derecha a Avengers: Infinity War
  if (conn.id === 'e-gotg2-iw') {
    sourceHandle = 'source-bottom';
    targetHandle = 'target-right';
  }

  // Thunderbolts conecta por su lateral izquierdo hacia la parte superior de Spider-Man 4 (Brand New Day)
  if (conn.id === 'e-tb-bnd') {
    sourceHandle = 'source-left';
    targetHandle = 'target-top';
  }

  // Spider-Man 4 conecta por su base hacia el colector inferior de Doomsday
  if (conn.id === 'e-bnd-doom') {
    sourceHandle = 'source-bottom';
    targetHandle = 'target-top';
  }

  const isSameSideVertical =
    (sourceHandle === 'source-left' && targetHandle === 'target-left') ||
    (sourceHandle === 'source-right' && targetHandle === 'target-right');

  const isPostEndgame =
    (sourceLayout && sourceLayout.y >= 6580) || (targetLayout && targetLayout.y >= 6580) || false;
  const targetConns = (incomingByTarget.get(conn.target) || []).filter((c) => {
    let cTargetHandle = 'target-top';
    if (c.id === 'e-defenders-ddba' || c.id === 'e-spidiverse-nwh' || c.id === 'e-def-dd3') cTargetHandle = 'target-left';
    if (c.id === 'e-xmen-dpw' || c.id === 'e-gotg2-iw') cTargetHandle = 'target-right';
    return cTargetHandle === targetHandle;
  });
  const isMergedTarget = targetConns.length > 1 && isPostEndgame && targetHandle === 'target-top';
  const isPrimaryIncoming = targetConns[0]?.id === conn.id;
  const isEndgameBranch = conn.source === 'avengers-endgame-23';
  const targetJunctionOffset = conn.target === 'up-avengers-doomsday' ? 60 : 50;

  // Prioridad de la conexión basada en la prioridad de la producción destino en el UCM
  const targetPriority = PRODUCTIONS_PRIORITY_MAP.get(conn.target) || (conn.isEssential !== false ? 'esencial' : 'opcional');
  let priority: MCUPriority = targetPriority;
  if (conn.isEssential === false && targetPriority === 'esencial') {
    priority = 'opcional';
  }

  // Las flechas que terminan en Avengers: Doomsday siempre son esenciales
  if (conn.target === 'up-avengers-doomsday' || conn.target === 'up-avengers-secret-wars') {
    priority = 'esencial';
  }

  // Las flechas que unen las temporadas de Daredevil (Netflix) y Thunderbolts a Spider-Man 4 son esenciales
  if (
    conn.id === 'e-dd1-dd2' ||
    conn.id === 'e-dd2-dd3' ||
    conn.id === 'e-dd2-def' ||
    conn.id === 'e-def-dd3' ||
    conn.id === 'e-tb-bnd'
  ) {
    priority = 'esencial';
  }

  return {
    id: conn.id,
    source: conn.source,
    target: conn.target,
    arc: conn.arc,
    priority,
    isEssential: conn.isEssential !== false,
    label: conn.label,
    sourceHandle,
    targetHandle,
    sourceEra: sourceLayout?.era,
    targetEra: targetLayout?.era,
    isLongDistance,
    isSameSideVertical,
    isPostEndgame,
    isMergedTarget,
    isPrimaryIncoming,
    targetJunctionOffset,
    isEndgameBranch,
  };
});

export function getArcColor(arc: Exclude<StorylineArc, 'all'>): string {
  switch (arc) {
    case 'core-avengers':
      return '#00B4FF';
    case 'multiverse':
      return '#B056FE';
    case 'cosmic':
      return '#38BDF8';
    case 'mystic':
      return '#F59E0B';
    case 'street':
      return '#10B981';
    case 'legacy':
      return '#F43F5E';
    default:
      return '#94A3B8';
  }
}

export function getPriorityColor(priority?: MCUPriority): string {
  switch (priority) {
    case 'esencial':
      return '#EF4444'; // Rojo vibrante Marvel
    case 'recomendada':
      return '#10B981'; // Verde Esmeralda
    case 'complementaria':
      return '#F59E0B'; // Ámbar Dorado
    case 'opcional':
      return '#71717A'; // Zinc Neutro
    default:
      return '#EF4444';
  }
}



