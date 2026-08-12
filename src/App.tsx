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
import { DetailModal } from './components/DetailModal';
import { EditItemModal } from './components/EditItemModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AvatarUpdateNotice } from './components/AvatarUpdateNotice';
import { Footer } from './components/Footer';
import { MCUItem } from './types/mcu';
import { getSupabaseClient } from './lib/supabase';

const TrackerMainApp: React.FC = () => {
  const { currentView, setCurrentView, activeDetailItem, closeDetailModal, user } = useMCU();

  const [isGuestMode, setIsGuestMode] = useState(false);
  const [editingItem, setEditingItem] = useState<MCUItem | null>(null);
  const [resetPasswordState, setResetPasswordState] = useState<'request' | 'update' | null>(null);

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

  // Al cerrar sesión, volver automáticamente a la página de Login
  useEffect(() => {
    if (!user) {
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

  // Si el usuario no ha iniciado sesión y no ha elegido entrar como invitado -> Página de Login (salvo que navegue a una vista legal pública)
  if (!user && !isGuestMode && currentView !== 'privacy' && currentView !== 'terms') {
    return (
      <>
        <LoginView
          onContinueAsGuest={() => setIsGuestMode(true)}
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
      <div className="min-h-screen bg-crextio-dashboard-gradient text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        
        <div className="w-full max-w-[1580px] flex-1 flex flex-col space-y-6">
          
          {/* Topbar Horizontal Navigation */}
          <Topbar
            currentView={currentView}
            onSelectView={(view) => setCurrentView(view)}
            onOpenSettingsModal={() => setCurrentView('profile')}
            onExitGuestMode={() => setIsGuestMode(false)}
          />

          {/* Active View Router Content */}
          <main className="flex-1" key={currentView}>
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
              <ProfileView onExitGuestMode={() => setIsGuestMode(false)} />
            )}

            {currentView === 'privacy' && (
              <PrivacyPolicyView />
            )}

            {currentView === 'terms' && (
              <TermsOfServiceView />
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
