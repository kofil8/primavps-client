"use client";

import { isFocusedOrPortalRoute } from "@/lib/config/routes";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((mod) => mod.ChatWidget),
  { ssr: false },
);

export function LazyChatWidget() {
  const pathname = usePathname();

  if (isFocusedOrPortalRoute(pathname)) return null;

  return <ChatWidget />;
}