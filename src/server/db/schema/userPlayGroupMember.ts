import { relations, sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { userPlayGroupMemberPlay } from "./userPlayGroupMemberPlay";

export const userPlayGroupMember = createTable("userPlayGroupMember", {
  id: serial("id").primaryKey().notNull(),
  nickname: varchar("nickname", { length: 128 }).notNull(),
  forename: varchar("forename", { length: 128 }),
  surname: varchar("surname", { length: 128 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  playGroupOwnerClerkUserId: varchar("play_group_owner_user_id", {
    length: 32,
  }).notNull(),
  ownClerkUserId: varchar("own_clerk_user_id", { length: 32 }),
  updatedAt: timestamp("updated_at"),
});

export const userPlayGroupMemberRelations = relations(
  userPlayGroupMember,
  ({ many }) => ({
    userPlayGroupMemberPlay: many(userPlayGroupMemberPlay),
  }),
);
