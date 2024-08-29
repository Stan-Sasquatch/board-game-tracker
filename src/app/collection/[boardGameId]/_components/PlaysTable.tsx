import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type BoardGamePlaysWithPlayers } from "../models";

export function PlaysTable({
  boardGamePlays,
  boardGameName,
}: {
  boardGamePlays: BoardGamePlaysWithPlayers;
  boardGameName: string;
}) {
  return (
    <div className="flex">
      <Table>
        <TableCaption>
          A list of your recent plays of {boardGameName}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date of play</TableHead>
            <TableHead>Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {boardGamePlays.map((play) => (
            <TableRow key={play.id}>
              <TableCell className="font-medium">
                {play.dateOfPlay.toDateString()}
              </TableCell>
              <TableCell>
                <Table>
                  <TableRow>
                    {play.userPlayGroupMemberPlay.map((p) => (
                      <TableCell key={p.userPlayGroupMember.nickname}>
                        {p.userPlayGroupMember.nickname}
                      </TableCell>
                    ))}
                  </TableRow>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{boardGamePlays.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
