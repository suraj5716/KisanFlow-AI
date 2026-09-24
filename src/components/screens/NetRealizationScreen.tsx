import React, { useState } from 'react';

interface NetRealizationScreenProps {
  onShowToast: (msg: string) => void;
}

export const NetRealizationScreen: React.FC<NetRealizationScreenProps> = ({ onShowToast }) => {
  const [spotPrice, setSpotPrice] = useState<number>(32.0);
  const [mandiDistanceKm, setMandiDistanceKm] = useState<number>(35);
  const [transitHours, setTransitHours] = useState<number>(2);

  // Dynamic calculations
  const apmcCess = spotPrice * 0.085; // 8.5%
  const apmcLoading = 1.9;
  const apmcDeductions = apmcCess + apmcLoading;
  const apmcNet = Math.max(0, spotPrice * 0.75 - apmcDeductions);

  const traderNet = spotPrice * 0.65;

  const soleFpoFreight = 2.6 + (mandiDistanceKm - 35) * 0.03;
  const soleFpoSpoilage = transitHours > 3 ? 1.8 : 0.4;
  const soleFpoNet = Math.max(0, spotPrice * 0.95 - soleFpoFreight - soleFpoSpoilage);

  const pooledFreight = 1.65;
  const pooledSpoilage = 0.15; // Reefer
  const pooledNet = Math.max(0, spotPrice * 1.02 - pooledFreight - pooledSpoilage);

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Context */}
      <div>
        <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
          <span className="text-primary font-semibold">Financial Arbitrage Simulator</span>
          <span>·</span>
          <span>True Net Farmer Realization (NFR) Model</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Net Realization Engine
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] max-w-3xl mt-0.5">
          Eliminating hidden market penalties. Simulating deductions across Mandi arhatiya commissions, statutory cess, uncooled transit spoilage degradation, and backhaul logistics savings.
        </p>
      </div>

      {/* Simulator Control Sliders */}
      <div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 space-y-3">
        <h3 className="font-bold text-on-surface text-[13.5px]">
          Operational Cost Simulation Variables
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-[11.5px]">
              <span className="font-semibold text-on-surface">Base Spot Market Quote (₹/kg):</span>
              <span className="font-bold text-primary">₹{spotPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              step="1"
              value={spotPrice}
              onChange={(e) => setSpotPrice(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-[11.5px]">
              <span className="font-semibold text-on-surface">Transit Haul Distance (km):</span>
              <span className="font-bold text-primary">{mandiDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={mandiDistanceKm}
              onChange={(e) => setMandiDistanceKm(parseInt(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-[12px]">
              <span className="font-semibold text-on-surface">Field-to-Gate Transit Duration (hours):</span>
              <span className="font-bold text-primary">{transitHours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={transitHours}
              onChange={(e) => setTransitHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Mandi Card */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[10px] font-bold">
              Channel 1
            </span>
            <h4 className="font-title-sm text-title-sm font-bold text-on-surface text-[14px]">
              APMC Mandi Auction
            </h4>
            <div className="mt-4 space-y-1 text-[12px]">
              <div className="flex justify-between text-secondary">
                <span>Commission (8.5%):</span>
                <span className="text-error font-medium">-₹{apmcCess.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Loading &amp; Weighing:</span>
                <span className="text-error font-medium">-₹{apmcLoading.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Payment Wait:</span>
                <span className="font-semibold text-on-surface">7-14 Days</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2.5 border-t border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Net Payout to Farmer</span>
            <div className="font-metric-numeral text-metric-numeral text-on-surface">
              ₹{apmcNet.toFixed(2)} <span className="text-[11px] font-normal text-on-surface-variant">/ kg</span>
            </div>
          </div>
        </div>

        {/* Farmgate Trader Card */}
        <div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[10px] font-bold">
              Channel 2
            </span>
            <h4 className="font-bold text-on-surface text-[13px]">
              Local Village Trader
            </h4>
            <div className="mt-3 space-y-1 text-[11.5px]">
              <div className="flex justify-between text-secondary">
                <span>Freight:</span>
                <span className="text-on-surface font-medium">₹0.00 (Farmgate)</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Middleman Discount:</span>
                <span className="text-error font-medium">-35% Spot Cut</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Payment Wait:</span>
                <span className="font-semibold text-on-surface">Cash on Delivery</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2.5 border-t border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Net Payout to Farmer</span>
            <div className="font-metric-numeral text-metric-numeral text-on-surface">
              ₹{traderNet.toFixed(2)} <span className="text-[11px] font-normal text-on-surface-variant">/ kg</span>
            </div>
          </div>
        </div>

        {/* Sole FPO Direct Card */}
        <div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[10px] font-bold">
              Channel 3
            </span>
            <h4 className="font-bold text-on-surface text-[13px]">
              Direct Buyer (Sole FPO)
            </h4>
            <div className="mt-3 space-y-1 text-[11.5px]">
              <div className="flex justify-between text-secondary">
                <span>Small Truck Freight:</span>
                <span className="text-error font-medium">-₹{soleFpoFreight.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Ambient Spoilage Loss:</span>
                <span className="text-error font-medium">-₹{soleFpoSpoilage.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Payment Wait:</span>
                <span className="font-semibold text-on-surface">2-3 Days</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2.5 border-t border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Net Payout to Farmer</span>
            <div className="font-metric-numeral text-metric-numeral text-on-surface">
              ₹{soleFpoNet.toFixed(2)} <span className="text-[11px] font-normal text-on-surface-variant">/ kg</span>
            </div>
          </div>
        </div>

        {/* KisanFlow Virtual Pool Card */}
        <div className="p-3.5 rounded-lg bg-primary/5 shadow-xs border-2 border-primary flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary text-[9.5px] font-bold">
              MAX ARBITRAGE
            </span>
          </div>
          <div>
            <span className="font-label-md text-label-md text-primary uppercase text-[10px] font-bold">
              Channel 4 (Recommended)
            </span>
            <h4 className="font-bold text-primary text-[13px]">
              KisanFlow Virtual Pool
            </h4>
            <div className="mt-3 space-y-1 text-[11.5px]">
              <div className="flex justify-between text-secondary">
                <span>Shared Backhaul Freight:</span>
                <span className="text-primary font-semibold">-₹{pooledFreight.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Cold Chain Spoilage:</span>
                <span className="text-primary font-semibold">&lt;0.5% (Negligible)</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Escrow Settlement:</span>
                <span className="font-bold text-primary">e-NAM / &lt;24h DBT</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2.5 border-t border-primary/20">
            <span className="text-[10px] text-primary block uppercase font-bold">Net Payout to Farmer</span>
            <div className="font-metric-numeral text-metric-numeral text-primary font-bold">
              ₹{pooledNet.toFixed(2)} <span className="text-[11px] font-normal text-on-surface-variant">/ kg</span>
            </div>
            <span className="text-[10.5px] text-primary font-bold block mt-0.5">
              +₹{(pooledNet - apmcNet).toFixed(2)}/kg over Mandi (+{Math.round(((pooledNet - apmcNet) / (apmcNet || 1)) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
