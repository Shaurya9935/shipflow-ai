import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  jsonb
} from "drizzle-orm/pg-core";
import { user } from "./user"; 
import { workspace } from "./workspace"; 


export const statusTypeEnum = pgEnum('feature_request_status', [
  'pending',             // Just submitted by user
  'needs_clarification', // AI paused the Inngest workflow and is asking the user questions
  'rejected',            // AI or Human decided not to build this
  'prd_generated',       // AI finished the PRD (Phase 1 Complete!)
  'planning',            // AI generated tasks (Phase 2 Complete!)
  'development',         // GitHub PR is open (Phase 3)
  'in_review',           // AI is reviewing the code (Phase 4)
  'completed'            
]);

export const featureRequest = pgTable("feature_request", {
  // 1. Core Identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  
  // 2. Foreign Keys (Crucial for SaaS!)
  workspaceId: uuid("workspace_id").notNull().references(() => workspace.id),
  userId: text("user_id").notNull().references(() => user.id), // The author who requested it

  // 3. User Input (What they actually asked for)
  title: text("title").notNull(), // e.g., "Add Dark Mode"
  initialPrompt: text("initial_prompt").notNull(), // The raw, messy email/text they submitted

  // 4. State Management
  status: statusTypeEnum('status').notNull().default('pending'),

  // 5. AI Generated Output (The Magic! 🪄)
  // Using JSONB here is a massive hackathon cheat code! 
  // When the Vercel AI SDK generates the structured PRD object, you can dump it directly in here
  // without needing 10 different text columns.
  prdContent: jsonb("prd_content"), // Will hold: { problemStatement, goals, userStories, etc. }

  // 6. Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Optional: A table to store the chat back-and-forth between the User and the AI Agent! 💬
export const featureClarificationMessage = pgTable("feature_clarification_message", {
  id: uuid("id").primaryKey().defaultRandom(),
  featureRequestId: uuid("feature_request_id").notNull().references(() => featureRequest.id),
  role: text("role").notNull(), // 'user' or 'ai'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});