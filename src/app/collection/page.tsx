import { eq } from "drizzle-orm/sql";
import { Button } from "~/components/ui/button";
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
    <div>
      <h1 className="mb-4 text-center text-2xl  font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <table className="min-w-full rounded-lg bg-white text-black shadow-md">
        <thead className="hidden sm:table-header-group">
          <tr className="bg-gray-200">
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th colSpan={2} className="border-b-2 border-gray-300 px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collection.map((bg) => (
            <tr key={bg.id} className="even:bg-gray-100">
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                {bg.name}
              </td>
              <td className="block border-b border-gray-300 px-4 py-2 sm:table-cell">
                <div className="flex justify-between sm:flex sm:justify-between sm:gap-4 ">
                  <Button variant="default">Add Play</Button>
                  <Button variant="destructive">Remove</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
