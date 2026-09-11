import KpiCards from '../components/KpiCards';
import QuickActions from '../components/QuickActions';
import PreviousShiftHandover from '../components/PreviousShiftHandover';
import EquipmentStatusTable from '../components/EquipmentStatusTable';
import TodaysActivity from '../components/TodaysActivity';
import DailyReportProgress from '../components/DailyReportProgress';

export default function Dashboard() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 animate-fade-in">
      <KpiCards />
      <QuickActions />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviousShiftHandover />
        <EquipmentStatusTable />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TodaysActivity />
        <DailyReportProgress />
      </div>
    </div>
  );
}
