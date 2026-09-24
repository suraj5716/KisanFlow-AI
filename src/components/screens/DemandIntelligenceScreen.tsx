import React, { useState } from 'react';
import { NavScreenId } from '../../types';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  cn,
  Icon,
  PageHeader,
  Section,
  Card,
  Badge,
  Button,
  Table,
  Select,
  Field,
  Progress,
} from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, legendStyle, CHART_COLORS } from '../charts';

interface DemandIntelligenceScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

const CROPS = ['Tomato', 'Potato', 'Onion', 'Chilli'] as const;
const HORIZONS = ['7-Day', '14-Day', '30-Day', 'Backtest'] as const;

const FORECAST = [
  { label: 'D-3', demand: 44 },
  { label: 'D-2', demand: 46 },
  { label: 'D-1', demand: 42 },
  { label: 'Today', demand: 48, supply: 46, forecast: true },
  { label: 'Tomorrow', demand: 54, supply: 42, forecast: true },
  { label: 'Festive day', demand: 72, supply: 36, forecast: true, peak: true },
  { label: 'Tue', demand: 64, supply: 40, forecast: true },
];

const GAPS = [
  {
    id: 'NODE-AHM-01',
    region: 'Ahmedabad Urban Metro',
    commodity: 'Tomato · Grade A',
    gap: 115,
    price: '₹31 – ₹36 /kg',
    sla: '6 hrs',
    confidence: 91,
    node: 'ahmedabad',
  },
  {
    id: 'NODE-SUR-04',
    region: 'Surat Food Processing Belt',
    commodity: 'Tomato · Grade B',
    gap: 80,
    price: '₹24 – ₹27 /kg',
    sla: '24 hrs',
    confidence: 88,
    node: 'surat',
  },
  {
    id: 'NODE-BDQ-02',
    region: 'Vadodara Quick-Commerce',
    commodity: 'Capsicum · Polyhouse',
    gap: 22,
    price: '₹42 – ₹48 /kg',
    sla: '5 hrs',
    confidence: 94,
    node: 'vadodara',
  },
];

const FEATURES = [
  { rank: 1, name: 'Local urban retail consumption', weight: 38, detail: 'POS indices from 420+ hypermarkets across the metro.' },
  { rank: 2, name: 'Mandi yard inflow deficits', weight: 26, detail: 'Real-time arrivals lag at Kalupur, Naroda and Jamalpur yards.' },
  { rank: 3, name: 'Weekend & festive calendar', weight: 19, detail: 'Navratri multiplier plus weekend grocery procurement elasticity.' },
  { rank: 4, name: 'Micro-climate & shelf degradation', weight: 17, detail: 'Ambient heat above 38°C accelerates post-harvest decay.' },
];

export const DemandIntelligenceScreen: React.FC<DemandIntelligenceScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Potato' | 'Onion' | 'Chilli'>('Tomato');
  const [targetNode, setTargetNode] = useState('Ahmedabad Urban Metro (Zone 1)');
  const [horizon, setHorizon] = useState<'7-Day' | '14-Day' | '30-Day' | 'Backtest'>('7-Day');
  const [buyerSegment, setBuyerSegment] = useState('All aggregated segments (B2B + APMC)');
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
    <div className="kf-fade-up">
      <PageHeader
        title="Demand Forecast"
        subtitle="Predictive supply-demand clearing from mandi arrivals, IMD weather, retail POS signals and festive consumption."
        actions={
          <Button variant="secondary" icon={isSimulating ? 'sync' : 'refresh'} onClick={handleRerunSimulation} disabled={isSimulating}>
            {isSimulating ? 'Re-running…' : 'Re-run forecast'}
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mt-5 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Commodity">
          <div className="flex gap-1 rounded-lg border border-line bg-subtle p-1">
            {CROPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCrop(c)}
                className={cn(
                  'flex-1 rounded-md px-2 py-1.5 text-[12px] font-semibold transition-colors',
                  selectedCrop === c ? 'bg-primary text-on-primary shadow-card' : 'text-muted hover:text-ink',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Consumption node">
          <Select value={targetNode} onChange={(e) => setTargetNode(e.target.value)}>
            <option>Ahmedabad Urban Metro (Zone 1)</option>
            <option>Surat Institutional &amp; Processing</option>
            <option>Vadodara Wholesale Hub</option>
            <option>Rajkot Central Logistics Terminal</option>
          </Select>
        </Field>
        <Field label="Projection window">
          <div className="flex gap-1 rounded-lg border border-line bg-subtle p-1">
            {HORIZONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className={cn(
                  'flex-1 rounded-md px-1.5 py-1.5 text-[12px] font-semibold transition-colors',
                  horizon === h ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink',
                )}
              >
                {h}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Buyer inflow">
          <Select value={buyerSegment} onChange={(e) => setBuyerSegment(e.target.value)}>
            <option>All aggregated segments (B2B + APMC)</option>
            <option>Modern retail &amp; supermarkets</option>
            <option>Food processors</option>
            <option>HoReCa / restaurants</option>
            <option>Mandi commission agents</option>
          </Select>
        </Field>
      </Card>

      {/* Headline metric strip */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="kf-eyebrow">7-day aggregate demand</p>
          <p className="kf-metric-value mt-1.5">
            425 <span className="text-sm font-semibold text-muted">MT</span>
          </p>
          <p className="kf-helper mt-1.5 flex items-center gap-1 text-good">
            <Icon name="trending_up" size={14} /> +18.1% vs. 30-day baseline
          </p>
        </Card>
        <Card className="p-4">
          <p className="kf-eyebrow">Committed supply</p>
          <p className="kf-metric-value mt-1.5">
            310 <span className="text-sm font-semibold text-muted">MT</span>
          </p>
          <div className="mt-2">
            <Progress value={73} />
          </div>
          <p className="kf-helper mt-1.5">73% of forecast demand covered</p>
        </Card>
        <Card className="p-4 border-bad/30">
          <p className="kf-eyebrow">Projected supply gap</p>
          <p className="kf-metric-value mt-1.5 text-bad">
            115 <span className="text-sm font-semibold text-muted">MT</span>
          </p>
          <p className="kf-helper mt-1.5 flex items-center gap-1 text-bad">
            <Icon name="warning" size={14} /> Peak deficit at festive day
          </p>
        </Card>
        <Card className="p-4">
          <p className="kf-eyebrow">Forecasted clearing price</p>
          <p className="kf-metric-value mt-1.5">₹31.50<span className="font-semibold text-muted text-sm">–36</span></p>
          <p className="kf-helper mt-1.5">+₹6.20/kg over mandi pit-head</p>
        </Card>
      </div>

      {/* Forecast chart */}
      <Section title={`${selectedCrop} consumption trajectory vs. committed inflows`}>
        <Card className="p-5">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={FORECAST} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...cartesianGrid} />
                <XAxis dataKey="label" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip content={<ChartTooltip suffix=" MT" />} cursor={{ fill: 'transparent' }} />
                <Legend wrapperStyle={legendStyle} />
                <Area type="monotone" dataKey="demand" name="Demand (MT)" fill="url(#demandFill)" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Bar dataKey="supply" name="Committed supply (MT)" fill={CHART_COLORS.warn} radius={[4, 4, 0, 0]} barSize={22} />
                <Line type="monotone" dataKey="demand" name="Forecast signal" stroke={CHART_COLORS.navy} strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 border-t border-line pt-4 sm:grid-cols-3">
            {[
              { icon: 'storefront', label: 'Mandi inflow signal', value: '-26% vs 5yr avg' },
              { icon: 'thermostat', label: 'Microclimate factor', value: '+3.2°C ambient heat' },
              { icon: 'local_mall', label: 'Retail POS off-take', value: '1.42x surge index' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <Icon name={c.icon} size={16} />
                </span>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-faint">{c.label}</p>
                  <p className="text-[12.5px] font-semibold text-ink">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Supply gap actions */}
      <Section
        title="Identified supply gaps"
        subtitle="Actionable farmer signals matched to your cluster"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon="download" onClick={handleExportManifests}>
              Export manifests
            </Button>
            <Button size="sm" icon="broadcast_on_personal" onClick={handleBroadcastAlerts}>
              Broadcast to FPOs
            </Button>
          </div>
        }
      >
        <Card className="overflow-hidden">
          <Table headers={['Consumption node', 'Commodity', 'Gap', 'Price range', 'SLA', 'Confidence', '']}>
            {GAPS.map((g) => (
              <tr key={g.id} className="kf-row-click" onClick={() => (g.node === 'surat' ? onNavigate('buyer-matching-offers') : undefined)}>
                <td>
                  <p className="font-semibold text-ink">{g.region}</p>
                  <p className="text-[11px] text-faint">{g.id}</p>
                </td>
                <td className="text-ink">{g.commodity}</td>
                <td className="font-semibold text-bad">{g.gap} MT</td>
                <td className="text-ink">{g.price}</td>
                <td className="text-muted">{g.sla}</td>
                <td className="w-28">
                  <Progress value={g.confidence} tone={g.confidence >= 90 ? 'good' : 'warn'} />
                  <p className="mt-1 text-[11px] text-muted">{g.confidence}%</p>
                </td>
                <td className="text-right">
                  {g.node === 'surat' ? (
                    <button className="text-[12px] font-semibold text-primary hover:underline">
                      Review bids →
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobilize(g.node, g.region);
                      }}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors',
                        mobilizedNodes[g.node]
                          ? 'bg-primary-soft text-primary-strong'
                          : 'bg-primary text-on-primary hover:bg-primary-strong',
                      )}
                    >
                      {mobilizedNodes[g.node] ? 'Mobilized' : 'Mobilize cluster'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </Section>

      {/* Why this forecast? */}
      <Section title="Why this forecast?" subtitle="Explainable AI breakdown of what is driving the demand signal" spacing>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <Card className="p-5 xl:col-span-7">
            <div className="space-y-5">
              {FEATURES.map((f) => (
                <div key={f.rank}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[13px] font-semibold text-ink">
                      {f.rank}. {f.name}
                    </p>
                    <p className="text-[13px] font-bold text-primary">{f.weight}%</p>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <Progress value={f.weight} className="flex-1" />
                  </div>
                  <p className="kf-helper mt-1">{f.detail}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 xl:col-span-5">
            <div className="space-y-3">
              {[
                ['Base estimator', 'Prophet · Bayesian seasonality'],
                ['Residual booster', 'XGBoost v1.7.6'],
                ['Training window', '1,095 days rolling'],
                ['Validation', 'Purged time-series split'],
                ['Error', 'RMSE 4.12 MT'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-md border border-line bg-subtle px-3.5 py-2.5">
                  <span className="kf-helper">{k}</span>
                  <span className="text-[12.5px] font-semibold text-ink">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary-soft p-4">
              <p className="kf-eyebrow text-primary">Interoperability ready</p>
              <p className="mt-1 text-[13px] font-semibold text-ink">e-NAM &amp; state mandi board bridge compatible</p>
              <p className="kf-helper mt-1">
                Simulated inference architecture ready for live state mandi API integration, compliant with Smart India
                Hackathon 2026 data governance norms.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
};