import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

export const CookieConsentBanner: React.FC = () => {
  const { cookieConsent, acceptCookies, rejectCookies, setCurrentView } = useMCU();

  return (
    <AnimatePresence>
      {cookieConsent === null && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 w-full z-50 bg-[#141625]/95 backdrop-blur-2xl border-t border-white/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] text-white pointer-events-auto"
        >
          <div className="max-w-[1580px] mx-auto px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left side: Icon + Text */}
            <div className="flex items-center gap-3 text-left w-full md:w-auto">
              <div className="p-2 rounded-xl bg-[#C81D25]/20 border border-[#C81D25]/40 text-[#C81D25] shrink-0 hidden sm:flex">
                <Cookie className="w-5 h-5 text-red-400" />
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                  <span>Uso de Cookies y Almacenamiento</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-300 leading-normal font-normal max-w-3xl">
                  Utilizamos cookies esenciales para gestionar tu sesión y almacenar tu progreso. También utilizaremos cookies de análisis para entender cómo usás la app y seguir mejorándola.{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('privacy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-white underline font-medium hover:text-red-300 transition-colors cursor-pointer inline-block ml-1"
                  >
                    Leer la Política de Privacidad completa
                  </button>
                </p>
              </div>
            </div>

            {/* Right side: Action buttons */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
              <button
                type="button"
                onClick={rejectCookies}
                className="flex-1 md:flex-none py-2 px-4 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 text-zinc-200 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4 text-zinc-400" />
                <span>Rechazar</span>
              </button>

              <button
                type="button"
                onClick={acceptCookies}
                className="flex-1 md:flex-none py-2 px-5 bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Aceptar</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
