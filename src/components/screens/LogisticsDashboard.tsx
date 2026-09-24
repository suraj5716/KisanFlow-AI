import React from 'react';
import { NavScreenId } from '../../types';
import { Icon, PageHeader, Card, Badge, Button, Metric, MetricStrip } from '../ui';

interface LogisticsDashboardProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Cold Chain & Logistics"
        eyebrow="Fleet operator workspace"
        subtitle="Optimize routes, manage fleet status, and monitor reverse logistics."
        actions={
          <Button variant="secondary" icon="route" onClick={() => onNavigate('logistics-route-optimizer')}>
            Open route optimizer
          </Button>
        }
      />

      <MetricStrip className="mt-6">
        <Metric label="Active fleet" value="14/18" hint="4 in standby rotation" />
        <Metric label="Backhaul matches" value="6" hint="₹14,500 empty-mile savings this month" tone="good" />
        <Metric label="Cold link integrity" value="99.2%" hint="sensor-probe average" tone="good" />
        <Metric label="Reefer temp alerts" value="1" hint="GJ-01-XX-1122 needs driver ping" tone="bad" />
      </MetricStrip>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Route optimizer */}
        <section>
          <h2 className="kf-section-title">Live route optimizer (OR-Tools)</h2>
          <p className="kf-helper mt-0.5">Multi-stop pickups sequenced to protect freshness</p>
          <Card className="mt-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-ink">Route #R-291 (Anand → Ahmedabad)</h3>
                <p className="kf-helper mt-0.5">Multi-stop pickup at 3 FPOs · ETA window 10:45 AM</p>
              </div>
              <Badge tone="primary" dot>En route</Badge>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px]">
              <span className="flex items-center gap-1 font-semibold text-primary">
                <Icon name="radio_button_checked" size={14} /> Anand Hub
              </span>
              <div className="flex-1 border-t border-dashed border-line-strong" />
              <span className="flex items-center gap-1 text-muted">
                <Icon name="radio_button_unchecked" size={14} /> Kheda Hub
              </span>
              <div className="flex-1 border-t border-dashed border-line-strong" />
              <span className="flex items-center gap-1 font-semibold text-ink">
                <Icon name="pin_drop" size={14} className="text-bad" /> Ahmedabad
              </span>
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-3">
              <p className="kf-helper">52.4 km · 1 hr 10 min → saves 18 min vs. previous path</p>
              <Button variant="ghost" size="sm" icon="visibility" onClick={() => onNavigate('logistics-route-optimizer')}>
                Detail
              </Button>
            </div>
          </Card>
        </section>

        {/* Fleet telemetry */}
        <section>
          <h2 className="kf-section-title">Fleet telemetry</h2>
          <p className="kf-helper mt-0.5">Live sensor reads across the cold fleet</p>
          <div className="mt-3 space-y-3">
            <Card className="flex items-center justify-between gap-3 border-bad/40 bg-bad-bg p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bad-bg text-bad">
                  <Icon name="ac_unit" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">Reefer GJ-01-XX-1122</p>
                  <p className="mt-0.5 text-[12px] font-medium text-bad">Alert: temp spike to 12°C (target 8°C)</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" icon="notifications" onClick={() => onShowToast('Pinged driver to check cooling unit.')}>
                Ping driver
              </Button>
            </Card>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name="electric_car" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">E-Truck GJ-23-AX-8912</p>
                  <p className="kf-helper mt-0.5">Temp 4.2°C · Battery 78%</p>
                </div>
              </div>
              <Badge tone="good">Stable</Badge>
            </Card>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name="local_shipping" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">E-Truck GJ-07-BB-4421</p>
                  <p className="kf-helper mt-0.5">Temp 7.8°C · Charging 22% · Standby</p>
                </div>
              </div>
              <Badge tone="neutral">Standby</Badge>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};