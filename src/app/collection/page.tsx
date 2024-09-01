import { collectionOrderBySearchParams } from "./models";
import { GetUserBoardGameCollection, GetUserPlayGroupMembers } from "./queries";
import { CollectionTable } from "./_components/CollectionTable";

export default async function Collection({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = collectionOrderBySearchParams.parse(searchParams);
  const collection = await GetUserBoardGameCollection(parsedSearchParams);
  const userPlayGroupMembers = await GetUserPlayGroupMembers();
  return (
    <CollectionTable
      collection={collection}
      userPlayGroupMembers={userPlayGroupMembers}
    />
  );
}
