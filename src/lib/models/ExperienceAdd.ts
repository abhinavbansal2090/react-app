import { Nullable } from '../types'
import { ExperienceDescription } from './ExperienceDescription'
import { ExperienceInstance } from './ExperienceInstance'

export type ExperienceAdd = {
  id?: number
  providerId?: Nullable<string>
  added: string
  descriptions?: ExperienceDescription[]
  categoryId: number | number[] | boolean
  regionId: number | number[] | boolean
  poiId?: number | number[] | boolean
  genderRestrictionId: number | number[] | boolean
  ageRestrictionId: number | number[] | boolean
  difficultyLevelId: number | number[] | boolean
  activityIds?: number | number[] | boolean
  images?: any
  instances?: ExperienceInstance[]
  latitude: number
  longitude: number
}
