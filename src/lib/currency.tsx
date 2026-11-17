'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'BDT' | 'USD';
export const BDT_TO_USD = 0.0082; // 1 BDT ≈ $0.0082 (or ~$1 = 122 BDT)

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (bdt: number) => string;
  formatHourly: (bdt: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('BDT');

  useEffect(() => {
    const saved = localStorage.getItem('primevps_currency') as Currency;
    if (saved === 'BDT' || saved === 'USD') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('primevps_currency', c);
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
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
