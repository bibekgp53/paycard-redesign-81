
/**
 * Masks a card number showing only first 2 and last 4 digits
 * @param cardNumber - The full card number to mask
 * @returns The masked card number
 */
export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber || cardNumber.length < 8) return cardNumber;
  
  return `${cardNumber.slice(0, 2)}${'*'.repeat(8)}${cardNumber.slice(-4)}`;
};
