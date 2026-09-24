/* Shared chart styling so every chart on the platform looks consistent. */
import React from 'react';

export const CHART_COLORS = {
  primary: '#1c7c47',
  primaryStrong: '#125631',
  primarySoft: '#7cc49b',
  ink: '#1c2623',
  muted: '#6b7a74',
  faint: '#98a49f',
  line: '#e8e6e0',
  lineStrong: '#d8d5cd',
  good: '#1a7b45',
  warn: '#b07d1a',
  bad: '#c23b2e',
  navy: '#22303c',
  slate: '#5b7183',
  grid: '#ecebe6',
};

export const axisTick = {
  fontSize: 11,
  fill: CHART_COLORS.muted,
  fontFamily: 'Inter, sans-serif',
};

export const axisStyle = { axisLine: false, tickLine: false, tick: axisTick };

export const cartesianGrid = {
  vertical: false,
  stroke: CHART_COLORS.grid,
  strokeDasharray: '3 4',
};

/* Shared tooltip box — quiet, readable. */
export const ChartTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string; suffix?: string }> = ({
  active,
  payload,
  label,
  suffix = '',
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-md border border-line bg-surface px-3 py-2 shadow-pop"
      style={{ fontSize: 12 }}
    >
      {label && <p className="mb-1 font-semibold text-ink">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 text-muted">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: entry.color || entry.fill || CHART_COLORS.primary }} />
          {entry.name}: <span className="font-semibold text-ink">{entry.value}{suffix}</span>
        </p>
      ))}
    </div>
  );
};

export const legendStyle: React.CSSProperties = {
  fontSize: 11.5,
  fontFamily: 'Inter, sans-serif',
  color: CHART_COLORS.muted,
  paddingTop: 8,
};