import React, { useState } from 'react';
import { cn, Icon, PageHeader, Section, Card, Badge, Button, Progress, KeyValue } from '../ui';

interface LogisticsScreenProps {
  onShowToast: (msg: string) => void;
}

interface Vehicle {
  id: string;
  type: string;
  driver: string;
  route: string;
  speed: string;
  temp: string;
  humidity: string;
  status: string;
  eta: string;
  progress: number;
}

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'GJ-23-AX-8912',
    type: 'Tata Ultra Electric Reefer (25T)',
    driver: 'Ramesh Patel (+91 98251-XXXXX)',
    route: 'Anand Hub → Kheda Dock → NE-1 → Ahmedabad DC',
    speed: '58 km/h',
    temp: '8.2°C',
    humidity: '88% RH',
    status: 'In Transit (On-Time)',
    eta: '10:45 AM',
    progress: 64,
  },
  {
    id: 'GJ-07-BB-4421',
    type: 'Eicher Pro 3019 Cold Liner',
    driver: 'Kiran Desai (+91 94280-XXXXX)',
    route: 'Charotar Collection Bay → Sanand DC',
    speed: '44 km/h',
    temp: '7.8°C',
    humidity: '85% RH',
    status: 'Loading Waypoint 2',
    eta: '11:15 AM',
    progress: 38,
  },
];

export const LogisticsScreen: React.FC<LogisticsScreenProps> = ({ onShowToast }) => {
  const [vehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedId, setSelectedId] = useState<string | null>(vehicles[0]?.id ?? null);
  const [backhaulReserved, setBackhaulReserved] = useState(false);

  const selected = vehicles.find((v) => v.id === selectedId) || null;

  const handleGenerateWaybill = (vehicleId: string) => {
    onShowToast(`Generated GST e-Waybill & transit RFID token for vehicle ${vehicleId}!`);
  };

  const handleReserveBackhaul = () => {
    setBackhaulReserved(true);
    onShowToast('Backhaul Slot Reserved! E-Truck GJ-23-AX-8912 notified for Anand Toll pickup at 14:15.');
  };

  return (
    <div className="kf-fade-up">
      <PageHeader title="Logistics" subtitle="Live cold-chain fleet, route optimization and reverse-logistics matching." />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: shipment list */}
        <Card className="overflow-hidden xl:col-span-5">
          <div className="border-b border-line px-5 py-4">
            <h2 className="kf-section-title">Active shipments</h2>
            <p className="kf-helper mt-0.5">Select a vehicle for full telemetry</p>
          </div>
          <div className="divide-y divide-line">
            {vehicles.map((v) => {
              const active = v.id === selectedId;
              const alerted = v.temp.includes('12');
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedId(v.id)}
                  className={cn(
                    'w-full px-5 py-4 text-left transition-colors',
                    active ? 'bg-primary-subtle' : 'hover:bg-subtle',
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={cn('flex h-8 w-8 items-center justify-center rounded-md', alerted ? 'bg-bad-bg text-bad' : 'bg-primary-soft text-primary')}>
                        <Icon name={alerted ? 'warning' : 'local_shipping'} size={17} />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-ink">{v.id}</p>
                        <p className="text-[11px] text-muted">{v.type}</p>
                      </div>
                    </div>
                    <Badge tone={alerted ? 'bad' : v.status.includes('Loading') ? 'warn' : 'good'} dot>
                      {alerted ? 'Temp alert' : v.status.includes('Loading') ? 'Loading' : 'On time'}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1 flex-1 rounded-full bg-line">
                      <div
                        className={cn('h-full rounded-full', alerted ? 'bg-bad' : 'bg-primary')}
                        style={{ width: `${v.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-muted">ETA {v.eta}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-muted">
                    <Icon name="route" size={13} className="text-primary" />
                    {v.route}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Backhaul */}
          <div className="border-t border-line p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-ink">Reverse logistics available</h3>
              <Badge tone="warn" dot>Active now</Badge>
            </div>
            <p className="kf-helper mt-1.5">
              E-Truck <strong className="text-ink">GJ-23-AX-8912</strong> returns empty from Ahmedabad · 40 crates free ·
              passing Anand toll at 14:15. Save ₹400/trip.
            </p>
            <Button size="sm" className="mt-3 w-full" icon="sync_alt" onClick={handleReserveBackhaul} disabled={backhaulReserved}>
              {backhaulReserved ? 'Backhaul slot reserved' : 'Reserve backhaul slot'}
            </Button>
          </div>
        </Card>

        {/* Right: map + details */}
        <div className="flex flex-col gap-4 xl:col-span-7">
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-[12px] font-medium text-muted">Route map · SH-188 / NE-1 corridor</p>
              <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-good kf-live-dot" /> Live GPS sync
              </span>
            </div>
            {/* Stylized map canvas */}
            <div className="relative h-72 w-full bg-subtle">
              <svg className="h-full w-full" viewBox="0 0 640 288" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M32 0H0V32" fill="none" stroke="#e8e6e0" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="640" height="288" fill="#fbfaf8" />
                <rect width="640" height="288" fill="url(#grid)" />
                {/* Route line */}
                <path d="M 40 230 L 150 190 L 260 150 L 400 92 L 580 40" fill="none" stroke="#1c7c47" strokeWidth="3" strokeDasharray="1 0" opacity="0.85" />
                <path d="M 40 230 L 150 190 L 260 150 L 400 92 L 580 40" fill="none" stroke="#1c7c47" strokeWidth="6" opacity="0.15" />
                {/* Waypoints */}
                {[
                  { x: 40, y: 230, label: 'Anand' },
                  { x: 150, y: 190, label: 'Kheda' },
                  { x: 260, y: 150, label: 'Charotar' },
                  { x: 400, y: 92, label: 'NE-1' },
                  { x: 580, y: 40, label: 'Sanand DC' },
                ].map((w, i) => (
                  <g key={i}>
                    <circle cx={w.x} cy={w.y} r={i === 0 ? 9 : 6} fill={i === 0 ? '#1c7c47' : '#ffffff'} stroke="#1c7c47" strokeWidth="2.5" />
                    <text x={w.x} y={w.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#3c4a45" fontFamily="Inter, sans-serif">
                      {w.label}
                    </text>
                  </g>
                ))}
                {/* Moving truck */}
                <g>
                  <circle cx="260" cy="150" r="5" fill="#1c7c47" className="kf-live-dot" />
                </g>
              </svg>
              <div className="absolute right-3 top-3 rounded-md border border-line bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-ink shadow-card">
                52.4 km · 1 hr 10 min
              </div>
            </div>
          </Card>

          {/* Bottom details */}
          {selected && (
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[15px] font-bold text-ink">{selected.id}</p>
                  <p className="kf-helper mt-0.5">{selected.driver} · {selected.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" icon="receipt_long" onClick={() => handleGenerateWaybill(selected.id)}>
                    Generate e-Waybill
                  </Button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Reefer temp', value: selected.temp, icon: 'ac_unit', tone: selected.temp.includes('12') ? 'bad' : 'good' },
                  { label: 'Humidity', value: selected.humidity, icon: 'water_drop', tone: 'good' },
                  { label: 'Speed', value: selected.speed, icon: 'speed', tone: 'good' },
                  { label: 'Dock ETA', value: selected.eta, icon: 'schedule', tone: 'good' },
                ].map((c) => (
                  <div key={c.label} className="rounded-md border border-line bg-subtle p-3">
                    <div className="flex items-center gap-1.5">
                      <Icon name={c.icon} size={14} className="text-primary" />
                      <p className="text-[10.5px] uppercase tracking-wide text-faint">{c.label}</p>
                    </div>
                    <p className={cn('mt-1 text-[16px] font-bold', c.tone === 'bad' ? 'text-bad' : 'text-ink')}>{c.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                <KeyValue k="Route" v={selected.route} />
                <KeyValue k="Status" v={selected.status} />
                <KeyValue k="Freshness window" v={selected.id === 'GJ-23-AX-8912' ? '18h remaining' : '22h remaining'} />
                <KeyValue k="Cold-chain integrity" v="99.2% · all probes nominal" />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};