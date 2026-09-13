import React from 'react';
import { ExternalLink } from 'lucide-react';
import { MCUItem } from '../types/mcu';

export type PlatformType = 'mercadoPlay' | 'primeVideo' | 'disney' | 'sony' | 'official';

export interface PlatformInfo {
  type: PlatformType;
  watchUrl: string;
  tooltip: string;
  buttonClasses: string;
  renderLogo: (sizeClass?: string) => React.ReactNode;
}

export function resolveWatchUrl(item?: Partial<MCUItem> | null): string {
  if (item?.urlOficial) return item.urlOficial;
  
  const isBrandNewDay = Boolean(
    item &&
      (item.id === 'up-spider-man-4' ||
        item.titulo?.toLowerCase().includes('brand new day') ||
        item.tituloOriginal?.toLowerCase().includes('brand new day'))
  );

  if (isBrandNewDay) {
    return 'https://www.sonypictures.com/movies';
  }

  return 'https://www.disneyplus.com';
}

export function getPlatformInfo(rawUrl?: string, item?: Partial<MCUItem> | null): PlatformInfo {
  const watchUrl = rawUrl || resolveWatchUrl(item);

  const isMercadoPlay = Boolean(watchUrl.includes('mercadolibre'));
  const isPrimeVideo = Boolean(watchUrl.includes('primevideo'));
  const isDisney = Boolean(watchUrl.includes('disneyplus'));
  const isSony = Boolean(watchUrl.includes('sonypictures'));

  let type: PlatformType = 'official';
  let tooltip = 'Ver en sitio oficial';
  let buttonClasses = 'tactile-watch-btn tactile-watch-official';

  if (isMercadoPlay) {
    type = 'mercadoPlay';
    tooltip = 'Ver en Mercado Play (Sitio oficial)';
    buttonClasses = 'tactile-watch-btn tactile-watch-mercadoplay';
  } else if (isPrimeVideo) {
    type = 'primeVideo';
    tooltip = 'Ver en Prime Video (Sitio oficial)';
    buttonClasses = 'tactile-watch-btn tactile-watch-prime';
  } else if (isDisney) {
    type = 'disney';
    tooltip = 'Ver en Disney+ (Sitio oficial)';
    buttonClasses = 'tactile-watch-btn tactile-watch-disney';
  } else if (isSony) {
    type = 'sony';
    tooltip = 'Ver en Sony Pictures (Sitio oficial)';
    buttonClasses = 'tactile-watch-btn tactile-watch-official';
  }

  const renderLogo = (sizeClass = 'w-3.5 h-3.5 sm:w-4 sm:h-4') => {
    if (isMercadoPlay) {
      return (
        <img
          src="/logos-plataformas/mercado-libre-logo.png"
          alt="Mercado Libre"
          className={`${sizeClass} object-contain shrink-0 transition-transform group-hover/watch:scale-110`}
        />
      );
    }
    if (isPrimeVideo) {
      return (
        <img
          src="/logos-plataformas/amazon-prime-video.png"
          alt="Prime Video"
          className={`${sizeClass} object-contain rounded-xs shrink-0 shadow-2xs transition-transform group-hover/watch:scale-110`}
        />
      );
    }
    if (isDisney) {
      return (
        <span className={`${sizeClass} rounded-full overflow-hidden shrink-0 flex items-center justify-center transition-transform group-hover/watch:scale-110 shadow-2xs`}>
          <img
            src="/logos-plataformas/Disney_plus_icon.png"
            alt="Disney+"
            className="w-full h-full object-cover scale-110"
          />
        </span>
      );
    }
    return (
      <ExternalLink className="w-3 h-3 text-white/70 group-hover/watch:text-white transition-colors shrink-0" />
    );
  };

  return {
    type,
    watchUrl,
    tooltip,
    buttonClasses,
    renderLogo,
  };
}
