import React, { useState } from 'react';
import { NavScreenId, ProduceLot } from '../../types';

interface DashboardScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onOpenSihModal: () => void;
  onOpenCreateLotModal: () => void;
  onShowToast: (msg: string) => void;
  lots: ProduceLot[];
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenSihModal,
  onOpenCreateLotModal,
  onShowToast,
  lots,
}) => {
  const [allocationStatus, setAllocationStatus] = useState<'idle' | 'loading' | 'accepted'>('idle');
  const [backhaulReserved, setBackhaulReserved] = useState(false);
  const [selectedLotForAssay, setSelectedLotForAssay] = useState<ProduceLot | null>(null);

  const handleAcceptPool = () => {
    if (allocationStatus === 'accepted') return;
    setAllocationStatus('loading');
    setTimeout(() => {
      setAllocationStatus('accepted');
      onShowToast('Allocation confirmed! 5.0 Tonnes locked into #VPL-AHM-902 with FreshBasket Escrow.');
    }, 700);
  };

  const handleReserveBackhaul = () => {
    setBackhaulReserved(true);
    onShowToast('Backhaul Slot Reserved! E-Truck GJ-23-AX-8912 notified for Anand Toll pickup at 14:15.');
  };

  const handleDownloadAudit = () => {
    onShowToast('Generating cryptographic audit certificate (e-NAM Compliance Ledger)... Download started.');
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Operational Top Banner */}
      <div className="relative bg-surface-container-low rounded-lg p-3 sm:p-4 shadow-xs overflow-hidden mb-3 border border-outline-variant/20">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-primary/10 via-surface-container-high/40 to-transparent pointer-events-none"></div>
        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2 text-on-surface-variant text-[11px]">
              <span className="text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified_user</span> Verified FPO Node
              </span>
              <span>·</span>
              <span>Active Harvest Season (Rabi-Zaid)</span>
              <span>·</span>
              <span className="hidden sm:inline">Lat: 22.5645° N, 72.9289° E</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">
              Gujarat Anand Agro Federation{' '}
              <span className="font-normal text-on-surface-variant text-[13px]">
                (FPO-GJ-084)
              </span>
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Orchestrating 1,420 registered smallholders across 6 cluster mandals with real-time algorithmic crop pooling.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenSihModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-on-primary font-semibold text-[11.5px] shadow-xs hover:bg-primary-container transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">account_tree</span>
              <span>Run 12-Step Autonomous Flow</span>
            </button>
            <button
              onClick={onOpenCreateLotModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-container-lowest text-on-surface font-semibold text-[11.5px] shadow-xs hover:bg-surface-container-high transition-colors border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">add_circle</span>
              <span>Create Digital Lot</span>
            </button>
            <button
              onClick={() => onNavigate('supply-pooling')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary-container text-on-secondary-fixed font-semibold text-[11.5px] shadow-xs hover:bg-surface-variant transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">hub</span>
              <span>Virtual Pooling (2)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Six Core KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-sm mb-space-md">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
              Available Stock
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-on-surface tracking-tight">
              8.4 <span className="text-headline-sm font-normal text-on-surface-variant">MT</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate text-[12px]">
              Himsona Tomato (Grade A &amp; B)
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-surface-container-low/50 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-0.5 text-[11px]">
              <span className="material-symbols-outlined text-[14px]">north_east</span> +1.2 MT today
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-[11px]">Anand Center</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
              Gross Value
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-on-surface tracking-tight">
              ₹2,68,800
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
              Avg ₹32.00 / kg spot quote
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-surface-container-low/50 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-on-surface-variant text-[11px]">Assayed Lots</span>
            <span className="font-label-md text-label-md text-primary font-semibold text-[11px]">
              100% Quality Tagged
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
              Net Realization
            </span>
            <span className="p-1 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-primary tracking-tight">
              ₹24.85<span className="text-headline-sm font-normal text-on-surface-variant">/kg</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
              APMC Mandi baseline: ₹19.35
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-surface-container-low/50 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-0.5 text-[11px]">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +28.4% Arbitrage
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-[11px]">Direct channel</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
              Demand Matches
            </span>
            <span className="p-1 rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-on-surface tracking-tight">
              3 <span className="text-headline-sm font-normal text-on-surface-variant">High-Conf</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
              Ahmedabad, Vadodara, Surat
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-surface-container-low/50 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-on-surface font-semibold text-[11px]">
              Institutional Bulk
            </span>
            <span className="font-label-md text-label-md text-primary font-semibold text-[11px]">
              Verified Bids
            </span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-error uppercase tracking-wider text-[11px] font-bold">
              Freshness Risk
            </span>
            <span className="p-1 rounded-lg bg-error-container text-error">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-error tracking-tight">
              &lt;28 <span className="text-headline-sm font-normal text-error">hrs</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
              1 Lot requires expedited lane
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-error-container/40 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-error font-semibold flex items-center gap-0.5 text-[11px]">
              <span className="material-symbols-outlined text-[14px]">warning</span> Priority Dispatch
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-[11px]">LOT-TOM-0042</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
              AI Pooling Delta
            </span>
            <span className="p-1 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-[18px]">auto_graph</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="font-metric-numeral text-metric-numeral text-primary tracking-tight">
              +₹46,200
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
              Net recovered margin
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-2 bg-surface-container-low/50 px-2 py-1 rounded-lg">
            <span className="font-label-md text-label-md text-on-surface-variant text-[11px]">Logistics &amp; Waste</span>
            <span className="font-label-md text-label-md text-primary font-bold text-[11px]">OR-Tools Opt</span>
          </div>
        </div>
      </div>

      {/* Center Split Section: AI Recommendation & Active Lots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-md">
        {/* Left: AI Orchestration Recommendation Card (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary-fixed/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="p-1.5 rounded-lg bg-primary-container text-on-primary">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
                    KisanFlow AI Real-Time Recommendation
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Autonomous supply-demand optimization matrix
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-label-md text-label-md font-bold text-primary text-[11px]">
                  Confidence: 93%
                </span>
                <span className="text-outline text-label-md text-[11px]">• Prophet + XGBoost</span>
              </div>
            </div>

            {/* Recommendation Callout Box */}
            <div className="bg-surface-container-low rounded-xl p-space-md my-space-sm border border-outline-variant/20">
              <div className="flex items-start gap-space-sm">
                <div className="p-2 rounded-lg bg-surface-container-lowest text-primary shadow-xs flex-shrink-0 mt-0.5 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[22px]">route</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      Virtual Supply Pooling Recommendation: Pool #VPL-AHM-902
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-bold text-[11px]">
                      Priority High
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface mt-1 leading-relaxed text-[13px]">
                    Tomato demand in <strong>Ahmedabad Urban Hub</strong> is forecast to surge by{' '}
                    <span className="text-primary font-bold">+18%</span> over the next 7 days with a regional deficit of{' '}
                    <strong>65 tonnes</strong>. Your available stock in Anand is <strong>8.4 tonnes</strong>.
                  </p>
                  <div className="mt-3 p-3 bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/20">
                    <p className="font-body-sm text-body-sm text-on-surface text-[12px]">
                      <span className="font-semibold text-primary">AI Strategy:</span> Allocating{' '}
                      <strong className="text-on-surface">5.0 tonnes</strong> into Regional Virtual Pool with{' '}
                      <strong>Anand FPO B (3T)</strong> &amp; <strong>Kheda FPO C (4T)</strong> unlocks bulk contract with{' '}
                      <strong>FreshBasket Institutional</strong> at{' '}
                      <span className="text-primary font-bold">₹30.20/kg</span> Net Realization (saving ₹5.35/kg over local spot, near-zero spoilage risk).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytical Micro-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs mt-space-sm">
              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between border border-outline-variant/20">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[11px]">
                  Target Buyer
                </span>
                <div className="font-title-sm text-title-sm text-on-surface font-bold mt-1 text-[13px]">
                  FreshBasket Retail Ltd
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px] text-primary">verified</span> Tier-1 Institutional Escrow
                </div>
              </div>
              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between border border-outline-variant/20">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[11px]">
                  Transit Time &amp; Mode
                </span>
                <div className="font-title-sm text-title-sm text-on-surface font-bold mt-1 text-[13px]">
                  1.8 hrs • Reefer Cluster
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[11px]">
                  Route: NE-1 Expressway
                </div>
              </div>
              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between border border-outline-variant/20">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[11px]">
                  Projected Net Gain
                </span>
                <div className="font-title-sm text-title-sm text-primary font-bold mt-1 text-[13px]">
                  +₹54,250 net FPO delta
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[11px]">
                  Vs APMC commission loss
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-space-xs mt-space-md pt-space-sm bg-surface-container-lowest border-t border-outline-variant/20">
            <button
              onClick={handleAcceptPool}
              disabled={allocationStatus === 'accepted'}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-lg font-label-lg text-label-lg shadow-xs transition-all ${
                allocationStatus === 'accepted'
                  ? 'bg-primary-container text-on-primary font-bold'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${allocationStatus === 'loading' ? 'animate-spin' : ''}`}>
                {allocationStatus === 'loading' ? 'sync' : allocationStatus === 'accepted' ? 'verified' : 'check_circle'}
              </span>
              <span>
                {allocationStatus === 'loading'
                  ? 'Locking 5.0 MT into Pool...'
                  : allocationStatus === 'accepted'
                  ? 'Allocation Locked: 5.0 MT'
                  : 'Accept Allocation & Join Pool'}
              </span>
            </button>
            <button
              onClick={() => onNavigate('net-realization-engine')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Simulate Net Realization</span>
            </button>
            <button
              onClick={() => onNavigate('buyer-matching-offers')}
              className="inline-flex items-center justify-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Review Buyer Contract</span>
            </button>
          </div>
        </div>

        {/* Right: Active Produce Lots & Freshness Radar (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
                    Produce Lots &amp; Freshness
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    IoT sensor telemetry &amp; degradation tracking
                  </p>
                </div>
              </div>
              <span className="px-space-xs py-0.5 rounded-lg bg-surface-container-high font-label-md text-label-md text-on-surface-variant text-[11px] font-bold">
                {lots.length} Active Lots
              </span>
            </div>

            {/* Lot Cards Container */}
            <div className="space-y-space-sm mt-space-sm">
              {lots.slice(0, 2).map((lot) => {
                const isCritical = lot.freshnessRemainingHrs <= 30;
                return (
                  <div
                    key={lot.id}
                    className="bg-surface-container-low rounded-xl p-space-sm transition-all hover:bg-surface-container border border-outline-variant/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-title-sm text-title-sm font-bold text-on-surface text-[13px]">
                            {lot.id}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded-md font-label-md text-[10px] font-bold uppercase ${
                              isCritical
                                ? 'bg-error-container text-on-error-container'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {isCritical ? `Expiring <${lot.freshnessRemainingHrs}h` : 'Stable (Cold Link)'}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-[12px]">
                          {lot.variety} • {lot.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">
                          {lot.tonnage.toFixed(1)} MT
                        </span>
                        <span className="block font-label-md text-label-md text-on-surface-variant text-[11px]">
                          Harvest: {lot.harvestHoursAgo}h ago
                        </span>
                      </div>
                    </div>

                    {/* Freshness Window Bar */}
                    <div className="mt-3 bg-surface-container-lowest p-space-xs rounded-lg shadow-xs border border-outline-variant/20">
                      <div className="flex justify-between items-center text-label-md font-label-md text-on-surface-variant mb-1 text-[11px]">
                        <span
                          className={`flex items-center gap-1 font-semibold ${
                            isCritical ? 'text-error' : 'text-primary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isCritical ? 'cloud_download' : 'ac_unit'}
                          </span>{' '}
                          Freshness Window Remaining: {lot.freshnessRemainingHrs}h
                        </span>
                        <span className="text-on-surface font-semibold">
                          {lot.qualityRetainedPercent}% Quality
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCritical ? 'bg-error' : 'bg-primary'
                          }`}
                          style={{ width: `${lot.qualityRetainedPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div
                        className={`flex items-center gap-1 font-label-md text-label-md font-semibold text-[11px] ${
                          isCritical ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isCritical ? 'bolt' : 'warehouse'}
                        </span>
                        <span className="truncate max-w-[200px]">{lot.recommendedAction}</span>
                      </div>
                      <button
                        onClick={() => setSelectedLotForAssay(lot)}
                        className="px-2 py-1 rounded-md bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-xs text-[11px] font-semibold border border-outline-variant/20"
                        type="button"
                      >
                        {isCritical ? 'View Assay' : 'Telemetry'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Micro Telemetry Footer */}
          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/20 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span> Anand Cold Hub: 8.2°C, 88% RH
            </span>
            <button
              onClick={() => onNavigate('produce-lots')}
              className="text-primary font-label-md text-label-md hover:underline font-bold"
              type="button"
            >
              All {lots.length} Batches →
            </button>
          </div>
        </div>
      </div>

      {/* Lower Analytical Grid: Arbitrage Matrix, Spoilage & Logistics Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Left: Regional Price & Net Realization Arbitrage Matrix (6 Cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="p-1.5 rounded-lg bg-surface-container text-primary">
                  <span className="material-symbols-outlined text-[20px]">table_chart</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
                    Regional Channel Arbitrage Engine
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Net Farmer Realization after Mandi fees, logistics &amp; decay penalties
                  </p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-primary font-bold px-2 py-1 bg-surface-container-high rounded-md text-[11px]">
                Live Mandi API Sync
              </span>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left font-body-sm text-body-sm text-[12px]">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3 rounded-l-lg">Channel / Off-taker</th>
                    <th className="py-2.5 px-3">Gross Bid</th>
                    <th className="py-2.5 px-3">Deductions (Cess/Freight)</th>
                    <th className="py-2.5 px-3 text-right">Net Farmer Realization</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Alpha Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                        Anand APMC Mandi
                      </div>
                      <div className="text-on-surface-variant font-body-sm text-[11px]">Commission Agent / Arhatiya</div>
                    </td>
                    <td className="py-3 px-3 text-on-surface">₹24.00/kg</td>
                    <td className="py-3 px-3 text-error font-medium">-₹4.65 (8.5% fee + loading)</td>
                    <td className="py-3 px-3 text-right font-title-sm text-title-sm font-bold text-on-surface">
                      ₹19.35/kg
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md text-[11px]">
                        Baseline
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                        Local Village Trader
                      </div>
                      <div className="text-on-surface-variant font-body-sm text-[11px]">Farmgate aggregator pickup</div>
                    </td>
                    <td className="py-3 px-3 text-on-surface">₹21.00/kg</td>
                    <td className="py-3 px-3 text-on-surface-variant">₹0.00 (Self-transport)</td>
                    <td className="py-3 px-3 text-right font-title-sm text-title-sm font-bold text-on-surface">
                      ₹21.00/kg
                    </td>
                    <td className="py-3 px-3 text-right text-primary font-semibold font-label-md text-label-md text-[11px]">
                      +₹1.65/kg
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                        Direct Buyer A (Vadodara)
                      </div>
                      <div className="text-on-surface-variant font-body-sm text-[11px]">Sole FPO dispatch (3.4 MT)</div>
                    </td>
                    <td className="py-3 px-3 text-on-surface">₹31.00/kg</td>
                    <td className="py-3 px-3 text-on-surface-variant">-₹2.60 (Dedicated small truck)</td>
                    <td className="py-3 px-3 text-right font-title-sm text-title-sm font-bold text-on-surface">
                      ₹28.40/kg
                    </td>
                    <td className="py-3 px-3 text-right text-primary font-semibold font-label-md text-label-md text-[11px]">
                      +₹9.05/kg
                    </td>
                  </tr>

                  <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                    <td className="py-3 px-3 rounded-l-lg">
                      <div className="flex items-center gap-1.5 font-title-sm text-title-sm text-primary font-bold text-[13px]">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Direct Buyer B (Virtual Pool)</span>
                      </div>
                      <div className="text-on-surface-variant font-body-sm text-[11px]">12 MT Multi-FPO Pooled Reefer</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-on-surface">₹32.50/kg</td>
                    <td className="py-3 px-3 text-primary font-medium">-₹2.30 (Shared reefer backhaul)</td>
                    <td className="py-3 px-3 text-right font-headline-sm text-headline-sm font-bold text-primary">
                      ₹30.20/kg
                    </td>
                    <td className="py-3 px-3 text-right rounded-r-lg">
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold font-label-md text-label-md text-[11px]">
                        +₹10.85/kg (+56%)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low p-space-xs rounded-lg text-[12px] border border-outline-variant/20">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">shield</span> Guaranteed payment settlement via e-NAM / Bank Escrow within 24h
            </span>
            <button
              onClick={handleDownloadAudit}
              className="text-primary font-label-md text-label-md font-bold hover:underline"
              type="button"
            >
              Download Audit Sheet
            </button>
          </div>
        </div>

        {/* Right: Spoilage & Logistics Feed + Backhaul Subsidy Card (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-space-sm">
          {/* Backhaul Logistics Opportunity Highlight */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant/30">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-title-sm text-title-sm text-on-surface font-bold text-[14px]">
                      Reverse Logistics Opportunity Detected
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-md text-[11px] font-bold">
                      Active Right Now
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Intelligent empty-mile return journey routing
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-primary-fixed text-primary font-label-md text-label-md font-bold text-[11px]">
                Save ₹400/trip
              </span>
            </div>

            <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-outline-variant/20">
              <div className="space-y-1">
                <div className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5 text-[13px]">
                  <span>Refrigerated E-Truck GJ-23-AX-8912</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">electric_bolt</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Returning empty from Ahmedabad Mandi drop.{' '}
                  <strong className="text-on-surface">40 crates available</strong>. Passing Anand toll plaza at 14:15.
                </p>
              </div>
              <button
                onClick={handleReserveBackhaul}
                disabled={backhaulReserved}
                className={`px-space-md py-2 rounded-lg font-label-lg text-label-lg whitespace-nowrap shadow-xs transition-all ${
                  backhaulReserved
                    ? 'bg-primary-container text-on-primary font-bold cursor-default'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                type="button"
              >
                {backhaulReserved ? 'Slot Reserved' : 'Reserve Backhaul Slot'}
              </button>
            </div>
          </div>

          {/* Real-time Spoilage & Cold Chain Feed */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex-1 flex flex-col justify-between border border-outline-variant/30">
            <div className="flex items-center justify-between mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="p-1 rounded-lg bg-surface-container text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                </span>
                <span className="font-title-sm text-title-sm text-on-surface font-bold text-[14px]">
                  Freshness Alerts &amp; Telemetry Stream
                </span>
              </div>
              <span className="font-label-md text-label-md text-primary font-medium text-[11px]">
                1-sec latency
              </span>
            </div>

            <div className="space-y-2 mt-2">
              {/* Alert 1 */}
              <div className="flex items-start gap-space-xs p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-error flex-shrink-0 mt-0.5">
                  notification_important
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate text-[12px]">
                      Anand Staging Area Ambient Spike
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant flex-shrink-0 text-[11px]">
                      8m ago
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    Zone B temp jumped to 31.2°C. Recommended action: Shift Lot TOM-0042 to shaded bay or load immediately.
                  </p>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="flex items-start gap-space-xs p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate text-[12px]">
                      Kheda FPO C Accepted Mutual Pool
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant flex-shrink-0 text-[11px]">
                      22m ago
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    4.0 Tonnes locked into #VPL-AHM-902. Virtual Pool threshold reached 75%.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-space-sm pt-space-xs flex items-center justify-between text-[12px] border-t border-outline-variant/20">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Simulated Sensors: 18 active probes
              </span>
              <button
                onClick={() => onNavigate('produce-lots')}
                className="text-primary font-label-md text-label-md font-bold hover:underline"
                type="button"
              >
                View IoT Sensor Matrix →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Assay Inspection Popover/Modal */}
      {selectedLotForAssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-xl p-space-md shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                  Optical AI Quality Assay Certificate
                </h4>
              </div>
              <button
                onClick={() => setSelectedLotForAssay(null)}
                className="p-1 rounded text-on-surface-variant hover:bg-surface-container"
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between p-2 bg-surface-container-low rounded">
                <span className="text-on-surface-variant">Batch Identifier:</span>
                <span className="font-bold text-on-surface font-mono">{selectedLotForAssay.id}</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-container-low rounded">
                <span className="text-on-surface-variant">Variety &amp; Grade:</span>
                <span className="font-bold text-on-surface">{selectedLotForAssay.variety}</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-container-low rounded">
                <span className="text-on-surface-variant">Sugar / Brix Index:</span>
                <span className="font-bold text-primary">4.8° Bx (Grade A Premium)</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-container-low rounded">
                <span className="text-on-surface-variant">Firmness / Defect Rate:</span>
                <span className="font-bold text-on-surface">&lt;2.1% Surface Blemish</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-container-low rounded">
                <span className="text-on-surface-variant">Current Temperature:</span>
                <span className="font-bold text-on-surface">{selectedLotForAssay.temperature}°C (Optimal)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLotForAssay(null)}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-[12px] font-bold"
                type="button"
              >
                Close Assay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
