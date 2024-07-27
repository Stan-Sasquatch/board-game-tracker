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
      <h1 className="mb-4 text-center text-2xl font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <table className="min-w-full rounded-lg bg-white text-black shadow-md">
        <thead className="hidden sm:table-header-group">
          <tr className="bg-gray-200">
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th colSpan={2} className="border-b-2 border-gray-300 px-4 py-2">
              Actions
            </th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Play Count</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((bg) => (
            <tr key={bg.id} className="even:bg-gray-100">
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                {bg.name}
              </td>
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                <UpdatePlayCountButton
                  boardGameId={bg.id}
                  currentCount={bg.playCount}
                />
              </td>
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                <RemoveUserBoardGameButton boardGameId={bg.id} />
              </td>
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                {bg.playCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
