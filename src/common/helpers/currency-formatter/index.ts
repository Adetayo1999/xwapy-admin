const locales: any = {
  NGN: "en-NG",
  GBP: "en-GB",
  USD: "en-US",
  GHS: "en-GH",
  KHS: "en-KH",
};

export const currencyFormatter = (amount: number, currency: string) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(
    locales[currency] || "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 3,
      minimumFractionDigits: 0,
    }
  );

  return CURRENCY_FORMATTER.format(amount);
};
