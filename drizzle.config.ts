import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: [
    `board-game-tracker_${process.env.NODE_ENV}_*`,
    "boardGameTracker_*",
  ],
} satisfies Config;
