import { SearchBar } from "./_components/SearchBar";
import { db } from "~/server/db";
import { boardGameSearchParamsSchema } from "./models";
import { boardGame } from "~/server/db/schema";
import { sql } from "drizzle-orm";
import { SelectedBoardGame } from "./_components/SelectedBoardGame";

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = boardGameSearchParamsSchema.parse(searchParams);

  const results = await GetBoardgames(parsedSearchParams);
  console.log(parsedSearchParams?.selected);
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:w-2/3 sm:p-24">
      <SearchBar results={results} key={parsedSearchParams?.selected}>
        <SelectedBoardGame searchParams={parsedSearchParams} />
      </SearchBar>
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

  return await db
    .select()
    .from(boardGame)
    .where(
      sql`LOWER(name) LIKE ${"%" + parsedSearchParams.boardGameName.toLowerCase() + "%"}`,
    )
    .limit(10);
}
