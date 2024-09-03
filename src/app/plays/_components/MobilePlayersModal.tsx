"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type AllPlaysTableRow } from "./AllPlaysTable";

export function MobilePlayersModal({ rowData }: { rowData: AllPlaysTableRow }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Show Players</Button>
        </DialogTrigger>
        <DialogContent className="grid gap-4 px-4 py-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Players</DialogTitle>
            <DialogDescription>
              {rowData.userPlayGroupMemberPlay
                .map((upgm) => upgm.userPlayGroupMember.nickname)
                .join(", ")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {rowData.boardGameName} {rowData.dateOfPlay.toDateString()}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
