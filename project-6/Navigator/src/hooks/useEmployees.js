import { useEffect, useMemo, useState } from 'react'
import { readFromStorage, removeFromStorage, writeToStorage } from '../lib/storage.js'
import {
  createEmployeeFromDraft,
  EMPLOYEE_STORAGE_KEY,
  updateEmployeeFromDraft,
} from '../lib/employeeModel.js'

function coerceEmployees(value) {
  if (!Array.isArray(value)) return []
  return value
    .filter((e) => e && typeof e === 'object')
    .map((e) => ({
      id: String(e.id ?? ''),
      fullName: String(e.fullName ?? ''),
      email: String(e.email ?? ''),
      phone: String(e.phone ?? ''),
      salary: String(e.salary ?? ''),
      status: e.status === 'Inactive' ? 'Inactive' : 'Active',
      createdAt: String(e.createdAt ?? ''),
      updatedAt: String(e.updatedAt ?? ''),
    }))
    .filter((e) => e.id)
}

export function useEmployees() {
  const [employees, setEmployees] = useState(() => coerceEmployees(readFromStorage(EMPLOYEE_STORAGE_KEY, [])))
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    writeToStorage(EMPLOYEE_STORAGE_KEY, employees)
  }, [employees])

  const editingEmployee = useMemo(
    () => employees.find((e) => e.id === editingId) ?? null,
    [employees, editingId],
  )

  function addEmployee(draft) {
    const next = createEmployeeFromDraft(draft)
    setEmployees((prev) => [next, ...prev])
    return next
  }

  function startEdit(id) {
    setEditingId(id)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function updateEmployee(id, draft) {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? updateEmployeeFromDraft(e, draft) : e)),
    )
    setEditingId(null)
  }

  function deleteEmployee(id) {
    setEmployees((prev) => prev.filter((e) => e.id !== id))
    setEditingId((prev) => (prev === id ? null : prev))
  }

  function clearAllEmployees() {
    setEmployees([])
    setEditingId(null)
    removeFromStorage(EMPLOYEE_STORAGE_KEY)
  }

  return {
    employees,
    editingId,
    editingEmployee,
    addEmployee,
    startEdit,
    cancelEdit,
    updateEmployee,
    deleteEmployee,
    clearAllEmployees,
  }
}

