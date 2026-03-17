const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9]{7,15}$/

export function validateEmployeeDraft(draft) {
  const errors = {}

  if (!draft.fullName?.trim()) errors.fullName = 'Full name is required.'

  const email = draft.email?.trim() ?? ''
  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email (e.g., name@example.com).'

  const phone = draft.phone?.trim() ?? ''
  if (!phone) errors.phone = 'Phone is required.'
  else if (!PHONE_RE.test(phone)) errors.phone = 'Phone must be 7–15 digits (optional +).'

  const salaryRaw = (draft.salary ?? '').toString().trim()
  const salary = Number(salaryRaw)
  if (!salaryRaw) errors.salary = 'Salary is required.'
  else if (!Number.isFinite(salary) || salary <= 0) errors.salary = 'Salary must be a positive number.'

  return errors
}

