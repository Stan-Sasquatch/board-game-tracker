import { pgTableCreator } from "drizzle-orm/pg-core";

// we share the board game database between development and production
export const createSharedTable = pgTableCreator(
  (name) => `boardGameTracker_${name}`,
);

export const createTable = pgTableCreator(
  (name) => `board-game-tracker_${process.env.NODE_ENV}_${name}`,
);
