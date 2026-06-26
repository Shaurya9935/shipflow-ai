"use client";

import { useTheme } from "next-themes";
import { DashboardHeader } from "~/components/dashboard-header";
import { authClient } from "~/lib/auth-client";
import { User, Mail, Shield, Monitor, Moon, Sun, Laptop, Github, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function DashboardSettingsPage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (isPending) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-20 gap-3 text-muted-foreground bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading settings...</span>
      </div>
    );
  }

  const user = sessionData?.user;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-background text-foreground">
      <DashboardHeader
        title="Settings"
        description="Manage your profile settings, app preferences, and view system status."
      />

      <div className="max-w-4xl mx-auto w-full p-6 md:p-8 space-y-8">
        {/* Profile Card */}
        {user && (
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <User className="size-4" />
              <span>User Profile</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {user.name?.charAt(0) || "D"}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{user.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Mail className="size-3.5" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Shield className="size-3.5" />
                Active Developer Session
              </div>
            </div>
          </div>
        )}

        {/* Theme Settings Card */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Monitor className="size-4" />
            <span>Theme Preferences</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose your preferred layout interface theme. Switch between light and dark modes to check out the customized color palettes.
            </p>

            {mounted && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "Light Mode", icon: Sun },
                  { id: "dark", label: "Dark Mode", icon: Moon },
                  { id: "system", label: "System Default", icon: Laptop },
                ].map((t) => {
                  const isActive = theme === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-primary/10 border-primary text-primary shadow-sm"
                          : "bg-muted/20 border-transparent hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-5 mb-2" />
                      <span className="text-xs font-semibold">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Project Details Card */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Github className="size-4" />
            <span>App Metadata</span>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>
              ShipFlow AI automates pull request reviews using advanced AI analysis models.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <span className="font-semibold text-foreground">Next.js Framework:</span> v16.1.0
              </div>
              <div>
                <span className="font-semibold text-foreground">Tailwind CSS:</span> v4.1.18
              </div>
              <div>
                <span className="font-semibold text-foreground">Database:</span> PostgreSQL (Drizzle)
              </div>
              <div>
                <span className="font-semibold text-foreground">Environment:</span> Local Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}