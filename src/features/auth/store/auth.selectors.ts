import { StoreState } from 'lib/store/reducers'

export const selectToken = (state: StoreState) => state.auth?.token
export const selectIsAuthenticated = (state: StoreState) =>
  state.auth.isAuthenticated
