import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNav } from "@/modules/dashboard/ui/components/DashboardNav";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/DashboardSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <main className=" flex flex-col h-screen w-full overflow-hidden">
          <DashboardNav />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
