import { StoreState } from 'lib/store/reducers'

export const getActivities = (state: StoreState) => state.business.activities
export const getRegions = (state: StoreState) => state.business.regions
export const getGenderRestrictions = (state: StoreState) =>
  state.business.genderRestrictions
export const getAgeRestrictions = (state: StoreState) =>
  state.business.ageRestrictions
export const getDifficultyLevels = (state: StoreState) =>
  state.business.difficultyLevels
export const getCategories = (state: StoreState) => state.business.category
export const getPhotos = (state: StoreState) => state.business.images
export const getNames = (state: StoreState) => state.business.name
export const getDescriptions = (state: StoreState) => state.business.desc
export const getPlaces = (state: StoreState) => state.business.places
export const getImages = (state: StoreState) => state.business.images
