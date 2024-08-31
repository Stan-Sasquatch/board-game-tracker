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
        return <IconSortToggle column={column} headerTitle="Name" />;
      },
      id: "name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/collection/${row.original.id}`}
            className="font-semibold text-blue-300 underline transition-all duration-300 ease-in-out hover:text-blue-700 hover:underline-offset-2"
          >
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      header: ({ column }) => {
        return <IconSortToggle column={column} headerTitle="Play Count" />;
      },
      id: "playCount",
      accessorKey: "playCount",
    },
    {
      header: () => <div className="text-white">Actions</div>,
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row">
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
