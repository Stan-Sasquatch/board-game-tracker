import { SelectUserBoardGameDropdownWrapper } from "./[boardGameId]/page";
import { AllPlaysTable } from "./_components/AllPlaysTable";
import { GetAllUserBoardGamesWithPlays } from "./queries";

export default async function Page({
  params,
}: {
  params: { boardGameId: string };
}) {
  const data = await GetAllUserBoardGamesWithPlays();

  return (
    <div className="flex flex-col items-center py-4">
      <SelectUserBoardGameDropdownWrapper boardGameId={params.boardGameId} />
      <div className={"py-4"}>
        <AllPlaysTable
          boardGamePlays={data.map((i) => ({
            dateOfPlay: i.dateOfPlay,
            userPlayGroupMemberPlay: i.userPlayGroupMemberPlay,
            boardGameName: i.userBoardGame.boardGame.name,
          }))}
        />
      </div>
    </div>
  );
}
