import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Server } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-white">
      <div className="space-y-4 max-w-md">
        <span className="font-display font-extrabold text-7xl sm:text-9xl text-[#0F172A] tracking-tighter">
          404
        </span>
        <h1 className="font-display font-bold text-2xl text-[#0F172A]">
          That page does not exist.
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          The requested cloud resource or route could not be resolved on our network edge.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/survey-vps"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            Back to Products
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-xs sm:text-sm transition-all"
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
