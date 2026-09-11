import type { PermitStage } from '../types';

export const permitStageOrder: PermitStage[] = [
  'WORK REQUEST',
  'RISK ASSESSMENT',
  'PENDING APPROVAL',
  'APPROVED',
  'PERMIT ISSUED',
  'WORK STARTED',
  'WORK COMPLETED',
  'PERMIT CLOSED',
];

export const permitStageLabel: Record<PermitStage, string> = {
  'WORK REQUEST': 'Work Request',
  'RISK ASSESSMENT': 'Risk Assessment',
  'PENDING APPROVAL': 'Pending Approval',
  APPROVED: 'Approved',
  'PERMIT ISSUED': 'Permit Issued',
  'WORK STARTED': 'Work Started',
  'WORK COMPLETED': 'Work Completed',
  'PERMIT CLOSED': 'Permit Closed',
};

// Label of the action button that moves a permit OUT of this stage.
export const permitNextAction: Record<PermitStage, string | null> = {
  'WORK REQUEST': 'Add Risk Assessment',
  'RISK ASSESSMENT': 'Submit for Approval',
  'PENDING APPROVAL': 'Approve Request',
  APPROVED: 'Issue Permit',
  'PERMIT ISSUED': 'Start Work',
  'WORK STARTED': 'Mark Work Completed',
  'WORK COMPLETED': 'Close Permit',
  'PERMIT CLOSED': null,
};

export function nextPermitStage(stage: PermitStage): PermitStage | null {
  const idx = permitStageOrder.indexOf(stage);
  if (idx === -1 || idx === permitStageOrder.length - 1) return null;
  return permitStageOrder[idx + 1];
}
