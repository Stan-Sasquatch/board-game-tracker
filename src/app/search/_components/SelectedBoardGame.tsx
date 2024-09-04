import { Button } from "~/components/ui/button";
import { type BoardGameSearchParams } from "../models";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "~/server/db";
import { CreateUserBoardGame } from "./CreateUserBoardGame";

export async function SelectedBoardGame({
  searchParams,
}: {
  searchParams: BoardGameSearchParams;
}) {
  const selectedId = searchParams?.selected;

  if (!selectedId) {
    return null;
  }

  const params = new URLSearchParams(searchParams);
  const parsedId = parseInt(selectedId, 10);
  const boardGame = await db.query.boardGame.findFirst({
    where: (boardgame, { eq }) => eq(boardgame.id, parsedId),
  });

  if (!boardGame) {
    throw new Error(`No board game found with id ${selectedId}`);
  }

  return (
    <div>
      <div className="py-2 text-center">{`Selected ${boardGame.name}`}</div>
      <div>
        <SignedOut>
          <div>You&apos;ll need to sign in to add this to your collection</div>

          <div className="flex justify-center">
            <Button asChild variant="outline" className="text-black">
              <SignInButton
                mode="modal"
                forceRedirectUrl={`/search?${params.toString()}`}
              />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <CreateUserBoardGame parsedId={parsedId} />
        </SignedIn>
      </div>
    </div>
  );
}
