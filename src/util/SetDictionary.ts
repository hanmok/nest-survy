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

export function compareGeoCode(set: Set<number>, userGeoId: number) {
  for (const element of set) {
    const diff = userGeoId - element;
    if (100_000_000 >= diff && diff >= 0) {
      return diff === 0 || element % 100_000_000 === 0;
    }
  }
  return false;
}
