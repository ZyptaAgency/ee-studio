import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    // Direct (session-mode) connection used by the CLI for migrations / db push.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
