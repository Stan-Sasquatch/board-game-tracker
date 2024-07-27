"use client";
import { Button } from "~/components/ui/button";
import { UpdateUserBoardGamePlayCount } from "./actions";
import { useTransition } from "react";
export function UpdatePlayCountButton({
  boardGameId,
  currentCount,
}: {
  boardGameId: number;
  currentCount: number;
}) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await UpdateUserBoardGamePlayCount(boardGameId, currentCount + 1);
    });
  };
  return (
    <Button disabled={isPending} onClick={onClick} variant="default">
      Add Play
    </Button>
  );
}
