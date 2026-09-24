import React from 'react';
import { NavScreenId } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Icon, PageHeader, Card, Badge, Button, Progress, Metric, MetricStrip } from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, legendStyle, CHART_COLORS } from '../charts';

interface BuyerDashboardProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

const volumeData = [
  { day: 'Day 1', volume: 14.5, rate: 30.5 },
  { day: 'Day 2', volume: 16.2, rate: 31.0 },
  { day: 'Day 3', volume: 12.8, rate: 29.8 },
  { day: 'Day 4', volume: 18.9, rate: 32.1 },
  { day: 'Day 5', volume: 22.0, rate: 30.2 },
];

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="kf-fade-up">
      <PageHeader
        title="FreshBasket Procurement Portal"
        eyebrow="Bulk buyer workspace"
        subtitle="Manage active procurement pools, track inbound deliveries, and monitor escrow deposits."
        actions={
          <Button icon="add" onClick={() => onShowToast('Creating new tender...')}>
            New Tender Request
          </Button>
        }
      />

      <MetricStrip className="mt-6">
        <Metric label="Active tenders" value="4" hint="2 awaiting counter-sign" />
        <Metric label="Inbound volume" value="22.0 MT" hint="rolling 48h" />
        <Metric label="Avg procurement rate" value="₹30.20/kg" hint="vs ₹31.50 latest bid" />
        <Metric label="Quality acceptance" value="98.5%" hint="sensor-verified lots" tone="good" />
      </MetricStrip>

      {/* Chart */}
      <section className="mt-8">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="kf-section-title">5-day procurement volume vs rate</h2>
            <p className="kf-helper mt-0.5">Pooled volume in MT against average landed rate</p>
          </div>
        </div>
        <Card className="mt-3 p-5">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid {...cartesianGrid} />
                <XAxis dataKey="day" {...axisStyle} />
                <YAxis yAxisId="left" {...axisStyle} />
                <YAxis yAxisId="right" orientation="right" {...axisStyle} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={legendStyle} />
                <Line yAxisId="left" type="monotone" dataKey="volume" name="Volume (MT)" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2 }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="Rate (₹/kg)" stroke={CHART_COLORS.navy} strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pools */}
        <section>
          <h2 className="kf-section-title">Procurement pools (virtual)</h2>
          <p className="kf-helper mt-0.5">Consolidated multi-FPO lots filling to tender targets</p>
          <div className="mt-3 space-y-3">
            <Card className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">Pool #VPL-AHM-902 (Tomato)</p>
                  <p className="kf-helper mt-0.5">Target: 22.0 MT @ ₹30.20/kg</p>
                </div>
                <Badge tone="primary" dot>Matching</Badge>
              </div>
              <div className="mt-3">
                <Progress value={75} tone="good" />
                <p className="mt-1 text-right text-[11px] text-muted">75% filled (16.5 MT)</p>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full" icon="visibility" onClick={() => onNavigate('supply-pooling')}>
                View contributors & fills
              </Button>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">Pool #VPL-SUR-401 (Potato)</p>
                  <p className="kf-helper mt-0.5">Target: 40.0 MT @ ₹18.50/kg</p>
                </div>
                <Badge tone="good">Fulfilled</Badge>
              </div>
              <div className="mt-3">
                <Progress value={100} tone="good" />
                <p className="mt-1 text-right text-[11px] text-muted">100% filled (40.0 MT)</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Inbound deliveries */}
        <section>
          <h2 className="kf-section-title">Inbound deliveries</h2>
          <p className="kf-helper mt-0.5">Live fleet state on route to your DCs</p>
          <div className="mt-3 space-y-3">
            <Card className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name="local_shipping" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">E-Truck GJ-23-AX-8912</p>
                  <p className="kf-helper mt-0.5">ETA 45 mins · Tomato (4.0 MT)</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" icon="my_location" onClick={() => onShowToast('Pinging GPS location...')}>
                Track
              </Button>
            </Card>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name="local_shipping" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">Reefer GJ-07-BB-4421</p>
                  <p className="kf-helper mt-0.5">ETA 2h 10m · Potato (18.0 MT)</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" icon="my_location" onClick={() => onShowToast('Pinging GPS location...')}>
                Track
              </Button>
            </Card>
            <Card className="flex items-center justify-between gap-3 border-good/40 bg-good-bg p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-good-bg text-good">
                  <Icon name="verified" size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">Last 12 deliveries: 100% on-time</p>
                  <p className="kf-helper mt-0.5">Cold-chain integrity 99.2% maintained</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};