import { createContext, useContext, useState, type ReactNode } from 'react';

type ModalKind =
  | 'log-issue'
  | 'new-inspection'
  | 'maintenance-request'
  | 'request-permit'
  | 'shift-handover'
  | null;

interface ModalState {
  kind: ModalKind;
  equipmentId?: string;
}

interface ModalContextValue {
  modal: ModalState;
  openModal: (kind: NonNullable<ModalKind>, equipmentId?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ kind: null });

  const openModal = (kind: NonNullable<ModalKind>, equipmentId?: string) =>
    setModal({ kind, equipmentId });
  const closeModal = () => setModal({ kind: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
