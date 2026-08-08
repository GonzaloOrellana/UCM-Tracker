import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={scrollToTop}
          title="Volver arriba"
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1e2238]/85 hover:bg-[#C81D25] text-white border border-white/20 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-200 group active:scale-95 flex items-center justify-center"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
