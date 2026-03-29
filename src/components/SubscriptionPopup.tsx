import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Check, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, isAuthReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthReady && userData && userData.plan === 'free') {
      // Show popup after a short delay on login or periodically
      const lastShown = localStorage.getItem('subscription_popup_last_shown');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem('subscription_popup_last_shown', now.toString());
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthReady, userData]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="relative">
            {/* Header Image/Gradient */}
            <div className="h-48 bg-primary relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90"></div>
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-white/10 rounded-full blur-xl"
                    style={{
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                    }}
                  ></div>
                ))}
              </div>
              <div className="relative z-10 text-center text-on-primary p-6">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                  <Sparkles size={32} className="text-on-primary" />
                </div>
                <h3 className="text-2xl font-black font-headline">Passa a SnapSell Premium</h3>
                <p className="text-sm opacity-80 font-medium">Vendi di più, più velocemente.</p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Scansioni IA Illimitate</h4>
                    <p className="text-sm text-on-surface-variant">Non fermarti mai. Analizza tutti i prodotti che vuoi senza limiti mensili.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Check size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Tutti i Marketplace</h4>
                    <p className="text-sm text-on-surface-variant">Pubblica su Vinted, Wallapop, eBay e altri contemporaneamente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-tertiary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Analisi Prezzi Avanzata</h4>
                    <p className="text-sm text-on-surface-variant">Ottieni suggerimenti di prezzo basati sui dati reali del mercato.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/subscription');
                  }}
                  className="w-full py-4 rounded-2xl bg-primary text-on-primary font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  Scopri i Piani <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-2xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors"
                >
                  Forse più tardi
                </button>
              </div>
              
              <p className="text-[10px] text-center text-on-surface-variant/60 mt-6 uppercase tracking-widest font-bold">
                A partire da soli €4.99/mese
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
