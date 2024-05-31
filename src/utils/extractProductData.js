export const extractProductData = (product) => {
  const { _id, productName, productImages, categoryName, sellingPrice, price } =
    product;
  return { _id, productName, productImages, categoryName, sellingPrice, price };
};
