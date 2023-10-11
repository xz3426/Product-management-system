import discountCodes from './discountCodes.json';

export const applyDiscountCode = (code) => {
  const discount = discountCodes[code];
  if (!discount) {
    throw new Error(`Invalid discount code: ${code}`);
  }
  return discount;
};