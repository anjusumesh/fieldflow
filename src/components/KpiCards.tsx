import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function KpiCards() {
  const { issues, inspections, maintenanceRequests, permits } = useApp();
  const navigate = useNavigate();

  const activePermits = permits.filter((p) => p.stage !== 'PERMIT CLOSED');

  const cards = [
    { label: 'Open Issues', value: issues.length, icon: '⚠️', to: '/issues' },
    { label: 'Inspections Due', value: inspections.length, icon: '📋', to: '/inspections' },
    { label: 'Maintenance Requests', value: maintenanceRequests.length, icon: '🔧', to: '/maintenance' },
    { label: 'Active Permits', value: activePermits.length, icon: '🛡', to: '/permits' },
    { label: 'Pending Approvals', value: 1, icon: '⏱️', to: '/reports' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((c) => (
        <button
          key={c.label}
          onClick={() => navigate(c.to)}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-wide text-[var(--color-charcoal-soft)]">
              {c.label}
            </p>
            <span className="text-lg">{c.icon}</span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-charcoal)]">{c.value}</p>
        </button>
      ))}
    </div>
  );
}
