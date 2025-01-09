export const mapZodErrorsToValidationItems = (errors?: string[]) => {
    return (
      errors?.map((item, index) => {
        return {
          id: `item-${index + 1}`,
          label: item,
        };
      }) ?? []
    );
  };
  