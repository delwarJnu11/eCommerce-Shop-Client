export const calculateProductDiscount = (regularPrice, sellingPrice) => {
  const discount = ((regularPrice - sellingPrice) * 100) / regularPrice;
  return discount;
};
