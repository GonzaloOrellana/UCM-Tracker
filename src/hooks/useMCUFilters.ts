import { useState, useMemo } from 'react';
import { FilterState, MCUItem } from '../types/mcu';

export const defaultFilters: FilterState = {
  search: '',
  phase: 'all',
  type: 'all',
  status: 'all',
  order: 'release',
};

export function useMCUFilters(items: MCUItem[], watchedIds: Set<string>) {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search Query
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = item.titulo.toLowerCase().includes(q);
          const matchOriginal = item.tituloOriginal?.toLowerCase().includes(q);
          if (!matchTitle && !matchOriginal) {
            return false;
          }
        }

        // Phase Filter
        if (filters.phase !== 'all' && item.fase !== filters.phase) {
          return false;
        }

        // Type Filter
        if (filters.type !== 'all' && item.tipo !== filters.type) {
          return false;
        }

        // Watched Filter
        if (filters.status === 'watched' && !watchedIds.has(item.id)) {
          return false;
        }
        if (filters.status === 'unwatched' && watchedIds.has(item.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.order === 'chronological') {
          return a.ordenCronologico - b.ordenCronologico;
        }
        return a.ordenEstreno - b.ordenEstreno;
      });
  }, [items, filters, watchedIds]);

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  return {
    filters,
    filteredItems,
    setFilters,
    resetFilters,
  };
}
