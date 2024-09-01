import { type InferInsertModel } from "drizzle-orm";
import { type userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";

export type UserBoardGamePlay = InferInsertModel<typeof userBoardGamePlay>;
