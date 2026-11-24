'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';

export type Currency = 'BDT' | 'USD';
export const BDT_TO_USD = 0.0082; // 1 BDT ≈ $0.0082 (or ~$1 = 122 BDT)

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (bdt: number) => string;
  formatHourly: (bdt: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

// Used only if a consumer renders outside the provider (e.g. during a hot
// reload). Falling back keeps the page usable instead of throwing a client
// error that blanks the whole route.
const FALLBACK_CURRENCY: CurrencyContextType = {
  currency: 'BDT',
  setCurrency: () => {},
  formatPrice: (bdt: number) => `৳${bdt.toLocaleString('en-US')}`,
  formatHourly: (bdt: number) => `~৳${(bdt / 720).toFixed(2)}/hr`,
};

const CURRENCY_STORAGE_KEY = 'primavps_currency';
const CURRENCY_CHANGE_EVENT = 'pv-currency-changed';

function subscribeToCurrency(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CURRENCY_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CURRENCY_CHANGE_EVENT, callback);
  };
}

function getCurrencySnapshot(): Currency {
  const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (saved === 'USD' || saved === 'BDT') return saved;
  return 'BDT';
}

function getServerCurrencySnapshot(): Currency {
  return 'BDT';
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(
    subscribeToCurrency,
    getCurrencySnapshot,
    getServerCurrencySnapshot
  );

  const setCurrency = (c: Currency) => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, c);
    window.dispatchEvent(new Event(CURRENCY_CHANGE_EVENT));
  };

  const formatPrice = (bdt: number): string => {
    if (currency === 'USD') {
      const usd = (bdt * BDT_TO_USD).toFixed(2);
      return `$${usd}`;
    }
    return `৳${bdt.toLocaleString('en-US')}`;
  };

  const formatHourly = (bdt: number): string => {
    const hourlyBdt = (bdt / 720).toFixed(2);
    if (currency === 'USD') {
      const hourlyUsd = ((bdt * BDT_TO_USD) / 720).toFixed(3);
      return `~$${hourlyUsd}/hr`;
    }
    return `~৳${hourlyBdt}/hr`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatHourly }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext) ?? FALLBACK_CURRENCY;
}
