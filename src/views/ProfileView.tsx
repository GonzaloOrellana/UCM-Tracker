import React, { useState, useEffect } from 'react';
import { useMCU } from '../context/MCUContext';
import { Camera, Trash2, User, Mail, ShieldCheck, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChangePasswordCard } from '../components/profile/ChangePasswordCard';
import { DeleteAccountModal } from '../components/profile/DeleteAccountModal';

interface ProfileViewProps {
  onExitGuestMode?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onExitGuestMode }) => {
  const { user, settings, updateSettings, logout, deleteAccount } = useMCU();

  const [userName, setUserName] = useState(settings.userName || '');
  const [profilePicUrl, setProfilePicUrl] = useState(settings.profilePicUrl || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Delete Account Confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep inputs in sync with settings
  useEffect(() => {
    setUserName(settings.userName || '');
    setProfilePicUrl(settings.profilePicUrl || '');
  }, [settings]);

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = event.target?.result as string;
        if (rawResult) {
          const img = new Image();
          img.src = rawResult;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 256;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxDim) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              }
            } else {
              if (height > maxDim) {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
              setProfilePicUrl(compressedBase64);
              updateSettings({
                ...settings,
                userName: userName.trim() || settings.userName,
                profilePicUrl: compressedBase64,
              });
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      userName: userName.trim() || settings.userName,
      profilePicUrl: profilePicUrl.trim(),
    });
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

          {/* Avatar Photo Upload Area */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 bg-[#C81D25] text-white font-semibold text-xl flex items-center justify-center shadow-lg">
              {profilePicUrl ? (
                <img src={profilePicUrl} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs">
                  <Camera className="w-3.5 h-3.5 text-[#F5C842]" />
                  <span>Subir Foto</span>
                  <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="hidden" />
                </label>

                {profilePicUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePicUrl('');
                      updateSettings({
                        ...settings,
                        profilePicUrl: '',
                      });
                    }}
                    className="p-1.5 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    title="Quitar foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Quitar</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 font-normal">
                Formatos recomendados: JPG o PNG. Tamaño máximo 2MB.
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
                <span>{user ? 'Cuenta activa sincronizada en Supabase' : 'Modo Invitado (Guardado local)'}</span>
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
    </>
  );
};
