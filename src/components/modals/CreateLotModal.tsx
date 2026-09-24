import React, { useState } from 'react';
import { ProduceLot } from '../../types';
import { Icon, Button } from '../ui';

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
    <div className="kf-overlay">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-pop">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="add_circle" size={17} />
            </span>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Register Digital Produce Lot</h3>
              <p className="kf-helper">Seal a harvest batch into the quality registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-ink"
            type="button"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="kf-label">Crop Variety</label>
            <select
              value={cropVariety}
              onChange={(e) => setCropVariety(e.target.value)}
              className="kf-select mt-1.5"
            >
              <option>Tomato - Himsona (Grade A)</option>
              <option>Potato - Kufri Pukhraj</option>
              <option>Onion - Nasik Red</option>
              <option>Green Chilli - G4</option>
              <option>Capsicum - Polyhouse Green</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kf-label">Harvest Quantity (MT)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="kf-input mt-1.5"
                required
              />
            </div>
            <div>
              <label className="kf-label">Harvest Timestamp</label>
              <input
                type="datetime-local"
                value={harvestTime}
                onChange={(e) => setHarvestTime(e.target.value)}
                className="kf-input mt-1.5"
                required
              />
            </div>
          </div>

          <div>
            <label className="kf-label">FPO Hub Location</label>
            <input
              type="text"
              value={hubLocation}
              onChange={(e) => setHubLocation(e.target.value)}
              className="kf-input mt-1.5"
              required
            />
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-line bg-subtle px-3.5 py-2.5">
            <Icon name="verified" size={17} className="mt-0.5 shrink-0 text-primary" />
            <p className="kf-helper">Minting will automatically assign an encrypted IoT QR code &amp; shelf-life decay curve.</p>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" icon="check_circle">
              Mint Digital Lot
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};