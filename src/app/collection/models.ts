import { z } from "zod";

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
