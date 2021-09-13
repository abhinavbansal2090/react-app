import { StoreState } from 'lib/store/reducers'

export const selectGettingUserResult = (store: StoreState) =>
  store.user.gettingUserResult
export const selectUser = (state: StoreState) => state.user?.user
