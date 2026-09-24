import React, { useState } from 'react';
import { ProduceLot } from '../../types';

interface ProduceLotsScreenProps {
  lots: ProduceLot[];
  onOpenCreateLotModal: () => void;
  onShowToast: (msg: string) => void;
}

export const ProduceLotsScreen: React.FC<ProduceLotsScreenProps> = ({
  lots,
  onOpenCreateLotModal,
  onShowToast,
}) => {
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');

  const filteredLots =
    selectedCropFilter === 'All'
      ? lots
      : lots.filter((l) => l.crop.toLowerCase() === selectedCropFilter.toLowerCase());

  const handlePrintQr = (lotId: string) => {
    onShowToast(`Printing IoT RFID QR manifest for batch ${lotId}... Ready for crate affixation.`);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
            <span className="text-primary font-semibold">Digital Produce Inventory</span>
            <span>·</span>
            <span>IoT Telemetry &amp; Quality Assay Records</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Produce Lots &amp; Quality Registry
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] max-w-3xl mt-0.5">
            Cryptographically sealed harvest batches with spectral Brix assays, continuous temperature sensors, and dynamic shelf-life decay estimation.
          </p>
        </div>

        <button
          onClick={onOpenCreateLotModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-on-primary font-semibold shadow-xs hover:bg-primary-container transition-all text-[11.5px] self-start sm:self-auto"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Register New Produce Lot</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5">
        {['All', 'Tomato', 'Potato'].map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCropFilter(crop)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedCropFilter === crop
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
            type="button"
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredLots.map((lot) => {
          const isCritical = lot.freshnessRemainingHrs <= 30;
          return (
            <div
              key={lot.id}
              className="p-3 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-on-surface">{lot.id}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase ${
                      isCritical
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {isCritical ? `Expiring <${lot.freshnessRemainingHrs}h` : 'Stable (Cold Hub)'}
                  </span>
                </div>

                <h3 className="font-bold text-on-surface mt-1 text-[13px]">
                  {lot.variety}
                </h3>
                <p className="text-on-surface-variant text-[11px]">
                  {lot.location}
                </p>

                <div className="grid grid-cols-2 gap-2 my-2 p-1.5 bg-surface-container-low rounded border border-outline-variant/20 text-[11px]">
                  <div>
                    <span className="text-on-surface-variant block text-[9.5px] uppercase">Tonnage</span>
                    <span className="font-bold text-on-surface text-[12.5px]">{lot.tonnage.toFixed(1)} MT</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[9.5px] uppercase">Temperature</span>
                    <span className="font-bold text-primary text-[12.5px]">{lot.temperature}°C</span>
                  </div>
                </div>

                {/* Freshness Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-on-surface-variant">
                    <span>Quality Index</span>
                    <span className="font-bold text-on-surface">{lot.qualityRetainedPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isCritical ? 'bg-error' : 'bg-primary'}`}
                      style={{ width: `${lot.qualityRetainedPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-[12px]">
                <span className="text-on-surface-variant font-medium text-[11px]">
                  Harvested {lot.harvestHoursAgo}h ago
                </span>
                <button
                  onClick={() => handlePrintQr(lot.id)}
                  className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold flex items-center gap-1 text-[11px]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">qr_code</span>
                  Print QR
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
