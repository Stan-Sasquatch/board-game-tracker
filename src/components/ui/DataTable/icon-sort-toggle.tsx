import { type Column } from "@tanstack/react-table";
import { Button } from "../button";
import { SortIcon } from "../sort-icon";

export function IconSortToggle<T extends object>({
  column,
  headerTitle,
}: {
  column: Column<T>;
  headerTitle: string;
}) {
  return (
    <Button
      className="text-white"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {headerTitle}
      <SortIcon sortDirection={column.getIsSorted()} />
    </Button>
  );
}
