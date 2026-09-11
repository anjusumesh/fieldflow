import { useApp } from '../context/AppContext';

export default function Header() {
  const { user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[var(--color-charcoal)] sm:text-xl">
            {greeting}, {user.name}
          </h1>
          <p className="text-sm text-[var(--color-charcoal-soft)]">Friday, 11 September 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative rounded-full p-2 text-lg transition hover:bg-black/5"
          >
            🔔
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-red)]" />
          </button>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-sm font-semibold text-[var(--color-primary)]">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight text-[var(--color-charcoal)]">
                {user.name}
              </p>
              <p className="text-xs leading-tight text-[var(--color-charcoal-soft)]">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
