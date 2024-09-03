import { PlaysTable } from "./_components/PlaysTable";
import { SelectUserBoardGameDropdown } from "./_components/SelectUserBoardGameDropdown";
import {
  GetUserBoardGameCollectionList,
  GetUserBoardGameWithPlays,
} from "./queries";

export default async function Page({
  params,
}: {
  params: { boardGameId: string };
}) {
  const data = await GetUserBoardGameWithPlays(+params?.boardGameId);

  return (
    <div className="flex flex-col items-center py-4">
      <SelectUserBoardGameDropdownWrapper boardGameId={params.boardGameId} />
      <>
        <h1 className="py-2">Your plays of &#39;{data.boardGame.name}&#39;</h1>
        <PlaysTable boardGamePlays={data.userBoardGamePlay} />
      </>
    </div>
  );
}

export async function SelectUserBoardGameDropdownWrapper({
  boardGameId,
}: {
  boardGameId: string;
}) {
  const userBoardGameOptions = await GetUserBoardGameCollectionList();

  return (
    <div className="text-black">
      <SelectUserBoardGameDropdown
        options={userBoardGameOptions}
        boardGameId={boardGameId}
      />
    </div>
  );
}
