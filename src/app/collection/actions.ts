"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type UserBoardGamePlay } from "./models";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";

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

export async function UpdateUserBoardGamePlayCount(
  boardGameId: number,
  playCount: number,
) {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't find user id for logged in user");
  }

  await db
    .update(userBoardGame)
    .set({ playCount })
    .where(
      and(
        eq(userBoardGame.clerkUserId, clerkUserId),
        eq(userBoardGame.boardGameId, boardGameId),
      ),
    );

  revalidatePath("/collection");
}

export async function CreateUserBoardGamePlay({
  model,
}: {
  model: Omit<UserBoardGamePlay, "clerkUserId">;
}) {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't find user id for logged in user");
  }

  await db.insert(userBoardGamePlay).values({ ...model, clerkUserId });
}
