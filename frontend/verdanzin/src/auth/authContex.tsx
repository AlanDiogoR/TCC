import { createContext, ReactNode, useContext, useReducer } from 'react';

type Action = { type: 'LOGIN'; payload: { user: string; token: string } } | { type: 'LOGOUT' };

type State = {
  user: string | null;
  token: string | null;
};

type AuthContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, user: action.payload.user, token: action.payload.token };
  case 'LOGOUT':
    return { ...state, user: null, token: null };
  default:
    return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, token: null });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
