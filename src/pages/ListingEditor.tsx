import { Sparkles, Pencil, ChevronDown, Info, Ruler, Palette, Tag, Wand2, Loader2, Check } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface ListingData {
  title: string;
  descriptions: {
    vinted_wallapop: string;
    ebay_subito: string;
  };
  detected_info: {
    brand: string;
    size: string;
    material: string;
  };
  search_string: string;
  condition: string;
  pricing: {
    currency: string;
    avg_price: number;
    suggested_range: {
      min: number;
      max: number;
    };
  };
}

export function ListingEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const capturedImage = location.state?.image as string | undefined;
  
  const [isAnalyzing, setIsAnalyzing] = useState(!!capturedImage);
  const [listingData, setListingData] = useState<ListingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Editable fields state
  const [title, setTitle] = useState("");
  const [descriptionVinted, setDescriptionVinted] = useState("");
  const [descriptionEbay, setDescriptionEbay] = useState("");
  const [activeTab, setActiveTab] = useState<'vinted' | 'ebay'>('vinted');
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const analysisSteps = [
    "Scansione visiva dell'oggetto...",
    "Identificazione brand ed etichetta...",
    "Analisi dei materiali e della taglia...",
    "Valutazione del prezzo di mercato...",
    "Generazione descrizioni ottimizzate..."
  ];

  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => Math.min(prev + 1, analysisSteps.length - 1));
    }, 1500); // Change step every 1.5 seconds

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  useEffect(() => {
    async function analyzeImage() {
      if (!capturedImage) return;

      try {
        // We need to strip the data:image/jpeg;base64, part
        const base64Data = capturedImage.split(',')[1];
        const mimeType = capturedImage.split(';')[0].split(':')[1];

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: `You are a precision-focused second-hand market assistant and an SEO-specialized e-commerce copywriter. Your core mission is accuracy, consistency, and user empowerment. You analyze images of items to generate highly optimized listing data for platforms like Vinted, Wallapop, eBay, and Subito.

CRITICAL INSTRUCTION: You must respond ONLY with a valid JSON object. Do not include markdown formatting like \`\`\`json or any conversational text before or after the JSON. The output language for all string values inside the JSON MUST BE ITALIAN.

When a user provides an image, follow this strict analytical hierarchy to generate data:
1.  **READ THE LABEL FIRST (Absolute Priority):** Meticulously analyze the image to identify and extract any visible text on tags, labels, or brand marks. THIS TEXT TAKES PRECISION OVER SHAPE ANALYSIS. If the label says "Marella" on a pair of pants, the brand is "Marella", even if the AI is confused by the shape. Identify brand, size, materials, and any style names written on the tag.
2.  **Analyze Shape and Context (Fallback):** If no text is readable, analyze the garment's shape, color, and texture to infer the category (e.g., jacket, dress, sneakers) and style.
3.  **Cross-Reference and Estimate:** Use combined data to estimate a precise market price range for the second-hand market in Italy/Europe.

Generate an Italian listing. Respond ONLY with a valid JSON object. No markdown.`,
              },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                descriptions: {
                  type: Type.OBJECT,
                  properties: {
                    vinted_wallapop: { type: Type.STRING },
                    ebay_subito: { type: Type.STRING }
                  }
                },
                detected_info: {
                  type: Type.OBJECT,
                  properties: {
                    brand: { type: Type.STRING },
                    size: { type: Type.STRING },
                    material: { type: Type.STRING }
                  }
                },
                search_string: { type: Type.STRING },
                condition: { type: Type.STRING },
                pricing: {
                  type: Type.OBJECT,
                  properties: {
                    currency: { type: Type.STRING },
                    avg_price: { type: Type.NUMBER },
                    suggested_range: {
                      type: Type.OBJECT,
                      properties: {
                        min: { type: Type.NUMBER },
                        max: { type: Type.NUMBER }
                      }
                    }
                  }
                },
                direct_search_links: {
                  type: Type.OBJECT,
                  properties: {
                    vinted: { type: Type.STRING },
                    ebay: { type: Type.STRING },
                    wallapop: { type: Type.STRING }
                  }
                }
              }
            }
          }
        });

        if (response.text) {
          const data = JSON.parse(response.text) as ListingData;
          setListingData(data);
          setTitle(data.title);
          setDescriptionVinted(data.descriptions.vinted_wallapop);
          setDescriptionEbay(data.descriptions.ebay_subito);
          setCondition(data.condition);
          setPrice(data.pricing.avg_price.toFixed(2));
          setPriceMin(data.pricing.suggested_range.min.toFixed(2));
          setPriceMax(data.pricing.suggested_range.max.toFixed(2));
          setSize(data.detected_info.size);
          setBrand(data.detected_info.brand);
          setMaterial(data.detected_info.material);
        }
      } catch (err) {
        console.error("Error analyzing image:", err);
        setError("Si è verificato un errore durante l'analisi dell'immagine.");
      } finally {
        setIsAnalyzing(false);
      }
    }

    analyzeImage();
  }, [capturedImage]);

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-spin border-t-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-primary animate-pulse" size={32} />
          </div>
        </div>
        
        <div className="w-full max-w-xs space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black font-headline text-on-surface">Analisi in corso</h2>
            <p className="text-primary font-bold text-sm h-5 transition-all">{analysisSteps[currentStepIndex]}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((currentStepIndex + 1) / analysisSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step List */}
          <div className="space-y-3">
            {analysisSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-3 text-sm transition-colors duration-300 ${index < currentStepIndex ? 'text-primary' : index === currentStepIndex ? 'text-on-surface font-bold' : 'text-on-surface-variant/50'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${index < currentStepIndex ? 'border-primary bg-primary text-on-primary' : index === currentStepIndex ? 'border-primary text-primary' : 'border-on-surface-variant/30'}`}>
                  {index < currentStepIndex ? <Check size={12} strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error">
          <Info size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black font-headline text-on-surface">Ops! Qualcosa è andato storto</h2>
          <p className="text-on-surface-variant">{error}</p>
        </div>
        <Link 
          to="/scan"
          className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm"
        >
          Riprova
        </Link>
      </div>
    );
  }

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
            src={capturedImage || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"} 
            alt="Scanned Item" 
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 transition-all outline-none"
            />
            <button className="absolute right-4 text-primary hover:opacity-70 transition-opacity">
              <Pencil size={20} className="fill-current" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Descrizione</label>
            <div className="flex gap-2 bg-surface-container-highest rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('vinted')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'vinted' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
              >
                Vinted/Wallapop
              </button>
              <button 
                onClick={() => setActiveTab('ebay')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'ebay' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
              >
                eBay/Subito
              </button>
            </div>
          </div>
          <div className="relative flex items-start">
            <textarea 
              value={activeTab === 'vinted' ? descriptionVinted : descriptionEbay}
              onChange={(e) => activeTab === 'vinted' ? setDescriptionVinted(e.target.value) : setDescriptionEbay(e.target.value)}
              rows={6}
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
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 appearance-none outline-none"
              >
                <option value="Nuovo con cartellino">Nuovo con cartellino</option>
                <option value="Ottimo">Ottimo</option>
                <option value="Buono">Buono</option>
                <option value="Usato">Usato</option>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-primary font-bold"
              />
              <Info size={16} className="absolute right-4 fill-current" />
            </div>
            {(priceMin || priceMax) && (
              <p className="text-[10px] text-on-surface-variant text-center mt-1 font-medium">
                Range stimato: €{priceMin} - €{priceMax}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Metadata Bento Grid */}
      <section className="mt-8 grid grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Ruler size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Taglia</span>
          <span className="text-sm font-bold truncate w-full">{size}</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Tag size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Brand</span>
          <span className="text-sm font-bold truncate w-full">{brand}</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Palette size={24} className="text-outline mb-1" />
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Materiale</span>
          <span className="text-sm font-bold truncate w-full">{material}</span>
        </div>
      </section>

      {/* Primary Action */}
      <div className="fixed bottom-28 left-0 w-full px-6 z-40">
        <button 
          onClick={() => navigate('/inventory', { 
            state: { 
              listingData, 
              image: capturedImage 
            } 
          })}
          className="w-full py-5 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Wand2 size={24} className="fill-current" />
          Genera Annuncio
        </button>
      </div>
    </div>
  );
}
