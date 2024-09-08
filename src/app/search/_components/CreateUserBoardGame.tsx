"use client";
import { createUserBoardGame } from "../actions";
import { useFormState } from "react-dom";
import { useToast } from "~/components/ui/use-toast";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";

export function CreateUserBoardGame({
  parsedId,
  userOwnedBoardGameIds,
  boardGameName,
}: {
  parsedId: number;
  userOwnedBoardGameIds: number[] | null;
  boardGameName: string;
}) {
  const [saveResponseKey, setSaveResponseKey] = useState<string | null>(null);

  return (
    <ToastWrappedCreateBoardGame
      parsedId={parsedId}
      userOwnedBoardGameIds={userOwnedBoardGameIds}
      boardGameName={boardGameName}
      setSaveResponseKey={setSaveResponseKey}
      key={saveResponseKey}
    />
  );
}

function ToastWrappedCreateBoardGame({
  parsedId,
  userOwnedBoardGameIds,
  setSaveResponseKey,
  boardGameName,
}: {
  parsedId: number;
  userOwnedBoardGameIds: number[] | null;
  boardGameName: string;
  setSaveResponseKey: Dispatch<SetStateAction<string | null>>;
}) {
  const createBoardGame = createUserBoardGame.bind(null, parsedId);
  const [state, action] = useFormState(createBoardGame, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success
          ? "Saved to collection"
          : "Uh oh! Something went wrong.",
        description: state.message,
      });

      setSaveResponseKey(state.message);
    }
  }, [setSaveResponseKey, state?.message, state?.success, toast]);

  if (userOwnedBoardGameIds?.includes(parsedId)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div>You own this boardgame!</div>
        <Link className="text-blue-300 underline" href={`/plays/${parsedId}`}>
          {`View plays for ${boardGameName}`}
        </Link>
        <Link className="text-blue-300 underline" href={"/collection"}>
          View your collection
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <form action={action}>
        <SubmitButton buttonText="Add to collection" />
      </form>
    </div>
  );
}
