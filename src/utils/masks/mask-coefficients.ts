export const maskCoefficients = (value: string) => {
  const numbersOnly = value.replace(/[^\d]/g, '');

  if (numbersOnly.length === 0) return '';
  if (numbersOnly.length === 1) return `${numbersOnly[0]}.`;

  const firstDigit = numbersOnly[0];
  const remainingDigits = numbersOnly.slice(1);

  return `${firstDigit}.${remainingDigits}`;
}