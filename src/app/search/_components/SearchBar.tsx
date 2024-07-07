"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { boardGameNameKey } from "../models";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandInput } from "~/components/ui/command";
import { type ChangeEventHandler } from "react";

export function SearchBar({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    router.replace(`${pathname}?${boardGameNameKey}=${e.target.value}`);
  };

  const debouncedOnChange = useDebouncedCallback(handleChange, 300);

  return (
    <Command className={"w-72 sm:w-96"}>
      <CommandInput
        defaultValue={searchParams.get(boardGameNameKey)?.toString()}
        onChange={debouncedOnChange}
      />
      {children}
    </Command>
  );
}
