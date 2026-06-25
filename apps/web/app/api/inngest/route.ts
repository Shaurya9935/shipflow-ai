import { serve } from "inngest/next";
import { inngest } from "@repo/services/ai/chatbot/client";
import { processTask } from "@repo/services/ai/chatbot/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask],
});