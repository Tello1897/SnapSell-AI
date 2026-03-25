import { Sparkles, Pencil, ChevronDown, Info, Ruler, Palette, Tag, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ListingEditor() {
  return (
    <div className="space-y-8">
      {/* AI Insight Banner */}
      <div className="p-4 bg-primary-container/20 rounded-2xl flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </div>
        <p className="text-sm font-semibold text-on-primary-container">Analisi AI completata con successo</p>
      </div>

      {/* Image Section: Editorial Style */}
      <section className="relative group">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container-low">
          <img 
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" 
            alt="Vintage Jacket" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <Sparkles className="text-primary fill-current" size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">High Accuracy</span>
        </div>
      </section>

      {/* Editable Fields Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Titolo Annuncio</label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              defaultValue="Giacca Verde Oliva Vintage"
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 transition-all outline-none"
            />
            <button className="absolute right-4 text-primary hover:opacity-70 transition-opacity">
              <Pencil size={20} className="fill-current" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Descrizione</label>
          <div className="relative flex items-start">
            <textarea 
              defaultValue="Giacca vintage in perfette condizioni. Colore verde oliva, taglia L. Ideale per la mezza stagione."
              rows={4}
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 transition-all outline-none resize-none no-scrollbar"
            />
            <button className="absolute right-4 top-4 text-primary hover:opacity-70 transition-opacity">
              <Pencil size={20} className="fill-current" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Condizione</label>
            <div className="relative">
              <select className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 appearance-none outline-none">
                <option>Ottimo</option>
                <option>Nuovo con cartellino</option>
                <option>Buono</option>
                <option>Usato</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Prezzo Suggerito</label>
            <div className="relative flex items-center w-full bg-surface-container-highest border-none rounded-2xl px-4 py-4 text-primary font-bold">
              <span className="mr-1">€</span>
              <input 
                type="text" 
                defaultValue="45.00"
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-primary font-bold"
              />
              <Info size={16} className="absolute right-4 fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* Metadata Bento Grid */}
      <section className="mt-8 grid grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Ruler size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Taglia</span>
          <span className="text-sm font-bold">L</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Palette size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Colore</span>
          <span className="text-sm font-bold">Olive</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Tag size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Stile</span>
          <span className="text-sm font-bold">Vintage</span>
        </div>
      </section>

      {/* Primary Action */}
      <div className="fixed bottom-28 left-0 w-full px-6 z-40">
        <Link 
          to="/inventory"
          className="w-full py-5 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Wand2 size={24} className="fill-current" />
          Genera Annuncio
        </Link>
      </div>
    </div>
  );
}
