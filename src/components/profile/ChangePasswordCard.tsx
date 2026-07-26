import React, { useState } from 'react';
import { KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMCU } from '../../context/MCUContext';
import { getSupabaseClient } from '../../lib/supabase';

export const ChangePasswordCard: React.FC = () => {
  const { user, updatePassword } = useMCU();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [updatingPass, setUpdatingPass] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (!currentPassword) {
      setPassError('Ingresa tu contraseña actual.');
      return;
    }
    if (!newPassword) {
      setPassError('Ingresa la nueva contraseña.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('La contraseña nueva debe tener al menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('Las contraseñas nuevas no coinciden.');
      return;
    }

    setUpdatingPass(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase || !user?.email) {
        throw new Error('No hay una sesión activa o conexión con Supabase.');
      }

      // Re-autenticación de seguridad explícita
      const authResponse = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      // Si existe un error (error !== null), la contraseña actual es incorrecta -> DETENER inmediatamente
      if (authResponse.error) {
        console.warn('[SECURITY BLOCK] Re-autenticación fallida:', authResponse.error.message);
        setPassError('La contraseña actual es incorrecta.');
        setUpdatingPass(false);
        return;
      }

      // ÚNICAMENTE si authResponse.error === null se procede a actualizar la clave
      await updatePassword(newPassword);

      setPassSuccess('Contraseña actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(null), 4000);
    } catch (err: any) {
      console.error('Error al cambiar contraseña:', err);
      setPassError(err.message || 'Ocurrió un error al intentar cambiar la contraseña.');
    } finally {
      setUpdatingPass(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-3xl p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 text-left">
      <h2 className="text-sm font-semibold text-white border-b border-white/15 pb-2 flex items-center gap-2">
        <KeyRound className="w-3.5 h-3.5 text-[#F5C842]" />
        <span>Cambiar Contraseña</span>
      </h2>

      {passError && (
        <div className="p-2 rounded-lg bg-rose-500/25 border border-rose-500/40 text-rose-200 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-300" />
          <span>{passError}</span>
        </div>
      )}

      {passSuccess && (
        <div className="p-2 rounded-lg bg-emerald-500/25 border border-emerald-500/40 text-emerald-200 text-[11px] flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
          <span>{passSuccess}</span>
        </div>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-2">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-300 block">
            Contraseña actual
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-3.5 py-1.5 bg-white/10 border border-white/20 focus:border-white/50 rounded-lg text-xs text-white placeholder-zinc-400 outline-none font-medium transition-all shadow-inner"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-300 block">
            Nueva contraseña
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="w-full px-3.5 py-1.5 bg-white/10 border border-white/20 focus:border-white/50 rounded-lg text-xs text-white placeholder-zinc-400 outline-none font-medium transition-all shadow-inner"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-300 block">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-3.5 py-1.5 bg-white/10 border border-white/20 focus:border-white/50 rounded-lg text-xs text-white placeholder-zinc-400 outline-none font-medium transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={updatingPass || !currentPassword || !newPassword || !confirmPassword}
          className="w-full py-2 px-3 bg-white/15 hover:bg-white/25 border border-white/20 disabled:opacity-40 text-white text-xs font-medium rounded-lg transition-all cursor-pointer shadow-xs mt-1"
        >
          {updatingPass ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </form>
    </div>
  );
};
