import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';
import type { IssuePriority, IssueType } from '../types';

const issueTypes: IssueType[] = ['Equipment', 'Production', 'Safety', 'Process', 'Other'];
const priorities: IssuePriority[] = ['Critical', 'High', 'Medium', 'Low'];

export default function LogIssueModal({
  onClose,
  defaultEquipmentId,
}: {
  onClose: () => void;
  defaultEquipmentId?: string;
}) {
  const { equipment, addIssue } = useApp();
  const [equipmentId, setEquipmentId] = useState(defaultEquipmentId ?? equipment[0]?.id ?? '');
  const [type, setType] = useState<IssueType>('Equipment');
  const [priority, setPriority] = useState<IssuePriority>('Medium');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    addIssue({ equipmentId, type, priority, description: description.trim(), photo: photoName });
    onClose();
  };

  return (
    <Modal title="Log Issue" onClose={onClose}>
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
            Issue Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as IssueType)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          >
            {issueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {priorities.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  priority === p
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] text-[var(--color-charcoal-soft)] hover:border-[var(--color-primary)]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe the issue..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? null)}
            className="w-full text-sm text-[var(--color-charcoal-soft)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-soft)] file:px-3 file:py-1.5 file:text-[var(--color-primary)]"
          />
          {photoName && <p className="mt-1 text-xs text-[var(--color-charcoal-soft)]">{photoName}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Submit Issue
        </button>
      </form>
    </Modal>
  );
}
