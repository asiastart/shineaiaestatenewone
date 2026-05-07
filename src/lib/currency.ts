export type Currency = 'THB' | 'USD' | 'EUR' | 'SGD';

const RATES: Record<Currency, number> = {
  THB: 1,
  USD: 1 / 36.5,
  EUR: 1 / 39.8,
  SGD: 1 / 27.0,
};

const SYMBOLS: Record<Currency, string> = {
  THB: '฿',
  USD: '$',
  EUR: '€',
  SGD: 'S$',
};

export function convert(thb: number, to: Currency): number {
  return thb * RATES[to];
}

export function formatPrice(thb: number, currency: Currency = 'THB'): string {
  const value = convert(thb, currency);
  const symbol = SYMBOLS[currency];

  if (currency === 'THB') {
    return `${symbol}${Math.round(value).toLocaleString('en-US')}`;
  }

  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${symbol}${(value / 1_000).toFixed(0)}K`;
  }
  return `${symbol}${value.toFixed(0)}`;
}

export const CURRENCIES: Currency[] = ['THB', 'USD', 'EUR', 'SGD'];
