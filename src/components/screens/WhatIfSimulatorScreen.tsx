import React, { useState } from 'react';

interface WhatIfSimulatorScreenProps {
  onShowToast: (msg: string) => void;
}

export const WhatIfSimulatorScreen: React.FC<WhatIfSimulatorScreenProps> = ({ onShowToast }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('rain');
  const [customHeatwave, setCustomHeatwave] = useState<number>(3.5);
  const [customDieselHike, setCustomDieselHike] = useState<number>(4);

  const scenarios = [
    {
      id: 'rain',
      title: 'Unseasonal Monsoon Shock in Nashik (Maharashtra)',
      impactSummary: 'Supply from Nashik drops by 45%. Ahmedabad metro deficit widens to 180 MT.',
      deltaPrice: '+₹8.50 / kg',
      recommendedStrategy: 'Accelerate Anand FPO harvest release; expand virtual pool to include Borsad buffer lots immediately.',
    },
    {
      id: 'heatwave',
      title: 'Extreme Heatwave Warning (+3.5°C over 72h)',
      impactSummary: 'Shelf-life degrades from 48h to 24h. Mandi pit-head open auctions suffer 28% rot penalty.',
      deltaPrice: '+₹5.20 / kg (Reefer Premium)',
      recommendedStrategy: 'Mandatory transfer to refrigerated e-truck fleets. Bypass ambient mandi yards completely.',
    },
    {
      id: 'strike',
      title: 'APMC Arhatiya Cess Protest / Market Strike',
      impactSummary: 'Wholesale mandi yards closed for 4 days. Retail chains facing zero fresh table vegetable inflows.',
      deltaPrice: '+₹11.00 / kg',
      recommendedStrategy: 'Activate GovTech Direct Escrow contracts. Direct delivery to BigBasket, Reliance, and Blinkit dark stores.',
    },
  ];

  const handleApplyScenario = (title: string) => {
    onShowToast(`Simulated scenario: "${title}". Algorithmic allocations recalculated!`);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Context */}
      <div>
        <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
          <span className="text-primary font-semibold">Stress Testing</span>
          <span>·</span>
          <span>Supply Chain Resilience &amp; Shock Engine</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          What-If Value Chain Simulator
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] max-w-3xl mt-0.5">
          Simulate weather disruptions, Mandi commission strikes, fuel shocks, and bumper crop gluts to stress-test FPO revenue stability and cold-chain route resilience.
        </p>
      </div>

      {/* Preset Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc.id);
                handleApplyScenario(sc.title);
              }}
              className={`p-3.5 rounded-lg cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-surface-container-lowest border-2 border-primary shadow-xs'
                  : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md text-primary font-bold uppercase text-[10px]">
                  Preset Scenario
                </span>
                {isSelected && (
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold">
                    Active
                  </span>
                )}
              </div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface text-[14px]">
                {sc.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-2">
                {sc.impactSummary}
              </p>
              <div className="mt-4 p-2 bg-surface-container rounded text-[12px]">
                <span className="text-on-surface-variant block text-[10px] uppercase">Price Impact</span>
                <span className="font-bold text-primary text-[15px]">{sc.deltaPrice}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface text-[11px] mt-2 font-medium">
                <strong>AI Action:</strong> {sc.recommendedStrategy}
              </p>
            </div>
          );
        })}
      </div>

      {/* Custom Variable Experimentation */}
      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 space-y-4">
        <h3 className="font-title-sm text-title-sm font-bold text-on-surface text-[15px]">
          Custom Micro-Shock Parametric Test
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-1 text-[12px]">
              <span className="font-semibold text-on-surface">Ambient Heat Anomaly (°C above average):</span>
              <span className="font-bold text-primary">+{customHeatwave.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={customHeatwave}
              onChange={(e) => setCustomHeatwave(parseFloat(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-[12px]">
              <span className="font-semibold text-on-surface">Diesel Price Shift (₹/L):</span>
              <span className="font-bold text-primary">+₹{customDieselHike}/L</span>
            </div>
            <input
              type="range"
              min="-10"
              max="20"
              step="1"
              value={customDieselHike}
              onChange={(e) => setCustomDieselHike(parseInt(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between text-[12px] border border-outline-variant/20">
          <span className="text-on-surface-variant font-medium">
            Projected Pooled Margin Advantage Under Parametric Test: <strong>+₹12.60/kg net over Mandi</strong>
          </span>
          <button
            onClick={() => onShowToast('Parametric stress test confirmed! Resilience threshold: 98.2%.')}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-[12px]"
            type="button"
          >
            Compute Shock Invariant
          </button>
        </div>
      </div>
    </div>
  );
};
