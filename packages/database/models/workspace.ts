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

export const workspace = pgTable("workspaces", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", {length: 100}),

    slug: varchar("slug", {length:100}),

    stripeCustomerId: varchar("stripe_customer_id"),

    createdAt: timestamp().defaultNow().notNull()
    
})