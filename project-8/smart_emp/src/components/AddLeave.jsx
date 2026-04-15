import { useEffect, useMemo, useState } from 'react'

const LEAVE_TYPES = [
  'Sick Leave',
  'Casual Leave',
  'Emergency Leave',
  'Vacation Leave',
  'Half-Day',
]

function toISODate(d) {
  if (!d) return ''
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return ''
  return dt.toISOString().slice(0, 10)
}

export default function AddLeave({ onSubmit, loading, editingLeave, onCancel }) {
  const isEditing = Boolean(editingLeave)
  const defaults = useMemo(() => {
    if (!editingLeave) {
      const today = toISODate(new Date())
      return {
        employeeName: '',
        leaveType: 'Sick Leave',
        startDate: today,
        endDate: today,
        reason: '',
      }
    }
    return {
      employeeName: editingLeave.employeeName ?? '',
      leaveType: editingLeave.leaveType ?? 'Sick Leave',
      startDate: editingLeave.startDate ?? '',
      endDate: editingLeave.endDate ?? '',
      reason: editingLeave.reason ?? '',
    }
  }, [editingLeave])

  const [employeeName, setEmployeeName] = useState(defaults.employeeName)
  const [leaveType, setLeaveType] = useState(defaults.leaveType)
  const [startDate, setStartDate] = useState(defaults.startDate)
  const [endDate, setEndDate] = useState(defaults.endDate)
  const [reason, setReason] = useState(defaults.reason)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setEmployeeName(defaults.employeeName)
    setLeaveType(defaults.leaveType)
    setStartDate(defaults.startDate)
    setEndDate(defaults.endDate)
    setReason(defaults.reason)
    setTouched(false)
  }, [defaults])

  const errors = {
    employeeName: employeeName.trim() ? null : 'Employee name is required.',
    startDate: startDate ? null : 'Start date is required.',
    endDate: endDate ? null : 'End date is required.',
    range:
      startDate && endDate && startDate > endDate
        ? 'End date must be the same or after start date.'
        : null,
    reason: reason.trim() ? null : 'Reason is required.',
  }

  const canSubmit = Object.values(errors).every((v) => v == null)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
            {isEditing ? 'Update leave request' : 'Apply for leave'}
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-100 dark:hover:bg-slate-950/50"
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      <form
        className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          setTouched(true)
          if (!canSubmit) return
          onSubmit({
            employeeName,
            leaveType,
            startDate,
            endDate,
            reason,
          })
        }}
      >
        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Employee name
          </div>
          <input
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="e.g. John Doe"
          />
          {touched && errors.employeeName ? (
            <div className="mt-1 text-xs font-medium text-rose-600">
              {errors.employeeName}
            </div>
          ) : null}
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Leave type
          </div>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100"
          >
            {LEAVE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Start date
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100"
          />
          {touched && errors.startDate ? (
            <div className="mt-1 text-xs font-medium text-rose-600">
              {errors.startDate}
            </div>
          ) : null}
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            End date
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100"
          />
          {touched && errors.endDate ? (
            <div className="mt-1 text-xs font-medium text-rose-600">
              {errors.endDate}
            </div>
          ) : null}
          {touched && errors.range ? (
            <div className="mt-1 text-xs font-medium text-rose-600">
              {errors.range}
            </div>
          ) : null}
        </label>

        <label className="block md:col-span-2">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Reason
          </div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="Why are you applying for leave?"
          />
          {touched && errors.reason ? (
            <div className="mt-1 text-xs font-medium text-rose-600">
              {errors.reason}
            </div>
          ) : null}
        </label>

        <div className="md:col-span-2 flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Working…' : isEditing ? 'Save changes' : 'Submit request'}
          </button>
        </div>
      </form>
    </div>
  )
}

