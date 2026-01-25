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

export const getSquaremeterDialogButtonTitle = (
  squaremeterFrom?: string,
  squaremeterTo?: string
) => {
  if (squaremeterFrom && squaremeterTo) {
    return `${squaremeterFrom} - ${squaremeterTo} м²`;
  } else if (squaremeterFrom) {
    return `От ${squaremeterFrom} м²`;
  } else if (squaremeterTo) {
    return `До ${squaremeterTo} м²`;
  }
  return "Площадь";
};
