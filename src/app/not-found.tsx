import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 text-center">
      <div className="max-w-sm">
        <p className="font-display text-6xl font-extrabold tracking-tight text-slate-900">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you&apos;re looking for has moved or no longer exists.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={15} />
            Back home
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
