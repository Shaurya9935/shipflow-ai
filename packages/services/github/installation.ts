import { db } from "@repo/database";
import { githubInstallation } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import type { App } from "octokit";

export type GithubInstallationStatus = {
  connected: boolean;
  accountLogin: string | null;
  installedAt: string | null;
};

async function getGithubApp() {
  const { App: AppClass } = await import("octokit");
  return new AppClass({
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  });
}

function getAccountLogin(
  account: { login?: string; slug?: string } | null | undefined
): string | null {
  if (!account) {
    return null;
  }
  if ("login" in account && account.login) {
    return account.login;
  }
  if (account.slug) {
    return account.slug;
  }
  return null;
}

function buildDisconnectedStatus(): GithubInstallationStatus {
  return { connected: false, accountLogin: null, installedAt: null };
}

export async function getInstallationStatus(userId: string): Promise<GithubInstallationStatus> {
  const [installation] = await db
    .select()
    .from(githubInstallation)
    .where(eq(githubInstallation.userId, userId))
    .limit(1);

  if (!installation) {
    return buildDisconnectedStatus();
  }

  return {
    connected: true,
    accountLogin: installation.accountLogin,
    installedAt: installation.createdAt.toISOString(),
  };
}

export async function saveInstallation(userId: string, installationId: number) {
  const app = await getGithubApp();

  const { data } = await app.octokit.request(
    "GET /app/installations/{installation_id}",
    { installation_id: installationId }
  );

  const accountLogin = getAccountLogin(data.account);

  // Check if installation exists for this user
  const [existing] = await db
    .select()
    .from(githubInstallation)
    .where(eq(githubInstallation.userId, userId))
    .limit(1);

  if (existing) {
    await db
      .update(githubInstallation)
      .set({
        installationId: installationId.toString(),
        accountLogin,
        accountType: data.target_type ?? null,
        updatedAt: new Date(),
      })
      .where(eq(githubInstallation.userId, userId));
  } else {
    await db.insert(githubInstallation).values({
      userId,
      installationId: installationId.toString(),
      accountLogin,
      accountType: data.target_type ?? null,
    });
  }
}

export async function deleteInstallation(userId: string) {
  await db
    .delete(githubInstallation)
    .where(eq(githubInstallation.userId, userId));
}

export async function getUserIdByInstallationId(installationId: number) {
  const [installation] = await db
    .select()
    .from(githubInstallation)
    .where(eq(githubInstallation.installationId, installationId.toString()))
    .limit(1);

  if (!installation) {
    return null;
  }
  return installation.userId;
}

export async function getUserInstallationId(userId: string) {
  const [installation] = await db
    .select()
    .from(githubInstallation)
    .where(eq(githubInstallation.userId, userId))
    .limit(1);

  if (!installation) {
    return null;
  }
  return installation.installationId ? parseInt(installation.installationId) : null;
}
