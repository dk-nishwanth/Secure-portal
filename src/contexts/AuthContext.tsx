import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'super-admin' | 'user' | null;

interface AuthContextType {
  name: string | null;
  role: UserRole;
  loading: boolean;
  setRole: (role: UserRole) => void;
  setName: (name: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedName = localStorage.getItem('userName');
    
    if (storedRole && storedName) {
      setRole(storedRole);
      setName(storedName);
    }
    
    setLoading(false);
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('userRole', newRole);
    } else {
      localStorage.removeItem('userRole');
    }
  };

  const handleSetName = (newName: string | null) => {
    setName(newName);
    if (newName) {
      localStorage.setItem('userName', newName);
    } else {
      localStorage.removeItem('userName');
    }
  };

  const logout = () => {
    setRole(null);
    setName(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        role,
        loading,
        setRole: handleSetRole,
        setName: handleSetName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
