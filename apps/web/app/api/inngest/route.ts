import { serve } from "inngest/next";
import { inngest } from "@repo/services/ai/chatbot/client";
import { processFeatureRequest } from "@repo/services/ai/chatbot/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processFeatureRequest],
});