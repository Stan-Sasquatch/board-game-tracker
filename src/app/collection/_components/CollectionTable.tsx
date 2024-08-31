"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/DataTable/data-table";
import { IconSortToggle } from "~/components/ui/DataTable/icon-sort-toggle";
import { AddPlayModal } from "./AddPlayModal";
import { RemoveUserBoardGameButton } from "./RemoveUserBoardGameButton";
import { type Collection } from "../queries";
import Link from "next/link";

export function CollectionTable({ collection }: { collection: Collection }) {
  const columns: ColumnDef<(typeof collection)[number]>[] = [
    {
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <IconSortToggle column={column} headerTitle="Name" />
          </div>
        );
      },
      id: "name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-center">
            <Link
              href={`/collection/${row.original.id}`}
              className="font-semibold text-blue-300 underline transition-all duration-300 ease-in-out hover:text-blue-700 hover:underline-offset-2"
            >
              {row.getValue("name")}
            </Link>
            <div className="py-2 sm:hidden">
              <AddPlayModal
                userBoardGamePlayGroupMembers={[]}
                boardGameId={row.original.id}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <IconSortToggle column={column} headerTitle="Play Count" />
          </div>
        );
      },
      id: "playCount",
      accessorKey: "playCount",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-center">
            <div>{row.getValue("playCount")}</div>
            <div className="py-2 sm:hidden">
              <RemoveUserBoardGameButton boardGameId={row.original.id} />
            </div>
          </div>
        );
      },
    },
    {
      header: () => (
        <div className="hidden justify-center text-white sm:flex">Actions</div>
      ),
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="hidden flex-row sm:flex ">
            <div className="px-4 py-2">
              <AddPlayModal
                userBoardGamePlayGroupMembers={[]}
                boardGameId={row.original.id}
              />
            </div>
            <div className="px-4 py-2">
              <RemoveUserBoardGameButton boardGameId={row.original.id} />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="mb-4 pt-2 text-center text-2xl font-bold">
        Your Collection
      </h1>
      <DataTable columns={columns} data={collection} />
    </div>
  );
}
