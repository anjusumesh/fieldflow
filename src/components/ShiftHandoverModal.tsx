import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';

export default function ShiftHandoverModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Shift handover submitted');
    onClose();
  };

  return (
    <Modal title="Shift Handover" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-charcoal-soft)]">
            Notes for the next shift
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Summarize what the next shift should know..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Submit Handover
        </button>
      </form>
    </Modal>
  );
}
