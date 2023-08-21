export const formatMoney = (num?: number, digits = 3) => {
  if (!num) return '0';
  if (Number.isNaN(num)) return '0';
  const re = `\\B(?=(\\d{${digits}})+(?!\\d))`;
  return String(num).replace(new RegExp(re, 'g'), ',');
};

export const formatMoneyWithUnit = (num?: number, unit?: string) =>
  `${formatMoney(num)} ${unit ?? ''}`;
