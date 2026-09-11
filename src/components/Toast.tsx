import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, clearToast } = useApp();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 lg:bottom-6">
      <div className="flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2.5 text-sm font-medium text-white shadow-xl animate-fade-in">
        <span className="text-[var(--color-green)]">✓</span>
        {toast}
      </div>
    </div>
  );
}
