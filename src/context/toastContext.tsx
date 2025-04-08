import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type Toast = {
  type: 'success' | 'warning' | 'error';
  message: string;
};

type ToastContextType = {
  setToast: (toast: Toast | null) => void;
};

type ToastProviderProps = {
  children: ReactNode;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      alert(`${toast.type.toUpperCase()}: ${toast.message}`);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
    </ToastContext.Provider>
  );
};
