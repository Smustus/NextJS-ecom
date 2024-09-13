"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat"

const CURRENCY_FORMATTER_SEK = new Intl.NumberFormat("sv-SE", {
  style: 'currency',
  currency: 'SEK'
});

export function formatSEK(amount: number){
  return CURRENCY_FORMATTER_SEK.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("sv-SE");

export function formatNumber(amount: number){
  return NUMBER_FORMATTER.format(amount);
}