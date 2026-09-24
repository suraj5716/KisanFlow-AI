import React, { useState } from 'react';

interface BuyerMatchingScreenProps {
  onShowToast: (msg: string) => void;
}

export const BuyerMatchingScreen: React.FC<BuyerMatchingScreenProps> = ({ onShowToast }) => {
  const [bids, setBids] = useState([
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
  ]);

  const handleAcceptBid = (id: string, buyer: string) => {
    setBids((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Contract Minted & Escrow Locked' } : b))
    );
    onShowToast(`Contract minted with ${buyer}! Escrow payment hold verified.`);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4">
      {/* Header Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
            <span className="text-primary font-semibold">Institutional Procurement</span>
            <span>·</span>
            <span>Verified Buyers with AA+ Credit Rating</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Buyer Matching &amp; Algorithmic Tenders
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] max-w-3xl mt-0.5">
            Direct institutional off-taker clearing engine connecting FPO supply pools with modern retail chains, quick-commerce dark stores, and industrial food processors without arhatiya intermediary cuts.
          </p>
        </div>
      </div>

      {/* Institutional Bids List */}
      <div className="space-y-3">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="p-3.5 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-on-surface text-[14px]">
                  {bid.buyer}
                </span>
                <span className="text-primary font-bold text-[11px]">
                  {bid.acceptanceScore}% Match Score
                </span>
                <span className="text-[11px] font-mono text-on-surface-variant">{bid.id}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px] pt-1">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Demanded Produce:</span>
                  <span className="font-semibold text-on-surface">{bid.crop}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Tonnage Required:</span>
                  <span className="font-bold text-primary font-mono text-[14px]">{bid.quantityMT} MT</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Gross Offered Price:</span>
                  <span className="font-bold text-on-surface text-[14px]">₹{bid.bidPricePerKg.toFixed(2)} / kg</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-on-surface-variant pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  {bid.deliveryHub}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                  {bid.escrowType}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end lg:items-center gap-2 flex-shrink-0">
              {bid.status === 'Contract Minted & Escrow Locked' ? (
                <span className="px-4 py-2 bg-primary-container text-on-primary rounded-lg font-bold text-[12px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Escrow Locked
                </span>
              ) : (
                <button
                  onClick={() => handleAcceptBid(bid.id, bid.buyer)}
                  className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-container transition-all shadow-xs text-[13px]"
                  type="button"
                >
                  Accept &amp; Mint Contract
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
