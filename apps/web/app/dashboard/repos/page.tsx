import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "~/lib/auth-actions";
import { DashboardHeader } from "~/components/dashboard-header";
import { RepoList } from "~/components/repo-list";
import { getInstallationStatus } from "@repo/services/github/installation";
import { DASHBOARD_ROUTES } from "@repo/trpc/server";
import { Button } from "~/components/ui/button";
import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Repositories · Dashboard",
};

function ReposNotConnected() {
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
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 max-w-md mx-auto text-center">
      <p className="text-sm text-muted-foreground leading-relaxed">
        To start monitoring repositories and receiving automated reviews, please install and connect the GitHub App to your account first.
      </p>
      <Button asChild className="rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all border border-border">
        <Link href={DASHBOARD_ROUTES.github}>
          Go to GitHub App settings
        </Link>
      </Button>
    </div>
     </SidebarInset>
    </SidebarProvider>
  );
}

export default async function DashboardReposPage() {
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
            title="Repositories"
            description="All public and private repositories accessible to the GitHub App."
          />
          {installation.connected ? (
            <RepoList />
          ) : (
            <ReposNotConnected />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
