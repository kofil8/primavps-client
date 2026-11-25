import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout — primavps",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}