import React from 'react';

interface RoutePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoutePreviewModal: React.FC<RoutePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl p-space-lg shadow-2xl space-y-6 border border-outline-variant/30">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">alt_route</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
              Scheduled Multi-Pickup Transit Manifest
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container text-secondary"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/20">
            <div>
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Vehicle: Tata Ultra EV 25T (GJ-23-E-8821)
              </span>
              <p className="text-[12px] text-on-surface-variant">Refrigerated Container • Active Cold Chain Monitored</p>
            </div>
            <span className="font-label-md text-label-md bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-bold text-[11px]">
              Driver Assigned
            </span>
          </div>

          {/* Waypoint Schedule */}
          <ol className="relative border-l-2 border-primary-container ml-4 space-y-6 py-2">
            <li className="ml-6">
              <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-primary text-on-primary rounded-full ring-4 ring-surface-container-lowest text-[10px] font-bold">
                1
              </span>
              <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                06:00 AM • Anand Krishak Hub
              </h4>
              <p className="font-body-sm text-body-sm text-secondary text-[12px]">
                Load 8.0 MT Grade-A (Palletized). Temperature lock: 12°C.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-primary text-on-primary rounded-full ring-4 ring-surface-container-lowest text-[10px] font-bold">
                2
              </span>
              <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                07:15 AM • Kheda Green Prod. Co Dock
              </h4>
              <p className="font-body-sm text-body-sm text-secondary text-[12px]">
                Load 5.0 MT Grade-A (Crates). Inspection signed by QCI Agent #44.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-primary text-on-primary rounded-full ring-4 ring-surface-container-lowest text-[10px] font-bold">
                3
              </span>
              <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                08:10 AM • Charotar Krishi Sangh
              </h4>
              <p className="font-body-sm text-body-sm text-secondary text-[12px]">
                Load 5.0 MT Grade-A (Crates). Pre-cooling verify OK.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-primary text-on-primary rounded-full ring-4 ring-surface-container-lowest text-[10px] font-bold">
                4
              </span>
              <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                10:45 AM • BigBasket Central DC, Sanand
              </h4>
              <p className="font-body-sm text-body-sm text-secondary text-[12px]">
                Unload 22.0 MT pooled lot. Automated digital GRN generated.
              </p>
            </li>
          </ol>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/20">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-semibold hover:bg-primary-container transition-colors shadow-xs"
            type="button"
          >
            Close Route Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
