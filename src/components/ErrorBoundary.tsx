import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Info } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Si è verificato un errore imprevisto.";
      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error) {
            errorMessage = parsed.error;
          }
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-surface">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-6">
            <Info size={32} />
          </div>
          <h2 className="text-2xl font-black font-headline text-on-surface mb-2">Ops! Qualcosa è andato storto</h2>
          <p className="text-on-surface-variant mb-8 max-w-md">{errorMessage}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:scale-105 transition-transform"
          >
            Torna alla Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
