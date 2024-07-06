"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler } from "react";
import { type boardGameSearchParams } from "../models";

export function SearchBar() {
  const boardGameNameKey = "boardGameName" satisfies keyof Exclude<
    boardGameSearchParams,
    undefined
  >;
  const searchParams = useSearchParams();
  const router = useRouter();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    router.replace(`/search?${boardGameNameKey}=${e.target.value}`);
  };

  const searchValue = searchParams.get(boardGameNameKey) ?? "";
  return (
    <input
      type="text"
      value={searchValue}
      onChange={onChange}
      className="text-black"
    />
  );
}
