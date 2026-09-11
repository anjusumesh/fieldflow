import type {
  Equipment,
  Issue,
  Inspection,
  MaintenanceRequest,
  Permit,
  ActivityItem,
  DailyReportChecklistItem,
  CurrentUser,
} from '../types';

export const currentUser: CurrentUser = {
  name: 'Anju',
  role: 'Field Engineer',
  shift: 'Morning',
  area: 'Production Area A',
};

export const initialEquipment: Equipment[] = [
  {
    id: 'P-101',
    name: 'Production Pump 101',
    description: 'Production Pump',
    status: 'RUNNING',
    lastCheck: '08:15',
  },
  {
    id: 'P-102',
    name: 'Production Pump 102',
    description: 'Production Pump',
    status: 'WARNING',
    lastCheck: '08:20',
  },
  {
    id: 'C-01',
    name: 'Compressor 01',
    description: 'Compressor',
    status: 'RUNNING',
    lastCheck: '08:05',
  },
  {
    id: 'V-22',
    name: 'Valve 22',
    description: 'Valve',
    status: 'MONITORING',
    lastCheck: '07:50',
  },
];

export const initialIssues: Issue[] = [
  {
    id: 'I-201',
    equipmentId: 'P-102',
    type: 'Equipment',
    priority: 'High',
    description: 'Higher-than-normal vibration',
    status: 'Follow-up Required',
    createdAt: '08:25',
  },
  {
    id: 'I-202',
    equipmentId: 'C-01',
    type: 'Process',
    priority: 'Medium',
    description: 'Temperature slightly above normal range',
    status: 'Monitoring',
    createdAt: '07:40',
  },
];

export const initialInspections: Inspection[] = [
  {
    id: 'INS-301',
    equipmentId: 'V-22',
    checklist: {
      pressureChecked: true,
      temperatureChecked: true,
      vibrationChecked: true,
      leakageChecked: true,
      noiseChecked: false,
    },
    observation: 'Under observation after routine inspection',
    status: 'Attention Required',
    createdAt: '07:50',
    completed: true,
  },
  {
    id: 'INS-302',
    equipmentId: 'P-101',
    checklist: {
      pressureChecked: true,
      temperatureChecked: true,
      vibrationChecked: true,
      leakageChecked: true,
      noiseChecked: true,
    },
    observation: 'All parameters normal',
    status: 'Normal',
    createdAt: '09:15',
    completed: true,
  },
  {
    id: 'INS-303',
    equipmentId: 'P-102',
    checklist: {
      pressureChecked: false,
      temperatureChecked: false,
      vibrationChecked: false,
      leakageChecked: false,
      noiseChecked: false,
    },
    observation: '',
    status: 'Normal',
    createdAt: '',
    completed: false,
  },
  {
    id: 'INS-304',
    equipmentId: 'C-01',
    checklist: {
      pressureChecked: false,
      temperatureChecked: false,
      vibrationChecked: false,
      leakageChecked: false,
      noiseChecked: false,
    },
    observation: '',
    status: 'Normal',
    createdAt: '',
    completed: false,
  },
];

export const initialMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'M-101',
    equipmentId: 'P-102',
    problem: 'Vibration follow-up',
    priority: 'High',
    requestedBy: 'Anju',
    requiredDate: '2026-09-12',
    notes: 'Awaiting spare bearing',
    stage: 'Waiting for Spare',
    createdAt: '08:30',
  },
  {
    id: 'M-102',
    equipmentId: 'V-22',
    problem: 'Valve packing inspection',
    priority: 'Low',
    requestedBy: 'Anju',
    requiredDate: '2026-09-14',
    notes: '',
    stage: 'Assigned',
    createdAt: '07:55',
  },
  {
    id: 'M-104',
    equipmentId: 'C-01',
    problem: 'Routine service',
    priority: 'Medium',
    requestedBy: 'Anju',
    requiredDate: '2026-09-13',
    notes: '',
    stage: 'Requested',
    createdAt: '07:45',
  },
];

export const initialPermits: Permit[] = [
  {
    id: 'PTW-101',
    title: 'Pump Maintenance',
    equipmentId: 'P-102',
    stage: 'WORK STARTED',
    requestedBy: 'Anju',
    createdAt: '08:00',
  },
  {
    id: 'PTW-102',
    title: 'Equipment Inspection',
    equipmentId: 'C-01',
    stage: 'PENDING APPROVAL',
    requestedBy: 'Anju',
    createdAt: '07:50',
  },
];

export const initialActivity: ActivityItem[] = [
  {
    id: 'A-1',
    time: '09:15',
    timestamp: 5,
    title: 'Inspection completed',
    subtitle: 'Pump P-101',
  },
  {
    id: 'A-2',
    time: '08:45',
    timestamp: 4,
    title: 'Maintenance request created',
    subtitle: 'Pump P-102',
  },
  {
    id: 'A-3',
    time: '08:30',
    timestamp: 3,
    title: 'Permit PTW-101 activated',
    subtitle: 'Pump P-102',
  },
  {
    id: 'A-4',
    time: '08:20',
    timestamp: 2,
    title: 'Issue reported',
    subtitle: 'Pump P-102 vibration',
  },
  {
    id: 'A-5',
    time: '08:00',
    timestamp: 1,
    title: 'Morning shift started',
    subtitle: 'Production Area A',
  },
];

export const initialDailyReportChecklist: DailyReportChecklistItem[] = [
  { id: 'd1', label: 'Production data', done: true },
  { id: 'd2', label: 'Equipment checks', done: true },
  { id: 'd3', label: 'Inspections', done: true },
  { id: 'd4', label: 'Issues', done: true },
  { id: 'd5', label: 'Safety observations', done: true },
  { id: 'd6', label: 'Shift summary', done: false },
];

export const previousShiftHandover = {
  items: [
    {
      equipmentId: 'P-102',
      description: 'High vibration',
      priority: 'High' as const,
    },
    {
      equipmentId: 'C-01',
      description: 'Temperature slightly high',
      priority: 'Medium' as const,
    },
    {
      equipmentId: 'V-22',
      description: 'Under observation',
      priority: 'Medium' as const,
    },
  ],
};
