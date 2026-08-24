import React from 'react';
import { useMCU } from '../context/MCUContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useMCU();

  return (
    <footer className="w-full mt-12 py-6 border-t border-white/10 text-[11px] text-zinc-400 font-sans flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
        <p className="text-zinc-400">
          Marvel Tracker © 2026
        </p>
        <span className="hidden sm:inline text-zinc-600">•</span>
        <p className="text-zinc-400">
          Desarrollado por{' '}
          <a
            href="https://www.gonzaorellana.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5b92f7] font-semibold hover:text-[#93c5fd] transition-colors"
          >
            Gonzalo Orellana
          </a>
        </p>
      </div>

      <div className="flex items-center gap-3 text-zinc-300">
        <button
          onClick={() => {
            setCurrentView('privacy');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-white transition-colors cursor-pointer underline"
        >
          Política de Privacidad
        </button>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => {
            setCurrentView('terms');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-white transition-colors cursor-pointer underline"
        >
          Términos de Uso
        </button>
      </div>
    </footer>
  );
};
