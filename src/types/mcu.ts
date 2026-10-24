export type MediaType = 'movie' | 'series' | 'special';

export type MCUPhase =
  | 'Fase 1'
  | 'Fase 2'
  | 'Fase 3'
  | 'Fase 4'
  | 'Fase 5'
  | 'Fase 6'
  | 'Serie ABC'
  | 'Web Series'
  | (string & {});

export type MCUPriority = 'esencial' | 'recomendada' | 'complementaria' | 'opcional';

export interface MCUItem {
  id: string;
  titulo: string;
  tituloOriginal?: string;
  tipo: MediaType;
  anioLanzamiento: number;
  fechaLanzamiento: string; // ISO YYYY-MM-DD
  ordenEstreno: number;
  ordenCronologico: number;
  ordenRecomendado?: number;
  ordenListaMaestra?: number;
  prioridad?: MCUPriority;
  fase: MCUPhase;
  urlPoster: string;
  urlPosterHorizontal?: string;
  enCines?: boolean;
  resumen: string;
  duracion?: string;
  tmdbId?: number;
  isCustom?: boolean;
  personajePrincipal?: string;
  colorAcento?: string;
  fechaEsExacta?: boolean;
  urlOficial?: string;
}

export type OrderMode = 'release' | 'chronological' | 'recommended';

export type NavView = 'dashboard' | 'all' | 'movies' | 'series' | 'specials' | 'upcoming' | 'profile' | 'privacy' | 'terms' | 'doomsday' | 'roadmap';

export type StorylineArc =
  | 'all'
  | 'core-avengers'
  | 'multiverse'
  | 'cosmic'
  | 'mystic'
  | 'street'
  | 'legacy';

export interface NarrativeConnection {
  id: string;
  source: string;
  target: string;
  arc: Exclude<StorylineArc, 'all'>;
  isEssential?: boolean;
  label?: string;
}

export interface FilterState {
  status: 'all' | 'watched' | 'unwatched';
  type: 'all' | MediaType;
  phase: 'all' | MCUPhase;
  priority: 'all' | MCUPriority;
  order: OrderMode;
  search: string;
}

export interface ProgressStats {
  total: number;
  watched: number;
  percentage: number;
  movies: { total: number; watched: number };
  series: { total: number; watched: number };
  specials: { total: number; watched: number };
  phases: Record<string, { total: number; watched: number; percentage: number }>;
}

export interface UserSettings {
  userName: string;
  avatarId?: string;
  profilePicUrl?: string;
}
