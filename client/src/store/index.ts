import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development'
})

export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch = typeof store.dispatch

export default store