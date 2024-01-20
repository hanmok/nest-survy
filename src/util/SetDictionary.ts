export interface SetDictionary<T> {
  [key: number]: Set<T>;
}

export interface Dictionary<T> {
  [key: number]: T;
}

export function hasCommonElements<T>(set1: Set<T>, set2: Set<T>): boolean {
  for (const element of set1) {
    if (set2.has(element)) {
      return true;
    }
  }
  return false;
}
