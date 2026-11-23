import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Deals",
  robots: { index: false, follow: true },
  alternates: { canonical: "/hot-deals" },
};

export default function DealsPage() {
  redirect("/hot-deals");
}
