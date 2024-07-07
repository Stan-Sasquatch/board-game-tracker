import { z } from "zod";

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
