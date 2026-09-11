import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';

export default function RequestPermitModal({
  onClose,
  defaultEquipmentId,
}: {
  onClose: () => void;
  defaultEquipmentId?: string;
}) {
  const { equipment, user, addPermit } = useApp();
  const [equipmentId, setEquipmentId] = useState(defaultEquipmentId ?? equipment[0]?.id ?? '');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addPermit({ equipmentId, title: title.trim() });
    onClose();
  };

  return (
    <Modal title="Request Permit" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Equipment
          </label>
          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          >
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.id} — {eq.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Work Description
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Pump Maintenance"
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Requested By
          </label>
          <input
            disabled
            value={user.name}
            className="w-full rounded-lg border border-[var(--color-border)] bg-black/[0.03] px-3 py-2 text-sm text-[var(--color-charcoal-soft)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Create Work Request
        </button>
      </form>
    </Modal>
  );
}
