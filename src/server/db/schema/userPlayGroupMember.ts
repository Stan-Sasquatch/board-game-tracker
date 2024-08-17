import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSharedTable } from "../utils";

export const userPlayGroupMember = createSharedTable("userPlayGroupMember", {
  id: serial("id").primaryKey().notNull(),
  forename: varchar("forename", { length: 128 }).notNull(),
  surname: varchar("surname", { length: 128 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  playGroupOwnerClerkUserId: varchar("own_clerk_user_id", {
    length: 32,
  }).notNull(),
  ownClerkUserId: varchar("own_clerk_user_id", { length: 32 }),
  updatedAt: timestamp("updated_at"),
});
