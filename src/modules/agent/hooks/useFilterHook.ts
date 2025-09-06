import { DEFAULT_PAGE } from "@/const/constant";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useFilterHook = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
