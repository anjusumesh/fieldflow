import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/inspections': 'Inspections',
  '/maintenance': 'Maintenance',
  '/issues': 'Issues',
  '/equipment': 'Equipment',
  '/reports': 'Reports',
};

export default function Placeholder() {
  const location = useLocation();
  const title = titles[location.pathname] ?? 'Coming Soon';

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-xl">
          🚧
        </div>
        <h2 className="text-base font-semibold text-[var(--color-charcoal)]">{title}</h2>
        <p className="mt-1.5 text-sm text-[var(--color-charcoal-soft)]">
          This section will be built in a future version. The Dashboard has the full working
          experience for now.
        </p>
      </div>
    </div>
  );
}
