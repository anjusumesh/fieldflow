export type EquipmentStatus = 'RUNNING' | 'WARNING' | 'MONITORING' | 'CRITICAL';

export interface Equipment {
  id: string;
  name: string;
  description: string;
  status: EquipmentStatus;
  lastCheck: string;
}

export type IssuePriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type IssueType = 'Equipment' | 'Production' | 'Safety' | 'Process' | 'Other';
export type IssueStatus = 'Open' | 'Monitoring' | 'Follow-up Required' | 'In Progress' | 'Resolved';

export interface Issue {
  id: string;
  equipmentId: string;
  type: IssueType;
  priority: IssuePriority;
  description: string;
  status: IssueStatus;
  createdAt: string;
  photo?: string | null;
}

export type InspectionStatus = 'Normal' | 'Attention Required' | 'Critical';

export interface InspectionChecklist {
  pressureChecked: boolean;
  temperatureChecked: boolean;
  vibrationChecked: boolean;
  leakageChecked: boolean;
  noiseChecked: boolean;
}

export interface Inspection {
  id: string;
  equipmentId: string;
  checklist: InspectionChecklist;
  observation: string;
  status: InspectionStatus;
  createdAt: string;
  completed: boolean;
}

export type MaintenanceStage =
  | 'Requested'
  | 'Assigned'
  | 'In Progress'
  | 'Waiting for Spare'
  | 'Completed';

export interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  problem: string;
  priority: IssuePriority;
  requestedBy: string;
  requiredDate: string;
  notes: string;
  stage: MaintenanceStage;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  timestamp: number;
  title: string;
  subtitle: string;
}

export interface DailyReportChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface CurrentUser {
  name: string;
  role: string;
  shift: string;
  area: string;
}
