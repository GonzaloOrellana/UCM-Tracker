import React, { useState, useEffect } from 'react';
import { MCUProvider, useMCU } from './context/MCUContext';
import { Topbar } from './components/Topbar';
import { LoginView } from './views/LoginView';
import { ResetPasswordView } from './views/ResetPasswordView';
import { DashboardView } from './views/DashboardView';
import { LibraryView } from './views/LibraryView';
import { UpcomingView } from './views/UpcomingView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { TermsOfServiceView } from './views/TermsOfServiceView';
import { ProfileView } from './views/ProfileView';
import { DoomsdayRoadmapView } from './views/DoomsdayRoadmapView';
import { DetailModal } from './components/DetailModal';
import { EditItemModal } from './components/EditItemModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AvatarUpdateNotice } from './components/AvatarUpdateNotice';
import { Footer } from './components/Footer';
import { MCUItem } from './types/mcu';
import { getSupabaseClient } from './lib/supabase';

const TrackerMainApp: React.FC = () => {
  const { currentView, setCurrentView, activeDetailItem, closeDetailModal, user, authLoading } = useMCU();

  const [isGuestMode, setIsGuestMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mcu_guest_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [editingItem, setEditingItem] = useState<MCUItem | null>(null);
  const [resetPasswordState, setResetPasswordState] = useState<'request' | 'update' | null>(null);

  const handleEnterGuest = () => {
    try {
      localStorage.setItem('mcu_guest_mode', 'true');
    } catch {
      // Ignorar error
    }
    setIsGuestMode(true);
  };

  const handleExitGuest = () => {
    try {
      localStorage.removeItem('mcu_guest_mode');
    } catch {
      // Ignorar error
    }
    setIsGuestMode(false);
  };

  // Detect Password Recovery Event from Supabase Link
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setResetPasswordState('update');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Limpiar modo invitado si el usuario inicia sesión formalmente
  useEffect(() => {
    if (user) {
      try {
        localStorage.removeItem('mcu_guest_mode');
      } catch {
        // Ignorar
      }
      setIsGuestMode(false);
    }
  }, [user]);

  // Si está en flujo de restablecimiento de contraseña
  if (resetPasswordState) {
    return (
      <ResetPasswordView
        mode={resetPasswordState}
        onBackToLogin={() => setResetPasswordState(null)}
        onPasswordUpdated={() => {
          setResetPasswordState(null);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // Si está resolviendo la sesión de Supabase inicialmente
  if (authLoading && !isGuestMode && currentView !== 'privacy' && currentView !== 'terms') {
    return (
      <div className="min-h-screen bg-[#0C0D17] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C81D25] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Si el usuario no ha iniciado sesión y no ha elegido entrar como invitado -> Página de Login (salvo que navegue a una vista legal pública)
  if (!user && !isGuestMode && currentView !== 'privacy' && currentView !== 'terms') {
    return (
      <>
        <LoginView
          onContinueAsGuest={handleEnterGuest}
          onForgotPassword={() => setResetPasswordState('request')}
        />
        <CookieConsentBanner />
        <AvatarUpdateNotice />
      </>
    );
  }

  return (
    <>
      {/* Main Page Container with Custom Linear Gradient Background */}
      <div
        className={`min-h-screen ${
          currentView === 'doomsday'
            ? 'bg-black text-white'
            : 'bg-crextio-dashboard-gradient text-white'
        } font-sans flex flex-col items-center px-3.5 py-3 sm:p-6 lg:px-6 lg:py-3 xl:px-8 xl:py-4 pb-12 sm:pb-6 lg:pb-3 xl:pb-4 transition-colors duration-500 ${
          currentView === 'dashboard'
            ? 'lg:h-screen lg:max-h-screen lg:overflow-hidden'
            : ''
        }`}
      >
        <div
          className={`w-full max-w-[1580px] flex-1 flex flex-col space-y-2.5 sm:space-y-3.5 xl:space-y-4 ${
            currentView === 'dashboard'
              ? 'h-full min-h-0'
              : ''
          }`}
        >
          {/* Topbar Horizontal Navigation */}
          <Topbar
            currentView={currentView}
            onSelectView={(view) => setCurrentView(view)}
            onOpenSettingsModal={() => setCurrentView('profile')}
            onExitGuestMode={handleExitGuest}
          />

          {/* Active View Router Content */}
          <main className={currentView === 'dashboard' ? 'flex-1 min-h-0 flex flex-col' : 'flex-1'} key={currentView}>
            {currentView === 'dashboard' && (
              <DashboardView
                onNavigate={(v) => setCurrentView(v)}
              />
            )}

            {(currentView === 'movies' || currentView === 'series' || currentView === 'specials') && (
              <LibraryView
                view={currentView}
              />
            )}

            {currentView === 'upcoming' && (
              <UpcomingView />
            )}

            {currentView === 'profile' && (
              <ProfileView onExitGuestMode={handleExitGuest} />
            )}

            {currentView === 'privacy' && (
              <PrivacyPolicyView />
            )}

            {currentView === 'terms' && (
              <TermsOfServiceView />
            )}

            {currentView === 'doomsday' && (
              <DoomsdayRoadmapView
                onBackToDashboard={() => setCurrentView('dashboard')}
                onNavigate={(v) => setCurrentView(v)}
              />
            )}
          </main>

          {/* Global Footer */}
          <Footer />

        </div>

      </div>

      {/* Floating Modals & Cookie Banner */}
      <DetailModal
        item={activeDetailItem}
        onClose={closeDetailModal}
        onEdit={(item) => {
          setEditingItem(item);
        }}
      />

      <EditItemModal
        item={editingItem}
        onClose={() => setEditingItem(null)}
      />

      <CookieConsentBanner />
      <AvatarUpdateNotice />
    </>
  );
};

export function App() {
  return (
    <MCUProvider>
      <TrackerMainApp />
    </MCUProvider>
  );
}

export default App;
