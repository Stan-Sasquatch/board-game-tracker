import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm/sql";
import { boardGame } from "~/server/db/schema/boardGame";
import { userBoardGame } from "~/server/db/schema/userBoardGame";

export async function GetUserBoardGameWithPlays(boardGameId: number) {
  const userId = (await currentUser())?.id;

  if (!userId) {
    throw new Error("Not logged in");
  }

  const userBoardGame = await db.query.userBoardGame.findFirst({
    where: (ub, { eq, and }) =>
      and(eq(ub.boardGameId, boardGameId), eq(ub.clerkUserId, userId)),
    with: {
      boardGame: {
        columns: {
          name: true,
        },
      },
      userBoardGamePlay: {
        with: {
          userPlayGroupMemberPlay: {
            columns: {
              playerId: false,
              playId: false,
            },
            with: {
              userPlayGroupMember: {
                columns: {
                  nickname: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userBoardGame) {
    notFound();
  }

  return userBoardGame;
}

export async function GetUserBoardGameCollectionList() {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't get current user");
  }

  return await db
    .select({
      id: boardGame.id,
      name: boardGame.name,
    })
    .from(boardGame)
    .innerJoin(
      userBoardGame,
      and(
        eq(boardGame.id, userBoardGame.boardGameId),
        eq(userBoardGame.clerkUserId, clerkUserId),
      ),
    )
    .groupBy(boardGame.id);
}

export type UserBoardGameCollectionList = Awaited<
  ReturnType<typeof GetUserBoardGameCollectionList>
>;
