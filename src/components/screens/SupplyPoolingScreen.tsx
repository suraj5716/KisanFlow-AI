import React, { useState } from 'react';
import { RoutePreviewModal } from '../modals/RoutePreviewModal';
import { cn, Icon, PageHeader, Section, Card, Badge, Button, Progress, KeyValue } from '../ui';

interface SupplyPoolingScreenProps {
  onShowToast: (msg: string) => void;
}

const FPO_DEFAULTS = [
  { key: 'anand' as const, name: 'Anand Krishak FPO', reg: 'Your organization', initial: 8.0, grade: 'Grade A', km: 18, rate: 30.2, tone: 'primary', isUser: true },
  { key: 'kheda' as const, name: 'Kheda Green Producer Co', reg: 'GJ-KHD-091', initial: 5.0, grade: 'Grade A', km: 24, rate: 29.8, tone: 'neutral', isUser: false },
  { key: 'charotar' as const, name: 'Charotar Krishi Sangh', reg: 'GJ-CHR-830', initial: 5.0, grade: 'Grade A', km: 31, rate: 29.6, tone: 'neutral', isUser: false },
  { key: 'borsad' as const, name: 'Borsad Vegetable Cluster', reg: 'GJ-BRS-104', initial: 4.0, grade: 'Grade A', km: 42, rate: 29.1, tone: 'neutral', isUser: false },
];

export const SupplyPoolingScreen: React.FC<SupplyPoolingScreenProps> = ({ onShowToast }) => {
  const [anandQty, setAnandQty] = useState<number>(8.0);
  const [isSealingContract, setIsSealingContract] = useState<boolean>(false);
  const [isContractSealed, setIsContractSealed] = useState<boolean>(false);
  const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
  const [showRouteModal, setShowRouteModal] = useState<boolean>(false);
  const [activeFpoCheckbox, setActiveFpoCheckbox] = useState<{ [key: string]: boolean }>({
    kheda: true,
    charotar: true,
    borsad: true,
  });

  const khedaQty = activeFpoCheckbox.kheda ? 5.0 : 0;
  const charotarQty = activeFpoCheckbox.charotar ? 5.0 : 0;
  const borsadQty = activeFpoCheckbox.borsad ? 4.0 : 0;

  const totalAssembledTons = anandQty + khedaQty + charotarQty + borsadQty;
  const targetTons = 20.0;
  const percentage = Math.round((totalAssembledTons / targetTons) * 100);

  const fpos = FPO_DEFAULTS.map((f) => {
    const qty = f.key === 'anand' ? anandQty : f.key === 'kheda' ? khedaQty : f.key === 'charotar' ? charotarQty : borsadQty;
    return { ...f, qty, value: qty * 1000 * f.rate, enabled: f.isUser || activeFpoCheckbox[f.key] };
  });

  const totalNetValue = fpos.reduce((sum, f) => sum + f.value, 0);

  const handleGenerateContract = () => {
    setIsSealingContract(true);
    setTimeout(() => {
      setIsSealingContract(false);
      setIsContractSealed(true);
      onShowToast('Multi-Party Smart Contract Sealed on GovTech Ledger! (#VPL-TOM-2026-881)');
    }, 1100);
  };

  const handleSendOffer = () => {
    setIsOfferSent(true);
    onShowToast('Pooled tender submitted to BigBasket Gujarat Central DC ERP! Escrow hold requested.');
  };

  const toggleFpo = (key: 'kheda' | 'charotar' | 'borsad') => {
    setActiveFpoCheckbox((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="FPO Network &amp; Pooling"
        subtitle="Aggregate micro-harvests into institutional-scale lots that no single FPO could win alone."
        actions={
          <div className="rounded-lg border border-line bg-surface px-3 py-2">
            <div className="flex items-center gap-2">
              <Icon name="shopping_cart_checkout" size={16} className="text-primary" />
              <p className="text-[12.5px] font-semibold text-ink">Order #REQ-AHM-902</p>
            </div>
            <p className="kf-helper">Target 20 MT · expires in <strong className="text-bad">18h 42m</strong></p>
          </div>
        }
      />

      {/* Flow diagram */}
      <Section title="How the batch comes together" subtitle="Buyer requirement → available FPO supply → virtual supply lot" spacing={false}>
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1.2fr_auto_1.1fr]">
          <Card className="flex flex-col p-4">
            <Badge tone="primary" className="self-start">Buyer requirement</Badge>
            <p className="mt-3 text-[14px] font-bold text-ink">BigBasket Gujarat DC</p>
            <p className="kf-helper mt-0.5">Sanand Industrial Hub, Ahmedabad</p>
            <div className="mt-auto pt-3">
              <KeyValue k="Required gross" v="20.0 MT" />
              <KeyValue k="Quality bar" v="Grade A · single manifest" />
              <KeyValue k="Delivery window" v="24 hours" />
            </div>
          </Card>
          <div className="hidden items-center lg:flex">
            <Icon name="arrow_forward" size={20} className="text-faint" />
          </div>

          <Card className="flex flex-col p-4">
            <Badge tone="neutral" className="self-start">Available FPO supply (4 clusters)</Badge>
            <div className="mt-3 space-y-2">
              {fpos.map((f) => (
                <div
                  key={f.key}
                  className={cn(
                    'flex items-center justify-between rounded-md border px-3 py-2',
                    f.enabled ? 'border-line bg-subtle' : 'border-dashed border-line opacity-50',
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{f.name}</p>
                    <p className="text-[11px] text-muted">{f.qty.toFixed(1)} MT · {f.km} km · ₹{f.rate}/kg</p>
                  </div>
                  <Icon name={f.isUser ? 'agriculture' : 'hub'} size={16} className={f.isUser ? 'text-primary' : 'text-faint'} />
                </div>
              ))}
            </div>
          </Card>
          <div className="hidden items-center lg:flex">
            <Icon name="arrow_forward" size={20} className="text-faint" />
          </div>

          <Card className="flex flex-col border-primary/30 p-4">
            <Badge tone="primary" className="self-start">Virtual supply lot</Badge>
            <p className="mt-3 text-[14px] font-bold text-ink">#VPL-TOM-2026-881</p>
            <p className="kf-helper mt-0.5">Zero physical intermediary warehouse</p>
            <div className="mt-auto pt-3">
              <KeyValue k="Assembled batch" v={`${totalAssembledTons.toFixed(1)} MT (${percentage}% buffer)`} />
              <KeyValue k="Combined value" v={`₹${Math.round(totalNetValue).toLocaleString('en-IN')}`} />
              <KeyValue k="Route" v="52.4 km · SH-188 / NE-1" />
            </div>
            <p className="kf-helper mt-3 rounded-md bg-primary-soft px-2.5 py-1.5">
              Corporate acceptance rate: <strong className="text-primary-strong">99.4%</strong>
            </p>
          </Card>
        </div>
      </Section>

      {/* Builder */}
      <Section title={`Virtual lot builder · ${totalAssembledTons.toFixed(1)} / ${targetTons} MT assembled`} spacing>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <Card className="overflow-hidden xl:col-span-8">
            <div className="border-b border-line px-5 py-4">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="kf-helper">Fulfillment progress <strong className="text-ink">({percentage}%)</strong></p>
                <p className="text-[12.5px] font-semibold text-primary">
                  +{(totalAssembledTons - 20).toFixed(1)} MT resilience buffer
                </p>
              </div>
              <Progress value={percentage} />
              <p className="kf-helper mt-1.5">Threshold includes +10% resilience margin against in-transit sorting rejections.</p>
            </div>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-wide text-faint">
                  <th className="px-5 py-2.5">FPO node</th>
                  <th className="px-3 py-2.5 text-right">Qty</th>
                  <th className="px-3 py-2.5 text-right">Net realization</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-center">In pool</th>
                </tr>
              </thead>
              <tbody>
                {fpos.map((f) => (
                  <tr key={f.key} className="border-b border-line/70 last:border-none hover:bg-primary-subtle">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className={cn('flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold', f.isUser ? 'bg-primary text-on-primary' : 'bg-navy/10 text-navy')}>
                          {f.name.split(' ')[0].slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{f.name}</p>
                          <p className="text-[11px] text-muted">{f.reg}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-ink">{f.qty.toFixed(1)} MT</td>
                    <td className="px-3 py-3 text-right">
                      <p className="font-semibold text-primary">₹{f.rate}/kg</p>
                      <p className="text-[11px] text-muted">₹{Math.round(f.value).toLocaleString('en-IN')} total</p>
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={f.isUser ? 'primary' : f.enabled ? 'good' : 'neutral'} dot>
                        {f.isUser ? 'You' : f.enabled ? 'Joined' : 'Standby'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-center">
                      {f.isUser ? (
                        <Icon name="lock" size={15} className="text-primary" />
                      ) : (
                        <input
                          type="checkbox"
                          checked={activeFpoCheckbox[f.key]}
                          onChange={() => toggleFpo(f.key as 'kheda' | 'charotar' | 'borsad')}
                          className="h-4 w-4 cursor-pointer rounded accent-[--color-primary]"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between">
                <label className="kf-label mb-0">Anand FPO contribution (4–12 MT)</label>
                <span className="rounded-md border border-line bg-subtle px-2.5 py-1 text-[13px] font-bold text-primary">
                  {anandQty.toFixed(1)} MT
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={anandQty}
                onChange={(e) => setAnandQty(parseFloat(e.target.value))}
                className="mt-2 w-full accent-[#1c7c47]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-muted">
                <span>Min allocation: 4.0 MT</span>
                <span>Certified capacity: 12.0 MT</span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4 xl:col-span-4">
            <Card className="p-5">
              <h3 className="kf-section-title flex items-center gap-2">
                <Icon name="gavel" size={17} className="text-primary" />
                Virtual lot actions
              </h3>
              <div className="mt-4 space-y-2.5">
                <Button
                  className="w-full"
                  onClick={handleGenerateContract}
                  disabled={isSealingContract || isContractSealed}
                  icon={isSealingContract ? 'sync' : 'assignment_turned_in'}
                >
                  {isSealingContract
                    ? 'Sealing ledger keys…'
                    : isContractSealed
                    ? 'Contract sealed · #VPL-TOM-2026-881'
                    : 'Generate multi-party contract'}
                </Button>
                <Button variant="secondary" className="w-full" icon="route" onClick={() => setShowRouteModal(true)}>
                  Preview pickup route
                </Button>
                <Button variant="ghost" className="w-full" icon={isOfferSent ? 'done_all' : 'forward_to_inbox'} onClick={handleSendOffer} disabled={isOfferSent}>
                  {isOfferSent ? 'Offer sent to BigBasket ERP' : 'Send pooled offer to buyer'}
                </Button>
              </div>
              <div className="mt-5 rounded-md border border-line bg-subtle p-3.5">
                <div className="flex items-center justify-between">
                  <p className="kf-eyebrow">Automated escrow</p>
                  <Badge tone="good">100% protected</Badge>
                </div>
                <p className="kf-helper mt-2">
                  Payment splits proportionally to each FPO bank node within 4 hours of dock acceptance at BigBasket DC.
                </p>
              </div>
            </Card>

            <Card className="grid grid-cols-2 gap-2 p-5">
              {[
                { label: 'Fleet efficiency', value: '+75% load factor', icon: 'local_shipping' },
                { label: 'Freight saving', value: '₹38,500', icon: 'payments' },
                { label: 'Carbon cut', value: '-42.0%', icon: 'eco' },
                { label: 'Gross price', value: '₹34.00/kg', icon: 'trending_up' },
              ].map((c) => (
                <div key={c.label} className="rounded-md border border-line p-3">
                  <Icon name={c.icon} size={16} className="text-primary" />
                  <p className="mt-1.5 text-[13.5px] font-bold text-ink">{c.value}</p>
                  <p className="text-[11px] text-muted">{c.label}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </Section>

      <RoutePreviewModal isOpen={showRouteModal} onClose={() => setShowRouteModal(false)} />
    </div>
  );
};