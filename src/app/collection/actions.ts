"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { userBoardGame } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function DeleteUserBoardGame(boardGameId: number) {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't find user id for logged in user");
  }

  await db
    .delete(userBoardGame)
    .where(
      and(
        eq(userBoardGame.clerkUserId, clerkUserId),
        eq(userBoardGame.boardGameId, boardGameId),
      ),
    );

  revalidatePath("/collection");
}
