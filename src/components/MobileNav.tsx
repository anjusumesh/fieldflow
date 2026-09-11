import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/issues', label: 'Issues', icon: '⚠' },
  { to: '/inspections', label: 'Inspection', icon: '📋' },
  { to: '/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/reports', label: 'More', icon: '⋯' },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
              isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-charcoal-soft)]'
            }`
          }
        >
          <span className="text-base">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
