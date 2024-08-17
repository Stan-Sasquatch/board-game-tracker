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

import { useForm, useController } from "react-hook-form";
import { DatePicker } from "~/components/ui/date-picker";
import { MultiSelect } from "~/components/ui/multi-select";
import { AddPlayGroupMembers } from "./_components/AddPlayGroupMembers";

export type NewPlayer = {
  nickame: string;
  forename?: string;
  surname?: string;
};

type CreatePlayModel = {
  dateOfPlay: Date;
  players: string[];
  newPlayers: NewPlayer[];
};

export function AddPlayModal({
  userBoardGamePlayGroupMembers,
}: {
  userBoardGamePlayGroupMembers: { name: string; id: string }[];
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlayModel>({
    defaultValues: {
      dateOfPlay: new Date(),
      players: [],
      newPlayers: [],
    },
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
    label: u.name,
    value: u.id,
  }));

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Play</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <DialogHeader>
              <DialogTitle>Log a play</DialogTitle>
              <DialogDescription>
                Add the details of your play here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <h3>Date of play</h3>
              <DatePicker
                setDate={dateOfPlay.onChange}
                date={dateOfPlay.value}
              />
              <div>{errors?.dateOfPlay?.message}</div>
              <div>
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
              </div>
              <div>
                <AddPlayGroupMembers
                  onNewPlayersChange={newPlayers.onChange}
                  newPlayGroupMembers={newPlayers.value}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
