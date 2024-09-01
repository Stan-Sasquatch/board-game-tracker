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

import { useForm, useController, type Control } from "react-hook-form";
import { DatePicker } from "~/components/ui/date-picker";
import { MultiSelect } from "~/components/ui/multi-select";
import { AddPlayGroupMembers } from "./AddPlayGroupMembers";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CreateUserBoardGamePlay } from "../actions";
import { useState, useTransition } from "react";

export type NewPlayer = {
  nickname: string;
  forename: string | null;
  surname: string | null;
};

export type CreatePlayModel = {
  dateOfPlay: Date;
  players: string[];
  newPlayers: NewPlayer[];
};

export function AddPlayModal({
  boardGameId,
  userPlayGroupMembers,
}: {
  boardGameId: number;
  userPlayGroupMembers: { nickname: string; id: number }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parentAddPlayersOpen, setParentAddPlayersOpen] = useState(false);

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
    setDialogOpen(false);
  });

  const { field: dateOfPlay } = useController({
    name: "dateOfPlay",
    control,
    rules: { required: true },
  });

  const playerOptions = userPlayGroupMembers.map((u) => ({
    label: u.nickname,
    value: u.id.toString(),
  }));

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <Collapsible
              open={parentAddPlayersOpen}
              onOpenChange={setParentAddPlayersOpen}
            >
              <div className="flex">
                <h3 className="self-center font-semibold">
                  Add players <span>(optional)</span>
                </h3>
                <CollapsibleContentToggle
                  addNewPlayersOpen={parentAddPlayersOpen}
                />
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

function CollapsibleContentToggle({
  addNewPlayersOpen,
}: {
  addNewPlayersOpen: boolean;
}) {
  return (
    <CollapsibleTrigger className="px-2">
      <Button type="button" size="sm" variant="outline">
        {addNewPlayersOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </CollapsibleTrigger>
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
        <h4>
          Add players from your <b>playgroup</b>
        </h4>
        <CollapsibleContentToggle addNewPlayersOpen={addPlayGroupPlayersOpen} />
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
        <h4>Add new players</h4>
        <CollapsibleContentToggle addNewPlayersOpen={addNewPlayersOpen} />
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
