import { StoreState } from 'lib/store/reducers'

export const getMyExperiences = (store: StoreState) =>
  store.experience.experiencesMine
export const getArchiveError = (store: StoreState) =>
  store.experience.archiveError
