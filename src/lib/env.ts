// 환경변수 검증
// 서버가 시작될 때 process.env를 검사해서, 값이 없거나 형식이 틀리면 바로 에러를 낸다.
// 사용하는 쪽에서는 process.env.X 대신 `import { env } from "@/lib/env"` 로 꺼내 쓴다.

// TODO 1. zod 불러오기
import { z } from "zod";

// TODO 2. 스키마 정의 (검증할 키: DATABASE_URL, AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET)
const envSchema = z.object({
  DATABASE_URL: z.url(),
  AUTH_SECRET: z.string().min(32),
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
});

// TODO 3. process.env 검증 (실패해도 예외를 던지지 않는 방식으로)
const result = envSchema.safeParse(process.env);

// TODO 4. 실패 시 어떤 키가 왜 틀렸는지 보여주고 에러 던지기
if (!result.success) {
  const err = z.prettifyError(result.error);
  console.error(err);

  throw new Error("환경변수 설정이 올바르지 않습니다.");
}

// TODO 5. 검증된 값을 타입과 함께 export
export const env = result.data;
