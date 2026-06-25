import { router, protectedProcedure } from "../../trpc";
import { z } from "zod";

import { db } from "../../../../database";
import { featureRequest, workspace } from "../../../../database/schema";
import { inngest } from "@repo/services/ai/chatbot/client";

export const featureRequestRouter = router({
  create: protectedProcedure
    .input(z.object({
      workspaceId: z.string().uuid().optional(),
      title: z.string(),
      prompt: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      let workspaceId = input.workspaceId;

      if (!workspaceId) {
        const [existingWorkspace] = await db.select().from(workspace).limit(1);

        if (existingWorkspace) {
          workspaceId = existingWorkspace.id;
        } else {
          const [createdWorkspace] = await db
            .insert(workspace)
            .values({
              name: "Default Workspace",
              slug: "default",
            })
            .returning();

          if (!createdWorkspace) {
            throw new Error("Failed to create default workspace.");
          }

          workspaceId = createdWorkspace.id;
        }
      }

      // 1. Save to Database
      const result = await db.insert(featureRequest).values({
        workspaceId,
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
    }),
});
