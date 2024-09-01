import { integer, primaryKey } from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { userPlayGroupMember } from "./userPlayGroupMember";
import { userBoardGamePlay } from "./userBoardGamePlay";
import { relations } from "drizzle-orm";

export const userPlayGroupMemberPlay = createTable(
  "userPlayGroupMemberPlay",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => userPlayGroupMember.id),
    playId: integer("play_id")
      .notNull()
      .references(() => userBoardGamePlay.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
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

export const userPlayGroupMemberPlayRelations = relations(
  userPlayGroupMemberPlay,
  ({ one }) => ({
    userPlayGroupMember: one(userPlayGroupMember, {
      fields: [userPlayGroupMemberPlay.playerId],
      references: [userPlayGroupMember.id],
    }),
    userPlayGroupMemberPlay: one(userBoardGamePlay, {
      fields: [userPlayGroupMemberPlay.playId],
      references: [userBoardGamePlay.id],
    }),
  }),
);
