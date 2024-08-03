"use client";

import {
  ArrowUpDown,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { setUrlParams } from "~/app/search/utils";

export function SortIcon({
  orderBy,
  direction,
  field,
  color,
}: {
  orderBy: "name" | "playCount" | undefined;
  direction: "asc" | "desc" | undefined;
  field: "name" | "playCount";
  color?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams();

  function PushQuery() {
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (orderBy !== field || !direction) {
    function onUpDownClick() {
      setUrlParams(params, "orderBy", field);
      setUrlParams(params, "direction", "asc");
      PushQuery();
    }

    return <ArrowUpDown onClick={onUpDownClick} color={color} />;
  }

  if (direction === "asc") {
    function onUpClick() {
      setUrlParams(params, "orderBy", field);
      setUrlParams(params, "direction", "desc");
      PushQuery();
    }

    return <ArrowUpWideNarrow onClick={onUpClick} color={color} />;
  }

  function onDownClick() {
    params.delete("orderBy");
    params.delete("direction");
    PushQuery();
  }

  return <ArrowDownWideNarrow onClick={onDownClick} color={color} />;
}
