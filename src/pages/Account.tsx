import { 
  User, 
  Bell, 
  Shield, 
  Store, 
  Moon, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  CreditCard, 
  Sparkles,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight font-headline">Profilo</h2>
        <button className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors">
          <Settings size={24} />
        </button>
      </div>

      {/* User Card */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-2xl font-bold font-headline">
            {getInitials(currentUser?.displayName || currentUser?.email)}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary p-1.5 rounded-full border-4 border-surface-container-lowest">
            <Sparkles size={14} className="fill-current" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold font-headline leading-tight">{currentUser?.displayName || 'Utente'}</h3>
          <p className="text-sm text-on-surface-variant mb-2">{currentUser?.email}</p>
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
            Piano Pro
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl text-center shadow-sm border border-outline-variant/10">
          <p className="text-2xl font-extrabold font-headline text-primary">14</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Attivi</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl text-center shadow-sm border border-outline-variant/10">
          <p className="text-2xl font-extrabold font-headline text-secondary">42</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Venduti</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl text-center shadow-sm border border-outline-variant/10">
          <p className="text-2xl font-extrabold font-headline text-tertiary">4.9</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Rating</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        
        {/* Account & Settings */}
        <section>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Impostazioni Account</h4>
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <MenuItem icon={User} label="Dati Personali" />
            <MenuItem icon={CreditCard} label="Abbonamento e Fatturazione" />
            <MenuItem icon={Bell} label="Notifiche" />
            <MenuItem icon={Shield} label="Privacy e Sicurezza" isLast />
          </div>
        </section>

        {/* Integrations */}
        <section>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Integrazioni</h4>
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <MenuItem icon={Store} label="Gestisci Mercatini" value="1 collegato" isLast />
          </div>
        </section>

        {/* App Preferences */}
        <section>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Preferenze App</h4>
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <MenuItem icon={Moon} label="Tema Scuro" value="Automatico" />
            <MenuItem icon={Globe} label="Lingua" value="Italiano" isLast />
          </div>
        </section>

        {/* Support */}
        <section>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Supporto</h4>
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <MenuItem icon={HelpCircle} label="Centro Assistenza" />
            <div onClick={handleLogout}>
              <MenuItem icon={LogOut} label="Esci dall'account" isLast isDestructive />
            </div>
          </div>
        </section>

      </div>
      
      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-outline font-medium">SnapSell AI v1.0.0</p>
      </div>
    </div>
  );
}

function MenuItem({ 
  icon: Icon, 
  label, 
  value, 
  isLast = false, 
  isDestructive = false 
}: { 
  icon: any, 
  label: string, 
  value?: string, 
  isLast?: boolean,
  isDestructive?: boolean
}) {
  return (
    <div className={`flex items-center justify-between p-4 bg-surface-container-lowest active:bg-surface-container-low transition-colors cursor-pointer ${!isLast ? 'border-b border-outline-variant/10' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl ${isDestructive ? 'bg-error-container/20 text-error' : 'bg-surface-container text-on-surface-variant'}`}>
          <Icon size={20} className={isDestructive ? 'text-error' : 'text-primary'} />
        </div>
        <span className={`font-bold ${isDestructive ? 'text-error' : 'text-on-surface'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-on-surface-variant font-medium">{value}</span>}
        <ChevronRight size={20} className="text-outline-variant" />
      </div>
    </div>
  );
}
