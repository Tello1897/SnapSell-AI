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
  Settings,
  ArrowLeft,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

type Section = 'main' | 'personal' | 'billing' | 'notifications' | 'privacy' | 'marketplaces' | 'theme' | 'language' | 'support';

export function Account() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Personal Data State
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');

  // Notifications State
  const [notifications, setNotifications] = useState({
    sales: true,
    messages: true,
    system: false
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    dataSharing: false
  });

  // Theme State
  const [theme, setTheme] = useState('Automatico');

  // Language State
  const [language, setLanguage] = useState('Italiano');

  // Marketplaces State
  const [connectedMarketplaces, setConnectedMarketplaces] = useState<string[]>(['Vinted']);

  const toggleMarketplace = (name: string) => {
    setConnectedMarketplaces(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName });
      await updateDoc(doc(db, 'users', currentUser.uid), { displayName });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Dati Personali</h3>
            </header>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant px-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Il tuo nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant px-1">Email (non modificabile)</label>
                <input 
                  type="email" 
                  value={currentUser?.email || ''} 
                  disabled 
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 font-medium text-on-surface-variant opacity-70"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : success ? <Check size={20} /> : 'Salva Modifiche'}
                {success && ' Salvato!'}
              </button>
            </form>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Abbonamento</h3>
            </header>
            
            <div className="bg-primary rounded-3xl p-6 text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-lg font-bold opacity-80">Piano Attuale</h4>
                    <p className="text-3xl font-black font-headline">SnapSell Pro</p>
                  </div>
                  <Sparkles size={32} className="fill-current" />
                </div>
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check size={16} /> Scansioni IA illimitate
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check size={16} /> Multi-posting automatico
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check size={16} /> Analisi prezzi avanzata
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm opacity-80">Prossimo rinnovo: 12 Apr 2026</p>
                  <p className="text-xl font-black font-headline">€9.90/mese</p>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-on-surface px-1 text-sm uppercase tracking-widest">Metodo di Pagamento</h4>
              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-surface-container rounded flex items-center justify-center">
                    <CreditCard size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">•••• 4242</p>
                    <p className="text-xs text-on-surface-variant">Scade 12/28</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Funzionalità di modifica pagamento in arrivo!")}
                  className="text-primary text-xs font-bold"
                >
                  Modifica
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => alert("Cronologia fatture non disponibile in questa demo.")}
                className="w-full py-4 rounded-2xl border-2 border-outline-variant/30 font-bold text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Cronologia Fatture
              </button>
              <button 
                onClick={() => alert("Sei sicuro di voler annullare? Contatta il supporto per assistenza.")}
                className="w-full py-4 rounded-2xl text-error font-bold hover:bg-error/5 transition-colors"
              >
                Annulla Abbonamento
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Notifiche</h3>
            </header>
            
            <div className="space-y-2">
              <ToggleItem 
                label="Notifiche Vendite" 
                description="Ricevi un avviso quando vendi un oggetto"
                enabled={notifications.sales}
                onToggle={() => setNotifications(prev => ({ ...prev, sales: !prev.sales }))}
              />
              <ToggleItem 
                label="Messaggi" 
                description="Ricevi un avviso per i nuovi messaggi"
                enabled={notifications.messages}
                onToggle={() => setNotifications(prev => ({ ...prev, messages: !prev.messages }))}
              />
              <ToggleItem 
                label="Aggiornamenti Sistema" 
                description="Novità sulle funzionalità e manutenzione"
                enabled={notifications.system}
                onToggle={() => setNotifications(prev => ({ ...prev, system: !prev.system }))}
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Privacy</h3>
            </header>
            
            <div className="space-y-2">
              <ToggleItem 
                label="Profilo Pubblico" 
                description="Permetti agli altri di vedere le tue statistiche"
                enabled={privacy.publicProfile}
                onToggle={() => setPrivacy(prev => ({ ...prev, publicProfile: !prev.publicProfile }))}
              />
              <ToggleItem 
                label="Condivisione Dati" 
                description="Aiutaci a migliorare l'IA condividendo dati anonimi"
                enabled={privacy.dataSharing}
                onToggle={() => setPrivacy(prev => ({ ...prev, dataSharing: !prev.dataSharing }))}
              />
            </div>

            <div className="pt-4">
              <button className="w-full py-4 rounded-2xl border-2 border-error/30 text-error font-bold hover:bg-error/5 transition-colors">
                Elimina Account e Dati
              </button>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Tema</h3>
            </header>
            
            <div className="space-y-2">
              {['Chiaro', 'Scuro', 'Automatico'].map((t) => (
                <div 
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${theme === t ? 'bg-primary/10 border-2 border-primary' : 'bg-surface-container-lowest border border-outline-variant/10'}`}
                >
                  <span className="font-bold">{t}</span>
                  {theme === t && <Check size={20} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Lingua</h3>
            </header>
            
            <div className="space-y-2">
              {['Italiano', 'English', 'Español', 'Français', 'Deutsch'].map((l) => (
                <div 
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${language === l ? 'bg-primary/10 border-2 border-primary' : 'bg-surface-container-lowest border border-outline-variant/10'}`}
                >
                  <span className="font-bold">{l}</span>
                  {language === l && <Check size={20} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>
        );

      case 'marketplaces':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Mercatini</h3>
            </header>
            
            <div className="space-y-4">
              <MarketplaceItem 
                name="Vinted" 
                status={connectedMarketplaces.includes('Vinted') ? 'Collegato' : 'Non collegato'} 
                username={connectedMarketplaces.includes('Vinted') ? `@${currentUser?.displayName?.replace(/\s+/g, '') || 'utente'}` : undefined} 
                color="#007782" 
                onToggle={() => toggleMarketplace('Vinted')}
              />
              <MarketplaceItem 
                name="Depop" 
                status={connectedMarketplaces.includes('Depop') ? 'Collegato' : 'Non collegato'} 
                username={connectedMarketplaces.includes('Depop') ? `@${currentUser?.displayName?.replace(/\s+/g, '') || 'utente'}` : undefined} 
                color="#E00022" 
                onToggle={() => toggleMarketplace('Depop')}
              />
              <MarketplaceItem 
                name="Wallapop" 
                status={connectedMarketplaces.includes('Wallapop') ? 'Collegato' : 'Non collegato'} 
                username={connectedMarketplaces.includes('Wallapop') ? `@${currentUser?.displayName?.replace(/\s+/g, '') || 'utente'}` : undefined} 
                color="#13C1A4" 
                onToggle={() => toggleMarketplace('Wallapop')}
              />
              <MarketplaceItem 
                name="eBay" 
                status={connectedMarketplaces.includes('eBay') ? 'Collegato' : 'Non collegato'} 
                username={connectedMarketplaces.includes('eBay') ? `@${currentUser?.displayName?.replace(/\s+/g, '') || 'utente'}` : undefined} 
                color="#F5F5F5" 
                isLight 
                onToggle={() => toggleMarketplace('eBay')}
              />
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveSection('main')} className="p-2 rounded-full bg-surface-container-low">
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-2xl font-black font-headline">Supporto</h3>
            </header>
            
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
                <h4 className="font-bold text-lg mb-2">Hai bisogno di aiuto?</h4>
                <p className="text-on-surface-variant text-sm mb-6">Il nostro team è a tua disposizione per qualsiasi problema tecnico o domanda commerciale.</p>
                <button 
                  onClick={() => alert("Segnalazione inviata! Ti risponderemo entro 24 ore.")}
                  className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold shadow-lg active:scale-95 transition-all"
                >
                  Apri una Segnalazione
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => alert("Reindirizzamento al Centro Assistenza...")}
                  className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 text-center active:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <HelpCircle className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-sm font-bold">FAQ</p>
                </div>
                <div 
                  onClick={() => alert("Caricamento tutorial video...")}
                  className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 text-center active:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <Globe className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-sm font-bold">Tutorial</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10">
                <h5 className="font-bold text-sm mb-3 px-1">Contatti Rapidi</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Email</p>
                      <p className="text-xs text-on-surface-variant">support@snapsell.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Community</p>
                      <p className="text-xs text-on-surface-variant">Discord & Telegram</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight font-headline">Profilo</h2>
              <button 
                onClick={() => alert("Impostazioni generali in arrivo!")}
                className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
              >
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
                  <MenuItem icon={User} label="Dati Personali" onClick={() => setActiveSection('personal')} />
                  <MenuItem icon={CreditCard} label="Abbonamento e Fatturazione" onClick={() => setActiveSection('billing')} />
                  <MenuItem icon={Bell} label="Notifiche" onClick={() => setActiveSection('notifications')} />
                  <MenuItem icon={Shield} label="Privacy e Sicurezza" isLast onClick={() => setActiveSection('privacy')} />
                </div>
              </section>

              {/* Integrations */}
              <section>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Integrazioni</h4>
                <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
                  <MenuItem icon={Store} label="Gestisci Mercatini" value="1 collegato" isLast onClick={() => setActiveSection('marketplaces')} />
                </div>
              </section>

              {/* App Preferences */}
              <section>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Preferenze App</h4>
                <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
                  <MenuItem icon={Moon} label="Tema Scuro" value={theme} onClick={() => setActiveSection('theme')} />
                  <MenuItem icon={Globe} label="Lingua" value={language} isLast onClick={() => setActiveSection('language')} />
                </div>
              </section>

              {/* Support */}
              <section>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-2">Supporto</h4>
                <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
                  <MenuItem icon={HelpCircle} label="Centro Assistenza" onClick={() => setActiveSection('support')} />
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
  };

  return (
    <div className="pb-10">
      {renderSection()}
    </div>
  );
}

function ToggleItem({ label, description, enabled, onToggle }: { label: string, description: string, enabled: boolean, onToggle: () => void }) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 flex items-center justify-between">
      <div className="flex-1 pr-4">
        <p className="font-bold text-on-surface">{label}</p>
        <p className="text-xs text-on-surface-variant">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary' : 'bg-outline-variant'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-7' : 'left-1'}`}></div>
      </button>
    </div>
  );
}

function MarketplaceItem({ name, status, username, color, isLight = false, onToggle }: { name: string, status: string, username?: string, color: string, isLight?: boolean, onToggle: () => void }) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: color }}>
          <span className={`font-black text-xs ${isLight ? 'text-black' : 'text-white'}`}>{name[0]}</span>
        </div>
        <div>
          <p className="font-bold text-on-surface">{name}</p>
          <p className="text-xs text-on-surface-variant">{username || status}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${username ? 'bg-surface-container text-on-surface-variant' : 'bg-primary text-on-primary shadow-md'}`}
      >
        {username ? 'Scollega' : 'Collega'}
      </button>
    </div>
  );
}

function MenuItem({ 
  icon: Icon, 
  label, 
  value, 
  isLast = false, 
  isDestructive = false,
  onClick
}: { 
  icon: any, 
  label: string, 
  value?: string, 
  isLast?: boolean,
  isDestructive?: boolean,
  onClick?: () => void
}) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 bg-surface-container-lowest active:bg-surface-container-low transition-colors cursor-pointer ${!isLast ? 'border-b border-outline-variant/10' : ''}`}
    >
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
