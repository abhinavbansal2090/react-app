import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ActionsUnion } from 'lib/redux/action-union'
import { Filters, TagLabel } from 'lib/models'
import { InitializeState } from 'features/initialize/initialize.slice'
import { POI } from 'lib/models/POI'

export type AllFiltersState = {
  activities?: Filters[]
  ageRestrictions?: Filters[]
  difficultyLevels?: Filters[]
  genderRestrictions?: Filters[]
  regions?: Filters[]
  category?: Filters[]
  name?: TagLabel[]
  desc?: TagLabel[]
  places?: Filters[]
  images?: any
}

export enum FiltersGroups {
  Regions = 'regions',
  GenderRestrictions = 'genderRestrictions',
  AgeRestrictions = 'ageRestrictions',
  DifficultyLevels = 'difficultyLevels',
  Activities = 'activities',
  Places = 'places',
  Category = 'category',
}

const initialState: AllFiltersState = {
  images: {},
}

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    reset: () => initialState,
    initialize: (_) => undefined,
    setImage: (state, action: PayloadAction<{ image: any; order: number }>) => {
      state.images[action.payload.order] = action.payload.image
    },
    clearImages: (state) => {
      state.images = {}
    },
    setPOI: (state, action: PayloadAction<{ response: POI[] }>) => {
      state.places = action.payload.response?.map((place) => {
        return {
          id: place.id,
          title: place.labels,
          regionId: place.regionId,
          isChecked: false,
        }
      })
    },
    clearFilter: (state, action: PayloadAction<{ type: FiltersGroups }>) => {
      const type = action.payload.type
      if (
        state.activities &&
        state.regions &&
        state.genderRestrictions &&
        state.ageRestrictions &&
        state.difficultyLevels
      )
        switch (type) {
          case 'regions':
            for (const region of state.regions) {
              region.isChecked = false
            }
            break
          case 'genderRestrictions':
            for (const genderRestriction of state.genderRestrictions) {
              genderRestriction.isChecked = false
            }
            break
          case 'ageRestrictions':
            for (const ageRestriction of state.ageRestrictions) {
              ageRestriction.isChecked = false
            }
            break
          case 'difficultyLevels':
            for (const difficultyLevel of state.difficultyLevels) {
              difficultyLevel.isChecked = false
            }
            break
          case 'activities':
            for (const activitie of state.activities) {
              activitie.isChecked = false
            }
            break
          default:
            console.log(`Sorry, we not handled ${type}.`)
        }
    },
    clearAllFilters: (state) => {
      state.category = state.category?.map((category) => ({
        ...category,
        isChecked: false,
      }))
      state.ageRestrictions = state.ageRestrictions?.map((filter) => ({
        ...filter,
        isChecked: false,
      }))
      state.difficultyLevels = state.difficultyLevels?.map((filter) => ({
        ...filter,
        isChecked: false,
      }))
      state.activities = state.activities?.map((filter) => ({
        ...filter,
        isChecked: false,
      }))
      state.genderRestrictions = state.genderRestrictions?.map((filter) => ({
        ...filter,
        isChecked: false,
      }))
      state.regions = state.regions?.map((filter) => ({
        ...filter,
        isChecked: false,
      }))
    },
    setBase: (state, action: PayloadAction<{ response: InitializeState }>) => {
      const {
        activities,
        regions,
        genderRestrictions,
        ageRestrictions,
        difficultyLevels,
        categories,
      } = action.payload.response
      state.activities = activities?.map((activity) => {
        return {
          id: activity.id,
          title: activity.labels,
          isChecked: false,
        }
      })
      state.name = [
        {
          languageId: 1,
          label: '',
        },
        {
          languageId: 2,
          label: '',
        },
      ]
      state.desc = [
        {
          languageId: 1,
          label: '',
        },
        {
          languageId: 2,
          label: '',
        },
      ]
      state.category = categories?.map((category) => {
        return {
          id: category.id,
          title: category.labels,
          isChecked: false,
          iconEmoji: category.iconEmoji,
        }
      })
      state.regions = regions?.map((region) => {
        return {
          id: region.id,
          title: region.labels,
          isChecked: false,
        }
      })
      state.genderRestrictions = genderRestrictions?.map((gender) => {
        return {
          id: gender.id,
          title: gender.labels,
          isChecked: false,
        }
      })
      state.ageRestrictions = ageRestrictions?.map((ageRestriction) => {
        return {
          id: ageRestriction.id,
          title: ageRestriction.labels,
          isChecked: false,
        }
      })
      state.difficultyLevels = difficultyLevels?.map((difficultyLevel) => {
        return {
          id: difficultyLevel.id,
          title: difficultyLevel.labels,
          isChecked: false,
        }
      })
    },
    setTitleAndDesc: (state, action: PayloadAction<{ data: any }>) => {
      const {
        nameArabic,
        descArabic,
        nameEnglish,
        descEnglish,
      } = action.payload.data
      state.name = [
        {
          languageId: 1,
          label: nameEnglish,
        },
        {
          languageId: 2,
          label: nameArabic,
        },
      ]
      state.desc = [
        {
          languageId: 1,
          label: descEnglish,
        },
        {
          languageId: 2,
          label: descArabic,
        },
      ]
    },
    setFilter: (
      state,
      action: PayloadAction<{ type: FiltersGroups; key: number }>
    ) => {
      const { type, key } = action.payload

      if (
        state.activities &&
        state.regions &&
        state.genderRestrictions &&
        state.ageRestrictions &&
        state.difficultyLevels &&
        state.places
      )
        switch (type) {
          case 'activities':
            const indexActivitie = state.activities.findIndex((activitie) => {
              return activitie.id === key
            })
            state.activities[indexActivitie].isChecked = !state.activities[
              indexActivitie
            ].isChecked
            break
          case 'regions':
            for (const region of state.regions) {
              region.isChecked = false
            }
            state.regions[key].isChecked = true
            for (const place of state.places) {
              place.isChecked = false
            }
            break
          case 'places':
            for (const place of state.places) {
              place.isChecked = false
            }
            state.places[key].isChecked = true
            break
          case 'genderRestrictions':
            if (state.genderRestrictions) {
              for (const genderRestriction of state.genderRestrictions) {
                genderRestriction.isChecked = false
              }
              state.genderRestrictions[key].isChecked = true
            }
            break
          case 'ageRestrictions':
            for (const ageRestriction of state.ageRestrictions) {
              ageRestriction.isChecked = false
            }
            state.ageRestrictions[key].isChecked = true
            break
          case 'difficultyLevels':
            for (const difficultyLevel of state.difficultyLevels) {
              difficultyLevel.isChecked = false
            }
            state.difficultyLevels[key].isChecked = true
            break
          case 'category':
            if (state.category) {
              for (const categories of state.category) {
                categories.isChecked = false
              }
              state.category[key].isChecked = true
            }
            break
          default:
            console.log(`Sorry, we not handled ${type}.`)
        }
    },
  },
})

export type FiltersActions = ActionsUnion<typeof businessSlice.actions>
