"use client";

import type { NavbarUser } from "@/lib/auth/session";
import { createContext, useContext } from "react";

const SessionUserContext = createContext<NavbarUser | null>(null);

export function SessionUserProvider({
  user,
  children,
}: {
  user: NavbarUser | null;
  children: React.ReactNode;
}) {
  return (
    <SessionUserContext.Provider value={user}>
      {children}
    </SessionUserContext.Provider>
  );
}

export function useSessionUser(): NavbarUser | null {
  return useContext(SessionUserContext);
}
