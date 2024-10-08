import {
  GetUserBoardGameCollectionDetail,
  GetUserPlayGroupMembers,
} from "./queries";
import { CollectionTable } from "./_components/CollectionTable";

export default async function Collection() {
  const collection = await GetUserBoardGameCollectionDetail();
  const userPlayGroupMembers = await GetUserPlayGroupMembers();
  return (
    <CollectionTable
      collection={collection}
      userPlayGroupMembers={userPlayGroupMembers}
    />
  );
}
