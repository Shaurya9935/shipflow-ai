import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { getServerSession } from "~/lib/auth-actions"
import { getInstallationStatus } from "@repo/services/github/installation"
import Link from "next/link"
import { Github } from "lucide-react"

export async function SiteHeader() {
  const session = await getServerSession();
  const connected = session
    ? (await getInstallationStatus(session.user.id)).connected
    : false;

  const appName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME || "vaskora";
  const installUrl = `https://github.com/apps/${appName}/installations/new`;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          {connected ? (
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:bg-emerald-500/10">
              <Link href="/dashboard/github">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  GitHub Connected
                </span>
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              <a
                href={installUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground flex items-center gap-1.5"
              >
                <Github className="size-4" />
                Connect to GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
