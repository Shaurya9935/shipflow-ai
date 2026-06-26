"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { Github, CheckCircle2, AlertCircle, Calendar, RefreshCw, LogOut, ExternalLink } from "lucide-react";

interface GithubConnectCardProps {
  userId: string;
  installation: {
    connected: boolean;
    accountLogin: string | null;
    installedAt: string | null;
  };
}

export function GithubConnectCard({ userId, installation: initialInstallation }: GithubConnectCardProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const disconnectMutation = trpc.github.disconnect.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const appName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME || "vaskora";
  const installUrl = `https://github.com/apps/${appName}/installations/new`;

  const handleDisconnect = async () => {
    if (confirm("Are you sure you want to disconnect the GitHub App from your account? This will revoke access to all repositories.")) {
      disconnectMutation.mutate();
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="max-w-xl mx-auto w-full p-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-foreground/5 rounded-xl border border-border">
              <Github className="size-8 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                GitHub App Connection
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Link ShipFlow AI to your GitHub account to enable automatic Pull Request reviews.
              </p>
            </div>
          </div>

          <hr className="border-border" />

          {initialInstallation.connected ? (
            /* Connected state */
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-5 shrink-0" />
                <div className="text-sm font-semibold">
                  Successfully connected to GitHub!
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl border border-border text-sm">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                    Account Login
                  </span>
                  <span className="font-bold text-foreground mt-1 block">
                    @{initialInstallation.accountLogin || "Connected"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                    Connected Since
                  </span>
                  <span className="font-medium text-foreground mt-1 block flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-muted-foreground" />
                    {initialInstallation.installedAt
                      ? new Date(initialInstallation.installedAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={installUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 cursor-pointer border border-border transition-all active:scale-[0.98]"
                >
                  <ExternalLink className="size-4" />
                  Manage Repositories
                </a>
                <button
                  onClick={handleDisconnect}
                  disabled={disconnectMutation.isPending}
                  className="py-2.5 px-4 rounded-xl font-bold text-sm bg-transparent hover:bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <LogOut className="size-4" />
                  Disconnect App
                </button>
              </div>
            </div>
          ) : (
            /* Disconnected state */
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <AlertCircle className="size-5 shrink-0" />
                <div className="text-sm font-semibold">
                  GitHub App is not connected yet.
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                To start reviewing code, you must authorize our reviewer application and select the repositories you want us to monitor. You can choose all repositories or select specific ones.
              </p>

              <div className="pt-2">
                <a
                  href={installUrl}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center gap-2 cursor-pointer border border-border transition-all active:scale-[0.98]"
                >
                  <Github className="size-4" />
                  Install & Connect GitHub App
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Refresh footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Status checks update automatically</span>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className={`size-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
