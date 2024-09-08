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
import { Collapsible, CollapsibleContent } from "~/components/ui/collapsible";

import { useForm, useController, type Control } from "react-hook-form";
import { DatePicker } from "~/components/ui/date-picker";
import { MultiSelect } from "~/components/ui/multi-select";
import { AddPlayGroupMembers } from "./AddPlayGroupMembers";
import { CreateUserBoardGamePlay } from "../actions";
import { useState, useTransition } from "react";
import { useToast } from "~/components/ui/use-toast";
import { CollapsibleContentToggle } from "~/components/collapsible-content-toggle";

export type NewPlayer = {
  nickname: string;
};

export type CreatePlayModel = {
  dateOfPlay: Date;
  players: string[];
  newPlayers: NewPlayer[];
};

export function AddPlayModal({
  boardGameId,
  boardGameName,
  userPlayGroupMembers,
}: {
  boardGameId: number;
  boardGameName: string;
  userPlayGroupMembers: { nickname: string; id: number }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parentAddPlayersOpen, setParentAddPlayersOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreatePlayModel>({
    defaultValues: {
      dateOfPlay: new Date(),
      players: [],
      newPlayers: [],
    },
  });
  const { toast } = useToast();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await CreateUserBoardGamePlay(data, boardGameId);
      toast({
        title: result.success ? "Success" : "Uh oh! Something went wrong.",
        description: result.message,
      });
    });
    reset();
    setDialogOpen(false);
  });

  const { field: dateOfPlay } = useController({
    name: "dateOfPlay",
    control,
    rules: {
      required: true,
      validate: (value) => value <= new Date() || "Date can't be in the future",
    },
  });

  const playerOptions = userPlayGroupMembers.map((u) => ({
    label: u.nickname,
    value: u.id.toString(),
  }));

  const onOpenChange = (open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      reset();
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default">Add Play</Button>
        </DialogTrigger>
        <DialogContent className="grid max-h-screen gap-4 overflow-y-scroll px-4 py-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{`Log a play of ${boardGameName}`}</DialogTitle>
            <DialogDescription>
              Add the details of your play here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 px-2 py-4">
            <h3 className="font-semibold">
              Date of play<span className="text-red-600">*</span>
            </h3>
            <DatePicker setDate={dateOfPlay.onChange} date={dateOfPlay.value} />
            {errors?.dateOfPlay?.message && (
              <div className="text-red-600">{errors?.dateOfPlay?.message}</div>
            )}
            <Collapsible
              open={parentAddPlayersOpen}
              onOpenChange={setParentAddPlayersOpen}
            >
              <div className="flex">
                <h3 className="self-center pb-4 pr-2 font-semibold">
                  Add players <span>(optional)</span>
                </h3>
                <CollapsibleContentToggle open={parentAddPlayersOpen} />
              </div>
              <CollapsibleContent>
                <>
                  {userPlayGroupMembers.length > 0 && (
                    <AddPlayersFromPlayGroup
                      playerOptions={playerOptions}
                      control={control}
                      playersErrorMessage={errors?.players?.message}
                    />
                  )}
                  <AddNewPlayers
                    control={control}
                    userPlayGroupMembers={userPlayGroupMembers}
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

function AddPlayersFromPlayGroup({
  playerOptions,
  control,
  playersErrorMessage,
}: {
  playerOptions: {
    label: string;
    value: string;
  }[];
  control: Control<CreatePlayModel> | undefined;
  playersErrorMessage: string | undefined;
}) {
  const [addPlayGroupPlayersOpen, setAddPlayGroupPlayersOpen] = useState(false);
  const { field: players } = useController({
    name: "players",
    control,
  });

  return (
    <Collapsible
      open={addPlayGroupPlayersOpen}
      onOpenChange={setAddPlayGroupPlayersOpen}
    >
      <div className="flex">
        <div className="flex flex-col pb-2">
          <h4 className="pr-2">
            Add players from your <b>playgroup</b>
          </h4>
          {players.value.length > 0 && (
            <div className="font-medium text-green-700">
              {players.value.length} players added
            </div>
          )}
        </div>
        <CollapsibleContentToggle open={addPlayGroupPlayersOpen} />
      </div>
      <CollapsibleContent className="py-4">
        <MultiSelect
          options={playerOptions}
          onValueChange={players.onChange}
          defaultValue={players.value}
          placeholder="Select players"
          variant="inverted"
          maxCount={3}
        />
        <div>{playersErrorMessage}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function AddNewPlayers({
  control,
  userPlayGroupMembers,
}: {
  control: Control<CreatePlayModel> | undefined;
  userPlayGroupMembers: { nickname: string; id: number }[];
}) {
  const [addNewPlayersOpen, setAddNewPlayersOpen] = useState(false);

  const { field: newPlayers } = useController({
    name: "newPlayers",
    control,
  });
  return (
    <Collapsible open={addNewPlayersOpen} onOpenChange={setAddNewPlayersOpen}>
      <div className="flex">
        <div className="flex flex-col pb-2">
          <h4 className="pr-2">Add new players</h4>
          {newPlayers.value.length > 0 && (
            <div className="font-medium text-green-700">
              {newPlayers.value.length} players added
            </div>
          )}
        </div>
        <CollapsibleContentToggle open={addNewPlayersOpen} />
      </div>
      <CollapsibleContent>
        <AddPlayGroupMembers
          existingNicknames={userPlayGroupMembers.map((pgm) => pgm.nickname)}
          onNewPlayersChange={newPlayers.onChange}
          newPlayGroupMembers={newPlayers.value}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
