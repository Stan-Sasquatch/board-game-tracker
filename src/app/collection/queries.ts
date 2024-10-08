import { and, eq, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema/boardGame";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";
import { currentUser } from "@clerk/nextjs/server";

export async function GetUserBoardGameCollectionDetail() {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't get current user");
  }

  return await db.query.userBoardGame.findMany({
    where: (ubg, { eq }) => eq(ubg.clerkUserId, clerkUserId),
    with: {
      boardGame: {
        columns: {
          id: true,
          name: true,
        },
      },
      userBoardGamePlay: {
        columns: {
          id: true,
        },
      },
    },
  });

  // return await db
  //   .select({
  //     id: boardGame.id,
  //     name: boardGame.name,
  //     playCount: sql<number>`cast(count(distinct ${userBoardGamePlay.id}) as integer)`,
  //   })
  //   .from(boardGame)
  //   .innerJoin(
  //     userBoardGame,
  //     and(
  //       eq(boardGame.id, userBoardGame.boardGameId),
  //       eq(userBoardGame.clerkUserId, clerkUserId),
  //     ),
  //   )
  //   .innerJoin(
  //     userBoardGamePlay,
  //     and(
  //       eq(boardGame.id, userBoardGame.boardGameId),
  //       eq(userBoardGame.clerkUserId, clerkUserId),
  //     ),
  //   )
  //   .groupBy(boardGame.id);
}

export type Collection = Awaited<
  ReturnType<typeof GetUserBoardGameCollectionDetail>
>;

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
