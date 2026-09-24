import React from 'react';
import { Icon, Badge, Button } from '../ui';

interface RoutePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoutePreviewModal: React.FC<RoutePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const waypoints = [
    { time: '06:00 AM', place: 'Anand Krishak Hub', detail: 'Load 8.0 MT Grade-A (Palletized). Temperature lock: 12°C.' },
    { time: '07:15 AM', place: 'Kheda Green Prod. Co Dock', detail: 'Load 5.0 MT Grade-A (Crates). Inspection signed by QCI Agent #44.' },
    { time: '08:10 AM', place: 'Charotar Krishi Sangh', detail: 'Load 5.0 MT Grade-A (Crates). Pre-cooling verify OK.' },
    { time: '10:45 AM', place: 'BigBasket Central DC, Sanand', detail: 'Unload 22.0 MT pooled lot. Automated digital GRN generated.' },
  ];

  return (
    <div className="kf-overlay">
      <div className="w-full max-w-2xl rounded-2xl border border-line bg-surface p-6 shadow-pop">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="alt_route" size={20} />
            </span>
            <div>
              <h3 className="text-[16px] font-semibold text-ink">Scheduled Multi-Pickup Transit Manifest</h3>
              <p className="kf-helper">Refrigerated container · active cold chain monitored</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink"
            type="button"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-subtle px-4 py-3">
            <div>
              <p className="text-[13.5px] font-semibold text-ink">Tata Ultra EV 25T (GJ-23-E-8821)</p>
              <p className="kf-helper mt-0.5">Refrigerated Container · Active Cold Chain Monitored</p>
            </div>
            <Badge tone="primary" dot>Driver assigned</Badge>
          </div>

          <ol className="relative ml-4 space-y-6 border-l-2 border-line-strong py-1">
            {waypoints.map((w, i) => (
              <li key={i} className="ml-6">
                <span className="absolute -left-[15px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary ring-4 ring-surface">
                  {i + 1}
                </span>
                <h4 className="text-[13.5px] font-semibold text-ink">
                  {w.time} · {w.place}
                </h4>
                <p className="kf-helper mt-0.5">{w.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex justify-end border-t border-line pt-4">
          <Button icon="alt_route" onClick={onClose}>
            Close Route Inspection
          </Button>
        </div>
      </div>
    </div>
  );
};