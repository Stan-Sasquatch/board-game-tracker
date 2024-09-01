import { eq, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema/boardGame";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";
import { currentUser } from "@clerk/nextjs/server";

export async function GetUserBoardGameCollection() {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't get current user");
  }

  return await db
    .select({
      id: boardGame.id,
      name: boardGame.name,
      playCount: sql<number>`cast(count(distinct ${userBoardGamePlay.id}) as integer)`,
    })
    .from(boardGame)
    .innerJoin(userBoardGame, eq(boardGame.id, userBoardGame.boardGameId))
    .leftJoin(
      userBoardGamePlay,
      eq(userBoardGame.boardGameId, userBoardGamePlay.boardGameId),
    )
    .groupBy(boardGame.id);
}

export type Collection = Awaited<ReturnType<typeof GetUserBoardGameCollection>>;

export async function GetUserPlayGroupMembers() {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't get current user");
  }

  return await db.query.userPlayGroupMember.findMany({
    where: (pgm, { eq }) => eq(pgm.playGroupOwnerClerkUserId, clerkUserId),
    columns: {
      id: true,
      nickname: true,
    },
  });
}

export type UserPlayGroupMembers = Awaited<
  ReturnType<typeof GetUserPlayGroupMembers>
>;
