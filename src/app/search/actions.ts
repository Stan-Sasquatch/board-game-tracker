"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { userBoardGame } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function createUserBoardGame(boardGameId: number) {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't find user id for logged in user");
  }

  const userBoardGameExists =
    (
      await db
        .select()
        .from(userBoardGame)
        .where(
          and(
            eq(userBoardGame.clerkUserId, clerkUserId),
            eq(userBoardGame.boardGameId, boardGameId),
          ),
        )
    ).length > 0;

  if (userBoardGameExists) {
    return {
      success: false,
      message: "This board game already exists in your collection",
    };
  }

  await db.insert(userBoardGame).values({
    boardGameId,
    clerkUserId,
  });

  return {
    success: true,
    message: "Board game successfully added to collection",
  };
}
