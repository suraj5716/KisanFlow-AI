import React, { useState } from 'react';
import { ProduceLot } from '../../types';
import { cn, Icon, PageHeader, Section, Card, Badge, Button, Progress, Drawer, KeyValue } from '../ui';

interface ProduceLotsScreenProps {
  lots: ProduceLot[];
  onOpenCreateLotModal: () => void;
  onShowToast: (msg: string) => void;
}

const CROPS = ['All', 'Tomato', 'Potato'];

export const ProduceLotsScreen: React.FC<ProduceLotsScreenProps> = ({
  lots,
  onOpenCreateLotModal,
  onShowToast,
}) => {
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [selectedLot, setSelectedLot] = useState<ProduceLot | null>(null);

  const filteredLots =
    selectedCropFilter === 'All'
      ? lots
      : lots.filter((l) => l.crop.toLowerCase() === selectedCropFilter.toLowerCase());

  const handlePrintQr = (lotId: string) => {
    onShowToast(`Printing IoT RFID QR manifest for batch ${lotId}... Ready for crate affixation.`);
  };

  const selected = selectedLot;

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Produce Lots"
        eyebrow="Digital Produce Inventory · IoT Telemetry & Quality Assay Records"
        subtitle="Cryptographically sealed harvest batches with spectral Brix assays, continuous temperature sensors, and dynamic shelf-life decay estimation."
        actions={
          <Button icon="add_circle" onClick={onOpenCreateLotModal}>
            Register New Produce Lot
          </Button>
        }
      />

      {/* Crop filter */}
      <div className="mt-3 flex items-center gap-1 rounded-lg border border-line bg-surface p-1 w-fit">
        {CROPS.map((crop) => (
          <button
            key={crop}
            type="button"
            onClick={() => setSelectedCropFilter(crop)}
            className={cn(
              'rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
              selectedCropFilter === crop ? 'bg-primary text-on-primary' : 'text-muted hover:bg-subtle',
            )}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Lots grid */}
      <Section title={`${filteredLots.length} sealed lots`} subtitle="Click any lot to open its quality assay record" spacing>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredLots.map((lot) => {
            const isCritical = lot.freshnessRemainingHrs <= 30;
            return (
              <Card key={lot.id} className="group p-4 transition-all hover:-translate-y-0.5 hover:shadow-pop">
                <button type="button" className="w-full text-left" onClick={() => setSelectedLot(lot)}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[11px] font-bold text-ink">{lot.id}</p>
                      <h3 className="mt-0.5 text-[15px] font-semibold text-ink">{lot.variety}</h3>
                      <p className="kf-helper mt-0.5">{lot.location}</p>
                    </div>
                    <Badge tone={isCritical ? 'bad' : 'good'} dot>
                      {isCritical ? `Expiring <${lot.freshnessRemainingHrs}h` : 'Stable (Cold Hub)'}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-line bg-subtle p-2.5 text-center">
                    <div>
                      <p className="kf-eyebrow">Tonnage</p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-ink">{lot.tonnage.toFixed(1)} MT</p>
                    </div>
                    <div>
                      <p className="kf-eyebrow">Temp</p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-primary">{lot.temperature}°C</p>
                    </div>
                    <div>
                      <p className="kf-eyebrow">Shelf-life</p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-ink">{lot.freshnessRemainingHrs}h</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="kf-helper">Quality index</span>
                      <span className="font-bold text-ink">{lot.qualityRetainedPercent}%</span>
                    </div>
                    <div className="mt-1">
                      <Progress value={lot.qualityRetainedPercent} tone={isCritical ? 'bad' : 'good'} />
                    </div>
                  </div>
                </button>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="kf-helper">Harvested {lot.harvestHoursAgo}h ago</span>
                  <div className="flex gap-1.5">
                    <Button variant="ghost" size="sm" icon="assessment" onClick={() => setSelectedLot(lot)}>
                      Assay
                    </Button>
                    <Button variant="ghost" size="sm" icon="qr_code" onClick={() => handlePrintQr(lot.id)}>
                      Print QR
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Assay drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelectedLot(null)}
        title={selected ? `${selected?.variety} — assay record` : undefined}
        subtitle={selected?.id}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-md border border-line bg-subtle p-3 text-center">
                <p className="kf-eyebrow">Brix spectral</p>
                <p className="mt-0.5 text-[15px] font-bold text-ink">7.2° ±0.1</p>
              </div>
              <div className="rounded-md border border-line bg-subtle p-3 text-center">
                <p className="kf-eyebrow">Lyco index</p>
                <p className="mt-0.5 text-[15px] font-bold text-ink">{selected?.qualityRetainedPercent}%</p>
              </div>
              <div className="rounded-md border border-line bg-subtle p-3 text-center">
                <p className="kf-eyebrow">CO₂ respiration</p>
                <p className="mt-0.5 text-[15px] font-bold text-primary">18 ml/kg/h</p>
              </div>
            </div>

            <div className="space-y-1">
              <KeyValue k="Continuous temperature range" v={`${selected?.temperature}°C (probe avg, 6 sensors)`} />
              <KeyValue k="Geohash crate grid" v="GBHV8R · bay C-12" />
              <KeyValue k="Harvest window" v={`${selected?.harvestHoursAgo}h ago (pre-dawn pick)`} />
              <KeyValue k="Freshness decay model" v={selected?.freshnessRemainingHrs && selected.freshnessRemainingHrs < 40 ? 'Accelerating · expedite dispatch' : 'Nominal · stable cold hub'} />
            </div>

            <Button className="w-full" icon="qr_code" onClick={() => handlePrintQr(selected.id)}>
              Print IoT RFID QR manifest
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};