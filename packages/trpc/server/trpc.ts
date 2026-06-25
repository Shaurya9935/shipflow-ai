import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

// 🛑 The Security Bouncer Middleware
const enforceUserIsAuthed = tRPCContext.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this!"
    });
  }

  // If they are logged in, pass the user data safely to the procedure!
  return next({
    ctx: {
      session: ctx.session,
      // This exposes `ctx.user` to your feature request router!
      user: ctx.session.user, 
    },
  });
});

// 🛡️ The Protected Procedure we use for secure routes
export const protectedProcedure = tRPCContext.procedure.use(enforceUserIsAuthed);