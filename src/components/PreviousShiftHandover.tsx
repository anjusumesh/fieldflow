import { useApp } from '../context/AppContext';
import { PriorityBadge } from './Badges';

export default function PreviousShiftHandover() {
  const { previousHandoverItems, showToast } = useApp();

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-charcoal)]">
        Previous Shift Handover
      </h2>
      <div className="space-y-2">
        {previousHandoverItems.map((item) => (
          <div
            key={item.equipmentId}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2.5"
          >
            <p className="text-sm text-[var(--color-charcoal)]">
              <span className="font-semibold">{item.equipmentId}</span> — {item.description}
            </p>
            <PriorityBadge priority={item.priority} />
          </div>
        ))}
      </div>
      <button
        onClick={() => showToast('Full handover view coming soon')}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        View Handover →
      </button>
    </div>
  );
}
