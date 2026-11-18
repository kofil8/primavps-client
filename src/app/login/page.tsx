"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = "/cloud-vps";
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="card w-full max-w-sm p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
          Sign in
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage servers, IPs and invoices.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="label mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="field pl-10"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="label">
                Password
              </label>
              <Link
                href="/contact"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="field pl-10"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign in
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
          New here?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
