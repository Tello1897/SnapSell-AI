import { Search, Scan, CheckCircle2, TrendingUp, BadgeCheck, LineChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AnalysisDashboard() {
  return (
    <div className="space-y-10">
      {/* Search Section */}
      <section className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-outline" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Cerca un articolo per analisi profonda (es. Giacca Vintage Levi's)"
            className="w-full h-14 pl-12 pr-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/40 transition-all text-sm font-body outline-none"
          />
        </div>
      </section>

      {/* Primary AI Action Card */}
      <section>
        <Link 
          to="/detailed-analysis"
          className="relative overflow-hidden bg-primary rounded-2xl p-8 shadow-xl shadow-primary/10 group cursor-pointer active:scale-[0.98] transition-all block"
        >
          {/* Abstract Background Pulse Elements */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-surface-container-lowest/10 rounded-full blur-3xl group-hover:bg-surface-container-lowest/20 transition-colors"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-surface-container-lowest/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner">
              <Scan className="text-on-primary" size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-on-primary font-headline font-extrabold text-2xl leading-tight">Scansiona un articolo per analisi profonda</h2>
              <p className="text-on-primary/80 font-body text-sm max-w-[240px] mx-auto">
                Ottieni stime di prezzo, autenticità e tendenze di mercato istantanee.
              </p>
            </div>
            <button className="bg-surface-container-lowest text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Inizia Scansione
            </button>
          </div>
        </Link>
      </section>

      {/* Recently Analyzed Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg text-on-surface">Articoli Analizzati Di Recente</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-primary cursor-pointer hover:opacity-70 transition-opacity">Vedi tutto</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {/* Item 1: Jacket */}
          <div className="flex-shrink-0 w-40 space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-highest relative">
              <img 
                src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80" 
                alt="Levi's Trucker 70s" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 bg-surface-container-lowest/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-primary flex items-center gap-1">
                <CheckCircle2 size={12} className="fill-current" />
                AUTENTICO
              </div>
            </div>
            <div className="px-1">
              <p className="text-xs font-bold text-on-surface truncate">Levi's Trucker 70s</p>
              <p className="text-[10px] text-outline truncate">Analizzato 2h fa</p>
            </div>
          </div>

          {/* Item 2: Shoes */}
          <div className="flex-shrink-0 w-40 space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-highest relative">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" 
                alt="Nike Air Max 1" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 bg-surface-container-lowest/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-tertiary flex items-center gap-1">
                <TrendingUp size={12} className="fill-current" />
                HIGH DEMAND
              </div>
            </div>
            <div className="px-1">
              <p className="text-xs font-bold text-on-surface truncate">Nike Air Max 1</p>
              <p className="text-[10px] text-outline truncate">Analizzato Ieri</p>
            </div>
          </div>

          {/* Item 3: Bag */}
          <div className="flex-shrink-0 w-40 space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-highest relative">
              <img 
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80" 
                alt="Prada Saffiano Bag" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 bg-surface-container-lowest/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-primary flex items-center gap-1">
                <BadgeCheck size={12} className="fill-current" />
                PRIME CONDITION
              </div>
            </div>
            <div className="px-1">
              <p className="text-xs font-bold text-on-surface truncate">Prada Saffiano Bag</p>
              <p className="text-[10px] text-outline truncate">Analizzato 3gg fa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Summary (Bento Style) */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-5 rounded-2xl space-y-3">
          <LineChart className="text-primary" size={24} />
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Mercato Oggi</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-on-surface">+12%</p>
            <span className="text-[10px] font-bold text-primary">VINTAGE</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-2xl space-y-3">
          <PieChart className="text-tertiary" size={24} />
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Best Seller</p>
          <p className="text-lg font-bold text-on-surface leading-tight">Sneakers Retro</p>
        </div>
      </section>
    </div>
  );
}
