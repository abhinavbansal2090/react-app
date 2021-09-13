import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ActionsUnion } from 'lib/redux/action-union'
import { GetExperienceMineResponse } from 'services/experiences/responses'
import { Undefineable } from 'lib/types'

export type ExperienceState = {
  experiencesMine: GetExperienceMineResponse
  archiveError?: string
}

const initialState: Partial<ExperienceState> = {}

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    fetchExperienceMine: (_, __: PayloadAction<{ Page: number }>) => undefined,
    archiveExperience: (_, __: PayloadAction<{ experienceId: number }>) =>
      undefined,
    setExperienceMine: (
      state,
      action: PayloadAction<GetExperienceMineResponse>
    ) => {
      state.experiencesMine = action.payload
    },
    appendExperienceMine: (
      state,
      action: PayloadAction<GetExperienceMineResponse>
    ) => {
      const appendExperiencesData = state.experiencesMine?.data
        ? [...state.experiencesMine.data, ...action.payload.data].filter(
            Boolean
          )
        : action.payload.data

      state.experiencesMine = {
        ...action.payload,
        data: appendExperiencesData,
      }
    },
    setArchiveError: (state, action: PayloadAction<Undefineable<string>>) => {
      state.archiveError = action.payload
    },
  },
})

export type ExperienceActions = ActionsUnion<typeof experienceSlice.actions>
