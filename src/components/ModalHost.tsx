import { useModal } from '../context/ModalContext';
import LogIssueModal from './LogIssueModal';
import NewInspectionModal from './NewInspectionModal';
import MaintenanceRequestModal from './MaintenanceRequestModal';
import RequestPermitModal from './RequestPermitModal';
import ShiftHandoverModal from './ShiftHandoverModal';

export default function ModalHost() {
  const { modal, closeModal } = useModal();

  if (modal.kind === 'log-issue') {
    return <LogIssueModal onClose={closeModal} defaultEquipmentId={modal.equipmentId} />;
  }
  if (modal.kind === 'new-inspection') {
    return <NewInspectionModal onClose={closeModal} defaultEquipmentId={modal.equipmentId} />;
  }
  if (modal.kind === 'maintenance-request') {
    return <MaintenanceRequestModal onClose={closeModal} defaultEquipmentId={modal.equipmentId} />;
  }
  if (modal.kind === 'request-permit') {
    return <RequestPermitModal onClose={closeModal} defaultEquipmentId={modal.equipmentId} />;
  }
  if (modal.kind === 'shift-handover') {
    return <ShiftHandoverModal onClose={closeModal} />;
  }
  return null;
}
