import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  numeric,
  pgEnum,
  unique
} from "drizzle-orm/pg-core";
import { user } from "./user"
import { workspace } from "./workspace";

export const roleTypeEnum = pgEnum('field_type', ['admin', 'member'])

export const workspaceMember = pgTable("workspace_member", {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").references(()=>workspace.id),
    userId: text("user_id").references(()=> user.id),
    role: roleTypeEnum('role').notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull() 
})