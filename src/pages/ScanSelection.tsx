import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export function ScanSelection() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // In a real app, you would process the file here or pass it along
      navigate('/listing');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center pt-12 pb-32">
      <div className="max-w-md w-full text-center space-y-12">
        {/* Question Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary-container/20 rounded-full mb-2">
            <Sparkles className="text-primary fill-current" size={32} />
          </div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface leading-tight">
            Scatta foto o scegli dalla galleria?
          </h2>
          <p className="text-on-surface-variant font-medium opacity-80">
            L'IA analizzerà l'oggetto per te in pochi secondi.
          </p>
        </div>

        {/* Action Buttons - Bento Style Layout */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {/* Camera Button */}
          <Link 
            to="/camera-scan"
            className="group relative flex flex-col items-center justify-center bg-surface-container-lowest p-10 rounded-2xl shadow-[0_4px_24px_rgba(61,37,73,0.04)] hover:shadow-lg transition-all duration-300 border-none active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-6 text-on-primary-container shadow-lg shadow-primary/10 transition-transform group-hover:scale-110">
              <Camera size={40} className="fill-current" />
            </div>
            <span className="text-xl font-headline font-bold tracking-tight text-on-surface">Fotocamera</span>
            <span className="text-sm text-on-surface-variant mt-2 opacity-60">Scatta una nuova foto</span>
          </Link>

          {/* Gallery Button */}
          <button 
            onClick={handleGalleryClick}
            className="group relative flex flex-col items-center justify-center bg-surface-container-lowest p-10 rounded-2xl shadow-[0_4px_24px_rgba(61,37,73,0.04)] hover:shadow-lg transition-all duration-300 border-none active:scale-[0.98] overflow-hidden w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-on-secondary-container shadow-lg shadow-secondary/10 transition-transform group-hover:scale-110">
              <ImageIcon size={40} className="fill-current" />
            </div>
            <span className="text-xl font-headline font-bold tracking-tight text-on-surface">Galleria</span>
            <span className="text-sm text-on-surface-variant mt-2 opacity-60">Scegli file esistenti</span>
          </button>
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* AI Pulse Tip */}
        <div className="flex items-center justify-center gap-3 py-4 px-6 bg-surface-container-low rounded-full self-center inline-flex">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <p className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-widest">IA Pronta all'analisi</p>
        </div>
      </div>

      {/* Ambient background texture */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-primary-container/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-64 h-64 bg-secondary-container/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
