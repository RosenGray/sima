let cachedYears: number[] | null = null;
let cachedYear: number | null = null;
let cachedYearsOptions: Array<{ value: string; label: string }> | null = null;

export function getYearsArray(): number[] {
  const currentYear = new Date().getFullYear();

  // Return cached array if year hasn't changed
  if (cachedYears !== null && cachedYear === currentYear) {
    return cachedYears;
  }

  // Generate new array only when year changes
  const startYear = 1970;
  const years: number[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  // Cache the result
  cachedYears = years;
  cachedYear = currentYear;

  return years;
}

export const getYearsOptions = () => {
  const currentYear = new Date().getFullYear();

  if (cachedYearsOptions !== null && cachedYear === currentYear) {
    return cachedYearsOptions;
  }

  const years = getYearsArray();
  const options = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  cachedYearsOptions = options;

  return options;
};
