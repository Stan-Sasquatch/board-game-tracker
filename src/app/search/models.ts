import { type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { type boardGame } from "~/server/db/schema";
type validUrlQueryKeys = keyof Exclude<boardGameSearchParams, undefined>;
export const boardGameSearchParamsSchema = z
  .object({
    boardGameName: z.string().optional(),
    selected: z.string().optional(),
  })
  .optional();

export type boardGameSearchParams = z.infer<typeof boardGameSearchParamsSchema>;
export const boardGameNameKey = "boardGameName" satisfies validUrlQueryKeys;

export const selected = "selected" satisfies validUrlQueryKeys;

export type BoardGame = InferSelectModel<typeof boardGame>;
