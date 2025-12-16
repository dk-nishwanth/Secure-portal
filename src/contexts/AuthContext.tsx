import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'super-admin' | 'user' | null;

interface AuthContextType {
  name: string | null;
  role: UserRole;
  loading: boolean;
  currentOrgId: string | null;
  currentOrgName: string | null;
  setRole: (role: UserRole) => void;
  setName: (name: string | null) => void;
  setCurrentOrg: (orgId: string, orgName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
  const [currentOrgName, setCurrentOrgName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedName = localStorage.getItem('userName');
    const storedOrgId = localStorage.getItem('currentOrgId');
    const storedOrgName = localStorage.getItem('currentOrgName');
    
    if (storedRole && storedName) {
      setRole(storedRole);
      setName(storedName);
    }
    
    if (storedOrgId && storedOrgName) {
      setCurrentOrgId(storedOrgId);
      setCurrentOrgName(storedOrgName);
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

  const setCurrentOrg = (orgId: string, orgName: string) => {
    setCurrentOrgId(orgId);
    setCurrentOrgName(orgName);
    localStorage.setItem('currentOrgId', orgId);
    localStorage.setItem('currentOrgName', orgName);
  };

  const logout = () => {
    setRole(null);
    setName(null);
    setCurrentOrgId(null);
    setCurrentOrgName(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('currentOrgId');
    localStorage.removeItem('currentOrgName');
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        role,
        loading,
        currentOrgId,
        currentOrgName,
        setRole: handleSetRole,
        setName: handleSetName,
        setCurrentOrg,
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
