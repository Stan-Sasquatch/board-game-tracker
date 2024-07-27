"use client";
import { Button } from "~/components/ui/button";
import { DeleteUserBoardGame } from "./actions";
import { useTransition } from "react";

export function RemoveUserBoardGameButton({
  boardGameId,
}: {
  boardGameId: number;
}) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await DeleteUserBoardGame(boardGameId);
    });
  };
  return (
    <Button disabled={isPending} onClick={onClick} variant="destructive">
      Remove
    </Button>
  );
}
