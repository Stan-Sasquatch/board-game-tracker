import { integer, primaryKey } from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { userPlayGroupMember } from "./userPlayGroupMember";
import { userBoardGamePlay } from "./userBoardGamePlay";

export const userPlayGroupMemberPlay = createTable(
  "userPlayGroupMemberPlay",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => userPlayGroupMember.id),
    playId: integer("play_id")
      .notNull()
      .references(() => userBoardGamePlay.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: `${process.env.NODE_ENV}_user_board_game_play_pk`,
        columns: [table.playerId, table.playId],
      }),
    };
  },
);
