import { Sparkles, TrendingUp, BarChart3, ThumbsUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '1 OTT', price: 12 },
  { name: '10 OTT', price: 15 },
  { name: '20 OTT', price: 14 },
  { name: 'OGGI', price: 22 },
];

export function DetailedAnalysis() {
  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <section className="grid grid-cols-1 gap-6 items-center">
        <div className="relative group aspect-square rounded-2xl overflow-hidden shadow-none">
          <img 
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" 
            alt="Vintage Jacket" 
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Oggetto Identificato</p>
            <h2 className="font-headline font-bold text-lg text-on-surface">Giacca Vintage Verde Oliva</h2>
          </div>
        </div>

        <div className="bg-primary p-8 rounded-2xl text-on-primary shadow-xl shadow-primary/10 flex flex-col justify-center h-full">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="fill-current" size={20} />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-90">Analisi Prezzo AI</span>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-headline font-extrabold tracking-tighter">€18.00 - €25.00</p>
            <p className="text-on-primary/80 font-medium">Stima basata su 142 vendite recenti</p>
          </div>
          <div className="mt-8 pt-6 border-t border-on-primary/20 flex gap-4">
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold opacity-70">Confidenza</p>
              <p className="text-lg font-bold">94%</p>
            </div>
            <div className="flex-1 border-l border-on-primary/20 pl-4">
              <p className="text-[10px] uppercase font-bold opacity-70">Stato Oggetto</p>
              <p className="text-lg font-bold">Ottimo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Container */}
      <section className="bg-surface-container-lowest rounded-2xl p-8 space-y-12">
        <header>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Approfondimenti di Mercato (Avanzato)</h3>
          <p className="text-on-surface-variant max-w-2xl">
            Visualizza i dati in tempo reale aggregati dalle principali piattaforme di resale europee per massimizzare il tuo profitto.
          </p>
        </header>

        {/* Chart A: Line Chart Simulation */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h4 className="font-headline font-bold text-on-surface">Andamento del Prezzo Medio (Ultimi 30 giorni)</h4>
            <span className="text-xs font-bold text-primary bg-primary-container/20 px-2 py-1 rounded-lg">+4.2% questo mese</span>
          </div>
          <div className="h-48 w-full bg-surface-container-low rounded-2xl relative overflow-hidden p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8200e8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8200e8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6d5178', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6d5178', fontWeight: 'bold' }} tickFormatter={(value) => `€${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#8200e8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="price" stroke="#8200e8" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Chart B: Bar Chart Simulation */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-on-surface">Nuovi Annunci vs. Domanda Stimata</h4>
            <div className="h-48 w-full flex items-end justify-between gap-2 px-2 pb-6 border-b border-outline-variant/20">
              {/* Bar Groups */}
              <div className="flex-1 h-full flex items-end justify-center gap-1 group">
                <div className="w-3 bg-primary rounded-t-sm h-[40%]" title="Annunci"></div>
                <div className="w-3 bg-surface-variant rounded-t-sm h-[70%]" title="Domanda"></div>
              </div>
              <div className="flex-1 h-full flex items-end justify-center gap-1">
                <div className="w-3 bg-primary rounded-t-sm h-[55%]"></div>
                <div className="w-3 bg-surface-variant rounded-t-sm h-[65%]"></div>
              </div>
              <div className="flex-1 h-full flex items-end justify-center gap-1">
                <div className="w-3 bg-primary rounded-t-sm h-[45%]"></div>
                <div className="w-3 bg-surface-variant rounded-t-sm h-[85%]"></div>
              </div>
              <div className="flex-1 h-full flex items-end justify-center gap-1">
                <div className="w-3 bg-primary rounded-t-sm h-[30%]"></div>
                <div className="w-3 bg-surface-variant rounded-t-sm h-[90%]"></div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-on-surface-variant px-2">
              <span>Sett 1</span>
              <span>Sett 2</span>
              <span>Sett 3</span>
              <span>Sett 4</span>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span><span className="text-[10px] font-medium">Annunci</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-surface-variant"></span><span className="text-[10px] font-medium">Domanda</span></div>
            </div>
          </div>

          {/* Chart C: Horizontal Price Range */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-on-surface">Scomposizione dei Prezzi</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold px-1"><span>Vinted</span><span className="text-on-surface-variant">€15 - €22</span></div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden relative">
                  <div className="absolute left-[30%] right-[40%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold px-1"><span>eBay</span><span className="text-on-surface-variant">€20 - €35</span></div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden relative">
                  <div className="absolute left-[50%] right-[10%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold px-1"><span>Wallapop</span><span className="text-on-surface-variant">€12 - €18</span></div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden relative">
                  <div className="absolute left-[15%] right-[60%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold px-1"><span>Subito</span><span className="text-on-surface-variant">€18 - €28</span></div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden relative">
                  <div className="absolute left-[40%] right-[30%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Card */}
      <section className="bg-surface-container-high rounded-2xl p-8 border border-primary/10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ThumbsUp size={24} className="fill-current" />
              <h4 className="font-headline font-bold text-lg">Raccomandazione IA Basata sui Dati</h4>
            </div>
            <p className="text-on-surface leading-relaxed font-medium">
              Basato sull'andamento stabile del prezzo (Chart A) e sull'alto volume di domanda (Chart B), <span className="text-primary font-bold">vendere a €22</span> è consigliato entro 48 ore.
            </p>
          </div>
          <div className="w-full">
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Prezzo Suggerito</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-on-surface">€</span>
                <input 
                  type="text" 
                  defaultValue="22.00"
                  className="border-none p-0 text-3xl font-black text-primary bg-transparent focus:ring-0 w-24 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-28 left-0 w-full px-6 z-40">
        <Link 
          to="/inventory"
          className="w-full py-5 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Plus size={24} />
          Crea Annuncio con Questa Analisi
        </Link>
      </div>
    </div>
  );
}
