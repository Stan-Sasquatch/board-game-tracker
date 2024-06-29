import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let randomBoardGame:
    | {
        id: number;
        name: string;
        yearPublished: number;
        createdAt: Date;
        updatedAt: Date | null;
      }
    | undefined = undefined;

  while (!randomBoardGame) {
    // bit of a hack just to test db connection
    const maxId = 295770;
    const randomId = Math.floor(Math.random() * (maxId + 1));
    randomBoardGame = await db.query.boardGame.findFirst({
      where: (bg, { eq }) => eq(bg.id, randomId),
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {randomBoardGame?.name ?? "No game found"}
    </main>
  );
}
