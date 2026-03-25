import { Menu, X, ArrowLeft, Bell, Moon, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

export function TopAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isScan = location.pathname === '/scan';
  const isListing = location.pathname === '/listing';
  const isAnalysis = location.pathname === '/analysis';
  const isDetailedAnalysis = location.pathname === '/detailed-analysis';

  const handleLeftClick = () => {
    if (isScan || isListing) {
      navigate(-1);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        {(isScan || isListing) && (
          <button 
            onClick={handleLeftClick}
            className="text-primary hover:opacity-80 transition-opacity scale-95 active:scale-90"
          >
            {isScan ? <X size={24} /> : <ArrowLeft size={24} />}
          </button>
        )}
        <h1 className="text-2xl font-black tracking-tighter text-primary">SnapSell AI</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-on-surface-variant hover:text-primary transition-colors">
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        {isDetailedAnalysis && <Bell size={24} className="text-on-surface-variant" />}
        {(!isAnalysis || isDetailedAnalysis) && (
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-container scale-95 active:scale-90 transition-transform cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </header>
  );
}
