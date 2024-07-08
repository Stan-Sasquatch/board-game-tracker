"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type BoardGame, boardGameNameKey } from "../models";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandInput } from "~/components/ui/command";
import { useState, type ChangeEventHandler } from "react";
import { SearchResults } from "./SearchResults";
import { type BoardGameList } from "../page";
import { Button } from "~/components/ui/button";
import { SelectedBoardGame } from "./SelectedBoardGame";

export function SearchBar({ results }: { results: BoardGameList }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const boardGameQueryValue = searchParams.get(boardGameNameKey)?.toString();
  const selectedIdFromUrlParams = searchParams.get("selected");
  const initialSelectedBoardGame =
    results?.find((r) => r.id.toString() == selectedIdFromUrlParams) ?? null;
  const [selectedBoardGame, setSelectedBoardGame] = useState<BoardGame | null>(
    initialSelectedBoardGame,
  );

  const [showResults, setShowResults] = useState(
    initialSelectedBoardGame == null,
  );

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
      router.replace(`${pathname}?${boardGameNameKey}=${boardGameQueryValue}`);
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
          defaultValue={boardGameQueryValue}
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
            {`Show results for "${boardGameQueryValue}"`}
          </Button>
        )}
      </Command>
      {selectedBoardGame && <SelectedBoardGame boardGame={selectedBoardGame} />}
    </>
  );
}
