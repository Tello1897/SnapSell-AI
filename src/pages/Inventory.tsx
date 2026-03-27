import { Filter, Copy, MoreVertical, Check, ExternalLink, Loader2, X, AlertCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface InventoryItem {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'processing' | 'sold';
  statusText: string;
  image: string;
  price: string;
  date: string;
}

export function Inventory() {
  const location = useLocation();
  const passedData = location.state?.listingData;
  const passedImage = location.state?.image;

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      title: 'Sneakers Nike Air Max',
      status: 'published',
      statusText: 'Pubblicato 2 giorni fa',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      price: '85.00',
      date: '2026-03-25'
    },
    {
      id: '2',
      title: 'Orologio Minimalist Silver',
      status: 'draft',
      statusText: 'Bozza salvata',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      price: '45.00',
      date: '2026-03-26'
    },
    {
      id: '3',
      title: 'Borsa in Pelle Artigianale',
      status: 'processing',
      statusText: 'Ottimizzazione in corso...',
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80',
      price: '120.00',
      date: '2026-03-27'
    },
    {
      id: '4',
      title: 'Vintage Camera 35mm',
      status: 'sold',
      statusText: 'Venduto su Vinted',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
      price: '65.00',
      date: '2026-03-20'
    }
  ]);

  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedPrice, setCopiedPrice] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tutti');
  const [activeTab, setActiveTab] = useState<'Vinted' | 'eBay' | 'Wallapop' | 'Subito'>('Vinted');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemAddedRef = useRef(false);

  // Publishing State
  const [isPublishingModalOpen, setIsPublishingModalOpen] = useState(false);
  const [publishingStatus, setPublishingStatus] = useState<'idle' | 'selecting' | 'publishing' | 'success' | 'error'>('idle');
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(['Vinted']);
  const [publishingProgress, setPublishingProgress] = useState(0);
  const [publishingStep, setPublishingStep] = useState('');

  const [titleText, setTitleText] = useState(passedData?.title || "Giacca in denim Levi's Vintage 90s - Ottime Condizioni");
  
  const defaultDescriptions = {
    vinted_wallapop: passedData?.descriptions?.vinted_wallapop || `Bellissima giacca in denim vintage anni '90. Taglio classico, lavaggio medio originale. Il tessuto è robusto e di alta qualità, tipico della produzione d'epoca. 

✨ Condizioni: Eccellenti, nessun segno di usura.
📏 Taglia: L (Veste comoda)
🎨 Colore: Denim Blu Medio

Perfetta per un look urban o streetwear. Spedizione rapida! #vintage #denim #levis #90s #streetwear`,
    ebay_subito: passedData?.descriptions?.ebay_subito || `Giacca in denim Levi's originale anni '90.
    
Dettagli dell'oggetto:
- Condizioni: Usato in ottime condizioni, senza strappi o macchie.
- Taglia: L
- Materiale: 100% Cotone
- Stile: Vintage/Retrò

Ideale per collezionisti o amanti del genere vintage. Per ulteriori foto o misure precise, non esitate a contattarmi. Spedizione tracciata in 24/48h.`
  };

  const [descText, setDescText] = useState(defaultDescriptions.vinted_wallapop);
  const [priceText, setPriceText] = useState(passedData?.pricing?.avg_price?.toString() || "22.00");

  useEffect(() => {
    if (passedData && passedImage && !itemAddedRef.current) {
      itemAddedRef.current = true;
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        title: passedData.title || "Nuovo Oggetto",
        status: 'draft',
        statusText: 'Bozza appena creata',
        image: passedImage,
        price: passedData.pricing?.avg_price?.toString() || "0.00",
        date: new Date().toISOString().split('T')[0]
      };
      setItems(prev => [newItem, ...prev]);

      setTitleText(passedData.title || "");
      setPriceText(passedData.pricing?.avg_price?.toString() || "0.00");
      if (activeTab === 'Vinted' || activeTab === 'Wallapop') {
        setDescText(passedData.descriptions?.vinted_wallapop || "");
      } else {
        setDescText(passedData.descriptions?.ebay_subito || "");
      }
    }
  }, [passedData, passedImage, activeTab]);

  const handleTabChange = (tab: 'Vinted' | 'eBay' | 'Wallapop' | 'Subito') => {
    setActiveTab(tab);
    if (tab === 'Vinted' || tab === 'Wallapop') {
      setDescText(passedData?.descriptions?.vinted_wallapop || defaultDescriptions.vinted_wallapop);
    } else {
      setDescText(passedData?.descriptions?.ebay_subito || defaultDescriptions.ebay_subito);
    }
  };

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

  const startPublishing = () => {
    setPublishingStatus('publishing');
    setPublishingProgress(0);
    
    const steps = [
      "Preparazione immagini...",
      "Ottimizzazione metadati...",
      "Connessione ai marketplace...",
      "Invio bozze...",
      "Finalizzazione annuncio..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setPublishingStep(steps[currentStep]);
        setPublishingProgress((currentStep + 1) * 20);
        currentStep++;
      } else {
        clearInterval(interval);
        setPublishingStatus('success');
      }
    }, 1000);
  };

  const getMarketplaceLink = (name: string) => {
    switch(name) {
      case 'Vinted': return 'https://www.vinted.it/items/new';
      case 'eBay': return 'https://www.ebay.it/sl/sell';
      case 'Wallapop': return 'https://it.wallapop.com/item/upload';
      case 'Subito': return 'https://www.subito.it/inserisci.htm';
      default: return '#';
    }
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === 'Tutti') return true;
    if (activeFilter === 'Pubblicati') return item.status === 'published';
    if (activeFilter === 'Bozze') return item.status === 'draft';
    if (activeFilter === 'Venduti') return item.status === 'sold';
    if (activeFilter === 'In elaborazione') return item.status === 'processing';
    return true;
  });

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setOpenMenuId(null);
  };

  const handleMarkAsSold = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'sold', statusText: 'Venduto ora' } : item
    ));
    setOpenMenuId(null);
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
              {['Tutti', 'Pubblicati', 'Bozze', 'Venduti', 'In elaborazione'].map((filter) => (
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
              src={passedImage || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"} 
              alt={titleText} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <span className="bg-primary-container/30 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">Selezione Attiva</span>
            <h3 className="text-xl font-bold font-headline mb-1">{titleText}</h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">Analisi AI completata. Ottimizzato per 4 piattaforme diverse.</p>
          </div>
          <button 
            onClick={() => {
              setIsPublishingModalOpen(true);
              setPublishingStatus('selecting');
            }}
            className="bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Pubblica
          </button>
        </div>
      </div>

      {/* Publishing Modal */}
      {isPublishingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPublishingStatus('idle') || setIsPublishingModalOpen(false)}></div>
          <div className="bg-surface-container-lowest w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black font-headline">Pubblica Annuncio</h3>
                  <p className="text-on-surface-variant text-sm">Seleziona dove vuoi vendere</p>
                </div>
                <button 
                  onClick={() => setIsPublishingModalOpen(false)}
                  className="p-2 rounded-full bg-surface-container-low text-on-surface-variant"
                >
                  <X size={20} />
                </button>
              </div>

              {publishingStatus === 'selecting' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {['Vinted', 'eBay', 'Wallapop', 'Subito'].map((mp) => (
                      <label 
                        key={mp}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          selectedMarketplaces.includes(mp) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-outline-variant/20 hover:border-outline-variant'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                            mp === 'Vinted' ? 'bg-[#09B1BA]' : 
                            mp === 'eBay' ? 'bg-[#E53238]' : 
                            mp === 'Wallapop' ? 'bg-[#13C1A4]' : 'bg-[#FF4700]'
                          }`}>
                            {mp[0]}
                          </div>
                          <span className="font-bold">{mp}</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={selectedMarketplaces.includes(mp)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMarketplaces([...selectedMarketplaces, mp]);
                            } else {
                              setSelectedMarketplaces(selectedMarketplaces.filter(m => m !== mp));
                            }
                          }}
                          className="w-6 h-6 rounded-lg border-2 border-outline-variant text-primary focus:ring-primary"
                        />
                      </label>
                    ))}
                  </div>

                  <button 
                    disabled={selectedMarketplaces.length === 0}
                    onClick={startPublishing}
                    className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    Conferma e Pubblica
                  </button>
                </div>
              )}

              {publishingStatus === 'publishing' && (
                <div className="py-8 text-center space-y-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div 
                      className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"
                      style={{ clipPath: `conic-gradient(from 0deg, transparent 0%, transparent ${100 - publishingProgress}%, black ${100 - publishingProgress}%, black 100%)` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-primary">{publishingProgress}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{publishingStep}</h4>
                    <p className="text-on-surface-variant text-sm">Non chiudere l'app...</p>
                  </div>
                </div>
              )}

              {publishingStatus === 'success' && (
                <div className="py-4 space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-black mb-2">Annuncio Pronto!</h4>
                    <p className="text-on-surface-variant text-sm">Abbiamo preparato le bozze sui marketplace selezionati.</p>
                  </div>

                  <div className="space-y-3">
                    {selectedMarketplaces.map(mp => (
                      <a 
                        key={mp}
                        href={getMarketplaceLink(mp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold">{mp}</span>
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Bozza Pronta</span>
                        </div>
                        <ExternalLink size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>

                  <button 
                    onClick={() => setIsPublishingModalOpen(false)}
                    className="w-full py-4 rounded-2xl bg-surface-container-high text-on-surface font-bold active:scale-95 transition-all"
                  >
                    Chiudi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tabs Container */}
      <div>
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
          {(['Vinted', 'eBay', 'Wallapop', 'Subito'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md ${
                activeTab === tab 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Optimized Content Area */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Descrizione AI {activeTab}</span>
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
      <div className="flex items-center justify-between px-2 mb-6">
        <h3 className="text-xl font-black font-headline text-on-surface">Altri Oggetti</h3>
        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          {filteredItems.length} {filteredItems.length === 1 ? 'oggetto' : 'oggetti'}
        </span>
      </div>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-3xl border-2 border-dashed border-outline-variant/30">
            <p className="text-on-surface-variant font-medium">Nessun oggetto trovato in questa categoria.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-surface-container-lowest p-3 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-low transition-all shadow-sm border border-outline-variant/5">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-bold text-on-surface text-sm line-clamp-1">{item.title}</h4>
                  {item.status === 'sold' && (
                    <span className="bg-secondary/10 text-secondary text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded">VENDUTO</span>
                  )}
                </div>
                <p className={`text-[10px] font-bold ${
                  item.status === 'published' ? 'text-primary' : 
                  item.status === 'processing' ? 'text-tertiary animate-pulse' : 
                  item.status === 'sold' ? 'text-on-surface-variant/50' : 'text-on-surface-variant'
                }`}>
                  {item.statusText}
                </p>
                <p className="text-xs font-black text-on-surface mt-1">€{item.price}</p>
              </div>
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === item.id ? null : item.id);
                  }}
                  className={`p-2 transition-colors rounded-full hover:bg-surface-container ${openMenuId === item.id ? 'text-primary bg-surface-container' : 'text-on-surface-variant'}`}
                >
                  <MoreVertical size={20} />
                </button>
                
                {/* Dropdown Menu */}
                {openMenuId === item.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>
                    <div className="absolute right-0 top-full mt-1 w-40 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 transition-all z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button 
                        onClick={() => {
                          alert(`Modifica ${item.title}`);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-surface-container-low flex items-center gap-2"
                      >
                        Modifica
                      </button>
                      {item.status !== 'sold' && (
                        <button 
                          onClick={() => handleMarkAsSold(item.id)}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-surface-container-low flex items-center gap-2 text-secondary"
                        >
                          Segna come Venduto
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-surface-container-low flex items-center gap-2 text-error"
                      >
                        Elimina
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
