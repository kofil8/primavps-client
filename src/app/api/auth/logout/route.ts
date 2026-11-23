import { SESSION_COOKIE } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 303 so the browser follows with GET instead of re-POSTing to /login.
  const response = NextResponse.redirect(new URL("/login", req.url), 303);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
