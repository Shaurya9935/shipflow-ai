import type { Metadata } from "next";
import React from "react";
import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"
import { FeatureRequestView } from "~/components/feature-request-view"
import { requireAuth } from "~/lib/auth-actions"

export const metadata: Metadata = {
  title: "Feature Requests · Dashboard",
};

export default async function FeatureRequestsPage() {
  await requireAuth();

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
        <FeatureRequestView />
      </SidebarInset>
    </SidebarProvider>
  );
}
