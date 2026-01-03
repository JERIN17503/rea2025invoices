// Shared formatting utilities for consistent number display across the app
// All numbers are shown precisely without rounding

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCurrencyShort = (amount: number): string => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-AE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatInteger = (value: number): string => {
  return new Intl.NumberFormat('en-AE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// For chart axis labels - still precise but may abbreviate for readability
export const formatAxisValue = (value: number): string => {
  return new Intl.NumberFormat('en-AE', {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
};
