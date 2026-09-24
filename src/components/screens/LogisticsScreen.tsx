import React, { useState } from 'react';

interface LogisticsScreenProps {
  onShowToast: (msg: string) => void;
}

export const LogisticsScreen: React.FC<LogisticsScreenProps> = ({ onShowToast }) => {
  const [activeVehicles] = useState([
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
    },
  ]);

  const handleGenerateWaybill = (vehicleId: string) => {
    onShowToast(`Generated GST e-Waybill & transit RFID token for vehicle ${vehicleId}!`);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Context */}
      <div>
        <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
          <span className="text-primary font-semibold">Fleet Operations &amp; Cold Chain Dispatch</span>
          <span>·</span>
          <span>Automated OR-Tools Multi-Stop Optimization</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Logistics &amp; Routing Optimizer
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] max-w-3xl mt-0.5">
          Real-time cold-chain vehicle telemetry, backhaul matching, and multi-FPO consolidated milk-run routing across National Expressway 1 (NE-1) and State Highway 188.
        </p>
      </div>

      {/* Live Fleet Cards */}
      <div className="space-y-3">
        {activeVehicles.map((v) => (
          <div
            key={v.id}
            className="p-3.5 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-on-surface text-[14px]">
                  {v.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[11px]">
                  {v.status}
                </span>
                <span className="text-[12px] text-on-surface-variant font-medium">• {v.type}</span>
              </div>

              <p className="text-[13px] text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">route</span>
                {v.route}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[12px]">
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant/20">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Reefer Temp</span>
                  <span className="font-bold text-primary text-[14px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">ac_unit</span> {v.temp}
                  </span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant/20">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Relative Humidity</span>
                  <span className="font-bold text-on-surface text-[14px]">{v.humidity}</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant/20">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Current Velocity</span>
                  <span className="font-bold text-on-surface text-[14px]">{v.speed}</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant/20">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Dock ETA</span>
                  <span className="font-bold text-primary text-[14px]">{v.eta}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end lg:items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleGenerateWaybill(v.id)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-[12px] border border-outline-variant/30 flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                Generate e-Waybill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
