import React from 'react';
import { MCUItem } from '../../types/mcu';
import { getPlatformInfo } from '../../utils/platformHelper';

interface DoomsdayWatchButtonProps {
  prod?: MCUItem;
  label?: string;
  customTitle?: string;
}

export const DoomsdayWatchButton: React.FC<DoomsdayWatchButtonProps> = ({
  prod,
  label,
  customTitle,
}) => {
  if (!prod) return null;
  const platformInfo = getPlatformInfo(prod.urlOficial, prod);
  const displayLabel = label || platformInfo.label;

  if (platformInfo.inTheaters) {
    return (
      <div
        title={customTitle || platformInfo.tooltip}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide select-none cursor-default ${platformInfo.buttonClasses}`}
      >
        {platformInfo.renderLeadingIcon('w-3 h-3')}
        <span>{displayLabel}</span>
      </div>
    );
  }

  return (
    <a
      href={platformInfo.watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={customTitle || platformInfo.tooltip}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch ${platformInfo.buttonClasses}`}
    >
      {platformInfo.renderLeadingIcon('w-3 h-3')}
      <span>{displayLabel}</span>
      {platformInfo.renderLogo()}
    </a>
  );
};
