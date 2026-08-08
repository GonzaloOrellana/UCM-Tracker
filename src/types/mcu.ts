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

export interface MCUItem {
  id: string;
  titulo: string;
  tituloOriginal?: string;
  tipo: MediaType;
  anioLanzamiento: number;
  fechaLanzamiento: string; // ISO YYYY-MM-DD
  ordenEstreno: number;
  ordenCronologico: number;
  fase: MCUPhase;
  urlPoster: string;
  resumen: string;
  duracion?: string;
  tmdbId?: number;
  isCustom?: boolean;
  personajePrincipal?: string;
  colorAcento?: string;
  fechaEsExacta?: boolean;
}

export type OrderMode = 'release' | 'chronological';

export type NavView = 'dashboard' | 'movies' | 'series' | 'specials' | 'upcoming' | 'profile' | 'privacy' | 'terms';

export interface FilterState {
  status: 'all' | 'watched' | 'unwatched';
  type: 'all' | MediaType;
  phase: 'all' | MCUPhase;
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

export interface UpcomingRelease {
  id: string;
  titulo: string;
  fechaLanzamiento: string;
  urlPoster: string;
  tipo: MediaType;
  fase: MCUPhase;
  resumen: string;
}

export interface UserSettings {
  userName: string;
  avatarId?: string;
  profilePicUrl?: string;
}
