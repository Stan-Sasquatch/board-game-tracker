"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/DataTable/data-table";
import { IconSortToggle } from "~/components/ui/DataTable/icon-sort-toggle";

export type PlayTableRow = {
  dateOfPlay: Date;
  userPlayGroupMemberPlay: {
    userPlayGroupMember: {
      nickname: string;
    };
  }[];
};
export const dateOfPlayColumn: ColumnDef<PlayTableRow> = {
  header: ({ column }) => {
    return <IconSortToggle column={column} headerTitle={"Date of play"} />;
  },
  id: "dateOfPlay",
  sortingFn: "datetime",
  accessorFn: (play) => play.dateOfPlay.toLocaleDateString(),
  cell: ({ row }: { row: Row<PlayTableRow> }) => {
    return <div className="text-center">{row.getValue("dateOfPlay")}</div>;
  },
};

export const playsTableColumns: ColumnDef<PlayTableRow>[] = [
  dateOfPlayColumn,
  {
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <IconSortToggle column={column} headerTitle={"Players"} />
        </div>
      );
    },
    id: "players",
    sortingFn: (rowA, rowB) => {
      if (
        rowA.original.userPlayGroupMemberPlay.length >
        rowB.original.userPlayGroupMemberPlay.length
      ) {
        return 1;
      }
      if (
        rowA.original.userPlayGroupMemberPlay.length <
        rowB.original.userPlayGroupMemberPlay.length
      ) {
        return -1;
      }

      return 0;
    },
    accessorFn: (play) =>
      play.userPlayGroupMemberPlay.length > 0
        ? play.userPlayGroupMemberPlay
            .map((p) => p.userPlayGroupMember.nickname)
            .join(", ")
        : "No players recorded",

    cell: ({ row }: { row: Row<PlayTableRow> }) => {
      return <div className="text-center">{row.getValue("players")}</div>;
    },
  },
];

export function PlaysTable({
  boardGamePlays,
}: {
  boardGamePlays: PlayTableRow[];
}) {
  return (
    <div className="flex px-8 text-white">
      {/* Mobile Table */}
      <div className="sm:hidden">
        <DataTable
          columns={playsTableColumns}
          data={boardGamePlays}
          pageSize={5}
        />
      </div>
      {/* Desktop Table */}
      <div className={"hidden sm:table"}>
        <DataTable columns={playsTableColumns} data={boardGamePlays} />
      </div>
    </div>
  );
}
