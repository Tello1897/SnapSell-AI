import { Outlet } from 'react-router-dom';
import { TopAppBar } from './TopAppBar';
import { BottomNavBar } from './BottomNavBar';
import { SubscriptionPopup } from './SubscriptionPopup';

export function Layout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col">
      <TopAppBar />
      <main className="pt-24 pb-40 px-6 max-w-2xl mx-auto w-full flex-grow">
        <Outlet />
      </main>
      <BottomNavBar />
      <SubscriptionPopup />
    </div>
  );
}
