import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
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
