import React, { useState, useEffect } from 'react';

interface Sih12StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishedFlow?: () => void;
}

export const Sih12StepModal: React.FC<Sih12StepModalProps> = ({
  isOpen,
  onClose,
  onFinishedFlow,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(12);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps = [
    { num: 1, stage: 1, title: 'Farmer Lot Harvest Log', detail: '8.4T aggregated across 14 smallholders' },
    { num: 2, stage: 1, title: 'Mobile Optical AI Assay (8.4T)', detail: 'Brix 4.8, 92% uniform firmness score' },
    { num: 3, stage: 1, title: 'Shelf-Life Decay Curve (48h)', detail: 'Degradation function parameterized with ambient heat' },
    { num: 4, stage: 1, title: 'Digital e-Mandate Minted', detail: 'FPO governance smart contract lock #GJ-4482' },
    { num: 5, stage: 2, title: 'XGBoost Hub Deficit Match', detail: 'Ahmedabad metro deficit identified: 115 MT shortfall' },
    { num: 6, stage: 2, title: 'Multi-FPO Virtual Pooling', detail: 'Consolidated Anand + Kheda + Charotar into 22.0T lot' },
    { num: 7, stage: 2, title: 'Net Realization Engine Arb', detail: '₹30.20/kg net vs ₹19.35/kg APMC (+56% arbitrage)' },
    { num: 8, stage: 2, title: 'Backhaul Reefer Routing', detail: 'E-truck GJ-23-AX-8912 slotted, saves ₹400 empty return' },
    { num: 9, stage: 3, title: 'Dynamic Escrow Lock (Buyer B)', detail: 'FreshBasket Institutional Escrow #ESC-AHM-902 activated' },
    { num: 10, stage: 3, title: 'Automated e-Waybill & Gatepass', detail: 'NIC GST e-Waybill API generated with QR clearance' },
    { num: 11, stage: 3, title: 'IoT Cold Chain Transit Stamp', detail: 'Telemetry probe tracking 8.2°C along NE-1 expressway' },
    { num: 12, stage: 3, title: 'Instant DBT to 1,420 Farmers', detail: 'Direct Benefit Transfer remittance split within 4 hours' },
  ];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < 12) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      if (onFinishedFlow) onFinishedFlow();
    }
  }, [isRunning, currentStep, onFinishedFlow]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-inverse-surface/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-surface-container-lowest rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-outline-variant/30">
        {/* Modal Header */}
        <div className="p-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[16px]">flag</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-on-surface text-[13.5px]">
                  National Agri-Grid: 12-Step Autonomous Flow
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-fixed text-primary">
                  {currentStep === 12 ? 'Pipeline Complete' : `Running Step ${currentStep}/12...`}
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px]">
                Simulated Decision Pipeline (Anand FPO → Virtual Pooling → Institutional Settlement)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary-container text-on-primary text-[11px] font-bold hover:bg-primary transition-all disabled:opacity-50"
              type="button"
            >
              <span className={`material-symbols-outlined text-[14px] ${isRunning ? 'animate-spin' : ''}`}>
                {isRunning ? 'sync' : 'replay'}
              </span>
              <span>{isRunning ? 'Simulating...' : 'Re-Run Pipeline'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Content: 12-Step Stepper Body */}
        <div className="p-space-lg overflow-y-auto space-y-space-md flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {/* Step Block 1: Ingestion */}
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-bold text-[11px] uppercase tracking-wider">
                    STAGE 1: INGESTION
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-mono">STEPS 1 - 4</span>
                </div>
                <ul className="mt-2 space-y-2 font-body-sm text-body-sm text-on-surface">
                  {steps.slice(0, 4).map((s) => {
                    const isDone = currentStep >= s.num;
                    const isCurrent = currentStep === s.num;
                    return (
                      <li
                        key={s.num}
                        className={`flex items-start gap-1.5 p-1.5 rounded transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border border-primary/40 font-bold text-primary'
                            : isDone
                            ? 'text-primary font-medium'
                            : 'text-on-surface-variant opacity-60'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0">
                          {isDone ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div className="text-[12px] leading-tight">
                          <span>{s.num}. {s.title}</span>
                          {isCurrent && <span className="block text-[10px] text-on-surface-variant mt-0.5">{s.detail}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Step Block 2: AI Optimization */}
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-bold text-[11px] uppercase tracking-wider">
                    STAGE 2: AI OPTIMIZATION
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-mono">STEPS 5 - 8</span>
                </div>
                <ul className="mt-2 space-y-2 font-body-sm text-body-sm text-on-surface">
                  {steps.slice(4, 8).map((s) => {
                    const isDone = currentStep >= s.num;
                    const isCurrent = currentStep === s.num;
                    return (
                      <li
                        key={s.num}
                        className={`flex items-start gap-1.5 p-1.5 rounded transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border border-primary/40 font-bold text-primary'
                            : isDone
                            ? 'text-primary font-medium'
                            : 'text-on-surface-variant opacity-60'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0">
                          {isDone ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div className="text-[12px] leading-tight">
                          <span>{s.num}. {s.title}</span>
                          {isCurrent && <span className="block text-[10px] text-on-surface-variant mt-0.5">{s.detail}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Step Block 3: Execution */}
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-bold text-[11px] uppercase tracking-wider">
                    STAGE 3: EXECUTION
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-mono">STEPS 9 - 12</span>
                </div>
                <ul className="mt-2 space-y-2 font-body-sm text-body-sm text-on-surface">
                  {steps.slice(8, 12).map((s) => {
                    const isDone = currentStep >= s.num;
                    const isCurrent = currentStep === s.num;
                    return (
                      <li
                        key={s.num}
                        className={`flex items-start gap-1.5 p-1.5 rounded transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border border-primary/40 font-bold text-primary'
                            : isDone
                            ? 'text-primary font-medium'
                            : 'text-on-surface-variant opacity-60'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0">
                          {isDone ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div className="text-[12px] leading-tight">
                          <span>{s.num}. {s.title}</span>
                          {isCurrent && <span className="block text-[10px] text-on-surface-variant mt-0.5">{s.detail}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Simulation Log Terminal Box */}
          <div className="bg-inverse-surface rounded-xl p-space-md font-mono text-label-md text-on-primary overflow-x-auto shadow-inner border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-secondary-fixed-variant pb-2 border-b border-outline-variant/20 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                <span>TERMINAL LOG: AGRIFLOW_ORCHESTRATOR_RUN</span>
              </span>
              <span className="text-primary-fixed-dim font-bold">COMPLETED IN 142ms</span>
            </div>
            <div className="space-y-1.5 text-on-tertiary-container mt-2 text-[12px]">
              <p>
                <span className="text-primary-fixed">[12:44:01]</span>{' '}
                <span className="text-inverse-on-surface">INGEST:</span> Loaded 8,400 kg Solanum lycopersicum (Himsona) from Anand Geo-fence.
              </p>
              <p>
                <span className="text-primary-fixed">[12:44:02]</span>{' '}
                <span className="text-inverse-on-surface">SOLVE:</span> Prophet model identifies Ahmedabad city demand index = 1.18 (+18%).
              </p>
              <p>
                <span className="text-primary-fixed">[12:44:02]</span>{' '}
                <span className="text-inverse-on-surface">CONSTRAIN:</span> Shelf life degradation penalizes transit &gt; 4.2h. Ahmedabad distance = 68km (1.8h safe).
              </p>
              <p>
                <span className="text-primary-fixed">[12:44:03]</span>{' '}
                <span className="text-inverse-on-surface">OPTIMIZE:</span> Joined with Kheda FPO (4T) + Anand B (3T) = 12T batch. Unlocks Tier-1 pricing @ ₹30.20/kg.
              </p>
              <p className="text-primary-fixed-dim font-bold bg-primary-container/20 p-1.5 rounded">
                [12:44:03] ARBITRAGE WON: +₹10.85/kg over APMC benchmark. Escrow #ESC-AHM-902 initiated.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-space-md bg-surface-container-low flex items-center justify-between border-t border-outline-variant/20">
          <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            <span>Validated against MoCA &amp; Food &amp; Public Distribution guidelines</span>
          </span>
          <button
            onClick={onClose}
            className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container font-semibold transition-all shadow-xs"
            type="button"
          >
            Close Flow Visualizer
          </button>
        </div>
      </div>
    </div>
  );
};
