import { SearchBar } from "./_components/SearchBar";
import { db } from "~/server/db";
import { boardGameSearchParamsSchema } from "./models";
import { boardGame } from "~/server/db/schema/boardGame";
import { sql, and, gt, asc, eq } from "drizzle-orm";
import { SelectedBoardGame } from "./_components/SelectedBoardGame";
import { SearchInfoModal } from "./_components/SearchInfoModal";

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = boardGameSearchParamsSchema.parse(searchParams);
  const results = await GetBoardgames(parsedSearchParams);
  return (
    <div className="flex flex-row items-end pt-24">
      <div className="flex flex-col items-center justify-center">
        <SearchBar results={results} key={parsedSearchParams?.selected}>
          <SelectedBoardGame searchParams={parsedSearchParams} />
        </SearchBar>
      </div>
      <div className="self-start px-2">
        <SearchInfoModal />
      </div>
    </div>
  );
}

export type BoardGameList = Awaited<ReturnType<typeof GetBoardgames>>;
async function GetBoardgames(
  parsedSearchParams: { boardGameName?: string | undefined } | undefined,
) {
  if (!parsedSearchParams?.boardGameName) {
    return null;
  }

  const rankedResult = await db
    .select()
    .from(boardGame)
    .where(
      and(
        sql`LOWER(name) LIKE ${"%" + parsedSearchParams.boardGameName.toLowerCase() + "%"}`,
        gt(boardGame.rank, 0),
      ),
    )
    .orderBy(asc(boardGame.rank), asc(boardGame.name))
    .limit(10);

  if (rankedResult.length >= 10) {
    return rankedResult;
  }

  // boardgames without a rank have value zero on boardgame geek so we do the same
  // we sort by rank but exclude 0 unless we have less than 10 results as we want the rank zeros last not first
  const unrankedResult = await db
    .select()
    .from(boardGame)
    .where(
      and(
        sql`LOWER(name) LIKE ${"%" + parsedSearchParams.boardGameName.toLowerCase() + "%"}`,
        eq(boardGame.rank, 0),
      ),
    )
    .orderBy(asc(boardGame.name))
    .limit(10 - rankedResult.length);

  const concatenatedResult = rankedResult.concat(unrankedResult);

  if (concatenatedResult.length > 10) {
    throw new Error("Result count should not be more than 10");
  }
  return concatenatedResult;
}
