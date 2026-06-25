import { auth } from "@repo/services/auth/src"; // Your Better Auth instance
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext(opts: FetchCreateContextFnOptions) {
  // 1. Grab the session securely using Better Auth!
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  // 2. Pass the session into the tRPC context
  return {
    req: opts.req,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;