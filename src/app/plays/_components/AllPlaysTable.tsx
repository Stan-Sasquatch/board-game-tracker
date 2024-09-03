"use client";
import { DataTable } from "~/components/ui/DataTable/data-table";
import {
  dateOfPlayColumn,
  playsTableColumns,
  type PlayTableRow,
} from "../[boardGameId]/_components/PlaysTable";
import { IconSortToggle } from "~/components/ui/DataTable/icon-sort-toggle";
import { type Row, type ColumnDef } from "@tanstack/react-table";
import { MobilePlayersModal } from "./MobilePlayersModal";

export type AllPlaysTableRow = PlayTableRow & { boardGameName?: string };
export function AllPlaysTable({
  boardGamePlays,
}: {
  boardGamePlays: AllPlaysTableRow[];
}) {
  const columnsWithName: ColumnDef<AllPlaysTableRow> = {
    header: ({ column }) => {
      return <IconSortToggle column={column} headerTitle={"Name"} />;
    },
    id: "name",
    accessorFn: (play) => play.boardGameName,
  };

  const mobileDateOfPlayColumn = {
    ...dateOfPlayColumn,
    cell: ({ row }: { row: Row<AllPlaysTableRow> }) => {
      return (
        <div className="flex flex-col gap-2 px-4">
          <div className="text-center">{row.getValue("dateOfPlay")}</div>
          {row.original.userPlayGroupMemberPlay.length ? (
            <div>
              <MobilePlayersModal rowData={row.original} />
            </div>
          ) : (
            <div className="text-center">No players recorded</div>
          )}
        </div>
      );
    },
  };

  return (
    <div className="flex px-8 text-white">
      <div className="sm:hidden">
        <DataTable
          columns={[columnsWithName, mobileDateOfPlayColumn]}
          data={boardGamePlays}
        />
      </div>
      <div className={"hidden sm:table"}>
        <DataTable
          columns={[columnsWithName, ...Array.from(playsTableColumns)]}
          data={boardGamePlays}
        />
      </div>
    </div>
  );
}
