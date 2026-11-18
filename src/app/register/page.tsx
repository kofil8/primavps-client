"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
          Create an account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Your first server can be online in 90 seconds.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="label mb-1.5">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Asif Mahmud"
              className="field"
            />
          </div>

          <div>
            <label htmlFor="email" className="label mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="field"
            />
          </div>

          <div>
            <label htmlFor="password" className="label mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className="field"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Create account
            <ArrowRight size={15} />
          </button>

          <p className="text-xs leading-5 text-slate-500">
            By signing up you agree to our{" "}
            <Link href="/legal/terms" className="text-blue-700 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="text-blue-700 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>

        <p className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
