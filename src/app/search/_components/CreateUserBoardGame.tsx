"use client";
import { createUserBoardGame } from "../actions";
import { SubmitButton } from "~/app/_components/SubmitButton";
import { useFormState } from "react-dom";
import { useToast } from "~/components/ui/use-toast";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function CreateUserBoardGame({ parsedId }: { parsedId: number }) {
  const [saveResponseKey, setSaveResponseKey] = useState<string | null>(null);

  return (
    <ToastWrappedCreateBoardGame
      parsedId={parsedId}
      setSaveResponseKey={setSaveResponseKey}
      key={saveResponseKey}
    />
  );
}

function ToastWrappedCreateBoardGame({
  parsedId,
  setSaveResponseKey,
}: {
  parsedId: number;
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

  return (
    <div className="flex justify-center">
      <form action={action}>
        <SubmitButton buttonText="Add to collection" />
      </form>
    </div>
  );
}
