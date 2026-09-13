export interface PrepMilestone {
  id: string;
  productionId: string;
  additionalProductionId?: string;
  title: string;
  year: string;
  whyItMatters: string;
  posterUrl?: string;
  isUpcoming?: boolean;
}

export interface QuickRecapItem {
  id: string;
  productionId: string;
  title: string;
  year: string;
  keyTakeaway: string;
  posterUrl?: string;
}

// Curation: Imprescindibles ordenadas para estar preparado para Avengers: Doomsday
export const PREP_MILESTONES: PrepMilestone[] = [
  {
    id: 'prep-x-men-1-2',
    productionId: 'x-men-2000',
    additionalProductionId: 'x-men-2-2003',
    title: 'X-Men 1 y 2',
    year: '2000 — 2003',
    whyItMatters:
      'Recomendadas por la importancia de la pérdida de personajes y la dinámica entre el Profesor X y Magneto.',
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNzNjZjQwOTAtNWQ3NC00MmJlLThlZDEtZmUyMWQ3NmE4Y2Y5XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 'prep-avengers-endgame',
    productionId: 'avengers-endgame-23',
    title: 'Vengadores: Endgame',
    year: '2019',
    whyItMatters:
      'Fundamental para entender las consecuencias narrativas tras la partida de Tony Stark y Steve Rogers.',
  },
  {
    id: 'prep-spider-man-no-way-home',
    productionId: 'spider-man-no-way-home-33',
    title: 'Spider-Man: Sin camino a casa',
    year: '2021',
    whyItMatters:
      'Se produce la primera gran colisión de universos dentro del UCM, dejando posibles consecuencias para Doomsday.',
  },
  {
    id: 'prep-wakanda-forever',
    productionId: 'black-panther-wakanda-forever-38',
    title: 'Black Panther: Wakanda Forever',
    year: '2022',
    whyItMatters:
      'Establece el estado actual de Wakanda y su tensa relación con Namor.',
  },
  {
    id: 'prep-doctor-strange-mom',
    productionId: 'doctor-strange-2-34',
    title: 'Doctor Strange en el multiverso de la locura',
    year: '2022',
    whyItMatters:
      'Vital para comprender cómo funcionan las incursiones en el multiverso y el destino de Clea.',
  },
  {
    id: 'prep-fantastic-four',
    productionId: 'fantastic-four-first-steps-2025',
    title: 'Los 4 Fantásticos: Primeros Pasos',
    year: '2025',
    whyItMatters:
      'Útil para refrescar la historia, los poderes y la dinámica de los personajes, además de la aparición de Doctor Doom. Además la escena post-créditos conecta directamente con la película.',
  },
  {
    id: 'prep-loki-s2',
    productionId: 'loki-s2',
    title: 'Loki (Temporada 2)',
    year: '2023',
    whyItMatters:
      'Muy recomendable ver especialmente el final, dado que tendrá una conexión directa con los eventos de Doomsday.',
  },
  {
    id: 'prep-deadpool-wolverine',
    productionId: 'deadpool-wolverine-42',
    title: 'Deadpool & Wolverine',
    year: '2024',
    whyItMatters:
      'Se rumorea que la película iniciaría con estos personajes luchando contra el Spider-Man de Tobey Maguire en el mundo de este Spider-Man.',
  },
  {
    id: 'prep-thunderbolts',
    productionId: 'thunderbolts-44',
    title: 'Thunderbolts*',
    year: '2025',
    whyItMatters:
      'Esencial para conocer a este grupo, que se perfila como los nuevos Vengadores, y entender el rol relevante de Yelena. Ademas la escena post-creditos conecta directamente con la pelicula. Aclaracion importante: esta pelicula se recomienda ver despues haber visto Black Widow, Ant-man 2, Falcon y el soldado del invierno y Hawkeye.',
  },
];

// Curation: Resumen de lo que no necesitas volver a ver (Recap Clave)
export const QUICK_RECAP_ITEMS: QuickRecapItem[] = [
  {
    id: 'recap-shang-chi',
    productionId: 'shang-chi-and-the-legend-of-the-ten-rings-30',
    title: 'Shang-Chi y la leyenda de los Diez Anillos',
    year: '2021',
    keyTakeaway:
      'Basta con conocer quién es el personaje y el poder de los Diez Anillos, ya que aparece en el tráiler de Avengers: Doomsday.',
  },
  {
    id: 'recap-thor-love-thunder',
    productionId: 'thor-love-and-thunder-35',
    title: 'Thor: Love and Thunder',
    year: '2022',
    keyTakeaway:
      'Solo necesitas saber que Thor adoptó a Love, una niña con poderes vinculados a la Eternidad.',
  },
  {
    id: 'recap-the-marvels',
    productionId: 'the-marvels-41',
    title: 'The Marvels',
    year: '2023',
    keyTakeaway:
      'Su final y escena post-créditos conectan con el multiverso y los X-Men: Monica Rambeau despierta en un universo paralelo tras cerrar la brecha espacial, encontrándose con Binary (variante de su madre, Maria Rambeau) y el mutante Bestia.',
  },
  {
    id: 'recap-agatha-all-along',
    productionId: 'agatha-all-along-2024',
    title: 'Agatha All Along',
    year: '2024',
    keyTakeaway:
      'Solo es relevante saber que Billy es la reencarnación del hijo de Wanda Maximoff.',
  },
  {
    id: 'recap-captain-america-4',
    productionId: 'captain-america-brave-new-world-43',
    title: 'Capitán América: Brave New World',
    year: '2025',
    keyTakeaway:
      'Basta saber que Sam Wilson es el nuevo Capitán América.',
  },
];
