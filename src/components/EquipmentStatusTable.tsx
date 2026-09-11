import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './Badges';
import Modal from './Modal';
import type { Equipment } from '../types';

export default function EquipmentStatusTable() {
  const { equipment } = useApp();
  const [selected, setSelected] = useState<Equipment | null>(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-charcoal)]">Equipment Status</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--color-charcoal-soft)]">
              <th className="pb-2 pr-2 font-medium">Equipment</th>
              <th className="pb-2 pr-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Last Check</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((eq) => (
              <tr
                key={eq.id}
                onClick={() => setSelected(eq)}
                className="cursor-pointer border-t border-[var(--color-border)] transition hover:bg-black/[0.02]"
              >
                <td className="py-2.5 pr-2 font-medium text-[var(--color-charcoal)]">{eq.id}</td>
                <td className="py-2.5 pr-2">
                  <StatusBadge status={eq.status} />
                </td>
                <td className="py-2.5 text-[var(--color-charcoal-soft)]">{eq.lastCheck}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={selected.id} onClose={() => setSelected(null)}>
          <div className="space-y-3 text-sm">
            <p className="text-[var(--color-charcoal-soft)]">{selected.name}</p>
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3 py-2">
              <span className="text-[var(--color-charcoal-soft)]">Status</span>
              <StatusBadge status={selected.status} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3 py-2">
              <span className="text-[var(--color-charcoal-soft)]">Last Check</span>
              <span className="font-medium text-[var(--color-charcoal)]">{selected.lastCheck}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
