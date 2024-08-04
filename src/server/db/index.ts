import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as boardGameSchema from "./schema/boardGame";
import * as userBoardGameSchema from "./schema/userBoardGame";

export const db = drizzle(sql, {
  schema: { ...boardGameSchema, ...userBoardGameSchema },
});
