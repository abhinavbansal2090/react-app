import { StoreState } from 'lib/store/reducers'
import { LanguageIds } from 'lib/i18n'

export const getExperienceById = (expId: number, store: StoreState) =>
  store.experience.experiencesMine?.data.find((exp) => exp.id === expId)
export const getExperience = (expId: number) => (store: StoreState) =>
  getExperienceById(expId, store)
export const getExperienceName = (expId: number, languageId: LanguageIds) => (
  store: StoreState
) =>
  getExperienceById(expId, store)?.descriptions.find(
    (description) => description.languageId === languageId
  )?.name

export const getIsSending = (store: StoreState) =>
  store.experienceInstance.isSending
export const getDidErrorOccur = (store: StoreState) =>
  store.experienceInstance.didErrorOccur
export const getMapObject = (store: StoreState) => store.experienceInstance.map
export const getDidSendSuccessfully = (store: StoreState) =>
  store.experienceInstance.didSendSuccessfully
export const getExperienceInstances = (store: StoreState) =>
  store.experienceInstance?.instancesOfExperience
export const getExperienceInstanceById = (instanceId: number) => (
  store: StoreState
) =>
  store.experienceInstance?.instancesOfExperience.data.find(
    (instance) => instance.id === instanceId
  )
export const getCreatedExperienceInstanceAdd = (store: StoreState) =>
  store.experienceInstance.data
export const getDeleteInstanceRequestState = (store: StoreState) =>
  store.experienceInstance.deleteInstanceRequestState
