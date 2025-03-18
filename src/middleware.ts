import { NextRequest, NextResponse } from "next/server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client/wasm";

const initDB = () => {
  const { env } = getCloudflareContext();
  const adapter = new PrismaD1(env.DB);
  return new PrismaClient({ adapter })
};

const db = initDB();

export async function middleware(request: NextRequest) {
  console.log("middleware");

  const requestHeaders = new Headers(request.headers);
  const cloudflareContext = getCloudflareContext();
  const accounts = await db['account'].findMany();
  console.log(`Found accounts: ${accounts}`);

  requestHeaders.set(
    "x-cloudflare-context",
    `typeof \`cloudflareContext.env\` = ${typeof cloudflareContext.env}`
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/"],
};
