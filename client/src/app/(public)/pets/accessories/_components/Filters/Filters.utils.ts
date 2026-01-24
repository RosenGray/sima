export const getPriceDialogButtonTitle = (
  priceFrom: string,
  priceTo: string
) => {
  if (priceFrom && priceTo) {
    return `${priceFrom}-${priceTo}`;
  } else if (priceFrom) {
    return `Цена от ${priceFrom}`;
  } else if (priceTo) {
    return `Цена до ${priceTo}`;
  }
  return "Цена";
};
