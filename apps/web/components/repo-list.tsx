"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";
import { FolderGit2, Search, ExternalLink, Shield, ShieldAlert, Loader2, AlertCircle } from "lucide-react";

export function RepoList() {
  const { data, isLoading, error } = trpc.github.getRepositories.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-sm font-medium">Fetching accessible repositories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto w-full p-6">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Failed to load repositories</h4>
            <p className="text-xs mt-1 text-destructive/80 leading-relaxed">
              {error.message || "An unexpected error occurred while communicating with GitHub API."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const repos = data?.repos || [];
  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
      {/* Search and count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-xs font-semibold text-muted-foreground bg-muted/40 border border-border py-2 px-3 rounded-lg flex items-center justify-center">
          {filteredRepos.length} {filteredRepos.length === 1 ? "repository" : "repositories"} accessible
        </div>
      </div>

      {/* Repo list grid */}
      {filteredRepos.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/20">
          <FolderGit2 className="size-10 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-foreground">No repositories found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto leading-relaxed">
            {searchQuery ? "No matches found for your search query." : "You haven't selected any repositories for ShipFlow AI to monitor."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="size-4.5 text-primary shrink-0" />
                  <h3 className="font-bold text-sm truncate text-foreground group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {repo.fullName}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground border border-border">
                  {repo.private ? (
                    <>
                      <ShieldAlert className="size-3 text-amber-500" /> Private
                    </>
                  ) : (
                    <>
                      <Shield className="size-3 text-emerald-500" /> Public
                    </>
                  )}
                </span>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
