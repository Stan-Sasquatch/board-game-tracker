import {
  foreignKey,
  integer,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { userBoardGame } from "./userBoardGame";

export const userBoardGamePlay = createTable(
  "userBoardGamePlay",
  {
    id: serial("id").primaryKey().notNull(),
    clerkUserId: varchar("clerk_user_id", { length: 32 }).notNull(),
    boardGameId: integer("board_game_id").notNull(),
    dateOfPlay: timestamp("date_of_play"),
  },
  (table) => {
    return {
      userBoardGameReference: foreignKey({
        columns: [table.clerkUserId, table.boardGameId],
        foreignColumns: [userBoardGame.clerkUserId, userBoardGame.boardGameId],
        name: `${process.env.NODE_ENV}_user_board_game_fk`,
      }),
    };
  },
);
