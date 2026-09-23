import React from 'react';
import { motion } from 'framer-motion';
import { LiteYouTubeEmbed } from '../common/LiteYouTubeEmbed';

export const DoomsdayComicsTab: React.FC = () => {
  return (
    <motion.div
      key="tab-comics"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start"
    >
      {/* Columna Izquierda: Par de imágenes 1 y 2 (En móvil: grid 2 columnas arriba con order-1; en desktop: columna vertical izquierda) */}
      <div className="order-1 lg:order-none lg:col-span-3 grid grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4 lg:gap-5 self-start justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsodUOhTbuVHNpAZSmCEKYeyfw_ZQwLH7mcjTH0ZvGr4n1wlNm9hMXWOo&s=10"
          alt="Doctor Doom - Cómics"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYcKfNhjDSbwgM3sVRVjf8OhBrHiAdA5ihxa_lYaqpX7egL1xLMP1Q3E&s=10"
          alt="Avengers Doomsday"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
      </div>

      {/* Texto Explicativo Central + Video (En móvil: order-2; en desktop: columna central) */}
      <div className="order-2 lg:order-none lg:col-span-6 flex flex-col justify-start">
        <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-sans">
          <p>
            Victor von Doom nació en Latveria, un pequeño país ficticio de Europa del Este, dentro de una familia romaní. Desde muy joven estuvo marcado por la tragedia: su madre, Cynthia von Doom, era una poderosa hechicera que murió al intentar obtener poderes sobrenaturales, mientras que su padre, Werner, era un médico que falleció después de intentar salvar a la esposa de un gobernante de Latveria.
          </p>
          <p>
            Victor desarrolló una enorme inteligencia y una obsesión por superar los límites de la ciencia. Gracias a su talento, consiguió una beca para estudiar en Estados Unidos, donde conoció a Reed Richards, quien posteriormente se convertiría en Mr. Fantastic. Ambos eran brillantes científicos, pero también extremadamente competitivos.
          </p>
          <p>
            Mientras estudiaba, Victor construyó una máquina destinada a contactar con el mundo de los muertos para intentar recuperar el alma de su madre. Reed Richards descubrió que los cálculos de Victor contenían un error y trató de advertirle, pero Victor ignoró la advertencia. El experimento salió mal y una explosión desfiguró su rostro.
          </p>
          <p>
            Victor culpó a Reed por el accidente y abandonó Estados Unidos. Viajó por el mundo hasta terminar en el Himalaya, donde fue acogido por monjes que lo ayudaron a desarrollar sus conocimientos científicos y místicos. Allí construyó una armadura y una máscara de metal que se convertirían en su identidad característica: Doctor Doom.
          </p>
          <p>
            Después de regresar a Latveria, Victor derrocó a su gobernante y tomó el control del país, convirtiéndose en su soberano. Desde entonces, gobierna Latveria con una combinación de tecnología avanzada, ciencia y magia.
          </p>
          <p>
            Doctor Doom se convirtió así en uno de los grandes enemigos de los Fantastic Four, especialmente de Reed Richards. Sin embargo, su ambición va mucho más allá de derrotar a los Cuatro Fantásticos: Doom está convencido de que es la única persona capaz de llevar al mundo hacia un futuro mejor. Su problema es que considera que para conseguirlo debe tener un control absoluto.
          </p>
          <p>
            A diferencia de muchos villanos, Doom no se considera malvado. Se ve a sí mismo como un genio incomprendido y como el único hombre capaz de salvar a la humanidad. Su orgullo, su necesidad de demostrar su superioridad sobre Reed Richards y su obsesión con el poder terminan convirtiéndose en sus mayores debilidades.
          </p>
          <p className="text-emerald-300/90 font-medium pt-1">
            Doctor Doom fue creado por Stan Lee y Jack Kirby y apareció por primera vez en The Fantastic Four #5, publicado en 1962. Desde entonces, se convirtió en uno de los villanos más importantes y complejos del universo Marvel.
          </p>
        </div>

        {/* Video de YouTube: Historia de Doctor Doom con carga ligera Facade */}
        <div className="mt-5 sm:mt-6 w-full">
          <LiteYouTubeEmbed
            videoId="I_-qgFqUvlo"
            title="Doctor Doom | La historia completa en 80 minutos"
          />
        </div>
      </div>

      {/* Columna Derecha: Par de imágenes 3 y 4 (En móvil: grid 2 columnas abajo con order-3; en desktop: columna vertical derecha) */}
      <div className="order-3 lg:order-none lg:col-span-3 grid grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4 lg:gap-5 self-start justify-center">
        <img
          src="https://i.pinimg.com/736x/27/2d/28/272d28337e6aa0cd45ed83572245cb5d.jpg"
          alt="Doctor Doom - Segunda ilustración cómic"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/75/f2/c2/75f2c28c0510fc26f5dd7013da065c5b.jpg"
          alt="Doctor Doom - Portada cómic"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};
