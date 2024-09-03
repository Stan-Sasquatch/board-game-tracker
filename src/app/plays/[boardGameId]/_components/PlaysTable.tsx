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
  accessorFn: (play) => play.dateOfPlay.toDateString(),
  cell: ({ row }: { row: Row<PlayTableRow> }) => {
    return <div className="text-center">{row.getValue("dateOfPlay")}</div>;
  },
};

export const playsTableColumns: ColumnDef<PlayTableRow>[] = [
  dateOfPlayColumn,
  {
    header: () => <div className="text-white">Players</div>,
    id: "players",
    accessorFn: (play) =>
      play.userPlayGroupMemberPlay.length > 0
        ? play.userPlayGroupMemberPlay
            .map((p) => p.userPlayGroupMember.nickname)
            .join(", ")
        : "No players recorded",
  },
];

export function PlaysTable({
  boardGamePlays,
}: {
  boardGamePlays: PlayTableRow[];
}) {
  return (
    <div className="flex px-8 text-white">
      <DataTable columns={playsTableColumns} data={boardGamePlays} />
    </div>
  );
}
