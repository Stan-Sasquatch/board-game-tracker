import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// we share the board game database between development and production
const createSharedTable = pgTableCreator((name) => `boardGameTracker_${name}`);

export const createTable = pgTableCreator(
  (name) => `board-game-tracker_${process.env.NODE_ENV}_${name}`,
);

export const boardGame = createSharedTable(
  "boardGame",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    yearPublished: integer("year_published").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const boardGameRelations = relations(boardGame, ({ many }) => ({
  userBoardGame: many(userBoardGame),
}));

export const userBoardGame = createTable(
  "userBoardGame",
  {
    clerkUserId: varchar("clerk_user_id", { length: 32 }).notNull(),
    boardGameId: integer("author_id").notNull(),
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.clerkUserId, table.boardGameId] }),
    };
  },
);

export const userBoardGameRelations = relations(userBoardGame, ({ one }) => ({
  author: one(boardGame, {
    fields: [userBoardGame.boardGameId],
    references: [boardGame.id],
  }),
}));
