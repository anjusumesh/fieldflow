# FieldFlow Dashboard

## 1. Purpose

FieldFlow is a simple digital dashboard for Oil & Gas field engineers to quickly see their daily work and take action.

The first version should be simple. Advanced features can be added later.

## 2. Dashboard

### Header

* FieldFlow logo/name
* "Good morning, Anju"
* Current date
* User profile
* Notification icon

### Sidebar

* Dashboard
* Issues
* Inspections
* Maintenance
* **Permit-to-Work**
* Equipment
* Reports

## 3. Summary Cards

Show:

* Open Issues — 2
* Inspections Due — 4
* Maintenance Requests — 3
* Active Permits — 2
* Pending Approvals — 1

## 4. Quick Actions

* * Log Issue
* * Inspection
* * Maintenance Request
* * Request Permit
* * Shift Handover

## 5. Previous Shift Handover

Show important items from the previous shift.

```text
P-102 — High vibration — High
C-01 — Temperature slightly high — Medium
V-22 — Under observation — Medium
```

**View Handover →**

## 6. Equipment Status

| Equipment | Status     | Last Check |
| --------- | ---------- | ---------- |
| P-101     | Running    | 08:15      |
| P-102     | Warning    | 08:20      |
| C-01      | Running    | 08:05      |
| V-22      | Monitoring | 07:50      |

## 7. Permit-to-Work Helper

A simplified digital workflow for **fictional/safe scenarios**.

Instead of paperwork moving between people:

```text
WORK REQUEST
     ↓
RISK ASSESSMENT
     ↓
APPROVAL
     ↓
PERMIT ISSUED
     ↓
WORK STARTED
     ↓
WORK COMPLETED
     ↓
PERMIT CLOSED
```

### Permit Dashboard

Show simple permit cards/list:

```text
PTW-101
Pump Maintenance
P-102

● Work Started
```

```text
PTW-102
Equipment Inspection
C-01

● Pending Approval
```

### Permit Actions

Users can:

* Create Work Request
* Add basic Risk Assessment
* Submit for Approval
* Approve Request
* Issue Permit
* Start Work
* Mark Work Completed
* Close Permit

For the MVP, use mock data and simple status changes.

Detailed safety procedures, real permit approvals, digital signatures and real-world operational integrations can be added later.

## 8. Today's Activity

```text
09:15  Inspection completed — P-101
08:45  Maintenance request — P-102
08:30  Permit PTW-101 activated
08:20  Issue reported — P-102
08:00  Morning shift started
```

## 9. Daily Report

```text
Daily Report

5 / 6 completed

✓ Production data
✓ Equipment checks
✓ Inspections
✓ Issues
✓ Safety observations
○ Shift summary
```

Button:

**Generate Report**

## 10. Design

The application should be:

* Modern
* Clean
* Professional
* Simple
