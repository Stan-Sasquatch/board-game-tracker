import { and, asc, desc, eq, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema/boardGame";
import { userBoardGame } from "~/server/db/schema/userBoardGame";
import { RemoveUserBoardGameButton } from "./RemoveUserBoardGameButton";
import { AddPlayModal } from "./AddPlayModal";
import { collectionOrderBySearchParams } from "./models";
import { SortIcon } from "./_components/SortIcon";
import { userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";
import { currentUser } from "@clerk/nextjs/server";

export default async function Collection({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = collectionOrderBySearchParams.parse(searchParams);

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

  const collection = await db
    .select({
      id: boardGame.id,
      name: boardGame.name,
      playCount: sql<number>`cast(count(${userBoardGamePlay.id}) as integer)`,
    })
    .from(boardGame)
    .innerJoin(userBoardGame, eq(boardGame.id, userBoardGame.boardGameId))
    .leftJoin(
      userBoardGamePlay,
      eq(userBoardGame.boardGameId, userBoardGamePlay.boardGameId),
    )
    .where(eq(userBoardGame.clerkUserId, clerkUserId))
    .groupBy(boardGame.id)
    .orderBy(getOrderBy());

  return (
    <div>
      <h1 className="mb-4 pt-2 text-center text-2xl font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <div className="grid grid-cols-1 gap-4 text-black sm:px-4 sm:py-4">
        <div className="hidden justify-items-center rounded-lg bg-gray-200 font-bold sm:grid sm:grid-cols-4">
          <div className="flex px-4 py-2">
            Name
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"name"}
            />
          </div>
          <div className="flex px-4 py-2">
            Play Count
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"playCount"}
            />
          </div>
          <div className="col-span-2 px-4 py-2">Actions </div>
        </div>
        <div className="flex justify-around sm:hidden">
          <div className="flex text-white">
            Name
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"name"}
              color={"#ffffff"}
            />
          </div>
          <div className="flex text-white">
            Play Count
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"playCount"}
              color={"#ffffff"}
            />
          </div>
        </div>
        {collection.map((bg) => (
          <div
            key={bg.id}
            className="grid grid-cols-2 items-center justify-items-center rounded-lg bg-gray-400 even:bg-gray-100 sm:grid-cols-4"
          >
            <div className="col-span-2 px-4 py-2 sm:col-span-1">{bg.name}</div>
            <div className="px-4 py-2 sm:hidden">Plays:</div>
            <div className="px-4 py-2">{bg.playCount}</div>
            <div className="px-4 py-2">
              <AddPlayModal
                userBoardGamePlayGroupMembers={[]}
                boardGameId={bg.id}
              />
            </div>
            <div className="px-4 py-2">
              <RemoveUserBoardGameButton boardGameId={bg.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
