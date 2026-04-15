import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddLeave from '../components/AddLeave.jsx'
import LeaveList from '../components/LeaveList.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import {
  applyLeave,
  clearError,
  deleteLeave,
  fetchLeaves,
  selectFilteredLeaves,
  selectLeaveUi,
  updateLeave,
  updateLeaveStatus,
} from '../features/leaveSlice.js'

export default function Dashboard() {
  const dispatch = useDispatch()
  const ui = useSelector(selectLeaveUi)
  const leaves = useSelector(selectFilteredLeaves)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    dispatch(fetchLeaves())
  }, [dispatch])

  const busy = ui.loading

  const header = useMemo(() => {
    return {
      title: 'Smart Leave Management',
      subtitle: 'Apply, review, approve/reject, and track leave requests.',
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {header.title}
            </div>
            <div className="mt-1 text-slate-600 dark:text-slate-400">
              {header.subtitle}
            </div>
          </div>
        </div>

        {ui.error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-semibold">Error</div>
              <button
                onClick={() => dispatch(clearError())}
                className="rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/70"
              >
                Dismiss
              </button>
            </div>
            <div className="mt-1 text-sm">{ui.error}</div>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-4">
          <AddLeave
            loading={
              busy &&
              (ui.lastOperation === 'applyLeave' ||
                ui.lastOperation === 'updateLeave')
            }
            editingLeave={editing}
            onCancel={() => setEditing(null)}
            onSubmit={(payload) => {
              if (editing) {
                dispatch(updateLeave({ id: editing.id, patch: payload })).then(
                  (res) => {
                    if (!res.error) setEditing(null)
                  }
                )
                return
              }
              dispatch(applyLeave(payload))
            }}
          />

          <SearchFilter />

          <LeaveList
            leaves={leaves}
            busy={busy}
            onEdit={(leave) => setEditing(leave)}
            onDelete={(leave) => {
              if (editing?.id === leave.id) setEditing(null)
              dispatch(deleteLeave(leave.id))
            }}
            onStatus={(leave, status) => {
              if (editing?.id === leave.id) setEditing(null)
              dispatch(updateLeaveStatus({ id: leave.id, status }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

