import React from 'react';
import { motion } from 'framer-motion';

export const DoomsdayClimaxTab: React.FC = () => {
  return (
    <motion.div
      key="tab-doomsday-secret-wars"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start"
    >
      {/* Fotos Izquierda */}
      <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-5 self-start justify-center items-start">
        <img
          src="https://www.cinemascomics.com/wp-content/uploads/2024/09/Secret-Wars_4_dr-doom.jpg"
          alt="Doctor Doom - Secret Wars"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_640198-MLA100013270382_122025-F.jpg"
          alt="Doctor Doom vs Mister Fantástico - Secret Wars"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
      </div>

      {/* Texto Explicativo Central */}
      <div className="lg:col-span-6 flex flex-col justify-start">
        <div className="text-center mb-5">
          <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase">
            El evento que puede redefinir el multiverso de Marvel
          </h3>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-sans">
          <p>
            Para entender la conexión entre Avengers: Doomsday y Avengers: Secret Wars hay que entender primero el concepto de Multiverso. Marvel plantea la existencia de múltiples realidades que pueden coexistir, pero que también pueden entrar en conflicto entre sí. Una de las amenazas más importantes de este sistema son las incursiones: situaciones en las que dos universos comienzan a colisionar y, si el proceso llega a completarse, ambas realidades pueden ser destruidas. Esta idea es fundamental en Secret Wars (2015), el evento de los cómics escrito por Jonathan Hickman que sirve como una de las principales inspiraciones para lo que Marvel está construyendo en el cine.
          </p>
          <p>
            En aquella historia, el Multiverso comienza a morir debido a una serie de incursiones que provocan la destrucción progresiva de diferentes universos. Detrás de esta crisis están los Beyonders, entidades de un poder extraordinario. Mientras las distintas realidades desaparecen, Doctor Doom consigue intervenir en el conflicto y obtiene un poder suficiente para reconstruir la realidad. Sin embargo, Doom no simplemente restaura el universo tal como era: utiliza fragmentos de las realidades destruidas para crear una nueva existencia llamada Battleworld, convirtiéndose en su gobernante absoluto, conocido como God Emperor Doom.
          </p>
          <p>
            Esta historia es especialmente importante porque explica por qué Doctor Doom puede ser mucho más que un villano tradicional. Victor von Doom es un científico, hechicero, gobernante y uno de los mayores rivales de Reed Richards. Doom cree que su inteligencia y voluntad están por encima de las de cualquier otra persona y, en determinadas circunstancias, puede llegar a convencerse de que sus acciones son necesarias para salvar a la humanidad. Su problema es que, cuando intenta salvar la realidad, también quiere decidir quién puede vivir dentro de ella y bajo qué reglas.
          </p>
          <p>
            El concepto de Doom como alguien que destruye y reconstruye la realidad encaja directamente con la dirección que parece estar tomando el MCU. Avengers: Doomsday, cuyo estreno está previsto para el 18 de diciembre de 2026, reúne a personajes de diferentes partes del universo Marvel, incluyendo a los Avengers, Fantastic Four y personajes de las antiguas películas de X-Men. Esta combinación es especialmente significativa porque muchos de estos personajes originalmente pertenecían a continuidades diferentes. La película parece utilizar precisamente esa diversidad de universos y generaciones para llevar la historia hacia una crisis de escala multiversal.
          </p>
          <p>
            Los Fantastic Four tienen una importancia especial debido a la relación entre Reed Richards y Doctor Doom. En los cómics, Reed es uno de los pocos personajes capaces de enfrentarse intelectualmente a Doom y comprender las consecuencias de sus decisiones. Por otro lado, la presencia de los antiguos X-Men demuestra hasta qué punto el MCU puede comenzar a mezclar personajes provenientes de diferentes continuidades. Los Avengers representan el núcleo del universo que conocemos, mientras que Fantastic Four y X-Men amplían el conflicto hacia una escala mucho mayor.
          </p>
          <p>
            La trama exacta de Doomsday todavía no está completamente revelada, por lo que no puede afirmarse que la película vaya a terminar exactamente como Secret Wars (2015). Sin embargo, una posible interpretación es que las incursiones se vuelvan incontrolables, las diferentes realidades comiencen a desaparecer y Doctor Doom encuentre una manera de intervenir en el colapso. Si consigue reconstruir la existencia utilizando fragmentos de distintos universos, podría aparecer una versión cinematográfica de Battleworld y Doom podría convertirse en el gobernante de esa nueva realidad.
          </p>
          <p>
            En ese escenario, Avengers: Doomsday funcionaría como el momento en el que el Multiverso llega a su límite, mientras que Avengers: Secret Wars, prevista para el 17 de diciembre de 2027, sería la historia que determine qué sucede después. Los héroes tendrían que enfrentarse a Doom y decidir qué realidad merece sobrevivir cuando todo lo que conocían ha desaparecido. Por eso Secret Wars podría ser mucho más que una simple batalla entre superhéroes: podría tratarse de una historia sobre poder, identidad, sacrificio y la reconstrucción de la realidad.
          </p>
          <p>
            Uno de los mayores rumores alrededor del evento es que Marvel podría utilizar Secret Wars para realizar un llamado &quot;soft reboot&quot; del MCU. Esto no necesariamente significaría borrar todo lo ocurrido, sino utilizar la destrucción y reconstrucción del Multiverso para reorganizar las diferentes continuidades y crear una nueva realidad en la que personajes como Avengers, X-Men, Fantastic Four y Spider-Man puedan coexistir de una manera más sencilla. El cómic de 2015 ofrece un precedente para esta idea, aunque Marvel no ha confirmado que vaya a hacer exactamente lo mismo en el cine.
          </p>
          <p>
            También existen numerosas teorías sobre qué personajes podrían regresar, qué universos podrían aparecer y si veremos una versión cinematográfica de God Emperor Doom o Battleworld. Sin embargo, estas posibilidades deben diferenciarse de la información oficial. La presencia de personajes de distintas generaciones de X-Men, Fantastic Four y Avengers en Doomsday está confirmada, pero no lo están muchos de los detalles sobre Secret Wars. Por eso, cualquier explicación del evento debería separar claramente lo confirmado por Marvel de lo inspirado en los cómics y de las teorías y rumores.
          </p>
          <p>
            En términos simples, la historia puede entenderse de esta manera: el Multiverso está formado por muchas realidades; esas realidades comienzan a chocar mediante incursiones; la crisis amenaza con destruirlo todo; Doctor Doom intenta controlar el resultado; Avengers: Doomsday podría mostrar el punto máximo de esa crisis; y Avengers: Secret Wars podría contar la lucha por decidir qué queda después del colapso. Si Marvel sigue parcialmente el camino de los cómics, el resultado podría ser una nueva realidad capaz de redefinir el futuro del MCU.
          </p>
          <p className="text-emerald-300 font-medium pt-2 border-l-2 border-emerald-500/60 pl-4 py-1 leading-relaxed">
            En una sola frase, la idea central sería: Doomsday podría ser la historia en la que el Multiverso llega al límite, mientras que Secret Wars podría ser la historia en la que Marvel decide qué universo nace después de su destrucción.
          </p>
        </div>
      </div>

      {/* Fotos Derecha */}
      <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-5 self-start justify-center items-start">
        <img
          src="https://www.carnivorecomics.com/cdn/shop/files/IMG_1999.jpg?v=1699460585&width=823"
          alt="Avengers Secret Wars - Battleworld"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/1200x/da/64/0a/da640ad25e6cace3889e26960fd55762.jpg"
          alt="Portada cómic Avengers Secret Wars"
          className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};
