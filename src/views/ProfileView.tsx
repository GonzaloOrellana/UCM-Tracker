import React, { useState, useEffect } from 'react';
import { useMCU } from '../context/MCUContext';
import { User, Mail, LogOut, CheckCircle2, AlertTriangle, Cookie, Trash2, Pencil, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChangePasswordCard } from '../components/profile/ChangePasswordCard';
import { DeleteAccountModal } from '../components/profile/DeleteAccountModal';
import { AvatarPickerModal } from '../components/profile/AvatarPicker';

interface ProfileViewProps {
  onExitGuestMode?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onExitGuestMode }) => {
  const { user, settings, updateSettings, updateAvatar, logout, deleteAccount, cookieConsent, resetCookieConsent } = useMCU();

  const [userName, setUserName] = useState(settings.userName || '');
  const [selectedAvatarId, setSelectedAvatarId] = useState(settings.avatarId || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Delete Account Confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep inputs in sync with settings
  useEffect(() => {
    setUserName(settings.userName || '');
    setSelectedAvatarId(settings.avatarId || '');
  }, [settings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      userName: userName.trim() || settings.userName,
    });
    if (selectedAvatarId) {
      await updateAvatar(selectedAvatarId);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      if (onExitGuestMode) {
        onExitGuestMode();
      }
    } catch (err) {
      console.error('Error al eliminar la cuenta:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-[1280px] mx-auto text-white font-sans space-y-3 sm:space-y-4 pb-2 flex-1 flex flex-col justify-center min-h-0"
      >
        {/* Page Title Header Bar */}
        <div className="border-b border-white/10 pb-2.5">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
            Perfil de Usuario
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-normal hidden sm:block">
            Gestiona tu identidad, credenciales y preferencias en un solo panel.
          </p>
        </div>

        {/* Master Single Container Card - Optimized for Desktop Zero-Scroll */}
        <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-6.5 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* ────────────────────────────────────────────────────────── */}
            {/* LEFT SIDE: IDENTIDAD & PERFIL (lg:col-span-5) */}
            {/* ────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:pr-6 lg:border-r lg:border-white/10 text-left">
              <div className="space-y-4">
                {/* Header Title */}
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span>INFORMACIÓN DE PERFIL</span>
                </div>

                {/* Avatar + User Bio Summary */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="relative group shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsAvatarPickerOpen(true)}
                      className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shrink-0 bg-[#080911] border-2 border-white/20 hover:border-white/40 shadow-lg cursor-pointer block focus:outline-none transition-transform hover:scale-105"
                      title="Cambiar avatar"
                    >
                      {settings.profilePicUrl ? (
                        <img src={settings.profilePicUrl} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-2xl text-white flex items-center justify-center h-full">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAvatarPickerOpen(true)}
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#C81D25] hover:bg-[#a8151c] text-white shadow-md border-2 border-[#12131F] cursor-pointer transition-transform hover:scale-110 active:scale-95"
                      title="Cambiar avatar"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white truncate leading-tight">
                      {userName || settings.userName}
                    </h2>
                    <p className="text-xs text-zinc-400 font-medium truncate">
                      {user?.email || 'Modo Invitado (Sesión local)'}
                    </p>
                  </div>
                </div>

                {/* Form Input Fields */}
                <form onSubmit={handleSaveSettings} className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-wider text-zinc-300 block">
                      Nombre de Usuario <span className="text-[#C81D25]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="ej. Gonzalo"
                      className="w-full px-3.5 py-2 neu-input-sunken rounded-xl text-xs text-white placeholder-zinc-500 outline-none font-medium transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-wider text-zinc-300 block flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" /> Correo Electrónico
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user ? user.email || '' : 'Modo Invitado (Sesión local)'}
                      className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-zinc-400 font-medium cursor-not-allowed shadow-inner"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all border border-white/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>GUARDAR CAMBIOS</span>
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Cambios guardados con éxito</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Bottom Quick Session Action */}
              <div className="pt-2">
                {user ? (
                  <button
                    type="button"
                    onClick={async () => await logout()}
                    className="w-full py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-zinc-400" />
                    <span>Cerrar Sesión</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onExitGuestMode) onExitGuestMode();
                      else logout();
                    }}
                    className="w-full py-2.5 px-4 bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm border border-white/10"
                  >
                    <User className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </button>
                )}
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* RIGHT SIDE: SEGURIDAD, PREFERENCIAS & PELIGRO (lg:col-span-7) */}
            {/* ────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 text-left">
              {/* 1. Seguridad y Contraseña */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <Lock className="w-4 h-4 text-zinc-400" />
                  <span>SEGURIDAD Y CONTRASEÑA</span>
                </div>

                {user ? (
                  <ChangePasswordCard seamless={true} />
                ) : (
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 leading-relaxed">
                    Estás navegando en <strong className="text-zinc-200">Modo Invitado</strong>. La configuración y cambio de contraseñas está disponible únicamente para cuentas registradas con correo electrónico.
                  </div>
                )}
              </div>

              <div className="h-[1px] bg-white/[0.08] w-full" />

              {/* 2. Preferencias y Privacidad */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <Cookie className="w-4 h-4 text-zinc-400" />
                  <span>PREFERENCIAS Y PRIVACIDAD</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-white">
                      Consentimiento de Cookies
                    </p>
                    <p className="text-xs text-zinc-400 font-sans">
                      Estado actual:{' '}
                      <strong className={cookieConsent === 'accepted' ? 'text-emerald-400' : cookieConsent === 'rejected' ? 'text-rose-400' : 'text-amber-400'}>
                        {cookieConsent === 'accepted' ? 'Aceptadas' : cookieConsent === 'rejected' ? 'Rechazadas' : 'Sin responder'}
                      </strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetCookieConsent}
                    className="px-3.5 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/10 text-white rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                  >
                    Reconfigurar
                  </button>
                </div>
              </div>

              {/* 3. Zona de Peligro (Solo si usuario está registrado) */}
              {user && (
                <>
                  <div className="h-[1px] bg-white/[0.08] w-full" />

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                      <div className="space-y-0.5">
                        <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>ZONA DE PELIGRO</span>
                        </h4>
                        <p className="text-xs text-zinc-400 font-sans">
                          Eliminará permanentemente tus datos y progreso de visualización guardado.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-3.5 py-2 bg-rose-500/15 hover:bg-rose-500/25 active:scale-[0.98] text-rose-200 hover:text-white border border-rose-500/35 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ELIMINAR CUENTA</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      </motion.div>

      {/* Delete Account Modal Subcomponent */}
      <DeleteAccountModal
        isOpen={showDeleteConfirm}
        isDeleting={isDeleting}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Avatar Selector Glassmorphic Modal */}
      <AvatarPickerModal
        isOpen={isAvatarPickerOpen}
        onClose={() => setIsAvatarPickerOpen(false)}
        currentAvatarId={selectedAvatarId || settings.avatarId}
        onSelectAvatar={async (id) => {
          setSelectedAvatarId(id);
          await updateAvatar(id);
        }}
        isLoggedIn={!!user}
      />
    </>
  );
};
