import { Button } from "~/components/ui/button";
import { type NewPlayer } from "./AddPlayModal";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";

export function AddPlayGroupMembers({
  newPlayGroupMembers,
  onNewPlayersChange,
  existingNicknames,
}: {
  newPlayGroupMembers: NewPlayer[];
  onNewPlayersChange: (newList: NewPlayer[]) => void;
  existingNicknames: string[];
}) {
  function AddNewPlayer(newPlayer: NewPlayer) {
    onNewPlayersChange([...newPlayGroupMembers, newPlayer]);
    reset();
  }

  function RemovePlayer(playerNickName: string) {
    onNewPlayersChange(
      newPlayGroupMembers.filter((pgm) => pgm.nickname != playerNickName),
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPlayer>({
    defaultValues: {
      nickname: "",
      forename: null,
      surname: null,
    },
  });
  return (
    <div>
      <div>
        <div className="py-2">
          <Label aria-required htmlFor="nickname">
            Nickname<span className="text-red-600">*</span>
          </Label>
          <Input
            type="text"
            id="nickname"
            placeholder="Nickname"
            required
            {...register("nickname", {
              required: "Nickname is required",
              maxLength: 20,
              validate: (value) =>
                !newPlayGroupMembers
                  .map((p) => p.nickname)
                  .concat(existingNicknames)
                  .includes(value) ||
                "Nickname must be unique amongst your playgroup",
            })}
          />
          <Label htmlFor="nickname" className="text-red-600">
            {errors?.nickname?.message}
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
          <h3 className="py-2 font-semibold">New players</h3>
          <ul>
            {newPlayGroupMembers.map((pgm) => (
              <li
                key={pgm.nickname}
                className="flex items-center justify-between gap-4"
              >
                <span>{pgm.nickname}</span>
                <Button
                  variant={"destructive"}
                  onClick={() => RemovePlayer(pgm.nickname)}
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
