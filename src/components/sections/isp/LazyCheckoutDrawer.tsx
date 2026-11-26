"use client";

import dynamic from "next/dynamic";
import type { CheckoutPlan } from "./CheckoutDrawer";

const CheckoutDrawerInner = dynamic(
  () => import("./CheckoutDrawer").then((mod) => mod.CheckoutDrawer),
  { ssr: false },
);

export interface LazyCheckoutDrawerProps {
  plan: CheckoutPlan | null;
  carrier: string;
  isFresh: boolean;
  initialBillingCycle?: "monthly" | "quarterly" | "annual";
  initialCountry?: string;
  initialCoupon?: string;
  onClose: () => void;
}

export function LazyCheckoutDrawer(props: LazyCheckoutDrawerProps) {
  if (!props.plan) return null;
  const drawerKey = `${props.plan.id ?? props.plan.name}-${props.initialCountry ?? "us"}-${props.carrier}-${props.initialBillingCycle ?? "monthly"}-${props.initialCoupon ?? ""}`;
  return <CheckoutDrawerInner key={drawerKey} {...props} />;
}