import React, { useState, useEffect } from 'react';
import { Icon, Badge, Button, cn } from '../ui';

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

  const stageLabels = ['STAGE 1: INGESTION', 'STAGE 2: AI OPTIMIZATION', 'STAGE 3: EXECUTION'];

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
    <div className="kf-overlay">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-pop">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
              <Icon name="flag" size={16} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-semibold text-ink">National Agri-Grid: 12-Step Autonomous Flow</h3>
                <Badge tone={currentStep === 12 ? 'good' : 'primary'}>
                  {currentStep === 12 ? 'Pipeline complete' : `Running step ${currentStep}/12…`}
                </Badge>
              </div>
              <p className="kf-helper mt-0.5">Anand FPO → Virtual Pooling → Institutional Settlement</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon="replay" onClick={handleStartSimulation} disabled={isRunning}>
              {isRunning ? 'Simulating…' : 'Re-run pipeline'}
            </Button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink"
              type="button"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[0, 1, 2].map((stage) => (
              <div key={stage} className="flex flex-col rounded-lg border border-line bg-subtle p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-primary">{stageLabels[stage]}</span>
                  <span className="font-mono text-[10px] text-faint">STEPS {stage * 4 + 1} - {stage * 4 + 4}</span>
                </div>
                <ul className="mt-2.5 space-y-2">
                  {steps.slice(stage * 4, stage * 4 + 4).map((s) => {
                    const isDone = currentStep >= s.num;
                    const isCurrent = currentStep === s.num;
                    return (
                      <li
                        key={s.num}
                        className={cn(
                          'flex items-start gap-1.5 rounded-md p-1.5 transition-all',
                          isCurrent
                            ? 'border border-primary/40 bg-primary-soft text-primary-strong'
                            : isDone
                              ? 'text-primary'
                              : 'text-faint opacity-70',
                        )}
                      >
                        <Icon name={isDone ? 'check_circle' : 'radio_button_unchecked'} size={15} className="mt-0.5 shrink-0" />
                        <div className="text-[11.5px] leading-tight">
                          <span className={cn('font-medium', isDone && !isCurrent ? 'text-ink' : '')}>
                            {s.num}. {s.title}
                          </span>
                          {isCurrent && <span className="mt-0.5 block text-[10px] text-muted">{s.detail}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="overflow-x-auto rounded-xl border border-line bg-navy p-4 font-mono shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 kf-live-dot"></span>
                TERMINAL LOG: AGRIFLOW_ORCHESTRATOR_RUN
              </span>
              <span className="font-bold text-emerald-300">COMPLETED IN 142ms</span>
            </div>
            <div className="mt-2 space-y-1.5 text-[12px] text-white/70">
              <p>
                <span className="text-emerald-300">[12:44:01]</span> INGEST: Loaded 8,400 kg Solanum lycopersicum (Himsona) from Anand Geo-fence.
              </p>
              <p>
                <span className="text-emerald-300">[12:44:02]</span> SOLVE: Prophet model identifies Ahmedabad city demand index = 1.18 (+18%).
              </p>
              <p>
                <span className="text-emerald-300">[12:44:02]</span> CONSTRAIN: Shelf life degradation penalizes transit &gt; 4.2h. Ahmedabad distance = 68km (1.8h safe).
              </p>
              <p>
                <span className="text-emerald-300">[12:44:03]</span> OPTIMIZE: Joined with Kheda FPO (4T) + Anand B (3T) = 12T batch. Unlocks Tier-1 pricing @ ₹30.20/kg.
              </p>
              <p className="rounded bg-emerald-400/15 p-1.5 font-bold text-emerald-200">
                [12:44:03] ARBITRAGE WON: +₹10.85/kg over APMC benchmark. Escrow #ESC-AHM-902 initiated.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line bg-subtle px-5 py-3.5">
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <Icon name="verified" size={15} className="text-primary" />
            Validated against MoCA &amp; Food &amp; Public Distribution guidelines
          </span>
          <Button onClick={onClose}>Close Flow Visualizer</Button>
        </div>
      </div>
    </div>
  );
};