import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(() => (storedValue ? JSON.parse(storedValue) : initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
