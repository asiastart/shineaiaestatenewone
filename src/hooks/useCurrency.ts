'use client';

import { useState, useEffect } from 'react';
import { type Currency } from '@/lib/currency';

const KEY = 'shine-currency';

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>('THB');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Currency | null;
    if (stored && ['THB', 'USD', 'EUR', 'SGD'].includes(stored)) {
      setCurrencyState(stored);
    }
    setHydrated(true);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(KEY, c);
  };

  return { currency, setCurrency, hydrated };
}
