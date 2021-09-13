import { StoreState } from 'lib/store/reducers'
import { Undefineable } from 'lib/types'
import { Category } from 'lib/models'

export const getCategories = (state: StoreState): Undefineable<Category[]> =>
  state.base.categories
export const getBase = (state: StoreState) => state.base
export const getUser = (state: StoreState) => state.base.user
export const getPaymentMethods = (state: StoreState) =>
  state.base.paymentMethods
