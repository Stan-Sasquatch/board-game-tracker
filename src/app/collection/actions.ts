"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type UserBoardGamePlay } from "./models";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";
import { type CreatePlayModel } from "./_components/AddPlayModal";
import { userPlayGroupMember } from "~/server/db/schema/userPlayGroupMember";
import { userPlayGroupMemberPlay } from "~/server/db/schema/userPlayGroupMemberPlay";

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

export async function CreateUserBoardGamePlay(
  model: CreatePlayModel,
  boardGameId: number,
) {
  const boardGameOwnerId = (await currentUser())?.id;

  if (!boardGameOwnerId) {
    throw new Error("Can't find user id for logged in user");
  }
  const insertModel: UserBoardGamePlay = {
    boardGameOwnerId,
    boardGameId,
    dateOfPlay: model.dateOfPlay,
  };
  const [userBoardGamePlayResult] = await db
    .insert(userBoardGamePlay)
    .values(insertModel)
    .returning({ insertedId: userBoardGamePlay.id });

  const playId = userBoardGamePlayResult?.insertedId;

  if (!playId) {
    return {
      success: false,
      message: "Something went wrong while saving",
    };
  }

  if (model.newPlayers.length > 0) {
    for (const p of model.newPlayers) {
      const { nickname } = p;
      const [userPlayGroupMemberResult] = await db
        .insert(userPlayGroupMember)
        .values({
          playGroupOwnerClerkUserId: boardGameOwnerId,
          nickname,
        })
        .returning({ insertedId: userPlayGroupMember.id });

      const playerId = userPlayGroupMemberResult?.insertedId;

      if (!playerId) {
        return {
          success: false,
          message: "Something went wrong while saving",
        };
      }

      await db.insert(userPlayGroupMemberPlay).values({
        playId,
        playerId,
      });
    }
  }

  if (model.players.length > 0) {
    for (const playerId of model.players.map(Number)) {
      await db.insert(userPlayGroupMemberPlay).values({
        playId,
        playerId,
      });
    }
  }

  revalidatePath("/collection");

  return {
    success: true,
    message: "Play was successfully logged",
  };
}
