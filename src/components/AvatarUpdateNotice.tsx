import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

const STORAGE_KEY = 'marvel_tracker_avatar_update_seen';

export const AvatarUpdateNotice: React.FC = () => {
  const { cookieConsent } = useMCU();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Solo mostrar si NO fue visto antes y si ya se resolvió la decisión de cookies (cookieConsent !== null)
    if (!hasSeenNotice && cookieConsent !== null) {
      setIsVisible(true);
    }
  }, [cookieConsent]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-40 bg-[#141625]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-white p-4 sm:p-5 pointer-events-auto"
        >
          <div className="flex items-start gap-3.5">
            {/* Header Icon */}
            <div className="p-2.5 rounded-xl bg-[#C81D25]/20 border border-[#C81D25]/40 text-[#C81D25] shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-red-400" />
            </div>

            {/* Content */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                  <span>¡Actualizamos los avatares!</span>
                  <ImageIcon className="w-4 h-4 text-zinc-400" />
                </h3>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                Ahora podés elegir a tus personajes favoritos tal como los viste en pantalla. Si tenías un avatar seleccionado, puede que haya cambiado de estilo — entrá a tu perfil para elegir uno nuevo si querés.
              </p>

              {/* Action Button */}
              <div className="pt-1.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="py-2 px-4 bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Entendido</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
