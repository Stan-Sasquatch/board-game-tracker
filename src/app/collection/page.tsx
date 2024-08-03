import { asc, desc, eq } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame, userBoardGame } from "~/server/db/schema";
import { RemoveUserBoardGameButton } from "./RemoveUserBoardGameButton";
import { UpdatePlayCountButton } from "./UpdatePlayCountButton";

export default async function Collection() {
  const { name, id } = boardGame;
  const { playCount } = userBoardGame;
  const collection = await db
    .select({ name, id, playCount })
    .from(boardGame)
    .innerJoin(userBoardGame, eq(id, userBoardGame.boardGameId))
    .orderBy(desc(userBoardGame.playCount), asc(boardGame.name));

  return (
    <div>
      <h1 className="mb-4 pt-2 text-center text-2xl font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <div className="grid grid-cols-1 gap-4 text-black sm:px-4 sm:py-4">
        <div className="hidden justify-items-center rounded-lg bg-gray-200 font-bold sm:grid sm:grid-cols-4">
          <div className="px-4 py-2">Name</div>
          <div className="px-4 py-2">Play Count</div>
          <div className="col-span-2 px-4 py-2">Actions </div>
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
              <UpdatePlayCountButton
                boardGameId={bg.id}
                currentCount={bg.playCount}
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
