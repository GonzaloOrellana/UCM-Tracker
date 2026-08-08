import React, { useState, useEffect } from 'react';
import { useMCU } from '../context/MCUContext';
import { User, Mail, ShieldCheck, LogOut, CheckCircle2, AlertTriangle, FileText, Cookie, Trash2, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChangePasswordCard } from '../components/profile/ChangePasswordCard';
import { DeleteAccountModal } from '../components/profile/DeleteAccountModal';
import { AvatarPickerModal } from '../components/profile/AvatarPicker';

interface ProfileViewProps {
  onExitGuestMode?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onExitGuestMode }) => {
  const { user, settings, updateSettings, updateAvatar, logout, deleteAccount, setCurrentView, cookieConsent, resetCookieConsent } = useMCU();

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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="space-y-6 max-w-2xl mx-auto pb-6 text-white font-sans"
      >
        {/* CARD 1: Información General Form */}
        <form
          onSubmit={handleSaveSettings}
          className="bg-white/10 backdrop-blur-3xl p-5 sm:p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4 text-left"
        >
          <div>
            <h2 className="text-sm font-semibold text-white border-b border-white/15 pb-2">
              Información General
            </h2>
          </div>

          {/* Active Avatar Preview with Floating Edit Pencil Button */}
          <div className="flex items-center gap-4 pt-1 border-b border-white/10 pb-4">
            <div className="relative group">
              <button
                type="button"
                onClick={() => setIsAvatarPickerOpen(true)}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 bg-[#1b1e32] border-2 border-white/20 shadow-xl cursor-pointer block focus:outline-none transition-transform hover:scale-105"
                title="Cambiar avatar"
              >
                {settings.profilePicUrl ? (
                  <img src={settings.profilePicUrl} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-semibold text-2xl flex items-center justify-center h-full">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {/* Floating Pencil Edit Button Icon (Bottom Right) */}
              <button
                type="button"
                onClick={() => setIsAvatarPickerOpen(true)}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#C81D25] hover:bg-[#a8151c] text-white shadow-lg border-2 border-[#181b2e] cursor-pointer transition-transform hover:scale-110"
                title="Cambiar avatar"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  Avatar de Personaje
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAvatarPickerOpen(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-medium underline cursor-pointer"
                >
                  Cambiar
                </button>
              </div>
              <p className="text-xs text-zinc-300 font-normal">
                Elegí un héroe o villano de Marvel para tu perfil.
              </p>
            </div>
          </div>

          {/* Basic Info Fields */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-300 block">
                Nombre de Usuario <span className="text-[#C81D25]">*</span>
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ej. Gonzalo"
                className="w-full px-3.5 py-2 bg-white/10 border border-white/20 focus:border-white/50 rounded-lg text-xs text-white placeholder-zinc-400 outline-none font-medium transition-all shadow-inner focus:ring-1 focus:ring-white/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-300 block flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" /> Correo Electrónico
              </label>
              <input
                type="text"
                disabled
                value={user ? user.email || '' : 'Modo Invitado (Sesión local)'}
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-400 font-medium cursor-not-allowed"
              />
            </div>

            {/* Sync Status Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-zinc-300 font-medium">
                <ShieldCheck className={`w-3.5 h-3.5 ${user ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>{user ? 'Avatar y cuenta sincronizados en Supabase' : 'Modo Invitado (Guardado local)'}</span>
              </div>
            </div>
          </div>

          {/* General Info Submit Button */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white hover:bg-zinc-100 active:scale-[0.98] text-zinc-950 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-zinc-950" />
              <span>Guardar Cambios de Perfil</span>
            </button>

            {saveSuccess && (
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Perfil guardado correctamente</span>
              </div>
            )}
          </div>
        </form>

        {/* CARD 2: Cambiar Contraseña */}
        {user && (
          <div className="w-full">
            <ChangePasswordCard />
          </div>
        )}

        {/* CARD 3: Información Legal & Privacidad (Ley 25.326) */}
        <div className="bg-white/10 backdrop-blur-3xl p-5 sm:p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4 text-left">
          <div className="border-b border-white/15 pb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacidad & Información Legal</span>
            </h2>
            <span className="text-[10px] text-zinc-400">Ley N° 25.326 (Argentina)</span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-normal">
            Marvel Tracker protege tus datos personales y cumple con la legislación argentina de hábeas data. Podés revisar nuestras políticas completas o ajustar tus preferencias de cookies en cualquier momento.
          </p>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setCurrentView('privacy')}
              className="p-3 bg-white/5 hover:bg-white/15 border border-white/15 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Política de Privacidad</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-normal">
                Ver tratamiento de datos, Supabase y derechos ARCO.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('terms')}
              className="p-3 bg-white/5 hover:bg-white/15 border border-white/15 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-red-300">
                <FileText className="w-4 h-4 text-red-400" />
                <span>Términos de Uso</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-normal">
                Exención fan-made de Marvel/Disney y condiciones.
              </p>
            </button>
          </div>

          {/* Cookie preference status */}
          <div className="p-3 rounded-xl bg-[#24273E]/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-left">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Cookie className="w-4 h-4 text-amber-400" />
                <span>Preferencia de Cookies Analíticas</span>
              </span>
              <p className="text-[11px] text-zinc-400">
                Estado actual:{' '}
                <strong className={cookieConsent === 'accepted' ? 'text-emerald-400' : cookieConsent === 'rejected' ? 'text-rose-400' : 'text-amber-400'}>
                  {cookieConsent === 'accepted' ? 'Aceptadas' : cookieConsent === 'rejected' ? 'Rechazadas' : 'Sin responder'}
                </strong>
              </p>
            </div>

            <button
              type="button"
              onClick={resetCookieConsent}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0"
            >
              Reconfigurar Cookies
            </button>
          </div>
        </div>

        {/* SECCIÓN 3: Acciones de Cuenta (Jerarquía Diferenciada) */}
        <div className="pt-4 space-y-4 text-left">
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Gestión de Sesión y Cuenta
            </h3>
          </div>

          {/* Cerrar Sesión (Estilo Neutral Secundario) */}
          {user ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={async () => {
                  await logout();
                }}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 text-white text-xs font-medium rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4 text-zinc-300" />
                <span>Cerrar Sesión</span>
              </button>

              {/* Zona de Peligro: Eliminar Cuenta (Tratamiento discreto/separado) */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    Zona de Peligro
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Esta acción cerrará tu sesión y borrará permanentemente todos tus datos guardados.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3.5 py-1.5 text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Cuenta</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onExitGuestMode) {
                  onExitGuestMode();
                } else {
                  logout();
                }
              }}
              className="w-full py-3 px-4 bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión / Registrarse</span>
            </button>
          )}
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
