import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ActionsUnion } from 'lib/redux/action-union'
import {
  ExperienceInstance,
  ExperienceInstanceAdd,
  ExperienceMap,
} from 'lib/models'
import { GetInstancesForExperienceResponse } from 'services/experienceInstances'
import { GetInstancesForExperienceRequest } from 'services/experienceInstances/requests'
import { RequestState } from 'lib/types'

export type ExperienceInstanceState = {
  data?: ExperienceInstanceAdd
  map?: ExperienceMap
  isSending: boolean
  didSendSuccessfully: boolean
  didErrorOccur: boolean
  instancesOfExperience: GetInstancesForExperienceResponse
  deleteInstanceRequestState: RequestState
}

const initialState: ExperienceInstanceState = {
  isSending: false,
  didSendSuccessfully: false,
  didErrorOccur: false,
  instancesOfExperience: {
    data: [],
    page: 0,
    pages: 0,
    pageSize: 0,
    total: 0,
  },
  deleteInstanceRequestState: RequestState.Initial,
}

export const experienceInstancesSlice = createSlice({
  name: 'experienceInstances',
  initialState,
  reducers: {
    getInstancesOfExperience: (
      _,
      __: PayloadAction<GetInstancesForExperienceRequest>
    ) => undefined,
    postExperienceInstance: (
      state,
      __: PayloadAction<ExperienceInstanceAdd>
    ) => {
      state.didErrorOccur = false
      state.didSendSuccessfully = false
      state.isSending = true
    },
    postingExperienceInstanceSuccess: (state) => {
      state.didErrorOccur = false
      state.didSendSuccessfully = true
      state.isSending = false
    },
    postingExperienceInstanceError: (state) => {
      state.didErrorOccur = true
      state.didSendSuccessfully = false
      state.isSending = false
    },
    deleteInstance: (_, __: PayloadAction<number>) => undefined,
    setExperienceInstance: (
      state,
      action: PayloadAction<ExperienceInstanceAdd>
    ) => {
      state.data = action.payload
    },
    setMap: (state, action: PayloadAction<ExperienceMap>) => {
      state.map = action.payload
    },
    setInstancesOfExperience: (
      state,
      action: PayloadAction<GetInstancesForExperienceResponse>
    ) => {
      const { page, data, total, pageSize, pages } = action.payload
      const updatedData: ExperienceInstance[] = data.map((obj) => {
        return { ...obj, price: obj.price / 100 }
      })

      state.instancesOfExperience = {
        page,
        data: updatedData,
        total,
        pageSize,
        pages,
      }
    },
    resetInstancesOfExperience: (state) => {
      state.instancesOfExperience = {
        page: 0,
        data: [],
        total: 0,
        pageSize: 0,
        pages: 0,
      }
    },
    appendInstancesOfExperience: (
      state,
      action: PayloadAction<GetInstancesForExperienceResponse>
    ) => {
      const { page, data, total, pageSize, pages } = action.payload
      const updatedData: ExperienceInstance[] = data.map((obj) => {
        return { ...obj, price: obj.price / 100 }
      })
      state.instancesOfExperience = {
        page,
        total,
        pages,
        pageSize,
        data: [...state.instancesOfExperience.data, ...updatedData],
      }
    },
    setDeleteInstanceRequestState: (
      state,
      action: PayloadAction<RequestState>
    ) => {
      state.deleteInstanceRequestState = action.payload
    },
  },
})

export type ExperienceInstancesSliceActions = ActionsUnion<
  typeof experienceInstancesSlice.actions
>
