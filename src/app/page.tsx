import { max } from "drizzle-orm";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema/boardGame";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const result = await db.select({ maxId: max(boardGame.id) }).from(boardGame);
  const maxId = result?.[0]?.maxId ?? 0;
  let randomBoardGame: Awaited<ReturnType<typeof GetBoardGameFromRandomId>>;

  while (!randomBoardGame) {
    // bit of a hack just to test db connection
    randomBoardGame = await GetBoardGameFromRandomId(maxId);
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {randomBoardGame?.name ? (
        <>
          <h1 className="pt-2">Random boardgame of the day:</h1>
          <br />
          <div>{randomBoardGame.name}</div>
        </>
      ) : (
        <h1>Nothing to see here - Try refreshing!</h1>
      )}
    </main>
  );
}

async function GetBoardGameFromRandomId(maxId: number) {
  const randomId = Math.floor(Math.random() * (maxId + 1));
  const game = await db.query.boardGame.findFirst({
    where: (bg, { eq }) => eq(bg.id, randomId),
  });

  return game;
}
