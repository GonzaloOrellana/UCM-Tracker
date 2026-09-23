import React from 'react';
import { Check } from 'lucide-react';

interface TactileSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md';
  className?: string;
  title?: string;
}

export const TactileSwitch: React.FC<TactileSwitchProps> = React.memo(({
  checked,
  onChange,
  size = 'md',
  className = '',
  title,
}) => {
  const isSm = size === 'sm';
  const defaultTitle = checked ? 'Marcar como no visto' : 'Marcar como visto';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      title={title || defaultTitle}
      className={`rounded-full p-0.5 transition-all duration-200 cursor-pointer flex items-center active:scale-90 ${
        isSm ? 'w-9 h-5' : 'w-11 h-6'
      } ${
        checked
          ? 'tactile-switch-active'
          : 'tactile-switch-well'
      } ${className}`}
    >
      <span
        className={`rounded-full tactile-switch-thumb transform transition-transform duration-200 flex items-center justify-center ${
          isSm ? 'w-3.5 h-3.5' : 'w-5 h-5'
        } ${
          checked
            ? isSm ? 'translate-x-4' : 'translate-x-5'
            : 'translate-x-0'
        }`}
      >
        {checked && (
          <Check
            className={`${
              isSm ? 'w-2.5 h-2.5' : 'w-3 h-3'
            } text-emerald-800 stroke-[3.5]`}
          />
        )}
      </span>
    </button>
  );
});
