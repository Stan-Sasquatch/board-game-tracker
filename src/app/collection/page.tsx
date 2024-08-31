import { collectionOrderBySearchParams } from "./models";
import { GetUserBoardGameCollection } from "./queries";
import { CollectionTable } from "./_components/CollectionTable";

export default async function Collection({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = collectionOrderBySearchParams.parse(searchParams);
  const collection = await GetUserBoardGameCollection(parsedSearchParams);
  return <CollectionTable collection={collection} />;
}
