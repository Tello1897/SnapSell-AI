import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreError';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
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
            {isLogin ? 'Bentornato!' : 'Crea un Account'}
          </h2>
          <p className="text-on-surface-variant">
            {isLogin ? 'Accedi per gestire i tuoi annunci' : 'Registrati per iniziare a vendere'}
          </p>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-4 rounded-xl mb-6 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : isLogin ? (
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

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
          </button>
        </div>
      </div>
    </div>
  );
}
