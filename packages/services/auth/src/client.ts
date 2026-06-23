import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./index";

export const authClient = createAuthClient({
  // Use environment variable for application domain mapping
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>() // Keeps frontend types in sync with database models
  ]
});

export const signInWithGithub = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
  });

  return data;
}
