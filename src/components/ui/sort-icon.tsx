import { type SortDirection } from "@tanstack/react-table";
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from "lucide-react";

export function SortIcon({
  sortDirection,
}: {
  sortDirection: false | SortDirection;
}) {
  if (!sortDirection) {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }

  if (sortDirection === "asc") {
    return <ArrowUpWideNarrow className="ml-2 h-4 w-4" />;
  }

  return <ArrowDownWideNarrow className="ml-2 h-4 w-4" />;
}
