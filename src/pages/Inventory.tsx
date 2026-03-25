import { Filter, Copy, MoreVertical, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Inventory() {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedPrice, setCopiedPrice] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tutti');

  const [titleText, setTitleText] = useState("Giacca in denim Levi's Vintage 90s - Ottime Condizioni");
  const [descText, setDescText] = useState(`Bellissima giacca in denim vintage anni '90. Taglio classico, lavaggio medio originale. Il tessuto è robusto e di alta qualità, tipico della produzione d'epoca. 

✨ Condizioni: Eccellenti, nessun segno di usura.
📏 Taglia: L (Veste comoda)
🎨 Colore: Denim Blu Medio

Perfetta per un look urban o streetwear. Spedizione rapida! #vintage #denim #levis #90s #streetwear`);
  const [priceText, setPriceText] = useState("22.00");

  const handleCopy = async (text: string, type: 'title' | 'desc' | 'price' | 'all') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'title') {
        setCopiedTitle(true);
        setTimeout(() => setCopiedTitle(false), 2000);
      } else if (type === 'desc') {
        setCopiedDesc(true);
        setTimeout(() => setCopiedDesc(false), 2000);
      } else if (type === 'price') {
        setCopiedPrice(true);
        setTimeout(() => setCopiedPrice(false), 2000);
      } else {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Inventory Section Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight font-headline text-on-surface">Il tuo Inventario</h2>
          <p className="text-on-surface-variant text-sm mt-1">4 oggetti pronti per la vendita</p>
        </div>
        <div className="flex gap-2 relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 rounded-full transition-all ${isFilterOpen ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-primary hover:opacity-80'}`}
          >
            <Filter size={24} />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/20 overflow-hidden z-50">
              {['Tutti', 'Pubblicati', 'Bozze', 'In elaborazione'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-surface-container-low ${activeFilter === filter ? 'text-primary font-bold bg-primary/5' : 'text-on-surface'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Quick Selection / Active Item */}
      <div>
        <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm">
          <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" 
              alt="Vintage Jacket" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <span className="bg-primary-container/30 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">Selezione Attiva</span>
            <h3 className="text-xl font-bold font-headline mb-1">Giacca Denim Vintage '90</h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">Analisi AI completata. Ottimizzato per 4 piattaforme diverse.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Pubblica
          </button>
        </div>
      </div>

      {/* Tabs Container */}
      <div>
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
          <button className="flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all bg-primary text-on-primary shadow-md">Vinted</button>
          <button className="flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high">eBay</button>
          <button className="flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high">Wallapop</button>
          <button className="flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high">Subito</button>
        </div>
      </div>

      {/* Optimized Content Area */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Descrizione AI Vinted</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Titolo Suggerito</p>
            <div className="bg-surface-container-low rounded-xl p-4 pr-14 border border-outline-variant/20 relative group">
              <input 
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                className="w-full bg-transparent text-on-surface-variant font-medium outline-none focus:ring-2 focus:ring-primary/40 rounded px-1"
              />
              <button 
                onClick={() => handleCopy(titleText, 'title')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-2.5 rounded-xl hover:bg-primary/10 transition-colors active:scale-95"
                title="Copia Titolo"
              >
                {copiedTitle ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
          
          <div>
            <p className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Descrizione</p>
            <div className="bg-surface-container-low rounded-xl p-4 pr-14 border border-outline-variant/20 relative group">
              <textarea 
                value={descText}
                onChange={(e) => setDescText(e.target.value)}
                rows={8}
                className="w-full bg-transparent text-on-surface-variant leading-relaxed text-sm whitespace-pre-line outline-none focus:ring-2 focus:ring-primary/40 rounded px-1 resize-none no-scrollbar"
              />
              <button 
                onClick={() => handleCopy(descText, 'desc')}
                className="absolute right-2 top-2 text-primary p-2.5 rounded-xl hover:bg-primary/10 transition-colors active:scale-95"
                title="Copia Descrizione"
              >
                {copiedDesc ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <div>
            <p className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Prezzo Suggerito</p>
            <div className="bg-surface-container-low rounded-xl p-4 pr-14 border border-outline-variant/20 relative group flex items-center">
              <span className="text-on-surface-variant font-medium ml-1 mr-1">€</span>
              <input 
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                className="w-full bg-transparent text-on-surface-variant font-medium outline-none focus:ring-2 focus:ring-primary/40 rounded px-1"
              />
              <button 
                onClick={() => handleCopy(priceText, 'price')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-2.5 rounded-xl hover:bg-primary/10 transition-colors active:scale-95"
                title="Copia Prezzo"
              >
                {copiedPrice ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Inventory List */}
      <h3 className="text-xl font-black font-headline mb-6 text-on-surface px-2">Altri Oggetti</h3>
      <div className="space-y-4">
        {/* Item 1 */}
        <div className="bg-surface-container-lowest p-3 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-low transition-colors shadow-sm">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" 
              alt="Sneakers" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-on-surface">Sneakers Nike Air Max</h4>
            <p className="text-xs text-on-surface-variant">Pubblicato 2 giorni fa</p>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Item 2 */}
        <div className="bg-surface-container-lowest p-3 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-low transition-colors shadow-sm">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" 
              alt="Watch" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-on-surface">Orologio Minimalist Silver</h4>
            <p className="text-xs text-on-surface-variant">Bozza salvata</p>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Item 3 */}
        <div className="bg-surface-container-lowest p-3 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-low transition-colors shadow-sm border-2 border-primary-container/20">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80" 
              alt="Borsa" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-on-surface">Borsa in Pelle Artigianale</h4>
            <p className="text-xs text-primary font-bold">Ottimizzazione in corso...</p>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
