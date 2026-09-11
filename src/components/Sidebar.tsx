import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/issues', label: 'Issues', icon: '⚠' },
  { to: '/inspections', label: 'Inspections', icon: '📋' },
  { to: '/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/permits', label: 'Permit-to-Work', icon: '🛡' },
  { to: '/equipment', label: 'Equipment', icon: '⚙' },
  { to: '/reports', label: 'Reports', icon: '📊' },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-bold text-white">
          F
        </div>
        <span className="text-lg font-semibold tracking-tight text-[var(--color-charcoal)]">
          FieldFlow
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                  : 'text-[var(--color-charcoal-soft)] hover:bg-black/[0.03]'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
