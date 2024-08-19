"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { useForm, useController } from "react-hook-form";
import { DatePicker } from "~/components/ui/date-picker";
import { MultiSelect } from "~/components/ui/multi-select";
import { AddPlayGroupMembers } from "./AddPlayGroupMembers";
import { ChevronUp } from "lucide-react";
import { CreateUserBoardGamePlay } from "../actions";
import { useTransition } from "react";

export type NewPlayer = {
  nickname: string;
  forename?: string;
  surname?: string;
};

export type CreatePlayModel = {
  dateOfPlay: Date;
  players: string[];
  newPlayers: NewPlayer[];
};

export function AddPlayModal({
  boardGameId,
  userBoardGamePlayGroupMembers,
}: {
  boardGameId: number;
  userBoardGamePlayGroupMembers: { nickname: string; id: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlayModel>({
    defaultValues: {
      dateOfPlay: new Date(),
      players: [],
      newPlayers: [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      await CreateUserBoardGamePlay(data, boardGameId);
    });
    reset();
  });

  const { field: dateOfPlay } = useController({
    name: "dateOfPlay",
    control,
    rules: { required: true },
  });

  const { field: players } = useController({
    name: "players",
    control,
  });

  const { field: newPlayers } = useController({
    name: "newPlayers",
    control,
  });

  const playerOptions = userBoardGamePlayGroupMembers.map((u) => ({
    label: u.nickname,
    value: u.id,
  }));

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Play</Button>
        </DialogTrigger>
        <DialogContent className="grid gap-4 px-4 py-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log a play</DialogTitle>
            <DialogDescription>
              Add the details of your play here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 px-2 py-4">
            <h3 className="font-semibold">Date of play</h3>
            <DatePicker setDate={dateOfPlay.onChange} date={dateOfPlay.value} />
            {errors?.dateOfPlay?.message && (
              <div>{errors?.dateOfPlay?.message}</div>
            )}

            <Collapsible>
              <div className="flex">
                <h3 className="self-center font-semibold">Add new players</h3>
                <CollapsibleTrigger className="px-2">
                  <Button type="button" size="sm" variant="outline">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <>
                  {userBoardGamePlayGroupMembers.length > 0 && (
                    <>
                      <h3>
                        Add players from your <b>playgroup</b>
                      </h3>
                      <MultiSelect
                        options={playerOptions}
                        onValueChange={players.onChange}
                        defaultValue={players.value}
                        placeholder="Select players"
                        variant="inverted"
                        maxCount={3}
                      />
                      <div>{errors?.players?.message}</div>
                    </>
                  )}
                  <AddPlayGroupMembers
                    existingNicknames={userBoardGamePlayGroupMembers.map(
                      (pgm) => pgm.nickname,
                    )}
                    onNewPlayersChange={newPlayers.onChange}
                    newPlayGroupMembers={newPlayers.value}
                  />
                </>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <DialogFooter className="flex px-2 py-4">
            <Button
              className="flex-1"
              type="button"
              disabled={isPending}
              onClick={onSubmit}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
