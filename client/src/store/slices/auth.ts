import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthUser } from '../types/auth'

const initialState: AuthState = {
  auth: false,
  ready: false,
  loading: false,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload
    },
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
    }
  }
})

export const { setAuth, setReady, setLoading, setUser } = authSlice.actions

export default authSlice.reducer