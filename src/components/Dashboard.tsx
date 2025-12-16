import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RoleBasedDashboard } from "./RoleBasedDashboard";
import { CompleteUserManagement } from "./CompleteUserManagement";
import { OrganizationsPage } from "./OrganizationsPage";
import { FolderManagement } from "./FolderManagement";
import { AdminModule } from "./AdminModule";
import { AccessManagement } from "./AccessManagement";
import { useAuth } from "../contexts/AuthContext";

export type ActivePage = "dashboard" | "admin" | "users" | "organizations" | "folders" | "access";

export function Dashboard() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <Header onNavigateToOrganizations={() => setActivePage("organizations")} />
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 p-6 pl-28">
          {activePage === "dashboard" && <RoleBasedDashboard />}
          {activePage === "admin" && role === "super-admin" && <AdminModule onBack={() => setActivePage("dashboard")} />}
          {activePage === "users" && role === "super-admin" && <CompleteUserManagement />}
          {activePage === "organizations" && <OrganizationsPage onBack={() => setActivePage("dashboard")} />}
          {activePage === "folders" && <FolderManagement onBack={() => setActivePage("dashboard")} />}
          {activePage === "access" && <AccessManagement onBack={() => setActivePage("dashboard")} />}
        </main>
      </div>
    </div>
  );
}