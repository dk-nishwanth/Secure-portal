import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function AppContent() {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!role) {
    return <Login />;
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
