import React, { useState } from 'react';
import {
  cn,
  Icon,
  PageHeader,
  Card,
  Badge,
  Button,
  Progress,
  KeyValue,
} from '../ui';

interface WhatIfSimulatorScreenProps {
  onShowToast: (msg: string) => void;
}

const SCENARIOS = [
  {
    id: 'rain',
    title: 'Unseasonal monsoon in Nashik',
    icon: 'rainy',
    impactSummary: 'Supply from Nashik drops by 45%. Ahmedabad metro deficit widens to 180 MT.',
    deltaPrice: '+₹8.50 / kg',
    recommendedStrategy: 'Accelerate Anand FPO harvest release; expand virtual pool to include Borsad buffer lots immediately.',
  },
  {
    id: 'heatwave',
    title: 'Extreme heatwave (+3.5°C / 72h)',
    icon: 'device_thermostat',
    impactSummary: 'Shelf-life degrades from 48h to 24h. Mandi pit-head open auctions suffer 28% rot penalty.',
    deltaPrice: '+₹5.20 / kg (Reefer premium)',
    recommendedStrategy: 'Mandatory transfer to refrigerated e-truck fleets. Bypass ambient mandi yards completely.',
  },
  {
    id: 'strike',
    title: 'APMC mandi strike',
    icon: 'front_hand',
    impactSummary: 'Wholesale mandi yards closed for 4 days. Retail chains face zero fresh table vegetable inflows.',
    deltaPrice: '+₹11.00 / kg',
    recommendedStrategy: 'Activate GovTech Direct Escrow contracts. Direct delivery to BigBasket, Reliance, and Blinkit dark stores.',
  },
];

const PRESET_RESILIENCE: Record<string, number> = { rain: 94.6, heatwave: 89.3, strike: 98.2 };

export const WhatIfSimulatorScreen: React.FC<WhatIfSimulatorScreenProps> = ({ onShowToast }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('rain');
  const [customHeatwave, setCustomHeatwave] = useState<number>(3.5);
  const [customDieselHike, setCustomDieselHike] = useState<number>(4);

  const handleApplyScenario = (title: string) => {
    onShowToast(`Simulated scenario: "${title}". Algorithmic allocations recalculated!`);
  };

  const active = SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="What-If Analysis"
        subtitle="Stress-test revenue stability and route resilience against weather, strikes and fuel shocks."
      />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: controls */}
        <div className="space-y-4 xl:col-span-5">
          <Card className="p-5">
            <h3 className="kf-section-title">Shock scenario</h3>
            <p className="kf-helper mt-0.5">Pick a preset disruption to replay</p>
            <div className="mt-4 space-y-2">
              {SCENARIOS.map((s) => {
                const isSelected = selectedScenario === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedScenario(s.id);
                      handleApplyScenario(s.title);
                    }}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all',
                      isSelected ? 'border-primary bg-primary-subtle' : 'border-line bg-subtle hover:border-line-strong',
                    )}
                  >
                    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md', isSelected ? 'bg-primary text-on-primary' : 'bg-surface text-muted')}>
                      <Icon name={s.icon} size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-ink">{s.title}</span>
                      <span className="block text-[11.5px] text-muted">{s.deltaPrice} price impact</span>
                    </span>
                    {isSelected && <Icon name="check_circle" size={16} className="ml-auto mt-1 text-primary" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="kf-section-title">Custom micro-shocks</h3>
            <div className="mt-4 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label className="kf-label mb-0">Ambient heat anomaly</label>
                  <span className="text-[13px] font-bold text-primary">+{customHeatwave.toFixed(1)}°C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={customHeatwave}
                  onChange={(e) => setCustomHeatwave(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-[#1c7c47]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="kf-label mb-0">Diesel price shift</label>
                  <span className="text-[13px] font-bold text-primary">+₹{customDieselHike}/L</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="20"
                  step="1"
                  value={customDieselHike}
                  onChange={(e) => setCustomDieselHike(parseInt(e.target.value))}
                  className="mt-2 w-full accent-[#1c7c47]"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-md border border-line bg-subtle px-3.5 py-2.5">
              <p className="kf-helper">
                Pooled margin advantage: <strong className="text-good">+₹12.60/kg net over Mandi</strong>
              </p>
            </div>
            <Button
              className="mt-3 w-full"
              icon="monitoring"
              onClick={() => onShowToast('Parametric stress test confirmed! Resilience threshold: 98.2%.')}
            >
              Compute shock invariant
            </Button>
          </Card>
        </div>

        {/* Right: impact */}
        <div className="space-y-4 xl:col-span-7">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="kf-eyebrow text-primary">Impact projection · {active.title}</p>
                <p className="mt-2 text-[15px] font-semibold text-ink">{active.impactSummary}</p>
              </div>
              <Badge tone="warn" dot>Active simulation</Badge>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-line bg-subtle p-4">
                <p className="kf-eyebrow">Price impact</p>
                <p className="kf-metric-value mt-1 text-good">{active.deltaPrice}</p>
              </div>
              <div className="rounded-md border border-line bg-subtle p-4">
                <p className="kf-eyebrow">Deficit shift</p>
                <p className="kf-metric-value mt-1 text-bad">
                  +115<span className="text-sm font-semibold text-muted"> → 180 MT</span>
                </p>
              </div>
              <div className="rounded-md border border-line bg-subtle p-4">
                <p className="kf-eyebrow">Resilience</p>
                <p className="kf-metric-value mt-1 text-primary">{PRESET_RESILIENCE[selectedScenario]}%</p>
                <div className="mt-2">
                  <Progress value={PRESET_RESILIENCE[selectedScenario]} tone="good" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon name="strategy" size={18} />
              </span>
              <div>
                <p className="kf-section-title text-[14.5px]">Recommended strategy for this scenario</p>
                <p className="kf-helper mt-0.5">Generated by the what-if engine from the current routing and pooling state</p>
              </div>
            </div>
            <p className="mt-4 rounded-lg border border-line bg-subtle p-4 text-[13.5px] leading-relaxed text-ink">
              {active.recommendedStrategy}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
              <KeyValue k="Reengagement window" v="4.5 hrs lead time" />
              <KeyValue k="Procurement to trigger" v="Virtual pool + direct escrow" />
              <KeyValue k="Predicted hit on revenue" v="-8 to -2% without action" />
              <KeyValue k="With strategy applied" v="+0.4% vs. baseline" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};