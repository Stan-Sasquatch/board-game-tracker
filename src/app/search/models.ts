import { type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { type boardGame } from "~/server/db/schema";
export type SearchPageQueryKeys = keyof Exclude<
  BoardGameSearchParams,
  undefined
>;
export const boardGameSearchParamsSchema = z
  .object({
    boardGameName: z.string().optional(),
    selected: z.string().optional(),
  })
  .optional();

export type BoardGameSearchParams = z.infer<typeof boardGameSearchParamsSchema>;
export const boardGameNameKey = "boardGameName" satisfies SearchPageQueryKeys;

export const selected = "selected" satisfies SearchPageQueryKeys;

export type BoardGame = InferSelectModel<typeof boardGame>;
