import { useMemo } from 'react'
import LeaveCard from './LeaveCard.jsx'

export default function LeaveList({
  leaves,
  busy,
  onEdit,
  onDelete,
  onStatus,
}) {
  const summary = useMemo(() => {
    const by = { Pending: 0, Approved: 0, Rejected: 0, Cancelled: 0 }
    for (const l of leaves) by[l.status] = (by[l.status] ?? 0) + 1
    return by
  }, [leaves])

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Leave records
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {leaves.length} total • Pending {summary.Pending} • Approved{' '}
              {summary.Approved} • Rejected {summary.Rejected} • Cancelled{' '}
              {summary.Cancelled}
            </div>
          </div>
        </div>
      </div>

      {leaves.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
          No leave requests match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {leaves.map((leave) => (
            <div key={leave.id} className="relative">
              <LeaveCard
                leave={leave}
                busy={busy}
                onEdit={() => onEdit(leave)}
                onDelete={() => onDelete(leave)}
                onApprove={() => onStatus(leave, 'Approved')}
                onReject={() => onStatus(leave, 'Rejected')}
                onCancel={() => onStatus(leave, 'Cancelled')}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

