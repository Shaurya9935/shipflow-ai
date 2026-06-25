import { inngest } from "./client"; // Your Inngest client
import { db } from "@repo/database";
import { featureRequest, featureClarificationMessage } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { generateText, generateObject } from "ai"; // Vercel AI SDK
import { OpenRouter } from '@openrouter/sdk'; // Or anthropic, etc.

export const processFeatureRequest = inngest.createFunction(
  {
    id: "process-feature-request",
    triggers: [
      {
        event: "feature.discovery.started",
      },
    ],
  },
  async ({ event, step }) => {
    // 🛠️ FIX 1: Explicitly tell TypeScript what data is inside this event!
    const eventData = event.data as { featureRequestId: string };
    const featureRequestId = eventData.featureRequestId;

    // 1️⃣ Fetch the raw request from the database
    const request = await step.run("fetch-request", async () => {
      // 🛠️ FIX 2: Use standard Drizzle syntax which is 100% type-safe
      const [result] = await db
        .select()
        .from(featureRequest)
        .where(eq(featureRequest.id, featureRequestId))
        .limit(1);

      if (!result) throw new Error("Request not found!");
      return result;
    });

    // 2️⃣ Ask the AI: "Does this make sense or do we need more info?"
    const aiAnalysis = await step.run("analyze-request", async () => {
      const prompt = `
        A user submitted this feature request: "${request.initialPrompt}"
        Does this request have enough detail to write a full PRD (Goals, Acceptance Criteria, Edge Cases)?
        Reply with exactly "YES" if it is ready, or reply with a single follow-up question asking the user for the missing context.
      `;

      const { text } = await generateText({
        model: '~openai/gpt-latest', // Make sure your OPENAI_API_KEY is in your .env!
        prompt: prompt,
      });

      return {
        needsMoreInfo: text.trim() !== "YES",
        response: text.trim(),
      };
    });

    // 3️⃣ If the AI needs more info, PAUSE the workflow! ⏸️
    if (aiAnalysis.needsMoreInfo) {
      // Update status to needs_clarification
      await step.run("update-status-clarification", async () => {
        await db
          .update(featureRequest)
          .set({ status: "needs_clarification" })
          .where(eq(featureRequest.id, featureRequestId));

        // Save the AI's question to the chat history table
        await db.insert(featureClarificationMessage).values({
          featureRequestId: featureRequestId,
          role: "ai",
          content: aiAnalysis.response,
        });
      });

      // 🛑 THE MAGIC HAPPENS HERE: The function goes to sleep! 😴
      const userReplyEvent = await step.waitForEvent("wait-for-user-reply", {
        event: "feature.discovery.user_replied",
        timeout: "7d",
        if: `async.data.featureRequestId == "${featureRequestId}"`,
      });

      // (For the hackathon, we assume they reply and we continue below)
    }

    // 4️⃣ Generate the Structured PRD! 🏗️
    await step.run("generate-prd", async () => {
      // We will build the generateObject() logic here next!
      await db
        .update(featureRequest)
        .set({
          status: "prd_generated",
        })
        .where(eq(featureRequest.id, featureRequestId));
    });

    return { success: true, message: "Phase 1 Complete!" };
  },
);
