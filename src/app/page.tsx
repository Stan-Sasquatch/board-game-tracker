import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let randomBoardGame = await GetBoardGameFromRandomId();

  while (!randomBoardGame) {
    // bit of a hack just to test db connection
    randomBoardGame = await GetBoardGameFromRandomId();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {randomBoardGame?.name ?? "No game found"}
    </main>
  );
}

async function GetBoardGameFromRandomId() {
  const maxId = 295770;
  const randomId = Math.floor(Math.random() * (maxId + 1));
  const game = await db.query.boardGame.findFirst({
    where: (bg, { eq }) => eq(bg.id, randomId),
  });

  return game;
}
