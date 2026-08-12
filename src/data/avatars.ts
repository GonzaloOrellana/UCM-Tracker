export interface Avatar {
  id: string;
  name: string;
  url: string;
  category: string;
}

export const AVAILABLE_AVATARS: Avatar[] = [
  // Vengadores
  { id: 'capitan-america-alt', name: 'Capitán América (Traje Alt)', url: '/avatares/captain-america.jpg', category: 'Vengadores' },
  { id: 'ironman', name: 'Iron Man', url: '/avatares/Iron-Man.jpg', category: 'Vengadores' },
  { id: 'tony-stark', name: 'Tony Stark', url: '/avatares/Tony-Stark.jpg', category: 'Vengadores' },
  { id: 'thor', name: 'Thor', url: '/avatares/Thor.jpg', category: 'Vengadores' },
  { id: 'black-widow', name: 'Black Widow', url: '/avatares/BlackWidow.jpg', category: 'Vengadores' },
  { id: 'hawkeye', name: 'Ojo de Halcón', url: '/avatares/Hawkeye.jpg', category: 'Vengadores' },
  { id: 'hulk', name: 'Hulk', url: '/avatares/Hulk.jpg', category: 'Vengadores' },
  { id: 'bruce-banner', name: 'Bruce Banner', url: '/avatares/BruceBanner.jpg', category: 'Vengadores' },
  { id: 'bruja-escarlata', name: 'Bruja Escarlata', url: '/avatares/Bruja-Escarlata.jpg', category: 'Vengadores' },
  { id: 'capitana-marvel', name: 'Capitana Marvel (Carol Danvers)', url: '/avatares/carol-danvers.jpg', category: 'Vengadores' },
  { id: 'doctor-strange', name: 'Doctor Strange', url: '/avatares/DrStrange.jpg', category: 'Vengadores' },
  { id: 'black-panther', name: 'Black Panther', url: '/avatares/BlackPanther.jpg', category: 'Vengadores' },
  { id: 'tchalla', name: "T'Challa", url: '/avatares/TChalla.jpg', category: 'Vengadores' },
  { id: 'shuri', name: 'Shuri', url: '/avatares/Shuri.jpg', category: 'Vengadores' },
  { id: 'shuri-black-panther', name: 'Shuri (Black Panther)', url: '/avatares/Yuri-blackpanter.jpg', category: 'Vengadores' },
  { id: 'jane-foster', name: 'Jane Foster (Mighty Thor)', url: '/avatares/Jane-Foster-the-Mighty-Thor.jpg', category: 'Vengadores' },
  { id: 'shang-chi', name: 'Shang-Chi', url: '/avatares/Shang-Chi.jpg', category: 'Vengadores' },
  { id: 'antman', name: 'Ant-Man', url: '/avatares/Ant-Man.jpg', category: 'Vengadores' },
  { id: 'wasp', name: 'Wasp', url: '/avatares/wasp.jpg', category: 'Vengadores' },
  { id: 'vision', name: 'Visión', url: '/avatares/Vision.jpg', category: 'Vengadores' },
  { id: 'war-machine', name: 'War Machine', url: '/avatares/war-machine-icon.jpg', category: 'Vengadores' },
  { id: 'sam-wilson', name: 'Sam Wilson', url: '/avatares/SamWilson.jpg', category: 'Vengadores' },
  { id: 'sam-wilson-cap', name: 'Sam Wilson (Capitán América)', url: '/avatares/Sam-Wilson-Capitan.jpg', category: 'Vengadores' },
  { id: 'nick-fury', name: 'Nick Fury', url: '/avatares/Nick-Fury.jpg', category: 'Vengadores' },
  { id: 'pepper-potts', name: 'Pepper Potts', url: '/avatares/Pepper-Potts.jpg', category: 'Vengadores' },

  // Thunderbolts
  { id: 'yelena-belova', name: 'Yelena Belova', url: '/avatares/yelena-belova.jpg', category: 'Thunderbolts' },
  { id: 'winter-soldier', name: 'Bucky Barnes (Soldado del Invierno)', url: '/avatares/Bucky-Barnes.jpg', category: 'Thunderbolts' },
  { id: 'john-walker', name: 'John Walker (U.S. Agent)', url: '/avatares/John-Walker.jpg', category: 'Thunderbolts' },
  { id: 'sentry', name: 'Sentry', url: '/avatares/Sentry.jpg', category: 'Thunderbolts' },
  { id: 'ghost', name: 'Ghost', url: '/avatares/Ghost.jpg', category: 'Thunderbolts' },
  { id: 'red-guardian', name: 'Red Guardian', url: '/avatares/Red-Guardian.jpg', category: 'Thunderbolts' },

  // Spider-Man (Sin máscara primero, luego con máscara)
  { id: 'tom-holland', name: 'Tom Holland', url: '/avatares/Tom-Holland.jpg', category: 'Spider-Man' },
  { id: 'spiderman-andrew', name: 'Spider-Man (Andrew Garfield)', url: encodeURI('/avatares/Spider-Man (Andrew Garfield).jpg'), category: 'Spider-Man' },
  { id: 'tobey-maguire', name: 'Tobey Maguire', url: '/avatares/Tobey.jpg', category: 'Spider-Man' },
  { id: 'peter-parker', name: 'Peter Parker', url: '/avatares/peter-parker.jpg', category: 'Spider-Man' },
  { id: 'spiderman', name: 'Spider-Man (Tom Holland)', url: '/avatares/Spidermam-Tom.jpg', category: 'Spider-Man' },
  { id: 'spiderman-tom-alt', name: 'Spider-Man (Tom Holland Alt)', url: '/avatares/Spiderman-TomHolland.jpg', category: 'Spider-Man' },
  { id: 'spiderman-andrew-alt', name: 'Spider-Man (Andrew Alt)', url: '/avatares/Spiderman-Andrew.jpg', category: 'Spider-Man' },
  { id: 'spiderman-tobey', name: 'Spider-Man (Tobey Maguire)', url: '/avatares/Spiderman-Tobey.jpg', category: 'Spider-Man' },

  // 4 Fantásticos
  { id: 'mr-fantastico', name: 'Mr. Fantástico', url: '/avatares/Mister-Fantastic.jpg', category: '4 Fantásticos' },
  { id: 'sue-storm', name: 'Sue Storm', url: '/avatares/SueStorm.jpg', category: '4 Fantásticos' },
  { id: 'la-mole', name: 'La Mole', url: '/avatares/LaMole.jpg', category: '4 Fantásticos' },
  { id: 'human-torch', name: 'Antorcha Humana', url: '/avatares/Human_Torch.jpg', category: '4 Fantásticos' },

  // X-Men
  { id: 'wolverine', name: 'Wolverine', url: encodeURI('/avatares/Wolverine (2).jpg'), category: 'X-Men' },
  { id: 'cyclope', name: 'Cíclope', url: '/avatares/Cyclope.jpg', category: 'X-Men' },
  { id: 'magneto', name: 'Magneto (Ian McKellen)', url: '/avatares/MAGNETO-IanMcKellen.jpg', category: 'X-Men' },
  { id: 'professor-x', name: 'Profesor X', url: '/avatares/PROFESSOR-X.jpg', category: 'X-Men' },
  { id: 'gambito', name: 'Gambito', url: encodeURI('/avatares/Remy LeBeau-Gambit.jpg'), category: 'X-Men' },
  { id: 'deadpool', name: 'Deadpool', url: '/avatares/deadpool.jpg', category: 'X-Men' },
  { id: 'coloso', name: 'Coloso', url: '/avatares/Coloso.jpg', category: 'X-Men' },
  { id: 'jean-grey', name: 'Jean Grey', url: '/avatares/JeanGray-ucm.png', category: 'X-Men' },

  // Guardianes de la Galaxia
  { id: 'starlord', name: 'Star-Lord', url: encodeURI('/avatares/Star Lord.jpg'), category: 'Guardianes de la Galaxia' },
  { id: 'groot', name: 'Groot', url: '/avatares/Groot.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'groot-grande', name: 'Groot (Adulto)', url: '/avatares/Groot-grande.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'groot-adolescente', name: 'Groot (Adolescente)', url: '/avatares/groot-adolecente.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'baby-groot', name: 'Baby Groot', url: '/avatares/baby-groot.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'rocket-y-groot', name: 'Rocket & Groot', url: '/avatares/Rocket-y-groot.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'drax', name: 'Drax', url: '/avatares/Drax.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'gamora', name: 'Gamora', url: '/avatares/Gamora.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'mantis', name: 'Mantis', url: '/avatares/mantis.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'nebula', name: 'Nebula', url: '/avatares/Nebula.jpg', category: 'Guardianes de la Galaxia' },
  { id: 'yondu', name: 'Yondu', url: '/avatares/Yondu.jpg', category: 'Guardianes de la Galaxia' },

  // Héroes Callejeros
  { id: 'daredevil', name: 'Daredevil', url: '/avatares/Daredevil.jpg', category: 'Héroes Callejeros' },
  { id: 'daredevil-alt', name: 'Daredevil (Alt)', url: encodeURI('/avatares/daredevil (2).jpg'), category: 'Héroes Callejeros' },
  { id: 'matt-murdock', name: 'Matt Murdock', url: encodeURI('/avatares/Matt-Murdock(2).jpg'), category: 'Héroes Callejeros' },
  { id: 'karen-page', name: 'Karen Page', url: '/avatares/karen-page.jpg', category: 'Héroes Callejeros' },
  { id: 'punisher', name: 'Punisher', url: '/avatares/ThePunisher.jpg', category: 'Héroes Callejeros' },
  { id: 'moon-knight', name: 'Moon Knight', url: '/avatares/Moon-Knight-PFP.jpg', category: 'Héroes Callejeros' },
  { id: 'moon-knight-classic', name: 'Mr. Knight', url: '/avatares/MoonNight.jpg', category: 'Héroes Callejeros' },

  // Otros Héroes
  { id: 'happy-hogan', name: 'Happy Hogan', url: '/avatares/Happy-Hogan.jpg', category: 'Otros Héroes' },
  { id: 'ms-marvel', name: 'Ms. Marvel', url: '/avatares/MsMarvel.png', category: 'Otros Héroes' },
  { id: 'kate-bishop', name: 'Kate Bishop', url: '/avatares/kate-bishop.jpg', category: 'Otros Héroes' },
  { id: 'peggy-carter', name: 'Peggy Carter', url: '/avatares/Peggy-Carter.jpg', category: 'Otros Héroes' },
  { id: 'wong', name: 'Wong', url: '/avatares/wong.jpg', category: 'Otros Héroes' },
  { id: 'mobius', name: 'Mobius', url: '/avatares/Mobius-Icon.jpg', category: 'Otros Héroes' },

  // Villanos
  { id: 'thanos', name: 'Thanos', url: '/avatares/Thanos.jpg', category: 'Villanos' },
  { id: 'doctor-doom', name: 'Doctor Doom', url: '/avatares/DrDoom.jpg', category: 'Villanos' },
  { id: 'loki', name: 'Loki', url: '/avatares/Loki.jpg', category: 'Villanos' },
  { id: 'sylvie', name: 'Sylvie', url: encodeURI('/avatares/Sylvie Icon.jpg'), category: 'Villanos' },
  { id: 'ultron', name: 'Ultrón', url: '/avatares/Ultron.jpg', category: 'Villanos' },
  { id: 'taskmaster', name: 'Taskmaster', url: encodeURI('/avatares/Taskmaster icon.jpg'), category: 'Villanos' },
  { id: 'bullseye', name: 'Bullseye', url: '/avatares/Bullseye.jpg', category: 'Villanos' },
  { id: 'namor', name: 'Namor', url: '/avatares/Namor.jpg', category: 'Villanos' },
];

export function getAvatarById(id?: string): Avatar | undefined {
  if (!id) return undefined;
  return AVAILABLE_AVATARS.find((a) => a.id === id);
}

export function getAvatarUrl(id?: string, fallbackUrl?: string): string {
  const avatar = getAvatarById(id);
  if (avatar) return avatar.url;

  if (fallbackUrl && fallbackUrl.startsWith('/avatares/')) {
    const normalizedFallback = decodeURI(fallbackUrl).toLowerCase();
    const matchedByUrl = AVAILABLE_AVATARS.find(
      (a) => decodeURI(a.url).toLowerCase() === normalizedFallback
    );
    if (matchedByUrl) return matchedByUrl.url;
  }

  return fallbackUrl || AVAILABLE_AVATARS[0].url;
}
