import { useModal } from '../context/ModalContext';

const actions = [
  { label: 'Log Issue', icon: '⚠', kind: 'log-issue' as const },
  { label: 'Inspection', icon: '📋', kind: 'new-inspection' as const },
  { label: 'Maintenance Request', icon: '🔧', kind: 'maintenance-request' as const },
  { label: 'Request Permit', icon: '🛡', kind: 'request-permit' as const },
  { label: 'Shift Handover', icon: '🔄', kind: 'shift-handover' as const },
];

export default function QuickActions() {
  const { openModal } = useModal();

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-charcoal)]">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => openModal(a.kind)}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-5 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md active:translate-y-0"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-lg text-[var(--color-primary)]">
              {a.icon}
            </span>
            <span className="text-sm font-medium text-[var(--color-charcoal)]">+ {a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
