import { Button } from "~/components/ui/button";
import { BoardGame, boardGameNameKey } from "../models";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";

export function SelectedBoardGame({ boardGame }: { boardGame: BoardGame }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  params.set("selected", boardGame.id.toString());

  return (
    <div>
      <div>{`Selected ${boardGame.name}`}</div>
      <div>
        <SignedOut>
          <div>You&apos;ll need to sign in to add this to your collection</div>
          <Button variant="outline" className="text-black">
            <SignInButton
              mode="modal"
              forceRedirectUrl={`${pathname}?${params.toString()}`}
            />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="outline" content="Add to collection" />
        </SignedIn>
      </div>
    </div>
  );
}
