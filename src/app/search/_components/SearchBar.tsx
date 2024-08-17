"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type SearchPageQueryKeys } from "../models";
import { useDebouncedCallback } from "use-debounce";
import { Command, ControlledCommandInput } from "~/components/ui/command";
import { useState, type ChangeEventHandler } from "react";
import { SearchResults } from "./SearchResults";
import { type BoardGameList } from "../page";
import { Button } from "~/components/ui/button";
import { getUrlParam, setUrlParams } from "../utils";

export function SearchBar({
  results,
  children,
}: {
  results: BoardGameList;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const boardGameNameKey = "boardGameName" satisfies SearchPageQueryKeys;
  const boardGameQueryValue = getUrlParam(
    searchParams,
    boardGameNameKey,
  )?.toString();
  const selectedIdFromUrlParams = searchParams.get("selected");

  const [showResults, setShowResults] = useState(
    selectedIdFromUrlParams == null,
  );

  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setShowResults(true);
    router.replace(`${pathname}?${boardGameNameKey}=${e.target.value}`);
  };

  const debouncedOnChange = useDebouncedCallback(handleChange, 300);

  const onResultClick = (id: string) => {
    return () => {
      setShowResults(false);

      const params = new URLSearchParams();
      if (boardGameQueryValue) {
        setUrlParams(params, boardGameNameKey, boardGameQueryValue);
      }

      setUrlParams(params, "selected", id);
      router.replace(`${pathname}?${params.toString()}`);
    };
  };

  function onShowResults() {
    setShowResults(true);
  }

  return (
    <>
      <Command className={"w-72 sm:w-96"}>
        <ControlledCommandInput
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
      {selectedIdFromUrlParams && children}
    </>
  );
}
