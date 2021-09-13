import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from 'lib/types'

export interface AuthState {
  token?: Nullable<string>
  isAuthenticated: boolean
  firebaseId?: string
}

const initialState: AuthState = {
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    setToken: (state, action: PayloadAction<Nullable<string>>) => {
      state.token = action.payload
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setFirebaseId: (state, action: PayloadAction<string>) => {
      state.firebaseId = action.payload
    },
  },
})
