import { RemoveUserBoardGameButton } from "./_components/RemoveUserBoardGameButton";
import { AddPlayModal } from "./_components/AddPlayModal";
import { collectionOrderBySearchParams } from "./models";
import { SortIcon } from "./_components/SortIcon";
import { GetUserBoardGameCollection } from "./queries";

const pending = "#808080";

export default async function Collection({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const parsedSearchParams = collectionOrderBySearchParams.parse(searchParams);
  const collection = await GetUserBoardGameCollection(parsedSearchParams);

  return (
    <div>
      <h1 className="mb-4 pt-2 text-center text-2xl font-bold">
        Collection, you&apos;re logged in!
      </h1>
      <div className="grid grid-cols-1 gap-4 text-black sm:px-4 sm:py-4">
        <div className="hidden justify-items-center rounded-lg bg-gray-200 font-bold sm:grid sm:grid-cols-4">
          <div className="flex px-4 py-2">
            Name
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"name"}
              colours={{ primary: "#000000", pending }}
            />
          </div>
          <div className="flex px-4 py-2">
            Play Count
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"playCount"}
              colours={{ primary: "#000000", pending }}
            />
          </div>
          <div className="col-span-2 px-4 py-2">Actions </div>
        </div>
        <div className="flex justify-around sm:hidden">
          <div className="flex text-white">
            Name
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"name"}
              colours={{ primary: "#ffffff", pending }}
            />
          </div>
          <div className="flex text-white">
            Play Count
            <SortIcon
              orderBy={parsedSearchParams?.orderBy}
              direction={parsedSearchParams?.direction}
              field={"playCount"}
              colours={{ primary: "#ffffff", pending }}
            />
          </div>
        </div>
        {collection.map((bg) => (
          <div
            key={bg.id}
            className="grid grid-cols-2 items-center justify-items-center rounded-lg bg-gray-400 even:bg-gray-100 sm:grid-cols-4"
          >
            <div className="col-span-2 px-4 py-2 sm:col-span-1">{bg.name}</div>
            <div className="px-4 py-2 sm:hidden">Plays:</div>
            <div className="px-4 py-2">{bg.playCount}</div>
            <div className="px-4 py-2">
              <AddPlayModal
                userBoardGamePlayGroupMembers={[]}
                boardGameId={bg.id}
              />
            </div>
            <div className="px-4 py-2">
              <RemoveUserBoardGameButton boardGameId={bg.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
