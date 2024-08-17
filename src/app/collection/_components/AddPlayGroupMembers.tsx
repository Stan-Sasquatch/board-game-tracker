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
  } = useForm<NewPlayer>();

  return (
    <div>
      <h3>Add new players</h3>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          type="text"
          id="nickname"
          placeholder="Nickname"
          required
          {...register("nickame", {
            required: true,
            maxLength: 20,
            validate: (value) =>
              !newPlayGroupMembers.map((p) => p.nickame).includes(value) ||
              "Nickname must be unique amongst your playgroup",
          })}
        />
        {errors?.nickame?.message && (
          <Label htmlFor="nickname">{errors?.nickame?.message}</Label>
        )}
        <Label htmlFor="forename">Forename</Label>
        <Input
          type="text"
          id="forename"
          placeholder="Forename"
          {...register("forename", { maxLength: 20 })}
        />
        {errors?.forename?.message && (
          <Label htmlFor="forename">{errors?.forename?.message}</Label>
        )}
        <Label htmlFor="surname">Surname</Label>
        <Input
          type="text"
          id="surname"
          placeholder="Surname"
          {...(register("surname"), { maxLength: 20 })}
        />
        {errors?.surname?.message && (
          <Label htmlFor="surname">{errors?.surname?.message}</Label>
        )}
      </div>
      <Button type="button" onClick={handleSubmit(AddNewPlayer)}>
        Add Player
      </Button>
      <div>
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
    </div>
  );
}
