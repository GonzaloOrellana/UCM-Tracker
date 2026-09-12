import React from 'react';
import { useMCU } from '../context/MCUContext';
import { NavView } from '../types/mcu';
import { MasterStatusCard } from '../components/dashboard/MasterStatusCard';
import { HeroSpotlightCard } from '../components/dashboard/HeroSpotlightCard';
import { DoomsdayBentoCard } from '../components/dashboard/DoomsdayBentoCard';
import { SagaRoadmapCard } from '../components/dashboard/SagaRoadmapCard';
import { InfinityVaultCard } from '../components/dashboard/InfinityVaultCard';
import { UpcomingCarouselCard } from '../components/dashboard/UpcomingCarouselCard';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const {
    stats,
    settings,
    openDetailModal,
    availableItems,
    upcomingItems,
    watchedIds,
  } = useMCU();

  return (
    <div className="h-full flex-1 min-h-0 flex flex-col justify-between gap-2.5 lg:gap-3 xl:gap-3.5 animate-fade-in relative pb-10 lg:pb-0 select-none">
      {/* ROW 1: TOP BENTO HERO (3 EQUAL COLUMNS: MASTER STATUS + SPOTLIGHT HERO + DOOMSDAY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3 xl:gap-3.5 shrink-0 lg:h-[43%] xl:h-[43%] min-h-0">
        <MasterStatusCard userName={settings.userName} stats={stats} />
        <HeroSpotlightCard
          availableItems={availableItems}
          watchedIds={watchedIds}
          onOpenDetail={openDetailModal}
          onNavigateUpcoming={() => onNavigate('upcoming')}
        />
        <DoomsdayBentoCard onNavigate={onNavigate} />
      </div>

      {/* ROW 2: MAIN GRID (3 SYMMETRICAL COLUMNS: ROADMAP + VAULT + UPCOMING) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2.5 lg:gap-3 xl:gap-3.5 flex-1 min-h-0">
        <SagaRoadmapCard phases={stats.phases} />
        <InfinityVaultCard stats={stats} onNavigate={onNavigate} />
        <UpcomingCarouselCard upcomingItems={upcomingItems} />
      </div>
    </div>
  );
};
