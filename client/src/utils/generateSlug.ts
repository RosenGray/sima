import slugify from "slugify";
import { nanoid } from "nanoid";

export function generateSlug(...parts: string[]): string {
  const raw = parts.filter(Boolean).join("-");
  const base = slugify(raw, { lower: true, strict: true });
  return `${base}-${nanoid(5)}`;
}
