// 🛠️ FIX 1: Point to your actual tRPC initialization file based on your folder structure
import { router, protectedProcedure } from "../../trpc";
import { z } from "zod";

// 🛠️ FIX 2: Use your clean monorepo workspace aliases instead of messy ../../ paths!
import { db } from "../../../../database";
import { featureRequest } from "../../../../database/schema";
import { inngest } from "@repo/services/ai/chatbot/client";

export const featureRequestRouter = router({
  create: protectedProcedure
    .input(z.object({
      workspaceId: z.string(),
      title: z.string(),
      prompt: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // 1. Save to Database
      const result = await db.insert(featureRequest).values({
        workspaceId: input.workspaceId,
        // Ensure your context actually provides the user ID like this!
        userId: ctx.user.id, 
        title: input.title,
        initialPrompt: input.prompt,
      }).returning();

      // 🛠️ FIX 3: Safely extract the first item to satisfy TypeScript's strict null checks
      const newRequest = result[0];
      if (!newRequest) {
        throw new Error("Failed to create feature request in database.");
      }

      // 2. Trigger the Inngest AI Workflow! 🚀
      await inngest.send({
        name: "feature.discovery.started",
        data: { featureRequestId: newRequest.id },
      });

      return newRequest;
    }),
});