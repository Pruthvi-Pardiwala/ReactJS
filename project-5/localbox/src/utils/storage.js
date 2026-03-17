const STORAGE_KEY = "localbox.records";

export function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((r) => r && typeof r === "object")
      .map((r) => ({
        id: String(r.id ?? ""),
        title: String(r.title ?? ""),
        category: String(r.category ?? ""),
        notes: String(r.notes ?? ""),
        createdAt: Number(r.createdAt ?? Date.now()),
        updatedAt: Number(r.updatedAt ?? r.createdAt ?? Date.now()),
      }))
      .filter((r) => r.id);
  } catch {
    return [];
  }
}

export function saveRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {}
}
