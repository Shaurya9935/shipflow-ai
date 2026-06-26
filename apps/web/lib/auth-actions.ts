"use server";

import { auth } from "@repo/services/auth/src";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_AUTH_CALLBACK, getSafeCallbackPath, SIGN_IN_PATH } from "@repo/services/auth/src/utils";
import { db } from "@repo/database";
import { user, session } from "@repo/database/schema";

export async function signInWithGithub(formData: FormData) {
  const callback = formData.get("callbackUrl");

  const redirectTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null
  );
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSession(allowFallback = true) {
  let session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session && allowFallback && process.env.ALLOW_DEV_LOGIN === "true") {
    try {
      let [defaultUser] = await db.select().from(user).limit(1);
      if (!defaultUser) {
        const result = await db.insert(user).values({
          id: "dev-user-id",
          name: "Developer",
          email: "dev@example.com",
          emailVerified: true,
        }).returning();
        defaultUser = result[0];
      }
      if (defaultUser) {
        session = {
          session: {
            id: "dev-session-id",
            userId: defaultUser.id,
            expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000),
            token: "dev-token",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          user: defaultUser,
        };
      }
    } catch (err) {
      console.error("Failed to seed/fetch dev user for server actions fallback", err);
    }
  }

  return session;
}

export async function requireAuth(redirectTo = SIGN_IN_PATH) {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBACK) {
  const session = await getServerSession(false);

  if (session) {
    redirect(redirectTo);
  }
}

export async function signInAsDeveloper() {
  // 1. Get or create the dev user
  let [defaultUser] = await db.select().from(user).limit(1);
  if (!defaultUser) {
    const result = await db.insert(user).values({
      id: "dev-user-id",
      name: "Developer",
      email: "dev@example.com",
      emailVerified: true,
    }).returning();
    defaultUser = result[0];
  }

  if (!defaultUser) {
    throw new Error("Failed to resolve or create development user");
  }

  // 2. Generate a session token
  const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 days

  // 3. Insert the session into database
  await db.insert(session).values({
    id: "dev-session-id-" + Date.now(),
    userId: defaultUser.id,
    token,
    expiresAt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 4. Set the cookie
  const cookieStore = await cookies();
  cookieStore.set("better-auth.session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  // 5. Redirect to dashboard
  redirect("/dashboard");
}
