import type { EquipmentStatus, IssuePriority } from '../types';

const equipmentStatusStyles: Record<EquipmentStatus, string> = {
  RUNNING: 'bg-[var(--color-green-soft)] text-[var(--color-green)]',
  WARNING: 'bg-[var(--color-amber-soft)] text-[var(--color-amber)]',
  MONITORING: 'bg-amber-50 text-yellow-700 border border-yellow-200',
  CRITICAL: 'bg-[var(--color-red-soft)] text-[var(--color-red)]',
};

const equipmentStatusLabel: Record<EquipmentStatus, string> = {
  RUNNING: 'Running',
  WARNING: 'Warning',
  MONITORING: 'Monitoring',
  CRITICAL: 'Critical',
};

export function StatusBadge({ status }: { status: EquipmentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${equipmentStatusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {equipmentStatusLabel[status]}
    </span>
  );
}

const priorityStyles: Record<IssuePriority, string> = {
  Critical: 'bg-[var(--color-red-soft)] text-[var(--color-red)]',
  High: 'bg-[var(--color-red-soft)] text-[var(--color-red)]',
  Medium: 'bg-[var(--color-amber-soft)] text-[var(--color-amber)]',
  Low: 'bg-amber-50 text-yellow-700 border border-yellow-200',
};

const priorityDot: Record<IssuePriority, string> = {
  Critical: '🔴',
  High: '🔴',
  Medium: '🟠',
  Low: '🟡',
};

export function PriorityBadge({ priority }: { priority: IssuePriority }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priorityDot[priority]} {priority}
    </span>
  );
}
