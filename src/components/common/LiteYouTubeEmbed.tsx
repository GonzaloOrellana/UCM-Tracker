import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  customThumbnail?: string;
}

export const LiteYouTubeEmbed: React.FC<LiteYouTubeEmbedProps> = React.memo(({
  videoId,
  title,
  className = '',
  customThumbnail,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback to high quality YouTube thumbnail if not provided
  const thumbnailUrl =
    customThumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Reproducir video: ${title}`}
      className={`group/video relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer select-none bg-zinc-950 border border-emerald-500/25 shadow-[0_0_25px_rgba(16,185,129,0.12)] transition-all duration-300 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] ${className}`}
    >
      {/* Background Poster Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover/video:opacity-95"
      />

      {/* Dark Ambient Vignette Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />

      {/* Center Tactical Glass Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 flex items-center justify-center text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover/video:scale-110 group-hover/video:bg-emerald-500/35 group-hover/video:border-emerald-300 transition-all duration-300">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-0.5" />
        </div>
      </div>

      {/* Video Title Banner on Bottom */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
        <p className="font-display text-xs sm:text-sm font-semibold text-white/90 truncate drop-shadow-md">
          {title}
        </p>
      </div>
    </div>
  );
});
