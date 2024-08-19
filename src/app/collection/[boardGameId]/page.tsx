import { GetUserBoardGameWithPlays } from "./queries";

export default async function Page({
  params,
}: {
  params: { boardGameId: string };
}) {
  const data = await GetUserBoardGameWithPlays(+params?.boardGameId);

  return <div>{data.boardGameId}</div>;
}
