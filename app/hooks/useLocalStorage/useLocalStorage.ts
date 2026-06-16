"use client";

import { useCallback, useSyncExternalStore } from "react";

type Listener = () => void;
type SetValue<T> = T | ((prev: T) => T);

const listeners = new Map<string, Set<Listener>>();
const snapshotCache = new Map<string, { raw: string | null; parsed: unknown }>();

function getListeners(key: string): Set<Listener> {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  return set;
}

function readRaw(key: string): string | null {
  try {
    return globalThis.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getSnapshot<T>(key: string, initialValue: T): T {
  const raw = readRaw(key);
  const cached = snapshotCache.get(key);
  if (cached?.raw === raw) return cached.parsed as T;

  let parsed: T;
  try {
    parsed = raw === null ? initialValue : (JSON.parse(raw) as T);
  } catch {
    parsed = initialValue;
  }

  snapshotCache.set(key, { raw, parsed });
  return parsed;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback(
    (callback: Listener) => {
      const set = getListeners(key);
      set.add(callback);

      function handleStorage(e: StorageEvent) {
        if (e.key === key) callback();
      }
      globalThis.addEventListener("storage", handleStorage);

      return () => {
        set.delete(callback);
        globalThis.removeEventListener("storage", handleStorage);
      };
    },
    [key]
  );

  const value = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key, initialValue),
    () => initialValue
  );

  const setValue = useCallback(
    (next: SetValue<T>) => {
      const prev = getSnapshot(key, initialValue);
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
      try {
        globalThis.localStorage.setItem(key, JSON.stringify(resolved));
        snapshotCache.set(key, { raw: globalThis.localStorage.getItem(key), parsed: resolved });
      } catch {
        // quota exceeded or storage disabled — value won't persist this time
      }
      getListeners(key).forEach((listener) => listener());
    },
    [key, initialValue]
  );

  return [value, setValue] as const;
}
