"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Info } from "lucide-react";

export function SearchInfoModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-11 text-black" type="button" variant="outline">
            <Info size={15} />
          </Button>
        </DialogTrigger>
        <DialogContent className="grid gap-4 px-4 py-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Info</DialogTitle>
            <DialogDescription className="text-center">
              Search for board games you own here
            </DialogDescription>
            <DialogDescription className="text-center">
              You will need to log in to save games to your collection
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
