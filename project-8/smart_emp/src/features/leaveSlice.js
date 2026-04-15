import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'smartLeave.leaves.v1'

function loadLeaves() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveLeaves(leaves) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaves))
}

const seed = () => {
  const existing = loadLeaves()
  if (existing.length) return existing
  const now = Date.now()
  const demo = [
    {
      employeeName: 'Aarav Patel',
      leaveType: 'Sick Leave',
      startDate: '2026-04-10',
      endDate: '2026-04-11',
      reason: 'Fever and rest',
      status: 'Pending',
    },
    {
      employeeName: 'Neha Sharma',
      leaveType: 'Vacation Leave',
      startDate: '2026-04-20',
      endDate: '2026-04-23',
      reason: 'Family trip',
      status: 'Approved'
    },
  ]
  saveLeaves(demo)
  return demo
}

export const fetchLeaves = createAsyncThunk('leave/fetchLeaves', async () => {
  return loadLeaves()
})

export const applyLeave = createAsyncThunk(
  'leave/applyLeave',
  async (payload) => {
    const leaves = loadLeaves()
    const now = Date.now()
    const newLeave = {
      employeeName: payload.employeeName.trim(),
      leaveType: payload.leaveType,
      startDate: payload.startDate,
      endDate: payload.endDate,
      reason: payload.reason.trim(),
      status: 'Pending',
    }
    const next = [newLeave, ...leaves]
    saveLeaves(next)
    return newLeave
  }
)

export const updateLeave = createAsyncThunk(
  'leave/updateLeave',
  async ({ id, patch }) => {
    const leaves = loadLeaves()
    const idx = leaves.findIndex((l) => l.id === id)
    if (idx < 0) throw new Error('Leave request not found.')
    const updated = {
      ...leaves[idx],
      ...patch,
    }
    const next = [...leaves]
    next[idx] = updated
    saveLeaves(next)
    return updated
  }
)

export const deleteLeave = createAsyncThunk('leave/deleteLeave', async (id) => {
  const leaves = loadLeaves()
  const next = leaves.filter((l) => l.id !== id)
  saveLeaves(next)
  return id
})

export const updateLeaveStatus = createAsyncThunk(
  'leave/updateLeaveStatus',
  async ({ id, status }) => {
    const leaves = loadLeaves()
    const idx = leaves.findIndex((l) => l.id === id)
    if (idx < 0) throw new Error('Leave request not found.')
    const updated = { ...leaves[idx], status }
    const next = [...leaves]
    next[idx] = updated
    saveLeaves(next)
    return updated
  }
)

const initialState = {
  items: seed(),
  loading: false,
  error: null,
  lastOperation: null,
  query: '',
  filters: {
    leaveType: 'All',
    status: 'All',
  },
}

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true
        state.error = null
        state.lastOperation = 'fetchLeaves'
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message ?? 'Failed to fetch leaves.'
      })

      .addCase(applyLeave.pending, (state) => {
        state.loading = true
        state.error = null
        state.lastOperation = 'applyLeave'
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.loading = false
        state.items = [action.payload, ...state.items]
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message ?? 'Failed to apply leave.'
      })

      .addCase(updateLeave.pending, (state) => {
        state.loading = true
        state.error = null
        state.lastOperation = 'updateLeave'
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        state.loading = false
        const idx = state.items.findIndex((l) => l.id === action.payload.id)
        if (idx >= 0) state.items[idx] = action.payload
      })
      .addCase(updateLeave.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message ?? 'Failed to update leave.'
      })

      .addCase(deleteLeave.pending, (state) => {
        state.loading = true
        state.error = null
        state.lastOperation = 'deleteLeave'
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((l) => l.id !== action.payload)
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message ?? 'Failed to delete leave.'
      })

      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true
        state.error = null
        state.lastOperation = 'updateLeaveStatus'
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false
        const idx = state.items.findIndex((l) => l.id === action.payload.id)
        if (idx >= 0) state.items[idx] = action.payload
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error?.message ?? 'Failed to update leave request status.'
      })
  },
})

export const { setQuery, setFilters, clearError } = leaveSlice.actions
export const selectLeaves = (state) => state.leave.items
export const selectLeaveUi = (state) => ({
  loading: state.leave.loading,
  error: state.leave.error,
  lastOperation: state.leave.lastOperation,
  query: state.leave.query,
  filters: state.leave.filters,
})

export function selectFilteredLeaves(state) {
  const { query, filters, items } = state.leave
  const q = query.trim().toLowerCase()
  return items
    .filter((l) => {
      if (filters.leaveType !== 'All' && l.leaveType !== filters.leaveType)
        return false
      if (filters.status !== 'All' && l.status !== filters.status) return false
      return true
    })
    .filter((l) => {
      if (!q) return true
      return (
        l.employeeName.toLowerCase().includes(q) ||
        l.leaveType.toLowerCase().includes(q) ||
        l.status.toLowerCase().includes(q) ||
        l.reason.toLowerCase().includes(q)
      )
    })
}

export default leaveSlice.reducer