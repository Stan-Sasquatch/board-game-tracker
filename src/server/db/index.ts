import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as boardGameSchema from "./schema/boardGame";
import * as userBoardGameSchema from "./schema/userBoardGame";
import * as userBoardGamePlaySchema from "./schema/userBoardGamePlay";
import * as userPlayGroupMember from "./schema/userPlayGroupMember";
import * as userPlayGroupMemberPlay from "./schema/userPlayGroupMemberPlay";

export const db = drizzle(sql, {
  schema: {
    ...boardGameSchema,
    ...userBoardGameSchema,
    ...userBoardGamePlaySchema,
    ...userPlayGroupMember,
    ...userPlayGroupMemberPlay,
  },
});
