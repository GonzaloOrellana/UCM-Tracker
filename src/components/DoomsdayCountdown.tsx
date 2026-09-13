import React, { useState, useEffect } from 'react';

export interface CountdownTime {
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

// Target release date: 18 de Diciembre de 2026 (Avengers: Doomsday)
const TARGET_DATE = new Date('2026-12-18T00:00:00');

export const calculateDoomsdayCountdown = (targetDate: Date = TARGET_DATE): CountdownTime => {
  const now = new Date();
  if (now >= targetDate) {
    return {
      months: '00',
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isExpired: true,
    };
  }

  const y1 = now.getFullYear();
  const m1 = now.getMonth();
  const d1 = now.getDate();
  const h1 = now.getHours();
  const min1 = now.getMinutes();
  const s1 = now.getSeconds();

  const y2 = targetDate.getFullYear();
  const m2 = targetDate.getMonth();
  const d2 = targetDate.getDate();
  const h2 = targetDate.getHours();
  const min2 = targetDate.getMinutes();
  const s2 = targetDate.getSeconds();

  let seconds = s2 - s1;
  let minutes = min2 - min1;
  let hours = h2 - h1;
  let days = d2 - d1;
  let months = (y2 - y1) * 12 + (m2 - m1);

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonthDate = new Date(y2, m2, 0);
    days += prevMonthDate.getDate();
    months--;
  }
  if (months < 0) {
    months = 0;
  }

  return {
    months: String(months).padStart(2, '0'),
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false,
  };
};

export const DoomsdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculateDoomsdayCountdown(TARGET_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateDoomsdayCountdown(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-1 pb-3 sm:pb-4 select-none">
      {/* Mystic Emerald Ambient Glow behind the countdown (evoking Doctor Doom & stained glass from Marvel teaser) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] md:w-[620px] h-[90px] sm:h-[120px] bg-emerald-500/[0.13] rounded-full blur-[60px] sm:blur-[80px] pointer-events-none -z-10" />

      {/* Main Countdown Row with Numbers & Colons */}
      <div className="flex items-start justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6">
        {/* MESES */}
        <div className="flex flex-col items-center min-w-[42px] sm:min-w-[56px] md:min-w-[70px]">
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] tabular-nums">
            {timeLeft.months}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 tracking-[0.22em] sm:tracking-[0.28em] uppercase font-display mt-1 sm:mt-1.5">
            Meses
          </span>
        </div>

        {/* Separator */}
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-emerald-400/80 select-none pt-0.5 sm:pt-1 font-display">
          :
        </span>

        {/* DÍAS */}
        <div className="flex flex-col items-center min-w-[42px] sm:min-w-[56px] md:min-w-[70px]">
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] tabular-nums">
            {timeLeft.days}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 tracking-[0.22em] sm:tracking-[0.28em] uppercase font-display mt-1 sm:mt-1.5">
            Días
          </span>
        </div>

        {/* Separator */}
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-emerald-400/80 select-none pt-0.5 sm:pt-1 font-display">
          :
        </span>

        {/* HORAS */}
        <div className="flex flex-col items-center min-w-[42px] sm:min-w-[56px] md:min-w-[70px]">
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] tabular-nums">
            {timeLeft.hours}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 tracking-[0.22em] sm:tracking-[0.28em] uppercase font-display mt-1 sm:mt-1.5">
            Horas
          </span>
        </div>

        {/* Separator */}
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-emerald-400/80 select-none pt-0.5 sm:pt-1 font-display">
          :
        </span>

        {/* MINUTOS */}
        <div className="flex flex-col items-center min-w-[42px] sm:min-w-[56px] md:min-w-[70px]">
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] tabular-nums">
            {timeLeft.minutes}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 tracking-[0.22em] sm:tracking-[0.28em] uppercase font-display mt-1 sm:mt-1.5">
            Minutos
          </span>
        </div>

        {/* Separator */}
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-emerald-400/80 select-none pt-0.5 sm:pt-1 font-display">
          :
        </span>

        {/* SEGUNDOS */}
        <div className="flex flex-col items-center min-w-[42px] sm:min-w-[56px] md:min-w-[70px]">
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] tabular-nums">
            {timeLeft.seconds}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 tracking-[0.22em] sm:tracking-[0.28em] uppercase font-display mt-1 sm:mt-1.5">
            Segundos
          </span>
        </div>
      </div>

      {/* Official Marvel Teaser Copyright / Subtitle (Replicating exact trailer layout) */}
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-[9px] sm:text-[11px] text-zinc-400/90 tracking-widest font-display">
        <img
          src="/vecteezy_marvel-comics-logotype_.jpg"
          alt="Marvel"
          className="h-3.5 sm:h-4 w-auto object-contain rounded-[2px] shadow-sm select-none"
        />
        <span className="font-medium tracking-[0.22em] uppercase text-zinc-300">
          © 2026 MARVEL • 18 DE DICIEMBRE EN CINES
        </span>
      </div>
    </div>
  );
};
