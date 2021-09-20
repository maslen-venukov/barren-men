import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from '../types/users'

const initialState: UserState = {
  loading: false,
  users: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    createUser(state, action: PayloadAction<User>) {
      state.users = [action.payload, ...state.users]
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(user => user.id !== action.payload)
    }
  }
})

export const { setUsers, setLoading, createUser, removeUser } = usersSlice.actions

export default usersSlice.reducer