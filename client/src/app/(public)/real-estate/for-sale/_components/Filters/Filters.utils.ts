export const getPriceDialogButtonTitle = (
  priceFrom?: string,
  priceTo?: string
) => {
  if (priceFrom && priceTo) {
    return `${priceFrom} - ${priceTo} ₪`;
  } else if (priceFrom) {
    return `От ${priceFrom} ₪`;
  } else if (priceTo) {
    return `До ${priceTo} ₪`;
  }
  return "Цена";
};
