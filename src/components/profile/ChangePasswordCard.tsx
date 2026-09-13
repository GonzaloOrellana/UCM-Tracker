import React, { useState } from 'react';
import { KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMCU } from '../../context/MCUContext';
import { getSupabaseClient } from '../../lib/supabase';

interface ChangePasswordCardProps {
  seamless?: boolean;
}

export const ChangePasswordCard: React.FC<ChangePasswordCardProps> = ({ seamless = true }) => {
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
    <div className={seamless ? "space-y-3 text-left" : "bg-white/10 backdrop-blur-3xl p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 text-left"}>
      {passError && (
        <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{passError}</span>
        </div>
      )}

      {passSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{passSuccess}</span>
        </div>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="font-display text-[10.5px] font-bold uppercase tracking-wider text-zinc-300 block">
              Contraseña actual
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 neu-input-sunken rounded-xl text-xs text-white placeholder-zinc-500 outline-none font-medium transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-display text-[10.5px] font-bold uppercase tracking-wider text-zinc-300 block">
              Nueva contraseña
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-3 py-2 neu-input-sunken rounded-xl text-xs text-white placeholder-zinc-500 outline-none font-medium transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-display text-[10.5px] font-bold uppercase tracking-wider text-zinc-300 block">
              Confirmar contraseña
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 neu-input-sunken rounded-xl text-xs text-white placeholder-zinc-500 outline-none font-medium transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-0.5">
          <button
            type="submit"
            disabled={updatingPass || !currentPassword || !newPassword || !confirmPassword}
            className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 disabled:opacity-40 text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5 text-zinc-300" />
            <span>{updatingPass ? 'Actualizando...' : 'Actualizar Contraseña'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
