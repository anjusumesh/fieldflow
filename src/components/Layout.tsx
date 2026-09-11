import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';
import Toast from './Toast';
import ModalHost from './ModalHost';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 pb-24 pt-4 sm:px-6 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <Toast />
      <ModalHost />
    </div>
  );
}
