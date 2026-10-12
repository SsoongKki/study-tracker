import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

// 개발 서버는 파일을 저장할 때마다 모듈을 다시 불러온다(HMR).
// 그때마다 new PrismaClient()를 하면 DB 연결이 계속 쌓이므로,
// 한 번 만든 클라이언트를 globalThis에 보관해 재사용한다.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

// 배포(production)에서는 모듈이 한 번만 로드되므로 보관할 필요가 없다.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
