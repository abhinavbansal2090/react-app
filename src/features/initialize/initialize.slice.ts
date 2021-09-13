import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ActionsUnion } from 'lib/redux/action-union'
import {
  Activities,
  AgeRestrictions,
  Category,
  DifficultyLevel,
  GenderRestrictions,
  Language,
  Regions,
} from 'lib/models'
import { paymentMethods } from 'lib/constants/paymentMethods'
import { POI } from 'lib/models/POI'

export interface InitializeState {
  activities?: Activities[]
  ageRestrictions?: AgeRestrictions[]
  categories?: Category[]
  difficultyLevels?: DifficultyLevel[]
  genderRestrictions?: GenderRestrictions[]
  languages?: Language[]
  regions?: Regions[]
  user?: any
  paymentMethods: any
  places?: POI[]
}

const initialState: InitializeState = {
  paymentMethods: paymentMethods,
}

export const initializeSlice = createSlice({
  name: 'initialize',
  initialState,
  reducers: {
    reset: () => initialState,
    initialize: (_) => undefined,
    setUserData: (
      state,
      action: PayloadAction<{ response: InitializeState }>
    ) => {
      state.user = action.payload.response
    },
    setPOI: (state, action: PayloadAction<{ response: POI[] }>) => {
      state.places = action.payload.response
    },
    setBase: (state, action: PayloadAction<{ response: InitializeState }>) => {
      const {
        activities,
        ageRestrictions,
        categories,
        difficultyLevels,
        genderRestrictions,
        languages,
        regions,
      } = action.payload.response
      state.activities = activities
      state.ageRestrictions = ageRestrictions
      state.categories = categories
      state.difficultyLevels = difficultyLevels
      state.genderRestrictions = genderRestrictions
      state.languages = languages
      state.regions = regions
    },
    setFilter: (state, action: PayloadAction<{ key: number }>) => {
      const { key } = action.payload
      for (const paymentMethods of state.paymentMethods) {
        paymentMethods.isChecked = false
      }
      state.paymentMethods[key].isChecked = true
    },
  },
})

export type InitializeActions = ActionsUnion<typeof initializeSlice.actions>
