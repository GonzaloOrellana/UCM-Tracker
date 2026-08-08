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
  const { settings, user } = useMCU();

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
          className="flex items-center"
        >
          <img
            src="/Logo-marvel-tracker.png"
            alt="Marvel Tracker"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </motion.div>

        {/* Right Group: Desktop & Mobile Navigation Links & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
          {/* Mobile Glassmorphic Navigation Bar Capsule (Icon-Only Navigation for App Feel) */}
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.4, 1] }}
            className="flex md:hidden h-10 items-center gap-0.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-1 shadow-lg relative"
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
                  className="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 select-none z-10"
                  title={item.label}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
                      />
                    )}
                  </AnimatePresence>
                  <IconComponent className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-zinc-950' : 'text-zinc-300 hover:text-white'}`} />
                </button>
              );
            })}
          </motion.nav>

          {/* Desktop Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.25, 1, 0.4, 1] }}
            className="hidden md:flex h-11 items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-1.5 shadow-lg relative"
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
                  className="relative h-8 px-4 rounded-full text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 transition-colors duration-200 select-none z-10"
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
                      />
                    )}
                  </AnimatePresence>
                  <span className={`transition-colors duration-200 ${isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-300 font-medium hover:text-white'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 relative">
            
            {/* User Profile Avatar Button */}
            <button
              onClick={onOpenSettingsModal}
              className={`flex w-10 h-10 rounded-full backdrop-blur-xl transition-all hover:scale-105 cursor-pointer items-center justify-center shrink-0 relative overflow-hidden group shadow-lg ${
                currentView === 'profile'
                  ? 'bg-white text-zinc-950 scale-105'
                  : 'bg-white/10 hover:bg-white/20'
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

      </div>
    </motion.header>
  );
};

