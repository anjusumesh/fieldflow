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
  ActivityItem,
  DailyReportChecklistItem,
} from '../types';
import {
  currentUser,
  initialEquipment,
  initialIssues,
  initialInspections,
  initialMaintenanceRequests,
  initialActivity,
  initialDailyReportChecklist,
  previousShiftHandover,
} from '../data/mockData';

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

interface AppState {
  user: typeof currentUser;
  equipment: Equipment[];
  issues: Issue[];
  inspections: Inspection[];
  maintenanceRequests: MaintenanceRequest[];
  activity: ActivityItem[];
  dailyReportChecklist: DailyReportChecklistItem[];
  previousHandoverItems: typeof previousShiftHandover.items;
  toast: string | null;
  addIssue: (input: NewIssueInput) => void;
  addInspection: (input: NewInspectionInput) => void;
  addMaintenanceRequest: (input: NewMaintenanceInput) => void;
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
      activity,
      dailyReportChecklist,
      previousHandoverItems: previousShiftHandover.items,
      toast,
      addIssue,
      addInspection,
      addMaintenanceRequest,
      generateDailyReport,
      showToast,
      clearToast,
      getEquipment,
    }),
    [equipment, issues, inspections, maintenanceRequests, activity, dailyReportChecklist, toast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
