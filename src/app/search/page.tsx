import { SearchBar } from "./_components/SearchBar";
import { db } from "~/server/db";
import { boardGameSearchParamsSchema } from "./models";
import { boardGame } from "~/server/db/schema";
import { sql } from "drizzle-orm";

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = boardGameSearchParamsSchema.parse(searchParams);

  const results = await GetBoardgames(parsedSearchParams);

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar />
      {results && (
        <ul>
          {results.map((r) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
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
