"use client";
import { type BoardGamePlaysWithPlayers } from "../models";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/DataTable/data-table";
import { IconSortToggle } from "~/components/ui/DataTable/icon-sort-toggle";

export function PlaysTable({
  boardGamePlays,
}: {
  boardGamePlays: BoardGamePlaysWithPlayers[];
}) {
  const columns: ColumnDef<BoardGamePlaysWithPlayers>[] = [
    {
      header: ({ column }) => {
        console.log(column.getIsSorted());
        return <IconSortToggle column={column} headerTitle={"Date of play"} />;
      },
      id: "dateOfPlay",
      sortingFn: "datetime",
      accessorFn: (play) => play.dateOfPlay.toDateString(),
    },
    {
      header: () => <div className="text-white">Players</div>,
      id: "players",
      accessorFn: (play) =>
        play.userPlayGroupMemberPlay
          .map((p) => p.userPlayGroupMember.nickname)
          .join(", "),
    },
  ];

  return (
    <div className="flex text-white">
      <DataTable columns={columns} data={boardGamePlays} />
    </div>
  );
}
