import React, { useMemo, useState } from 'react';
import { NavScreenId } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { marketOpportunities } from '../../data/mock';
import {
  cn,
  Icon,
  PageHeader,
  Section,
  Card,
  Badge,
  Button,
  Drawer,
  Table,
  Select,
  Field,
  Progress,
  KeyValue,
} from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, legendStyle, CHART_COLORS } from '../charts';

interface MarketScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

const opportunityTone = (level: string) =>
  level === 'High' ? ('good' as const) : level === 'Medium' ? ('warn' as const) : ('neutral' as const);

export const MarketScreen: React.FC<MarketScreenProps> = ({ onNavigate, onShowToast }) => {
  const [crop, setCrop] = useState('All');
  const [region, setRegion] = useState('All regions');
  const [selected, setSelected] = useState<string | null>(null);

  const rows = useMemo(() => {
    return marketOpportunities.filter(
      (o) =>
        (crop === 'All' || o.crop.includes(crop.replace(' · Grade A', ''))) &&
        (region === 'All regions' || o.region === region),
    );
  }, [crop, region]);

  const active = marketOpportunities.find((o) => o.id === selected) || null;

  const chartData = marketOpportunities.map((o) => ({
    name: o.region.split(' ')[0],
    demand: o.demand,
    supply: o.supply,
  }));

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Market"
        subtitle="Where your produce sells best, right now. Every gap is a price signal."
        actions={
          <>
            <Field label="" className="w-40">
              <Select value={crop} onChange={(e) => setCrop(e.target.value)}>
                <option>All</option>
                <option>Tomato</option>
                <option>Capsicum</option>
                <option>Potato</option>
              </Select>
            </Field>
            <Field label="" className="w-56">
              <Select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option>All regions</option>
                {marketOpportunities.map((o) => (
                  <option key={o.id}>{o.region}</option>
                ))}
              </Select>
            </Field>
          </>
        }
      />

      <Section title="Forecast demand vs. committed supply" subtitle="MT per day across consumption nodes">
        <Card className="p-5">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barSize={30}>
                <CartesianGrid {...cartesianGrid} />
                <XAxis dataKey="name" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip content={<ChartTooltip suffix=" MT" />} cursor={{ fill: 'transparent' }} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="demand" name="Demand" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" name="Committed supply" fill={CHART_COLORS.lineStrong} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Section>

      <Section title="Supply gaps" subtitle="Rows show where regional demand exceeds committed supply" spacing>
        <Table headers={['Consumption node', 'Commodity', 'Gap', 'Price range', 'Opportunity', 'Confidence', 'SLA', '']}>
          {rows.map((o) => (
            <tr key={o.id} className="kf-row-click" onClick={() => setSelected(o.id)}>
              <td>
                <p className="font-semibold text-ink">{o.region}</p>
                <p className="text-[11px] text-faint">{o.id}</p>
              </td>
              <td className="text-ink">{o.crop}</td>
              <td className="font-semibold text-ink">{o.gap} MT</td>
              <td className="text-ink">{o.priceRange}</td>
              <td>
                <Badge tone={opportunityTone(o.opportunity)}>
                  {o.opportunity} opportunity
                </Badge>
              </td>
              <td className="w-28">
                <Progress value={o.confidence} tone={o.confidence >= 90 ? 'good' : 'warn'} />
                <p className="mt-1 text-[11px] text-muted">{o.confidence}%</p>
              </td>
              <td className="text-muted">{o.deliverySla}</td>
              <td className="text-right">
                <button className="text-[12px] font-semibold text-primary hover:underline">
                  View opportunity →
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Section>

      <Drawer
        open={!!active}
        onClose={() => setSelected(null)}
        title={active?.region}
        subtitle={active ? `${active.crop} · ${active.id}` : undefined}
        footer={
          active && (
            <>
              <Button
                variant="secondary"
                icon="groups"
                className="flex-1"
                onClick={() => {
                  onShowToast(`Dispatched cluster mobilization broadcast for ${active.region}! 6 mandal leads notified via SMS & e-Mandate.`);
                  setSelected(null);
                }}
              >
                Mobilize cluster
              </Button>
              <Button
                className="flex-1"
                icon="fact_check"
                onClick={() => {
                  setSelected(null);
                  onNavigate('buyer-matching-offers');
                }}
              >
                Review bids
              </Button>
            </>
          )
        }
      >
        {active && (
          <div className="space-y-4">
            {[
              ['Stage', active.stage],
              ['Projected supply gap', `${active.gap} MT this week`],
              ['Expected price', active.priceRange],
              ['Delivery SLA', active.deliverySla],
              ['Model confidence', `${active.confidence}%`],
            ].map(([k, v]) => (
              <KeyValue key={k} k={k} v={v} />
            ))}

            <div className="rounded-lg border border-line bg-subtle p-4">
              <p className="kf-eyebrow text-primary">Recommended action</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink">{active.action}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge tone={opportunityTone(active.opportunity)} dot>
                {active.opportunity} opportunity
              </Badge>
              <Badge tone="neutral">Live market data</Badge>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};