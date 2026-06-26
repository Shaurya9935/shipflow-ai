import { DASHBOARD_ROUTES } from "@repo/trpc/server";
import { saveInstallation } from "@repo/services/github/installation";
import { getServerSession } from "~/lib/auth-actions";
import { redirect } from "next/navigation";
import { SIGN_IN_PATH } from "@repo/services/auth/src/utils";


function buildSignInCallbackUrl(installationId: string | null): string {
    if (installationId) {
      return `/api/github/callback?installation_id=${installationId}`;
    }
  
    return DASHBOARD_ROUTES.github;
  }

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url);

    const  installationId = searchParams.get("installation_id");
    const session = await getServerSession();


    if(!session){
        const callbackUrl = buildSignInCallbackUrl(installationId);
        redirect(`${SIGN_IN_PATH}?callbackUrl=${encodeURIComponent(callbackUrl)}`); 
    }

    if(installationId){
        await saveInstallation(session.user.id , Number(installationId))
    }

    redirect(DASHBOARD_ROUTES.github)
}