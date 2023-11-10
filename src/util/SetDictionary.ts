export interface SetDictionary<T> {
  [key: number]: Set<T>;
}

export interface Dictionary<T> {
  [key: number]: T;
}
