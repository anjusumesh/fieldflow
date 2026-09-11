import { useApp } from '../context/AppContext';
import { useModal } from '../context/ModalContext';
import { PermitStageBadge } from './Badges';
import { permitNextAction } from '../data/permitFlow';

export default function PermitDashboard() {
  const { permits, advancePermit } = useApp();
  const { openModal } = useModal();

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-charcoal)]">Permit-to-Work</h2>
        <button
          onClick={() => openModal('request-permit')}
          className="text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          + Request Permit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {permits.map((permit) => {
          const nextAction = permitNextAction[permit.stage];
          return (
            <div
              key={permit.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] p-3"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-charcoal)]">{permit.id}</p>
                <p className="text-sm text-[var(--color-charcoal-soft)]">
                  {permit.title} · {permit.equipmentId}
                </p>
              </div>
              <PermitStageBadge stage={permit.stage} />
              {nextAction && (
                <button
                  onClick={() => advancePermit(permit.id)}
                  className="mt-1 self-start rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-charcoal)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {nextAction}
                </button>
              )}
            </div>
          );
        })}
        {permits.length === 0 && (
          <p className="text-sm text-[var(--color-charcoal-soft)]">No active permits.</p>
        )}
      </div>
    </div>
  );
}
