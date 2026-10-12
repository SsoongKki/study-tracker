import { existsSync } from "node:fs";
import { defineConfig, env } from "prisma/config";

// Prisma 7은 .env를 자동으로 읽지 않는다.
// 로컬에서는 Node 내장 기능으로 .env를 불러오고, CI/배포 환경에서는 환경변수를 직접 주입한다.
if (existsSync(".env")) {
  process.loadEnvFile();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
