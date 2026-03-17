import { createContext, useContext } from 'react'
import { useEmployees } from '../hooks/useEmployees.js'

const EmployeesContext = createContext(null)

export function EmployeesProvider({ children }) {
  const value = useEmployees()
  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>
}

export function useEmployeesContext() {
  const ctx = useContext(EmployeesContext)
  if (!ctx) {
    throw new Error('useEmployeesContext must be used within EmployeesProvider')
  }
  return ctx
}

