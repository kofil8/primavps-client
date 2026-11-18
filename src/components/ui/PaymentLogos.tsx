import Image from "next/image";
import React from "react";

const BASE = "object-contain";

export function BkashLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/bkash.png"
      alt="bKash"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}

export function NagadLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/nagad.png"
      alt="Nagad"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}

export function VisaLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}

export function MastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}

export function UsdtLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/usdt.png"
      alt="USDT"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}

export function VisaMastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={320}
      height={96}
      className={`${BASE} ${className}`}
    />
  );
}
