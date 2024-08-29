import { PlaysTable } from "./_components/PlaysTable";
import { GetUserBoardGameWithPlays } from "./queries";

export default async function Page({
  params,
}: {
  params: { boardGameId: string };
}) {
  const data = await GetUserBoardGameWithPlays(+params?.boardGameId);

  return (
    <PlaysTable
      boardGamePlays={data.userBoardGamePlay}
      boardGameName={data.boardGame.name}
    />
  );
}
