import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#EDF4EA] flex items-center justify-center p-4 text-[#0A160F] font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#CCD8C4] shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF5E6] text-[#1B4D24] flex items-center justify-center mx-auto shadow-xs">
              <AlertCircle className="w-8 h-8 text-[#EB651A]" />
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0A160F]">
              {this.props.fallbackTitle || 'Ajustando Carregamento da Clínica'}
            </h2>
            <p className="text-xs sm:text-sm text-[#566D5D] leading-relaxed">
              Ocorreu uma pequena instabilidade de renderização no navegador. Clique no botão abaixo para restaurar a página com segurança.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#1B4D24] hover:bg-[#153e1d] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Atualizar Página</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
