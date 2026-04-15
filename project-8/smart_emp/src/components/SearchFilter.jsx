import { useDispatch, useSelector } from 'react-redux'
import { selectLeaveUi, setFilters, setQuery } from '../features/leaveSlice.js'

const LEAVE_TYPES = [
  'All',
  'Sick Leave',
  'Casual Leave',
  'Emergency Leave',
  'Vacation Leave',
  'Half-Day',
]

const STATUSES = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled']

export default function SearchFilter() {
  const dispatch = useDispatch()
  const { query, filters } = useSelector(selectLeaveUi)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Search
          </div>
          <input
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Employee, type, status, reason..."
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Leave type
          </div>
          <select
            value={filters.leaveType}
            onChange={(e) => dispatch(setFilters({ leaveType: e.target.value }))}
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
            Status
          </div>
          <select
            value={filters.status}
            onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

