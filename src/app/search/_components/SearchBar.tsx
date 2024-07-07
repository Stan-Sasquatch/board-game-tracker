"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler } from "react";
import { type boardGameSearchParams } from "../models";
import { type DebouncedState, useDebouncedCallback } from "use-debounce";

export function SearchBar() {
  const boardGameNameKey = "boardGameName" satisfies keyof Exclude<
    boardGameSearchParams,
    undefined
  >;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange: DebouncedState<ChangeEventHandler<HTMLInputElement>> =
    useDebouncedCallback((e) => {
      router.replace(`${pathname}?${boardGameNameKey}=${e.target.value}`);
    }, 300);

  return (
    <input
      type="text"
      defaultValue={searchParams.get(boardGameNameKey)?.toString()}
      onChange={onChange}
      className="text-black"
    />
  );
}
