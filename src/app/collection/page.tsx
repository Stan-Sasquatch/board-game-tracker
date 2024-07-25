import { eq } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame, userBoardGame } from "~/server/db/schema";
export const dynamic = "force-dynamic";

export default async function Collection() {
  const { name, id } = boardGame;
  const collection = await db
    .select({ name, id })
    .from(boardGame)
    .innerJoin(userBoardGame, eq(id, userBoardGame.boardGameId));

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white text-black shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b-2 border-gray-300 px-4 py-2">ID</th>
              <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
              <th colSpan={2} className="border-b-2 border-gray-300 px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {collection.map((bg) => (
              <tr key={bg.id} className="even:bg-gray-100">
                <td className="border-b border-gray-300 px-4 py-2">{bg.id}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {bg.name}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    Add Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
