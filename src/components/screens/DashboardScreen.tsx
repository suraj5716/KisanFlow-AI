import React, { useState } from 'react';
import { NavScreenId, ProduceLot } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn, Icon, PageHeader, Metric, MetricStrip, Section, Card, Badge, Button, Progress, Table, KeyValue } from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, legendStyle, CHART_COLORS } from '../charts';

interface DashboardScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onOpenSihModal: () => void;
  onOpenCreateLotModal: () => void;
  onShowToast: (msg: string) => void;
  lots: ProduceLot[];
}

const DEMAND_DATA = [
  { name: 'Ahmedabad', demand: 72, supply: 18 },
  { name: 'Surat', demand: 56, supply: 22 },
  { name: 'Vadodara', demand: 48, supply: 30 },
  { name: 'Rajkot', demand: 34, supply: 25 },
];

const DEMAND_METRICS: {
  label: string;
  value: React.ReactNode;
  hint: string;
  tone?: 'good' | 'warn' | 'bad';
  accent?: boolean;
}[] = [
  {
    label: 'Inventory on hand',
    value: (
      <>
        8.4 <span className="text-sm font-semibold text-muted">MT</span>
      </>
    ),
    hint: 'Tomato Grade A · Anand Cold Bay 02',
  },
  {
    label: 'Expected net realization',
    value: (
      <>
        ₹24.85{' '}
        <span className="text-sm font-semibold text-muted">/kg</span>
      </>
    ),
    hint: 'APMC baseline ₹19.35 · +28.4% arbitrage',
    tone: 'good',
    accent: true,
  },
  {
    label: 'Active orders',
    value: '3',
    hint: '2 high-confidence · 1 counter offer',
  },
  {
    label: 'Deliveries today',
    value: '2',
    hint: 'All 3 loads within freshness window',
    tone: 'good',
  },
];

const ORDERS: { id: string; buyer: string; crop: string; qty: string; rate: string; match: number; status: 'open' | 'counter' | 'locked' }[] = [
  { id: 'BID-BB-902', buyer: 'BigBasket Gujarat DC', crop: 'Tomato · Grade A', qty: '20 MT', rate: '₹32.50/kg', match: 99.4, status: 'open' },
  { id: 'BID-REL-412', buyer: 'Reliance Retail Fresh', crop: 'Tomato · Grade A/B', qty: '15 MT', rate: '₹31.00/kg', match: 96.2, status: 'open' },
  { id: 'BID-SUR-108', buyer: 'Hazira Food Processing', crop: 'Tomato · Grade B', qty: '80 MT', rate: '₹26.50/kg', match: 91.8, status: 'counter' },
];

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
    <div className="kf-fade-up">
      {/* Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="kf-eyebrow text-primary">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-good kf-live-dot" />
              Verified FPO Node · Rabi-Zaid season
            </span>
          </p>
          <h1 className="kf-page-title mt-1">Good morning, Anand Krishak FPO</h1>
          <p className="kf-helper mt-1.5 max-w-2xl">
            Orchestrating 1,420 registered smallholders across 6 cluster mandals with real-time algorithmic crop pooling.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" icon="account_tree" onClick={onOpenSihModal}>
            12-Step flow
          </Button>
          <Button size="sm" icon="add_circle" onClick={onOpenCreateLotModal}>
            Create digital lot
          </Button>
        </div>
      </div>

      {/* Primary metrics */}
      <MetricStrip className="mt-6">
        {DEMAND_METRICS.map((m) => (
          <Metric key={m.label} {...m} />
        ))}
      </MetricStrip>

      {/* Demand opportunity + AI recommendation */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-7 p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="kf-section-title">Demand opportunity</h2>
              <p className="kf-helper mt-0.5">Forecast demand vs. committed supply this week (MT/day)</p>
            </div>
            <Badge tone="good" dot>
              Live markets
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEMAND_DATA} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barSize={26}>
                <CartesianGrid {...cartesianGrid} />
                <XAxis dataKey="name" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip content={<ChartTooltip suffix=" MT" />} cursor={{ fill: 'transparent' }} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="demand" name="Demand" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" name="Your supply" fill={CHART_COLORS.lineStrong} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="xl:col-span-5 flex flex-col p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="kf-section-title">Top recommendation</h2>
              <p className="kf-helper mt-0.5">What matters most right now</p>
            </div>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-strong">
              Confidence 93%
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-line bg-subtle p-4">
            <p className="kf-eyebrow text-primary">Demand opportunity · Pool #VPL-AHM-902</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink">
              Tomato demand in <strong>Ahmedabad</strong> is forecast to surge{' '}
              <span className="font-semibold text-primary">+18%</span> over the next 7 days with a regional deficit of
              65 MT. Your 8.4 MT stock qualifies.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md border border-line bg-surface px-2 py-2">
                <p className="text-[10.5px] text-muted uppercase">Allocation</p>
                <p className="mt-0.5 text-[14px] font-bold text-ink">5.0 MT</p>
              </div>
              <div className="rounded-md border border-line bg-surface px-2 py-2">
                <p className="text-[10.5px] text-muted uppercase">Net price</p>
                <p className="mt-0.5 text-[14px] font-bold text-primary">₹30.20</p>
              </div>
              <div className="rounded-md border border-line bg-surface px-2 py-2">
                <p className="text-[10.5px] text-muted uppercase">Net gain</p>
                <p className="mt-0.5 text-[14px] font-bold text-ink">+₹54.2k</p>
              </div>
            </div>
            <p className="kf-helper mt-3">
              Buyer <strong className="text-ink">FreshBasket Retail</strong> · Transit <strong className="text-ink">1.8 hrs</strong> via
              NE-1 expressway · Saves ₹5.35/kg vs. local spot.
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Button
              onClick={handleAcceptPool}
              disabled={allocationStatus === 'accepted'}
              icon={allocationStatus === 'loading' ? 'sync' : allocationStatus === 'accepted' ? 'verified' : 'check_circle'}
              className={cn('flex-1', allocationStatus === 'loading' && 'opacity-90')}
            >
              {allocationStatus === 'loading'
                ? 'Locking 5.0 MT…'
                : allocationStatus === 'accepted'
                ? 'Allocation locked · 5.0 MT'
                : 'Accept allocation'}
            </Button>
            <Button variant="secondary" icon="tune" onClick={() => onNavigate('net-realization-engine')}>
              Simulate
            </Button>
            <Button variant="ghost" icon="visibility" onClick={() => onNavigate('buyer-matching-offers')} className="flex-shrink-0">
              Contract
            </Button>
          </div>
        </Card>
      </div>

      {/* Active orders + logistics */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <div>
              <h2 className="kf-section-title">Active orders</h2>
              <p className="kf-helper mt-0.5">Institutional off-takes matched to your supply</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('buyer-matching-offers')}>
              View all
            </Button>
          </div>
          <Table
            headers={['Buyer', 'Requirement', 'Rate', 'Match', 'Status', '']}
            className="rounded-t-none border-x-0 border-b-0"
          >
            {ORDERS.map((o) => (
              <tr key={o.id} className={cn(o.status === 'counter' ? 'kf-row-click' : 'kf-row-click')}>
                <td>
                  <p className="font-semibold text-ink">{o.buyer}</p>
                  <p className="text-[11px] text-faint">{o.id}</p>
                </td>
                <td>
                  <p className="text-ink">{o.qty}</p>
                  <p className="text-[11px] text-muted">{o.crop}</p>
                </td>
                <td className="font-semibold text-ink">{o.rate}</td>
                <td className="w-28">
                  <Progress value={o.match} tone={o.match >= 95 ? 'good' : 'warn'} />
                  <p className="mt-1 text-[11px] text-muted">{o.match}%</p>
                </td>
                <td>
                  <Badge tone={o.status === 'open' ? 'good' : o.status === 'counter' ? 'warn' : 'neutral'} dot>
                    {o.status === 'open' ? 'Open' : o.status === 'counter' ? 'Counter offer' : 'Locked'}
                  </Badge>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => onNavigate('buyer-matching-offers')}
                    className="text-[12px] font-semibold text-primary hover:underline"
                  >
                    Review →
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        <div className="xl:col-span-5 flex flex-col gap-6">
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="kf-section-title flex items-center gap-2">
                  <Icon name="local_shipping" size={16} className="text-primary" />
                  Reverse logistics
                </h2>
                <p className="kf-helper mt-0.5">E-Truck GJ-23-AX-8912 · empty from Ahmedabad</p>
              </div>
              <Badge tone="warn" dot>
                Active now
              </Badge>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4 rounded-lg border border-line bg-subtle p-3.5">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">
                  40 crates available · passing Anand toll at 14:15
                </p>
                <p className="kf-helper mt-1">
                  Returning from Ahmedabad Mandi drop. Save <strong className="text-good">₹400/trip</strong> on empty-mile.
                </p>
              </div>
              <Button size="sm" onClick={handleReserveBackhaul} disabled={backhaulReserved} className="flex-shrink-0">
                {backhaulReserved ? 'Slot reserved' : 'Reserve slot'}
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-md border border-line px-2 py-2.5">
                <p className="text-[10.5px] text-muted uppercase">Fleet active</p>
                <p className="mt-0.5 text-[15px] font-bold text-ink">14/18</p>
              </div>
              <div className="rounded-md border border-line px-2 py-2.5">
                <p className="text-[10.5px] text-muted uppercase">Empty-mile savings</p>
                <p className="mt-0.5 text-[15px] font-bold text-good">₹14,500</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-3 w-full" icon="route" onClick={() => onNavigate('logistics-route-optimizer')}>
              Open logistics command center
            </Button>
          </Card>

          {/* Freshness alert strip */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="kf-section-title flex items-center gap-2">
                <Icon name="monitoring" size={16} className="text-primary" />
                Freshness radar
              </h2>
              <button
                onClick={() => onNavigate('produce-lots')}
                className="text-[12px] font-semibold text-primary hover:underline"
              >
                View inventory →
              </button>
            </div>
            <div className="mt-3 space-y-2.5">
              {lots.slice(0, 2).map((lot) => {
                const isCritical = lot.freshnessRemainingHrs <= 30;
                return (
                  <div key={lot.id} className="rounded-lg border border-line p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-ink">{lot.id}</p>
                        <p className="truncate text-[11.5px] text-muted">
                          {lot.variety} · {lot.location}
                        </p>
                      </div>
                      <Badge tone={isCritical ? 'bad' : 'good'} dot>
                        {isCritical ? `Expiring <${lot.freshnessRemainingHrs}h` : 'Stable'}
                      </Badge>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11.5px] text-muted">
                      <span>Quality retained</span>
                      <span className="font-semibold text-ink">{lot.qualityRetainedPercent}%</span>
                    </div>
                    <Progress value={lot.qualityRetainedPercent} tone={isCritical ? 'bad' : 'good'} className="mt-1" />
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[11.5px] text-muted">{lot.recommendedAction}</span>
                      <button
                        onClick={() => setSelectedLotForAssay(lot)}
                        className="text-[11.5px] font-semibold text-primary hover:underline"
                      >
                        Assay
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Net realization comparison strip */}
      <Card className="mt-8 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <Icon name="shield" size={18} />
          </span>
          <div>
            <p className="text-[13.5px] font-semibold text-ink">
              You earn ₹30.20/kg through a virtual pool vs. ₹19.35 at the APMC mandi.
            </p>
            <p className="kf-helper mt-0.5">Guaranteed e-NAM / bank escrow settlement within 24 hours.</p>
          </div>
        </div>
        <button
          onClick={handleDownloadAudit}
          className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-primary hover:underline"
        >
          <Icon name="download" size={16} />
          Download audit sheet
        </button>
      </Card>

      {/* Assay modal (kept from original behavior) */}
      {selectedLotForAssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-line bg-surface p-5 shadow-pop kf-fade-up">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <h3 className="kf-section-title flex items-center gap-2">
                <Icon name="verified" size={17} className="text-primary" />
                Optical AI Quality Assay
              </h3>
              <button onClick={() => setSelectedLotForAssay(null)} className="kf-icon-btn" aria-label="Close" type="button">
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {[
                ['Batch', selectedLotForAssay.id],
                ['Variety & grade', selectedLotForAssay.variety],
                ['Sugar / Brix index', '4.8° Bx · Grade A premium'],
                ['Firmness / defects', '<2.1% surface blemish'],
                ['Temperature', `${selectedLotForAssay.temperature}°C · optimal`],
              ].map(([k, v]) => (
                <KeyValue key={k} k={k} v={v} />
              ))}
            </div>
            <Button className="mt-5 w-full" onClick={() => setSelectedLotForAssay(null)}>
              Close assay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};