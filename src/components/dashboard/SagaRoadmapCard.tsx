import React from 'react';
import { motion } from 'framer-motion';

interface SagaRoadmapCardProps {
  phases: Record<string, { total: number; watched: number; percentage: number }>;
}

// SVG Node Helper for Roadmap with Tactile Convex Lens Diode Styling
const renderRoadmapNode = (
  cx: number,
  cy: number,
  pct: number,
  color: string,
  labelBottom: string,
  filterId: string
) => {
  const r = 17;
  const circ = 2 * Math.PI * r; // ~106.8
  const offset = circ - (circ * pct) / 100;

  return (
    <g key={labelBottom} className="cursor-default group/node">
      {/* Outer Beveled Metallic Socket Ring */}
      <circle cx={cx} cy={cy} r={r + 3.5} fill="#080911" stroke="#25283E" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="#141625" stroke="#1D2033" strokeWidth="1" />

      {/* Inner Core Lens with Convex Reflection */}
      <circle cx={cx} cy={cy} r={r - 3.5} fill="url(#node-lens-gradient)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />

      {/* Specular Micro Reflection Spot */}
      <circle cx={cx - 4.5} cy={cy - 4.5} r="1.5" fill="rgba(255,255,255,0.4)" />

      {/* Progress Arc with Glowing Emission */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        filter={`url(#${filterId})`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />

      {/* Percentage Number in Center */}
      <text
        x={cx}
        y={cy + 3.5}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={pct >= 100 ? '9.5' : '10.5'}
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
      >
        {pct}%
      </text>

      {/* Label Bottom */}
      <text
        x={cx}
        y={cy + 33}
        textAnchor="middle"
        fill="#A1A1AA"
        fontSize="11"
        fontWeight="600"
        fontFamily="Space Grotesk, sans-serif"
      >
        {labelBottom}
      </text>
    </g>
  );
};

export const SagaRoadmapCard: React.FC<SagaRoadmapCardProps> = ({ phases }) => {
  const p1 = phases['Fase 1']?.percentage || 0;
  const p2 = phases['Fase 2']?.percentage || 0;
  const p3 = phases['Fase 3']?.percentage || 0;
  const p4 = phases['Fase 4']?.percentage || 0;
  const p5 = phases['Fase 5']?.percentage || 0;
  const p6 = phases['Fase 6']?.percentage || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.3, 1] }}
      className="md:col-span-1 lg:col-span-3 flex flex-col min-h-0 h-full"
    >
      <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">
        {/* Header */}
        <div>
          <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-none">
            Saga Roadmap
          </h3>
        </div>

        {/* Continuous SVG Circuit Diagram with Glow Defs */}
        <div className="my-auto py-0.5 flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 320 250" className="w-full h-full max-h-[145px] sm:max-h-[195px] xl:max-h-[235px] object-contain select-none">
            <defs>
              <radialGradient id="node-lens-gradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#2D304A" />
                <stop offset="50%" stopColor="#141626" />
                <stop offset="100%" stopColor="#080911" />
              </radialGradient>
              <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00A8FF" floodOpacity="0.75" />
              </filter>
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E62429" floodOpacity="0.75" />
              </filter>
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#10B981" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* Section 1 Title: The Infinity Saga */}
            <text
              x="8"
              y="20"
              fill="#FFFFFF"
              fontSize="13"
              fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif"
            >
              The Infinity Saga
            </text>

            {/* 1. Straight Blue Line from Phase 1 to Phase 2 */}
            <line x1="50" y1="62" x2="160" y2="62" stroke="#00A8FF" strokeWidth="2.5" strokeOpacity="0.85" />

            {/* 2. Straight Blue Line from Phase 2 to Phase 3 */}
            <line x1="160" y1="62" x2="270" y2="62" stroke="#00A8FF" strokeWidth="2.5" strokeOpacity="0.85" />

            {/* 3. Rectangular Pipeline Connecting Line (Marvel Red #E62429) from Phase 3 to Phase 4 */}
            <path
              d="M 270 62 L 298 62 A 10 10 0 0 1 308 72 L 308 120 A 10 10 0 0 1 298 130 L 22 130 A 10 10 0 0 0 12 140 L 12 188 A 10 10 0 0 0 22 198 L 50 198"
              stroke="#E62429"
              strokeWidth="3"
              strokeOpacity="0.85"
              fill="none"
            />

            {/* Section 2 Title: The Multiverse Saga (placed under horizontal connecting line) */}
            <text
              x="24"
              y="154"
              fill="#FFFFFF"
              fontSize="13"
              fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif"
            >
              The Multiverse Saga
            </text>

            {/* 4. Straight Green Line from Phase 4 to Phase 5 */}
            <line x1="50" y1="198" x2="160" y2="198" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.85" />

            {/* 5. Straight Green Line from Phase 5 to Phase 6 */}
            <line x1="160" y1="198" x2="270" y2="198" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.85" />

            {/* Nodes Row 1 (Infinity Saga - Blue) */}
            {renderRoadmapNode(50, 62, p1, '#00A8FF', 'Fase 1', 'glow-blue')}
            {renderRoadmapNode(160, 62, p2, '#00A8FF', 'Fase 2', 'glow-blue')}
            {renderRoadmapNode(270, 62, p3, '#00A8FF', 'Fase 3', 'glow-blue')}

            {/* Nodes Row 2 (Multiverse Saga - Red & Green) */}
            {renderRoadmapNode(50, 198, p4, '#E62429', 'Fase 4', 'glow-red')}
            {renderRoadmapNode(160, 198, p5, '#10B981', 'Fase 5', 'glow-green')}
            {renderRoadmapNode(270, 198, p6, '#10B981', 'Fase 6', 'glow-green')}
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
