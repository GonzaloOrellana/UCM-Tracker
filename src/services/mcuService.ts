import { getSupabaseClient } from '../lib/supabase';
import { storageService } from './storageService';
import { MCUItem } from '../types/mcu';

export const mcuService = {
  // Cargar lista de IDs vistos desde Supabase (o fallback a localStorage)
  async fetchWatchedIds(): Promise<string[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('item_id, is_watched')
          .eq('is_watched', true);

        if (!error && data) {
          const watchedIds = data.map((row) => row.item_id);
          // Actualizar localStorage como cache secundario
          storageService.saveWatchedIds(watchedIds);
          return watchedIds;
        }
      } catch (err) {
        console.warn('Supabase fetchWatchedIds falló, usando localStorage:', err);
      }
    }
    return storageService.getWatchedIds();
  },

  // Guardar o alternar estado de visto en Supabase
  async toggleWatchedState(itemId: string, nextIsWatched: boolean): Promise<void> {
    // 1. Guardar primero localmente para UI instantánea
    const currentWatched = new Set(storageService.getWatchedIds());
    if (nextIsWatched) {
      currentWatched.add(itemId);
    } else {
      currentWatched.delete(itemId);
    }
    const watchedArray = Array.from(currentWatched);
    storageService.saveWatchedIds(watchedArray);

    // 2. Sincronizar en Supabase si hay cliente activo
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { error } = await supabase
            .from('user_progress')
            .upsert(
              { 
                user_id: session.user.id, 
                item_id: itemId, 
                is_watched: nextIsWatched, 
                updated_at: new Date().toISOString() 
              },
              { onConflict: 'user_id, item_id' }
            );

          if (error) {
            console.warn('Error al guardar en Supabase user_progress:', error);
          }
        }
      } catch (err) {
        console.warn('Supabase upsert error:', err);
      }
    }
  },

  // Guardar en lote o alternar múltiples estados de visto de forma atómica
  async setMultipleWatchedState(itemIds: string[], nextIsWatched: boolean): Promise<void> {
    if (itemIds.length === 0) return;

    // 1. Actualización local inmediata (una sola escritura en localStorage)
    const currentWatched = new Set(storageService.getWatchedIds());
    if (nextIsWatched) {
      itemIds.forEach((id) => currentWatched.add(id));
    } else {
      itemIds.forEach((id) => currentWatched.delete(id));
    }
    storageService.saveWatchedIds(Array.from(currentWatched));

    // 2. Sincronización en bloque en Supabase (una sola transacción de red)
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const now = new Date().toISOString();
          const records = itemIds.map((id) => ({
            user_id: session.user.id,
            item_id: id,
            is_watched: nextIsWatched,
            updated_at: now,
          }));

          const { error } = await supabase
            .from('user_progress')
            .upsert(records, { onConflict: 'user_id, item_id' });

          if (error) {
            console.warn('Error al guardar en lote en Supabase user_progress:', error);
          }
        }
      } catch (err) {
        console.warn('Supabase batch upsert error:', err);
      }
    }
  },
};
