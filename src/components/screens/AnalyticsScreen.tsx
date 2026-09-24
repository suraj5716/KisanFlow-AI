import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyticsSeries } from '../../data/mock';
import {
  Icon,
  PageHeader,
  Section,
  Card,
  Badge,
  Button,
  Table,
  Tabs,
  Metric,
  MetricStrip,
} from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, legendStyle, CHART_COLORS } from '../charts';

interface AnalyticsScreenProps {
  onShowToast: (msg: string) => void;
}

const REPORTS = [
  { id: 'RPT-01', name: 'Weekly net realization summary', period: 'Sep 19 – Sep 25', type: 'PDF · 4 pages', size: '1.2 MB' },
  { id: 'RPT-02', name: 'Dispatch manifest · pooled lots', period: 'Sep 24', type: 'PDF · 6 pages', size: '2.1 MB' },
  { id: 'RPT-03', name: 'FPO payouts & escrow ledger', period: 'Sep 2026', type: 'XLSX · ledger', size: '340 KB' },
  { id: 'RPT-04', name: 'Cold-chain temperature compliance', period: 'Sep 20 – Sep 24', type: 'CSV · telemetry', size: '1.8 MB' },
];

const AUDIT = [
  { log: 'Auto-executed smart contract for Pool #VPL-AHM-902.', time: '2m ago' },
  { log: 'Flagged anomalies in Mandi API response from Rajkot.', time: '14m ago' },
  { log: 'Disbursed ₹2,14,000 to Anand Krishak FPO.', time: '1h ago' },
];

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onShowToast }) => {
  const [tab, setTab] = useState('Overview');

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Analytics"
        subtitle="Trends across volume, value and settlement performance."
        actions={
          <Tabs tabs={['Overview', 'Reports']} active={tab} onChange={setTab} />
        }
      />

      {tab === 'Overview' && (
        <>
          <MetricStrip className="mt-6">
            <Metric label="GMV this week" value="₹14.2L" hint="+12% vs. previous week" tone="good" />
            <Metric label="Volume moved" value="78 MT" hint="24 shipments · 3 routes" />
            <Metric label="Escrow settlements" value="100%" hint="24h SLA met" tone="good" />
            <Metric label="Net realization premium" value="₹10.85" hint="/kg over APMC baseline" accent />
          </MetricStrip>

          {/* Primary chart */}
          <Section title="Gross merchandise value" subtitle="Rolling 7-day platform value in lakhs (₹)" spacing>
            <Card className="p-5">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsSeries.gmv} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="kfGmv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid {...cartesianGrid} />
                    <XAxis dataKey="name" {...axisStyle} />
                    <YAxis {...axisStyle} />
                    <Tooltip content={<ChartTooltip suffix=" L" />} cursor={{ fill: 'transparent' }} />
                    <Area type="monotone" dataKey="gmv" name="GMV (₹ L)" stroke={CHART_COLORS.primary} strokeWidth={2.5} fill="url(#kfGmv)" activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Section>

          {/* Two smaller charts */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Section title="Escrow settlements by FPO" subtitle="Successful vs. pending settlements this cycle" spacing={false}>
              <Card className="p-5">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsSeries.escrow} layout="vertical" margin={{ top: 4, right: 8, left: 10, bottom: 0 }} barSize={14}>
                      <CartesianGrid {...cartesianGrid} horizontal={false} />
                      <XAxis type="number" {...axisStyle} domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" {...axisStyle} width={70} />
                      <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: 'transparent' }} />
                      <Legend wrapperStyle={legendStyle} />
                      <Bar dataKey="success" name="Successful" stackId="a" fill={CHART_COLORS.good} radius={[0, 0, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" stackId="a" fill={CHART_COLORS.bad} radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Section>

            <Section title="Shipments per day" subtitle="Cold-chain dispatches in the last 7 days" spacing={false}>
              <Card className="p-5">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsSeries.shipments} margin={{ top: 4, right: 8, left: -22, bottom: 0 }} barSize={22}>
                      <CartesianGrid {...cartesianGrid} />
                      <XAxis dataKey="name" {...axisStyle} />
                      <YAxis {...axisStyle} />
                      <Tooltip content={<ChartTooltip suffix=" loads" />} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="count" name="Shipments" fill={CHART_COLORS.navy} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Section>
          </div>

          {/* Table */}
          <Section title="Recent activity" subtitle="Automated actions and ledger events across the platform" spacing>
            <Card className="overflow-hidden">
              <Table headers={['Event', 'Time']}>
                {AUDIT.map((a) => (
                  <tr key={a.time + a.log} className="kf-row-click" onClick={() => onShowToast('Opening audit trail for this event…')}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft text-primary">
                          <Icon name="history" size={14} />
                        </span>
                        <p className="font-medium text-ink">{a.log}</p>
                      </div>
                    </td>
                    <td className="text-muted">{a.time}</td>
                  </tr>
                ))}
              </Table>
            </Card>
          </Section>
        </>
      )}

      {tab === 'Reports' && (
        <div className="mt-6">
          <Section title="Generated reports" subtitle="Audit-ready exports of settlements, manifests and telemetry" spacing={false}>
            <Card className="overflow-hidden">
              <Table headers={['Report', 'Period', 'Format', 'Size', '']}>
                {REPORTS.map((r) => (
                  <tr key={r.id} className="kf-row-click">
                    <td>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-soft text-primary">
                          <Icon name="description" size={16} />
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{r.name}</p>
                          <p className="text-[11px] text-faint">{r.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted">{r.period}</td>
                    <td>
                      <Badge tone="neutral">{r.type}</Badge>
                    </td>
                    <td className="text-muted">{r.size}</td>
                    <td className="text-right">
                      <Button variant="ghost" size="sm" icon="download" onClick={() => onShowToast(`Downloading ${r.name}…`)}>
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
            </Card>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3">
              <p className="kf-helper">Need a custom export?</p>
              <Button variant="secondary" size="sm" icon="print" onClick={() => onShowToast('Exporting PDF Report...')}>
                Export report
              </Button>
            </div>
          </Section>
        </div>
      )}
    </div>
  );
};