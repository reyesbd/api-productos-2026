import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations"
  },
  datasource: {
    // Cambia env("DATABASE_URL") por esto:
    url: process.env.DATABASE_URL, 
  },
});
