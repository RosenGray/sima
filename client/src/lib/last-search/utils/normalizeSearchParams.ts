export function normalizeSearchParams(params: URLSearchParams): string {
  const excluded = new Set(["page", "sort", "view"]);
  const pairs: [string, string][] = [];
  for (const [k, v] of params.entries()) {
    if (!excluded.has(k)) pairs.push([k, v]);
  }
  pairs.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
  return pairs.map(([k, v]) => `${k}=${v}`).join("&");
}
