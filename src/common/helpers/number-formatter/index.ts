const defaultLocales: any = {
  NGN: "en-NG",
  GBP: "en-GB",
  USD: "en-US",
  GHS: "en-GH",
  KHS: "en-KH",
};

const NumberFormatter = (amount: number, currency?: string) => {
  let numberRange = { divider: 1, suffix: "" };

  const ranges = [
    { divider: 1e9, suffix: "B" },
    { divider: 1e6, suffix: "M" },
    // { divider: 1e3, suffix: "K" },
  ];

  for (const range of ranges) {
    if (amount >= range.divider) {
      numberRange = range;
      break;
    }
  }

  if (!currency) return amount.toLocaleString();

  const formattedAmount = new Intl.NumberFormat(
    defaultLocales[currency] || defaultLocales.USD,
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ).format(amount / numberRange.divider); // Dividing by 1000 to represent 'k'

  return formattedAmount + numberRange.suffix;
};

export default NumberFormatter;
