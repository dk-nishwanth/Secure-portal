import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RoleBasedDashboard } from "./RoleBasedDashboard";
import { CompleteFileManager } from "./CompleteFileManager";
import { CompleteUserManagement } from "./CompleteUserManagement";
import { useAuth } from "../contexts/AuthContext";

export type ActivePage = "dashboard" | "files" | "users";

export function Dashboard() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <Header />
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 p-6 pl-28">
          {activePage === "dashboard" && <RoleBasedDashboard />}
          {activePage === "files" && <CompleteFileManager />}
          {activePage === "users" && role === "super-admin" && <CompleteUserManagement />}
        </main>
      </div>
    </div>
  );
}