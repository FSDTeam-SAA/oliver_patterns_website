import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider defaultOpen={true} className="px-8">
        <AppSidebar />

        <main className="w-full lg:ml-64">
          <div className="lg:hidden">
            <SidebarTrigger />
          </div>
          <div className="w-full mt-10 mb-20">
            <div>{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}