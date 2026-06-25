import { auth } from "@repo/services/auth/src"; // Your Better Auth instance

function toWebHeaders(headers: Headers | Record<string, string | string[] | undefined>) {
  if (headers instanceof Headers) {
    return headers;
  }

  const webHeaders = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      webHeaders.set(key, value);
    } else if (Array.isArray(value)) {
      webHeaders.set(key, value.join(", "));
    }
  }

  return webHeaders;
}

export async function createContext(opts: { req: { headers: Headers | Record<string, string | string[] | undefined> } }) {
  // 1. Grab the session securely using Better Auth!
  const session = await auth.api.getSession({
    headers: toWebHeaders(opts.req.headers),
  });

  // 2. Pass the session into the tRPC context
  return {
    req: opts.req,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
