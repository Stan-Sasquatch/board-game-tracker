import { type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { type boardGame } from "~/server/db/schema";

export const boardGameSearchParamsSchema = z
  .object({
    boardGameName: z.string().optional(),
  })
  .optional();

export type boardGameSearchParams = z.infer<typeof boardGameSearchParamsSchema>;
export const boardGameNameKey = "boardGameName" satisfies keyof Exclude<
  boardGameSearchParams,
  undefined
>;

export type BoardGame = InferSelectModel<typeof boardGame>;
