"use client";
import { Button } from "~/components/ui/button";
import { DeleteUserBoardGame } from "../actions";
import { useTransition } from "react";
import { useToast } from "~/components/ui/use-toast";

export function RemoveUserBoardGameButton({
  boardGameId,
}: {
  boardGameId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onClick = () => {
    startTransition(async () => {
      await DeleteUserBoardGame(boardGameId);
      toast({
        title: "Board game deleted",
        description:
          "Board game and all play data was removed from your collection",
      });
    });
  };
  return (
    <Button disabled={isPending} onClick={onClick} variant="destructive">
      Remove
    </Button>
  );
}
