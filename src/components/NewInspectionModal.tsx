import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';
import type { InspectionChecklist, InspectionStatus } from '../types';

const checklistLabels: { key: keyof InspectionChecklist; label: string }[] = [
  { key: 'pressureChecked', label: 'Pressure checked' },
  { key: 'temperatureChecked', label: 'Temperature checked' },
  { key: 'vibrationChecked', label: 'Vibration checked' },
  { key: 'leakageChecked', label: 'Leakage checked' },
  { key: 'noiseChecked', label: 'Unusual noise checked' },
];

const statuses: InspectionStatus[] = ['Normal', 'Attention Required', 'Critical'];

export default function NewInspectionModal({
  onClose,
  defaultEquipmentId,
}: {
  onClose: () => void;
  defaultEquipmentId?: string;
}) {
  const { equipment, addInspection } = useApp();
  const [equipmentId, setEquipmentId] = useState(defaultEquipmentId ?? equipment[0]?.id ?? '');
  const [checklist, setChecklist] = useState<InspectionChecklist>({
    pressureChecked: false,
    temperatureChecked: false,
    vibrationChecked: false,
    leakageChecked: false,
    noiseChecked: false,
  });
  const [observation, setObservation] = useState('');
  const [status, setStatus] = useState<InspectionStatus>('Normal');

  const toggle = (key: keyof InspectionChecklist) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInspection({ equipmentId, checklist, observation: observation.trim(), status });
    onClose();
  };

  return (
    <Modal title="Field Inspection" onClose={onClose}>
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
          <p className="mb-2 text-sm font-medium text-[var(--color-charcoal-soft)]">
            Inspection Checklist
          </p>
          <div className="space-y-2">
            {checklistLabels.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm hover:bg-black/[0.02]"
              >
                <input
                  type="checkbox"
                  checked={checklist[key]}
                  onChange={() => toggle(key)}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Observation
          </label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            rows={3}
            placeholder="Notes from the field..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-[var(--color-charcoal-soft)]">Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  status === s
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] text-[var(--color-charcoal-soft)] hover:border-[var(--color-primary)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Save Inspection
        </button>
      </form>
    </Modal>
  );
}
