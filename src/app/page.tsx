import { max } from "drizzle-orm";
import { db } from "~/server/db";
import { boardGame } from "~/server/db/schema";
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
      {randomBoardGame?.name ?? "No game found"}
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
