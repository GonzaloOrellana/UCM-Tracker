import React from 'react';

interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const ComicButton: React.FC<ComicButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  let baseStyles = 'font-display uppercase tracking-wider rounded-none transition-all duration-150 cursor-pointer inline-flex items-center justify-center gap-2 select-none';

  let variantStyles = '';

  if (variant === 'primary') {
    variantStyles = 'bg-[#bb0013] hover:bg-[#a00010] text-white text-base sm:text-lg px-5 py-2 border-2 border-[#1a1c1c] shadow-[4px_4px_0px_#1a1c1c] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-[#ffffff] hover:bg-[#f3f3f3] text-[#1a1c1c] text-base sm:text-lg px-4 py-2 border-2 border-[#1a1c1c] shadow-[4px_4px_0px_#1a1c1c] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-[#bb0013] hover:underline text-base sm:text-lg px-3 py-1.5 font-normal';
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
