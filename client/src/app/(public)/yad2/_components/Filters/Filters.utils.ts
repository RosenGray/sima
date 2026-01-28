interface PriceFilters {
  priceFrom: string;
  priceTo: string;
}

export const getPriceDialogButtonTitle = (
  priceFilters: PriceFilters
) => {
  const priceFrom = priceFilters.priceFrom?.replace(/,/g, "") || "";
  const priceTo = priceFilters.priceTo?.replace(/,/g, "") || "";

  if (priceFrom && priceTo) {
    return `${priceFrom}-${priceTo} ₪`;
  } else if (priceFrom) {
    return `От ${priceFrom} ₪`;
  } else if (priceTo) {
    return `До ${priceTo} ₪`;
  }
  return "Цена";
};
