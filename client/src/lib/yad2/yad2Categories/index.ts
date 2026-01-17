import { Option } from "@/components/filters/select/types";
import { yad2Categories } from "./data";
import {
  Yad2Category,
  Yad2CategoryId,
} from "./types/yad2Category.schema";

const categoryEntries = Object.entries(yad2Categories) as Array<
  [Yad2CategoryId, Yad2Category]
>;

const categoryOptionsCache: Option[] = categoryEntries.map(
  ([id, category]) => ({
    value: id,
    label: category.russianName,
    fieldKey: "category",
  }),
);

const categoryLookupCache = new Map<Yad2CategoryId, Yad2Category>(
  categoryEntries
);

export const mapYad2CategoriesToSelectOptions = (): Option[] =>
  categoryOptionsCache;

export const getYad2CategoryById = (
  id: Yad2CategoryId,
): Yad2Category | undefined => categoryLookupCache.get(id);
