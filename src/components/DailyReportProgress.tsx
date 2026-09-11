import { useApp } from '../context/AppContext';

export default function DailyReportProgress() {
  const { dailyReportChecklist, generateDailyReport } = useApp();
  const doneCount = dailyReportChecklist.filter((i) => i.done).length;
  const total = dailyReportChecklist.length;
  const pct = Math.round((doneCount / total) * 100);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-charcoal)]">Daily Report</h2>

      <p className="mb-3 text-sm font-medium text-[var(--color-charcoal-soft)]">
        {doneCount} / {total} completed
      </p>

      <ul className="space-y-1.5">
        {dailyReportChecklist.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm">
            <span className={item.done ? 'text-[var(--color-green)]' : 'text-[var(--color-charcoal-soft)]'}>
              {item.done ? '✓' : '○'}
            </span>
            <span className={item.done ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-charcoal-soft)]'}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        onClick={generateDailyReport}
        className="mt-4 w-full rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-95"
      >
        Generate Report
      </button>
    </div>
  );
}
