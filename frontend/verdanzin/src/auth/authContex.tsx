import { createContext, ReactNode, useContext, useReducer } from 'react';

// Defina as ações disponíveis para o contexto de autenticação
type Action = { type: 'LOGIN'; payload: string } | { type: 'LOGOUT' };

// Estado inicial
type State = {
  user: string | null;
};

// Contexto de autenticação
type AuthContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer para manipular as ações
const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, user: action.payload };
  case 'LOGOUT':
    return { ...state, user: null };
  default:
    return state;
  }
};

// Provedor do contexto
// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Gancho personalizado para usar o contexto de autenticação

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
