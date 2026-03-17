export const EMPLOYEE_STORAGE_KEY = 'ems.employees.v1'

export function generateId() {
  // crypto.randomUUID is supported in modern browsers; fallback keeps app working offline in older environments.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `emp_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function normalizeEmployeeDraft(draft) {
  return {
    fullName: (draft.fullName ?? '').trim(),
    email: (draft.email ?? '').trim(),
    phone: (draft.phone ?? '').trim(),
    salary: (draft.salary ?? '').toString().trim(),
    status: draft.status === 'Inactive' ? 'Inactive' : 'Active',
  }
}

export function createEmployeeFromDraft(draft) {
  const now = new Date().toISOString()
  const normalized = normalizeEmployeeDraft(draft)
  return {
    id: generateId(),
    ...normalized,
    createdAt: now,
    updatedAt: now,
  }
}

export function updateEmployeeFromDraft(existing, draft) {
  const now = new Date().toISOString()
  const normalized = normalizeEmployeeDraft(draft)
  return {
    ...existing,
    ...normalized,
    updatedAt: now,
  }
}

export function getMostRecentEmployee(employees) {
  if (!Array.isArray(employees) || employees.length === 0) return null
  return [...employees].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))[0]
}

