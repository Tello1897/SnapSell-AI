import { Home, Camera, Package, User, BarChart2 } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function BottomNavBar() {
  const location = useLocation();
  const isScan = location.pathname === '/scan';

  if (isScan) return null; // Hide on scan selection screen

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/analysis', icon: BarChart2, label: 'Analisi' },
    { path: '/scan', icon: Camera, label: 'Scansiona', isFab: true },
    { path: '/inventory', icon: Package, label: 'Inventario' },
    { path: '/account', icon: User, label: 'Profilo' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Optional gradient fade behind the nav bar for better readability */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none -z-10"></div>
      
      <nav className="bg-surface-container-lowest border-t border-outline-variant/20 px-2 pb-6 pt-2 grid grid-cols-5 justify-items-center items-center h-[88px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/analysis' && location.pathname === '/detailed-analysis');

          if (item.isFab) {
            return (
              <div key={item.path} className="relative -top-8 flex-shrink-0 z-10 flex justify-center w-full">
                <NavLink
                  to={item.path}
                  className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-primary text-on-primary shadow-xl shadow-primary/30 border-[6px] border-surface transition-transform active:scale-95 hover:scale-105"
                >
                  <Icon size={32} className="fill-current" />
                  <span className="sr-only">{item.label}</span>
                </NavLink>
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors relative",
                isActive 
                  ? "text-primary" 
                  : "text-on-surface-variant hover:text-primary/70"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-2xl transition-all duration-300 flex items-center justify-center",
                isActive ? "bg-primary-container/40 scale-110 mb-1" : "bg-transparent scale-100"
              )}>
                <Icon size={24} className={isActive ? "fill-current" : ""} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "font-label text-[10px] font-bold uppercase tracking-wider transition-all duration-300 absolute bottom-1",
                isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
