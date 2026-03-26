import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, Loader2, KeyRound } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreError';

export function Auth() {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Inserisci la tua email per recuperare la password.');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email di recupero inviata! Controlla la tua posta (anche nello spam).');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('Nessun utente trovato con questa email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email non valida.');
      } else {
        setError('Errore nell\'invio dell\'email di recupero.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else if (authMode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update auth profile
        await updateProfile(user, { displayName: name });
        
        // Create user document in Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: name,
            createdAt: new Date().toISOString()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`);
        }
        
        navigate('/');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email già in uso.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Credenziali non valide.');
      } else if (err.code === 'auth/weak-password') {
        setError('La password deve avere almeno 6 caratteri.');
      } else {
        setError('Si è verificato un errore. Riprova.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black font-headline text-on-surface mb-2">
            {authMode === 'login' ? 'Bentornato!' : authMode === 'register' ? 'Crea un Account' : 'Recupera Password'}
          </h2>
          <p className="text-on-surface-variant">
            {authMode === 'login' 
              ? 'Accedi per gestire i tuoi annunci' 
              : authMode === 'register' 
                ? 'Registrati per iniziare a vendere' 
                : 'Ti invieremo un link per resettare la password'}
          </p>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-4 rounded-xl mb-6 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-primary/10 text-primary p-4 rounded-xl mb-6 text-sm font-medium text-center">
            {message}
          </div>
        )}

        {authMode === 'forgot' ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : 'Invia Email di Recupero'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setError('');
                setMessage('');
              }}
              className="w-full text-center text-on-surface-variant font-bold text-sm hover:underline mt-2"
            >
              Torna al Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 outline-none"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            {authMode === 'login' && (
              <div className="flex justify-end px-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('forgot');
                    setError('');
                    setMessage('');
                  }}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <KeyRound size={14} /> Password dimenticata?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : authMode === 'login' ? (
                <>
                  <LogIn size={24} /> Accedi
                </>
              ) : (
                <>
                  <UserPlus size={24} /> Registrati
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          {authMode !== 'forgot' && (
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setError('');
                setMessage('');
              }}
              className="text-primary font-bold hover:underline"
            >
              {authMode === 'login' ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
