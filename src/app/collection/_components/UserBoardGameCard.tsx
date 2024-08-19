import Link from "next/link";
import { AddPlayModal } from "./AddPlayModal";
import { RemoveUserBoardGameButton } from "./RemoveUserBoardGameButton";

export function UserBoardGameCard({
  boardGame,
}: {
  boardGame: { id: number; name: string; playCount: number };
}) {
  return (
    <div
      key={boardGame.id}
      className="grid grid-cols-2 items-center justify-items-center rounded-lg bg-gray-400 even:bg-gray-100 sm:grid-cols-4"
    >
      <div className="col-span-2 px-4 py-2 sm:col-span-1">{boardGame.name}</div>
      <div className="px-4 py-2 sm:hidden">Plays:</div>
      <div className="px-4 py-2">
        <Link href={`/collection/${boardGame.id}`}>{boardGame.playCount}</Link>
      </div>
      <div className="px-4 py-2">
        <AddPlayModal
          userBoardGamePlayGroupMembers={[]}
          boardGameId={boardGame.id}
        />
      </div>
      <div className="px-4 py-2">
        <RemoveUserBoardGameButton boardGameId={boardGame.id} />
      </div>
    </div>
  );
}
