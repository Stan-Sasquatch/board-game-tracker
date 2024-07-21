import { eq } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { boardGame, userBoardGame } from "~/server/db/schema";
export const dynamic = "force-dynamic";

export default async function Collection() {
  const { name, id } = boardGame;
  const collection = await db
    .select({ name, id })
    .from(boardGame)
    .innerJoin(userBoardGame, eq(boardGame.id, userBoardGame.boardGameId));

  return (
    <>
      <h1>Collection, you&apos;re logged in!</h1>
      <ul>
        {collection.map((bg) => (
          <li key={bg.id}>{bg.name}</li>
        ))}
      </ul>
    </>
  );
}
