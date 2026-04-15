const badgeClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900/60'
    case 'Rejected':
      return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-900/60'
    case 'Cancelled':
      return 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-950/30 dark:text-slate-200 dark:ring-slate-800'
    default:
      return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:ring-amber-900/60'
  }
}

export default function LeaveCard({
  leave,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onCancel,
  busy,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {leave.employeeName}
          </div>
          <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
            {leave.leaveType} • {leave.startDate} → {leave.endDate} 
          </div>
        </div>
        <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badgeClass(leave.status)}`}>
          {leave.status}
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-medium text-slate-800 dark:text-slate-200">
          Reason:
        </span>{' '}
        {leave.reason}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={onEdit}
          disabled={busy}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-100 dark:hover:bg-slate-950/50"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={busy}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/70"
        >
          Delete
        </button>

        <div className="flex-1" />

        <button
          onClick={onApprove}
          disabled={busy || leave.status === 'Approved'}
          className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          disabled={busy || leave.status === 'Rejected'}
          className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
        >
          Reject
        </button>
        <button
          onClick={onCancel}
          disabled={busy || leave.status === 'Cancelled'}
          className="rounded-xl bg-slate-700 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

