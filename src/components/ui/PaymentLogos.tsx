import Image from "next/image";

const BASE = "object-contain select-none";

export function BkashLogo({
  className = "h-6 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/bkash.png"
      alt="bKash"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}

export function NagadLogo({
  className = "h-6 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/nagad.png"
      alt="Nagad"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}

export function VisaLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}

export function MastercardLogo({
  className = "h-5 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}

export function UsdtLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/usdt.png"
      alt="USDT"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}

export function VisaMastercardLogo({
  className = "h-5 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/visa-mastercard.png"
      alt="Visa / Mastercard"
      width={160}
      height={48}
      unoptimized
      className={`${BASE} ${className}`}
    />
  );
}
