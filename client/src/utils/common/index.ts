export const generateBackblazeUrl = (folder: string, fileName: string) => {
  return `${process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL}/${process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};

/*
 * Converts search parameters to a filters object with array values
 * @param searchParams - The search parameters object
 * @param excludeKeys - Keys to exclude from the filters (default: ['page'])
 * @returns Object with string array values for each filter
 */
export function searchParamsToFilters(
  searchParams: Record<string, string | string[] | undefined>,
  excludeKeys: string[] = ["page"]
): Record<string, string[]> {
  return Object.keys(searchParams)
    .filter((key) => !excludeKeys.includes(key))
    .reduce((acc, key) => {
      const value = searchParams[key];

      if (!value) return acc;

      acc[key] = Array.isArray(value) ? value : [value];

      return acc;
    }, {} as Record<string, string[]>);
}
