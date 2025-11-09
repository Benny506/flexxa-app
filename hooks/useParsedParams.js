import { useLocalSearchParams } from "expo-router";

/**
 * A custom hook that automatically JSON-parses
 * any route params that were stringified before pushing.
 */
export function useParsedParams() {
  const params = useLocalSearchParams();
  const parsedParams = {};

  for (const key in params) {
    const value = params[key];

    if (typeof value === "string") {
      try {
        parsedParams[key] = JSON.parse(value);
      } catch {
        parsedParams[key] = value; // not JSON, keep as-is
      }
    } else {
      parsedParams[key] = value;
    }
  }

  return parsedParams;
}
