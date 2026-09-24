import React from 'react';
import { NavScreenId } from '../../types';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn, Icon, PageHeader, Card, Badge, Button, Metric, MetricStrip } from '../ui';
import { cartesianGrid, axisStyle, ChartTooltip, CHART_COLORS } from '../charts';

interface AdminDashboardProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

const gmvData = [
  { name: 'Mon', gmv: 8.2 },
  { name: 'Tue', gmv: 9.1 },
  { name: 'Wed', gmv: 11.4 },
  { name: 'Thu', gmv: 10.8 },
  { name: 'Fri', gmv: 12.5 },
  { name: 'Sat', gmv: 13.9 },
  { name: 'Sun', gmv: 14.2 },
];

const escrowData = [
  { name: 'Anand FPO', success: 98, pending: 2 },
  { name: 'Kheda FPO', success: 100, pending: 0 },
  { name: 'Surat FPO', success: 95, pending: 5 },
  { name: 'Rajkot FPO', success: 85, pending: 15 },
];

const services = [
  { name: 'e-NAM API Gateway', status: 'Operational', latency: '42ms' },
  { name: 'XGBoost Pricing Engine', status: 'Operational', latency: '120ms' },
  { name: 'Gemini LLM Agent', status: 'Operational', latency: '350ms' },
  { name: 'Bank Escrow Webhooks', status: 'Degraded', latency: '1.2s' },
];

const auditLogs = [
  'Auto-executed smart contract for Pool #VPL-AHM-902.',
  'Flagged anomalies in Mandi API response from Rajkot.',
  'Disbursed ₹2,14,000 to Anand Krishak FPO.',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="kf-fade-up">
      <PageHeader
        title="System Observatory"
        eyebrow="Admin workspace"
        subtitle="System-wide monitoring of escrow settlements, API limits, and ML model confidence."
        actions={
          <Button icon="download" onClick={() => onShowToast('Exporting PDF Report...')}>
            Export report
          </Button>
        }
      />

      <MetricStrip className="mt-6">
        <Metric label="Platform GMV (today)" value="₹14.2 L" hint="+12% vs. yesterday" tone="good" />
        <Metric label="Active FPOs" value="142" hint="+3 new this week" />
        <Metric label="Escrow settlements" value="100%" hint="24h SLA met" tone="good" />
        <Metric label="ML prediction acc." value="94.2%" hint="+1.4% improvement" tone="good" />
      </MetricStrip>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section>
          <h2 className="kf-section-title">7-day gross merchandise value</h2>
          <p className="kf-helper mt-0.5">Platform GMV in lakhs (₹)</p>
          <Card className="mt-3 p-5">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gmvData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="kfAdminGmv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...cartesianGrid} />
                  <XAxis dataKey="name" {...axisStyle} />
                  <YAxis {...axisStyle} />
                  <Tooltip content={<ChartTooltip suffix=" L" />} cursor={{ fill: 'transparent' }} />
                  <Area type="monotone" dataKey="gmv" stroke={CHART_COLORS.primary} strokeWidth={2.5} fill="url(#kfAdminGmv)" activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="kf-section-title">Escrow settlements by FPO cluster</h2>
          <p className="kf-helper mt-0.5">Successful vs. pending settlement share</p>
          <Card className="mt-3 p-5">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={escrowData} layout="vertical" margin={{ top: 4, right: 8, left: 10, bottom: 0 }} barSize={12}>
                  <CartesianGrid {...cartesianGrid} horizontal={false} />
                  <XAxis type="number" {...axisStyle} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" {...axisStyle} width={74} />
                  <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="success" stackId="a" fill={CHART_COLORS.good} name="Successful (%)" />
                  <Bar dataKey="pending" stackId="a" fill={CHART_COLORS.bad} radius={[0, 2, 2, 0]} name="Pending (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Health */}
        <section>
          <h2 className="kf-section-title">System health & API services</h2>
          <p className="kf-helper mt-0.5">Gateway latency measured over last 5 minutes</p>
          <Card className="mt-3 p-4">
            <div className="space-y-2.5">
              {services.map((svc) => {
                const operational = svc.status === 'Operational';
                return (
                  <div key={svc.name} className="flex items-center justify-between rounded-lg border border-line bg-subtle px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', operational ? 'bg-good' : 'kf-live-dot bg-bad')} />
                      <span className="text-[13px] font-medium text-ink">{svc.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11.5px] text-muted">{svc.latency}</span>
                      <Badge tone={operational ? 'good' : 'bad'}>{svc.status}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Audit logs */}
        <section>
          <h2 className="kf-section-title">Recent audit logs</h2>
          <p className="kf-helper mt-0.5">Automated actions recorded to the compliance ledger</p>
          <Card className="mt-3 p-4">
            <div className="space-y-2.5">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-lg border border-line bg-subtle px-3.5 py-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <Icon name="history_edu" size={13} />
                  </span>
                  <div>
                    <p className="text-[13px] text-ink">{log}</p>
                    <p className="kf-helper mt-0.5">[{i === 0 ? '2m' : i === 1 ? '14m' : '1h'} ago]</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};