import { calculateProductDiscount } from "./calculateProductDiscount";

export const getTopDiscountProducts = (products, topN) => {
  const productsWithDiscount = products.map((product) => {
    return {
      ...product,
      discount: calculateProductDiscount(product.price, product.sellingPrice),
    };
  });

  const sortedProducts = productsWithDiscount.sort(
    (a, b) => b.discount - a.discount
  );

  return sortedProducts.slice(0, topN);
};
