import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { type BoardGameList } from "../page";
import { useSearchParams } from "next/navigation";
import { boardGameNameKey } from "../models";
import { Button } from "~/components/ui/button";
import { SquareXIcon } from "lucide-react";

export function SearchResults({
  results,
  onResultClick,
  hideSuggestions,
}: {
  results: BoardGameList;
  onResultClick: (id: string) => () => void;
  hideSuggestions: () => void;
}) {
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get(boardGameNameKey);
  return (
    <CommandList>
      {nameQuery && (
        <>
          <CommandEmpty>No results found.</CommandEmpty>
          {results && (
            <CommandGroup
              heading={
                <div className="flex flex-row items-center justify-between">
                  Suggestions
                  <Button
                    onClick={hideSuggestions}
                    variant="outline"
                    size="icon"
                  >
                    <SquareXIcon
                      onClick={hideSuggestions}
                      className="h-4 w-4"
                    />
                  </Button>
                </div>
              }
            >
              {results.map((r) => (
                <CommandItem
                  value={r.id.toString()}
                  key={r.id}
                  onSelect={onResultClick(r.id.toString())}
                >
                  {r.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </>
      )}
    </CommandList>
  );
}
