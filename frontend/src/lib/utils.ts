import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number) {
  const format = (num: number, suffix: string) => {
    const rounded = +num.toFixed(1);
    return rounded % 1 === 0 ? `${Math.round(rounded)} ${suffix}` : `${rounded} ${suffix}`;
  };

  if (value >= 1_000_000_000) return format(value / 1_000_000_000, ' млрд ₽');
  if (value >= 1_000_000) return format(value / 1_000_000, ' млн ₽');
  if (value >= 1_000) return format(value / 1_000, ' тыс ₽');
  return value + ' ₽';
}
