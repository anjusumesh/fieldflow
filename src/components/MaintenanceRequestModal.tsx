import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';
import type { IssuePriority } from '../types';

const priorities: IssuePriority[] = ['Critical', 'High', 'Medium', 'Low'];

export default function MaintenanceRequestModal({
  onClose,
  defaultEquipmentId,
}: {
  onClose: () => void;
  defaultEquipmentId?: string;
}) {
  const { equipment, user, addMaintenanceRequest } = useApp();
  const [equipmentId, setEquipmentId] = useState(defaultEquipmentId ?? equipment[0]?.id ?? '');
  const [problem, setProblem] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('High');
  const [requiredDate, setRequiredDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;
    addMaintenanceRequest({
      equipmentId,
      problem: problem.trim(),
      priority,
      requiredDate,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <Modal title="Maintenance Request" onClose={onClose}>
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
            Problem
          </label>
          <textarea
            required
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            placeholder="Describe the problem..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as IssuePriority)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
              Required Date
            </label>
            <input
              type="date"
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
            />
          </div>
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

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Additional notes..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Create Request
        </button>
      </form>
    </Modal>
  );
}
