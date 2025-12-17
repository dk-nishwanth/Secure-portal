import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { TwoFactorAuth } from "./components/TwoFactorAuth";
import { Dashboard } from "./components/Dashboard";

function AppContent() {
  const { role, loading, setRole } = useAuth();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [pendingRole, setPendingRole] = useState<'super-admin' | 'admin' | 'user' | null>(null);

  const handleLoginSuccess = (email: string, userRole: 'super-admin' | 'admin' | 'user') => {
    if (userRole === 'user') {
      // Regular users need 2FA
      setUserEmail(email);
      setPendingRole(userRole);
      setShowTwoFactor(true);
    } else {
      // Super admin and admin bypass 2FA for now (can be changed)
      // Role is already set in Login component
    }
  };

  const handleTwoFactorVerify = () => {
    // 2FA verified, now set the role
    if (pendingRole) {
      setRole(pendingRole);
    }
    setShowTwoFactor(false);
    setPendingRole(null);
  };

  const handleTwoFactorBack = () => {
    setShowTwoFactor(false);
    setPendingRole(null);
    setUserEmail("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (showTwoFactor) {
    return <TwoFactorAuth email={userEmail} onVerify={handleTwoFactorVerify} onBack={handleTwoFactorBack} />;
  }

  if (!role) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="dark size-full bg-[#0a0a0f] overflow-auto">
        <AppContent />
      </div>
    </AuthProvider>
  );
}
