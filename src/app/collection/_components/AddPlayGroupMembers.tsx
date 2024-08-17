import { Button } from "~/components/ui/button";
import { type NewPlayer } from "../AddPlayModal";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";

export function AddPlayGroupMembers({
  newPlayGroupMembers,
  onNewPlayersChange,
}: {
  newPlayGroupMembers: NewPlayer[];
  onNewPlayersChange: (newList: NewPlayer[]) => void;
}) {
  function AddNewPlayer(newPlayer: NewPlayer) {
    onNewPlayersChange([...newPlayGroupMembers, newPlayer]);
    reset();
  }

  function RemovePlayer(playerNickName: string) {
    onNewPlayersChange(
      newPlayGroupMembers.filter((pgm) => pgm.nickame != playerNickName),
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPlayer>();
  return (
    <div>
      <div>
        <div className="py-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            type="text"
            id="nickname"
            placeholder="Nickname"
            required
            {...register("nickame", {
              required: "Nickname is required",
              maxLength: 20,
              validate: (value) =>
                !newPlayGroupMembers.map((p) => p.nickame).includes(value) ||
                "Nickname must be unique amongst your playgroup",
            })}
          />
          <Label htmlFor="nickname" className="text-red-600">
            {errors?.nickame?.message}
          </Label>
        </div>
        <div className="py-2">
          <Label htmlFor="forename">Forename</Label>
          <Input
            type="text"
            id="forename"
            placeholder="Forename"
            {...register("forename", {
              maxLength: {
                value: 20,
                message: "Max length is 20",
              },
            })}
          />
          <Label htmlFor="forename" className="text-red-600">
            {errors?.forename?.message}
          </Label>
        </div>
        <div className="py-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            type="text"
            id="surname"
            placeholder="Surname"
            {...register("surname", {
              maxLength: {
                value: 20,
                message: "Max length is 20",
              },
            })}
          />
          <Label htmlFor="surname" className="text-red-600">
            {errors?.surname?.message}
          </Label>
        </div>
      </div>
      <div className="flex">
        <Button
          className="flex-1"
          type="button"
          onClick={handleSubmit(AddNewPlayer)}
        >
          Add Player
        </Button>
      </div>
      {newPlayGroupMembers.length > 0 && (
        <div>
          <h3 className="font-semibold">New players</h3>
          <ul>
            {newPlayGroupMembers.map((pgm) => (
              <li key={pgm.nickame}>
                <span>{pgm.nickame}</span>
                <Button
                  variant={"destructive"}
                  onClick={() => RemovePlayer(pgm.nickame)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
