import React, { useState } from 'react';
import { NavScreenId } from '../../types';

interface DemandIntelligenceScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const DemandIntelligenceScreen: React.FC<DemandIntelligenceScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Potato' | 'Onion' | 'Chilli'>('Tomato');
  const [targetNode, setTargetNode] = useState('Ahmedabad Urban Metro (Zone 1)');
  const [horizon, setHorizon] = useState<'7-Day' | '14-Day' | '30-Day' | 'Backtest'>('7-Day');
  const [buyerSegment, setBuyerSegment] = useState('All Aggregated Segments (B2B + APMC)');
  const [isSimulating, setIsSimulating] = useState(false);
  const [mobilizedNodes, setMobilizedNodes] = useState<Record<string, boolean>>({});

  const handleRerunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onShowToast('XGB-Prophet pipeline executed in 13.8ms! Demand surfaces updated for 4 APMC zones.');
    }, 600);
  };

  const handleMobilize = (nodeId: string, nodeName: string) => {
    setMobilizedNodes((prev) => ({ ...prev, [nodeId]: true }));
    onShowToast(`Dispatched cluster mobilization broadcast for ${nodeName}! 6 mandal leads notified via SMS & e-Mandate.`);
  };

  const handleExportManifests = () => {
    onShowToast('Generating digital dispatch manifest PDF with QR verification stamps... Download initiated.');
  };

  const handleBroadcastAlerts = () => {
    onShowToast('Broadcast transmitted to 1,420 smallholder SMS terminals & WhatsApp KisanFlow bot.');
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Command Context Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
            <span className="text-primary font-semibold">Demand Model Active</span>
            <span>·</span>
            <span>Gujarat APMC &amp; Retail Network</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Regional Demand Intelligence &amp; Forecast Engine
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-4xl text-[12px]">
            Predictive supply-demand clearing interface leveraging multi-source econometric inputs: APMC mandi arrivals, IMD hyper-local weather models, organized retail POS signals, and festive consumption waves.
          </p>
        </div>

        {/* Execution Model Telemetry */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-container shadow-xs self-start lg:self-auto border border-outline-variant/30 text-[11px]">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase font-medium">
              Model
            </span>
            <span className="font-bold text-primary">
              XGB-Prophet Hybrid
            </span>
          </div>
          <div className="h-6 w-px bg-outline-variant/30"></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase font-medium">
              Latency
            </span>
            <span className="font-bold text-on-surface">14.2 ms</span>
          </div>
          <button
            onClick={handleRerunSimulation}
            disabled={isSimulating}
            className="p-1.5 rounded-md bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-colors shadow-xs"
            title="Re-run Simulation"
            type="button"
          >
            <span className={`material-symbols-outlined text-[16px] ${isSimulating ? 'animate-spin' : ''}`}>
              sync
            </span>
          </button>
        </div>
      </div>

      {/* Operational Filter Matrix */}
      <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs mb-space-lg border border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Crop Selector */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1.5 text-[11px] font-bold">
              Selected Commodity
            </label>
            <div className="flex flex-wrap gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
              {(['Tomato', 'Potato', 'Onion', 'Chilli'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  type="button"
                  className={`flex-1 min-w-[65px] py-1.5 px-2 rounded font-label-md text-label-md text-center text-[12px] transition-all font-semibold ${
                    selectedCrop === crop
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Target Region */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1.5 text-[11px] font-bold">
              Target Consumption Node
            </label>
            <div className="relative">
              <select
                value={targetNode}
                onChange={(e) => setTargetNode(e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded bg-surface-container-low text-on-surface font-title-sm text-title-sm appearance-none cursor-pointer focus:outline-none focus:bg-surface-container border border-outline-variant/20 text-[13px]"
              >
                <option>Ahmedabad Urban Metro (Zone 1)</option>
                <option>Surat Institutional &amp; Processing</option>
                <option>Vadodara Wholesale Hub</option>
                <option>Rajkot Central Logistics Terminal</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Forecast Horizon Tabs */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1.5 text-[11px] font-bold">
              Projection Window
            </label>
            <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
              {(['7-Day', '14-Day', '30-Day', 'Backtest'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  type="button"
                  className={`flex-1 py-1.5 rounded font-label-md text-label-md text-center text-[12px] font-semibold transition-all ${
                    horizon === h
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Buyer Segment Filter */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1.5 text-[11px] font-bold">
              Buyer Inflow Filter
            </label>
            <div className="relative">
              <select
                value={buyerSegment}
                onChange={(e) => setBuyerSegment(e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded bg-surface-container-low text-on-surface font-title-sm text-title-sm appearance-none cursor-pointer focus:outline-none focus:bg-surface-container border border-outline-variant/20 text-[13px]"
              >
                <option>All Aggregated Segments (B2B + APMC)</option>
                <option>Modern Retail &amp; Supermarkets (Reliance, DMart)</option>
                <option>Food Processors (Sauce / Puree / Pure)</option>
                <option>HoReCa / Commercial Restaurants</option>
                <option>Mandi Commission Agents (APMC Kalupur)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[20px]">
                tune
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Forecast Visualization & High-Density Metrics Bento */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-lg">
        {/* Left: Big Metric Highlight Cards (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          {/* Critical Deficit Alert Card */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary/5 pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md uppercase font-bold text-[11px]">
                  {selectedCrop} • Ahmedabad Metro
                </span>
                <span className="flex items-center gap-1 font-label-md text-label-md text-primary font-bold text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
                  91.4% Confidence
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
                7-Day Aggregate Demand
              </span>
              <div className="flex items-baseline gap-space-sm mt-1">
                <span className="font-metric-numeral text-metric-numeral text-on-surface tracking-tight">
                  425 MT
                </span>
                <span className="font-label-lg text-label-lg text-primary font-bold flex items-center text-[14px]">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span> +18.1%
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
                vs 30-Day moving regional baseline (360 MT normal volume)
              </p>
            </div>

            {/* Deficit Meter & Action Vector */}
            <div className="mt-space-md pt-space-md bg-surface-container-low p-space-md rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-title-sm text-title-sm text-on-surface text-[13px] font-semibold">
                  Committed Local Supply
                </span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface text-[14px]">
                  310 MT
                </span>
              </div>
              {/* Split Bar Visualizing Deficit */}
              <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden flex">
                <div className="bg-primary h-full transition-all duration-500" style={{ width: '72.9%' }} title="Committed Supply (310T)"></div>
                <div className="bg-error h-full transition-all duration-500" style={{ width: '27.1%' }} title="Projected Supply Gap (115T)"></div>
              </div>
              <div className="flex items-center justify-between mt-2 font-label-md text-label-md text-[11px]">
                <span className="text-primary font-semibold">Allocated: 73%</span>
                <span className="text-error font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[16px]">warning</span> Projected Deficit: 115 MT
                </span>
              </div>
            </div>

            <div className="mt-space-md flex items-center justify-between text-on-surface-variant text-[12px]">
              <div className="flex items-center gap-1.5 font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">hub</span>
                <span>Cluster Lead: Anand FPO</span>
              </div>
              <span className="font-body-sm text-body-sm">Lead time: 4.5 hrs</span>
            </div>
          </div>

          {/* Live Macro Driver Indicator */}
          <div className="p-space-md rounded-xl bg-tertiary-fixed text-on-tertiary-fixed shadow-xs border border-tertiary/20">
            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-tertiary-container text-[24px] mt-0.5">campaign</span>
              <div>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-tertiary-fixed-variant text-[11px]">
                  Demand Anomaly Detected
                </span>
                <p className="font-title-sm text-title-sm mt-0.5 font-bold text-[14px]">
                  Upcoming Festive Weekend &amp; Heatwave Warning
                </p>
                <p className="font-body-sm text-body-sm mt-1 text-on-tertiary-fixed-variant leading-relaxed text-[12px]">
                  IMD forecasts +3.2°C ambient surge accelerating retail shelf spoilage by 24 hours. Combined with Navratri preparatory wholesale bulk purchases, regional off-take will peak sharply between Day 3 and Day 5.
                </p>
              </div>
            </div>
          </div>

          {/* Realized Price Spread Snapshot */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/30">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase text-[11px]">
                Forecasted Clearing Price
              </span>
              <p className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
                ₹31.50 – ₹36.00 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal text-[12px]">/ kg</span>
              </p>
              <span className="font-body-sm text-body-sm text-primary font-medium text-[12px]">
                +₹6.20/kg premium over local Mandi pit-head
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-[28px]">currency_rupee</span>
            </div>
          </div>
        </div>

        {/* Right: High-Fidelity SVG Interactive Forecast Visualization (8 Cols) */}
        <div className="xl:col-span-8 p-space-lg rounded-xl bg-surface-container-lowest shadow-xs flex flex-col border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
                Multi-Stream Forecast Canvas
              </span>
              <h2 className="font-title-md text-title-md text-on-surface font-bold text-[16px]">
                {selectedCrop} Consumption Trajectory vs. Committed Inflows
              </h2>
            </div>
            {/* Legend Tokens */}
            <div className="flex flex-wrap items-center gap-space-sm font-label-md text-label-md text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-secondary rounded-full"></span>
                <span className="text-on-surface-variant">Historical (Mandi Actuals)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-primary rounded-full"></span>
                <span className="text-on-surface font-semibold">Predicted Demand (MT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-secondary-container rounded"></span>
                <span className="text-on-surface-variant">Committed Supply</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="text-error font-bold">Deficit Zone</span>
              </div>
            </div>
          </div>

          {/* Forecast Chart SVG Canvas Container */}
          <div className="w-full flex-1 min-h-[320px] bg-surface-container-low/50 rounded-xl p-space-md flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
            {/* Chart Header Annotation Banner */}
            <div className="flex items-center justify-between z-10 text-[11px]">
              <span className="font-label-md text-label-md text-on-surface-variant">
                Simulation baseline calibrated at 04:00 AM IST
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-label-md text-on-surface font-medium border border-outline-variant/20">
                95% Prediction Interval Envelope
              </span>
            </div>

            {/* High-Resolution SVG Line & Deficit Bar Chart */}
            <div className="w-full h-64 relative my-2">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 740 240">
                <defs>
                  <linearGradient id="confidenceEnvelope" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#004c22" stopOpacity="0.18"></stop>
                    <stop offset="100%" stopColor="#004c22" stopOpacity="0.02"></stop>
                  </linearGradient>
                  <linearGradient id="deficitFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.75"></stop>
                    <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.25"></stop>
                  </linearGradient>
                </defs>
                {/* Background Grid Lines */}
                <g opacity="0.4">
                  <line stroke="#707a6f" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="740" y1="40" y2="40"></line>
                  <line stroke="#707a6f" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="740" y1="90" y2="90"></line>
                  <line stroke="#707a6f" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="740" y1="140" y2="140"></line>
                  <line stroke="#707a6f" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="740" y1="190" y2="190"></line>
                </g>
                {/* Grid Tonnage Reference Labels */}
                <text fill="#565e74" fontFamily="Public Sans" fontSize="10" x="5" y="36">80 MT</text>
                <text fill="#565e74" fontFamily="Public Sans" fontSize="10" x="5" y="86">60 MT</text>
                <text fill="#565e74" fontFamily="Public Sans" fontSize="10" x="5" y="136">40 MT</text>
                <text fill="#565e74" fontFamily="Public Sans" fontSize="10" x="5" y="186">20 MT</text>

                {/* Historical Supply Bars (Days -3, -2, -1) */}
                <rect fill="#dae2fd" height="95" rx="3" width="28" x="55" y="105"></rect>
                <rect fill="#dae2fd" height="105" rx="3" width="28" x="135" y="95"></rect>
                <rect fill="#dae2fd" height="90" rx="3" width="28" x="215" y="110"></rect>

                {/* Historical Actual Demand Line */}
                <path d="M 70 100 L 150 92 L 230 108 L 310 82" fill="none" stroke="#565e74" strokeLinecap="round" strokeWidth="2.5"></path>
                <circle cx="70" cy="100" fill="#565e74" r="4"></circle>
                <circle cx="150" cy="92" fill="#565e74" r="4"></circle>
                <circle cx="230" cy="108" fill="#565e74" r="4"></circle>

                {/* Forecast Separation Milestone */}
                <line stroke="#004c22" strokeDasharray="4,4" strokeWidth="1.5" x1="310" x2="310" y1="15" y2="200"></line>
                <text fill="#004c22" fontFamily="Public Sans" fontSize="10" fontWeight="700" x="315" y="26">TODAY (T-0)</text>

                {/* Forecast Supply Bars (Day 1 to Day 4) */}
                <rect fill="#dae2fd" height="102" rx="3" width="28" x="375" y="98"></rect>
                <rect fill="#dae2fd" height="88" rx="3" width="28" x="460" y="112"></rect>
                <rect fill="#dae2fd" height="75" rx="3" width="28" x="545" y="125"></rect>
                <rect fill="#dae2fd" height="70" rx="3" width="28" x="630" y="130"></rect>

                {/* Widening Deficit Visual Blocks (Stacked on Supply) */}
                <rect fill="url(#deficitFill)" height="30" rx="3" width="28" x="460" y="80"></rect>
                <rect fill="url(#deficitFill)" height="75" rx="3" width="28" x="545" y="48"></rect>
                <rect fill="url(#deficitFill)" height="66" rx="3" width="28" x="630" y="62"></rect>

                {/* Confidence Envelope Polygon (Days 0 to 4) */}
                <polygon fill="url(#confidenceEnvelope)" points="310,82 390,62 475,50 560,28 645,40 645,86 560,78 475,95 390,92 310,82"></polygon>

                {/* Forecast Primary Demand Line */}
                <path d="M 310 82 L 390 75 L 475 66 L 560 42 L 645 54" fill="none" stroke="#004c22" strokeLinecap="round" strokeWidth="3"></path>

                {/* Forecast Points */}
                <circle cx="310" cy="82" fill="#004c22" r="4.5"></circle>
                <circle cx="390" cy="75" fill="#004c22" r="4.5"></circle>
                <circle cx="475" cy="66" fill="#004c22" r="4.5"></circle>
                <circle cx="560" cy="42" fill="#ba1a1a" r="5.5"></circle>
                <circle cx="645" cy="54" fill="#004c22" r="4.5"></circle>

                {/* Critical Spike Callout Box at Day 3 (Peak Deficit) */}
                <g transform="translate(500, 8)">
                  <rect fill="#ba1a1a" height="26" rx="4" width="130" x="0" y="0"></rect>
                  <text fill="#ffffff" fontFamily="Public Sans" fontSize="9" fontWeight="700" textAnchor="middle" x="65" y="17">
                    PEAK DEFICIT: 48 MT
                  </text>
                  <line stroke="#ba1a1a" strokeWidth="2" x1="60" x2="60" y1="26" y2="34"></line>
                </g>
              </svg>
            </div>

            {/* Horizontal Date / Time Labels */}
            <div className="grid grid-cols-7 pt-space-xs text-center font-label-md text-label-md text-on-surface-variant border-t border-outline-variant/20 text-[11px]">
              <div><span className="block font-bold">Wed</span><span className="text-[10px]">D-3 Actual</span></div>
              <div><span className="block font-bold">Thu</span><span className="text-[10px]">D-2 Actual</span></div>
              <div><span className="block font-bold">Fri</span><span className="text-[10px]">D-1 Actual</span></div>
              <div className="text-primary font-bold"><span className="block">Sat (Today)</span><span className="text-[10px]">48 MT Req</span></div>
              <div><span className="block font-bold">Sun</span><span className="text-[10px]">54 MT Req</span></div>
              <div className="text-error font-bold"><span className="block">Mon (Festive)</span><span className="text-[10px]">72 MT Peak</span></div>
              <div><span className="block font-bold">Tue</span><span className="text-[10px]">64 MT Req</span></div>
            </div>
          </div>

          {/* Chart Bottom Summary Pill Ribbon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm mt-space-md">
            <div className="p-2.5 rounded bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
              <div className="truncate">
                <span className="block font-label-md text-label-md text-on-surface-variant uppercase text-[10px]">
                  Mandi Inflow Signal
                </span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                  -26% Deficit vs 5yr Avg
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary text-[20px]">thermostat</span>
              <div className="truncate">
                <span className="block font-label-md text-label-md text-on-surface-variant uppercase text-[10px]">
                  Microclimate Factor
                </span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                  +3.2°C Ambient Heat
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-on-secondary-container text-[20px]">local_mall</span>
              <div className="truncate">
                <span className="block font-label-md text-label-md text-on-surface-variant uppercase text-[10px]">
                  Retail POS Off-Take
                </span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold text-[13px]">
                  1.42x Surge Index
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demand-to-Farm Opportunity Action Matrix */}
      <div className="mb-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider text-[11px]">
                FPO Dispatch Operations
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">
              Identified Supply Gaps &amp; Actionable Farmer Signals
            </h2>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={handleExportManifests}
              className="px-3 py-1.5 rounded bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 text-[12px] font-semibold border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span> Export Dispatch Manifests
            </button>
            <button
              onClick={handleBroadcastAlerts}
              className="px-3 py-1.5 rounded bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors flex items-center gap-1 shadow-xs text-[12px]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">broadcast_on_personal</span> Broadcast Alerts to FPOs
            </button>
          </div>
        </div>

        {/* 3 Actionable Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1: Ahmedabad Urban Tomatoes */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-md text-label-md font-bold text-[11px]">
                  High Priority Deficit
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant font-mono text-[11px]">
                  NODE-AHM-01
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold text-[15px]">
                Ahmedabad Urban Metro
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                Commodity: Tomatoes (Grade A - Fresh Table)
              </p>

              <div className="grid grid-cols-2 gap-space-sm my-space-md p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Projected Gap
                  </span>
                  <span className="font-headline-sm text-headline-sm text-error font-bold">115 MT</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Expected Price
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    ₹31 – ₹36 <span className="text-xs font-normal">/kg</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">verified</span>
                  <p className="font-body-sm text-body-sm text-on-surface leading-snug text-[12px]">
                    <span className="font-bold">Recommended Action:</span> Trigger dispatch from Anand &amp; Kheda cooperative clusters (&lt; 150 km radial distance).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md pl-6 text-[11px]">
                  <span>Delivery SLA: <strong className="text-on-surface">6 Hours</strong></span>
                  <span>•</span>
                  <span>Confidence: <strong className="text-primary">91%</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-outline-variant/20">
              <div className="flex -space-x-1 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full bg-primary-container text-on-primary text-[10px] font-bold flex items-center justify-center">
                  AN
                </div>
                <div className="inline-block h-6 w-6 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">
                  KH
                </div>
              </div>
              <button
                onClick={() => handleMobilize('ahmedabad', 'Ahmedabad Urban Metro')}
                className={`px-3 py-1 rounded font-label-md text-label-md font-semibold transition-colors text-[12px] ${
                  mobilizedNodes['ahmedabad']
                    ? 'bg-primary text-on-primary'
                    : 'bg-primary-container text-on-primary hover:bg-primary'
                }`}
                type="button"
              >
                {mobilizedNodes['ahmedabad'] ? 'Cluster Mobilized' : 'Mobilize Cluster'}
              </button>
            </div>
          </div>

          {/* Card 2: Surat Food Processing Belt */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-bold text-[11px]">
                  Contract Processing
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant font-mono text-[11px]">
                  NODE-SUR-04
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold text-[15px]">
                Surat Food Processing Belt
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                Commodity: Tomatoes (Grade B - Sauce / Puree)
              </p>

              <div className="grid grid-cols-2 gap-space-sm my-space-md p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Projected Gap
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">80 MT</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Expected Price
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    ₹24 – ₹27 <span className="text-xs font-normal">/kg</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">verified</span>
                  <p className="font-body-sm text-body-sm text-on-surface leading-snug text-[12px]">
                    <span className="font-bold">Recommended Action:</span> Divert ripe lots &amp; second-picking harvests directly to Hazira industrial canning units.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md pl-6 text-[11px]">
                  <span>Payment Escrow: <strong className="text-primary">Instant T+1</strong></span>
                  <span>•</span>
                  <span>Confidence: <strong className="text-primary">88%</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-outline-variant/20">
              <div className="flex -space-x-1 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full bg-tertiary text-on-tertiary text-[10px] font-bold flex items-center justify-center">
                  NA
                </div>
                <div className="inline-block h-6 w-6 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">
                  SU
                </div>
              </div>
              <button
                onClick={() => onNavigate('buyer-matching-offers')}
                className="px-3 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-colors text-[12px]"
                type="button"
              >
                Review Bids (4)
              </button>
            </div>
          </div>

          {/* Card 3: Vadodara Quick-Commerce Capsicum */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold text-[11px]">
                  Premium Greenhouse
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant font-mono text-[11px]">
                  NODE-BDQ-02
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold text-[15px]">
                Vadodara Urban Quick-Commerce
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                Commodity: Capsicum / Shimla Mirch (Polyhouse)
              </p>

              <div className="grid grid-cols-2 gap-space-sm my-space-md p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Projected Gap
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">22 MT</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase block text-[10px]">
                    Expected Price
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    ₹42 – ₹48 <span className="text-xs font-normal">/kg</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">verified</span>
                  <p className="font-body-sm text-body-sm text-on-surface leading-snug text-[12px]">
                    <span className="font-bold">Recommended Action:</span> Mobilize Padra FPO protected greenhouse harvests for dark-store direct fulfillment.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md pl-6 text-[11px]">
                  <span>Cold-chain: <strong className="text-on-surface">Reefer Van</strong></span>
                  <span>•</span>
                  <span>Confidence: <strong className="text-primary">94%</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-outline-variant/20">
              <div className="flex -space-x-1 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                  PD
                </div>
              </div>
              <button
                onClick={() => handleMobilize('vadodara', 'Vadodara Quick-Commerce')}
                className={`px-3 py-1 rounded font-label-md text-label-md font-semibold transition-colors text-[12px] ${
                  mobilizedNodes['vadodara']
                    ? 'bg-primary text-on-primary'
                    : 'bg-primary-container text-on-primary hover:bg-primary'
                }`}
                type="button"
              >
                {mobilizedNodes['vadodara'] ? 'Cluster Mobilized' : 'Mobilize Cluster'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory ML Model Inspector & Infrastructure Telemetry */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-lg">
        {/* Feature Weights & SHAP Contribution Panel (7 Cols) */}
        <div className="xl:col-span-7 p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">
                Explainable AI (XAI) Diagnostics
              </span>
              <h3 className="font-title-md text-title-md text-on-surface font-bold text-[16px]">
                Model Feature Importance (Shapley Values)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container font-label-md text-label-md text-on-surface font-mono text-[11px] border border-outline-variant/20">
              Loss: RMSE 4.12 MT
            </span>
          </div>

          {/* Feature Bars List */}
          <div className="space-y-space-md">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-title-sm text-title-sm text-on-surface text-[13px] font-semibold">
                  1. Local Urban Retail Consumption Vector
                </span>
                <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                  38.0%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '38%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[11px]">
                Synthesized point-of-sale indices from 420+ hypermarkets &amp; modern trade channels across Ahmedabad metro.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-title-sm text-title-sm text-on-surface text-[13px] font-semibold">
                  2. Mandi Yard Inflow Deficits (Agmarknet Feeds)
                </span>
                <span className="font-title-sm text-title-sm font-bold text-primary text-[13px]">
                  26.0%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '26%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[11px]">
                Real-time APMC arrivals lag against historical moving averages at Kalupur, Naroda, and Jamalpur yards.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-title-sm text-title-sm text-on-surface text-[13px] font-semibold">
                  3. Weekend &amp; Festive Calendar Shock Index
                </span>
                <span className="font-title-sm text-title-sm font-bold text-tertiary text-[13px]">
                  19.0%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '19%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[11px]">
                Navratri festive multiplier + Saturday-Sunday household grocery procurement elasticity.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-title-sm text-title-sm text-on-surface text-[13px] font-semibold">
                  4. Micro-Climate Temperature &amp; Shelf Degradation
                </span>
                <span className="font-title-sm text-title-sm font-bold text-secondary text-[13px]">
                  17.0%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '17%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[11px]">
                Ambient field temperatures exceeding 38°C triggering accelerated post-harvest degradation &amp; rapid inventory rotation.
              </p>
            </div>
          </div>
        </div>

        {/* Live Architecture Specs & Institutional Disclaimer (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col justify-between gap-space-md">
          {/* Architecture Spec Sheet */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/30">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-1 text-[11px]">
              Pipeline Specifications
            </span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold mb-space-sm text-[16px]">
              Dual-Stage Regressive Architecture
            </h3>
            <div className="space-y-space-sm font-body-sm text-body-sm text-[12px]">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <span className="text-on-surface-variant">Base Estimator</span>
                <span className="font-mono text-on-surface font-semibold">Prophet (Bayesian Seasonality)</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <span className="text-on-surface-variant">Residual Booster</span>
                <span className="font-mono text-on-surface font-semibold">XGBoost v1.7.6 (DMatrix Regressor)</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <span className="text-on-surface-variant">Training Epochs / Window</span>
                <span className="font-mono text-on-surface font-semibold">1,095 Days (3 Years Rolling)</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <span className="text-on-surface-variant">Cross Validation</span>
                <span className="font-mono text-on-surface font-semibold">Purged Group Time-Series Split</span>
              </div>
            </div>
          </div>

          {/* Transparent Institutional Badge Container */}
          <div className="p-space-md rounded-xl bg-primary-container text-on-primary shadow-xs flex items-start gap-space-sm border border-outline-variant/20">
            <span className="material-symbols-outlined text-[24px] text-on-primary-container mt-0.5">account_balance</span>
            <div>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-primary-container font-bold text-[11px]">
                Governmental Interoperability Ready
              </span>
              <p className="font-title-sm text-title-sm font-bold mt-0.5 text-[14px]">
                e-NAM &amp; State Mandi Board Bridge Compatible
              </p>
              <p className="font-body-sm text-body-sm mt-1 text-on-primary/90 leading-relaxed text-[12px]">
                Simulated ML Inference Architecture (Scikit-Learn / XGBoost + Prophet interface) ready for live state mandi API integration. Compliant with Smart India Hackathon 2026 data governance norms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
