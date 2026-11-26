import { SESSION_COOKIE } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const acceptsHtml = req.headers.get("accept")?.includes("text/html");

  const response = acceptsHtml
    ? NextResponse.redirect(new URL("/login", req.url), 303)
    : NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}