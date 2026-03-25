import { Camera, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { currentUser } = useAuth();
  
  const [marketplaces, setMarketplaces] = useState([
    {
      id: 'vinted',
      name: 'Vinted',
      username: currentUser?.displayName ? `@${currentUser.displayName.replace(/\s+/g, '')}` : '@Utente',
      isConnected: true,
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-[#007782] flex items-center justify-center shadow-sm">
          <img src="https://cdn.simpleicons.org/vinted/white" alt="Vinted" className="w-8 h-8" />
        </div>
      )
    },
    {
      id: 'depop',
      name: 'Depop',
      isConnected: false,
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-[#E00022] flex items-center justify-center shadow-sm overflow-hidden">
          <svg width="38" height="38" viewBox="2 4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8 6.6h5.4v18.8h-5.4v-2.1c-1.4 1.5-3.6 2.5-6.3 2.5-5.2 0-9.2-4.1-9.2-9.4 0-5.3 4-9.4 9.2-9.4 2.7 0 4.9 1 6.3 2.5V6.6zm-6.1 14.5c2.7 0 4.8-2.1 4.8-4.7 0-2.6-2.1-4.7-4.8-4.7-2.7 0-4.8 2.1-4.8 4.7 0 2.6 2.1 4.7 4.8 4.7z" fill="white"/>
          </svg>
        </div>
      )
    },
    {
      id: 'wallapop',
      name: 'Wallapop',
      isConnected: false,
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-[#13C1A4] flex items-center justify-center shadow-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.22 17.152a3.868 3.868 0 0 0 3.868-3.868c0-.73-.2-1.42-.55-2.01a3.868 3.868 0 0 0-2.43-5.59 5.802 5.802 0 0 0-11.45 1.52 3.868 3.868 0 0 0-1.74 5.92 3.868 3.868 0 0 0 4.57 1.63 5.802 5.802 0 0 0 7.73 2.39zm-1.93-1.93a3.868 3.868 0 0 1-5.15-1.59 1.934 1.934 0 0 0-2.61-.7 1.934 1.934 0 0 1-2.61-2.61 1.934 1.934 0 0 0-.08-2.7 1.934 1.934 0 0 1 2.24-3.08 1.934 1.934 0 0 0 2.45-1.42 3.868 3.868 0 0 1 7.42-1.02 1.934 1.934 0 0 0 2.24 1.3 1.934 1.934 0 0 1 1.22 3.66 1.934 1.934 0 0 0 .55 2.65 1.934 1.934 0 0 1-1.93 3.35 1.934 1.934 0 0 0-2.61.7 3.868 3.868 0 0 1-1.13 1.46z"/>
          </svg>
        </div>
      )
    },
    {
      id: 'ebay',
      name: 'eBay',
      isConnected: false,
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center shadow-sm border border-outline-variant/10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" alt="eBay" className="w-10 object-contain" />
        </div>
      )
    },
    {
      id: 'subito',
      name: 'Subito',
      isConnected: false,
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-[#FF3A2D] flex items-center justify-center shadow-sm">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative">
            <div className="absolute w-[3px] h-[10px] bg-[#FF3A2D] rounded-full -rotate-45 -translate-x-[6px] translate-y-[2px]"></div>
            <div className="absolute w-[3px] h-[10px] bg-[#FF3A2D] rounded-full -translate-y-[2px]"></div>
            <div className="absolute w-[3px] h-[10px] bg-[#FF3A2D] rounded-full rotate-45 translate-x-[6px] translate-y-[2px]"></div>
          </div>
        </div>
      )
    }
  ]);

  const toggleConnection = (id: string) => {
    setMarketplaces(current =>
      current.map(market =>
        market.id === id
          ? { ...market, isConnected: !market.isConnected, username: !market.isConnected ? (currentUser?.displayName ? `@${currentUser.displayName.replace(/\s+/g, '')}` : '@Utente') : undefined }
          : market
      )
    );
  };

  return (
    <div className="space-y-10">
      {/* AI Hero Banner */}
      <section className="relative overflow-hidden bg-primary rounded-2xl p-8 text-on-primary shadow-xl shadow-primary/20">
        <div className="relative z-10">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mb-6">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">IA Attiva</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-3 font-headline leading-tight">Vendi in un lampo.</h2>
          <p className="text-on-primary/90 font-medium mb-8 text-lg leading-relaxed">
            Scatta una foto, l'IA crea l'annuncio perfetto per te in pochi secondi.
          </p>
          <Link 
            to="/scan"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3.5 rounded-xl font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Camera size={20} className="fill-current" />
            <span>Inizia Scansione</span>
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-secondary/20 rounded-tl-full blur-2xl"></div>
      </section>

      {/* I Tuoi Mercatini Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight text-on-surface font-headline">I Tuoi Mercatini</h3>
          <span className="text-sm font-semibold text-primary cursor-pointer hover:underline">Gestisci</span>
        </div>
        <div className="space-y-4">
          {marketplaces.map((market) => (
            <div key={market.id} className="group relative bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between transition-all hover:scale-[1.02] active:scale-100 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4">
                {market.icon}
                <div>
                  <p className="font-bold text-lg leading-tight font-headline">{market.name}</p>
                  {market.isConnected ? (
                    <p className="text-sm text-outline font-medium">{market.username}</p>
                  ) : (
                    <p className="text-sm text-outline font-medium italic">Non collegato</p>
                  )}
                </div>
              </div>
              {market.isConnected ? (
                <button 
                  onClick={() => toggleConnection(market.id)}
                  className="bg-surface-container-low text-on-surface-variant px-5 py-2.5 rounded-full font-bold text-sm hover:bg-surface-container-high transition-colors border border-outline-variant/30"
                >
                  Scollega
                </button>
              ) : (
                <button 
                  onClick={() => toggleConnection(market.id)}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Collega
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
