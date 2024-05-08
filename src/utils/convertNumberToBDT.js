export const convertNumberToBDT = (amount) => {
  let strAmount = String(amount).replace(/,/g, "");
  strAmount = strAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return strAmount;
};
