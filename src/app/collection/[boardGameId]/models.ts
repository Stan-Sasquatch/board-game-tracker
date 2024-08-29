import { type GetUserBoardGameWithPlays } from "./queries";

export type BoardGamePlaysWithPlayers = Awaited<
  ReturnType<typeof GetUserBoardGameWithPlays>
>["userBoardGamePlay"];
