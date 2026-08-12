import React, { useState, useEffect } from 'react';
import { useMCU } from '../context/MCUContext';
import { User, Mail, ShieldCheck, LogOut, CheckCircle2, AlertTriangle, FileText, Cookie, Trash2, Pencil, Lock, Settings } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'security' | 'account'>('security');

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
        className="max-w-6xl mx-auto pb-8 text-white font-sans space-y-6"
      >
        {/* Page Title Header */}
        <div className="border-b border-white/15 pb-3">
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-white leading-none">
            PERFIL DE USUARIO
          </h1>
        </div>

        {/* Client Profile Grid Architecture (Inspired by Reference Wireframe) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* ────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: Identity Profile Card + User Info Form */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 h-full flex flex-col">
            
            {/* Identity Box Card */}
            <form
              onSubmit={handleSaveSettings}
              className="bg-white/10 backdrop-blur-3xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-5 text-center relative overflow-hidden flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                {/* Large Avatar Circle with Edit Pencil */}
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setIsAvatarPickerOpen(true)}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 bg-[#1b1e32] border-4 border-white/30 shadow-2xl cursor-pointer block focus:outline-none transition-transform hover:scale-105"
                    title="Cambiar avatar"
                  >
                    {settings.profilePicUrl ? (
                      <img src={settings.profilePicUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display text-4xl text-white flex items-center justify-center h-full">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>

                  {/* Floating Edit Pencil Badge */}
                  <button
                    type="button"
                    onClick={() => setIsAvatarPickerOpen(true)}
                    className="absolute bottom-1 right-1 p-2 rounded-full bg-[#C81D25] hover:bg-[#a8151c] text-white shadow-lg border-2 border-[#181b2e] cursor-pointer transition-transform hover:scale-110"
                    title="Cambiar avatar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>

                {/* User Display Name */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-white leading-none">
                    {userName || settings.userName}
                  </h2>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-3 pt-3 border-t border-white/15 text-left">
                
                {/* Field 1: Nombre de Usuario */}
                <div className="space-y-1">
                  <label className="font-label text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                    Nombre de Usuario <span className="text-[#C81D25]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="ej. Gonzalo"
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 focus:border-white/50 rounded-xl text-xs text-white placeholder-zinc-400 outline-none font-medium transition-all shadow-inner focus:ring-1 focus:ring-white/40"
                  />
                </div>

                {/* Field 2: Correo Electrónico */}
                <div className="space-y-1">
                  <label className="font-label text-[11px] font-bold uppercase tracking-wider text-zinc-300 block flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" /> Correo Electrónico
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user ? user.email || '' : 'Modo Invitado (Sesión local)'}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-zinc-400 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Field 3: Sincronización Status */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 text-[11px] font-label font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-zinc-300">
                    <ShieldCheck className={`w-4 h-4 ${user ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span>{user ? 'Sincronizado en Supabase' : 'Guardado Local'}</span>
                  </div>
                </div>

              </div>

              {/* Submit Save Button */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white hover:bg-zinc-100 text-zinc-950 font-label text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  <span>GUARDAR CAMBIOS</span>
                </button>

                {saveSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-label font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Perfil guardado correctamente</span>
                  </div>
                )}
              </div>

            </form>

          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: Tabbed Configuration & Account Panels */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 h-full flex flex-col">
            
            {/* Main Glass Panel with Tabs Header */}
            <div className="bg-white/10 backdrop-blur-3xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Tab Navigation Header */}
              <div className="flex items-center gap-2 border-b border-white/15 pb-4 font-label text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'security'
                      ? 'bg-white text-zinc-950 shadow-md'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/15'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>SEGURIDAD</span>
                </button>

                <button
                  onClick={() => setActiveTab('account')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'account'
                      ? 'bg-white text-zinc-950 shadow-md'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/15'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>GESTIÓN DE CUENTA</span>
                </button>
              </div>

              {/* TAB 1: Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-4 animate-fade-in text-left">
                  {user ? (
                    <div className="w-full">
                      <ChangePasswordCard />
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-body">
                      Estás navegando en modo invitado. Las opciones de cambio de contraseña están disponibles únicamente para cuentas registradas.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Gestión de Sesión y Cuenta */}
              {activeTab === 'account' && (
                <div className="space-y-4 animate-fade-in text-left">
                  {/* Cookie Status Box en Gestión de Cuenta */}
                  <div className="p-4 rounded-2xl bg-[#24273E]/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1 text-left">
                      <span className="font-label text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Cookie className="w-4 h-4 text-amber-400" />
                        <span>PREFERENCIA DE COOKIES ANALÍTICAS</span>
                      </span>
                      <p className="font-body text-[11px] text-zinc-400">
                        Estado actual:{' '}
                        <strong className={cookieConsent === 'accepted' ? 'text-emerald-400' : cookieConsent === 'rejected' ? 'text-rose-400' : 'text-amber-400'}>
                          {cookieConsent === 'accepted' ? 'Aceptadas' : cookieConsent === 'rejected' ? 'Rechazadas' : 'Sin responder'}
                        </strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetCookieConsent}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-label text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                    >
                      RECONFIGURAR
                    </button>
                  </div>

                  {user ? (
                    <div className="space-y-5">
                      {/* Cerrar Sesión Button */}
                      <button
                        type="button"
                        onClick={async () => {
                          await logout();
                        }}
                        className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-zinc-300" />
                        <span>CERRAR SESIÓN</span>
                      </button>

                      {/* Zona de Peligro: Eliminar Cuenta */}
                      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                        <div className="space-y-1">
                          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>ZONA DE PELIGRO</span>
                          </h4>
                          <p className="font-body text-[11px] text-zinc-400">
                            Esta acción borrará permanentemente todos tus datos guardados.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl font-label text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>ELIMINAR CUENTA</span>
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
                      className="w-full py-3.5 px-4 bg-[#C81D25] hover:bg-[#a8151c] text-white font-label text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>INICIAR SESIÓN / REGISTRARSE</span>
                    </button>
                  )}
                </div>
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
