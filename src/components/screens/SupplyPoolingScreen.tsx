import React, { useState } from 'react';
import { RoutePreviewModal } from '../modals/RoutePreviewModal';

interface SupplyPoolingScreenProps {
  onShowToast: (msg: string) => void;
}

export const SupplyPoolingScreen: React.FC<SupplyPoolingScreenProps> = ({ onShowToast }) => {
  const [anandQty, setAnandQty] = useState<number>(8.0);
  const [isSealingContract, setIsSealingContract] = useState<boolean>(false);
  const [isContractSealed, setIsContractSealed] = useState<boolean>(false);
  const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
  const [showRouteModal, setShowRouteModal] = useState<boolean>(false);
  const [activeFpoCheckbox, setActiveFpoCheckbox] = useState<{ [key: string]: boolean }>({
    kheda: true,
    charotar: true,
    borsad: true,
  });

  const khedaQty = activeFpoCheckbox.kheda ? 5.0 : 0;
  const charotarQty = activeFpoCheckbox.charotar ? 5.0 : 0;
  const borsadQty = activeFpoCheckbox.borsad ? 4.0 : 0;

  const totalAssembledTons = anandQty + khedaQty + charotarQty + borsadQty;
  const targetTons = 20.0;
  const percentage = Math.round((totalAssembledTons / targetTons) * 100);

  // Dynamic net value computation
  const anandValue = anandQty * 1000 * 30.2;
  const khedaValue = khedaQty * 1000 * 29.8;
  const charotarValue = charotarQty * 1000 * 29.6;
  const borsadValue = borsadQty * 1000 * 29.1;
  const totalNetValue = anandValue + khedaValue + charotarValue + borsadValue;

  const handleGenerateContract = () => {
    setIsSealingContract(true);
    setTimeout(() => {
      setIsSealingContract(false);
      setIsContractSealed(true);
      onShowToast('Multi-Party Smart Contract Sealed on GovTech Ledger! (#VPL-TOM-2026-881)');
    }, 1100);
  };

  const handleSendOffer = () => {
    setIsOfferSent(true);
    onShowToast('Pooled tender submitted to BigBasket Gujarat Central DC ERP! Escrow hold requested.');
  };

  const toggleFpo = (key: 'kheda' | 'charotar' | 'borsad') => {
    setActiveFpoCheckbox((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Status Strip */}
      <div className="w-full bg-secondary-container rounded-lg p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-on-secondary rounded-md text-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[18px]">hub</span>
          </span>
          <div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-primary font-bold">
                Algorithmic Match
              </span>
              <span className="text-secondary">
                · Solver Run: #OPT-GJ-4491
              </span>
            </div>
            <p className="font-semibold text-on-secondary-fixed text-[13px] leading-tight">
              Multi-Party Aggregation Pipeline Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-on-secondary-fixed text-[11px]">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-medium">
            Live Synchronized • Cluster 04 (Charotar Zone)
          </span>
        </div>
      </div>

      {/* Hero Demand & Paradox Header Section */}
      <section className="w-full bg-surface-container-lowest rounded-lg p-4 shadow-xs flex flex-col xl:flex-row gap-4 border border-outline-variant/20">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <span className="material-symbols-outlined text-[16px]">layers</span>
              <span className="uppercase tracking-wider font-bold text-[10.5px]">
                Multi-FPO Virtual Supply Pooling Engine
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Transforming Micro-Harvests into Institutional Scale Lots
            </h1>
            <p className="text-secondary mt-1 max-w-2xl text-[12.5px] leading-relaxed">
              Aggregating geographically contiguous farmer producer organizations into algorithmic bulk tenders. Eliminating the single-FPO capacity penalty through dynamic consensus contracts.
            </p>
          </div>

          {/* Live Buyer Request Inset Card */}
          <div className="mt-4 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">shopping_cart_checkout</span>
                <span className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                  Active Demand Order #REQ-AHM-902
                </span>
              </div>
              <span className="font-label-md text-label-md bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold text-[11px]">
                Expires in 18h 42m
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-[13px]">
              <strong className="text-on-surface">Target: 20.0 Tonnes Grade-A Tomatoes</strong> demanded by{' '}
              <strong className="text-on-surface">BigBasket Gujarat Central DC (Ahmedabad)</strong>. Delivery threshold requires strict temperature consistency and single-manifest documentation within 24 hours.
            </p>
          </div>
        </div>

        {/* The Aggregation Paradox Visual Callout */}
        <div className="w-full xl:w-[420px] bg-primary text-on-primary rounded-xl p-space-md flex flex-col justify-between relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed font-bold text-[11px]">
                The Fragmentation Barrier
              </span>
              <span className="material-symbols-outlined text-primary-fixed text-[24px]">crisis_alert</span>
            </div>
            <h2 className="font-title-md text-title-md font-bold mt-2 text-on-primary text-[16px]">
              Why Individual FPOs Miss Corporate Tenders
            </h2>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1 text-[12px]">
              Buyers require 20 Tonnes minimal volume. Individual clusters operate below bulk logistics thresholds, forcing distressed spot sales.
            </p>

            {/* Capacity Stack */}
            <div className="mt-4 space-y-2 text-[12px]">
              <div>
                <div className="flex justify-between font-label-md text-label-md mb-1 text-on-primary">
                  <span>Anand FPO (You)</span>
                  <span>{anandQty.toFixed(1)} T / 20 T ({Math.round((anandQty / 20) * 100)}%)</span>
                </div>
                <div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed h-full rounded-full transition-all duration-300" style={{ width: `${(anandQty / 20) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-md text-label-md mb-1 text-on-primary">
                  <span>Kheda FPO</span>
                  <span>5.0 T / 20 T (25%)</span>
                </div>
                <div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-md text-label-md mb-1 text-on-primary">
                  <span>Nadiad / Charotar</span>
                  <span>5.0 T / 20 T (25%)</span>
                </div>
                <div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-md text-label-md mb-1 text-on-primary">
                  <span>Borsad Cluster</span>
                  <span>4.0 T / 20 T (20%)</span>
                </div>
                <div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 bg-primary-container rounded-lg p-3 relative z-10 flex items-center gap-2 border border-primary-fixed/20">
            <span className="material-symbols-outlined text-primary-fixed text-[20px] flex-shrink-0">lightbulb</span>
            <span className="font-body-sm text-body-sm text-on-primary font-semibold text-[12px]">
              Solution: Virtual pooling generates a synchronized {totalAssembledTons.toFixed(1)}T batch with zero physical intermediary warehouse.
            </span>
          </div>
        </div>
      </section>

      {/* Visual Process Flow: Federated Route Consolidation Architecture */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div>
            <span className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider text-[11px]">
              Dynamic Multi-Origin Topology
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
              Federated Route Consolidation Architecture
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-[18px] text-primary">navigation</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium text-[12px]">
              SH-188 &amp; NE-1 Fast Logistics Corridor
            </span>
          </div>
        </div>

        {/* Diagram Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
          {/* Origin Nodes (FPOs) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs flex items-center justify-between transition-all hover:bg-surface-container-high border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md text-[12px]">
                  01
                </span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                    Anand Krishak (You)
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Cold Bay 02 • {anandQty.toFixed(1)} Tonnes Grade A
                  </p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold text-[11px]">Origin Hub</span>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs flex items-center justify-between transition-all hover:bg-surface-container-high border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary text-on-primary flex items-center justify-center font-bold text-label-md text-[12px]">
                  02
                </span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                    Kheda Green Prod. Co
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Waypoint 1 • 5.0 Tonnes Grade A
                  </p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-secondary font-semibold text-[11px]">+6 km detour</span>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs flex items-center justify-between transition-all hover:bg-surface-container-high border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary text-on-primary flex items-center justify-center font-bold text-label-md text-[12px]">
                  03
                </span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                    Charotar Krishi Sangh
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Waypoint 2 • 5.0 Tonnes Grade A
                  </p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-secondary font-semibold text-[11px]">+7 km detour</span>
            </div>

            <div className="bg-surface-container-lowest/80 p-3 rounded-lg shadow-xs flex items-center justify-between border-dashed border border-outline-variant/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-outline text-on-primary flex items-center justify-center font-bold text-label-md text-[12px]">
                  04
                </span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface-variant font-bold text-[13px]">
                    Borsad Cluster (Reserve)
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Standby • 4.0 Tonnes Grade A
                  </p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-outline font-semibold text-[11px]">Active Buffer</span>
            </div>
          </div>

          {/* Central Consolidation Flow Marker */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center px-4 py-6">
            <div className="w-full flex items-center justify-center relative mb-4">
              <svg className="w-full h-20 text-primary-container" fill="none" preserveAspectRatio="none" stroke="currentColor" viewBox="0 0 300 80">
                <path className="text-primary" d="M 10,15 C 80,15 80,40 150,40 C 220,40 220,40 290,40" strokeDasharray="6,4" strokeWidth="3"></path>
                <path className="text-primary" d="M 10,40 C 80,40 80,40 150,40" strokeWidth="3"></path>
                <path className="text-primary" d="M 10,65 C 80,65 80,40 150,40" strokeDasharray="6,4" strokeWidth="3"></path>
                <circle className="fill-primary stroke-background" cx="150" cy="40" r="8" strokeWidth="3"></circle>
              </svg>
            </div>
            <div className="text-center bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-xs w-full border border-outline-variant/20">
              <div className="flex items-center justify-center gap-1.5 text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                <span className="font-title-sm text-title-sm text-[13px]">Multi-Stop 25T Cold Haul</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5 text-[11px]">
                Continuous GPS &amp; Temperature Telemetry Lock
              </p>
              <div className="mt-2 inline-flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded text-[11px] font-label-md text-on-surface-variant font-semibold">
                <span>Optimal Total Route: 52.4 km</span>
              </div>
            </div>
          </div>

          {/* Destination Node */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs space-y-3 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold uppercase text-[11px]">
                  Buyer Destination
                </span>
                <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[16px]">
                  BigBasket Gujarat DC
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Sanand Industrial Logistics Hub, Ahmedabad
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-[12px]">
                <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                  <span>Required Gross:</span>
                  <span className="font-semibold text-on-surface">20.0 MT</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                  <span>Assembled Batch:</span>
                  <span className="font-semibold text-primary">{totalAssembledTons.toFixed(1)} MT ({percentage}% Buffer)</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                  <span>Combined Value:</span>
                  <span className="font-semibold text-on-surface">₹7,48,000</span>
                </div>
              </div>
              <div className="w-full bg-primary-container/10 p-2 rounded text-center">
                <span className="font-label-md text-label-md text-primary font-bold text-[11px]">
                  Corporate Acceptance Rate: 99.4%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lot Builder & Contributor Ledger */}
      <section className="w-full grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* Left 8 Columns: Dynamic Allocation Matrix */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-6 border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[18px]">
                  Virtual Supply Lot Builder
                </h2>
                <span className="font-label-md text-label-md bg-primary-container text-on-primary px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                  #VPL-TOM-2026-881
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-1 text-[12px]">
                Real-time allocation quotas, transit variance allowances, and payout calculations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-secondary text-[12px]">Buffer Tonnage:</span>
              <span className="font-title-sm text-title-sm text-primary font-bold bg-primary-fixed/30 px-2 py-1 rounded text-[13px]">
                +{(totalAssembledTons - 20).toFixed(1)} MT
              </span>
            </div>
          </div>

          {/* Capacity Gauge Metric Card */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
            <div className="flex items-center gap-4">
              {/* Mini SVG Progress Donut */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-variant"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></path>
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${Math.min(percentage, 100)}, 100`}
                    strokeWidth="4"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-headline-sm text-headline-sm font-black text-on-surface text-[15px]">
                  {percentage}%
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold text-[14px]">
                    {totalAssembledTons.toFixed(1)} Tonnes Assembled
                  </span>
                  <span className="font-label-md text-label-md text-primary font-bold uppercase text-[11px]">
                    (Fulfillment Target Met)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
                  Threshold includes +10% resilience margin against in-transit sorting rejections.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="font-label-md text-label-md text-secondary block text-[11px]">
                  Aggregate Net Value
                </span>
                <span className="font-headline-md text-headline-md text-primary font-extrabold text-[20px]">
                  ₹{Math.round(totalNetValue).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* FPO Contribution Table */}
          <div className="overflow-x-auto rounded-lg border border-outline-variant/20">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase text-[11px]">
                <tr>
                  <th className="p-3 pl-4">FPO Node</th>
                  <th className="p-3 text-right">Allocated Qty</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Hub Distance</th>
                  <th className="p-3 text-right">Est. Net Realization</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center pr-4">Consensus</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant/10">
                {/* Row 1: Anand */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                          Anand Krishak FPO
                        </span>
                        <span className="block font-body-sm text-body-sm text-primary font-semibold text-[11px]">
                          (Your Organization)
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-headline-sm text-headline-sm font-bold text-on-surface text-[15px]">
                    {anandQty.toFixed(1)} MT
                  </td>
                  <td className="p-3">
                    <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[11px]">
                      Grade A
                    </span>
                  </td>
                  <td className="p-3 font-body-sm text-body-sm text-secondary">18 km</td>
                  <td className="p-3 text-right">
                    <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                      ₹30.20 / kg
                    </span>
                    <span className="block font-body-sm text-body-sm text-secondary font-medium text-[11px]">
                      ₹{Math.round(anandValue).toLocaleString('en-IN')} total
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md bg-primary-fixed/40 text-on-primary-fixed font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Confirmed
                    </span>
                  </td>
                  <td className="p-3 text-center pr-4">
                    <input checked readOnly className="accent-primary w-4 h-4 rounded cursor-default" type="checkbox" />
                  </td>
                </tr>

                {/* Row 2: Kheda */}
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/70 transition-colors">
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                          Kheda Green Producer Co
                        </span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                          Reg: GJ-KHD-091
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-headline-sm text-headline-sm font-bold text-on-surface text-[15px]">
                    {khedaQty.toFixed(1)} MT
                  </td>
                  <td className="p-3">
                    <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[11px]">
                      Grade A
                    </span>
                  </td>
                  <td className="p-3 font-body-sm text-body-sm text-secondary">24 km</td>
                  <td className="p-3 text-right">
                    <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                      ₹29.80 / kg
                    </span>
                    <span className="block font-body-sm text-body-sm text-secondary font-medium text-[11px]">
                      ₹{Math.round(khedaValue).toLocaleString('en-IN')} total
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md bg-secondary-container text-on-secondary-container font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">done</span> Joined
                    </span>
                  </td>
                  <td className="p-3 text-center pr-4">
                    <input
                      checked={activeFpoCheckbox.kheda}
                      onChange={() => toggleFpo('kheda')}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                </tr>

                {/* Row 3: Charotar */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                          Charotar Krishi Sangh
                        </span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                          Reg: GJ-CHR-830
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-headline-sm text-headline-sm font-bold text-on-surface text-[15px]">
                    {charotarQty.toFixed(1)} MT
                  </td>
                  <td className="p-3">
                    <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[11px]">
                      Grade A
                    </span>
                  </td>
                  <td className="p-3 font-body-sm text-body-sm text-secondary">31 km</td>
                  <td className="p-3 text-right">
                    <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                      ₹29.60 / kg
                    </span>
                    <span className="block font-body-sm text-body-sm text-secondary font-medium text-[11px]">
                      ₹{Math.round(charotarValue).toLocaleString('en-IN')} total
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md bg-secondary-container text-on-secondary-container font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">done</span> Joined
                    </span>
                  </td>
                  <td className="p-3 text-center pr-4">
                    <input
                      checked={activeFpoCheckbox.charotar}
                      onChange={() => toggleFpo('charotar')}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                </tr>

                {/* Row 4: Borsad Reserve */}
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/70 transition-colors">
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-outline"></span>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                          Borsad Vegetable Cluster
                        </span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                          Reg: GJ-BRS-104
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-headline-sm text-headline-sm font-bold text-on-surface text-[15px]">
                    {borsadQty.toFixed(1)} MT
                  </td>
                  <td className="p-3">
                    <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[11px]">
                      Grade A
                    </span>
                  </td>
                  <td className="p-3 font-body-sm text-body-sm text-secondary">42 km</td>
                  <td className="p-3 text-right">
                    <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                      ₹29.10 / kg
                    </span>
                    <span className="block font-body-sm text-body-sm text-secondary font-medium text-[11px]">
                      ₹{Math.round(borsadValue).toLocaleString('en-IN')} total
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> Standby / Reserve
                    </span>
                  </td>
                  <td className="p-3 text-center pr-4">
                    <input
                      checked={activeFpoCheckbox.borsad}
                      onChange={() => toggleFpo('borsad')}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Live Dynamic Allocation Slider Demo */}
          <div className="p-space-md bg-surface-container-low rounded-xl border border-outline-variant/20">
            <div className="flex justify-between items-center mb-2">
              <label className="font-label-lg text-label-lg font-bold text-on-surface text-[13px]">
                Dynamic Re-allocation Simulation: Anand FPO Contribution
              </label>
              <span className="font-title-sm text-title-sm font-extrabold text-primary bg-surface-container-lowest px-3 py-0.5 rounded shadow-xs border border-outline-variant/20">
                {anandQty.toFixed(1)} MT
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={anandQty}
              onChange={(e) => setAnandQty(parseFloat(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-secondary font-label-md text-label-md mt-1 text-[11px]">
              <span>Min Allocation: 4.0 MT</span>
              <span>Certified Capacity: 12.0 MT</span>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Smart Dispatch & Contract Trigger Panel */}
        <div className="xl:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-6 border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">gavel</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[18px]">
                Virtual Lot Actions
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-secondary text-[12px]">
              Execute multi-party escrow agreements and release aggregated transit manifests.
            </p>

            {/* Execution Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGenerateContract}
                disabled={isSealingContract}
                className={`w-full py-3 px-4 rounded-lg font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all text-[13px] ${
                  isContractSealed
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                type="button"
              >
                <span className={`material-symbols-outlined text-[20px] ${isSealingContract ? 'animate-spin' : ''}`}>
                  {isSealingContract ? 'sync' : isContractSealed ? 'verified' : 'assignment_turned_in'}
                </span>
                <span>
                  {isSealingContract
                    ? 'Sealing Hash & Ledger Keys...'
                    : isContractSealed
                    ? 'Smart Contract Sealed (#VPL-TOM-2026-881)'
                    : 'Generate Smart Multi-Party Lot Contract'}
                </span>
              </button>

              <button
                onClick={() => setShowRouteModal(true)}
                className="w-full py-3 px-4 bg-secondary-container text-on-secondary-fixed font-title-sm text-title-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-dim transition-all text-[13px]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">route</span>
                <span>Preview Multi-Pickup Route (52 km)</span>
              </button>

              <button
                onClick={handleSendOffer}
                className={`w-full py-3 px-4 font-title-sm text-title-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all text-[13px] ${
                  isOfferSent
                    ? 'bg-primary-fixed/40 text-primary font-bold'
                    : 'bg-surface-container text-primary hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isOfferSent ? 'done_all' : 'forward_to_inbox'}
                </span>
                <span>{isOfferSent ? 'Offer Transmitted to BigBasket ERP!' : 'Send Pooled Offer to Buyer'}</span>
              </button>
            </div>

            {/* Smart Contract Escrow Status Badge */}
            <div className="p-space-md bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase text-[11px]">
                  Automated Escrow
                </span>
                <span className="font-label-md text-label-md text-primary font-bold text-[11px]">
                  100% Protected
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary text-[12px] leading-relaxed">
                Payment release is programmed on digital acceptance at BigBasket DC dock, splitting remittances proportionally to each FPO bank node within 4 hours.
              </p>
            </div>
          </div>

          {/* Real-time Verification Stamp */}
          <div className="bg-surface-container-high p-space-md rounded-xl flex items-center gap-3 border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[28px]">lock</span>
            <div>
              <p className="font-title-sm text-title-sm text-on-surface font-bold text-[13px]">
                GovTech Ledger Consensus
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Validated via Gujarat Co-op Federation protocol GJ-GOV-2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Algorithm Rationale Panel: Quantified Benefits Grid */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-6 border border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">model_training</span>
              <span className="font-label-md text-label-md uppercase tracking-wider font-bold text-[11px]">
                OR-Tools + XGBoost Engine
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[18px]">
              Optimization Algorithm &amp; Logistics Synergy Matrix
            </h2>
          </div>
          <span className="font-label-md text-label-md bg-primary text-on-primary px-3 py-1 rounded-full font-bold self-start md:self-auto text-[11px]">
            51.4% Net Freight Reduction
          </span>
        </div>

        {/* Optimization Weights Breakdown Bar */}
        <div className="space-y-2 bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
          <div className="flex flex-wrap items-center justify-between font-label-md text-label-md text-on-surface font-bold text-[12px]">
            <span>Solver Weighting Architecture</span>
            <span className="text-secondary font-normal text-[11px]">
              Objective: Min(Logistics Cost) + Max(Gate Net Margin)
            </span>
          </div>
          <div className="w-full h-3 rounded-full flex overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '30%' }} title="Quality Consistency: 30%"></div>
            <div className="bg-primary-container h-full" style={{ width: '25%' }} title="Distance Minimization: 25%"></div>
            <div className="bg-secondary h-full" style={{ width: '25%' }} title="Harvest Timestamp Compatibility: 25%"></div>
            <div className="bg-secondary-fixed-variant h-full" style={{ width: '20%' }} title="Route Detour Limit: 20%"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-secondary font-body-sm text-body-sm text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></span>
              <span>Quality Consistency (30%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary-container flex-shrink-0"></span>
              <span>Distance Optimization (25%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary flex-shrink-0"></span>
              <span>Harvest Sync Time (25%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary-fixed-variant flex-shrink-0"></span>
              <span>Route Detour Limit (20%)</span>
            </div>
          </div>
        </div>

        {/* Quantified Impact Comparison Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: Logistics Fleet Shift */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between text-secondary mb-2">
                <span className="font-label-md text-label-md uppercase font-bold text-[11px]">Logistics Fleet</span>
                <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[16px]">
                1 Heavy E-Truck
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
                Replaces 4 fragmented light pickup vehicles (Tata Ace / Ashok Leyland Dost).
              </p>
            </div>
            <div className="mt-4 pt-3 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between font-label-md text-label-md text-primary font-bold text-[11px] border border-outline-variant/20">
              <span>Fleet Efficiency</span>
              <span>+75% Load Factor</span>
            </div>
          </div>

          {/* Card 2: Transport Cost Breakdown */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between text-secondary mb-2">
                <span className="font-label-md text-label-md uppercase font-bold text-[11px]">Freight Expense</span>
                <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md font-extrabold text-primary text-[20px]">₹1.65</span>
                <span className="font-body-md text-body-md text-secondary line-through text-[13px]">₹3.40 / kg</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
                51.4% immediate logistics arbitrage pocketed directly by member FPOs.
              </p>
            </div>
            <div className="mt-4 pt-3 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between font-label-md text-label-md text-primary font-bold text-[11px] border border-outline-variant/20">
              <span>Net Savings</span>
              <span>₹38,500 on Batch</span>
            </div>
          </div>

          {/* Card 3: Carbon Footprint */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between text-secondary mb-2">
                <span className="font-label-md text-label-md uppercase font-bold text-[11px]">Carbon Intensity</span>
                <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
              </div>
              <div className="font-headline-md text-headline-md font-extrabold text-primary text-[20px]">-42.0%</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
                Multi-stop consolidation curtails 184 vehicle-kilometers compared to isolated drop-offs.
              </p>
            </div>
            <div className="mt-4 pt-3 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between font-label-md text-label-md text-primary font-bold text-[11px] border border-outline-variant/20">
              <span>ESG Compliance</span>
              <span>Grade AA Green Haul</span>
            </div>
          </div>

          {/* Card 4: Realized Unit Price */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between text-secondary mb-2">
                <span className="font-label-md text-label-md uppercase font-bold text-[11px]">Gross Buyer Price</span>
                <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md font-extrabold text-primary text-[20px]">₹34.00</span>
                <span className="font-body-md text-body-md text-secondary line-through text-[13px]">₹26.00 / kg</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
                Unlocks premier wholesale buyer category vs distress local Mandi auction.
              </p>
            </div>
            <div className="mt-4 pt-3 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between font-label-md text-label-md text-primary font-bold text-[11px] border border-outline-variant/20">
              <span>Value Premium</span>
              <span>+₹8.00 / kg Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Route Preview Modal */}
      <RoutePreviewModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
      />
    </div>
  );
};
