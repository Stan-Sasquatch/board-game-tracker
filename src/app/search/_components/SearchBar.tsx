"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type BoardGame, boardGameNameKey } from "../models";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandInput } from "~/components/ui/command";
import { useRef, useState, type ChangeEventHandler } from "react";
import { SearchResults } from "./SearchResults";
import { type BoardGameList } from "../page";
import { Button } from "~/components/ui/button";

export function SearchBar({ results }: { results: BoardGameList }) {
  const [selectedBoardGame, setSelectedBoardGame] = useState<BoardGame | null>(
    null,
  );

  const [showResults, setShowResults] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setShowResults(true);
    router.replace(`${pathname}?${boardGameNameKey}=${e.target.value}`);
  };

  const debouncedOnChange = useDebouncedCallback(handleChange, 300);

  const onResultClick = (id: string) => {
    return () => {
      setSelectedBoardGame(
        results?.find((r) => r.id == parseInt(id, 10)) ?? null,
      );
      setShowResults(false);
    };
  };

  function onShowResults() {
    setShowResults(true);
  }

  return (
    <>
      <Command className={"w-72 sm:w-96"}>
        <CommandInput
          placeholder="Search"
          defaultValue={searchParams.get(boardGameNameKey)?.toString()}
          onChange={debouncedOnChange}
        />
        {showResults ? (
          <SearchResults
            results={results}
            onResultClick={onResultClick}
            hideSuggestions={() => setShowResults(false)}
          />
        ) : (
          <Button variant="secondary" onClick={onShowResults}>
            {`Show results for "${searchParams.get(boardGameNameKey)?.toString()}"`}
          </Button>
        )}
      </Command>
      {selectedBoardGame && <div>{`Selected ${selectedBoardGame?.name}`}</div>}
    </>
  );
}
