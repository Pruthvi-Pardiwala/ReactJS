const isBrowser = typeof window !== 'undefined'

export function safeJsonParse(value, fallback) {
  if (typeof value !== 'string') return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function readFromStorage(key, fallback) {
  if (!isBrowser) return fallback
  const raw = window.localStorage.getItem(key)
  if (raw == null) return fallback
  return safeJsonParse(raw, fallback)
}

export function writeToStorage(key, value) {
  if (!isBrowser) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeFromStorage(key) {
  if (!isBrowser) return
  window.localStorage.removeItem(key)
}

