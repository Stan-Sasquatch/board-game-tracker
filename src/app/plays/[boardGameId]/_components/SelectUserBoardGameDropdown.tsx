"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type UserBoardGameCollectionList } from "../queries";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

export function SelectUserBoardGameDropdown({
  options,
  boardGameId,
}: {
  options: UserBoardGameCollectionList;
  boardGameId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const parsedOptions = [{ value: "all", label: "All" }].concat(
    options
      .map((o) => ({
        value: o.id.toString(),
        label: o.name,
      }))
      .sort(function (a, b) {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      }),
  );

  const value = boardGameId ?? "all";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? parsedOptions.find((boardgame) => boardgame.value === value)
                ?.label
            : "Select boardgame..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command
          filter={(value, search, keywords) => {
            const extendValue = (
              value +
              " " +
              keywords?.join(" ")
            ).toLocaleLowerCase();
            if (extendValue.includes(search.toLocaleLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search boardgame..." className="h-9" />
          <CommandList>
            <CommandEmpty>No boardgame found.</CommandEmpty>
            <CommandGroup>
              {parsedOptions.map((boardgame) => (
                <CommandItem
                  key={boardgame.value}
                  value={boardgame.value}
                  keywords={[boardgame.label]}
                  onSelect={(currentValue) => {
                    if (currentValue === "all") {
                      router.push(`/plays`);
                    } else {
                      router.push(
                        `/plays/${currentValue === value ? "" : currentValue}`,
                      );
                    }

                    setOpen(false);
                  }}
                >
                  {boardgame.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === boardgame.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
