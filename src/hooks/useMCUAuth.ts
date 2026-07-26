import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from '../lib/supabase';
import { UserSettings } from '../types/mcu';

interface UseMCUAuthProps {
  settings: UserSettings;
  updateSettings: (newSettings: UserSettings) => void;
  onAuthChange?: () => void;
  onDeleteSuccess?: () => void;
}

export function useMCUAuth({ settings, updateSettings, onAuthChange, onDeleteSuccess }: UseMCUAuthProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      if (u?.user_metadata?.is_deleted) {
        supabase.auth.signOut();
        setUser(null);
        return;
      }
      setUser(u);
      if (u?.user_metadata?.user_name) {
        updateSettings({ ...settings, userName: u.user_metadata.user_name });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      if (u?.user_metadata?.is_deleted) {
        supabase.auth.signOut();
        setUser(null);
        return;
      }
      setUser(u);
      if (u?.user_metadata?.user_name) {
        updateSettings({ ...settings, userName: u.user_metadata.user_name });
      }
      if (onAuthChange) onAuthChange();
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Cliente Supabase no disponible.');
    const { error, data } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;

    if (data.user?.user_metadata?.is_deleted) {
      await supabase.auth.signOut();
      setUser(null);
      throw new Error('Credenciales inválidas. Por favor verifica tus datos o crea una cuenta.');
    }

    if (data.user?.user_metadata?.user_name) {
      updateSettings({ ...settings, userName: data.user.user_metadata.user_name });
    }
  };

  const signup = async (email: string, pass: string, name: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Cliente Supabase no disponible.');
    const { error, data } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { user_name: name, is_deleted: false },
      },
    });
    if (error) throw error;
    updateSettings({ ...settings, userName: name });
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const deleteAccount = async () => {
    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase.auth.updateUser({
        data: { is_deleted: true, user_name: null },
      });
      await supabase.auth.signOut();
    }
    setUser(null);
    if (onDeleteSuccess) onDeleteSuccess();
  };

  const requestPasswordReset = async (email: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Cliente Supabase no disponible.');
    const redirectTo = window.location.origin || 'http://localhost:5173';
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Cliente Supabase no disponible.');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  return {
    user,
    setUser,
    login,
    signup,
    logout,
    deleteAccount,
    requestPasswordReset,
    updatePassword,
  };
}
