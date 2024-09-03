import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GetAllUserBoardGamesWithPlays() {
  const userId = (await currentUser())?.id;

  if (!userId) {
    throw new Error("Not logged in");
  }

  const userBoardGames = await db.query.userBoardGamePlay.findMany({
    where: (ubp, { eq }) => eq(ubp.boardGameOwnerId, userId),
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
      userBoardGame: {
        columns: {
          clerkUserId: false,
          boardGameId: false,
        },
        with: {
          boardGame: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  return userBoardGames;
}
