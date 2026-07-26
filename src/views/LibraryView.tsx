import React from 'react';
import { useMCU } from '../context/MCUContext';
import { MCUGrid } from '../components/MCUGrid';
import { FilterBar } from '../components/FilterBar';
import { NavView } from '../types/mcu';

interface LibraryViewProps {
  view: NavView;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ view }) => {
  const { filteredItems, openDetailModal } = useMCU();

  const targetType = view === 'movies' ? 'movie' : view === 'series' ? 'series' : 'special';
  const sectionItems = filteredItems.filter((item) => item.tipo === targetType);

  return (
    <div key={view} className="space-y-5">
      
      {/* Unified Filter Bar */}
      <FilterBar />

      {/* Grid of Library Cards (Scoped to Current Section Type) */}
      <MCUGrid
        items={sectionItems}
        onOpenDetail={(item) => openDetailModal(item)}
      />

    </div>
  );
};
