import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// we share the board game database between development and production
const createSharedTable = pgTableCreator((name) => `boardGameTracker_${name}`);

export const boardGame = createSharedTable(
  "boardGame",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    yearPublished: integer("year_published").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
