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

  // Cargar ítems personalizados desde Supabase o localStorage
  async fetchCustomItems(): Promise<MCUItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('custom_items').select('*');
        if (!error && data && data.length > 0) {
          const mapped: MCUItem[] = data.map((row) => ({
            id: row.id,
            titulo: row.title,
            tituloOriginal: row.original_title,
            tipo: row.type,
            anioLanzamiento: row.release_year,
            fechaLanzamiento: row.release_date || `${row.release_year}-01-01`,
            ordenEstreno: 999,
            ordenCronologico: 999,
            fase: row.phase,
            urlPoster: row.poster_url,
            resumen: row.overview,
            duracion: row.duration,
            personajePrincipal: row.hero_character,
            isCustom: true,
          }));
          storageService.saveCustomItems(mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Error al cargar custom_items de Supabase:', err);
      }
    }
    return storageService.getCustomItems();
  },

  // Guardar ítem personalizado y subir imagen a Supabase Storage
  async saveCustomItem(newItem: MCUItem, imageBase64?: string): Promise<MCUItem> {
    let finalPosterUrl = newItem.urlPoster;

    const supabase = getSupabaseClient();

    // Intentar subir imagen a Supabase Storage si se proporcionó base64
    if (supabase && imageBase64 && imageBase64.startsWith('data:image')) {
      try {
        const fileExt = imageBase64.substring('data:image/'.length, imageBase64.indexOf(';base64'));
        const fileName = `${newItem.id}.${fileExt || 'jpg'}`;
        
        // Convert base64 to Blob
        const base64Data = imageBase64.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: `image/${fileExt || 'jpg'}` });

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('marvel-posters')
          .upload(fileName, blob, { upsert: true });

        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage.from('marvel-posters').getPublicUrl(fileName);
          if (urlData?.publicUrl) {
            finalPosterUrl = urlData.publicUrl;
          }
        }
      } catch (e) {
        console.warn('Error al subir imagen a Supabase Storage:', e);
      }
    }

    const itemToSave = { ...newItem, urlPoster: finalPosterUrl };

    // Guardar fila en tabla custom_items de Supabase
    if (supabase) {
      try {
        await supabase.from('custom_items').insert({
          id: itemToSave.id,
          title: itemToSave.titulo,
          original_title: itemToSave.tituloOriginal,
          type: itemToSave.tipo,
          release_year: itemToSave.anioLanzamiento,
          release_date: itemToSave.fechaLanzamiento,
          phase: itemToSave.fase,
          poster_url: itemToSave.urlPoster,
          overview: itemToSave.resumen,
          duration: itemToSave.duracion,
          hero_character: itemToSave.personajePrincipal,
        });
      } catch (e) {
        console.warn('Error al insertar custom_item en Supabase:', e);
      }
    }

    return itemToSave;
  }
};
