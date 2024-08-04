import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSharedTable } from "../utils";
import { userBoardGame } from "./userBoardGame";

export const boardGame = createSharedTable(
  "boardGame",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    yearPublished: integer("year_published").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    rank: integer("rank"),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const boardGameRelations = relations(boardGame, ({ many }) => ({
  userBoardGame: many(userBoardGame),
}));
