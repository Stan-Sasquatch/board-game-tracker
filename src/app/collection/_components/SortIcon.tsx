"use client";

import {
  ArrowUpDown,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { setUrlParams } from "~/app/search/utils";
import { useTransition } from "react";

export function SortIcon({
  orderBy,
  direction,
  field,
  colours,
}: {
  orderBy: "name" | "playCount" | undefined;
  direction: "asc" | "desc" | undefined;
  field: "name" | "playCount";
  colours: { pending: string; primary: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams();
  const [isPending, startTransition] = useTransition();

  const calculatedColour = isPending ? colours.pending : colours.primary;
  function PushQuery() {
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (orderBy !== field || !direction) {
    function onUpDownClick() {
      if (isPending) {
        return;
      }

      startTransition(() => {
        setUrlParams(params, "orderBy", field);
        setUrlParams(params, "direction", "asc");
        PushQuery();
      });
    }

    return (
      <ArrowUpDown
        onClick={onUpDownClick}
        color={calculatedColour}
        aria-disabled={isPending}
      />
    );
  }

  if (direction === "asc") {
    function onUpClick() {
      if (isPending) {
        return;
      }

      startTransition(() => {
        setUrlParams(params, "orderBy", field);
        setUrlParams(params, "direction", "desc");
        PushQuery();
      });
    }

    return <ArrowUpWideNarrow onClick={onUpClick} color={calculatedColour} />;
  }

  function onDownClick() {
    if (isPending) {
      return;
    }

    startTransition(() => {
      params.delete("orderBy");
      params.delete("direction");
      PushQuery();
    });
  }

  return <ArrowDownWideNarrow onClick={onDownClick} color={calculatedColour} />;
}
