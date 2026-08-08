export interface Avatar {
  id: string;
  name: string;
  url: string;
  category: string;
}

export const AVAILABLE_AVATARS: Avatar[] = [
  // Vengadores
  { id: 'capitan-america', name: 'Capitán América', url: '/avatares/CapitanAmerica.jpg', category: 'Vengadores' },
  { id: 'ironman', name: 'Iron Man', url: '/avatares/ironMan.jpg', category: 'Vengadores' },
  { id: 'thor', name: 'Thor', url: '/avatares/thor.jpg', category: 'Vengadores' },
  { id: 'black-widow', name: 'Black Widow', url: '/avatares/BlackWidow.jpg', category: 'Vengadores' },
  { id: 'hawkeye', name: 'Ojo de Halcón', url: '/avatares/ojoDeAlcon.jpg', category: 'Vengadores' },
  { id: 'hulk', name: 'Hulk', url: '/avatares/Hulk.jpg', category: 'Vengadores' },
  { id: 'bruja-escarlata', name: 'Bruja Escarlata', url: '/avatares/Bruja%20escarlata.jpg', category: 'Vengadores' },
  { id: 'winter-soldier', name: 'Soldado del Invierno', url: '/avatares/Winter-Soldier.jpg', category: 'Vengadores' },
  { id: 'capitana-marvel', name: 'Capitana Marvel', url: '/avatares/Capitana-Marvel.jpg', category: 'Vengadores' },
  { id: 'doctor-strange', name: 'Doctor Strange', url: '/avatares/doctor-strange.jpg', category: 'Vengadores' },
  { id: 'black-panther', name: 'Black Panther', url: '/avatares/BlackPanter.jpg', category: 'Vengadores' },

  // Spider-Man
  { id: 'spiderman', name: 'Spider-Man', url: '/avatares/Spiderman.jpg', category: 'Spider-Man' },
  { id: 'peter-parker', name: 'Peter Parker', url: '/avatares/peter%20parker.jpg', category: 'Spider-Man' },
  { id: 'spiderman-black', name: 'Spider-Man (Black Suit)', url: '/avatares/Spiderman-Black.jpg', category: 'Spider-Man' },
  { id: 'spiderman-black-2', name: 'Spider-Man (Symbiote)', url: '/avatares/Spiderman-Black2.jpg', category: 'Spider-Man' },
  { id: 'spidey-icon', name: 'Spidey Icon', url: '/avatares/SpideyIcon.jpg', category: 'Spider-Man' },
  { id: 'spidey-icon-alt', name: 'Spidey Logo', url: '/avatares/SpideyIcon(1).jpg', category: 'Spider-Man' },
  { id: 'spiderman-goat', name: 'Spider-Man (The GOAT)', url: '/avatares/The%20goat.jpg', category: 'Spider-Man' },
  { id: 'spiderman-torn', name: 'Spider-Man (Torn)', url: '/avatares/Spiderman-Torn.jpg', category: 'Spider-Man' },

  // 4 Fantásticos
  { id: 'mr-fantastico', name: 'Mr. Fantástico', url: '/avatares/Mr-fanstastico.jpg', category: '4 Fantásticos' },
  { id: 'sue-storm', name: 'Sue Storm', url: '/avatares/sue-storm.jpg', category: '4 Fantásticos' },
  { id: 'la-mole', name: 'La Mole', url: '/avatares/laMole.jpg', category: '4 Fantásticos' },
  { id: 'human-torch', name: 'Antorcha Humana', url: '/avatares/Human-Torch-Johnny.jpg', category: '4 Fantásticos' },

  // X-Men
  { id: 'wolverine', name: 'Wolverine', url: '/avatares/Wolverine.jpg', category: 'X-Men' },
  { id: 'cyclope', name: 'Cíclope', url: '/avatares/Cyclope.jpg', category: 'X-Men' },
  { id: 'magneto', name: 'Magneto', url: '/avatares/Magneto.jpg', category: 'X-Men' },
  { id: 'professor-x', name: 'Profesor X', url: '/avatares/Professor-X.jpg', category: 'X-Men' },
  { id: 'rogue', name: 'Rogue', url: '/avatares/Rogue.jpg', category: 'X-Men' },
  { id: 'gambito', name: 'Gambito', url: '/avatares/Gambito.jpg', category: 'X-Men' },
  { id: 'nightcrawler', name: 'Nightcrawler', url: '/avatares/Nightcrawler.jpg', category: 'X-Men' },
  { id: 'cable', name: 'Cable', url: '/avatares/Cable.jpg', category: 'X-Men' },
  { id: 'deadpool', name: 'Deadpool', url: '/avatares/deadpool.jpg', category: 'X-Men' },

  // Guardianes de la Galaxia
  { id: 'starlord', name: 'Star-Lord', url: '/avatares/StarLord.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'groot', name: 'Groot', url: '/avatares/Groot.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'rocket-raccoon', name: 'Rocket Raccoon', url: '/avatares/Rocket-Racoon.jpg', category: 'Guardianes de la Galaxia' },

  // Otros Héroes
  { id: 'daredevil', name: 'Daredevil', url: '/avatares/Daredevil.jpg', category: 'Otros Héroes' },
  { id: 'punisher', name: 'Punisher', url: '/avatares/Punisher.jpg', category: 'Otros Héroes' },
  { id: 'moon-knight', name: 'Moon Knight', url: '/avatares/MOON-KNIGHT.jpg', category: 'Otros Héroes' },
  { id: 'moon-knight-classic', name: 'Moon Knight (Clásico)', url: '/avatares/MoonNight.jpg', category: 'Otros Héroes' },
  { id: 'she-hulk', name: 'She-Hulk', url: '/avatares/she-hulk.jpg', category: 'Otros Héroes' },
  { id: 'jane-foster', name: 'Jane Foster', url: '/avatares/Jane-Foster.jpg', category: 'Otros Héroes' },

  // Villanos
  { id: 'thanos', name: 'Thanos', url: '/avatares/Thanos.jpg', category: 'Villanos' },
  { id: 'doctor-doom', name: 'Doctor Doom', url: '/avatares/DrDoom.jpg', category: 'Villanos' },
  { id: 'loki', name: 'Loki', url: '/avatares/Loki.jpg', category: 'Villanos' },
];

export function getAvatarById(id?: string): Avatar | undefined {
  if (!id) return undefined;
  return AVAILABLE_AVATARS.find((a) => a.id === id);
}

export function getAvatarUrl(id?: string, fallbackUrl?: string): string {
  const avatar = getAvatarById(id);
  if (avatar) return avatar.url;
  return fallbackUrl || AVAILABLE_AVATARS[0].url;
}
