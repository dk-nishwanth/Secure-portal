import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RoleBasedDashboard } from "./RoleBasedDashboard";
import { CompleteUserManagement } from "./CompleteUserManagement";
import { OrganizationsPage } from "./OrganizationsPage";
import { FolderManagement } from "./FolderManagement";
import { AdminModule } from "./AdminModule";
import { AccessManagement } from "./AccessManagement";
import { ActivityPage } from "./ActivityPage";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import HealthCheckPage from "./HealthCheckPage";
import { FileShareDemo } from "./FileShareDemo";
import { useAuth } from "../contexts/AuthContext";

export type ActivePage = "dashboard" | "admin" | "users" | "organizations" | "folders" | "access" | "files" | "shared" | "activity" | "profile" | "settings" | "health" | "fileshare";

export function Dashboard() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <Header 
        activePage={activePage}
        onPageChange={setActivePage}
        onNavigateToOrganizations={() => setActivePage("organizations")} 
      />
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 p-6 pl-28">
          {activePage === "dashboard" && <RoleBasedDashboard onNavigate={setActivePage} />}
          {activePage === "admin" && role === "super-admin" && <AdminModule onBack={() => setActivePage("dashboard")} />}
          {activePage === "users" && (role === "super-admin" || role === "admin") && <CompleteUserManagement />}
          {activePage === "organizations" && role === "super-admin" && <OrganizationsPage onBack={() => setActivePage("dashboard")} />}
          {activePage === "folders" && <FolderManagement onBack={() => setActivePage("dashboard")} />}
          {activePage === "access" && <AccessManagement onBack={() => setActivePage("dashboard")} />}
          {activePage === "files" && <FolderManagement onBack={() => setActivePage("dashboard")} />}
          {activePage === "shared" && <AccessManagement onBack={() => setActivePage("dashboard")} />}
          {activePage === "activity" && <ActivityPage onBack={() => setActivePage("dashboard")} />}
          {activePage === "profile" && <ProfilePage onBack={() => setActivePage("dashboard")} />}
          {activePage === "settings" && <SettingsPage onBack={() => setActivePage("dashboard")} />}
          {activePage === "health" && <HealthCheckPage />}
          {activePage === "fileshare" && <FileShareDemo />}
        </main>
      </div>
    </div>
  );
}