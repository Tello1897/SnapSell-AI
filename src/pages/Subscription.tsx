import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Shield, 
  ArrowLeft, 
  CreditCard,
  Loader2,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function Subscription() {
  const navigate = useNavigate();
  const { currentUser, refreshUserData } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = async (planId: string) => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    setLoading(planId);
    
    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update plan in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        plan: planId
      });
      
      // Refresh context data
      await refreshUserData();
      
      alert(`Hai attivato con successo il piano ${planId === 'free' ? 'Free' : 'Premium'}!`);
      navigate('/account');
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Si è verificato un errore durante l'attivazione del piano. Riprova.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      description: 'Perfetto per chi vende occasionalmente.',
      features: [
        { text: '5 Scansioni IA al mese', included: true },
        { text: '1 Marketplace connesso', included: true },
        { text: 'Analisi base dell\'oggetto', included: true },
        { text: 'Multi-posting automatico', included: false },
        { text: 'Supporto prioritario', included: false },
        { text: 'Analisi prezzi avanzata', included: false },
      ],
      buttonText: 'Rimani Free',
      highlight: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? '5.99' : '4.99',
      description: 'Per i venditori seriali che vogliono il massimo.',
      features: [
        { text: 'Scansioni IA illimitate', included: true },
        { text: 'Tutti i Marketplace connessi', included: true },
        { text: 'Analisi avanzata (più dettagli)', included: true },
        { text: 'Multi-posting automatico', included: true },
        { text: 'Supporto prioritario 24/7', included: true },
        { text: 'Analisi prezzi in tempo reale', included: true },
      ],
      buttonText: 'Passa a Premium',
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest pb-20">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-surface-container-lowest/80 backdrop-blur-md z-50">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black font-headline tracking-tight">Abbonamento</h1>
      </header>

      <div className="px-6 max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Sblocca tutto il potenziale
          </div>
          <h2 className="text-4xl font-black font-headline tracking-tight leading-tight">
            Scegli il piano perfetto <br /> per le tue vendite
          </h2>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Vendi più velocemente e su più piattaforme con l'intelligenza artificiale avanzata di SnapSell.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-surface-container-low p-1 rounded-2xl flex items-center gap-1 border border-outline-variant/10">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
            >
              Mensile
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
            >
              Annuale
              <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`relative rounded-[32px] p-8 border-2 transition-all ${
                plan.highlight 
                  ? 'border-primary bg-surface-container-lowest shadow-2xl shadow-primary/10' 
                  : 'border-outline-variant/20 bg-surface-container-lowest'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Consigliato
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black font-headline mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-headline">€{plan.price}</span>
                  <span className="text-on-surface-variant text-sm font-medium">/mese</span>
                </div>
                {billingCycle === 'yearly' && plan.id === 'premium' && (
                  <p className="text-primary text-xs font-bold mt-1">
                    Pagamento annuale di €{(parseFloat(plan.price) * 12).toFixed(2)}
                  </p>
                )}
                <p className="text-on-surface-variant text-sm mt-4 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 p-0.5 rounded-full ${feature.included ? 'text-primary' : 'text-on-surface-variant/30'}`}>
                      {feature.included ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-medium ${feature.included ? 'text-on-surface' : 'text-on-surface-variant/40'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading !== null}
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  plan.highlight 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {loading === plan.id ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {plan.highlight && <Zap size={18} className="fill-current" />}
                    {plan.buttonText}
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-surface-container-low rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-surface-container-low overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-surface-container-low bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
              +2k
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-secondary mb-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-current" />)}
            </div>
            <p className="text-sm font-bold text-on-surface">Oltre 2.000 utenti vendono con SnapSell</p>
            <p className="text-xs text-on-surface-variant mt-0.5">"Ho raddoppiato le mie vendite su Vinted in un mese!" - Marco P.</p>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="py-10 space-y-6">
          <h3 className="text-xl font-black font-headline text-center">Domande Frequenti</h3>
          <div className="space-y-4">
            <details className="group bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 cursor-pointer">
              <summary className="font-bold text-sm flex justify-between items-center list-none">
                Posso disdire quando voglio?
                <ChevronRight size={18} className="transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                Certamente. Puoi annullare il tuo abbonamento in qualsiasi momento dalle impostazioni del tuo account. Continuerai ad avere accesso ai vantaggi Premium fino alla fine del periodo pagato.
              </p>
            </details>
            <details className="group bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 cursor-pointer">
              <summary className="font-bold text-sm flex justify-between items-center list-none">
                Cosa succede se supero il limite Free?
                <ChevronRight size={18} className="transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                Nel piano Free hai 5 scansioni IA gratuite ogni mese. Una volta esaurite, dovrai attendere il mese successivo o passare al piano Premium per scansioni illimitate.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
