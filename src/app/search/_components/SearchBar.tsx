"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { boardGameNameKey } from "../models";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandInput } from "~/components/ui/command";

export function SearchBar({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = useDebouncedCallback((value: string) => {
    router.replace(`${pathname}?${boardGameNameKey}=${value}`);
  }, 300);

  return (
    <Command>
      <CommandInput
        placeholder="Search..."
        defaultValue={searchParams.get(boardGameNameKey)?.toString()}
        onValueChange={onChange}
      />
      {children}
    </Command>
  );
}
