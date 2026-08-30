import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavView } from '../types/mcu';
import { useMCU } from '../context/MCUContext';
import { Sparkles, Home, Film, Tv, Calendar } from 'lucide-react';

interface TopbarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  onOpenSettingsModal: () => void;
  onExitGuestMode?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentView,
  onSelectView,
  onOpenSettingsModal,
}) => {
  const { settings } = useMCU();

  const navItems = [
    { id: 'dashboard' as NavView, label: 'Dashboard', icon: Home },
    { id: 'movies' as NavView, label: 'Películas', icon: Film },
    { id: 'series' as NavView, label: 'Series', icon: Tv },
    { id: 'specials' as NavView, label: 'Especiales', icon: Sparkles },
    { id: 'upcoming' as NavView, label: 'Próximos Estrenos', icon: Calendar },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 1.3,
        ease: [0.25, 1, 0.4, 1],
      }}
      className="relative mb-6 sm:mb-8 pointer-events-auto"
    >
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 1, 0.4, 1] }}
          className="flex items-center shrink-0 cursor-pointer"
          onClick={() => onSelectView('dashboard')}
        >
          <img
            src="/logo-marveltracker-blanco.png"
            alt="Marvel Tracker"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform hover:scale-105"
          />
        </motion.div>

        {/* Center: Desktop Navigation Links Capsule (Matching Image Mockup) */}
        <motion.nav
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.25, 1, 0.4, 1] }}
          className="hidden md:flex h-11 items-center gap-1 tactile-bento-card rounded-full px-2 shadow-2xl relative"
        >
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative h-8 px-4 rounded-full text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-200 select-none z-10 active:scale-95"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute inset-0 bg-white/20 border-t border-white/40 border-b border-black/30 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] -z-10"
                    />
                  )}
                </AnimatePresence>
                <span className={`font-display text-sm tracking-wide transition-colors duration-200 ${isActive ? 'text-white font-bold drop-shadow-xs' : 'text-zinc-400 font-medium hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.nav>

        {/* Right Group: Mobile Nav & User Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Navigation Capsule */}
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.4, 1] }}
            className="flex md:hidden h-10 items-center gap-0.5 tactile-bento-card rounded-full px-1 shadow-lg relative"
          >
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 select-none z-10 active:scale-95"
                  title={item.label}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute inset-0 bg-white/20 border-t border-white/40 rounded-full shadow-md -z-10"
                      />
                    )}
                  </AnimatePresence>
                  <IconComponent className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`} />
                </button>
              );
            })}
          </motion.nav>

          {/* User Profile Avatar Button with Beveled Metallic Ring */}
          <button
            onClick={onOpenSettingsModal}
            className={`flex w-10 h-10 rounded-full backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer items-center justify-center shrink-0 relative overflow-hidden group shadow-lg border border-white/20 ${
              currentView === 'profile'
                ? 'bg-white text-zinc-950 scale-105 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                : 'bg-white/10 hover:bg-white/20 border-t-white/40'
            }`}
            title="Mi Perfil y Cuenta"
          >
            {settings.profilePicUrl ? (
              <img src={settings.profilePicUrl} alt={settings.userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-white">
                {settings.userName.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

        </div>

      </div>
    </motion.header>
  );
};
