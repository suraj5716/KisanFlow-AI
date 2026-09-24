import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn, Icon, PageHeader, Section, Card, Badge, Button, Field, Progress } from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, CHART_COLORS } from '../charts';

interface NetRealizationScreenProps {
  onShowToast: (msg: string) => void;
}

const sliderClass = 'mt-2 w-full accent-[#1c7c47]';

export const NetRealizationScreen: React.FC<NetRealizationScreenProps> = ({ onShowToast }) => {
  const [spotPrice, setSpotPrice] = useState<number>(32.0);
  const [mandiDistanceKm, setMandiDistanceKm] = useState<number>(35);
  const [transitHours, setTransitHours] = useState<number>(2);

  // Dynamic calculations — kept identical to original logic
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

  const channels = [
    { name: 'APMC Mandi', net: apmcNet, deductions: spotPrice - apmcNet, highlight: false, note: 'Commission 8.5% + loading' },
    { name: 'Village Trader', net: traderNet, deductions: spotPrice - traderNet, highlight: false, note: 'Cash on delivery · 35% cut' },
    { name: 'Direct Buyer', net: soleFpoNet, deductions: spotPrice - soleFpoNet, highlight: false, note: `Freight ₹${soleFpoFreight.toFixed(2)} · spoilage ₹${soleFpoSpoilage.toFixed(2)}` },
    { name: 'Virtual Pool', net: pooledNet, deductions: spotPrice - pooledNet, highlight: true, note: 'Shared reefer · near-zero spoilage' },
  ];
  const best = channels[3];

  const handleDownloadAudit = () => {
    onShowToast('Generating cryptographic audit certificate (e-NAM Compliance Ledger)... Download started.');
  };

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Net Realization"
        subtitle="What you actually earn per kg after every hidden market penalty, freight and spoilage charge."
        actions={
          <Button variant="secondary" icon="download" onClick={handleDownloadAudit}>
            Download audit sheet
          </Button>
        }
      />

      {/* Controls */}
      <Card className="mt-5 grid grid-cols-1 gap-6 p-5 md:grid-cols-3">
        <div>
          <div className="flex items-center justify-between">
            <label className="kf-label mb-0">Base spot quote</label>
            <span className="text-[13px] font-bold text-primary">₹{spotPrice.toFixed(2)}/kg</span>
          </div>
          <input type="range" min="20" max="50" step="1" value={spotPrice} onChange={(e) => setSpotPrice(parseFloat(e.target.value))} className={sliderClass} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="kf-label mb-0">Transit haul distance</label>
            <span className="text-[13px] font-bold text-primary">{mandiDistanceKm} km</span>
          </div>
          <input type="range" min="15" max="150" step="5" value={mandiDistanceKm} onChange={(e) => setMandiDistanceKm(parseInt(e.target.value))} className={sliderClass} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="kf-label mb-0">Field-to-gate duration</label>
            <span className="text-[13px] font-bold text-primary">{transitHours} hrs</span>
          </div>
          <input type="range" min="1" max="8" step="0.5" value={transitHours} onChange={(e) => setTransitHours(parseFloat(e.target.value))} className={sliderClass} />
        </div>
      </Card>

      {/* Comparison chart */}
      <Section title="Net payout per sales channel" subtitle="Gross offer minus every deduction — highest realization highlighted" spacing>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <Card className="p-5 xl:col-span-8">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channels} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barSize={34}>
                  <CartesianGrid {...cartesianGrid} />
                  <XAxis dataKey="name" {...axisStyle} />
                  <YAxis {...axisStyle} domain={[0, Math.ceil((spotPrice + 2) / 5) * 5]} />
                  <Tooltip
                    content={<ChartTooltip suffix=" /kg" />}
                    cursor={{ fill: 'transparent' }}
                    labelFormatter={() => ''}
                  />
                  <ReferenceLine y={apmcNet} stroke={CHART_COLORS.faint} strokeDasharray="4 4" />
                  <Bar dataKey="net" name="Net payout to farmer" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="deductions" name="Deductions" fill={CHART_COLORS.bad} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
              <span className="h-2 w-2 rounded-full bg-good" />
              <p className="kf-helper">
                Highest estimated net realization: <strong className="text-good">₹{best.net.toFixed(2)}/kg via Virtual Pool</strong>{' '}
                — that's +₹{(best.net - apmcNet).toFixed(2)}/kg over the APMC mandi
                ({Math.round(((best.net - apmcNet) / (apmcNet || 1)) * 100)}%).
              </p>
            </div>
          </Card>

          <div className="space-y-3 xl:col-span-4">
            {channels.map((c) => (
              <Card
                key={c.name}
                className={cn('p-4', c.highlight && 'border-primary bg-primary-subtle')}
              >
                <div className="flex items-center justify-between">
                  <p className={cn('text-[12.5px] font-semibold', c.highlight ? 'text-primary-strong' : 'text-ink')}>
                    {c.name}
                  </p>
                  {c.highlight && <Badge tone="primary">Best option</Badge>}
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="kf-metric-value">
                    ₹{c.net.toFixed(2)}
                    <span className="text-sm font-semibold text-muted">/kg</span>
                  </p>
                </div>
                <p className="kf-helper mt-1">{c.note}</p>
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex-1">
                    <Progress value={(c.net / spotPrice) * 100} tone={c.highlight ? 'good' : 'warn'} />
                  </div>
                  <p className="text-[11px] text-muted">{Math.round((c.net / spotPrice) * 100)}% kept</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};