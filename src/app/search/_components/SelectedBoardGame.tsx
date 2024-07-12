import { Button } from "~/components/ui/button";
import { type BoardGameSearchParams } from "../models";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "~/server/db";
import { createUserBoardGame } from "../actions";
import { SubmitButton } from "~/app/_components/SubmitButton";

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
      <div>{`Selected ${boardGame.name}`}</div>
      <div>
        <SignedOut>
          <div>You&apos;ll need to sign in to add this to your collection</div>
          <Button variant="outline" className="text-black">
            <SignInButton
              mode="modal"
              forceRedirectUrl={`/search?${params.toString()}`}
            />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-center">
            <form
              action={async function () {
                "use server";
                return await createUserBoardGame(parsedId);
              }}
            >
              <SubmitButton buttonText="Add to collection" />
            </form>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
