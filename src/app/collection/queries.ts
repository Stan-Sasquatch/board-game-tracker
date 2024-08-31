import { asc, desc, eq, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema/boardGame";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";
import { currentUser } from "@clerk/nextjs/server";
import { type CollectionOrderBySearchParams } from "./models";

export async function GetUserBoardGameCollection(
  parsedSearchParams: CollectionOrderBySearchParams,
) {
  const clerkUserId = (await currentUser())?.id;

  if (!clerkUserId) {
    throw new Error("Can't get current user");
  }

  function getOrderBy() {
    if (!parsedSearchParams?.direction || !parsedSearchParams?.orderBy) {
      return asc(boardGame.id);
    }

    const { orderBy, direction } = parsedSearchParams;

    if (orderBy === "name") {
      return direction === "asc" ? asc(boardGame.name) : desc(boardGame.name);
    }

    return direction === "asc"
      ? sql`cast(count(${userBoardGamePlay.id}) as integer) ASC`
      : sql`cast(count(${userBoardGamePlay.id}) as integer) DESC`;
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
    .groupBy(boardGame.id)
    .orderBy(getOrderBy());
}

export type Collection = Awaited<ReturnType<typeof GetUserBoardGameCollection>>;
