import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type {
  Equipment,
  EquipmentStatus,
  Issue,
  IssuePriority,
  IssueType,
  Inspection,
  InspectionChecklist,
  InspectionStatus,
  MaintenanceRequest,
  Permit,
  ActivityItem,
  DailyReportChecklistItem,
} from '../types';
import {
  currentUser,
  initialEquipment,
  initialIssues,
  initialInspections,
  initialMaintenanceRequests,
  initialPermits,
  initialActivity,
  initialDailyReportChecklist,
  previousShiftHandover,
} from '../data/mockData';
import { nextPermitStage, permitStageLabel } from '../data/permitFlow';

interface NewIssueInput {
  equipmentId: string;
  type: IssueType;
  priority: IssuePriority;
  description: string;
  photo?: string | null;
}

interface NewInspectionInput {
  equipmentId: string;
  checklist: InspectionChecklist;
  observation: string;
  status: InspectionStatus;
}

interface NewMaintenanceInput {
  equipmentId: string;
  problem: string;
  priority: IssuePriority;
  requiredDate: string;
  notes: string;
}

interface NewPermitInput {
  equipmentId: string;
  title: string;
}

interface AppState {
  user: typeof currentUser;
  equipment: Equipment[];
  issues: Issue[];
  inspections: Inspection[];
  maintenanceRequests: MaintenanceRequest[];
  permits: Permit[];
  activity: ActivityItem[];
  dailyReportChecklist: DailyReportChecklistItem[];
  previousHandoverItems: typeof previousShiftHandover.items;
  toast: string | null;
  addIssue: (input: NewIssueInput) => void;
  addInspection: (input: NewInspectionInput) => void;
  addMaintenanceRequest: (input: NewMaintenanceInput) => void;
  addPermit: (input: NewPermitInput) => void;
  advancePermit: (id: string) => void;
  generateDailyReport: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  getEquipment: (id: string) => Equipment | undefined;
}

const AppContext = createContext<AppState | undefined>(undefined);

let idCounter = 1000;
function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function nowTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(
    initialMaintenanceRequests
  );
  const [permits, setPermits] = useState<Permit[]>(initialPermits);
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [dailyReportChecklist, setDailyReportChecklist] = useState<DailyReportChecklistItem[]>(
    initialDailyReportChecklist
  );
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => setToast(message);
  const clearToast = () => setToast(null);

  const pushActivity = (title: string, subtitle: string) => {
    setActivity((prev) => [
      {
        id: nextId('A'),
        time: nowTime(),
        timestamp: Date.now(),
        title,
        subtitle,
      },
      ...prev,
    ]);
  };

  const getEquipment = (id: string) => equipment.find((e) => e.id === id);

  const updateEquipmentStatus = (id: string, status: EquipmentStatus, lastCheck?: string) => {
    setEquipment((prev) =>
      prev.map((eq) => (eq.id === id ? { ...eq, status, lastCheck: lastCheck ?? eq.lastCheck } : eq))
    );
  };

  const addIssue = (input: NewIssueInput) => {
    const eq = getEquipment(input.equipmentId);
    const newIssue: Issue = {
      id: nextId('I'),
      equipmentId: input.equipmentId,
      type: input.type,
      priority: input.priority,
      description: input.description,
      status: 'Open',
      createdAt: nowTime(),
      photo: input.photo ?? null,
    };
    setIssues((prev) => [newIssue, ...prev]);
    pushActivity('Issue reported', `${eq?.id ?? input.equipmentId} ${input.description}`);
    showToast('Issue successfully recorded');
    setDailyReportChecklist((prev) =>
      prev.map((item) => (item.id === 'd4' ? { ...item, done: true } : item))
    );
  };

  const addInspection = (input: NewInspectionInput) => {
    const eq = getEquipment(input.equipmentId);
    const newInspection: Inspection = {
      id: nextId('INS'),
      equipmentId: input.equipmentId,
      checklist: input.checklist,
      observation: input.observation,
      status: input.status,
      createdAt: nowTime(),
      completed: true,
    };
    setInspections((prev) => {
      const existingPending = prev.find(
        (i) => i.equipmentId === input.equipmentId && !i.completed
      );
      if (existingPending) {
        return prev.map((i) => (i.id === existingPending.id ? newInspection : i));
      }
      return [newInspection, ...prev];
    });
    pushActivity('Inspection completed', `${eq?.id ?? input.equipmentId}`);
    if (input.status === 'Attention Required' || input.status === 'Critical') {
      const nextStatus: EquipmentStatus =
        input.status === 'Critical' ? 'CRITICAL' : 'WARNING';
      updateEquipmentStatus(input.equipmentId, nextStatus, nowTime());
    } else {
      updateEquipmentStatus(input.equipmentId, 'RUNNING', nowTime());
    }
    showToast('Inspection saved');
    setDailyReportChecklist((prev) =>
      prev.map((item) => (item.id === 'd3' ? { ...item, done: true } : item))
    );
  };

  const addMaintenanceRequest = (input: NewMaintenanceInput) => {
    const eq = getEquipment(input.equipmentId);
    const newRequest: MaintenanceRequest = {
      id: nextId('M'),
      equipmentId: input.equipmentId,
      problem: input.problem,
      priority: input.priority,
      requestedBy: currentUser.name,
      requiredDate: input.requiredDate,
      notes: input.notes,
      stage: 'Requested',
      createdAt: nowTime(),
    };
    setMaintenanceRequests((prev) => [newRequest, ...prev]);
    pushActivity('Maintenance request created', `${eq?.id ?? input.equipmentId}`);
    showToast('Maintenance request created');
  };

  const addPermit = (input: NewPermitInput) => {
    const eq = getEquipment(input.equipmentId);
    const newPermit: Permit = {
      id: nextId('PTW'),
      title: input.title,
      equipmentId: input.equipmentId,
      stage: 'WORK REQUEST',
      requestedBy: currentUser.name,
      createdAt: nowTime(),
    };
    setPermits((prev) => [newPermit, ...prev]);
    pushActivity('Permit requested', `${newPermit.id} · ${eq?.id ?? input.equipmentId}`);
    showToast('Permit request created');
  };

  const advancePermit = (id: string) => {
    const permit = permits.find((p) => p.id === id);
    if (!permit) return;
    const next = nextPermitStage(permit.stage);
    if (!next) return;
    setPermits((prev) => prev.map((p) => (p.id === id ? { ...p, stage: next } : p)));
    pushActivity(`Permit ${permit.id} ${permitStageLabel[next].toLowerCase()}`, permit.equipmentId);
    showToast('Permit updated');
  };

  const generateDailyReport = () => {
    pushActivity('Daily report generated', `${currentUser.shift} Shift · ${currentUser.area}`);
    showToast('Daily report generated');
  };

  const value = useMemo<AppState>(
    () => ({
      user: currentUser,
      equipment,
      issues,
      inspections,
      maintenanceRequests,
      permits,
      activity,
      dailyReportChecklist,
      previousHandoverItems: previousShiftHandover.items,
      toast,
      addIssue,
      addInspection,
      addMaintenanceRequest,
      addPermit,
      advancePermit,
      generateDailyReport,
      showToast,
      clearToast,
      getEquipment,
    }),
    [
      equipment,
      issues,
      inspections,
      maintenanceRequests,
      permits,
      activity,
      dailyReportChecklist,
      toast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
