import { useApp } from '../context/AppContext';

export default function TodaysActivity() {
  const { activity } = useApp();

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-charcoal)]">Today's Activity</h2>
      <ol className="space-y-4">
        {activity.map((item, idx) => (
          <li key={item.id} className="relative flex gap-3 pl-1">
            <div className="flex flex-col items-center">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
              {idx < activity.length - 1 && (
                <span className="mt-1 h-full w-px flex-1 bg-[var(--color-border)]" />
              )}
            </div>
            <div className="pb-1">
              <p className="text-xs font-medium text-[var(--color-charcoal-soft)]">{item.time}</p>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">{item.title}</p>
              <p className="text-sm text-[var(--color-charcoal-soft)]">{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
