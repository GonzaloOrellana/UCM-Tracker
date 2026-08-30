import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

interface ResetPasswordViewProps {
  mode?: 'request' | 'update';
  onBackToLogin: () => void;
  onPasswordUpdated?: () => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  mode = 'request',
  onBackToLogin,
  onPasswordUpdated,
}) => {
  const { requestPasswordReset, updatePassword } = useMCU();

  const [currentMode, setCurrentMode] = useState<'request' | 'update'>(mode);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Por favor ingresa tu correo electrónico.');
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
      // Security best practice: Generic response (do not expose email existence)
      setSuccessMsg('Si el email está registrado, te enviamos un enlace de recuperación. Revisa tu bandeja de entrada o spam.');
    } catch (err: any) {
      console.error('Error al solicitar recuperación:', err);
      // Even on error, maintain non-identifying generic response unless network fault
      setSuccessMsg('Si el email está registrado, te enviamos un enlace de recuperación. Revisa tu bandeja de entrada o spam.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!newPassword) {
      setErrorMsg('Por favor ingresa la nueva contraseña.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Verifica e intenta nuevamente.');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(newPassword);
      setSuccessMsg('¡Contraseña actualizada con éxito! Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        if (onPasswordUpdated) {
          onPasswordUpdated();
        } else {
          onBackToLogin();
        }
      }, 2500);
    } catch (err: any) {
      console.error('Error al actualizar contraseña:', err);
      setErrorMsg(err.message || 'Ocurrió un error al actualizar tu contraseña. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans text-white">
      {/* Background Cinematic Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.wallpapersden.com/image/download/marvel-legends_bGxuaGmUmZqaraWkpJRmbmdlrWZlbWU.jpg')`,
        }}
      />

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.4, 1] }}
          className="bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-5 text-left"
        >
          {/* Header Brand & Title */}
          <div className="text-center space-y-3">
            <img
              src="/logo-marveltracker-blanco.png"
              alt="Marvel Tracker"
              className="h-11 sm:h-14 w-auto mx-auto object-contain"
            />
            <div>
              <h2 className="text-lg font-semibold text-white tracking-tight flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4 text-[#F5C842]" />
                <span>
                  {currentMode === 'request'
                    ? 'Recuperar Contraseña'
                    : 'Establecer Nueva Contraseña'}
                </span>
              </h2>
              <p className="text-xs text-zinc-300 font-normal mt-1">
                {currentMode === 'request'
                  ? 'Ingresa tu correo para recibir las instrucciones'
                  : 'Ingresa tu nueva clave de acceso'}
              </p>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/25 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/25 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form: Request Mode */}
          {currentMode === 'request' ? (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu-correo@ejemplo.com"
                    className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-xl px-3.5 py-2.5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                  />
                  <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white font-normal text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? 'ENVIANDO...' : 'ENVIAR ENLACE DE RECUPERACIÓN'}
              </button>
            </form>
          ) : (
            /* Form: Update Mode */
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-xl px-3.5 py-2.5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-xl px-3.5 py-2.5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white font-normal text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? 'ACTUALIZANDO...' : 'ACTUALIZAR CONTRASEÑA'}
              </button>
            </form>
          )}

          {/* Footer Back Link */}
          <div className="text-center pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white underline cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Inicio de Sesión</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
