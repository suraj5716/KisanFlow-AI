import React, { useState } from 'react';
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
  KeyValue,
} from '../ui';

interface BuyerMatchingScreenProps {
  onShowToast: (msg: string) => void;
}

interface Bid {
  id: string;
  buyer: string;
  crop: string;
  quantityMT: number;
  bidPricePerKg: number;
  deliveryHub: string;
  escrowType: string;
  acceptanceScore: number;
  status: string;
}

const INITIAL_BIDS: Bid[] = [
  {
    id: 'BID-BB-902',
    buyer: 'BigBasket Gujarat Central DC',
    crop: 'Tomato (Himsona Grade A)',
    quantityMT: 20.0,
    bidPricePerKg: 32.5,
    deliveryHub: 'Sanand Industrial Hub, Ahmedabad',
    escrowType: 'Bank Escrow (Instant T+1)',
    acceptanceScore: 99.4,
    status: 'Open for Consensus',
  },
  {
    id: 'BID-REL-412',
    buyer: 'Reliance Retail Fresh Terminal',
    crop: 'Tomato (Grade A & B Mixed)',
    quantityMT: 15.0,
    bidPricePerKg: 31.0,
    deliveryHub: 'Naroda Logistics Park, Ahmedabad',
    escrowType: 'e-NAM Digital Mandate',
    acceptanceScore: 96.2,
    status: 'Open for Consensus',
  },
  {
    id: 'BID-SUR-108',
    buyer: 'Hazira Food Processing Industries',
    crop: 'Tomato (Grade B Canning)',
    quantityMT: 80.0,
    bidPricePerKg: 26.5,
    deliveryHub: 'Hazira Industrial Zone, Surat',
    escrowType: 'State Processing Subsidy Escrow',
    acceptanceScore: 91.8,
    status: 'Counter Offer Allowed',
  },
];

export const BuyerMatchingScreen: React.FC<BuyerMatchingScreenProps> = ({ onShowToast }) => {
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAcceptBid = (id: string, buyer: string) => {
    setBids((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Contract Minted & Escrow Locked' } : b)),
    );
    onShowToast(`Contract minted with ${buyer}! Escrow payment hold verified.`);
  };

  const active = bids.find((b) => b.id === selectedId) || null;
  const isLocked = active?.status === 'Contract Minted & Escrow Locked';

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="Orders"
        subtitle="Institutional off-takes matched directly to your supply — no arhatiya intermediary cuts."
      />

      <Section title="Open requirements" subtitle="Click a row for the full contract picture" spacing={false}>
        <Card className="overflow-hidden">
          <Table headers={['Buyer', 'Requirement', 'Tonnage', 'Offer', 'Match', 'Escrow', 'Status', '']}>
            {bids.map((b) => {
              const locked = b.status === 'Contract Minted & Escrow Locked';
              return (
                <tr key={b.id} className="kf-row-click" onClick={() => setSelectedId(b.id)}>
                  <td>
                    <p className="font-semibold text-ink">{b.buyer}</p>
                    <p className="text-[11px] text-faint">{b.id}</p>
                  </td>
                  <td className="text-ink">{b.crop}</td>
                  <td className="font-semibold text-ink">{b.quantityMT} MT</td>
                  <td className="font-semibold text-ink">₹{b.bidPricePerKg.toFixed(2)}/kg</td>
                  <td>
                    <Badge tone={b.acceptanceScore >= 95 ? 'good' : 'warn'}>{b.acceptanceScore}%</Badge>
                  </td>
                  <td className="text-muted">{b.escrowType}</td>
                  <td>
                    <Badge tone={locked ? 'primary' : b.status.includes('Counter') ? 'warn' : 'good'} dot>
                      {locked ? 'Locked' : b.status.includes('Counter') ? 'Counter' : 'Open'}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <button className="text-[12px] font-semibold text-primary hover:underline">
                      View opportunity →
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        </Card>
      </Section>

      <Drawer
        open={!!active}
        onClose={() => setSelectedId(null)}
        title={active?.buyer}
        subtitle={active ? `${active.id} · ${active.deliveryHub}` : undefined}
        footer={
          active && (
            <>
              <Button
                variant="secondary"
                icon="location_on"
                className="flex-1"
                onClick={() => onShowToast(`Opening route map for ${active.deliveryHub}…`)}
              >
                Route
              </Button>
              <Button
                className="flex-1"
                icon={isLocked ? 'verified' : 'fact_check'}
                disabled={isLocked}
                onClick={() => handleAcceptBid(active.id, active.buyer)}
              >
                {isLocked ? 'Escrow locked' : 'Accept & mint contract'}
              </Button>
            </>
          )
        }
      >
        {active && (
          <div className="space-y-4">
            <div className="rounded-lg border border-line bg-subtle p-4">
              <div className="flex items-baseline gap-2">
                <p className="text-[26px] font-bold tracking-tight text-ink">
                  ₹{active.bidPricePerKg.toFixed(2)}
                  <span className="text-sm font-semibold text-muted">/kg</span>
                </p>
                <Badge tone="good">{active.acceptanceScore}% match</Badge>
              </div>
              <p className="text-[13px] font-semibold text-ink">{active.quantityMT} MT required</p>
              <p className="kf-helper mt-1">{active.crop}</p>
            </div>
            {[
              ['Delivery hub', active.deliveryHub],
              ['Escrow protection', active.escrowType],
              ['Settlement', 'e-NAM / instant DBT within 24h'],
              ['Current status', active.status],
              ['Net realization est.', `₹${(active.bidPricePerKg - 2.3).toFixed(2)}/kg`],
            ].map(([k, v]) => (
              <KeyValue key={k} k={k} v={v} />
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
};