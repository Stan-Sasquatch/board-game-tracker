"use client";
import { type BoardGamePlaysWithPlayers } from "../models";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { SortIcon } from "~/components/ui/sort-icon";

export function PlaysTable({
  boardGamePlays,
}: {
  boardGamePlays: BoardGamePlaysWithPlayers[];
}) {
  const columns: ColumnDef<BoardGamePlaysWithPlayers>[] = [
    {
      header: ({ column }) => {
        console.log(column.getIsSorted());
        return (
          <Button
            className="text-white"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date of play
            <SortIcon sortDirection={column.getIsSorted()} />
          </Button>
        );
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
