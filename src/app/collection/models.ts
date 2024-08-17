import { type InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { type userBoardGamePlay } from "~/server/db/schema/userBoardGamePlay";

export type CollectionQueryKeys = keyof Exclude<
  CollectionOrderBySearchParams,
  undefined
>;
export const collectionOrderBySearchParams = z
  .object({
    orderBy: z.enum(["name", "playCount"]).optional(),
    direction: z.enum(["asc", "desc"]).optional(),
  })
  .optional();

export type CollectionOrderBySearchParams = z.infer<
  typeof collectionOrderBySearchParams
>;

export type UserBoardGamePlay = InferInsertModel<typeof userBoardGamePlay>;
