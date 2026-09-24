import React, { useState } from 'react';
import { ProduceLot } from '../../types';

interface CreateLotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLot: (lot: ProduceLot) => void;
}

export const CreateLotModal: React.FC<CreateLotModalProps> = ({
  isOpen,
  onClose,
  onAddLot,
}) => {
  const [cropVariety, setCropVariety] = useState('Tomato - Himsona (Grade A)');
  const [quantity, setQuantity] = useState('4.5');
  const [harvestTime, setHarvestTime] = useState(new Date().toISOString().slice(0, 16));
  const [hubLocation, setHubLocation] = useState('Anand Central Aggregation Hub #02');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity) || 4.5;
    const isTomato = cropVariety.includes('Tomato');
    const isPotato = cropVariety.includes('Potato');

    const newLot: ProduceLot = {
      id: `LOT-${isTomato ? 'TOM' : isPotato ? 'POT' : 'CRP'}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      crop: isTomato ? 'Tomato' : isPotato ? 'Potato' : 'Vegetables',
      variety: cropVariety,
      grade: 'Grade A',
      tonnage: qty,
      harvestTime,
      harvestHoursAgo: 2,
      location: hubLocation,
      freshnessRemainingHrs: isTomato ? 44 : 240,
      qualityRetainedPercent: 96,
      temperature: 8.4,
      humidity: 86,
      status: 'stable',
      recommendedAction: 'Assay verified • Ready for virtual pooling or immediate cold transit',
    };

    onAddLot(newLot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-inverse-surface/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-lg shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
            </span>
            <h3 className="font-bold text-on-surface text-[14px]">
              Register Digital Produce Lot
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3.5 space-y-2.5 text-[12px]">
          <div>
            <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
              Crop Variety
            </label>
            <select
              value={cropVariety}
              onChange={(e) => setCropVariety(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
            >
              <option>Tomato - Himsona (Grade A)</option>
              <option>Potato - Kufri Pukhraj</option>
              <option>Onion - Nasik Red</option>
              <option>Green Chilli - G4</option>
              <option>Capsicum - Polyhouse Green</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Harvest Quantity (MT)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Harvest Timestamp
              </label>
              <input
                type="datetime-local"
                value={harvestTime}
                onChange={(e) => setHarvestTime(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
              FPO Hub Location
            </label>
            <input
              type="text"
              value={hubLocation}
              onChange={(e) => setHubLocation(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg text-[12px] text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span>Minting will automatically assign an encrypted IoT QR code &amp; shelf-life decay curve.</span>
          </div>

          <div className="pt-space-sm flex items-center justify-end gap-space-xs border-t border-outline-variant/20">
            <button
              onClick={onClose}
              type="button"
              className="px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container font-semibold shadow-xs"
            >
              Mint Digital Lot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
