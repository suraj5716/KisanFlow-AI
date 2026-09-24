import React, { useState } from 'react';
import { NavScreenId } from '../../types';
import { buyerProfiles, buyerRequirements } from '../../data/mock';
import {
  Icon,
  PageHeader,
  Section,
  Card,
  Badge,
  Button,
  Drawer,
  Table,
  Progress,
  KeyValue,
  Metric,
  MetricStrip,
} from '../ui';

interface BuyersScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const BuyersScreen: React.FC<BuyersScreenProps> = ({ onNavigate, onShowToast }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const active = buyerProfiles.find((p) => p.id === selectedId) || null;
  const openRequirements = buyerRequirements.filter((r) => r.status === 'open').length;
  const avgReliability = Math.round(
    buyerProfiles.reduce((s, p) => s + p.paymentReliability, 0) / buyerProfiles.length,
  );

  return (
    <div className="kf-fade-up">
      <PageHeader title="Buyers" subtitle="Your verified off-taker network, ranked by reliability and settlement discipline." />

      <MetricStrip className="mt-6">
        <Metric label="Open requirements" value={openRequirements} hint={`${buyerRequirements.reduce((s, r) => s + r.requiredQuantity, 0)} MT demanded across ${buyerRequirements.length} RFQs`} />
        <Metric label="Verified buyers" value={buyerProfiles.length} hint="AA+ credit-checked institutions" tone="good" />
        <Metric label="Avg. payment reliability" value={`${avgReliability}%`} hint="Across 24h settlement window" tone="good" />
        <Metric label="Fastest settlement" value="T+0" hint="BigBasket wallet holds · instant DBT" />
      </MetricStrip>

      <Section title="Buyer network" subtitle="Established relationships with institutional off-takers" spacing>
        <Card className="overflow-hidden">
          <Table headers={['Buyer', 'Segment', 'Size', 'Reliability', 'Escrow', 'Last settlement', 'Open opp.', '']}>
            {buyerProfiles.map((p) => (
              <tr key={p.id} className="kf-row-click" onClick={() => setSelectedId(p.id)}>
                <td>
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-[11px] text-faint">{p.id}</p>
                </td>
                <td className="text-muted">{p.segment}</td>
                <td className="text-ink">{p.location}</td>
                <td className="w-28">
                  <Progress value={p.paymentReliability} tone={p.paymentReliability >= 95 ? 'good' : 'warn'} />
                  <p className="mt-1 text-[11px] text-muted">{p.paymentReliability}%</p>
                </td>
                <td className="text-muted">{p.escrow}</td>
                <td>
                  <Badge tone="good">{p.lastSettlement}</Badge>
                </td>
                <td className="font-semibold text-ink">{p.openOpportunities}</td>
                <td className="text-right">
                  <button className="text-[12px] font-semibold text-primary hover:underline">
                    View profile →
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </Section>

      <Section title="Active requirements" subtitle="Live RFQs these buyers are financing right now">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {buyerRequirements.map((r) => (
            <Card key={r.id} className="flex flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13.5px] font-semibold text-ink">{r.buyer}</p>
                <Badge tone={r.status === 'open' ? 'good' : 'warn'} dot>
                  {r.status === 'open' ? 'Open' : 'Counter'}
                </Badge>
              </div>
              <p className="kf-helper mt-1">{r.crop}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="kf-metric-value">
                    {r.requiredQuantity} <span className="text-sm font-semibold text-muted">MT</span>
                  </p>
                  <p className="kf-helper">@{r.offerPerKg}/kg offer</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-primary">{r.match}% match</p>
                  <p className="kf-helper">closes {r.deadline}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full" icon="visibility" onClick={() => onNavigate('buyer-matching-offers')}>
                Review offer
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Drawer
        open={!!active}
        onClose={() => setSelectedId(null)}
        title={active?.name}
        subtitle={active ? `${active.segment} · ${active.id}` : undefined}
        footer={
          active &&
          (active.openOpportunities > 0 ? (
            <Button className="w-full" icon="fact_check" onClick={() => { setSelectedId(null); onNavigate('buyer-matching-offers'); }}>
              View {active.openOpportunities} open opportunities
            </Button>
          ) : (
            <Button variant="secondary" className="w-full" icon="campaign" onClick={() => onShowToast(`Pitched ${active.name} with this week's available inventory!`)}>
              Pitch this week's inventory
            </Button>
          ))
        }
      >
        {active && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-line bg-subtle p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon name="storefront" size={20} />
              </span>
              <div>
                <p className="kf-helper">Typical procurement volume</p>
                <p className="text-[14px] font-bold text-ink">{active.typicalVolume}</p>
              </div>
            </div>
            {[
              ['Location', active.location],
              ['Payment reliability', `${active.paymentReliability}%`],
              ['Escrow model', active.escrow],
              ['Last settlement', active.lastSettlement],
              ['Contacts', active.contacts],
            ].map(([k, v]) => (
              <KeyValue key={k} k={k} v={v} />
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
};