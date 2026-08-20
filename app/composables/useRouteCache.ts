export function useRouteCache(key: any) {
  function save(data: any) {
    if (import.meta.client) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  function load() {
    if (import.meta.client) {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
    return null;
  }

  function clear() {
    if (import.meta.client) {
      localStorage.removeItem(key);
    }
  }

  return { save, load, clear };
}