export function getFromStorage<T>(key: string): T | undefined {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key);
    return value ?? JSON.parse(value || "{}");
  }
}
export const setToStorage = (key: string, value: string | object) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(
      key,
      typeof value !== "string" ? JSON.stringify(value) : value
    );
  }
};
