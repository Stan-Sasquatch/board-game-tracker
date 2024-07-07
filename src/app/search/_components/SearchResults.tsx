"use client";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { type BoardGameList } from "../page";
import { useSearchParams } from "next/navigation";
import { boardGameNameKey } from "../models";

export function SearchResults({ results }: { results: BoardGameList }) {
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get(boardGameNameKey);
  return (
    <CommandList>
      {nameQuery && (
        <>
          <CommandEmpty>No results found.</CommandEmpty>
          {results && (
            <CommandGroup heading="Suggestions">
              {results.map((r) => (
                <CommandItem key={r.id}>{r.name}</CommandItem>
              ))}
            </CommandGroup>
          )}
        </>
      )}
    </CommandList>
  );
}
