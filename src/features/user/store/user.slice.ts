import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserMe } from 'lib/models'
import { Undefineable } from 'lib/types'
import { ActionsUnion } from 'lib/redux/action-union'
import { GetUserResult } from '../types'

export interface UserState {
  user: UserMe
  gettingUserResult?: GetUserResult
}

const initialState: Partial<UserState> = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    fetchUserMe: () => undefined,
    setUser: (state, action: PayloadAction<Partial<UserMe>>) => {
      const balance = action.payload.walletBalance
      state.user = {
        ...state.user,
        ...action.payload,
        walletBalance: balance ? balance / 100 : 0,
      } as UserMe
    },
    setGettingUserResult: (
      state,
      action: PayloadAction<Undefineable<GetUserResult>>
    ) => {
      state.gettingUserResult = action.payload
    },
  },
})

export type UserActions = ActionsUnion<typeof userSlice.actions>
