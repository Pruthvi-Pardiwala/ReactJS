import { configureStore } from '@reduxjs/toolkit'
import leaveReducer from '../features/leaveSlice.js'

export const store = configureStore({
  reducer: {
    leave: leaveReducer,
  },
})

