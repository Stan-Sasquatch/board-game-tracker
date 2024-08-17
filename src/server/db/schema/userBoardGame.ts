import { relations } from "drizzle-orm";
import { integer, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { boardGame } from "./boardGame";

export const userBoardGame = createTable(
  "userBoardGame",
  {
    clerkUserId: varchar("clerk_user_id", { length: 32 }).notNull(),
    boardGameId: integer("board_game_id").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: `${process.env.NODE_ENV}_user_board_game_pk`,
        columns: [table.clerkUserId, table.boardGameId],
      }),
    };
  },
);

export const userBoardGameRelations = relations(userBoardGame, ({ one }) => ({
  boardGame: one(boardGame, {
    fields: [userBoardGame.boardGameId],
    references: [boardGame.id],
  }),
}));
