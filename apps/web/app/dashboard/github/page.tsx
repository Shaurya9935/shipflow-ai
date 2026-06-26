import { requireAuth } from "~/lib/auth-actions";
import { DashboardHeader } from "~/components/dashboard-header";
import { GithubConnectCard } from "~/components/github-connect-card";
import { getInstallationStatus } from "@repo/services/github/installation";
import type { Metadata } from "next";
import React from "react";
import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"

export const metadata: Metadata = {
  title: "GitHub App · Dashboard",
};

export default async function DashboardGithubPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  return (
     <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="GitHub App"
        description="Install or disconnect the reviewer app on your GitHub account."
      />
      <div className="p-6 md:p-8">
        <GithubConnectCard userId={session.user.id} installation={installation} />
      </div>
    </div>
     </SidebarInset>
    </SidebarProvider>
  );
}