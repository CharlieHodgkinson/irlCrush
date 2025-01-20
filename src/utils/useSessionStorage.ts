import { useState, useEffect } from "react";

type StateSetters<S> = [S, React.Dispatch<React.SetStateAction<S>>, () => void];

export function useSessionState<S>(
  storageKey: string,
  initialState: S
): StateSetters<S> {
  const [state, setState] = useState<S>(
    sessionStorage.getItem(storageKey)
      ? JSON.parse(sessionStorage.getItem(storageKey) || "{}")
      : initialState
  );

  const clearState = () => {
    setState(initialState);
  };

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState, clearState];
}
